import type { Metadata } from "next";
import { readAuthConfig } from "@/lib/auth/config";
import { AccountSession } from "@/components/account/AccountSession";
import { StudySessionControl } from "@/components/account/StudySessionControl";
import { AccountScreen, AccountUnavailable } from "@/components/account/AccountScreen";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Аккаунт — Mosaic" };

export default async function AccountPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  let configured = false;
  try {
    configured = readAuthConfig(process.env) !== null;
  } catch {
    // Do not expose configuration details or credentials to the browser.
  }
  const params = await searchParams;
  return (
    <AccountScreen>
      {configured ? <AccountSession callbackFailed={Boolean(params.error)} callbackPath="/account" /> : <AccountUnavailable />}
      <StudySessionControl />
    </AccountScreen>
  );
}
