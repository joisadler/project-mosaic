"use client";

import { useState } from "react";
import { createAuthClient } from "better-auth/react";
import styles from "./SignIn.module.scss";

const authClient = createAuthClient();

export function SignIn({ callbackFailed }: { callbackFailed: boolean }) {
  const { data, isPending, error, refetch } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(callbackFailed ?
    "Вход отменён или не завершён. Можно попробовать ещё раз." : "");

  async function signIn() {
    setBusy(true);
    setMessage("");
    try {
      const result = await authClient.signIn.social({
        provider: "google", callbackURL: "/sign-in", errorCallbackURL: "/sign-in?error=oauth",
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
    <div className={styles.actions} aria-busy={busy || isPending}>
      {isPending ? <p role="status">Проверяем вход…</p> : error ? (
        <>
          <p role="alert">Не удалось проверить аккаунт. Можно повторить проверку или учиться как гость.</p>
          <button type="button" onClick={() => void refetch()}>Повторить проверку</button>
        </>
      ) : data?.user ? (
        <>
          <p>Вы вошли как <strong>{data.user.name}</strong></p>
          <p className={styles.email}>{data.user.email}</p>
          <button type="button" disabled={busy} onClick={() => void signOut()}>Выйти</button>
        </>
      ) : (
        <>
          <p>Войдите через Google. Если сессия истекла, потребуется войти снова.</p>
          <button type="button" disabled={busy} onClick={() => void signIn()}>Войти через Google</button>
        </>
      )}
      <p role="status" className={styles.message}>{message}</p>
    </div>
  );
}
