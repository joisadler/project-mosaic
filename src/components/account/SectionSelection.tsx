"use client";

import { useState } from "react";
import { learningChapters, learningSections } from "@/content/learning-sections";
import { useStudySession } from "@/components/study-shell/StudySessionProvider";
import { ChapterSelection } from "./ChapterSelection";
import { ProgressSummary, ResetProgressDialog, type ResetTarget } from "./ProgressControls";
import styles from "./account-screen.module.scss";

export function SectionSelection() {
  const { sync, setSections, session, progress } = useStudySession();
  const [resetTarget, setResetTarget] = useState<ResetTarget | null>(null);
  const disabled = !session || sync.status === "unavailable";
  return (
    <section className={styles.sessionControl} aria-labelledby="section-selection-title">
      <h2 id="section-selection-title" tabIndex={-1}>Разделы для обучения</h2>
      <p>Выберите раздел целиком или отдельные подразделы. Изменение выбора не сбрасывает прогресс.</p>
      <p>Средний прогресс — среднее процентов всех карточек, включая невыбранные. Завершёнными считаются карточки со 100%.</p>
      <h3 className={styles.progressHeading}>Весь прогресс</h3>
      <ProgressSummary title="Весь прогресс" cardIds={learningSections.flatMap(section => section.cards.map(card => card.id))} onReset={setResetTarget} />
      <fieldset className={styles.sectionChoices}>
        <legend className={styles.sectionLegend}>Выберите разделы и подразделы</legend>
        {learningChapters.map(chapter => {
          const subsections = learningSections.filter(section => section.chapterId === chapter.id);
          if (!subsections.length) return null;
          return (
            <ChapterSelection key={chapter.id} number={chapter.number} title={chapter.title}
              subsections={subsections} selected={sync.sections} disabled={disabled}
              onChange={setSections} onReset={setResetTarget} />
          );
        })}
      </fieldset>
      <div className={styles.sectionActions}>
        <button type="button" className={styles.retry} disabled={disabled || sync.sections.length === learningSections.length} onClick={() => setSections(learningSections.map(section => section.id))}>Выбрать всё</button>
        <button type="button" className={styles.retry} disabled={disabled || !sync.sections.length} onClick={() => setSections([])}>Снять всё</button>
      </div>
      {!sync.sections.length ? <p role="status">Подразделы не выбраны. Выберите хотя бы один, чтобы продолжить обучение.</p> : null}
      {!sync.storageAvailable && sync.status === "local" ? <p role="status">Выбор подразделов действует до закрытия приложения: сохранение на устройстве недоступно.</p> : null}
      {!progress.storageAvailable ? <p role="status">Прогресс сейчас не сохраняется на устройстве. Локальный сброс может не сохраниться после закрытия приложения.</p> : null}
      {resetTarget ? <ResetProgressDialog target={resetTarget} onClose={() => setResetTarget(null)} /> : null}
    </section>
  );
}
