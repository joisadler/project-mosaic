"use client";

import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "@/components/learning-feed/use-media-query";
import { savePreferences, type FeedbackPreferences } from "@/lib/interaction-feedback/preferences";
import { requestVibration, type FeedbackKind } from "@/lib/interaction-feedback/player";
import { useFeedbackPreferences, useInteractionFeedback } from "@/components/interaction-feedback/use-interaction-feedback";
import styles from "./feedback-prototype.module.scss";

const feedback = {
  page: { label: "Ещё одна страница", description: "Быстрый лёгкий «вуть» — чуть выше основного." },
  flip: { label: "Ответ открыт", description: "Более глубокий и округлый «вуть» для переворота." },
  swipe: { label: "Следующая карточка", description: "Короткий мягкий «вуть» при пролистывании." },
  confirmed: { label: "Понятно!", description: "Короткое подтверждение, без лишнего шума." },
  correct: { label: "Верно!", description: "Мягкий восходящий звук и цветовой акцент." },
  incorrect: { label: "Попробуй ещё", description: "Спокойный отклик на ошибку. Можно продолжать." },
} satisfies Record<FeedbackKind, { label: string; description: string }>;

export function FeedbackPrototype() {
  const selectedPreferences = useFeedbackPreferences();
  const play = useInteractionFeedback();
  const [vibrationStatus, setVibrationStatus] = useState("");
  const [event, setEvent] = useState<{ kind: FeedbackKind; sequence: number } | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const updatePreference = (key: keyof FeedbackPreferences, enabled: boolean) => {
    savePreferences({ sound: selectedPreferences.sound, haptics: selectedPreferences.haptics, [key]: enabled });
  };

  const testVibration = () => {
    if (!selectedPreferences.haptics) {
      setVibrationStatus("Сначала включи переключатель «Вибрация».");
      return;
    }
    const result = requestVibration(200);
    setVibrationStatus(result === "unsupported"
      ? "Браузер не предоставляет Vibration API."
      : result === "rejected"
        ? "Браузер отклонил запрос вибрации."
        : "Браузер принял запрос на 200 мс. Это не подтверждает физическую вибрацию. Если её нет, проверь системные настройки вибрации и режим «Не беспокоить».");
  };

  const playFeedback = (kind: FeedbackKind) => {
    setEvent(previous => ({ kind, sequence: (previous?.sequence ?? 0) + 1 }));
    play(kind);
  };

  return (
    <main className={styles.screen}>
      <div className={styles.content}>
        <nav className={styles.navigation} aria-label="Навигация"><Link href="/account">← Профиль</Link><span>Mosaic · Лаборатория</span></nav>
        <p className={styles.eyebrow}>ПОПРОБУЕМ НА ОЩУПЬ</p>
        <h1>Маленький отклик.<br />Больше ощущения.</h1>
        <p className={styles.intro}>Короткие эффекты для обучения. Здесь можно попробовать их отдельно — учебный прогресс не меняется.</p>
        <fieldset className={styles.preferences}>
          <legend>Как тебе удобнее?</legend>
          <label><span>Звук<small>Короткий и негромкий</small></span><input type="checkbox" role="switch" checked={selectedPreferences.sound} onChange={e => updatePreference("sound", e.target.checked)} /></label>
          <label><span>Вибрация<small>Если устройство поддерживает</small></span><input type="checkbox" role="switch" checked={selectedPreferences.haptics} onChange={e => updatePreference("haptics", e.target.checked)} /></label>
        </fieldset>
        <p className={styles.note}>Вибрация зависит от поддержки браузера. Громкость регулируется на устройстве.</p>
        <div className={styles.vibrationTest}>
          <button type="button" onClick={testVibration}>Проверить вибрацию · 200 мс</button>
          <p role="status" aria-live="polite">{vibrationStatus}</p>
        </div>
        <section className={styles.preview} aria-label="Предпросмотр отклика">
          <div key={event?.sequence ?? 0} className={styles.feedback} data-kind={event?.kind} data-animate={Boolean(event) && !reducedMotion}>
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              {event?.kind === "swipe" ? <path d="M32 14v36m-12-12 12 12 12-12" /> : event?.kind === "incorrect" ? <path d="m22 22 20 20m0-20L22 42" /> : <path d="m17 32 10 10 21-22" />}
            </svg>
          </div>
          <div role="status" aria-live="polite" aria-atomic="true">
            <h2>{event ? feedback[event.kind].label : "Выбери действие"}</h2>
            <p>{event ? feedback[event.kind].description : "Эффекты запускаются только по нажатию."}</p>
          </div>
        </section>
        <div className={styles.actions}>
          <button type="button" onClick={() => void playFeedback("confirmed")}>✓ Понятно</button>
          <button type="button" onClick={() => void playFeedback("correct")}>Верный ответ</button>
          <button type="button" onClick={() => void playFeedback("incorrect")}>Ошибка</button>
          <button type="button" onClick={() => void playFeedback("swipe")}>Пролистнуть · вуть</button>
          <button type="button" onClick={() => void playFeedback("page")}>Страница · вить</button>
          <button type="button" onClick={() => void playFeedback("flip")}>Ответ · вуум</button>
        </div>
        <p className={styles.note}>{reducedMotion ? "Уменьшение движения включено: анимация отключена." : "Анимация учитывает системную настройку уменьшения движения."}</p>
        <p className={styles.warning} role="status">{!selectedPreferences.storageAvailable ? "Настройки действуют до закрытия страницы: браузер не разрешил их сохранить." : ""}</p>
      </div>
    </main>
  );
}
