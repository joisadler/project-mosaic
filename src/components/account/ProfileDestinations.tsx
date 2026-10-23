"use client";

import Link from "next/link";
import { learningSections } from "@/content/learning-sections";
import { summarizeProgress } from "@/lib/learning-progress/progress";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import styles from "./account-screen.module.scss";

const cardIds = learningSections.flatMap(section => section.cards.map(card => card.id));
const percent = new Intl.NumberFormat("ru", { maximumFractionDigits: 2 });

export function ProfileDestinations() {
  const { progress, review, sync } = useStudySession();
  const summary = summarizeProgress(progress.data, cardIds);
  const available = progress.ready && sync.status !== "unavailable";
  return (
    <nav className={styles.destinations} aria-label="Обучение">
      <Link href="/learning" scroll={false} className={styles.destination} data-learning-entry>
        <span>
          <strong>Моё обучение</strong>
          <span>{sync.status === "unavailable" ? "Прогресс недоступен" : available ?
            `Прогресс ${percent.format(summary.average)}% · завершено ${summary.completed} из ${summary.total}` : "Загружаем прогресс…"}</span>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
      <Link href="/review" scroll={false} className={styles.destination} data-profile-review-entry>
        <span>
          <strong>Повторение</strong>
          <span>{sync.status === "unavailable" ? "Для загрузки проверьте аккаунт" : review.session ?
            `Карточек для повторения: ${review.session.order.length}` : "Загружаем карточки…"}</span>
        </span>
        <span aria-hidden="true">→</span>
      </Link>
      {!review.storageAvailable ? <p role="status" className={styles.notice}>Место в повторении сейчас не сохраняется на этом устройстве.</p> : null}
    </nav>
  );
}
