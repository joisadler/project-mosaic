import type { Confirmation } from "./progress.ts";

export type CloudConfirmation = Omit<Confirmation, "visit">;
export type CloudRecord = { event: CloudConfirmation; version: number; mutationId: string };
export type CloudState = {
  version: 1;
  revision: number;
  records: Record<string, CloudRecord>;
  resets: Record<string, number>;
  sections: { ids: string[]; version: number; mutationId: string | null };
  lastResetId: string | null;
};
export type ConfirmationMutation = { mutationId: string; event: CloudConfirmation; expectedVersion: number; resetVersion: number };
export type SyncBatch = {
  mutations: ConfirmationMutation[];
  preferences?: { mutationId: string; ids: string[]; expectedVersion: number };
  reset?: { mutationId: string; cardIds: string[]; expectedRevision: number };
};
export type SyncResult = { state: CloudState; conflicts: string[] };
export type SyncInventory = { sections: readonly string[]; cardSections: ReadonlyMap<string, string> };

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
export function isCounter(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
function onlyKeys(value: Record<string, unknown>, keys: string[]) {
  return Object.keys(value).every(key => keys.includes(key));
}
function invalid(): never { throw new Error("Invalid study sync data"); }

export function initialCloudState(sectionIds: readonly string[]): CloudState {
  return { version: 1, revision: 0, records: {}, resets: {}, sections: { ids: [...sectionIds], version: 0, mutationId: null }, lastResetId: null };
}

export function parseCloudEvent(value: unknown, inventory: SyncInventory): CloudConfirmation {
  if (!isRecord(value) || !onlyKeys(value, ["id", "presentationId", "cardId", "sectionId", "active", "createdAt", "updatedAt"]) ||
    typeof value.id !== "string" || !uuid.test(value.id) || typeof value.cardId !== "string" ||
    typeof value.presentationId !== "string" || !uuid.test(value.presentationId.slice(0, 36)) ||
    value.presentationId.slice(36) !== `:${value.cardId}` ||
    typeof value.sectionId !== "string" || inventory.cardSections.get(value.cardId) !== value.sectionId ||
    typeof value.active !== "boolean" || !isCounter(value.createdAt) || !isCounter(value.updatedAt) || value.updatedAt < value.createdAt) invalid();
  return { id: value.id, presentationId: value.presentationId, cardId: value.cardId, sectionId: value.sectionId,
    active: value.active, createdAt: value.createdAt, updatedAt: value.updatedAt };
}

function parseIds(value: unknown, available: ReadonlySet<string>): string[] {
  if (!Array.isArray(value) || !value.every(id => typeof id === "string" && available.has(id)) || new Set(value).size !== value.length) invalid();
  return value as string[];
}

export function parseSyncBatch(value: unknown, inventory: SyncInventory): SyncBatch {
  if (!isRecord(value) || !onlyKeys(value, ["mutations", "preferences", "reset"]) ||
    !Array.isArray(value.mutations) || value.mutations.length > 100) invalid();
  const mutations = value.mutations.map((item): ConfirmationMutation => {
    if (!isRecord(item) || !onlyKeys(item, ["mutationId", "event", "expectedVersion", "resetVersion"]) ||
      typeof item.mutationId !== "string" || !uuid.test(item.mutationId) || !isCounter(item.expectedVersion) || !isCounter(item.resetVersion)) invalid();
    return { mutationId: item.mutationId, expectedVersion: item.expectedVersion, resetVersion: item.resetVersion, event: parseCloudEvent(item.event, inventory) };
  });
  if (new Set(mutations.map(item => item.event.presentationId)).size !== mutations.length ||
    new Set(mutations.map(item => item.mutationId)).size !== mutations.length ||
    new Set(mutations.map(item => item.event.id)).size !== mutations.length) invalid();
  const result: SyncBatch = { mutations };
  if (value.preferences !== undefined) {
    const item = value.preferences;
    if (!isRecord(item) || !onlyKeys(item, ["mutationId", "ids", "expectedVersion"]) ||
      typeof item.mutationId !== "string" || !uuid.test(item.mutationId) || !isCounter(item.expectedVersion)) invalid();
    result.preferences = { mutationId: item.mutationId, expectedVersion: item.expectedVersion, ids: parseIds(item.ids, new Set(inventory.sections)) };
  }
  if (value.reset !== undefined) {
    const item = value.reset;
    if (!isRecord(item) || !onlyKeys(item, ["mutationId", "cardIds", "expectedRevision"]) ||
      typeof item.mutationId !== "string" || !uuid.test(item.mutationId) || !isCounter(item.expectedRevision) || mutations.length || result.preferences) invalid();
    const cardIds = parseIds(item.cardIds, new Set(inventory.cardSections.keys()));
    if (!cardIds.length) invalid();
    result.reset = { mutationId: item.mutationId, expectedRevision: item.expectedRevision, cardIds };
  }
  return result;
}

// Only the targeted record changes. Client wall clocks never resolve conflicts.
export function applySyncBatch(current: CloudState, batch: SyncBatch): SyncResult {
  const state = structuredClone(current);
  const conflicts: string[] = [];
  let changed = false;
  for (const mutation of batch.mutations) {
    const key = mutation.event.presentationId;
    const existing = state.records[key];
    if (existing?.mutationId === mutation.mutationId) continue;
    if ((state.resets[mutation.event.cardId] ?? 0) !== mutation.resetVersion ||
      (existing?.version ?? 0) !== mutation.expectedVersion ||
      (existing && (existing.event.id !== mutation.event.id || existing.event.createdAt !== mutation.event.createdAt)) ||
      Object.values(state.records).some(record => record.event.id === mutation.event.id && record.event.presentationId !== key)) {
      conflicts.push(mutation.mutationId);
      continue;
    }
    state.records[key] = { event: mutation.event, version: (existing?.version ?? 0) + 1, mutationId: mutation.mutationId };
    changed = true;
  }
  const preferences = batch.preferences;
  if (preferences && state.sections.mutationId !== preferences.mutationId) {
    if (state.sections.version !== preferences.expectedVersion) conflicts.push(preferences.mutationId);
    else { state.sections = { ids: preferences.ids, version: state.sections.version + 1, mutationId: preferences.mutationId }; changed = true; }
  }
  const reset = batch.reset;
  if (reset && state.lastResetId !== reset.mutationId) {
    if (state.revision !== reset.expectedRevision) conflicts.push(reset.mutationId);
    else {
      const ids = new Set(reset.cardIds);
      for (const id of ids) state.resets[id] = (state.resets[id] ?? 0) + 1;
      for (const [key, record] of Object.entries(state.records)) if (ids.has(record.event.cardId)) delete state.records[key];
      state.lastResetId = reset.mutationId;
      changed = true;
    }
  }
  if (changed) state.revision++;
  return { state, conflicts };
}

export function cloudEvent(event: Confirmation): CloudConfirmation {
  const { id, presentationId, cardId, sectionId, active, createdAt, updatedAt } = event;
  return { id, presentationId, cardId, sectionId, active, createdAt, updatedAt };
}

export function parseCloudState(value: unknown, inventory: SyncInventory): CloudState {
  if (!isRecord(value) || value.version !== 1 || !isCounter(value.revision) || !isRecord(value.records) ||
    !isRecord(value.resets) || !isRecord(value.sections) || !isCounter(value.sections.version) ||
    !(value.sections.mutationId === null || typeof value.sections.mutationId === "string") ||
    !(value.lastResetId === null || typeof value.lastResetId === "string")) invalid();
  const state = initialCloudState(inventory.sections);
  state.revision = value.revision;
  state.lastResetId = value.lastResetId;
  state.sections = { ids: parseIds(value.sections.ids, new Set(inventory.sections)), version: value.sections.version, mutationId: value.sections.mutationId };
  for (const [key, entry] of Object.entries(value.records)) {
    if (!isRecord(entry) || !isCounter(entry.version) || entry.version < 1 || typeof entry.mutationId !== "string") invalid();
    // Content removed from the registry must not prevent other cards from syncing.
    if (isRecord(entry.event) && typeof entry.event.cardId === "string" && !inventory.cardSections.has(entry.event.cardId)) continue;
    const event = parseCloudEvent(entry.event, inventory);
    if (key !== event.presentationId) invalid();
    state.records[key] = { event, version: entry.version, mutationId: entry.mutationId };
  }
  for (const [id, version] of Object.entries(value.resets)) {
    if (!isCounter(version)) invalid();
    if (inventory.cardSections.has(id)) state.resets[id] = version;
  }
  return state;
}
