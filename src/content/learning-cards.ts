import type { LearningCardData } from "./card-types";
import { flipCards } from "./flip-cards";
import { infoCards } from "./info-cards";
import { quizCards } from "./quiz-cards";

export const learningCards: LearningCardData[] = [
  ...infoCards,
  ...quizCards,
  ...flipCards,
];
