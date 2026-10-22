import type { LearningCardData } from "../../content/card-types.ts";

export const REPEAT_DELAY_MS = 10 * 60 * 1000;
export const REPEAT_OTHER_CARDS = 5;
const TARGET = 10;

export type Confirmation = {
  id: string;
  presentationId: string;
  cardId: string;
  sectionId: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  visit: number;
};
export type CardReview = { cardId: string; pages: number[]; answerSeen: boolean; feedbackOptionId?: string };
export type ProgressData = {
  version: 1;
  confirmations: Record<string, Confirmation>;
  reviews: Record<string, CardReview>;
  visit: number;
  lastCardId: string | null;
  lastSeen: Record<string, number>;
};

export function progressStorageKey(owner: string) {
  return `mosaic:progress:v1:${encodeURIComponent(owner)}`;
}

function emptyProgress(): ProgressData {
  return { version: 1, confirmations: {}, reviews: {}, visit: 0, lastCardId: null, lastSeen: {} };
}
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function positiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

export function restoreProgress(raw: string | null, cards: readonly LearningCardData[], sections: ReadonlyMap<string, string>): ProgressData {
  let parsed: unknown;
  try { parsed = raw ? JSON.parse(raw) : null; } catch { return emptyProgress(); }
  if (!record(parsed) || parsed.version !== 1) return emptyProgress();
  const result = emptyProgress();
  const byId = new Map(cards.map(card => [card.id, card]));
  result.visit = positiveInteger(parsed.visit) ? parsed.visit : 0;
  result.lastCardId = typeof parsed.lastCardId === "string" && byId.has(parsed.lastCardId) ? parsed.lastCardId : null;
  if (record(parsed.lastSeen)) for (const [id, visit] of Object.entries(parsed.lastSeen)) {
    if (byId.has(id) && positiveInteger(visit) && visit <= result.visit) result.lastSeen[id] = visit;
  }
  if (record(parsed.confirmations)) for (const [key, event] of Object.entries(parsed.confirmations)) {
    if (!record(event) || typeof event.cardId !== "string" || !byId.has(event.cardId) ||
      typeof event.id !== "string" || !event.id || event.presentationId !== key ||
      typeof event.sectionId !== "string" || event.sectionId !== sections.get(event.cardId) || typeof event.active !== "boolean" ||
      !positiveInteger(event.createdAt) || !positiveInteger(event.updatedAt) || event.updatedAt < event.createdAt ||
      !positiveInteger(event.visit) || event.visit > result.visit) continue;
    result.confirmations[key] = {
      id: event.id, presentationId: key, cardId: event.cardId, sectionId: event.sectionId,
      active: event.active, createdAt: event.createdAt, updatedAt: event.updatedAt, visit: event.visit,
    };
  }
  if (record(parsed.reviews)) for (const [key, review] of Object.entries(parsed.reviews)) {
    if (!record(review) || typeof review.cardId !== "string") continue;
    const card = byId.get(review.cardId);
    if (!card) continue;
    const pages = card.type === "info" && Array.isArray(review.pages)
      ? [...new Set(review.pages.filter((page): page is number => positiveInteger(page) && page < card.pages.length))] : [];
    const feedbackOptionId = card.type === "quiz" && typeof review.feedbackOptionId === "string" &&
      card.options.some(option => option.id === review.feedbackOptionId) ? review.feedbackOptionId : undefined;
    result.reviews[key] = { cardId: card.id, pages, answerSeen: card.type === "flip" && review.answerSeen === true, feedbackOptionId };
  }
  return result;
}

export function cardPercentage(data: ProgressData, cardId: string) {
  return Math.min(TARGET, Object.values(data.confirmations).filter(event => event.cardId === cardId && event.active).length) * 10;
}

