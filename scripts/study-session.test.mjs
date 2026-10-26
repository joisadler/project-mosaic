import assert from "node:assert/strict";
import test from "node:test";
import { createSession, presentationId } from "../src/lib/study-session/session.ts";
import { createSessionStore } from "../src/lib/study-session/session.ts";
import { createProgressStore, cardPercentage, repeatEligibility, REPEAT_DELAY_MS } from "../src/lib/learning-progress/progress.ts";

const cards = [
  { id: "info", type: "info", pages: ["one", "two"] },
  { id: "quiz", type: "quiz", options: [{ id: "a" }, { id: "b" }] },
  { id: "flip", type: "flip" },
];

test("same-runtime subscriptions retain navigation and interactions; a fresh runtime clears presentation state", () => {
  const store = createSessionStore(cards, "guest");
  assert.equal(store.getServerSnapshot().session, null);
  const stop = store.subscribe(() => {});
  store.update(s => ({ ...s, currentCardId: "quiz", pages: { info: 1 }, answers: { quiz: "b" }, sides: { flip: 1 } }));
  const current = store.getSnapshot().session;
  stop(); store.subscribe(() => {});
  assert.equal(store.getSnapshot().session, current);
  const next = createSessionStore(cards, "guest"); next.subscribe(() => {});
  assert.notEqual(next.getSnapshot().session.id, current.id);
  assert.deepEqual(next.getSnapshot().session.pages, {});
  assert.deepEqual(next.getSnapshot().session.answers, {});
  assert.deepEqual(next.getSnapshot().session.sides, {});
});

test("legacy navigation snapshots are neither read nor overwritten", () => {
  const legacy = new Map([["mosaic:session:v1:guest:study%3Aall", JSON.stringify({ ...createSession(cards), currentCardId: "quiz" })]]);
  const before = new Map(legacy), descriptor = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  let calls = 0;
  Object.defineProperty(globalThis, "localStorage", { configurable: true, get() { calls++; throw new Error("Navigation must not access storage"); } });
  try {
    const store = createSessionStore(cards, "guest"); store.subscribe(() => {});
    store.update(s => ({ ...s, currentCardId: "flip" })); store.restart();
    assert.equal(calls, 0); assert.deepEqual(legacy, before);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "localStorage", descriptor);
    else delete globalThis.localStorage;
  }
});

test("a new runtime uses the current inventory and an empty feed remains valid", () => {
  const changedCards = [cards[0], cards[2], { id: "new", type: "info", pages: ["new"] }];
  const store = createSessionStore(changedCards, "guest"); store.subscribe(() => {});
  assert.deepEqual(new Set(store.getSnapshot().session.order), new Set(["info", "flip", "new"]));
  const empty = createSession([]);
  assert.deepEqual(empty.order, []);
  assert.equal(empty.currentCardId, null);
});

test("runtime instances and owners stay independent and manual shuffle only replaces its own session", () => {
  const guest = createSessionStore(cards, "guest");
  guest.subscribe(() => {});
  const original = guest.getSnapshot().session;
  guest.update(current => ({ ...current, currentCardId: "quiz", answers: { quiz: "b" } }));
  const account = createSessionStore(cards, "account:a");
  account.subscribe(() => {});
  assert.deepEqual(account.getSnapshot().session.answers, {});
  const guestAgain = createSessionStore(cards, "guest");
  guestAgain.subscribe(() => {});
  assert.deepEqual(guestAgain.getSnapshot().session.answers, {});
  assert.notEqual(guestAgain.getSnapshot().session.id, original.id);
  account.restart();
  assert.equal(guest.getSnapshot().session.id, original.id);
  const before = guest.getSnapshot().session;
  guest.restart();
  assert.notEqual(guest.getSnapshot().session.id, before.id);
  assert.notDeepEqual(guest.getSnapshot().session.order, before.order);
  assert.deepEqual(guest.getSnapshot().session.answers, {});
});

test("unresolved identity stays empty and unavailable authentication gets an isolated temporary session", () => {
  const store = createSessionStore(cards, "guest");
  store.subscribe(() => {});
  store.update(current => ({ ...current, currentCardId: "flip" }));
  assert.equal(store.getSnapshot().session.currentCardId, "flip");
  store.restart();
  assert.ok(store.getSnapshot().session);
  const pending = createSessionStore(cards, null);
  pending.subscribe(() => {});
  assert.equal(pending.getSnapshot().session, null);
  const unavailable = createSessionStore(cards, "unavailable");
  unavailable.subscribe(() => {});
  assert.ok(unavailable.getSnapshot().session);
  assert.notEqual(unavailable.getSnapshot().session.id, store.getSnapshot().session.id);
});

