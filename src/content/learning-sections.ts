import type { LearningCardData } from "./card-types";
import { feSection1_1FlipCards } from "./fe-1.1-flip-cards";
import { feSection1_1InfoCards } from "./fe-1.1-info-cards";
import { feSection1_1QuizCards } from "./fe-1.1-quiz-cards";
import { feSection1_2FlipCards } from "./fe-1.2-flip-cards";
import { feSection1_2InfoCards } from "./fe-1.2-info-cards";
import { feSection1_2QuizCards } from "./fe-1.2-quiz-cards";

type LearningSectionDefinition = {
  id: `fe-${number}.${number}`;
  number: `${number}.${number}`;
  title: string;
  cards: readonly LearningCardData[];
};

export const learningSections = [
  {
    id: "fe-1.1",
    number: "1.1",
    title: "Модель выполнения, объявления и области видимости",
    cards: [
      ...feSection1_1InfoCards,
      ...feSection1_1QuizCards,
      ...feSection1_1FlipCards,
    ],
  },
  {
    id: "fe-1.2",
    number: "1.2",
    title: "Значения, типы, равенство и приведение типов",
    cards: [
      ...feSection1_2InfoCards,
      ...feSection1_2QuizCards,
      ...feSection1_2FlipCards,
    ],
  },
] as const satisfies readonly LearningSectionDefinition[];

export type LearningSection = (typeof learningSections)[number];
export type LearningSectionId = LearningSection["id"];

export const learningSectionIdByCardId = new Map<string, LearningSectionId>(
  learningSections.flatMap((section) =>
    section.cards.map((card) => [card.id, section.id] as const),
  ),
);
