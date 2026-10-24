import Link from "next/link";
import type { ReactNode } from "react";
import { MosaicMark, MosaicTiles } from "./MosaicArtwork";
import styles from "./account-screen.module.scss";

export function AccountScreen({ children, titleId = "account-title", showProfileLink = false }: {
  children: ReactNode; titleId?: string; showProfileLink?: boolean;
}) {
  return (
    <main className={styles.screen} aria-labelledby={titleId}>
      {!showProfileLink ? <div className={styles.artwork}><MosaicTiles /></div> : null}
      <nav className={styles.navigation} aria-label="Навигация аккаунта">
        <Link href={showProfileLink ? "/account" : "/"} scroll={false} className={styles.back}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="m10 6-6 6 6 6M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {showProfileLink ? "Профиль" : "К карточкам"}
        </Link>
        <span className={styles.brand}>
          <MosaicMark />
          Mosaic
        </span>
      </nav>
      <div className={styles.content}>
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
      </div>
    </>
  );
}
