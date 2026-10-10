import styles from "./learning-feed.module.scss";

type CardTypeLabelProps = {
  type: "info" | "quiz" | "flip";
};

const labelByType = {
  info: { emoji: "💡", text: "Запомни" },
  quiz: { emoji: "🎯", text: "Проверь себя" },
  flip: { emoji: "🧠", text: "Вспомни" },
} as const;

export function CardTypeLabel({ type }: CardTypeLabelProps) {
  const label = labelByType[type];

  return (
    <span className={styles.cardTypeLabel}>
      <span aria-hidden="true">{label.emoji}</span>
      {label.text}
    </span>
  );
}
