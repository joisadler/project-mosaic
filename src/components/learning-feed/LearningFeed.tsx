"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { A11y, Keyboard, Mousewheel, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { LearningCardData } from "@/content/card-types";
import { FlipCard, type FlipSideIndex } from "./FlipCard";
import { InfoCard } from "./InfoCard";
import { QuizCard } from "./QuizCard";
import styles from "./learning-feed.module.scss";

type LearningFeedProps = {
  cards: readonly LearningCardData[];
};

const feedModules = [A11y, Keyboard, Mousewheel, Virtual];

function shuffleCards(cards: readonly LearningCardData[]) {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentCard = shuffledCards[index];

    shuffledCards[index] = shuffledCards[randomIndex];
    shuffledCards[randomIndex] = currentCard;
  }

  return shuffledCards;
}

export function LearningFeed({ cards }: LearningFeedProps) {
  const hasInitializedOrder = useRef(false);
  const [shuffledCards, setShuffledCards] = useState<LearningCardData[] | null>(null);
  const [pageByCard, setPageByCard] = useState<Record<string, number>>({});
  const [selectedOptionByCard, setSelectedOptionByCard] = useState<Record<string, string>>({});
  const [flipSideByCard, setFlipSideByCard] = useState<Record<string, FlipSideIndex>>({});

  useEffect(() => {
    if (hasInitializedOrder.current) {
      return;
    }

    hasInitializedOrder.current = true;
    setShuffledCards(shuffleCards(cards));
  }, [cards]);

  const rememberPage = useCallback((cardId: string, pageIndex: number) => {
    setPageByCard((current) =>
      current[cardId] === pageIndex
        ? current
        : { ...current, [cardId]: pageIndex },
    );
  }, []);

  const rememberFlipSide = useCallback((cardId: string, sideIndex: FlipSideIndex) => {
    setFlipSideByCard((current) =>
      current[cardId] === sideIndex
        ? current
        : { ...current, [cardId]: sideIndex },
    );
  }, []);

  const rememberSelectedOption = useCallback((cardId: string, optionId: string) => {
    setSelectedOptionByCard((current) =>
      current[cardId] === optionId
        ? current
        : { ...current, [cardId]: optionId },
    );
  }, []);

  if (!shuffledCards) {
    return (
      <main
        className={styles.feedShell}
        aria-label="Учебная лента по frontend"
        aria-busy="true"
      />
    );
  }

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
        {shuffledCards.map((card, index) => (
          <SwiperSlide key={card.id} virtualIndex={index} data-card-id={card.id}>
            {({ isActive }) => {
              if (card.type === "info") {
                return (
                  <InfoCard
                    card={card}
                    cardIndex={index}
                    cardCount={shuffledCards.length}
                    activePage={pageByCard[card.id] ?? 0}
                    isActive={isActive}
                    onPageChange={rememberPage}
                  />
                );
              }

              if (card.type === "quiz") {
                return (
                  <QuizCard
                    card={card}
                    cardIndex={index}
                    cardCount={shuffledCards.length}
                    isActive={isActive}
                    selectedOptionId={selectedOptionByCard[card.id]}
                    onOptionSelect={rememberSelectedOption}
                  />
                );
              }

              return (
                <FlipCard
                  card={card}
                  cardIndex={index}
                  cardCount={shuffledCards.length}
                  activeSide={flipSideByCard[card.id] ?? 0}
                  isActive={isActive}
                  onSideChange={rememberFlipSide}
                />
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
