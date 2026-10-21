"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import styles from "./account-screen.module.scss";


export function AccountSession({ callbackFailed, callbackPath = "/sign-in" }: {
  callbackFailed: boolean;
  callbackPath?: "/sign-in" | "/account";
}) {
  const { data, isPending, error, refetch } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(callbackFailed ?
    "Вход отменён или не завершён. Можно попробовать ещё раз." : "");
  const user = data?.user;
  const initials = user?.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toLocaleUpperCase() || "M";

  async function signIn() {
    setBusy(true);
    setMessage("");
    try {
      const result = await authClient.signIn.social({
        provider: "google", callbackURL: callbackPath, errorCallbackURL: `${callbackPath}?error=oauth`,
      });
      if (result.error) setMessage("Не удалось войти. Попробуйте ещё раз.");
    } catch {
      setMessage("Не удалось связаться с сервером. Проверьте соединение и повторите вход.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    setMessage("");
    try {
      const result = await authClient.signOut();
      if (result.error) setMessage("Не удалось выйти. Попробуйте ещё раз.");
      else {
        setMessage("Вы вышли из аккаунта. Можно продолжить как гость.");
        await refetch();
      }
    } catch {
      setMessage("Не удалось связаться с сервером. Попробуйте выйти ещё раз.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div aria-busy={busy || isPending}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Личное пространство</p>
        <h1 id="account-title" tabIndex={-1}>{user || isPending || error ? "Ваш аккаунт" : "Вход в Mosaic"}</h1>
        {!user && !isPending && !error ? <p className={styles.description}>Выберите свой Google-аккаунт, чтобы войти.</p> : null}
      </header>
      <div className={styles.card}>
        {isPending ? <p className={styles.loading} role="status">Проверяем аккаунт…</p> : error ? (
          <>
            <p className={styles.notice} role="alert">Не удалось проверить аккаунт. Попробуйте ещё раз или продолжайте без входа.</p>
            <button className={styles.retry} type="button" onClick={() => void refetch()}>Повторить проверку</button>
          </>
        ) : user ? (
          <>
            <div className={styles.identity}>
              <div className={styles.avatar} aria-hidden="true">{initials}</div>
              <div className={styles.identityText}>
                <h2>{user.name}</h2>
                <p className={styles.email}>{user.email}</p>
              </div>
            </div>
            <div className={styles.providerRow}>
              <span className={styles.provider}>Аккаунт Google</span>
              <button className={styles.signOut} type="button" disabled={busy} onClick={() => void signOut()}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M9 4H5v16h4m6-12 4 4-4 4m-6-4h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {busy ? "Выходим…" : "Выйти"}
              </button>
            </div>
            <Link href="/" scroll={false} className={styles.primaryLink}>Продолжить обучение <span aria-hidden="true">→</span></Link>
          </>
        ) : (
          <button className={styles.googleButton} type="button" disabled={busy} onClick={() => void signIn()}>
            <Image src="/icons/google-g.png" alt="" width={20} height={20} />
            {busy ? "Открываем Google…" : "Войти через Google"}
          </button>
        )}
      </div>
      {!user ? <Link href="/" scroll={false} className={styles.guestLink}>Продолжить без входа <span aria-hidden="true">→</span></Link> : null}
      <p role="status" className={styles.message}>{message}</p>
    </div>
  );
}
