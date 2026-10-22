import type { LearningCardData } from "../../content/card-types.ts";

export type StudySession = {
  version: 1;
  id: string;
  order: string[];
  currentCardId: string | null;
  pages: Record<string, number>;
  answers: Record<string, string>;
  sides: Record<string, 0 | 1>;
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
  for (const card of cards) {
    if (card.type === "info") {
      const page = record(saved.pages) ? saved.pages[card.id] : undefined;
      if (typeof page === "number" && Number.isSafeInteger(page) && page >= 0)
        pages[card.id] = Math.min(page, Math.max(0, card.pages.length - 1));
    } else if (card.type === "quiz") {
      const answer = record(saved.answers) ? saved.answers[card.id] : undefined;
      if (typeof answer === "string" && card.options.some(option => option.id === answer)) answers[card.id] = answer;
    } else {
      const side = record(saved.sides) ? saved.sides[card.id] : undefined;
      if (side === 0 || side === 1) sides[card.id] = side;
    }
  }
  return { version: 1, id: saved.id, order, currentCardId, pages, answers, sides };
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
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!initialized && owner) {
        initialized = true;
        let raw: string | null = null;
        try { raw = key ? storage().getItem(key) : null; }
        catch { snapshot = { ...snapshot, storageAvailable: false }; }
        publish(restoreSession(raw, cards));
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
