import Link from "next/link";
import type { Metadata } from "next";
import { readAuthConfig } from "@/lib/auth/config";
import { SignIn } from "./SignIn";
import styles from "./SignIn.module.scss";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  if (process.env.MOSAIC_AUTH_ENV !== "development") return {};
  return {
    manifest: "/dev-auth.webmanifest",
    appleWebApp: { capable: true, title: "Mosaic Dev", statusBarStyle: "default" },
  };
}

export default async function SignInPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  let configured = false;
  try {
    configured = readAuthConfig(process.env) !== null;
  } catch {
    // Configuration details and secrets are never exposed to the browser.
  }
  const params = await searchParams;
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="sign-in-title">
        <h1 id="sign-in-title">Вход в Mosaic</h1>
        <p>Учиться можно без аккаунта.</p>
        {configured ? <SignIn callbackFailed={Boolean(params.error)} /> : (
          <p role="status">Вход пока недоступен. Можно продолжить обучение без аккаунта.</p>
        )}
        <Link href="/" className={styles.link}>Перейти к карточкам</Link>
      </section>
    </main>
  );
}
