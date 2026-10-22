import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { randomUUID } from "node:crypto";
import test from "node:test";
registerHooks({ resolve(specifier, context, next) {
  if (specifier.startsWith("./") && !/\.[a-z]+$/i.test(specifier)) return next(`${specifier}.ts`, context);
  return next(specifier, context);
} });
const { applySyncBatch, initialCloudState, parseSyncBatch } = await import("../src/lib/learning-progress/sync-model.ts");
const { createProgressSync, syncStorageKey } = await import("../src/lib/learning-progress/sync-client.ts");
const { createProgressStore, cardPercentage } = await import("../src/lib/learning-progress/progress.ts");
const cards = [{ id: "a", type: "info", pages: ["text"] }, { id: "b", type: "flip" }];
const inventory = { sections: ["fe-1.1", "fe-1.2"], cardSections: new Map([["a", "fe-1.1"], ["b", "fe-1.2"]]) };
const event = (cardId = "a") => ({ id: randomUUID(), presentationId: `${randomUUID()}:${cardId}`, cardId, sectionId: inventory.cardSections.get(cardId), active: true, createdAt: 1000, updatedAt: 1000 });
const mutation = (e = event(), expectedVersion = 0, resetVersion = 0) => ({ mutationId: randomUUID(), event: e, expectedVersion, resetVersion });
const batch = (...mutations) => ({ mutations });

test("replay is idempotent, independent devices merge, cancellation targets only its award", () => {
  const a = mutation(), b = mutation();
  let state = applySyncBatch(initialCloudState(inventory.sections), batch(a)).state;
  assert.deepEqual(applySyncBatch(state, batch(a)).state, state);
  state = applySyncBatch(state, batch(b)).state;
  const cancel = mutation({ ...a.event, active: false, updatedAt: 1001 }, 1);
  state = applySyncBatch(state, batch(cancel)).state;
  assert.equal(state.records[a.event.presentationId].event.active, false);
  assert.equal(state.records[b.event.presentationId].event.active, true);
  assert.deepEqual(applySyncBatch(state, batch(a)).conflicts, [a.mutationId]);
});

test("conflicts use versions rather than client clocks, including UUID reuse", () => {
  const a = mutation();
  const state = applySyncBatch(initialCloudState(inventory.sections), batch(a)).state;
  const stale = mutation({ ...a.event, active: false, updatedAt: Number.MAX_SAFE_INTEGER });
  assert.deepEqual(applySyncBatch(state, batch(stale)).conflicts, [stale.mutationId]);
  const reused = mutation({ ...a.event, presentationId: `${randomUUID()}:a` });
  assert.deepEqual(applySyncBatch(state, batch(reused)).conflicts, [reused.mutationId]);
});

test("scoped reset preserves other sections and blocks stale offline resurrection", () => {
  const a = mutation(), b = mutation(event("b"));
  let state = applySyncBatch(initialCloudState(inventory.sections), batch(a, b)).state;
  const reset = { mutations: [], reset: { mutationId: randomUUID(), expectedRevision: state.revision, cardIds: ["a"] } };
  state = applySyncBatch(state, reset).state;
  assert.equal(state.records[a.event.presentationId], undefined);
  assert.ok(state.records[b.event.presentationId]);
  assert.deepEqual(applySyncBatch(state, reset).state, state);
  assert.deepEqual(applySyncBatch(state, batch(mutation())).conflicts.length, 1);
  assert.equal(applySyncBatch(state, batch(mutation(event(), 0, 1))).conflicts.length, 0);
});

test("preferences conflict independently and payloads reject ownership/navigation/unknown content", () => {
  const preference = { mutationId: randomUUID(), ids: ["fe-1.2"], expectedVersion: 0 };
  const state = applySyncBatch(initialCloudState(inventory.sections), { mutations: [], preferences: preference }).state;
  assert.deepEqual(state.sections.ids, ["fe-1.2"]);
  assert.deepEqual(applySyncBatch(state, { mutations: [], preferences: preference }).state, state);
  for (const value of [
    { mutations: [], userId: "other" }, { mutations: [], order: [] },
    batch(mutation({ ...event(), sectionId: "wrong" })), batch(mutation({ ...event(), presentationId: "fake:a" })),
    { mutations: [], preferences: { ...preference, ids: ["unknown"] } },
  ]) assert.throws(() => parseSyncBatch(value, inventory));
});

