import { useId, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { QuizCardData } from "@/content/card-types";
import { CardDecoration } from "./CardDecoration";
import { CardTypeLabel } from "./CardTypeLabel";
import { getCardPresentation } from "./section-presentation";
import presentationStyles from "./section-presentation.module.scss";
import { MarkdownContent } from "./MarkdownPage";
import { useMediaQuery } from "./use-media-query";
import styles from "./learning-feed.module.scss";

type QuizCardProps = {
  card: QuizCardData;
  cardIndex: number;
  cardCount: number;
  isActive: boolean;
  selectedOptionId?: string;
  onOptionSelect: (cardId: string, optionId: string) => void;
  onFeedbackReview: (cardId: string, optionId: string) => void;
};

const compactQuizModules = [A11y];
const compactQuizQuery = "(max-width: 39.999rem) and (max-height: 20rem)";

export function QuizCard({
  card,
  cardIndex,
  cardCount,
  isActive,
  selectedOptionId,
  onOptionSelect,
  onFeedbackReview,
}: QuizCardProps) {
  const compactSwiperRef = useRef<SwiperInstance | null>(null);
  const compactFocusTargetRef = useRef<HTMLDivElement | null>(null);
  const [activeCompactPanel, setActiveCompactPanel] = useState(0);
  const [focusedOptionId, setFocusedOptionId] = useState<string>();
  const isCompactQuiz = useMediaQuery(compactQuizQuery);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const selectedOption = card.options.find((option) => option.id === selectedOptionId);
  const hasAnswered = selectedOption !== undefined;
  const isCorrect = selectedOption?.id === card.correctOptionId;
  const compactPanelCount = hasAnswered ? 3 : 2;
  const instanceId = useId();
  const questionId = `${instanceId}-question`;
  const resultId = `${instanceId}-result`;
  const resultText = selectedOption
    ? `${isCorrect ? "Верно." : "Не совсем."} ${selectedOption.explanation}`
    : "";

  useEffect(() => {
    if (isActive && selectedOption && (!isCompactQuiz || activeCompactPanel === 2)) {
      onFeedbackReview(card.id, selectedOption.id);
    }
  }, [isActive, selectedOption, isCompactQuiz, activeCompactPanel, onFeedbackReview, card.id]);

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    optionIndex: number,
  ) => {
    const movesForward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const movesBackward = event.key === "ArrowLeft" || event.key === "ArrowUp";

    if (!movesForward && !movesBackward) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const direction = movesForward ? 1 : -1;
    const nextIndex = (optionIndex + direction + card.options.length) % card.options.length;
    const nextOption = card.options[nextIndex];
    const radioGroup = event.currentTarget.closest('[role="radiogroup"]');
    const radios = radioGroup?.querySelectorAll<HTMLButtonElement>('[role="radio"]');

    setFocusedOptionId(nextOption.id);
    radios?.[nextIndex]?.focus();
  };

  const showCompactPanel = (panelIndex: number, moveFocus = false) => {
    const swiper = compactSwiperRef.current;

    if (!swiper || swiper.destroyed || swiper.animating) {
      return;
    }

    swiper.slideTo(panelIndex, prefersReducedMotion ? 0 : 240);
    setActiveCompactPanel(panelIndex);

    if (moveFocus) {
      compactFocusTargetRef.current?.focus();
    }
  };

  const handleCompactKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isActive || event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "ArrowRight" && activeCompactPanel < compactPanelCount - 1) {
      event.preventDefault();
      showCompactPanel(activeCompactPanel + 1);
    } else if (event.key === "ArrowLeft" && activeCompactPanel > 0) {
      event.preventDefault();
      showCompactPanel(activeCompactPanel - 1);
    }
  };

  const renderOptions = (showExplanationAction: boolean) => (
    <>
      <div
        className={styles.quizOptions}
        role="radiogroup"
        aria-labelledby={questionId}
      >
        <span id={questionId} className={styles.visuallyHidden}>
          Выберите один вариант ответа
        </span>

        {card.options.map((option, optionIndex) => {
          const optionIsSelected = option.id === selectedOptionId;
          const optionIsFocusable = option.id === (
            focusedOptionId ?? selectedOptionId ?? card.options[0].id
          );
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
              role="radio"
              aria-checked={optionIsSelected}
              aria-describedby={optionIsSelected ? resultId : undefined}
              data-correct={showCorrect || undefined}
              data-incorrect={showIncorrect || undefined}
              tabIndex={optionIsFocusable ? 0 : -1}
              onFocus={() => setFocusedOptionId(option.id)}
              onClick={() => {
                setFocusedOptionId(option.id);
                onOptionSelect(card.id, option.id);
              }}
              onKeyDownCapture={(event) =>
                handleOptionKeyDown(event, optionIndex)
              }
            >
              <span className={styles.optionLetter} aria-hidden="true">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span className={styles.optionText}>{option.text}</span>
              {stateLabel ? (
                <span className={styles.visuallyHidden}>{stateLabel}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {showExplanationAction && selectedOption ? (
        <button
          className={styles.quizExplanationButton}
          type="button"
          onClick={() => showCompactPanel(2, true)}
        >
          Показать объяснение
        </button>
      ) : null}
    </>
  );

  const renderResult = (isLive: boolean) => selectedOption ? (
    <div
      id={isLive ? resultId : undefined}
      className={styles.quizResult}
      role={isLive ? "status" : undefined}
      aria-live={isLive ? "polite" : undefined}
      aria-atomic={isLive ? "true" : undefined}
      data-correct={isCorrect || undefined}
    >
      <strong>{isCorrect ? "Верно." : "Не совсем."}</strong>{" "}
      {selectedOption.explanation}
    </div>
  ) : null;

  return (
    <article
      className={`${styles.card} ${styles.quizCard} ${presentationStyles.presentation}`}
      data-section={getCardPresentation(card).section}
      aria-label={`Проверочная карточка ${cardIndex + 1} из ${cardCount}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <CardDecoration card={card} />
      <header className={styles.quizHeader}>
        <CardTypeLabel type="quiz" />

        <span className={styles.cardProgress} aria-hidden="true">
          {String(cardIndex + 1).padStart(2, "0")} / {String(cardCount).padStart(2, "0")}
          {isCompactQuiz
            ? ` · ${activeCompactPanel + 1} / ${compactPanelCount}`
            : null}
        </span>
      </header>

      <div className={styles.quizScroller}>
        {isCompactQuiz ? (
          <div
            ref={compactFocusTargetRef}
            className={styles.compactQuizFocusTarget}
            role="group"
            aria-label={`Вопрос, варианты и объяснение. Панель ${activeCompactPanel + 1} из ${compactPanelCount}. Стрелки влево и вправо переключают панели`}
            aria-keyshortcuts="ArrowLeft ArrowRight"
            tabIndex={0}
            onKeyDown={handleCompactKeyDown}
          >
            <Swiper
              className={styles.compactQuizSwiper}
              modules={compactQuizModules}
              direction="horizontal"
              slidesPerView={1}
              slidesPerGroup={1}
              speed={prefersReducedMotion ? 0 : 240}
              threshold={8}
              touchAngle={42}
              followFinger
              loop={false}
              nested
              grabCursor
              a11y={{
                enabled: true,
                containerMessage: `Содержимое проверочной карточки ${cardIndex + 1}`,
                slideLabelMessage: "Панель {{index}} из {{slidesLength}}",
                prevSlideMessage: "Показать предыдущую панель",
                nextSlideMessage: "Показать следующую панель",
              }}
              onSwiper={(swiper) => {
                compactSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveCompactPanel(swiper.activeIndex)}
            >
              <SwiperSlide>
                {({ isActive: isPanelActive }) => (
                  <section
                    className={`${styles.compactQuizPanel} ${styles.compactQuizQuestionPanel}`}
                    aria-label="Вопрос"
                    aria-hidden={!isPanelActive}
                    inert={!isPanelActive}
                  >
                    <MarkdownContent
                      markdown={card.question}
                      className={styles.quizQuestion}
                    />
                  </section>
                )}
              </SwiperSlide>

              <SwiperSlide>
                {({ isActive: isPanelActive }) => (
                  <section
                    className={`${styles.compactQuizPanel} ${styles.compactQuizOptionsPanel}`}
                    aria-label="Варианты ответа"
                    aria-hidden={!isPanelActive}
                    inert={!isPanelActive}
                  >
                    {renderOptions(true)}
                  </section>
                )}
              </SwiperSlide>

              {selectedOption ? (
                <SwiperSlide>
                  {({ isActive: isPanelActive }) => (
                    <section
                      className={`${styles.compactQuizPanel} ${styles.compactQuizResultPanel}`}
                      aria-label="Объяснение ответа"
                      aria-hidden={!isPanelActive}
                      inert={!isPanelActive}
                    >
                      {renderResult(false)}
                    </section>
                  )}
                </SwiperSlide>
              ) : null}
            </Swiper>

            <span
              id={resultId}
              className={styles.visuallyHidden}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {resultText}
            </span>
          </div>
        ) : (
          <div className={styles.quizContent}>
            <MarkdownContent
              markdown={card.question}
              className={styles.quizQuestion}
            />

            {renderOptions(false)}
            {renderResult(true)}
          </div>
        )}
      </div>
    </article>
  );
}
