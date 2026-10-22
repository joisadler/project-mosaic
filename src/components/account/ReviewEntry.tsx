"use client";

import Link from "next/link";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import styles from "./account-screen.module.scss";

export function ReviewEntry() {
  const { review, sync } = useStudySession();
  return (
    <section className={styles.sessionControl} aria-labelledby="review-entry-title">
      <h2 id="review-entry-title">Повторение</h2>
      <p>Завершённые карточки со 100% доступны здесь для повторения. Оно не меняет прогресс и учитывает выбранные подразделы.</p>
      <p>{sync.status === "unavailable" ? "Для загрузки прогресса повторите проверку аккаунта." : review.session ? `Карточек для повторения: ${review.session.order.length}.` : "Загружаем карточки…"}</p>
      {!review.storageAvailable && <p role="status">Место в повторении сейчас не сохраняется на этом устройстве.</p>}
      <Link className={styles.primaryLink} href="/review" scroll={false}>Повторить завершённые <span aria-hidden="true">→</span></Link>
    </section>
  );
}
