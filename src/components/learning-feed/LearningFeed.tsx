"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { A11y, Keyboard, Mousewheel, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { LearningCardData } from "@/content/card-types";
import { FlipCard, type FlipSideIndex } from "./FlipCard";
import { InfoCard } from "./InfoCard";
import { QuizCard } from "./QuizCard";
import { ReadMoreLink } from "./ReadMoreLink";
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
  const feedSwiperRef = useRef<SwiperInstance | null>(null);
  const feedShellRef = useRef<HTMLElement | null>(null);
  const systemGestureGuardRef = useRef<HTMLDivElement | null>(null);
  const isSystemGestureGuardActiveRef = useRef(false);
  const [shuffledCards, setShuffledCards] = useState<LearningCardData[] | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
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

  const resetSystemGestureGuard = useCallback(() => {
    if (!isSystemGestureGuardActiveRef.current) {
      return;
    }

    isSystemGestureGuardActiveRef.current = false;

    const swiper = feedSwiperRef.current;

    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.allowTouchMove = true;
    swiper.allowClick = true;
    swiper.swipeDirection = undefined;
    swiper.touches.diff = 0;
    Object.assign(swiper.touchEventsData, {
      isTouched: false,
      isMoved: false,
      allowTouchCallbacks: false,
      startMoving: false,
      pointerId: null,
      touchId: null,
      startEventPath: undefined,
      lastMoveEvent: undefined,
    });
  }, []);

  const realignFeed = useCallback(() => {
    resetSystemGestureGuard();

    const swiper = feedSwiperRef.current;

    if (!swiper || swiper.destroyed) {
      return;
    }

    swiper.update();
    swiper.slideTo(swiper.activeIndex, 0, false, true);
  }, [resetSystemGestureGuard]);

  const guardSystemGesture = useCallback((clientY: number) => {
    resetSystemGestureGuard();

    const swiper = feedSwiperRef.current;
    const guard = systemGestureGuardRef.current;

    if (!swiper || swiper.destroyed || !guard) {
      return;
    }

    if (clientY >= guard.getBoundingClientRect().top) {
      isSystemGestureGuardActiveRef.current = true;
      swiper.allowTouchMove = false;
    }
  }, [resetSystemGestureGuard]);

  const handlePointerDownCapture = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.pointerType === "mouse") {
      return;
    }

    guardSystemGesture(event.clientY);
  }, [guardSystemGesture]);

  const handleTouchStartCapture = useCallback((event: ReactTouchEvent<HTMLElement>) => {
    if (event.touches.length !== 1) {
      return;
    }

    guardSystemGesture(event.touches[0].clientY);
  }, [guardSystemGesture]);

  useEffect(() => {
    let firstAnimationFrame: number | null = null;
    let secondAnimationFrame: number | null = null;
    let settleTimeout: number | null = null;

    const cancelScheduledRealignment = () => {
      if (firstAnimationFrame !== null) {
        window.cancelAnimationFrame(firstAnimationFrame);
        firstAnimationFrame = null;
      }

      if (secondAnimationFrame !== null) {
        window.cancelAnimationFrame(secondAnimationFrame);
        secondAnimationFrame = null;
      }

      if (settleTimeout !== null) {
        window.clearTimeout(settleTimeout);
        settleTimeout = null;
      }
    };

    const scheduleRealignment = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      cancelScheduledRealignment();
      firstAnimationFrame = window.requestAnimationFrame(() => {
        firstAnimationFrame = null;
        secondAnimationFrame = window.requestAnimationFrame(() => {
          secondAnimationFrame = null;
          realignFeed();
        });
      });

      settleTimeout = window.setTimeout(() => {
        settleTimeout = null;
        realignFeed();
      }, 400);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleRealignment();
        return;
      }

      cancelScheduledRealignment();
      realignFeed();
    };

    window.addEventListener("blur", realignFeed);
    window.addEventListener("focus", scheduleRealignment);
    window.addEventListener("pageshow", scheduleRealignment);
    window.addEventListener("resize", scheduleRealignment);
    window.addEventListener("orientationchange", scheduleRealignment);
    window.visualViewport?.addEventListener("resize", scheduleRealignment);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const resizeObserver = new ResizeObserver(scheduleRealignment);
    const feedShell = feedShellRef.current;

    if (feedShell) {
      resizeObserver.observe(feedShell);
    }

    return () => {
      cancelScheduledRealignment();
      resizeObserver.disconnect();
      window.removeEventListener("blur", realignFeed);
      window.removeEventListener("focus", scheduleRealignment);
      window.removeEventListener("pageshow", scheduleRealignment);
      window.removeEventListener("resize", scheduleRealignment);
      window.removeEventListener("orientationchange", scheduleRealignment);
      window.visualViewport?.removeEventListener("resize", scheduleRealignment);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [realignFeed]);

  if (!shuffledCards) {
    return (
      <main
        ref={feedShellRef}
        className={styles.feedShell}
        aria-label="Учебная лента по frontend"
        aria-busy="true"
      />
    );
  }

  return (
    <main
      ref={feedShellRef}
      className={styles.feedShell}
      aria-label="Учебная лента по frontend"
      onPointerDownCapture={handlePointerDownCapture}
      onPointerUpCapture={resetSystemGestureGuard}
      onPointerCancelCapture={resetSystemGestureGuard}
      onTouchStartCapture={handleTouchStartCapture}
      onTouchEndCapture={resetSystemGestureGuard}
      onTouchCancelCapture={resetSystemGestureGuard}
    >
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
        onSwiper={(swiper) => {
          feedSwiperRef.current = swiper;
        }}
        onActiveIndexChange={(swiper) => {
          setActiveCardIndex(swiper.activeIndex);
        }}
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

      <div className={styles.actionRail} data-theme={activeCardIndex % 4}>
        <ReadMoreLink url={shuffledCards[activeCardIndex]?.readMoreUrl} />
      </div>

      <div
        ref={systemGestureGuardRef}
        className={styles.systemGestureGuard}
        aria-hidden="true"
      />
    </main>
  );
}
