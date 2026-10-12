export type BaseCardData = {
  id: string;
  readMoreUrl?: string;
};

export type InfoCardData = BaseCardData & {
  type: "info";
  pages: string[];
};

export type QuizOptionData = {
  id: string;
  text: string;
  explanation: string;
};

export type QuizCardData = BaseCardData & {
  type: "quiz";
  question: string;
  options: [QuizOptionData, QuizOptionData, QuizOptionData, QuizOptionData];
  correctOptionId: string;
};

export type FlipCardData = BaseCardData & {
  type: "flip";
  question: string;
  answer: string;
};

export type LearningCardData = InfoCardData | QuizCardData | FlipCardData;
