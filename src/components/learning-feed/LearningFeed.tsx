"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { A11y, Keyboard, Mousewheel, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { LearningCardData } from "@/content/card-types";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { presentationId } from "@/lib/study-session/session";
import { FlipCard, type FlipSideIndex } from "./FlipCard";
import { InfoCard } from "./InfoCard";
import { QuizCard } from "./QuizCard";
import { ReadMoreLink } from "./ReadMoreLink";
import { UnderstoodControl } from "./UnderstoodControl";
import { createDoubleTapDetector } from "@/lib/learning-progress/double-tap";
import understoodStyles from "./understood-control.module.scss";
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
  const { session, update, progress, reviewCard, toggleConfirmation, mode, sync } = useStudySession();
  const [notice, setNotice] = useState("");
  const [tapDetector] = useState(createDoubleTapDetector);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const activeCard = shuffledCards?.[activeCardIndex];
  const currentPresentation = session && activeCard ? presentationId(session, activeCard.id) : null;
  const currentPage = activeCard ? pageByCard[activeCard.id] ?? 0 : 0;
  const currentSide = activeCard ? flipSideByCard[activeCard.id] ?? 0 : 0;

  useEffect(() => {
    if (mode === "review" || !active || !activeCard || !currentPresentation || !progress.ready) return;
    reviewCard(activeCard.id, currentPresentation, activeCard.type === "info"
      ? { pages: [currentPage] } : activeCard.type === "flip" && currentSide === 1 ? { answerSeen: true } : {});
  }, [mode, active, activeCard, currentPresentation, currentPage, currentSide, progress.ready, reviewCard]);

  const rememberQuizFeedback = useCallback((cardId: string, optionId: string) => {
    if (session && progress.ready) reviewCard(cardId, presentationId(session, cardId), { feedbackOptionId: optionId });
  }, [session, progress.ready, reviewCard]);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const confirmUnderstanding = useCallback(() => {
    if (mode === "review" || !active || !activeCard || !currentPresentation || !session) return;
    const message = toggleConfirmation(activeCard, currentPresentation, session.order, Date.now(), session.answers[activeCard.id]);
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 4500);
  }, [mode, active, activeCard, currentPresentation, session, toggleConfirmation]);

  const isTapArea = (target: EventTarget | null) => target instanceof Element &&
    !!target.closest("article") && !target.closest('a,button,input,textarea,select,pre,code,[contenteditable="true"],[role="radio"],[role="radiogroup"]');

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
    if (mode === "review" || !event.isPrimary || event.pointerType !== "touch" || !currentPresentation || !active || !isTapArea(event.target)) {
      tapDetector.reset();
      return;
    }
    guardSystemGesture(event.clientY);
    const guardTop = systemGestureGuardRef.current?.getBoundingClientRect().top ?? Infinity;
    if (event.clientY >= guardTop) { tapDetector.reset(); return; }
    tapDetector.start({ presentationId: currentPresentation, x: event.clientX, y: event.clientY, time: event.timeStamp, pointerId: event.pointerId });
  }, [mode, guardSystemGesture, tapDetector, currentPresentation, active]);

  const handlePointerUpCapture = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    resetSystemGestureGuard();
    if (event.pointerType !== "touch" || !currentPresentation || !isTapArea(event.target)) { tapDetector.reset(); return; }
    if (tapDetector.end({ presentationId: currentPresentation, x: event.clientX, y: event.clientY, time: event.timeStamp, pointerId: event.pointerId })) {
      event.preventDefault();
      confirmUnderstanding();
    }
  }, [resetSystemGestureGuard, tapDetector, currentPresentation, confirmUnderstanding]);

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
        aria-label={mode === "review" ? "Повторение завершённых карточек" : "Учебная лента по frontend"}
        aria-busy="true"
      />
    );
  }

  if (shuffledCards.length === 0) {
    return (
      <main ref={feedShellRef} className={styles.feedShell} aria-label={mode === "review" ? "Повторение завершённых карточек" : "Учебная лента по frontend"}>
        <div className={styles.emptyFeed}>
          <h1>{sync.status === "unavailable" ? "Аккаунт недоступен" : !sync.sections.length ? "Выберите учебный материал" : mode === "review" ? "Пока нечего повторять" : "Карточки для обучения закончились"}</h1>
          <p role="status">{sync.status === "unavailable" ? "Не удалось проверить аккаунт. Проверьте соединение в настройках." :
            !sync.sections.length ? "Подразделы не выбраны. Откройте настройки, чтобы выбрать учебный материал." :
            mode === "review" ? "В выбранных подразделах пока нет карточек со 100%. Они появятся здесь после завершения обучения." :
            "В выбранных подразделах нет незавершённых карточек. Можно повторить завершённые или выбрать другой материал."}</p>
          <Link href="/account" scroll={false} data-account-entry>Открыть настройки</Link>
          {mode === "review" ? <Link href="/" scroll={false} data-review-return>Вернуться к обучению</Link> : <Link href="/review" scroll={false}>Повторить завершённые</Link>}
        </div>
      </main>
    );
  }

  return (
    <main
      ref={feedShellRef}
      className={styles.feedShell}
      aria-label={mode === "review" ? "Повторение завершённых карточек" : "Учебная лента по frontend"}
      onPointerDownCapture={handlePointerDownCapture}
      onPointerUpCapture={handlePointerUpCapture}
      onPointerMoveCapture={event => tapDetector.move(event.pointerId, event.clientX, event.clientY)}
      onScrollCapture={() => tapDetector.reset()}
      onPointerCancelCapture={() => { tapDetector.reset(); resetSystemGestureGuard(); }}
      onTouchStartCapture={handleTouchStartCapture}
      onTouchEndCapture={resetSystemGestureGuard}
      onTouchCancelCapture={resetSystemGestureGuard}
    >
      <Swiper
        key={`${session?.id}:${shuffledCards.map(card => card.id).join("|")}`}
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
          if (id) {
            setNotice("");
            update(current => current.currentCardId === id ? current : { ...current, currentCardId: id });
          }
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
                    onFeedbackReview={rememberQuizFeedback}
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
        {mode === "review" ? (
          <div className={understoodStyles.control}>
            <span className={styles.reviewMode}>Повторение</span>
            <span className={understoodStyles.percentage} aria-hidden="true">100%</span>
            <progress className={styles.visuallyHidden} max={100} value={100} aria-label="Завершённая карточка. При повторении прогресс не меняется." />
            <Link href="/" scroll={false} className={`${styles.readMoreLink} swiper-no-swiping`} aria-label="Вернуться к обучению" data-tooltip="Вернуться к обучению" data-review-return>
              <svg className={styles.readMoreIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m10 5-7 7 7 7M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        ) : activeCard && currentPresentation && session ? (
          <UnderstoodControl key={currentPresentation} card={activeCard} presentationId={currentPresentation} poolIds={session.order} onToggle={confirmUnderstanding} />
        ) : null}
        <ReadMoreLink url={shuffledCards[activeCardIndex]?.readMoreUrl} />
        <AccountLink />
      </div>

      <p className={understoodStyles.notice} role="status" aria-live="polite">{notice}</p>

      <div
        ref={systemGestureGuardRef}
        className={styles.systemGestureGuard}
        aria-hidden="true"
      />
    </main>
  );
}
