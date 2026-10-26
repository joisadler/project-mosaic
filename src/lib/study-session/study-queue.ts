import type { LearningCardData } from "../../content/card-types.ts";
import { completedCardIds, type ProgressData } from "../learning-progress/progress";
import { orderStudyRound } from "./ordering";
import { filterSession, presentationId, type StudyEntry, type StudySession } from "./session";

export const MIN_HISTORY_ENTRIES = 20;
export const FORWARD_BUFFER = 2;

function trimStudyHistory(session: StudySession, inventorySize: number): StudySession {
  const index = session.queue!.findIndex(entry => entry.id === session.currentEntryId);
  const trim = Math.max(0, index - Math.max(inventorySize, MIN_HISTORY_ENTRIES));
  if (!trim) return session;
  const retained = session.queue!.slice(trim);
  const ids = new Set(retained.map(entry => entry.id));
  const keep = <T>(values: Record<string, T>) => Object.fromEntries(Object.entries(values).filter(([key]) => ids.has(key)));
  const rounds = new Set(retained.map(entry => entry.id.slice(0, 36)));
  return { ...session, queue: retained, pages: keep(session.pages), answers: keep(session.answers), sides: keep(session.sides),
    ...(session.queuePlan ? { queuePlan: { ...session.queuePlan, reconciled: session.queuePlan.reconciled.filter(id => rounds.has(id)) } } : {}) };
}

function reconcileCurrentRound(
  session: StudySession, pool: readonly LearningCardData[], sections: ReadonlyMap<string, string>,
  selected: readonly string[], progress: ProgressData, now: number, fresh: boolean,
): StudySession {
  const queue = session.queue!;
  const selection = [...new Set(selected)].sort();
  const poolIds = pool.map(card => card.id).sort();
  const previous = session.queuePlan;
  const sameList = (left: readonly string[] | undefined, right: readonly string[]) =>
    left?.length === right.length && left.every((id, index) => id === right[index]);
  const samePlan = sameList(previous?.sections, selection) && sameList(previous?.eligible, poolIds);
  const eligible = new Set(poolIds);
  const visible = filterSession(session, selected, sections, eligible);
  const index = queue.findIndex(entry => entry.id === visible.currentEntryId);
  if (index < 0 || !pool.length) return session;
  const round = queue[index].id.slice(0, 36);
  const repairOrder = !fresh && (previous?.version !== 1 || !previous.reconciled.includes(round));
  if (!repairOrder && samePlan && previous!.reconciled.includes(round)) return session;
  let start = index, end = index + 1;
  while (start > 0 && queue[start - 1].id.startsWith(`${round}:`)) start--;
  while (end < queue.length && queue[end].id.startsWith(`${round}:`)) end++;
  const pastRounds = queue.slice(0, start).map(entry => entry.id.slice(0, 36));
  const next = { ...session, queuePlan: { version: 1 as const, sections: selection, eligible: poolIds,
    reconciled: [...new Set([...(samePlan && previous?.version === 1 ? previous.reconciled : []), ...pastRounds, round])] } };
  const included = new Set(queue.slice(start, end).map(entry => entry.cardId));
  const previousSelection = new Set(previous?.sections ?? selection);
  const previousPool = new Set(previous?.reconciled.includes(round) ? previous.eligible : []);
  const newlySelected = new Set(selection.filter(id => !previousSelection.has(id)));
  const upcoming = queue.slice(index + 1, end);
  const introduced = new Map(upcoming.filter(entry => eligible.has(entry.cardId) && newlySelected.has(sections.get(entry.cardId) ?? ""))
    .map(entry => [entry.cardId, entry]));
  // A reconciled round may have a trimmed prefix; do not resurrect those old entries.
  for (const card of pool) if (!included.has(card.id) && !previousPool.has(card.id))
    introduced.set(card.id, { id: `${round}:${card.id}`, cardId: card.id });
  if (!introduced.size && !repairOrder) return next;

  const retained = upcoming.filter(entry => !introduced.has(entry.cardId));
  const remaining = new Set([...retained.map(entry => entry.cardId), ...introduced.keys()]);
  const recent = queue.slice(0, index + 1).filter(entry => eligible.has(entry.cardId)).map(entry => entry.cardId);
  const planned = orderStudyRound(pool.filter(card => remaining.has(card.id)), sections, selected, progress, recent, now);
  if (repairOrder) {
    // Old snapshots can already contain new inventory as an appended block.
    const entries = new Map([...upcoming, ...introduced.values()].map(entry => [entry.cardId, entry]));
    const merged = [...planned.map(id => entries.get(id)!), ...upcoming.filter(entry => !eligible.has(entry.cardId))];
    return { ...next, queue: [...queue.slice(0, index + 1), ...merged, ...queue.slice(end)] };
  }
  const merged: StudyEntry[] = [];
  let retainedIndex = 0;
  // The planner chooses insertion slots; retained entries keep their IDs and relative order.
  for (const id of planned) {
    const entry = introduced.get(id);
    if (entry) merged.push(entry);
    else while (retainedIndex < retained.length) {
      const retainedEntry = retained[retainedIndex++];
      merged.push(retainedEntry);
      if (eligible.has(retainedEntry.cardId)) break;
    }
  }
  merged.push(...retained.slice(retainedIndex));
  return { ...next, queue: [...queue.slice(0, index + 1), ...merged, ...queue.slice(end)] };
}

