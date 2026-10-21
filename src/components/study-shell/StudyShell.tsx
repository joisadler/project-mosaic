"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { LearningCardData } from "@/content/card-types";
import { LearningFeed } from "@/components/learning-feed/LearningFeed";
import { StudySessionProvider } from "./StudySessionProvider";
import styles from "./study-shell.module.scss";

export function StudyShell({ cards, children, authConfigured }: {
  authConfigured: boolean;
  cards: readonly LearningCardData[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const feedActive = pathname === "/";
  const previousFeedActive = useRef(feedActive);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const routeChanged = feedActive !== previousFeedActive.current;
    previousFeedActive.current = feedActive;
    if (!routeChanged) return;
    const frame = requestAnimationFrame(() => {
      const target = feedActive ? "[data-account-entry]" : "#account-title";
      shellRef.current?.querySelector<HTMLElement>(target)?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [feedActive]);

  return (
    <StudySessionProvider cards={cards} authConfigured={authConfigured}>
      <div ref={shellRef}>
        <div className={feedActive ? undefined : styles.pausedFeed} inert={!feedActive} aria-hidden={!feedActive}>
          <LearningFeed cards={cards} active={feedActive} />
        </div>
        {children}
      </div>
    </StudySessionProvider>
  );
}