test("durable progress and repetition gates survive new runtime presentation IDs", () => {
  const records = new Map(), sections = new Map(cards.map(card => [card.id, "one"]));
  const storage = () => ({ getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) });
  const openProgress = () => { const p = createProgressStore(cards, sections, "guest", storage); p.subscribe(() => {}); return p; };
  const first = createSession(cards), progress = openProgress(), key = presentationId(first, "info");
  progress.review("info", key, { pages: [0, 1] });
  progress.toggle(cards[0], key, cards.map(card => card.id), 1000);
  const confirmations = structuredClone(progress.getSnapshot().data.confirmations);
  const second = createSession(cards), reloaded = openProgress();
  assert.notEqual(presentationId(second, "info"), key);
  assert.deepEqual(reloaded.getSnapshot().data.confirmations, confirmations);
  assert.deepEqual(reloaded.getSnapshot().data.reviews, {});
  assert.ok([...records.values()].every(raw => !Object.hasOwn(JSON.parse(raw), "reviews")));
  assert.equal(cardPercentage(reloaded.getSnapshot().data, "info"), 10);
  assert.equal(repeatEligibility(reloaded.getSnapshot().data, "info", cards.map(card => card.id), 1001).eligible, false);
  assert.equal(repeatEligibility(reloaded.getSnapshot().data, "info", cards.map(card => card.id), 1000 + REPEAT_DELAY_MS).eligible, false);
  for (const card of cards.slice(1)) reloaded.review(card.id, presentationId(second, card.id), {});
  assert.equal(repeatEligibility(reloaded.getSnapshot().data, "info", cards.map(card => card.id), 1000 + REPEAT_DELAY_MS).eligible, true);
});

test("section filtering retains presentation IDs, hidden pages and canonical order across empty/reselected views", async () => {
  const { filterSession, presentationId } = await import('../src/lib/study-session/session.ts');
  const canonical = { version: 1, id: crypto.randomUUID(), order: ['a', 'b', 'c'], currentCardId: 'b', pages: { a: 2 }, answers: { b: 'right' }, sides: { c: 1 } };
  const sections = new Map([['a', 'one'], ['b', 'two'], ['c', 'one']]);
  const filtered = filterSession(canonical, ['one'], sections);
  assert.deepEqual(filtered.order, ['a', 'c']);
  assert.equal(filtered.currentCardId, 'c');
  assert.equal(presentationId(filtered, 'a'), presentationId(canonical, 'a'));
  assert.deepEqual(filtered.pages, canonical.pages);
  const empty = filterSession(canonical, [], sections);
  assert.deepEqual(empty.order, []); assert.equal(empty.currentCardId, null);
  assert.equal(filterSession(canonical, ['one', 'two'], sections), canonical);
  assert.deepEqual(canonical.order, ['a', 'b', 'c']);
});

test("chapter toggles preserve other chapters and reflect partial subsection selection", async () => {
  const { groupSelection, toggleSectionGroup } = await import('../src/lib/study-session/section-selection.ts');
  assert.deepEqual(groupSelection(['1.1', '2.1'], ['1.1', '1.2']), { checked: false, mixed: true });
  const all = toggleSectionGroup(['1.1', '2.1'], ['1.1', '1.2'], true);
  assert.deepEqual(new Set(all), new Set(['1.1', '1.2', '2.1']));
  assert.deepEqual(groupSelection(all, ['1.1', '1.2']), { checked: true, mixed: false });
  assert.deepEqual(toggleSectionGroup(all, ['1.1', '1.2'], false), ['2.1']);
  assert.deepEqual(groupSelection([], []), { checked: false, mixed: false });
});

test("study and review inventories are disjoint, section-filtered views with stable independent identities", async () => {
  const { filterSession } = await import('../src/lib/study-session/session.ts');
  const { completedCardIds } = await import('../src/lib/learning-progress/progress.ts');
  const confirmations = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`p${i}`, { cardId: 'info', active: true }]));
  const completed = completedCardIds(confirmations);
  const sections = new Map([['info','one'],['quiz','one'],['flip','two']]);
  const study = createSession(cards), review = createSession(cards);
  const view = (session, mode, selected = ['one','two']) => filterSession(session, selected, sections,
    mode === 'review' ? completed : new Set(cards.filter(card => !completed.has(card.id)).map(card => card.id)));
  assert.deepEqual(new Set(view(study,'study').order), new Set(['quiz','flip']));
  assert.deepEqual(view(review,'review').order, ['info']);
  assert.deepEqual(view(review,'review',['two']).order, []);
  assert.deepEqual(view(study,'study',[]).order, []);
  assert.notEqual(presentationId(study,'info'), presentationId(review,'info'));
  assert.equal(view(study,'study').id, study.id);
  assert.equal(view(review,'review').id, review.id);
  for (const card of cards) completed.add(card.id);
  assert.deepEqual(view(study,'study').order, []);
  assert.equal(view(study,'study').currentCardId, null);
  assert.deepEqual(new Set(view(review,'review').order), new Set(cards.map(card => card.id)));
  completed.clear();
  assert.deepEqual(view(review,'review').order, []);
  assert.deepEqual(view(study,'study'), study);
  assert.deepEqual(filterSession(study,['one','two'],sections,new Set(cards.map(card => card.id))), study);
});

test("study and review retain independent live state and both get fresh identities in a new runtime", () => {
  const open = owner => { const store = createSessionStore(cards, owner); store.subscribe(() => {}); return store; };
  const study = open('guest'), review = open('guest');
  study.update(current => ({...current,currentCardId:'flip',sides:{flip:1}}));
  const original = structuredClone(study.getSnapshot().session);
  review.update(current => ({...current,currentCardId:'quiz',pages:{info:1},answers:{quiz:'b'},sides:{flip:1}}));
  assert.notEqual(open('guest').getSnapshot().session.id, review.getSnapshot().session.id);
  assert.notEqual(open('guest').getSnapshot().session.id, original.id);
  assert.notEqual(open('account:one').getSnapshot().session.id, review.getSnapshot().session.id);
  review.restart();
  assert.deepEqual(study.getSnapshot().session, original);
  assert.deepEqual(study.getSnapshot().session.sides, {flip:1});
});
