"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { A11y, Keyboard, Mousewheel, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { LearningCardData } from "@/content/card-types";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { presentationId } from "@/lib/study-session/session";
import { FlipCard, type FlipSideIndex } from "./FlipCard";
import { InfoCard } from "./InfoCard";
import { QuizCard } from "./QuizCard";
import { ReadMoreLink } from "./ReadMoreLink";
import { AccountLink } from "./AccountLink";
import { getCardPresentation } from "./section-presentation";
import presentationStyles from "./section-presentation.module.scss";
import styles from "./learning-feed.module.scss";

type LearningFeedProps = {
  cards: readonly LearningCardData[];
  active?: boolean;
};

const feedModules = [A11y, Keyboard, Mousewheel, Virtual];

export function LearningFeed({ cards, active = true }: LearningFeedProps) {
  const { session, update } = useStudySession();
  const feedSwiperRef = useRef<SwiperInstance | null>(null);
  const feedShellRef = useRef<HTMLElement | null>(null);
  const systemGestureGuardRef = useRef<HTMLDivElement | null>(null);
  const isSystemGestureGuardActiveRef = useRef(false);
  const cardsById = useMemo(() => new Map(cards.map(card => [card.id, card])), [cards]);
  const order = session?.order;
  const shuffledCards = useMemo(() => order?.flatMap(id => {
    const card = cardsById.get(id);
    return card ? [card] : [];
  }) ?? null, [order, cardsById]);
  const activeCardIndex = Math.max(0, session?.order.indexOf(session.currentCardId ?? "") ?? 0);
  const pageByCard = session?.pages ?? {};
  const selectedOptionByCard = session?.answers ?? {};
  const flipSideByCard = session?.sides ?? {};

  const rememberPage = useCallback((cardId: string, pageIndex: number) => {
    update(current => current.pages[cardId] === pageIndex ? current : {
      ...current, pages: { ...current.pages, [cardId]: pageIndex },
    });
  }, [update]);

  const rememberFlipSide = useCallback((cardId: string, sideIndex: FlipSideIndex) => {
    update(current => current.sides[cardId] === sideIndex ? current : {
      ...current, sides: { ...current.sides, [cardId]: sideIndex },
    });
  }, [update]);

  const rememberSelectedOption = useCallback((cardId: string, optionId: string) => {
    update(current => current.answers[cardId] === optionId ? current : {
      ...current, answers: { ...current.answers, [cardId]: optionId },
    });
  }, [update]);

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

  useEffect(() => {
    const swiper = feedSwiperRef.current;
    if (!swiper || swiper.destroyed) return;
    resetSystemGestureGuard();
    if (active) {
      swiper.enable();
      swiper.keyboard.enable();
      swiper.mousewheel.enable();
      realignFeed();
    } else {
      swiper.keyboard.disable();
      swiper.mousewheel.disable();
      swiper.disable();
    }
  }, [active, session?.id, realignFeed, resetSystemGestureGuard]);

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

  if (shuffledCards.length === 0) {
    return <main className={styles.feedShell} aria-label="Учебная лента по frontend"><p role="status">Пока нет карточек для обучения.</p><AccountLink /></main>;
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
        key={session?.id}
        className={styles.feed}
        initialSlide={activeCardIndex}
        modules={feedModules}
        direction="vertical"
        slidesPerView={1}
        slidesPerGroup={1}
        speed={480}
        threshold={8}
        touchAngle={42}
        grabCursor
        enabled={active}
        keyboard={{ enabled: active, onlyInViewport: true, pageUpDown: true }}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true, thresholdDelta: 12 }}
        virtual={{ addSlidesBefore: 1, addSlidesAfter: 1 }}
        onSwiper={(swiper) => {
          feedSwiperRef.current = swiper;
        }}
        onActiveIndexChange={(swiper) => {
          const id = shuffledCards[swiper.activeIndex]?.id;
          if (id) update(current => current.currentCardId === id ? current : { ...current, currentCardId: id });
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
          <SwiperSlide key={card.id} virtualIndex={index} data-card-id={card.id} data-presentation-id={session ? presentationId(session, card.id) : undefined}>
            {({ isActive }) => {
              if (card.type === "info") {
                return (
                  <InfoCard
                    card={card}
                    cardIndex={index}
                    cardCount={shuffledCards.length}
                    activePage={pageByCard[card.id] ?? 0}
                    isActive={isActive && active}
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
                    isActive={isActive && active}
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
                  isActive={isActive && active}
                  onSideChange={rememberFlipSide}
                />
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={`${styles.actionRail} ${presentationStyles.presentation}`}
        data-section={getCardPresentation(shuffledCards[activeCardIndex]).section}
      >
        <ReadMoreLink url={shuffledCards[activeCardIndex]?.readMoreUrl} />
        <AccountLink />
      </div>

      <div
        ref={systemGestureGuardRef}
        className={styles.systemGestureGuard}
        aria-hidden="true"
      />
    </main>
  );
}
