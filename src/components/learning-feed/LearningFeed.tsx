"use client";

import { useCallback, useState } from "react";
import { A11y, Keyboard, Mousewheel, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { InfoCardData } from "@/content/info-cards";
import { InfoCard } from "./InfoCard";
import styles from "./learning-feed.module.scss";

type LearningFeedProps = {
  cards: InfoCardData[];
};

const feedModules = [A11y, Keyboard, Mousewheel, Virtual];

export function LearningFeed({ cards }: LearningFeedProps) {
  const [pageByCard, setPageByCard] = useState<Record<string, number>>({});

  const rememberPage = useCallback((cardId: string, pageIndex: number) => {
    setPageByCard((current) =>
      current[cardId] === pageIndex
        ? current
        : { ...current, [cardId]: pageIndex },
    );
  }, []);

  return (
    <main className={styles.feedShell} aria-label="Учебная лента по frontend">
      <Swiper
        className={styles.feed}
        modules={feedModules}
        direction="vertical"
        slidesPerView={1}
        slidesPerGroup={1}
        speed={480}
        threshold={8}
        touchAngle={42}
        grabCursor
        keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: true }}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true, thresholdDelta: 12 }}
        virtual={{ addSlidesBefore: 1, addSlidesAfter: 1 }}
        a11y={{
          enabled: true,
          containerMessage: "Учебные карточки по frontend",
          slideLabelMessage: "Карточка {{index}} из {{slidesLength}}",
          prevSlideMessage: "Предыдущая учебная карточка",
          nextSlideMessage: "Следующая учебная карточка",
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={card.id} virtualIndex={index} data-card-id={card.id}>
            {({ isActive }) => (
              <InfoCard
                card={card}
                cardIndex={index}
                cardCount={cards.length}
                activePage={pageByCard[card.id] ?? 0}
                isActive={isActive}
                onPageChange={rememberPage}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
