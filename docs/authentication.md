# Google authentication and MongoDB

Google authentication is optional. The feed works without configuration, accounts, or a database. Open `/sign-in` directly to exercise the authentication foundation; the permanent user/settings entry belongs to MOS-23. This increment does not persist learning progress, synchronize accounts, or resume feeds.

## Environments

| Environment | App origin | MongoDB database | OAuth client |
| --- | --- | --- | --- |
| Local desktop | `http://localhost:3000` | `project_mosaic_dev` | Development |
| Local phone through a fixed HTTPS tunnel | Your assigned ngrok HTTPS origin | `project_mosaic_dev` | Same development client |
| Production | `https://project-mosaic-psi.vercel.app` | `project_mosaic_prod` | Separate production client |

Use different database credentials, OAuth clients, and authentication secrets for development and production. The same Google account can sign in to all environments, but development and production data are deliberately isolated. Localhost and the tunnel share development identities; each origin has its own host-only session cookie and requires its own sign-in. Cookies are never shared across domains.

Google permits HTTP loopback callbacks but requires HTTPS for public hosts and does not permit raw LAN IP callback hosts. A changing Wi-Fi IP therefore does not belong in the OAuth configuration. A fixed tunnel domain forwards HTTPS requests to the local server, including on an iPhone; register that domain once. LAN browsing without authentication still works.

## 1. MongoDB Atlas

1. Create an Atlas project and a cluster supporting transactions (Atlas replica sets do). A free cluster is sufficient for initial validation.
2. Create separate database users restricted to `readWrite` on `project_mosaic_dev` and `project_mosaic_prod` respectively. Do not reuse the Atlas dashboard password as a database password.
3. Configure Network Access for the actual development and deployment egress. Local IP allowlists may need updating after changing networks. Vercel egress is a separate database-network concern; an HTTPS tunnel does not change the local server's outbound IP. Avoid an unrestricted allowlist when a narrower deployment network configuration is available.
4. Obtain each MongoDB connection string privately. Put the database user's URL-encoded password into the URI and set `MONGODB_DB_NAME` separately. Never send the URI or password in chat or put it in Git.

The application creates its core indexes on the first configured authentication request: unique user emails, unique Google provider/account identity pairs, unique session tokens, user lookup indexes, and expiry indexes. This requires index-creation permissions. MongoDB needs no SQL migration. Existing duplicate records cause index setup to fail; resolve them deliberately rather than removing uniqueness constraints.

## 2. Stable development tunnel

Create/sign in to an ngrok account and obtain its assigned development domain. Install the ngrok CLI separately from this repository and authenticate it locally. Use the actual assigned domain, not the placeholder below:

```bash
ngrok http 3000 --url https://YOUR-ASSIGNED-DOMAIN.ngrok-free.app
```

Keep the tunnel and Next.js server running while testing on the phone. A reserved/assigned stable domain avoids callback edits after local IP changes; a randomly changing tunnel URL would require updating Google and local configuration. A free ngrok browser warning may appear before the app. The tunnel exposes the development server publicly while running; close it after testing.