export function confirmationStatus(data: ProgressData, card: LearningCardData, presentationId: string, poolIds: readonly string[], now: number, selectedOptionId?: string) {
  const existing = data.confirmations[presentationId];
  if (existing) return { confirmed: existing.active, eligible: true, reason: "" };
  const review = data.reviews[presentationId];
  let reason = "";
  if (card.type === "info" && !card.pages.every((_, index) => review?.pages.includes(index))) reason = "Сначала просмотрите все страницы карточки.";
  if (card.type === "flip" && !review?.answerSeen) reason = "Сначала откройте ответ.";
  if (card.type === "quiz" && (!selectedOptionId || review?.feedbackOptionId !== selectedOptionId)) reason = "Сначала выберите ответ и просмотрите объяснение.";
  if (reason) return { confirmed: false, eligible: false, reason };
  if (cardPercentage(data, card.id) >= 100) return { confirmed: false, eligible: false, reason: "Для этой карточки уже набрано 100%." };
  const latest = Object.values(data.confirmations).filter(event => event.cardId === card.id).sort((a, b) => b.createdAt - a.createdAt)[0];
  if (latest) {
    const pool = new Set(poolIds.filter(id => id !== card.id));
    const required = Math.min(REPEAT_OTHER_CARDS, pool.size);
    const seen = [...pool].filter(id => (data.lastSeen[id] ?? 0) > latest.visit).length;
    if (now - latest.createdAt < REPEAT_DELAY_MS || seen < required)
      return { confirmed: false, eligible: false, reason: `Следующее начисление — через 10 минут после предыдущего${required ? (required === 5 ? " и после просмотра 5 других карточек" : " и после просмотра остальных карточек") : ""}.` };
  }
  return { confirmed: false, eligible: true, reason: "" };
}

export function createProgressStore(
  cards: readonly LearningCardData[], sections: ReadonlyMap<string, string>, owner: string | null,
  storage: () => Pick<Storage, "getItem" | "setItem"> = () => localStorage,
) {
  const key = owner && owner !== "unavailable" ? progressStorageKey(owner) : null;
  const initial = { data: emptyProgress(), ready: false, storageAvailable: owner !== "unavailable" };
  let snapshot = initial;
  let initialized = false;
  const listeners = new Set<() => void>();
  const publish = (data: ProgressData) => {
    let storageAvailable = snapshot.storageAvailable;
    if (key) try { storage().setItem(key, JSON.stringify(data)); } catch { storageAvailable = false; }
    snapshot = { data, ready: true, storageAvailable };
    listeners.forEach(listener => listener());
  };
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initial,
    replaceConfirmations(events: Record<string, Omit<Confirmation, "visit">>) {
      const data = snapshot.data;
      const confirmations = Object.fromEntries(Object.entries(events).map(([key, event]) => [key, {
        ...event, visit: data.confirmations[key]?.id === event.id ? data.confirmations[key].visit : data.visit,
      }]));
      if (JSON.stringify(confirmations) !== JSON.stringify(data.confirmations)) publish({ ...data, confirmations });
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!initialized && owner) {
        initialized = true;
        let raw: string | null = null;
        try { raw = key ? storage().getItem(key) : null; } catch { snapshot = { ...snapshot, storageAvailable: false }; }
        publish(restoreProgress(raw, cards, sections));
      }
      return () => { listeners.delete(listener); };
    },
    review(cardId: string, presentationId: string, patch: Partial<Omit<CardReview, "cardId">>) {
      if (!snapshot.ready) return;
      const data = snapshot.data;
      const prior = data.reviews[presentationId] ?? { cardId, pages: [], answerSeen: false };
      const next = { ...prior, ...patch, pages: [...new Set([...prior.pages, ...(patch.pages ?? [])])] };
      const changedCard = data.lastCardId !== cardId;
      if (!changedCard && JSON.stringify(prior) === JSON.stringify(next)) return;
      const visit = data.visit + (changedCard ? 1 : 0);
      publish({ ...data, visit, lastCardId: cardId, lastSeen: { ...data.lastSeen, [cardId]: visit }, reviews: { ...data.reviews, [presentationId]: next } });
    },
    toggle(card: LearningCardData, presentationId: string, poolIds: readonly string[], now = Date.now(), selectedOptionId?: string) {
      if (!snapshot.ready) return "Прогресс ещё загружается.";
      const sectionId = sections.get(card.id);
      if (!sectionId) return "Раздел карточки не найден.";
      const status = confirmationStatus(snapshot.data, card, presentationId, poolIds, now, selectedOptionId);
      if (!status.eligible) return status.reason;
      const prior = snapshot.data.confirmations[presentationId];
      const event: Confirmation = prior
        ? { ...prior, active: !prior.active, updatedAt: Math.max(prior.updatedAt + 1, now) }
        : { id: crypto.randomUUID(), presentationId, cardId: card.id, sectionId, active: true, createdAt: now, updatedAt: now, visit: snapshot.data.visit };
      publish({ ...snapshot.data, confirmations: { ...snapshot.data.confirmations, [presentationId]: event } });
      if (!event.active) return "Подтверждение этой карточки отменено.";
      return snapshot.storageAvailable ? "Понятно. Подтверждение сохранено."
        : "Понятно. Сохранение недоступно: подтверждение действует до закрытия приложения.";
    },
  };
}
