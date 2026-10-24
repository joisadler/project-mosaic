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
        {!review.storageAvailable ? <p role="status" className={styles.notice}>Место в повторении сейчас не сохраняется на этом устройстве.</p> : null}
      </nav>
      <p className={styles.guestNotice}><InfoSymbol />Гостевой прогресс хранится отдельно</p>
    </>
  );
}