function server() {
  const states = new Map();
  let offline = false;
  let holdPost;
  return {
    states, setOffline: value => { offline = value; }, holdPost: value => { holdPost = value; },
    request(owner) { return async (_url, options) => {
      if (offline) throw new Error("Offline");
      if (options.signal.aborted) throw new Error("Aborted");
      if (options.method === "POST" && holdPost) await holdPost;
      const state = states.get(owner) ?? initialCloudState(inventory.sections);
      const result = options.method === "POST" ? applySyncBatch(state, parseSyncBatch(JSON.parse(options.body), inventory)) : { state, conflicts: [] };
      states.set(owner, result.state);
      return Response.json(result);
    }; },
  };
}
function device(api, owner = "account:one", records = new Map()) {
  const storage = () => ({ getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) });
  const progress = createProgressStore(cards, inventory.cardSections, owner, storage);
  progress.subscribe(() => {});
  const sync = createProgressSync(owner, progress, inventory, { storage, request: api.request(owner) });
  return { progress, sync, records, start: () => sync.start(), percentage: () => cardPercentage(progress.getSnapshot().data, "a"),
    award() { const presentation = `${randomUUID()}:a`; progress.review("a", presentation, { pages: [0] }); progress.toggle(cards[0], presentation, ["a"], 1000); return presentation; } };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test("two devices share only progress/preferences; guest and account identities stay isolated", async t => {
  const api = server(), first = device(api), second = device(api), other = device(api, "account:two"), guest = device(api, "guest");
  for (const item of [first, second, other, guest]) t.after(item.start());
  await settle();
  const presentation = first.award(); first.sync.retry(); await settle();
  second.sync.retry(); await settle();
  assert.equal(second.percentage(), 10);
  assert.equal(other.percentage(), 0); assert.equal(guest.percentage(), 0);
  assert.equal(second.progress.getSnapshot().data.reviews[presentation], undefined);
  assert.equal(second.progress.getSnapshot().data.visit, 0);
  first.sync.setSections(["fe-1.2"]); first.sync.retry(); await settle(); second.sync.retry(); await settle();
  assert.deepEqual(second.sync.getSnapshot().sections, ["fe-1.2"]);
  assert.equal(api.states.has("guest"), false);
});

test("offline outbox survives restart/sign-out and sends each confirmation once", async t => {
  const api = server(); api.setOffline(true);
  const first = device(api); const stop = first.start();
  first.award(); await settle();
  assert.equal(first.sync.getSnapshot().pending, 1);
  stop();
  const other = device(api, "account:two", first.records); t.after(other.start());
  assert.equal(other.percentage(), 0);
  api.setOffline(false);
  const resumed = device(api, "account:one", first.records); t.after(resumed.start()); await settle();
  assert.equal(resumed.percentage(), 10); assert.equal(resumed.sync.getSnapshot().pending, 0);
  resumed.sync.retry(); await settle();
  assert.equal(Object.keys(api.states.get("account:one").records).length, 1);
  assert.ok(first.records.has(syncStorageKey("account:one")));
});

test("toggle during upload rebases against its acknowledgment rather than losing the latest choice", async t => {
  const api = server(), first = device(api); t.after(first.start()); await settle();
  let release; const hold = new Promise(resolve => { release = resolve; }); api.holdPost(hold);
  const presentation = first.award(); first.sync.retry(); await settle();
  first.progress.toggle(cards[0], presentation, ["a"], 1001);
  api.holdPost(undefined); release(); await settle(); first.sync.retry(); await settle();
  assert.equal(first.percentage(), 0);
  assert.equal(api.states.get("account:one").records[presentation].event.active, false);
  assert.equal(first.sync.getSnapshot().pending, 0);
});

