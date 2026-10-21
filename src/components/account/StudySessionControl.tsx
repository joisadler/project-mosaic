"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import styles from "./account-screen.module.scss";

export function StudySessionControl() {
  const { session, restart, storageAvailable } = useStudySession();
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  return (
    <section className={styles.sessionControl} aria-labelledby="study-session-title">
      <h2 id="study-session-title">Учебная лента</h2>
      <p>Продолжайте с того же места на этом устройстве или начните с нового порядка карточек.</p>
      {!storageAvailable ? <p role="status">Место в ленте сейчас не сохраняется. Можно продолжить обучение.</p> : null}
      {confirming ? (
        <>
          <p>Перемешать карточки и начать ленту сначала? Учебный прогресс не изменится.</p>
          <button className={styles.retry} type="button" onClick={() => { restart(); setConfirming(false); router.push("/", { scroll: false }); }}>Перемешать и начать</button>
          <button className={styles.retry} type="button" onClick={() => setConfirming(false)}>Отмена</button>
        </>
      ) : <button className={styles.retry} type="button" disabled={!session} onClick={() => setConfirming(true)}>Начать заново</button>}
    </section>
  );
}
