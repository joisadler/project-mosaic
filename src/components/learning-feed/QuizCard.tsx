import type { QuizCardData } from "@/content/card-types";
import { CardTypeLabel } from "./CardTypeLabel";
import { MarkdownContent } from "./MarkdownPage";
import styles from "./learning-feed.module.scss";

type QuizCardProps = {
  card: QuizCardData;
  cardIndex: number;
  cardCount: number;
  isActive: boolean;
  selectedOptionId?: string;
  onOptionSelect: (cardId: string, optionId: string) => void;
};

export function QuizCard({
  card,
  cardIndex,
  cardCount,
  isActive,
  selectedOptionId,
  onOptionSelect,
}: QuizCardProps) {
  const selectedOption = card.options.find((option) => option.id === selectedOptionId);
  const hasAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption?.id === card.correctOptionId;
  const questionId = `${card.id}-question`;
  const resultId = `${card.id}-result`;

  return (
    <article
      className={styles.card}
      data-theme={cardIndex % 4}
      aria-label={`Проверочная карточка ${cardIndex + 1} из ${cardCount}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <CardTypeLabel type="quiz" />

      <span className={styles.cardProgress} aria-hidden="true">
        {String(cardIndex + 1).padStart(2, "0")} / {String(cardCount).padStart(2, "0")}
      </span>

      <div className={styles.quizScroller}>
        <div className={styles.quizContent}>
          <MarkdownContent
            markdown={card.question}
            className={styles.quizQuestion}
          />

          <div
            className={styles.quizOptions}
            role="group"
            aria-labelledby={questionId}
          >
            <span id={questionId} className={styles.visuallyHidden}>
              Выберите один вариант ответа
            </span>

            {card.options.map((option, optionIndex) => {
              const optionIsSelected = option.id === selectedOptionId;
              const optionIsCorrect = option.id === card.correctOptionId;
              const showCorrect = hasAnswered && optionIsCorrect;
              const showIncorrect = optionIsSelected && !optionIsCorrect;
              const stateLabel = optionIsSelected && optionIsCorrect
                ? "Правильно"
                : showCorrect
                  ? "Правильный ответ"
                  : showIncorrect
                    ? "Ваш выбор — ошибка"
                    : null;

              return (
                <button
                  key={option.id}
                  className={styles.quizOption}
                  type="button"
                  aria-pressed={optionIsSelected}
                  aria-describedby={optionIsSelected ? resultId : undefined}
                  data-correct={showCorrect || undefined}
                  data-incorrect={showIncorrect || undefined}
                  onClick={() => onOptionSelect(card.id, option.id)}
                >
                  <span className={styles.optionLetter} aria-hidden="true">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span className={styles.optionText}>{option.text}</span>
                  {stateLabel ? (
                    <span className={styles.optionState}>
                      <span aria-hidden="true">{optionIsCorrect ? "✓" : "✕"}</span>
                      {stateLabel}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {selectedOption ? (
            <div
              id={resultId}
              className={styles.quizResult}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              data-correct={isCorrect || undefined}
            >
              <strong>{isCorrect ? "Верно." : "Не совсем."}</strong>{" "}
              {selectedOption.explanation}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
