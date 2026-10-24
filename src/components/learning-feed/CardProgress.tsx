import styles from "./card-progress.module.scss";
import feedStyles from "./learning-feed.module.scss";

export function CardProgress({ value, displayedValue = value, review = false }: {
  value: number;
  displayedValue?: number;
  review?: boolean;
}) {
  return (
    <div className={styles.indicator}>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.fill} style={{ transform: `scaleX(${displayedValue / 100})` }} />
      </span>
      <progress className={feedStyles.visuallyHidden} max={100} value={value}
        aria-label={review ? "Завершённая карточка. При повторении прогресс не меняется." : "Прогресс подтверждений этой карточки"} />
    </div>
  );
}
