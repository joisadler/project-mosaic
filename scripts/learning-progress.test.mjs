import assert from "node:assert/strict";
import test from "node:test";
import { cardPercentage, confirmationStatus, createProgressStore, progressStorageKey, restoreProgress, REPEAT_DELAY_MS } from "../src/lib/learning-progress/progress.ts";
import { createDoubleTapDetector } from "../src/lib/learning-progress/double-tap.ts";

const cards = [
  { id: "info", type: "info", pages: ["one", "two"] },
  { id: "quiz", type: "quiz", options: [{ id: "right" }, { id: "wrong" }], correctOptionId: "right" },
  { id: "flip", type: "flip" },
  ...Array.from({ length: 5 }, (_, i) => ({ id: `other${i}`, type: "info", pages: ["text"] })),
];
const sections = new Map(cards.map(card => [card.id, "fe-1.1"]));
const pool = cards.map(card => card.id);
function setup(owner = "guest", records = new Map()) {
  const storage = () => ({ getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) });
  const store = createProgressStore(cards, sections, owner, storage);
  store.subscribe(() => {});
  return { store, records };
}
const data = store => store.getSnapshot().data;
function read(store, card, presentation = `session:${card.id}`) {
  store.review(card.id, presentation, card.type === "info" ? { pages: card.pages.map((_, i) => i) }
    : card.type === "flip" ? { answerSeen: true } : { feedbackOptionId: "wrong" });
}

test("all card types require review and explicit confirmation; quiz correctness is irrelevant", () => {
  const { store } = setup();
  for (const card of cards.slice(0, 3)) {
    const presentation = `session:${card.id}`;
    store.toggle(card, presentation, pool, 1000, "wrong");
    assert.equal(cardPercentage(data(store), card.id), 0);
    read(store, card);
    assert.equal(cardPercentage(data(store), card.id), 0);
    store.toggle(card, presentation, pool, 1000, "wrong");
    assert.equal(cardPercentage(data(store), card.id), 10);
  }
});

test("all info pages and the currently selected quiz explanation are required", () => {
  const { store } = setup();
  store.review("info", "a", { pages: [1] });
  assert.equal(confirmationStatus(data(store), cards[0], "a", pool, 0).eligible, false);
  store.review("info", "a", { pages: [0] });
  assert.equal(confirmationStatus(data(store), cards[0], "a", pool, 0).eligible, true);
  read(store, cards[1], "q");
  assert.equal(confirmationStatus(data(store), cards[1], "q", pool, 0, "right").eligible, false);
});

test("cancel/reconfirm and reload preserve the same award; immediate navigation does not add points", () => {
  const { store, records } = setup();
  read(store, cards[0], "a");
  store.toggle(cards[0], "a", pool, 1000);
  const id = data(store).confirmations.a.id;
  for (let i = 0; i < 10; i++) {
    store.toggle(cards[0], "a", pool, 1001 + i);
    assert.equal(cardPercentage(data(store), "info"), i % 2 ? 10 : 0);
  }
  const restored = setup("guest", records).store;
  assert.equal(data(restored).confirmations.a.id, id);
  assert.equal(cardPercentage(data(restored), "info"), 10);
  read(restored, cards[0], "new");
  restored.toggle(cards[0], "new", pool, 1015);
  assert.equal(cardPercentage(data(restored), "info"), 10);
});

test("repeat needs both elapsed time and five distinct other cards; cancel removes only its own award", () => {
  const { store } = setup();
  read(store, cards[0], "first"); store.toggle(cards[0], "first", pool, 1000);
  read(store, cards[0], "second");
  store.toggle(cards[0], "second", pool, 1000 + REPEAT_DELAY_MS);
  assert.equal(cardPercentage(data(store), "info"), 10);
  for (const card of cards.slice(3)) read(store, card);
  store.toggle(cards[0], "second", pool, 1001);
  assert.equal(cardPercentage(data(store), "info"), 10);
  store.toggle(cards[0], "second", pool, 1000 + REPEAT_DELAY_MS);
  assert.equal(cardPercentage(data(store), "info"), 20);
  store.toggle(cards[0], "second", pool, 1001 + REPEAT_DELAY_MS);
  assert.equal(data(store).confirmations.first.active, true);
  assert.equal(cardPercentage(data(store), "info"), 10);
});

test("single-card pool still needs a pause, and ten immediate new sessions never yield 100%", () => {
  const { store } = setup();
  for (let i = 0; i < 10; i++) {
    read(store, cards[0], `p${i}`); store.toggle(cards[0], `p${i}`, ["info"], 1000 + i);
  }
  assert.equal(cardPercentage(data(store), "info"), 10);
  store.toggle(cards[0], "p1", ["info"], 1000 + REPEAT_DELAY_MS);
  assert.equal(cardPercentage(data(store), "info"), 20);
});

