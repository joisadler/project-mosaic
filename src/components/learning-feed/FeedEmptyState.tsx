import Link from "next/link";
import { MosaicMark } from "@/components/account/MosaicArtwork";
import styles from "./feed-empty-state.module.scss";

type EmptyKind = "review" | "topics" | "complete";
const content = {
  review: {
    title: "Пока нечего повторять",
    description: "Здесь появятся карточки со 100% из выбранных тем.",
    primary: { href: "/", label: "Продолжить обучение" },
    secondary: { href: "/learning", label: "Выбрать темы" },
  },
  topics: {
    title: "С чего начнём?",
    description: "Выберите темы в «Моём обучении» — и соберите свою ленту.",
    primary: { href: "/learning", label: "Выбрать темы" },
    secondary: { href: "/account", label: "К профилю" },
  },
  complete: {
    title: "Эти темы уже изучены",
    description: "Все выбранные карточки достигли 100%. Закрепим знания или выберем новые темы?",
    primary: { href: "/review", label: "К повторению" },
    secondary: { href: "/learning", label: "Выбрать другие темы" },
  },
} satisfies Record<EmptyKind, { title: string; description: string; primary: { href: string; label: string }; secondary: { href: string; label: string } }>;

function EmptyArtwork({ kind }: { kind: EmptyKind }) {
  return (
    <div className={`${styles.artwork} ${styles[kind] ?? ""}`} aria-hidden="true">
      <span className={styles.glow} />
      {kind === "topics" ? (
        <span className={styles.puzzle}>
          <span /><span /><span />
          <span className={styles.slot}><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
        </span>
      ) : (
        <>
          <span className={styles.backCard} />
          <span className={styles.frontCard}>
            {kind === "review" ? <svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M6 4h12v17l-6-4-6 4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg> : null}
            <span /><span /><span />
          </span>
          {kind === "review" ? <span className={styles.cyanTile} /> :
            <span className={styles.check}><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
          <span className={styles.apricotTile} />
        </>
      )}
      <span className={styles.spark} />
      {kind !== "review" ? <span className={styles.dot} /> : null}
    </div>
  );
}

export function FeedEmptyState({ kind, reviewMode }: { kind: EmptyKind; reviewMode: boolean }) {
  const state = content[kind];
  return (
    <div className={styles.screen}>
      <nav className={styles.navigation} aria-label="Навигация обучения">
        <Link className={styles.back} href="/account" scroll={false} data-account-entry data-review-return={reviewMode ? true : undefined}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m10 6-6 6 6 6M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Профиль
        </Link>
        <span className={styles.brand}><MosaicMark />Mosaic</span>
      </nav>
      <div className={styles.content}>
        <EmptyArtwork kind={kind} />
        <h1 className={kind === "topics" ? styles.topicTitle : undefined}>{state.title}</h1>
        <p role="status">{state.description}</p>
        <div className={styles.actions}>
          <Link href={state.primary.href} scroll={false} className={styles.primary}>
            {state.primary.label}
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link href={state.secondary.href} scroll={false} className={styles.secondary}>{state.secondary.label}</Link>
        </div>
      </div>
    </div>
  );
}
