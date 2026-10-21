import type { Metadata } from "next";
import { readAuthConfig } from "@/lib/auth/config";
import { AccountSession } from "@/components/account/AccountSession";
import { AccountScreen, AccountUnavailable } from "@/components/account/AccountScreen";

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
    <AccountScreen>
      {configured ? <AccountSession callbackFailed={Boolean(params.error)} /> : <AccountUnavailable />}
    </AccountScreen>
  );
}
