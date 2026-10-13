import type { LearningCardData } from "./card-types";
import { feSection1_1FlipCards } from "./fe-1.1-flip-cards";
import { feSection1_1InfoCards } from "./fe-1.1-info-cards";
import { feSection1_1QuizCards } from "./fe-1.1-quiz-cards";
import { feSection1_2FlipCards } from "./fe-1.2-flip-cards";
import { feSection1_2InfoCards } from "./fe-1.2-info-cards";
import { feSection1_2QuizCards } from "./fe-1.2-quiz-cards";

export const learningCards: LearningCardData[] = [
  ...feSection1_1InfoCards,
  ...feSection1_1QuizCards,
  ...feSection1_1FlipCards,
  ...feSection1_2InfoCards,
  ...feSection1_2QuizCards,
  ...feSection1_2FlipCards,
];
