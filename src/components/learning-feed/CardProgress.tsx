"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "./use-media-query";
import styles from "./card-progress.module.scss";
import feedStyles from "./learning-feed.module.scss";

export type CardProgressData = {
  value: number;
  ready: boolean;
  review?: boolean;
};

export function CardProgress({ value, ready, review = false, isActive }: CardProgressData & { isActive: boolean }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [displayedValue, setDisplayedValue] = useState(value);
  const displayedRef = useRef(value);
  const wasReady = useRef(ready);
  const wasActive = useRef(isActive);

  useEffect(() => {
    let frame = 0;
    const from = displayedRef.current;
    const immediate = reducedMotion || !ready || !wasReady.current || !isActive || !wasActive.current || from === value;
    wasReady.current = ready;
    wasActive.current = isActive;
    let startedAt: number | undefined;
    const animate = (timestamp: number) => {
      startedAt ??= timestamp;
      const elapsed = immediate ? 1 : Math.min(1, (timestamp - startedAt) / 450);
      const eased = 1 - (1 - elapsed) ** 3;
      const next = from + (value - from) * eased;
      displayedRef.current = next;
      setDisplayedValue(next);
      if (elapsed < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, ready, isActive, reducedMotion]);

  const visibleValue = reducedMotion || !ready || !isActive ? value : displayedValue;
  return (
    <div className={styles.indicator}>
      <span className={styles.label} aria-hidden="true">Прогресс: {Math.round(visibleValue)}%</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.fill} style={{ transform: `scaleX(${visibleValue / 100})` }} />
      </span>
      <progress className={feedStyles.visuallyHidden} max={100} value={value}
        aria-label={review ? "Завершённая карточка. При повторении прогресс не меняется." : "Прогресс подтверждений этой карточки"} />
    </div>
  );
}
