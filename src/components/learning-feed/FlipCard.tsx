import { useRef, useState, type KeyboardEvent } from "react";
import { A11y, EffectFlip } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { FlipCardData } from "@/content/card-types";
import { CardDecoration } from "./CardDecoration";
import { CardTypeLabel } from "./CardTypeLabel";
import { getCardPresentation } from "./section-presentation";
import presentationStyles from "./section-presentation.module.scss";
import { MarkdownContent } from "./MarkdownPage";
import { useMediaQuery } from "./use-media-query";
import styles from "./learning-feed.module.scss";

export type FlipSideIndex = 0 | 1;

type FlipCardProps = {
  card: FlipCardData;
  cardIndex: number;
  cardCount: number;
  activeSide: FlipSideIndex;
  isActive: boolean;
  onSideChange: (cardId: string, sideIndex: FlipSideIndex) => void;
};

const flipModules = [A11y, EffectFlip];

export function FlipCard({
  card,
  cardIndex,
  cardCount,
  activeSide,
  isActive,
  onSideChange,
}: FlipCardProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const showSide = (sideIndex: FlipSideIndex) => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed || swiper.animating) {
      return;
    }

    swiper.slideTo(sideIndex, prefersReducedMotion ? 0 : 300);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isActive || event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSide(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSide(0);
    }
  };

  const handleTransitionEnd = (swiper: SwiperInstance) => {
    const sideIndex: FlipSideIndex = swiper.activeIndex === 1 ? 1 : 0;

    if (sideIndex !== activeSide) {
      onSideChange(card.id, sideIndex);
      setAnnouncement(sideIndex === 1 ? "Ответ открыт" : "Вопрос открыт");
    }
  };

  return (
    <article
      className={`${styles.card} ${presentationStyles.presentation}`}
      data-section={getCardPresentation(card).section}
      aria-label={`Карточка для повторения ${cardIndex + 1} из ${cardCount}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <CardTypeLabel type="flip" />

      <span className={styles.cardProgress} aria-hidden="true">
        {String(cardIndex + 1).padStart(2, "0")} / {String(cardCount).padStart(2, "0")}
      </span>

      <div
        className={styles.flipFocusTarget}
        role="group"
        aria-label="Карточка с вопросом и ответом. Стрелка влево — вопрос, стрелка вправо — ответ"
        aria-keyshortcuts="ArrowLeft ArrowRight"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Swiper
          key={prefersReducedMotion ? "reduced-motion" : "flip-motion"}
          className={styles.flipSwiper}
          modules={flipModules}
          direction="horizontal"
          effect={prefersReducedMotion ? "slide" : "flip"}
          initialSlide={activeSide}
          slidesPerView={1}
          slidesPerGroup={1}
          speed={prefersReducedMotion ? 0 : 300}
          threshold={8}
          touchAngle={42}
          followFinger
          loop={false}
          grabCursor
          flipEffect={{ limitRotation: true }}
          a11y={{
            enabled: true,
            containerMessage: `Вопрос и ответ карточки ${cardIndex + 1}`,
            slideLabelMessage: "Сторона {{index}} из {{slidesLength}}",
            prevSlideMessage: "Показать вопрос",
            nextSlideMessage: "Показать ответ",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <SwiperSlide>
            {({ isActive: isSideActive }) => (
              <section
                className={styles.flipSide}
                aria-label="Вопрос"
                aria-hidden={!isSideActive}
                inert={!isSideActive}
              >
                <CardDecoration card={card} />
                <div className={styles.flipSideScroller}>
                  <MarkdownContent markdown={card.question} />
                </div>
                <span className={styles.flipTouchHint} aria-hidden="true">
                  Свайпни влево — покажи ответ
                </span>
              </section>
            )}
          </SwiperSlide>

          <SwiperSlide>
            {({ isActive: isSideActive }) => (
              <section
                className={styles.flipSide}
                aria-label="Ответ"
                aria-hidden={!isSideActive}
                inert={!isSideActive}
              >
                <CardDecoration card={card} />
                <div className={styles.flipSideScroller}>
                  <MarkdownContent markdown={card.answer} />
                </div>
                <span className={styles.flipTouchHint} aria-hidden="true">
                  Свайпни вправо — вернись к вопросу
                </span>
              </section>
            )}
          </SwiperSlide>
        </Swiper>

        <span className={styles.flipKeyboardHint} aria-hidden="true">
          ← — вопрос · → — ответ
        </span>

        <span className={styles.visuallyHidden} role="status" aria-live="polite">
          {announcement}
        </span>
      </div>
    </article>
  );
}
