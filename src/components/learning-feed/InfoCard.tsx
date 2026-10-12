import { useRef, type KeyboardEvent } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { InfoCardData } from "@/content/card-types";
import { CardTypeLabel } from "./CardTypeLabel";
import { MarkdownPage } from "./MarkdownPage";
import styles from "./learning-feed.module.scss";

type InfoCardProps = {
  card: InfoCardData;
  cardIndex: number;
  cardCount: number;
  activePage: number;
  isActive: boolean;
  onPageChange: (cardId: string, pageIndex: number) => void;
};

const pageModules = [A11y];

export function InfoCard({
  card,
  cardIndex,
  cardCount,
  activePage,
  isActive,
  onPageChange,
}: InfoCardProps) {
  const pageSwiperRef = useRef<SwiperInstance | null>(null);
  const pageCount = card.pages.length;
  const hasMultiplePages = pageCount > 1;

  const handlePageChange = (swiper: SwiperInstance) => {
    onPageChange(card.id, swiper.activeIndex);
  };

  const handlePageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isActive || event.target !== event.currentTarget) {
      return;
    }

    const swiper = pageSwiperRef.current;

    if (!swiper || swiper.destroyed || swiper.animating) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      swiper.slideNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      swiper.slidePrev();
    }
  };

  return (
    <article
      className={styles.card}
      data-theme={cardIndex % 4}
      aria-label={`Учебная карточка ${cardIndex + 1} из ${cardCount}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <CardTypeLabel type="info" />

      <span className={styles.cardProgress} aria-hidden="true">
        {String(cardIndex + 1).padStart(2, "0")} / {String(cardCount).padStart(2, "0")}
      </span>

      {hasMultiplePages ? (
        <div
          className={styles.pageFocusTarget}
          role="group"
          aria-label="Карточка с несколькими страницами. Стрелка влево — предыдущая страница, стрелка вправо — следующая страница"
          aria-keyshortcuts="ArrowLeft ArrowRight"
          tabIndex={0}
          onKeyDown={handlePageKeyDown}
        >
          <Swiper
            className={styles.pages}
            modules={pageModules}
            direction="horizontal"
            slidesPerView={1}
            slidesPerGroup={1}
            initialSlide={activePage}
            speed={420}
            threshold={8}
            touchAngle={42}
            grabCursor
            a11y={{
              enabled: true,
              containerMessage: `Страницы учебной карточки ${cardIndex + 1}`,
              slideLabelMessage: "Страница {{index}} из {{slidesLength}}",
              prevSlideMessage: "Предыдущая страница",
              nextSlideMessage: "Следующая страница",
            }}
            onSwiper={(swiper) => {
              pageSwiperRef.current = swiper;
            }}
            onSlideChange={handlePageChange}
          >
            {card.pages.map((markdown, pageIndex) => (
              <SwiperSlide key={`${card.id}-${pageIndex}`}>
                {({ isActive: isPageActive }) => (
                  <MarkdownPage markdown={markdown} isActive={isPageActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <MarkdownPage markdown={card.pages[0]} isActive={isActive} />
      )}

      {hasMultiplePages ? (
        <div
          className={styles.pageIndicator}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={`Страница ${activePage + 1} из ${pageCount}`}
        >
          {card.pages.map((_, pageIndex) => (
            <span
              key={`${card.id}-dot-${pageIndex}`}
              className={pageIndex === activePage ? styles.pageDotActive : styles.pageDot}
              aria-hidden="true"
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}
