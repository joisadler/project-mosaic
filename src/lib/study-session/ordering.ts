import type { LearningCardData } from "../../content/card-types.ts";
import { cardPercentage, repeatEligibility, type ProgressData } from "../learning-progress/progress";

export const NEW_CARD_SLOTS = 2;
export const RECENT_CARD_WINDOW = 5;

// A round is a permutation, never a weighted sampling with replacement.
export function orderStudyRound(
  cards: readonly LearningCardData[], sections: ReadonlyMap<string, string>, selected: readonly string[],
  progress: ProgressData, recent: readonly string[] = [], now = Date.now(), random = Math.random,
): string[] {
  const allowed = new Set(selected);
  const remaining = [...new Map(cards.filter(card => allowed.has(sections.get(card.id) ?? "") && cardPercentage(progress, card.id) < 100)
    .map(card => [card.id, card])).values()];
  const pool = remaining.map(card => card.id);
  const metadata = new Map(remaining.map(card => [card.id, {
    partial: cardPercentage(progress, card.id) > 0,
    due: repeatEligibility(progress, card.id, pool, now).eligible,
    tie: random(),
  }]));
  const sectionCounts = new Map<string, number>();
  const sectionSizes = new Map<string, number>();
  for (const card of remaining) {
    const section = sections.get(card.id)!;
    sectionSizes.set(section, (sectionSizes.get(section) ?? 0) + 1);
  }
  const typeCounts = new Map<string, number>();
  const history = [...recent];
  const result: string[] = [];
  while (remaining.length) {
    let candidates = remaining;
    // Relax oldest exclusions only when the remaining pool cannot satisfy them.
    for (let window = Math.min(RECENT_CARD_WINDOW, history.length); window >= 0; window--) {
      const excluded = new Set(window ? history.slice(-window) : []);
      const safe = remaining.filter(card => !excluded.has(card.id));
      if (safe.length) { candidates = safe; break; }
    }
    const partialSlot = result.length % (NEW_CARD_SLOTS + 1) === NEW_CARD_SLOTS;
    const preferred = candidates.filter(card => metadata.get(card.id)!.partial === partialSlot);
    if (preferred.length) candidates = preferred;
    const last = cards.find(card => card.id === history.at(-1));
    const score = (card: LearningCardData) => [
      metadata.get(card.id)!.due ? 0 : 1,
      (sectionCounts.get(sections.get(card.id)!) ?? 0) / sectionSizes.get(sections.get(card.id)!)!,
      sections.get(card.id) === (last && sections.get(last.id)) ? 1 : 0,
      typeCounts.get(card.type) ?? 0,
      card.type === last?.type ? 1 : 0,
      metadata.get(card.id)!.tie,
    ];
    const ranked = candidates.map(card => ({ card, score: score(card) })).sort((a, b) => {
      for (let i = 0; i < a.score.length; i++) if (a.score[i] !== b.score[i]) return a.score[i] - b.score[i];
      return 0;
    });
    const card = ranked[0].card;
    result.push(card.id); history.push(card.id);
    const section = sections.get(card.id)!;
    sectionCounts.set(section, (sectionCounts.get(section) ?? 0) + 1);
    typeCounts.set(card.type, (typeCounts.get(card.type) ?? 0) + 1);
    remaining.splice(remaining.indexOf(card), 1);
  }
  return result;
}
