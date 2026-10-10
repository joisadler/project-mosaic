import type { LearningCardData } from "./card-types";
import { js11FlipCards } from "./js-1.1-flip-cards";
import { js11InfoCards } from "./js-1.1-info-cards";
import { js11QuizCards } from "./js-1.1-quiz-cards";

export const learningCards: LearningCardData[] = [
  ...js11InfoCards,
  ...js11QuizCards,
  ...js11FlipCards,
];
