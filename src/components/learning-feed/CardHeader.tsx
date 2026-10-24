import type { LearningCardData } from "@/content/card-types";
import { CardProgress, type CardProgressData } from "./CardProgress";
import { CardTypeLabel } from "./CardTypeLabel";
import styles from "./learning-feed.module.scss";

type CardHeaderProps = {
  type: LearningCardData["type"];
  cardIndex: number;
  cardCount: number;
  progress: CardProgressData;
  isActive: boolean;
  quizPagination?: { pageNumber: number; pageCount: number };
};

export function CardHeader({ type, cardIndex, cardCount, progress, isActive, quizPagination }: CardHeaderProps) {
  return (
    <header className={`${styles.cardHeader} ${type === "quiz" ? styles.quizHeader : ""}`}>
      <CardTypeLabel type={type} />
      <CardProgress {...progress} isActive={isActive} />
      <span className={styles.cardCounter} aria-hidden="true">
        {String(cardIndex + 1).padStart(2, "0")} / {String(cardCount).padStart(2, "0")}
        {quizPagination ? ` · ${quizPagination.pageNumber} / ${quizPagination.pageCount}` : null}
      </span>
    </header>
  );
}
