import type { LearningCardData, VisualMotif } from "@/content/card-types";
import { learningSectionIdByCardId, type LearningSectionId } from "@/content/learning-sections";

const sectionPresets = {
  "fe-1.1": { defaultMotif: "scope", motifs: ["scope", "lifecycle"] },
  "fe-1.2": { defaultMotif: "values", motifs: ["values", "equality", "conversion"] },
  "fe-1.3": { defaultMotif: "capture", motifs: ["capture", "invocation", "composition"] },
} as const satisfies Record<LearningSectionId, {
  defaultMotif: VisualMotif;
  motifs: readonly VisualMotif[];
}>;

export function getCardPresentation(card: Pick<LearningCardData, "id" | "visual"> | undefined) {
  const section = card ? learningSectionIdByCardId.get(card.id) : undefined;

  if (!section) {
    return { section: "neutral", motif: "neutral" } as const;
  }

  const preset = sectionPresets[section];
  const requested = card?.visual?.motif;
  const supported: readonly VisualMotif[] = preset.motifs;

  return {
    section,
    motif: requested && supported.includes(requested) ? requested : preset.defaultMotif,
  };
}