export function ensureStudyQueue(
  session: StudySession, cards: readonly LearningCardData[], sections: ReadonlyMap<string, string>,
  selected: readonly string[], progress: ProgressData, fresh = false, now = Date.now(),
): StudySession {
  const completed = completedCardIds(progress.confirmations);
  const eligible = new Set(cards.filter(card => !completed.has(card.id)).map(card => card.id));
  let next = session;
  const generated = fresh && !next.queue;
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
  const allowed = new Set(selected);
  const pool = cards.filter(card => eligible.has(card.id) && allowed.has(sections.get(card.id) ?? ""));
  next = reconcileCurrentRound(next, pool, sections, selected, progress, now, generated);
  const visible = filterSession(next, selected, sections, eligible);
  const currentIndex = visible.queue!.findIndex(entry => entry.id === visible.currentEntryId);
  const ahead = visible.queue!.length - Math.max(0, currentIndex) - 1;
  if (visible.queue!.length && ahead >= FORWARD_BUFFER) return next === session ? next : trimStudyHistory(next, cards.length);
  if (!pool.length) return next;
  const queue = [...next.queue!];
  const recent = visible.queue!.slice(0, currentIndex + 1).map(entry => entry.cardId);
  const upcoming = visible.queue!.slice(currentIndex + 1).map(entry => entry.cardId);
  // Include already planned cards at the boundary; appending cannot reorder them.
  recent.push(...upcoming);
  let added = 0;
  const reconciled = [...next.queuePlan?.reconciled ?? []];
  while (ahead + added < FORWARD_BUFFER) {
    const round = crypto.randomUUID();
    const order = orderStudyRound(pool, sections, selected, progress, recent, now);
    queue.push(...order.map(cardId => ({ id: `${round}:${cardId}`, cardId })));
    reconciled.push(round);
    recent.push(...order); added += order.length;
  }
  const currentEntryId = visible.currentEntryId ?? queue.find(entry => eligible.has(entry.cardId) && allowed.has(sections.get(entry.cardId) ?? ""))?.id;
  return trimStudyHistory({ ...next, queue, currentEntryId, currentCardId: queue.find(entry => entry.id === currentEntryId)?.cardId ?? null,
    queuePlan: { version: 1, sections: [...new Set(selected)].sort(), eligible: pool.map(card => card.id).sort(), reconciled } }, cards.length);
}

export function sessionEntries(session: StudySession): StudyEntry[] {
  return session.queue ?? session.order.map(cardId => ({ id: presentationId(session, cardId), cardId }));
}

export function interactionKey(session: StudySession | null, entryId: string, cardId: string) {
  return session?.queue ? entryId : cardId;
}
