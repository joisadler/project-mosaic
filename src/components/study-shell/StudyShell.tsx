"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { LearningCardData } from "@/content/card-types";
import { LearningFeed } from "@/components/learning-feed/LearningFeed";
import { ReviewSessionProvider, StudySessionProvider } from "./StudySessionProvider";
import styles from "./study-shell.module.scss";

export function StudyShell({ cards, children, authConfigured }: {
  authConfigured: boolean;
  cards: readonly LearningCardData[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const feedActive = pathname === "/";
  const reviewActive = pathname === "/review";
  const previousPath = useRef(pathname);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const routeChanged = pathname !== previousPath.current;
    previousPath.current = pathname;
    if (!routeChanged) return;
    const frame = requestAnimationFrame(() => {
      const target = feedActive ? "[data-study-feed] [data-account-entry]" : reviewActive ? "[data-review-return]" : "#account-title";
      shellRef.current?.querySelector<HTMLElement>(target)?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [feedActive, reviewActive, pathname]);

  return (
    <StudySessionProvider cards={cards} authConfigured={authConfigured}>
      <div ref={shellRef}>
        <div data-study-feed className={feedActive ? undefined : styles.pausedFeed} inert={!feedActive} aria-hidden={!feedActive}>
          <LearningFeed cards={cards} active={feedActive} />
        </div>
        <div data-review-feed className={reviewActive ? undefined : styles.pausedFeed} inert={!reviewActive} aria-hidden={!reviewActive}>
          <ReviewSessionProvider><LearningFeed cards={cards} active={reviewActive} /></ReviewSessionProvider>
        </div>
        {children}
      </div>
    </StudySessionProvider>
  );
}
