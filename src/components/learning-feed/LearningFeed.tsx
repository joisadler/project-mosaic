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
import { FeedEmptyState } from "./FeedEmptyState";
import { MosaicLoader } from "@/components/loading/MosaicLoader";
import { MosaicMark } from "@/components/account/MosaicArtwork";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { interactionKey, sessionEntries } from "@/lib/study-session/study-queue";
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
  const entries = useMemo(() => session ? sessionEntries(session).filter(entry => cardsById.has(entry.cardId)) : null, [session, cardsById]);
  const shuffledCards = useMemo(() => entries?.map(entry => cardsById.get(entry.cardId)!) ?? null, [entries, cardsById]);
  const activeCardIndex = Math.max(0, entries?.findIndex(entry => session?.queue ? entry.id === session.currentEntryId : entry.cardId === session?.currentCardId) ?? 0);
  const positions = useMemo(() => {
    const counts = new Map<string, number>();
    const indices = new Map<string, number>();
    for (const entry of entries ?? []) counts.set(entry.id.slice(0, 36), (counts.get(entry.id.slice(0, 36)) ?? 0) + 1);
    return entries?.map(entry => {
      const round = entry.id.slice(0, 36);
      const index = indices.get(round) ?? 0;
      indices.set(round, index + 1);
      return { index, count: counts.get(round)! };
    }) ?? [];
  }, [entries]);
  const pageByCard = session?.pages ?? {};
  const selectedOptionByCard = session?.answers ?? {};
  const flipSideByCard = session?.sides ?? {};

  const activeCard = shuffledCards?.[activeCardIndex];
  const currentPresentation = entries?.[activeCardIndex]?.id ?? null;
  const currentKey = activeCard && currentPresentation ? interactionKey(session, currentPresentation, activeCard.id) : "";
  const currentPage = pageByCard[currentKey] ?? 0;
  const currentSide = flipSideByCard[currentKey] ?? 0;

  useEffect(() => {
    if (mode === "review" || !active || !activeCard || !currentPresentation || !progress.ready) return;
    reviewCard(activeCard.id, currentPresentation, activeCard.type === "info"
      ? { pages: [currentPage] } : activeCard.type === "flip" && currentSide === 1 ? { answerSeen: true } : {});
  }, [mode, active, activeCard, currentPresentation, currentPage, currentSide, progress.ready, reviewCard]);

  const rememberQuizFeedback = useCallback((entryId: string, cardId: string, optionId: string) => {
    if (progress.ready) reviewCard(cardId, entryId, { feedbackOptionId: optionId });
  }, [progress.ready, reviewCard]);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const confirmUnderstanding = useCallback(() => {
    if (mode === "review" || !active || !activeCard || !currentPresentation || !session) return;
    const message = toggleConfirmation(activeCard, currentPresentation, session.order, Date.now(), session.answers[currentKey]);
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 4500);
  }, [mode, active, activeCard, currentPresentation, currentKey, session, toggleConfirmation]);

  const isTapArea = (target: EventTarget | null) => target instanceof Element &&
    !!target.closest("article") && !target.closest('a,button,input,textarea,select,pre,code,[contenteditable="true"],[role="radio"],[role="radiogroup"]');

  const rememberPage = useCallback((entryId: string, cardId: string, pageIndex: number) => {
    update(current => {
      const key = interactionKey(current, entryId, cardId);
      return current.pages[key] === pageIndex ? current : { ...current, pages: { ...current.pages, [key]: pageIndex } };
    });
  }, [update]);

  const rememberFlipSide = useCallback((entryId: string, cardId: string, sideIndex: FlipSideIndex) => {
    update(current => {
      const key = interactionKey(current, entryId, cardId);
      return current.sides[key] === sideIndex ? current : { ...current, sides: { ...current.sides, [key]: sideIndex } };
    });
  }, [update]);

  const rememberSelectedOption = useCallback((entryId: string, cardId: string, optionId: string) => {
    update(current => {
      const key = interactionKey(current, entryId, cardId);
      return current.answers[key] === optionId ? current : { ...current, answers: { ...current.answers, [key]: optionId } };
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
        className={`${styles.feedShell} ${styles.loadingShell}`}
        aria-label={mode === "review" ? "Повторение завершённых карточек" : "Учебная лента по frontend"}
        aria-busy="true"
      >
        <div className={styles.loadingFeed}>
          <div className={styles.loadingBrand}><MosaicMark />Mosaic</div>
          <div className={styles.loadingCenter}>
            <MosaicLoader variant="hero" animate={active}
              label={mode === "review" ? "Готовим повторение" : "Собираем вашу ленту"}
              description="Карточки скоро появятся" />
          </div>
          <Link href="/account" scroll={false} data-account-entry>Профиль <span aria-hidden="true">→</span></Link>
        </div>
      </main>
    );
  }

  if (shuffledCards.length === 0) {
    const unavailable = sync.status === "unavailable";
    return (
      <main ref={feedShellRef} className={`${styles.feedShell} ${unavailable ? "" : styles.emptyShell}`} aria-label={mode === "review" ? "Повторение завершённых карточек" : "Учебная лента по frontend"}>
        {unavailable ? (
          <div className={styles.emptyFeed}>
            <h1>Аккаунт недоступен</h1>
            <p role="status">Не удалось проверить аккаунт. Повторите проверку в профиле.</p>
            <Link href="/account" scroll={false} data-account-entry>Открыть профиль</Link>
            {mode === "review" ? <Link href="/" scroll={false} data-review-return>Вернуться к обучению</Link> : <Link href="/review" scroll={false}>Повторить завершённые</Link>}
          </div>
        ) : <FeedEmptyState kind={!sync.sections.length ? "topics" : mode === "review" ? "review" : "complete"} reviewMode={mode === "review"} />}
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
        key={`${session?.id}:${entries?.[0]?.id}:${session?.order.join("|")}`}
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
          const entry = entries?.[swiper.activeIndex];
          if (active && entry) {
            setNotice("");
            update(current => (current.queue ? current.currentEntryId === entry.id : current.currentCardId === entry.cardId)
              ? current : { ...current, currentCardId: entry.cardId, ...(current.queue ? { currentEntryId: entry.id } : {}) });
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
          <SwiperSlide key={entries![index].id} virtualIndex={index} data-card-id={card.id} data-presentation-id={entries![index].id}>
            {({ isActive }) => {
              if (card.type === "info") {
                return (
                  <InfoCard
                    card={card}
                    cardIndex={positions[index].index}
                    cardCount={positions[index].count}
                    activePage={pageByCard[interactionKey(session, entries![index].id, card.id)] ?? 0}
                    isActive={isActive && active}
                    onPageChange={(cardId, page) => rememberPage(entries![index].id, cardId, page)}
                  />
                );
              }

              if (card.type === "quiz") {
                return (
                  <QuizCard
                    card={card}
                    cardIndex={positions[index].index}
                    cardCount={positions[index].count}
                    isActive={isActive && active}
                    selectedOptionId={selectedOptionByCard[interactionKey(session, entries![index].id, card.id)]}
                    onOptionSelect={(cardId, option) => rememberSelectedOption(entries![index].id, cardId, option)}
                    onFeedbackReview={(cardId, option) => rememberQuizFeedback(entries![index].id, cardId, option)}
                  />
                );
              }

              return (
                <FlipCard
                  card={card}
                  cardIndex={positions[index].index}
                  cardCount={positions[index].count}
                  activeSide={flipSideByCard[interactionKey(session, entries![index].id, card.id)] ?? 0}
                  isActive={isActive && active}
                  onSideChange={(cardId, side) => rememberFlipSide(entries![index].id, cardId, side)}
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
