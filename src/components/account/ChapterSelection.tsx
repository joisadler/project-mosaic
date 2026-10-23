"use client";

import { useEffect, useId, useRef, useState } from "react";
import { groupSelection, toggleSectionGroup } from "@/lib/study-session/section-selection";
import { ProgressSummary, type ResetTarget } from "./ProgressControls";
import styles from "./account-screen.module.scss";

type Subsection = {
  id: string;
  number: string;
  title: string;
  cards: readonly { id: string }[];
};

export function ChapterSelection({ number, title, subsections, selected, disabled, onChange, onReset }: {
  number: string;
  title: string;
  subsections: readonly Subsection[];
  selected: readonly string[];
  disabled: boolean;
  onChange: (ids: string[]) => void;
  onReset: (target: ResetTarget) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const ids = subsections.map(section => section.id);
  const { checked, mixed } = groupSelection(selected, ids);
  const selectedCount = ids.filter(sectionId => selected.includes(sectionId)).length;
  const label = `Раздел ${number}: ${title}`;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = mixed;
  }, [mixed]);

  return (
    <div className={styles.chapter}>
      <div className={styles.chapterHeader}>
        <label className={styles.chapterCheckbox}>
          <input ref={inputRef} type="checkbox" checked={checked} disabled={disabled}
            aria-label={`Выбрать весь раздел ${number}: ${title}`}
            aria-checked={mixed ? "mixed" : checked}
            onChange={event => onChange(toggleSectionGroup(selected, ids, event.target.checked))} />
        </label>
        <h3 id={`${id}-heading`}>
          <button type="button" className={styles.chapterToggle} aria-expanded={expanded}
            aria-controls={`${id}-subsections`}
            onClick={event => {
              if (expanded) event.currentTarget.focus({ preventScroll: true });
              setExpanded(!expanded);
            }}>
            <span>{number}. {title}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </h3>
      </div>
      <p className={styles.chapterCount}>Выбрано подразделов: {selectedCount} из {subsections.length}</p>
      <ProgressSummary title={label} cardIds={subsections.flatMap(section => section.cards.map(card => card.id))} onReset={onReset} />
      <div id={`${id}-subsections`} className={styles.subsections} hidden={!expanded}>
        {subsections.map(section => (
          <div className={styles.subsection} key={section.id}>
            <label className={styles.sectionChoice}>
              <input type="checkbox" disabled={disabled} checked={selected.includes(section.id)}
                onChange={event => onChange(toggleSectionGroup(selected, [section.id], event.target.checked))} />
              <span><strong>{section.number}</strong>{section.title}</span>
            </label>
            <ProgressSummary title={`Подраздел ${section.number}: ${section.title}`} cardIds={section.cards.map(card => card.id)} onReset={onReset} />
          </div>
        ))}
      </div>
    </div>
  );
}
