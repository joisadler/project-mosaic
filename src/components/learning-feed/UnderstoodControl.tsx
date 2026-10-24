"use client";

import { useEffect, useRef, useState } from "react";
import type { LearningCardData } from "@/content/card-types";
import { interactionKey } from "@/lib/study-session/study-queue";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { confirmationStatus } from "@/lib/learning-progress/progress";
import { useMediaQuery } from "./use-media-query";
import styles from "./understood-control.module.scss";
import feedStyles from "./learning-feed.module.scss";

export function UnderstoodControl({ card, presentationId, poolIds, onToggle, isActive = true }: {
  card: LearningCardData;
  presentationId: string;
  poolIds: readonly string[];
  onToggle: () => void;
  isActive?: boolean;
}) {
  const { progress, session } = useStudySession();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  const status = confirmationStatus(progress.data, card, presentationId, poolIds, now, session?.answers[interactionKey(session, presentationId, card.id)]);
  const iconRef = useRef<SVGSVGElement>(null);
  const wasConfirmed = useRef(status.confirmed);
  const wasReady = useRef(progress.ready);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    const newlyConfirmed = wasReady.current && progress.ready && status.confirmed && !wasConfirmed.current;
    wasConfirmed.current = status.confirmed;
    wasReady.current = progress.ready;
    if (!newlyConfirmed || reducedMotion || !isActive) return;
    const animation = iconRef.current?.animate([
      { transform: "scale(.92)" }, { transform: "scale(1.12)", offset: .65 }, { transform: "scale(1)" },
    ], { duration: 260, easing: "ease-out" });
    return () => animation?.cancel();
  }, [status.confirmed, progress.ready, reducedMotion, isActive]);
  const reason = !progress.ready ? "Прогресс загружается." : status.reason;
  return (
    <div className={styles.control}>
      <button
        className={`${feedStyles.feedAction} ${styles.button} swiper-no-swiping`}
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
        <svg ref={iconRef} className={feedStyles.feedActionIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span id="understood-reason" className={feedStyles.visuallyHidden}>
        {reason || "Повторное нажатие отменяет только это подтверждение."}
        {!progress.storageAvailable ? " Прогресс сейчас не сохраняется после закрытия приложения." : ""}
      </span>
    </div>
  );
}