test("remote reset wins over offline queue; reset API has no effect on local reviews/navigation", async t => {
  const api = server(), first = device(api), second = device(api); t.after(first.start()); t.after(second.start()); await settle();
  first.award(); first.sync.retry(); await settle(); second.sync.retry(); await settle();
  api.setOffline(true);
  const old = Object.keys(second.progress.getSnapshot().data.confirmations)[0];
  second.progress.toggle(cards[0], old, ["a"], 1001); await settle();
  api.setOffline(false);
  assert.equal(await first.sync.reset(["a"]), true);
  second.sync.retry(); await settle();
  assert.equal(second.percentage(), 0); assert.equal(second.sync.getSnapshot().pending, 0);
  assert.equal(second.sync.getSnapshot().conflict, true);
  assert.equal(first.progress.getSnapshot().data.visit, 1);
});

test("effect restart and denied storage keep working without claiming durable local writes", async t => {
  const api = server(), first = device(api);
  first.start()(); t.after(first.start()); await settle(); await settle();
  assert.equal(first.sync.getSnapshot().status, "saved");
  const sync = createProgressSync("account:one", first.progress, inventory, { request: api.request("account:one"), storage: () => { throw new Error("Denied"); } });
  t.after(sync.start()); await settle();
  assert.equal(sync.getSnapshot().storageAvailable, false);
  assert.equal(sync.getSnapshot().status, "saved");
});

test("a crash after caching a remote reset cannot resurrect the stale progress cache", async t => {
  const api = server(), first = device(api); const stop = first.start(); await settle();
  first.award(); first.sync.retry(); await settle();
  const oldProgress = new Map(first.records);
  assert.equal(await first.sync.reset(["a"]), true);
  const resetQueue = first.records.get(syncStorageKey("account:one")); stop();
  oldProgress.set(syncStorageKey("account:one"), resetQueue);
  const restored = device(api, "account:one", oldProgress); t.after(restored.start()); await settle();
  assert.equal(restored.percentage(), 0);
  assert.equal(Object.keys(api.states.get("account:one").records).length, 0);
});

test("same-record client conflicts apply the server version and expose a notice", async t => {
  const api = server(), first = device(api), second = device(api); t.after(first.start()); t.after(second.start()); await settle();
  const presentation = first.award(); first.sync.retry(); await settle(); second.sync.retry(); await settle();
  api.setOffline(true);
  second.progress.toggle(cards[0], presentation, ["a"], 1001); await settle();
  first.progress.toggle(cards[0], presentation, ["a"], 1002); await settle();
  api.setOffline(false); first.sync.retry(); await settle();
  first.progress.toggle(cards[0], presentation, ["a"], 1003); first.sync.retry(); await settle();
  second.sync.retry(); await settle();
  assert.equal(second.percentage(), 10);
  assert.equal(second.sync.getSnapshot().conflict, true);
  assert.equal(second.sync.getSnapshot().pending, 0);
});

test("guest section preferences persist independently, including clear-all, without network requests", async t => {
  const api = server(), guest = device(api, 'guest'); t.after(guest.start());
  guest.sync.setSections(['fe-1.2']);
  const restored = device(api, 'guest', guest.records); t.after(restored.start());
  assert.deepEqual(restored.sync.getSnapshot().sections, ['fe-1.2']);
  restored.sync.setSections([]);
  const empty = device(api, 'guest', guest.records); t.after(empty.start());
  assert.deepEqual(empty.sync.getSnapshot().sections, []);
  const account = device(api, 'account:one', guest.records); t.after(account.start()); await settle();
  assert.deepEqual(account.sync.getSnapshot().sections, inventory.sections);
  assert.equal(api.states.has('guest'), false);
});

test("inventory changes remove obsolete section selections and do not silently opt into new ones", async () => {
  const { parseCloudState } = await import('../src/lib/learning-progress/sync-model.ts');
  const state = initialCloudState(['old']);
  state.sections = { ids: ['old'], version: 1, mutationId: randomUUID() };
  assert.deepEqual(parseCloudState(state, inventory).sections.ids, []);
  state.sections.version = 0;
  assert.deepEqual(parseCloudState(state, inventory).sections.ids, inventory.sections);
});
