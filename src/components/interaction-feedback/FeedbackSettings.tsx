"use client";

import { savePreferences } from "@/lib/interaction-feedback/preferences";
import { useFeedbackPreferences, useInteractionFeedback } from "./use-interaction-feedback";
import styles from "./feedback-settings.module.scss";

export function FeedbackSettings() {
  const preferences = useFeedbackPreferences();
  const playFeedback = useInteractionFeedback();
  return (
    <section aria-labelledby="feedback-heading" className={styles.settings}>
      <h2 id="feedback-heading">Отклик на действия</h2>
      <p>Для карточек, их страниц, переворотов и ответов в квизах.</p>
      <label><span>Звук<small>Переходы, подтверждения и ответы</small></span>
        <input type="checkbox" role="switch" checked={preferences.sound} onChange={event => savePreferences({ sound: event.target.checked, haptics: preferences.haptics })} />
      </label>
      <label><span>Вибрация<small>На устройствах и в браузерах с поддержкой</small></span>
        <input type="checkbox" role="switch" checked={preferences.haptics} onChange={event => savePreferences({ sound: preferences.sound, haptics: event.target.checked })} />
      </label>
      <button type="button" onClick={() => playFeedback("confirmed")}>Попробовать отклик</button>
      <p>Настройки сохраняются на этом устройстве. Громкость регулируется на устройстве.</p>
      {!preferences.storageAvailable ? <p role="status">Браузер не разрешил сохранить настройки. Они действуют до закрытия приложения.</p> : null}
    </section>
  );
}
