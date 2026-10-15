import "server-only";
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { readAuthConfig, resolveAuthOrigin } from "./config";
import { getAuthDatabase } from "./database";

export class AuthUnavailableError extends Error {}
export class UnauthenticatedError extends Error {}
export class UntrustedAuthHostError extends Error {}

async function createAuth(origin: string) {
  const config = readAuthConfig(process.env);
  if (!config) throw new AuthUnavailableError();
  const { client, db } = await getAuthDatabase(config);
  return betterAuth({
    appName: "Project Mosaic",
    baseURL: origin,
    secret: config.secret,
    database: mongodbAdapter(db, { client }),
    trustedOrigins: [origin],
    onAPIError: { errorURL: `${origin}/sign-in` },
    socialProviders: {
      google: {
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        disableIdTokenSignIn: true,
        prompt: "select_account",
      },
    },
    account: {
      accountLinking: { enabled: false },
      encryptOAuthTokens: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: false },
    },
    advanced: {
      cookiePrefix: "mosaic",
      useSecureCookies: origin.startsWith("https://"),
      trustedProxyHeaders: false,
    },
  });
}

const instances = new Map<string, ReturnType<typeof createAuth>>();

export async function getAuth(headers: Headers) {
  const config = readAuthConfig(process.env);
  if (!config) throw new AuthUnavailableError();
  const origin = resolveAuthOrigin(config, headers);
  if (!origin) throw new UntrustedAuthHostError();
  let instance = instances.get(origin);
  if (!instance) {
    instance = createAuth(origin).catch((error: unknown) => {
      instances.delete(origin);
      throw error;
    });
    instances.set(origin, instance);
  }
  return instance;
}

export async function getCurrentUser(headers: Headers) {
  const auth = await getAuth(headers);
  const session = await auth.api.getSession({ headers });
  if (!session) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email };
}

// Future account-data routes derive ownership here, never from a client user ID.
export async function requireUser(headers: Headers) {
  const user = await getCurrentUser(headers);
  if (!user) throw new UnauthenticatedError();
  return user;
}
