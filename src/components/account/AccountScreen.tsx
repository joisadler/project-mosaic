import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./account-screen.module.scss";

export function AccountScreen({ children, titleId = "account-title", showProfileLink = false }: {
  children: ReactNode; titleId?: string; showProfileLink?: boolean;
}) {
  return (
    <main className={styles.screen} aria-labelledby={titleId}>
      <div className={styles.artwork} aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <nav className={styles.navigation} aria-label="Навигация аккаунта">
        <span className={styles.brand}>
          <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
            <rect x="1" y="1" width="11" height="11" rx="3" fill="currentColor" />
            <rect x="16" y="1" width="11" height="11" rx="3" fill="currentColor" opacity=".4" />
            <rect x="1" y="16" width="11" height="11" rx="3" fill="currentColor" opacity=".65" />
            <rect x="16" y="16" width="11" height="11" rx="3" fill="currentColor" />
          </svg>
          Mosaic
        </span>
        <Link href="/" scroll={false} className={styles.back}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="m10 6-6 6 6 6M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          К карточкам
        </Link>
      </nav>
      <div className={styles.content}>
        {showProfileLink ? <Link href="/account" scroll={false} className={styles.profileBack}>← Профиль</Link> : null}
        {children}
      </div>
    </main>
  );
}

export function AccountUnavailable({ profile = false }: { profile?: boolean }) {
  return (
    <>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Личное пространство</p>
        <h1 id="account-title" data-screen-heading tabIndex={-1}>{profile ? "Профиль" : "Вход в Mosaic"}</h1>
      </header>
      <div className={styles.card}>
        <p className={styles.notice} role="status">Вход сейчас недоступен. Карточки по-прежнему доступны без аккаунта.</p>
        <Link href="/" scroll={false} className={styles.primaryLink}>Перейти к карточкам <span aria-hidden="true">→</span></Link>
      </div>
    </>
  );
}
