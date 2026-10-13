import type { LearningCardData } from "./card-types";
import { learningSections } from "./learning-sections";

export const learningCards: LearningCardData[] = learningSections.flatMap(
  (section) => section.cards,
);
