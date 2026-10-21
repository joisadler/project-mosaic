import assert from "node:assert/strict";
import test from "node:test";
import { createSession, presentationId, restoreSession, sessionStorageKey } from "../src/lib/study-session/session.ts";
import { createSessionStore } from "../src/lib/study-session/session.ts";

const cards = [
  { id: "info", type: "info", pages: ["one", "two"] },
  { id: "quiz", type: "quiz", options: [{ id: "a" }, { id: "b" }] },
  { id: "flip", type: "flip" },
];

test("resume retains order, position, interactions and presentation identities", () => {
  const session = { ...createSession(cards), currentCardId: "quiz", pages: { info: 1 }, answers: { quiz: "b" }, sides: { flip: 1 } };
  const restored = restoreSession(JSON.stringify(session), cards);
  assert.deepEqual(restored, session);
  assert.equal(presentationId(restored, "quiz"), presentationId(session, "quiz"));
  assert.notEqual(createSession(cards).id, session.id);
});

test("reconcile removals, additions, shorter content, and invalid option IDs", () => {
  const session = { ...createSession(cards), order: ["flip", "quiz", "info", "info"], currentCardId: "quiz", pages: { info: 8 }, answers: { quiz: "removed" }, sides: { flip: 7 } };
  const changedCards = [cards[0], cards[2], { id: "new", type: "info", pages: ["new"] }];
  const restored = restoreSession(JSON.stringify(session), changedCards);
  assert.deepEqual(restored.order, ["flip", "info", "new"]);
  assert.equal(restored.currentCardId, "info");
  assert.deepEqual(restored.pages, { info: 1 });
  assert.deepEqual(restored.answers, {});
  assert.deepEqual(restored.sides, {});
  assert.equal(restored.id, session.id);
  assert.deepEqual(restoreSession(JSON.stringify(session), cards).answers, {});
});

test("missing, corrupt and unsupported snapshots recover; empty feed is valid", () => {
  for (const raw of [null, "{", "null", "[]", '{"version":2}', '{"version":1,"id":"bad","order":[]}', JSON.stringify({ ...createSession(cards), order: [null] })]) {
    const restored = restoreSession(raw, cards);
    assert.equal(new Set(restored.order).size, cards.length);
    assert.ok(restored.order.includes(restored.currentCardId));
  }
  const empty = restoreSession(null, []);
  assert.deepEqual(empty.order, []);
  assert.equal(empty.currentCardId, null);
});

test("guest, accounts and future filter/mode scopes have independent keys", () => {
  assert.notEqual(sessionStorageKey("guest"), sessionStorageKey("account:a"));
  assert.notEqual(sessionStorageKey("account:a"), sessionStorageKey("account:b"));
  assert.notEqual(sessionStorageKey("account:a", "study:fe-1.1"), sessionStorageKey("account:a", "review:fe-1.1"));
  const devices = [new Map(), new Map()];
  const key = sessionStorageKey("account:a");
  const a = createSession(cards), b = createSession(cards);
  devices[0].set(key, JSON.stringify(a)); devices[1].set(key, JSON.stringify(b));
  assert.notEqual(restoreSession(devices[0].get(key), cards).id, restoreSession(devices[1].get(key), cards).id);
});

test("stores isolate owners and devices; restarting never changes another namespace", () => {
  const records = new Map();
  const storage = () => ({ getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) });
  const guest = createSessionStore(cards, "guest", storage);
  guest.subscribe(() => {});
  const original = guest.getSnapshot().session;
  guest.update(current => ({ ...current, currentCardId: "quiz", answers: { quiz: "b" } }));
  const account = createSessionStore(cards, "account:a", storage);
  account.subscribe(() => {});
  assert.deepEqual(account.getSnapshot().session.answers, {});
  const guestAgain = createSessionStore(cards, "guest", storage);
  guestAgain.subscribe(() => {});
  assert.equal(guestAgain.getSnapshot().session.currentCardId, "quiz");
  assert.equal(guestAgain.getSnapshot().session.id, original.id);
  account.restart();
  assert.equal(JSON.parse(records.get(sessionStorageKey("guest"))).id, original.id);
  const before = guest.getSnapshot().session;
  guest.restart();
  assert.notEqual(guest.getSnapshot().session.id, before.id);
  assert.notDeepEqual(guest.getSnapshot().session.order, before.order);
  assert.deepEqual(guest.getSnapshot().session.answers, {});
});

test("storage denial/quota and unresolved identity never block or expose prior state", () => {
  const broken = () => { throw new Error("Storage denied"); };
  const store = createSessionStore(cards, "guest", broken);
  store.subscribe(() => {});
  assert.equal(store.getSnapshot().storageAvailable, false);
  store.update(current => ({ ...current, currentCardId: "flip" }));
  assert.equal(store.getSnapshot().session.currentCardId, "flip");
  store.restart();
  assert.ok(store.getSnapshot().session);
  const pending = createSessionStore(cards, null, broken);
  pending.subscribe(() => {});
  assert.equal(pending.getSnapshot().session, null);
  const unavailable = createSessionStore(cards, "unavailable", broken);
  unavailable.subscribe(() => {});
  assert.equal(unavailable.getSnapshot().storageAvailable, false);
  assert.ok(unavailable.getSnapshot().session);
});