The tunnel must preserve the original public `Host` header (ngrok's default). Do not enable host-header rewriting to localhost. The auth server ignores `X-Forwarded-Host` and `X-Forwarded-Proto`; it maps the exact incoming host to the configured origin. A stable HTTPS tunnel also allows secure PWA/browser APIs that a raw HTTP LAN origin cannot provide.

## 3. Google OAuth clients

In Google Cloud / Google Auth Platform, configure branding, audience, and a **Web application** OAuth client. Use only the basic sign-in identity scopes. During testing, add the intended Google account as a test user if the audience is in Testing mode.

Use separate Google Cloud projects for development and production so consent-screen branding, audience, publishing settings, and OAuth credentials stay isolated. The development project is `project-mosaic-dev` (**Project Mosaic Dev**); the production project is `project-mosaic-prod` (**Project Mosaic Prod**) with its own web OAuth client. Google Cloud project IDs do not need to match the application domain.

For the development client, register these authorized redirect URIs exactly:

```text
http://localhost:3000/api/auth/callback/google
https://YOUR-ASSIGNED-DOMAIN.ngrok-free.app/api/auth/callback/google
```

For the production client, register:

```text
https://project-mosaic-psi.vercel.app/api/auth/callback/google
```

The app uses a server-side authorization-code redirect flow, not the Google JavaScript popup SDK. Authorized JavaScript origins are not required by this implementation. If configured, use the corresponding exact origins without the callback path. No wildcard callbacks. Ports, scheme, hostname, and callback path must match.

## 4. Local environment

Copy `.env.example` to `.env.local`, fill it privately, and generate a development secret of at least 32 random characters:

```bash
openssl rand -base64 32
```

Use these settings, replacing placeholders with your actual private values:

```dotenv
MOSAIC_AUTH_ENV=development
BETTER_AUTH_URL=http://localhost:3000
AUTH_DEV_ORIGIN=https://YOUR-ASSIGNED-DOMAIN.ngrok-free.app
BETTER_AUTH_SECRET=<development-secret>
GOOGLE_CLIENT_ID=<development-client-id>
GOOGLE_CLIENT_SECRET=<development-client-secret>
MONGODB_URI=<development-connection-string>
MONGODB_DB_NAME=project_mosaic_dev
```

Restart `npm run dev` after changes. `AUTH_DEV_ORIGIN` also adds that exact hostname to Next.js development origins. Neither Google nor Next.js needs the computer's changing LAN IP for tunnel access. For localhost-only testing, leave `AUTH_DEV_ORIGIN` empty.

Missing configuration disables the sign-in UI and makes authentication/account endpoints return `503`; browsing remains available. Invalid configuration fails closed. No secrets use a `NEXT_PUBLIC_` prefix, appear in client props, or belong in tracked files. Database connection failures also return a generic `503` rather than leaking connection strings. Connections are lazy, bounded to five per server process, and do not run during a guest-only build.

## 5. Production configuration

The owner-confirmed Vercel Function Region is `iad1`; the production Atlas cluster `mosaic-prod` is configured separately from development, with AWS Northern Virginia (`us-east-1`) selected for proximity to the functions. Use application user `mosaic_prod_app` with `readWrite` only on `project_mosaic_prod`, restricted to that cluster.

The current Hobby setup uses direct Atlas connections with dynamic Vercel egress. The production project's `0.0.0.0/0` IP access-list entry permits connection attempts from any IPv4 source; it does not restrict access to Vercel. Database authentication, strong separate credentials, least-privilege roles, and TLS remain required. Development normally uses a home/work IP allowlist; an explicitly approved diagnostic exception must have an automatic expiry and does not establish a permanent policy. If fixed-egress infrastructure is introduced later, replace the broad production entry with its actual static addresses.

For network diagnostics, check the normal replica-set connection and every node, including the primary. One reachable secondary does not establish a working application connection. An HTTP IP echo can differ from the source address used for another destination. After changing access rules, restart the development server if its existing connection pool does not recover, then verify the actual API as well as a fresh driver connection.

A private `.env.production.setup` file may be used to prepare the seven values below. It is Git-ignored and is deliberately not a Next.js auto-loaded filename, so it does not override local development or local build settings. Fill only production credentials, validate privately, and copy/import the values into Vercel's Production environment. Never copy the setup file into tracked documentation or expose its contents in chat. Keep the production authentication secret in the owner's password manager for recovery, and remove the local setup copy when provisioning and verification are complete.

Set the following only in Vercel's **Production** environment, using production credentials:

```dotenv
MOSAIC_AUTH_ENV=production
BETTER_AUTH_URL=https://project-mosaic-psi.vercel.app
BETTER_AUTH_SECRET=<different-production-secret>
GOOGLE_CLIENT_ID=<production-client-id>
GOOGLE_CLIENT_SECRET=<production-client-secret>
MONGODB_URI=<production-connection-string>
MONGODB_DB_NAME=project_mosaic_prod
```

Do not set `AUTH_DEV_ORIGIN` in production. Do not copy production secrets into Preview deployments or local files. Preview authentication remains disabled until a separate explicit environment is configured. Changes become effective in a subsequent deployment; this setup does not itself deploy anything.

When a permanent domain is ready, add its Google callback first, connect the domain, update `BETTER_AUTH_URL`, and deploy through the owner's normal workflow. Keep the same production database and secret to preserve identities. Users must sign in again on the new hostname because cookies are host-only. Remove the old callback when the old domain is retired. Never rotate a secret just to rename a domain.

## Data and account boundaries

Better Auth owns the `user`, `account`, `session`, and `verification` collections. The MongoDB user ID is the stable application identity; the provider/account pair identifies the Google login. Profile data is limited to the provider's standard name, email, verification status, and optional image, plus authentication timestamps. Sessions expire after seven days and refresh after one day of activity. Google token material is encrypted at rest using the authentication secret; it is not returned by `/api/account`. No application roles, analytics, learning history, or progress are added here.

Only Google sign-in is enabled. Password authentication and account linking are disabled. HTTPS origins use Secure, HttpOnly, host-only cookies; localhost uses HttpOnly cookies over HTTP. Cookie session caching is disabled so a revoked/expired session is checked against the database. Better Auth handles OAuth state, origin/CSRF checks, session revocation, and its default rate limiting. The default rate limiter is process-local; it is not a distributed abuse-control system.

Every new Google sign-in requests `prompt=select_account` so users can choose a different identity even when the browser or standalone PWA retains a Google session. Signing out of Mosaic revokes its current application session; it does not sign the user out of Google. Existing valid Mosaic sessions remain signed in across revisits. Confirm the account chooser on the actual installed iPhone PWA; an authorization URL check alone does not establish device behavior.

Use `requireUser(request.headers)` from `src/lib/auth/server.ts` for future account-owned handlers. Derive document ownership from the returned `user.id`, never a body/query parameter. `/api/account` demonstrates this boundary: authenticated requests receive only ID/name/email; guests receive `401`, untrusted configured hosts `403`, and unavailable configuration/database `503`, always without caching.

Guest learning state remains in the mounted feed's memory. No guest data is automatically imported into an account, and no account learning data is cached locally in this increment. Entering/leaving the separate sign-in route remounts the feed according to its existing behavior. Signing out revokes the current server session; it does not revoke other devices' sessions. Future durable session/progress tasks must namespace local data by guest/account identity, clear account-specific UI/cache on sign-out or account switch, preserve device-local presentation preferences, and implement any guest-to-account transfer only as an explicit user choice. There is no preference persistence to migrate yet.

## Validation

For independent physical PWA validation before MOS-23 provides the permanent account entry, open the fixed tunnel's `/sign-in` page in iPhone Safari and add it to the Home Screen as **Mosaic Dev**. With `MOSAIC_AUTH_ENV=development`, this page links a separate development manifest whose launch URL is `/sign-in`; the root feed manifest still launches `/`. The development manifest reuses the existing icons, safe-area setup, standalone display, and orientation fallback. Its route returns `404` outside the development auth environment. Remove the temporary Home Screen app when validation is complete. An existing production installation is a different origin and does not test the local auth code.

Start the installed Mosaic Dev app, perform Google sign-in, and check where the provider callback returns. Reopen from the Home Screen and verify that the installed app sees the authenticated session, then test sign-out and cancellation there. A successful Safari login alone does not establish standalone PWA authentication: the operating system may use different browser/app cookie stores. Record actual observed behavior before choosing any workaround.

Automated local checks:

```bash
nvm use
npm run test:auth
npm run validate:content
npm run lint
npm run typecheck
npm run build
```

Configuration tests cover trusted localhost/tunnel selection, unknown hosts, forwarded-header spoofing, unsafe callback origins, missing credentials, and production isolation. These tests do not substitute for a real provider/database round trip.

On October 15, 2026, 16 live development API/database checks passed using two isolated fixture users and signed fixture sessions: guest denial, valid sessions, server-derived ownership despite a different query user ID, identity isolation, forged signatures, unknown tokens, expiry, cross-origin sign-out rejection without revocation, external callback rejection, untrusted hosts, sign-out deletion/cookie expiry, revoked cookies, a cancellation callback with valid OAuth state, state replay rejection, and no session after cancellation. The fixture records were removed and their absence verified. The cancellation check used the application's real OAuth initialization and simulated the provider's `access_denied` callback; it did not complete Google's consent UI or prove account switching at Google. A browser check confirmed the cancellation message, retry button, and guest link. The owner confirmed account selection and switching between both test Google accounts in the installed development PWA on October 15, 2026. Actual provider consent cancellation and production browser/PWA validation remain separate requirements; record task evidence in Linear.

Before considering MOS-24 complete, validate with real development credentials:

- Guest feed works before and after authentication setup; `/api/account` returns `401` when signed out.
- Google success creates one user and provider account; signing in again keeps the same user ID.
- Localhost and the fixed tunnel can sign in with the same Google account and resolve the same development user; production remains separate.
- Canceling Google or rejecting consent returns a readable failure with retry and guest access. Disconnecting the database/network shows a recoverable error without exposing secrets.
- Refresh/revisit retains a valid session. An expired/revoked session returns to the signed-out state and `/api/account` returns `401`.
- Sign-out removes the current session; retry errors do not falsely claim success. Switching Google accounts exposes only the new identity.
- An untrusted host is rejected; cross-origin mutations and external callback redirects are rejected by the auth library.
- Review `/sign-in` with keyboard, at narrow phone sizes and desktop, and in landscape. Confirm the feed still handles touch/keyboard navigation.
- The owner tests actual iPhone browser and installed PWA login, callback, cancellation, revisit, and sign-out. OAuth should open in the system browser, not an embedded webview.

Keep MOS-24 In Progress until actual credentials, provider/database checks, and the owner's physical-device validation are complete. Successful typechecking/building or mocked UI states are not evidence that Google or Atlas is configured.

References: [Better Auth Next.js integration](https://better-auth.com/docs/integrations/next), [MongoDB adapter](https://better-auth.com/docs/adapters/mongo), [Google OAuth redirect validation](https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation), [ngrok free development domains](https://ngrok.com/docs/pricing-limits/free-plan-limits).
