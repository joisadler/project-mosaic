import type { LearningCardData } from "../../content/card-types.ts";

export type StudyEntry = { id: string; cardId: string };

export type StudySession = {
  version: 1;
  id: string;
  order: string[];
  currentCardId: string | null;
  pages: Record<string, number>;
  answers: Record<string, string>;
  sides: Record<string, 0 | 1>;
  queue?: StudyEntry[];
  currentEntryId?: string;
};

export function sessionStorageKey(owner: string, scope = "study:all") {
  return `mosaic:session:v1:${encodeURIComponent(owner)}:${encodeURIComponent(scope)}`;
}

export function presentationId(session: StudySession, cardId: string) {
  return `${session.id}:${cardId}`;
}

// Filtering is a view of the existing session, never a new presentation.
export function filterSession(session: StudySession, selected: readonly string[], sections: ReadonlyMap<string, string>, eligible?: ReadonlySet<string>): StudySession {
  const allowed = new Set(selected);
  const includes = (id: string) => allowed.has(sections.get(id) ?? "") && (!eligible || eligible.has(id));
  const order = session.order.filter(includes);
  if (session.queue) {
    const queue = session.queue.filter(entry => includes(entry.cardId));
    const index = session.queue.findIndex(entry => entry.id === session.currentEntryId);
    const entry = queue.find(entry => entry.id === session.currentEntryId) ??
      session.queue.slice(Math.max(0, index)).find(entry => includes(entry.cardId)) ?? queue.at(-1);
    return { ...session, order, queue, currentEntryId: entry?.id, currentCardId: entry?.cardId ?? null };
  }
  if (order.length === session.order.length) return session;
  const currentIndex = session.order.indexOf(session.currentCardId ?? "");
  const currentCardId = order.includes(session.currentCardId ?? "") ? session.currentCardId :
    session.order.slice(Math.max(0, currentIndex)).find(includes) ?? order.at(-1) ?? null;
  return { ...session, order, currentCardId };
}

function shuffle(ids: string[]) {
  const result = [...ids];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createSession(cards: readonly LearningCardData[]): StudySession {
  const order = shuffle(cards.map(card => card.id));
  return { version: 1, id: crypto.randomUUID(), order, currentCardId: order[0] ?? null, pages: {}, answers: {}, sides: {} };
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Treat browser storage as untrusted input and reconcile against current content.
export function restoreSession(raw: string | null, cards: readonly LearningCardData[]): StudySession {
  let saved: unknown;
  try { saved = raw ? JSON.parse(raw) : null; } catch { saved = null; }
  if (!record(saved) || saved.version !== 1 || typeof saved.id !== "string" ||
    !/^[0-9a-f-]{36}$/i.test(saved.id) || !Array.isArray(saved.order) ||
    !saved.order.every(id => typeof id === "string")) return createSession(cards);

  const available = new Set(cards.map(card => card.id));
  const oldOrder = saved.order as string[];
  const order = [...new Set(oldOrder)].filter(id => available.has(id));
  const retained = new Set(order);
  order.push(...shuffle(cards.filter(card => !retained.has(card.id)).map(card => card.id)));
  const oldIndex = oldOrder.indexOf(typeof saved.currentCardId === "string" ? saved.currentCardId : "");
  const currentCardId = typeof saved.currentCardId === "string" && available.has(saved.currentCardId)
    ? saved.currentCardId : order[Math.min(Math.max(oldIndex, 0), order.length - 1)] ?? null;
  const pages: StudySession["pages"] = {};
  const answers: StudySession["answers"] = {};
  const sides: StudySession["sides"] = {};
  const byId = new Map(cards.map(card => [card.id, card]));
  const queue: StudyEntry[] | undefined = Array.isArray(saved.queue) ? [] : undefined;
  const entryIds = new Set<string>();
  if (queue) for (const entry of (saved.queue as unknown[]).slice(-Math.max(3 * cards.length, 64))) {
    if (!record(entry) || typeof entry.id !== "string" || typeof entry.cardId !== "string" ||
      !byId.has(entry.cardId) || !/^[0-9a-f-]{36}$/i.test(entry.id.slice(0, 36)) ||
      entry.id.slice(36) !== `:${entry.cardId}` || entryIds.has(entry.id)) continue;
    queue.push({ id: entry.id, cardId: entry.cardId }); entryIds.add(entry.id);
  }
  const interactions = queue ? queue.map(entry => [entry.id, byId.get(entry.cardId)!] as const) : cards.map(card => [card.id, card] as const);
  for (const [key, card] of interactions) {
    if (card.type === "info") {
      const page = record(saved.pages) ? saved.pages[key] : undefined;
      if (typeof page === "number" && Number.isSafeInteger(page) && page >= 0)
        pages[key] = Math.min(page, Math.max(0, card.pages.length - 1));
    } else if (card.type === "quiz") {
      const answer = record(saved.answers) ? saved.answers[key] : undefined;
      if (typeof answer === "string" && card.options.some(option => option.id === answer)) answers[key] = answer;
    } else {
      const side = record(saved.sides) ? saved.sides[key] : undefined;
      if (side === 0 || side === 1) sides[key] = side;
    }
  }
  const entry = queue?.find(entry => entry.id === saved.currentEntryId) ?? queue?.find(entry => entry.cardId === currentCardId) ?? queue?.[0];
  return { version: 1, id: saved.id, order, currentCardId: queue ? entry?.cardId ?? null : currentCardId, pages, answers, sides,
    ...(queue ? { queue, currentEntryId: entry?.id } : {}) };
}

export function createSessionStore(
  cards: readonly LearningCardData[],
  owner: string | null,
  storage: () => Pick<Storage, "getItem" | "setItem"> = () => localStorage,
  scope = "study:all",
) {
  const key = owner && owner !== "unavailable" ? sessionStorageKey(owner, scope) : null;
  const serverSnapshot = { session: null as StudySession | null, storageAvailable: owner !== "unavailable" };
  let snapshot = serverSnapshot;
  let initialized = false;
  let restored = false;
  const listeners = new Set<() => void>();
  const publish = (session: StudySession) => {
    let storageAvailable = snapshot.storageAvailable;
    if (key) {
      try { storage().setItem(key, JSON.stringify(session)); }
      catch { storageAvailable = false; }
    }
    snapshot = { session, storageAvailable };
    listeners.forEach(listener => listener());
  };
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    wasRestored: () => restored,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!initialized && owner) {
        initialized = true;
        let raw: string | null = null;
        try { raw = key ? storage().getItem(key) : null; }
        catch { snapshot = { ...snapshot, storageAvailable: false }; }
        const session = restoreSession(raw, cards);
        try { restored = !!raw && JSON.parse(raw).id === session.id; } catch { restored = false; }
        publish(session);
      }
      return () => { listeners.delete(listener); };
    },
    update(change: (current: StudySession) => StudySession) {
      if (!snapshot.session) return;
      const next = change(snapshot.session);
      if (next !== snapshot.session) publish(next);
    },
    restart() {
      const next = createSession(cards);
      if (next.order.length > 1 && next.order.every((id, index) => id === snapshot.session?.order[index])) {
        next.order.push(next.order.shift()!);
        next.currentCardId = next.order[0];
      }
      publish(next);
    },
  };
}
