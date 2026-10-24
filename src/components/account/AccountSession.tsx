"use client";

import { useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth/client";
import { AccountIdentity } from "./AccountIdentity";
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
        <h1 id="account-title" data-screen-heading tabIndex={-1}>{callbackPath === "/account" ? "Профиль" : user || isPending || error ? "Мой аккаунт" : "Вход в Mosaic"}</h1>
      </header>
      <div className={isPending ? styles.sessionCheck : user && !error ? styles.profileIdentity : styles.card}>
        {isPending ? <p className={styles.loading} role="status">Проверяем аккаунт…</p> : error ? (
          <>
            <p className={styles.notice} role="alert">Не удалось проверить аккаунт. Попробуйте ещё раз или продолжайте без входа.</p>
            <button className={styles.retry} type="button" onClick={() => void refetch()}>Повторить проверку</button>
          </>
        ) : user ? (
          <>
            <AccountIdentity name={user.name} email={user.email} busy={busy} onSignOut={() => void signOut()} />
          </>
        ) : (
          <button className={styles.googleButton} type="button" disabled={busy} onClick={() => void signIn()}>
            <Image src="/icons/google-g.png" alt="" width={20} height={20} />
            {busy ? "Открываем Google…" : "Войти через Google"}
          </button>
        )}
      </div>
      <p role="status" className={styles.message}>{message}</p>
    </div>
  );
}
