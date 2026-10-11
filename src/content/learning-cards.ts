import type { LearningCardData } from "./card-types";
import { feSection1_1FlipCards } from "./fe-1.1-flip-cards";
import { feSection1_1InfoCards } from "./fe-1.1-info-cards";
import { feSection1_1QuizCards } from "./fe-1.1-quiz-cards";

export const learningCards: LearningCardData[] = [
  ...feSection1_1InfoCards,
  ...feSection1_1QuizCards,
  ...feSection1_1FlipCards,
];
