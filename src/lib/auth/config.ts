type Environment = Record<string, string | undefined>;

export type AuthConfig = {
  origins: string[];
  secret: string;
  mongoUri: string;
  databaseName: string;
  googleClientId: string;
  googleClientSecret: string;
};

function origin(value: string): string {
  const url = new URL(value);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/" ||
      (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
      (!local && (/^[\d.]+$/.test(url.hostname) || url.hostname.includes(":")))) {
    throw new Error("Invalid authentication origin");
  }
  return url.origin;
}

export function readAuthConfig(env: Environment): AuthConfig | null {
  const required = ["BETTER_AUTH_URL", "BETTER_AUTH_SECRET", "MONGODB_URI",
    "MONGODB_DB_NAME", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "MOSAIC_AUTH_ENV"];
  if (required.some((key) => !env[key]?.trim())) return null;
  if (!["development", "production"].includes(env.MOSAIC_AUTH_ENV!) ||
      env.BETTER_AUTH_SECRET!.length < 32 ||
      !/^mongodb(?:\+srv)?:\/\//.test(env.MONGODB_URI!)) {
    throw new Error("Invalid authentication configuration");
  }
  const primary = origin(env.BETTER_AUTH_URL!);
  const production = env.MOSAIC_AUTH_ENV === "production";
  const primaryUrl = new URL(primary);
  if (production && (primaryUrl.protocol !== "https:" ||
      primaryUrl.hostname === "localhost" || primaryUrl.hostname === "127.0.0.1" || env.AUTH_DEV_ORIGIN)) {
    throw new Error("Production authentication requires one HTTPS origin");
  }
  const origins = [primary];
  if (!production && env.AUTH_DEV_ORIGIN) {
    const development = origin(env.AUTH_DEV_ORIGIN);
    if (!development.startsWith("https://")) throw new Error("The tunnel requires HTTPS");
    origins.push(development);
  }
  return {
    origins: [...new Set(origins)],
    secret: env.BETTER_AUTH_SECRET!,
    mongoUri: env.MONGODB_URI!,
    databaseName: env.MONGODB_DB_NAME!,
    googleClientId: env.GOOGLE_CLIENT_ID!,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET!,
  };
}

export function resolveAuthOrigin(config: AuthConfig, headers: Headers): string | null {
  // Forwarded host/protocol headers must never select the OAuth callback origin.
  const host = headers.get("host")?.toLowerCase();
  return config.origins.find((value) => new URL(value).host.toLowerCase() === host) ?? null;
}
