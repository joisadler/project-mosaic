"use client";

import { useEffect, useRef, useState } from "react";
import type { LearningCardData } from "@/content/card-types";
import { interactionKey } from "@/lib/study-session/study-queue";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { cardPercentage, confirmationStatus } from "@/lib/learning-progress/progress";
import { useMediaQuery } from "./use-media-query";
import { CardProgress } from "./CardProgress";
import styles from "./understood-control.module.scss";
import feedStyles from "./learning-feed.module.scss";

export function UnderstoodControl({ card, presentationId, poolIds, onToggle }: {
  card: LearningCardData;
  presentationId: string;
  poolIds: readonly string[];
  onToggle: () => void;
}) {
  const { progress, session } = useStudySession();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  const status = confirmationStatus(progress.data, card, presentationId, poolIds, now, session?.answers[interactionKey(session, presentationId, card.id)]);
  const percentage = cardPercentage(progress.data, card.id);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [displayedPercentage, setDisplayedPercentage] = useState(percentage);
  const displayedRef = useRef(percentage);
  const wasReady = useRef(progress.ready);

  useEffect(() => {
    let frame = 0;
    const from = displayedRef.current;
    const immediate = reducedMotion || !wasReady.current || from === percentage;
    wasReady.current = progress.ready;
    let startedAt: number | undefined;
    const animate = (timestamp: number) => {
      startedAt ??= timestamp;
      const elapsed = immediate ? 1 : Math.min(1, (timestamp - startedAt) / 450);
      const eased = 1 - (1 - elapsed) ** 3;
      const next = from + (percentage - from) * eased;
      displayedRef.current = next;
      setDisplayedPercentage(next);
      if (elapsed < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [percentage, reducedMotion, progress.ready]);

  const visiblePercentage = reducedMotion ? percentage : displayedPercentage;
  const reason = !progress.ready ? "Прогресс загружается." : status.reason;
  return (
    <div className={styles.control}>
      <button
        className={`${feedStyles.readMoreLink} ${styles.button} swiper-no-swiping`}
        type="button"
        aria-label="Понятно"
        aria-pressed={status.confirmed}
        aria-disabled={!progress.ready || !status.eligible}
        aria-describedby="understood-reason"
        data-tooltip={reason || (status.confirmed ? "Отменить подтверждение" : "Понятно")}
        onClick={onToggle}
        onPointerDown={event => event.stopPropagation()}
        onTouchStart={event => event.stopPropagation()}
      >
        <svg className={feedStyles.readMoreIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <CardProgress value={percentage} displayedValue={visiblePercentage} />
      <span id="understood-reason" className={feedStyles.visuallyHidden}>
        {reason || "Повторное нажатие отменяет только это подтверждение."}
        {!progress.storageAvailable ? " Прогресс сейчас не сохраняется после закрытия приложения." : ""}
      </span>
    </div>
  );
}
