"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { ShuffleSymbol } from "./MosaicArtwork";
import styles from "./account-screen.module.scss";

export function StudySessionControl() {
  const { session, restart, storageAvailable, sync, retrySync } = useStudySession();
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  return (
    <section className={styles.sessionControl} aria-labelledby="study-session-title">
      <h2 id="study-session-title">Учебная лента</h2>
      <p>Продолжайте с того же места на этом устройстве или начните с нового порядка карточек.</p>
      {!storageAvailable ? <p role="status">Место в ленте сейчас не сохраняется. Можно продолжить обучение.</p> : null}
      <p role="status">{sync.status === "local" ? "Гостевой прогресс хранится отдельно на этом устройстве и не переносится в аккаунт." :
        sync.status === "unavailable" ? "Проверка аккаунта недоступна. Прогресс этой временной ленты не сохраняется." :
        sync.status === "loading" || sync.status === "syncing" ? "Синхронизируем прогресс…" :
        sync.status === "saved" ? "Прогресс сохранён в аккаунте. Место и порядок карточек остаются на этом устройстве." :
        sync.status === "unauthorized" ? "Для синхронизации войдите в аккаунт снова. Локальные изменения сохранены отдельно для этого аккаунта." :
        "Не удалось синхронизировать прогресс. Изменения остаются на этом устройстве; отправим их при восстановлении связи."}</p>
      {sync.conflict ? <p role="status">Часть прогресса была изменена или сброшена на другом устройстве. Для этих подтверждений применена версия из аккаунта.</p> : null}
      {!sync.storageAvailable && sync.status !== "local" ? <p role="alert">Очередь синхронизации не сохраняется на устройстве. Не закрывайте приложение до завершения отправки.</p> : null}
      {sync.status === "error" || sync.status === "offline" ? <button className={styles.retry} type="button" onClick={retrySync}>Повторить синхронизацию</button> : null}
      {confirming ? (
        <>
          <p>Перемешать карточки и начать ленту сначала? Учебный прогресс не изменится.</p>
          <button className={styles.retry} type="button" onClick={() => { restart(); setConfirming(false); router.push("/", { scroll: false }); }}>Перемешать и начать</button>
          <button className={styles.retry} type="button" onClick={() => setConfirming(false)}>Отмена</button>
        </>
      ) : <button className={styles.shuffleButton} type="button" disabled={!session} onClick={() => setConfirming(true)}><ShuffleSymbol />Перемешать ленту</button>}
    </section>
  );
}
