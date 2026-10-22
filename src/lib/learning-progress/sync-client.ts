import type { createProgressStore } from "./progress";
import { cloudEvent, initialCloudState, isRecord, parseCloudState, parseSyncBatch, type CloudState, type ConfirmationMutation, type SyncBatch, type SyncInventory } from "./sync-model";

type ProgressStore = ReturnType<typeof createProgressStore>;
type PendingPreferences = NonNullable<SyncBatch["preferences"]>;
export type SyncSnapshot = {
  status: "local" | "loading" | "syncing" | "saved" | "offline" | "error" | "unauthorized" | "unavailable";
  pending: number;
  storageAvailable: boolean;
  conflict: boolean;
  sections: string[];
};
export function syncStorageKey(owner: string) { return `mosaic:sync:v1:${encodeURIComponent(owner)}`; }

// No navigation state, review history, profile data, or credentials enter this queue.
export function createProgressSync(owner: string | null, progress: ProgressStore, inventory: SyncInventory, options: {
  storage?: () => Pick<Storage, "getItem" | "setItem">;
  request?: typeof fetch;
} = {}) {
  const account = !!owner?.startsWith("account:");
  const storage = options.storage ?? (() => localStorage);
  const request = options.request ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
  const initial: SyncSnapshot = { status: owner === "unavailable" ? "unavailable" : account || owner === null ? "loading" : "local", pending: 0, storageAvailable: true, conflict: false, sections: [...inventory.sections] };
  let snapshot = initial;
  let cloud = initialCloudState(inventory.sections);
  const pending: Record<string, ConfirmationMutation> = {};
  let preferences: PendingPreferences | undefined;
  let initialized = false;
  let stopped = true;
  let generation = 0;
  let resetting = false;
  let applying = false;
  let inFlight: Promise<void> | null = null;
  let controller: AbortController | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let retryDelay = 1000;
  let observed = "";
  const listeners = new Set<() => void>();
  const emit = (patch: Partial<SyncSnapshot> = {}) => {
    snapshot = { ...snapshot, ...patch, pending: Object.keys(pending).length + (preferences ? 1 : 0), sections: preferences?.ids ?? cloud.sections.ids };
    listeners.forEach(listener => listener());
  };
  const save = () => {
    try { storage().setItem(syncStorageKey(owner!), JSON.stringify({ version: 1, cloud, pending: Object.values(pending), preferences })); }
    catch { snapshot = { ...snapshot, storageAvailable: false }; }
  };
  const display = () => {
    const events = Object.fromEntries(Object.entries(cloud.records).map(([key, record]) => [key, record.event]));
    for (const [key, mutation] of Object.entries(pending)) events[key] = mutation.event;
    applying = true;
    try { progress.replaceConfirmations(events); observed = JSON.stringify(progress.getSnapshot().data.confirmations); }
    finally { applying = false; }
  };
  const schedule = (delay: number) => {
    clearTimeout(timer);
    if (!stopped) timer = setTimeout(() => { void sync(); }, delay);
  };
  const capture = () => {
    if (applying || stopped || !initialized || !progress.getSnapshot().ready) return;
    const current = progress.getSnapshot().data.confirmations;
    const serialized = JSON.stringify(current);
    if (serialized === observed) return;
    observed = serialized;
    for (const event of Object.values(current)) {
      const value = cloudEvent(event);
      const key = event.presentationId;
      const prior = pending[key]?.event ?? cloud.records[key]?.event;
      if (JSON.stringify(value) === JSON.stringify(prior)) continue;
      pending[key] = { mutationId: crypto.randomUUID(), event: value,
        expectedVersion: pending[key]?.expectedVersion ?? cloud.records[key]?.version ?? 0,
        resetVersion: pending[key]?.resetVersion ?? cloud.resets[event.cardId] ?? 0 };
    }
    save(); emit({ status: "syncing" }); schedule(250);
  };
  const accept = (next: CloudState, sent: ConfirmationMutation[] = [], sentPreferences?: PendingPreferences, conflicts: string[] = []) => {
    // A reset invalidates even actions that have not been sent yet.
    let conflict = conflicts.length > 0;
    for (const [key, mutation] of Object.entries(pending)) {
      if (mutation.resetVersion !== (next.resets[mutation.event.cardId] ?? 0)) { delete pending[key]; conflict = true; }
    }
    for (const mutation of sent) {
      const key = mutation.event.presentationId;
      const queued = pending[key];
      if (!queued) continue;
      const record = next.records[key];
      if (conflicts.includes(mutation.mutationId)) { delete pending[key]; continue; }
      if (record?.mutationId === mutation.mutationId) {
        if (queued.mutationId === mutation.mutationId) delete pending[key];
        else pending[key] = { ...queued, expectedVersion: record.version };
      }
    }
    if (sentPreferences && preferences) {
      if (conflicts.includes(sentPreferences.mutationId)) preferences = undefined;
      else if (next.sections.mutationId === sentPreferences.mutationId) {
        preferences = preferences.mutationId === sentPreferences.mutationId ? undefined : { ...preferences, expectedVersion: next.sections.version };
      }
    }
    cloud = next;
    save(); display(); emit({ conflict: snapshot.conflict || conflict });
  };
  const receive = async (batch?: SyncBatch) => {
    const response = await request("/api/study-state", {
      method: batch ? "POST" : "GET", credentials: "same-origin", cache: "no-store", signal: controller!.signal,
      ...(batch ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(batch) } : {}),
    });
    if (!response.ok) throw new Error(response.status === 401 ? "unauthorized" : "unavailable");
    const body: unknown = await response.json();
    if (!isRecord(body) || !Array.isArray(body.conflicts) || !body.conflicts.every(id => typeof id === "string")) throw new Error("Invalid response");
    return { state: parseCloudState(body.state, inventory), conflicts: body.conflicts as string[] };
  };
  async function sync() {
    if (stopped || !initialized || resetting) return;
    if (inFlight) return inFlight;
    clearTimeout(timer);
    controller = new AbortController();
    const activeController = controller;
    const timeout = setTimeout(() => activeController.abort(), 15_000);
    const run = generation;
    if (snapshot.status !== "error" && snapshot.status !== "offline") emit({ status: "syncing" });
    inFlight = (async () => {
      try {
        const remote = await receive();
        if (stopped || run !== generation) return;
        accept(remote.state);
        const mutations = Object.values(pending).slice(0, 100);
        const sentPreferences = preferences;
        if (mutations.length || sentPreferences) {
          const result = await receive({ mutations, preferences: sentPreferences });
          if (stopped || run !== generation) return;
          accept(result.state, mutations, sentPreferences, result.conflicts);
        }
        retryDelay = 1000;
        emit({ status: Object.keys(pending).length || preferences ? "syncing" : "saved" });
        schedule(snapshot.pending ? 250 : 30_000);
      } catch (error) {
        if (stopped || run !== generation) return;
        const unauthorized = error instanceof Error && error.message === "unauthorized";
        emit({ status: unauthorized ? "unauthorized" : typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error" });
        if (!unauthorized) { schedule(retryDelay); retryDelay = Math.min(retryDelay * 2, 30_000); }
      } finally { clearTimeout(timeout); inFlight = null; }
    })();
    return inFlight;
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initial,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    start() {
      if (owner === "guest" && !initialized) {
        initialized = true;
        try {
          const raw = storage().getItem("mosaic:sections:v1:guest");
          if (raw) {
            const saved: unknown = JSON.parse(raw);
            if (isRecord(saved) && saved.version === 1 && Array.isArray(saved.ids) && saved.ids.every(id => typeof id === "string"))
              cloud.sections.ids = [...new Set(saved.ids.filter(id => inventory.sections.includes(id)))];
          }
        } catch { snapshot = { ...snapshot, storageAvailable: false }; }
        emit();
      }
      if (!account || !stopped) return () => {};
      stopped = false;
      if (!initialized) {
        let restored = false;
        try {
          const raw = storage().getItem(syncStorageKey(owner!));
          if (raw) {
            const parsed: unknown = JSON.parse(raw);
            if (!isRecord(parsed) || parsed.version !== 1) throw new Error("Invalid queue");
            cloud = parseCloudState(parsed.cloud, inventory);
            const batch = parseSyncBatch({ mutations: [], preferences: parsed.preferences }, inventory);
            preferences = batch.preferences;
            if (!Array.isArray(parsed.pending)) throw new Error("Invalid queue");
            for (const item of parsed.pending) {
              const mutation = parseSyncBatch({ mutations: [item] }, inventory).mutations[0];
              pending[mutation.event.presentationId] = mutation;
            }
            restored = true;
          }
        } catch {
          cloud = initialCloudState(inventory.sections);
          for (const key of Object.keys(pending)) delete pending[key];
          preferences = undefined;
          emit({ storageAvailable: false });
        }
        initialized = true;
        // Once migrated, the outbox is authoritative. A crash between writing a
        // reset snapshot and updating the progress cache must not resurrect it.
        if (!restored) capture();
        display();
      }
      const unsubscribe = progress.subscribe(capture);
      // React Strict Mode may restart the effect while its aborted request settles.
      if (inFlight) void inFlight.then(() => { if (!stopped) void sync(); });
      else void sync();
      return () => { stopped = true; generation++; clearTimeout(timer); controller?.abort(); unsubscribe(); };
    },
    retry: () => { void sync(); },
    setSections(ids: string[]) {
      if (!initialized) return;
      if (owner === "guest") {
        cloud.sections.ids = parseSyncBatch({ mutations: [], preferences: { mutationId: crypto.randomUUID(), ids, expectedVersion: 0 } }, inventory).preferences!.ids;
        try { storage().setItem("mosaic:sections:v1:guest", JSON.stringify({ version: 1, ids: cloud.sections.ids })); }
        catch { snapshot = { ...snapshot, storageAvailable: false }; }
        emit(); return;
      }
      if (!account) return;
      preferences = parseSyncBatch({ mutations: [], preferences: { mutationId: crypto.randomUUID(), ids, expectedVersion: preferences?.expectedVersion ?? cloud.sections.version } }, inventory).preferences;
      save(); emit({ status: "syncing" }); schedule(250);
    },
    async reset(cardIds: string[]) {
      if (owner === "guest" && initialized && progress.getSnapshot().ready) {
        if (!cardIds.length || cardIds.some(id => !inventory.cardSections.has(id))) return false;
        const ids = new Set(cardIds);
        progress.replaceConfirmations(Object.fromEntries(Object.entries(progress.getSnapshot().data.confirmations)
          .filter(([, event]) => !ids.has(event.cardId))));
        return true;
      }
      if (!account || !initialized || stopped || resetting) return false;
      await sync();
      if (stopped || resetting || snapshot.status !== "saved") return false;
      clearTimeout(timer);
      // Resets require an online, current revision. They are never queued offline.
      const reset = parseSyncBatch({ mutations: [], reset: { mutationId: crypto.randomUUID(), cardIds, expectedRevision: cloud.revision } }, inventory);
      controller = new AbortController();
      const activeController = controller;
      const timeout = setTimeout(() => activeController.abort(), 15_000);
      const run = generation;
      resetting = true;
      emit({ status: "syncing" });
      try {
        const result = await receive(reset);
        if (stopped || run !== generation) return false;
        accept(result.state, [], undefined, result.conflicts);
        emit({ status: snapshot.pending ? "syncing" : "saved" }); schedule(snapshot.pending ? 250 : 30_000);
        return !result.conflicts.length;
      } catch { if (!stopped && run === generation) { emit({ status: "error" }); schedule(1000); } return false; }
      finally { clearTimeout(timeout); resetting = false; }
    },
  };
}
