"use client";

import Link from "next/link";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { ChevronRight, InfoSymbol, LearningSymbol, ReviewSymbol } from "./MosaicArtwork";
import styles from "./account-screen.module.scss";

export function ProfileDestinations() {
  const { progress, review, sync } = useStudySession();
  const available = progress.ready && sync.status !== "unavailable";
  return (
    <>
      <nav className={styles.destinations} aria-label="Обучение">
        <Link href="/learning" scroll={false} className={styles.destination} data-learning-entry>
          <span className={styles.destinationArtwork}><LearningSymbol /></span>
          <span className={styles.destinationText}>
            <strong>Моё обучение</strong>
            <span>{sync.status === "unavailable" ? "Прогресс недоступен" : available ?
              "Темы и прогресс" : "Загружаем прогресс…"}</span>
          </span>
          <ChevronRight />
        </Link>
        <Link href="/review" scroll={false} className={styles.destination} data-profile-review-entry>
          <span className={styles.destinationArtwork}><ReviewSymbol /></span>
          <span className={styles.destinationText}>
            <strong>Повторение</strong>
            <span>{sync.status === "unavailable" ? "Для загрузки проверьте аккаунт" : review.session ?
              `Карточек для повторения: ${review.session.order.length}` : "Загружаем карточки…"}</span>
          </span>
          <ChevronRight />
        </Link>
        <Link href="/settings" scroll={false} className={styles.destination} data-settings-entry>
          <span className={styles.destinationArtwork}>
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
              <path d="M12 18h40M12 32h40M12 46h40" stroke="#85deed" strokeWidth="4" strokeLinecap="round" />
              <circle cx="24" cy="18" r="6" fill="#b7a0ff" /><circle cx="42" cy="32" r="6" fill="#b7a0ff" /><circle cx="26" cy="46" r="6" fill="#b7a0ff" />
            </svg>
          </span>
          <span className={styles.destinationText}><strong>Настройки</strong><span>Звук и вибрация</span></span>
          <ChevronRight />
        </Link>
      </nav>
      <p className={styles.guestNotice}><InfoSymbol />Гостевой прогресс хранится отдельно</p>
    </>
  );
}
