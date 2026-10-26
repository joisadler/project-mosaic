export type VisualMotif = "scope" | "lifecycle" | "values" | "equality" | "conversion"
  | "capture" | "invocation" | "composition";

export type BaseCardData = {
  id: string;
  readMoreUrl?: string;
  visual?: { motif?: VisualMotif };
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
