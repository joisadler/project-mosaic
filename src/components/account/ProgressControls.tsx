"use client";

import { useEffect, useRef, useState } from "react";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { summarizeProgress } from "@/lib/learning-progress/progress";
import { MosaicLoader } from "@/components/loading/MosaicLoader";
import { MosaicTiles, ResetSymbol } from "./MosaicArtwork";
import styles from "./account-screen.module.scss";

export type ResetTarget = { title: string; cardIds: string[]; trigger: HTMLButtonElement };
const percent = new Intl.NumberFormat("ru", { maximumFractionDigits: 2 });

export function ProgressSummary({ title, cardIds, onReset, prominent = false, resetLabel = "Сбросить прогресс" }: {
  title: string; cardIds: string[]; onReset: (target: ResetTarget) => void;
  prominent?: boolean; resetLabel?: string;
}) {
  const { progress, sync } = useStudySession();
  const summary = summarizeProgress(progress.data, cardIds);
  return (
    <div className={`${styles.progressSummary} ${prominent ? styles.overallProgress : ""}`}>
      {prominent ? <><div className={styles.summaryArtwork}><MosaicTiles /></div><h3 className={styles.progressHeading}>{title}</h3></> : null}
      {progress.ready && sync.status !== "unavailable" ? (
        <>
          <div className={styles.progressNumbers}>
            <span className={styles.progressValue}><span className={styles.visuallyHidden}>Средний прогресс: </span><strong>{percent.format(summary.average)}%</strong></span>
            <span>Завершено {summary.completed} из {summary.total}</span>
          </div>
          <progress max={100} value={summary.average} aria-label={`Средний прогресс: ${title}`} />
        </>
      ) : sync.status === "unavailable" ? <p role="status">Прогресс недоступен, пока не удалось проверить аккаунт.</p> :
        prominent ? <MosaicLoader label="Загружаем прогресс…" className={styles.progressLoading} /> : <p role="status">Загружаем прогресс…</p>}
      <button className={styles.resetProgress} type="button" aria-label={`Сбросить прогресс: ${title}`}
        disabled={!progress.ready || !summary.hasHistory || sync.status === "unavailable" || sync.status === "unauthorized"}
        onClick={event => onReset({ title, cardIds, trigger: event.currentTarget })}><ResetSymbol />{resetLabel}</button>
    </div>
  );
}

export function ResetProgressDialog({ target, onClose }: { target: ResetTarget; onClose: () => void }) {
  const { resetProgress, sync } = useStudySession();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    cancelRef.current?.focus();
    return () => {
      dialog?.close();
      if (target.trigger.isConnected && !target.trigger.disabled) target.trigger.focus({ preventScroll: true });
      else document.getElementById("section-selection-title")?.focus({ preventScroll: true });
    };
  }, [target]);

  async function confirm() {
    if (busy) return;
    setBusy(true); setError("");
    try {
      if (await resetProgress(target.cardIds)) onClose();
      else setError("Не удалось подтвердить результат сброса. Проверьте соединение и текущий прогресс перед повторной попыткой.");
    } catch {
      setError("Не удалось подтвердить результат сброса. Проверьте соединение и попробуйте ещё раз.");
    } finally { setBusy(false); }
  }

  return (
    <dialog ref={dialogRef} className={styles.resetDialog} role="alertdialog" aria-labelledby="reset-progress-title"
      aria-describedby="reset-progress-description" aria-busy={busy}
      onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}>
      <h2 id="reset-progress-title">Сбросить прогресс?</h2>
      <p className={styles.resetScope}>{target.title}</p>
      <p id="reset-progress-description">Будут удалены все подтверждения в этой области. Отменить сброс нельзя. Выбор подразделов, порядок и место в ленте сохранятся.</p>
      <p>{sync.status === "local" ? "Сброс затронет только гостевой прогресс на этом устройстве." : "Сброс затронет прогресс этого аккаунта на всех устройствах. Требуется соединение с сервером."}</p>
      {error ? <p role="alert">{error}</p> : null}
      <div className={styles.sectionActions}>
        <button ref={cancelRef} type="button" className={styles.retry} disabled={busy} onClick={onClose}>Отмена</button>
        <button type="button" className={styles.confirmReset} disabled={busy} onClick={() => void confirm()}>{busy ? "Сбрасываем…" : "Сбросить прогресс"}</button>
      </div>
    </dialog>
  );
}