test("progress caps at 100 and keeps completed cards available without changing the feed", () => {
  const { store } = setup();
  for (let i = 0; i < 12; i++) {
    read(store, cards[0], `p${i}`); store.toggle(cards[0], `p${i}`, ["info"], 1000 + i * REPEAT_DELAY_MS);
  }
  assert.equal(cardPercentage(data(store), "info"), 100);
  assert.equal(Object.keys(data(store).confirmations).length, 10);
});

test("guest/account namespaces are isolated; malformed, changed and unavailable storage recover", () => {
  const { store, records } = setup();
  read(store, cards[0], "a"); store.toggle(cards[0], "a", pool, 1000);
  assert.equal(cardPercentage(data(setup("account:a", records).store), "info"), 0);
  assert.equal(cardPercentage(data(setup("guest", records).store), "info"), 10);
  assert.notEqual(progressStorageKey("guest"), progressStorageKey("account:a"));
  for (const raw of [null, "{", "null", '{"version":2}', '{"version":1,"confirmations":{"x":{}}}']) {
    assert.equal(cardPercentage(restoreProgress(raw, cards, sections), "info"), 0);
  }
  const removed = restoreProgress(JSON.stringify(data(store)), cards.slice(1), sections);
  assert.equal(cardPercentage(removed, "info"), 0);
  const broken = createProgressStore(cards, sections, "guest", () => { throw new Error("Denied"); });
  broken.subscribe(() => {}); read(broken, cards[0], "b"); broken.toggle(cards[0], "b", pool, 1000);
  assert.equal(broken.getSnapshot().storageAvailable, false);
  assert.equal(cardPercentage(data(broken), "info"), 10);
});

test("touch detector accepts a nearby double tap and rejects swipes, long presses, different cards and canceled gestures", () => {
  const detector = createDoubleTapDetector();
  const tap = (time, presentationId = "p") => ({ time, presentationId, x: 100, y: 100, pointerId: 1 });
  detector.start(tap(0)); assert.equal(detector.end(tap(30)), false);
  detector.start(tap(100)); assert.equal(detector.end(tap(130)), true);
  detector.start(tap(200)); detector.move(1, 150, 100); assert.equal(detector.end(tap(230)), false);
  detector.start(tap(300)); assert.equal(detector.end(tap(700)), false);
  detector.start(tap(800)); detector.end(tap(820)); detector.start(tap(900, "other")); assert.equal(detector.end(tap(920, "other")), false);
  detector.reset(); detector.start(tap(1000)); assert.equal(detector.end(tap(1020)), false);
});

test("aggregate progress averages unique card percentages, includes untouched cards and counts only 100% as complete", async () => {
  const { summarizeProgress } = await import('../src/lib/learning-progress/progress.ts');
  const { store } = setup();
  const events = {};
  for (let i = 0; i < 12; i++) events[`p${i}`] = { id: `award${i}`, presentationId: `p${i}`, cardId: 'info', sectionId: 'fe-1.1', active: true, createdAt: i, updatedAt: i };
  events.quiz = { id: 'quiz-award', presentationId: 'quiz', cardId: 'quiz', sectionId: 'fe-1.1', active: true, createdAt: 20, updatedAt: 20 };
  events.canceled = { ...events.quiz, id: 'canceled', presentationId: 'canceled', active: false };
  store.replaceConfirmations(events);
  assert.deepEqual(summarizeProgress(data(store), ['info','quiz','flip','info']), { average: 110 / 3, completed: 1, total: 3, hasHistory: true });
  assert.deepEqual(summarizeProgress(data(store), []), { average: 0, completed: 0, total: 0, hasHistory: false });
  assert.deepEqual(summarizeProgress(data(store), ['flip']), { average: 0, completed: 0, total: 1, hasHistory: false });
});

test("completed membership changes only at the 100% boundary and canceled awards do not count", async () => {
  const { completedCardIds } = await import('../src/lib/learning-progress/progress.ts');
  const { store } = setup();
  const awards = Object.fromEntries(Array.from({length:9}, (_, i) => [`p${i}`,{id:`id${i}`,presentationId:`p${i}`,cardId:'info',sectionId:'fe-1.1',active:true,createdAt:i,updatedAt:i}]));
  store.replaceConfirmations(awards);
  assert.equal(completedCardIds(data(store).confirmations).has('info'), false);
  awards.tenth = {...awards.p0, id:'tenth',presentationId:'tenth'};
  store.replaceConfirmations(awards);
  assert.equal(completedCardIds(data(store).confirmations).has('info'), true);
  awards.tenth.active = false; store.replaceConfirmations(awards);
  assert.equal(completedCardIds(data(store).confirmations).has('info'), false);
  store.replaceConfirmations({});
  assert.equal(completedCardIds(data(store).confirmations).size, 0);
});
