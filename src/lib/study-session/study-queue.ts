import type { LearningCardData } from "../../content/card-types.ts";
import { completedCardIds, type ProgressData } from "../learning-progress/progress";
import { orderStudyRound } from "./ordering";
import { filterSession, presentationId, type StudyEntry, type StudySession } from "./session";

export const MIN_HISTORY_ENTRIES = 20;
export const FORWARD_BUFFER = 2;

export function ensureStudyQueue(
  session: StudySession, cards: readonly LearningCardData[], sections: ReadonlyMap<string, string>,
  selected: readonly string[], progress: ProgressData, fresh = false, now = Date.now(),
): StudySession {
  const completed = completedCardIds(progress.confirmations);
  const eligible = new Set(cards.filter(card => !completed.has(card.id)).map(card => card.id));
  let next = session;
  if (!next.queue) {
    const ordered = fresh ? orderStudyRound(cards, sections, selected, progress, [], now) : [];
    const chosen = new Set(ordered);
    const order = [...ordered, ...session.order.filter(id => !chosen.has(id))];
    const migrate = <T>(values: Record<string, T>) => Object.fromEntries(Object.entries(values).map(([id, value]) => [presentationId(session, id), value]));
    next = { ...session, order, queue: order.map(cardId => ({ id: presentationId(session, cardId), cardId })),
      currentEntryId: presentationId(session, fresh ? order[0] ?? "" : session.currentCardId ?? ""),
      currentCardId: fresh ? order[0] ?? null : session.currentCardId,
      pages: migrate(session.pages), answers: migrate(session.answers), sides: migrate(session.sides) };
  }
  const visible = filterSession(next, selected, sections, eligible);
  const currentIndex = visible.queue!.findIndex(entry => entry.id === visible.currentEntryId);
  const ahead = visible.queue!.length - Math.max(0, currentIndex) - 1;
  if (visible.queue!.length && ahead >= FORWARD_BUFFER) return next;
  const allowed = new Set(selected);
  const pool = cards.filter(card => eligible.has(card.id) && allowed.has(sections.get(card.id) ?? ""));
  if (!pool.length) return next;
  const queue = [...next.queue!];
  const recent = visible.queue!.slice(0, currentIndex + 1).map(entry => entry.cardId);
  const upcoming = visible.queue!.slice(currentIndex + 1).map(entry => entry.cardId);
  // Include already planned cards at the boundary; appending cannot reorder them.
  recent.push(...upcoming);
  let added = 0;
  while (ahead + added < FORWARD_BUFFER) {
    const round = crypto.randomUUID();
    const order = orderStudyRound(pool, sections, selected, progress, recent, now);
    queue.push(...order.map(cardId => ({ id: `${round}:${cardId}`, cardId })));
    recent.push(...order); added += order.length;
  }
  const currentEntryId = visible.currentEntryId ?? queue.find(entry => eligible.has(entry.cardId) && allowed.has(sections.get(entry.cardId) ?? ""))?.id;
  const index = queue.findIndex(entry => entry.id === currentEntryId);
  const trim = Math.max(0, index - Math.max(cards.length, MIN_HISTORY_ENTRIES));
  const retained = queue.slice(trim);
  const ids = new Set(retained.map(entry => entry.id));
  const keep = <T>(values: Record<string, T>) => Object.fromEntries(Object.entries(values).filter(([key]) => ids.has(key)));
  return { ...next, queue: retained, currentEntryId, currentCardId: retained.find(entry => entry.id === currentEntryId)?.cardId ?? null,
    pages: keep(next.pages), answers: keep(next.answers), sides: keep(next.sides) };
}

export function sessionEntries(session: StudySession): StudyEntry[] {
  return session.queue ?? session.order.map(cardId => ({ id: presentationId(session, cardId), cardId }));
}

export function interactionKey(session: StudySession | null, entryId: string, cardId: string) {
  return session?.queue ? entryId : cardId;
}
