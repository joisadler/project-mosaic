import Link from "next/link";
import type { SyntheticEvent } from "react";
import styles from "./learning-feed.module.scss";

function stopGesturePropagation(event: SyntheticEvent) {
  event.stopPropagation();
}

export function AccountLink() {
  return (
    <Link
      href="/account"
      scroll={false}
      className={`${styles.readMoreLink} swiper-no-swiping`}
      aria-label="Профиль"
      data-tooltip="Профиль"
      data-account-entry
      data-swiper-no-swiping="true"
      draggable={false}
      onClick={stopGesturePropagation}
      onPointerDown={stopGesturePropagation}
      onTouchStart={stopGesturePropagation}
    >
      <svg className={styles.readMoreIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20v-1.5a7 7 0 0 1 14 0V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </Link>
  );
}
