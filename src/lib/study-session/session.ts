import type { LearningCardData } from "../../content/card-types.ts";

export type StudyEntry = { id: string; cardId: string };

export type StudySession = {
  id: string;
  order: string[];
  currentCardId: string | null;
  pages: Record<string, number>;
  answers: Record<string, string>;
  sides: Record<string, 0 | 1>;
  queue?: StudyEntry[];
  currentEntryId?: string;
  // Ephemeral planning state for section changes within the open feed.
  queuePlan?: { sections: string[]; eligible: string[]; reconciled: string[] };
};

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
  return { id: crypto.randomUUID(), order, currentCardId: order[0] ?? null, pages: {}, answers: {}, sides: {} };
}

// A new store is a new runtime session; legacy navigation storage is never read.
export function createSessionStore(
  cards: readonly LearningCardData[],
  owner: string | null,
) {
  const serverSnapshot = { session: null as StudySession | null };
  let snapshot = serverSnapshot;
  let initialized = false;
  const listeners = new Set<() => void>();
  const publish = (session: StudySession) => {
    snapshot = { session };
    listeners.forEach(listener => listener());
  };
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!initialized && owner) {
        initialized = true;
        publish(createSession(cards));
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
