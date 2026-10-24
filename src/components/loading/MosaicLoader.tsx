import styles from "./mosaic-loader.module.scss";

export function MosaicLoader({ label, description, variant = "inline", animate = true, className = "" }: {
  label: string;
  description?: string;
  variant?: "inline" | "hero";
  animate?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.loader} ${styles[variant]} ${animate ? "" : styles.still} ${className}`} role="status" aria-atomic="true" data-mosaic-loader>
      <span className={styles.mark} aria-hidden="true">
        <span /><span /><span /><span />
      </span>
      <span className={styles.copy}>
        <span className={styles.label}>{label}</span>
        {description ? <span className={styles.description}>{description}</span> : null}
      </span>
    </div>
  );
}
