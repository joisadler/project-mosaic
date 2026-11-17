# Authentication setup

Read when provisioning or changing environments, Google/Atlas configuration or the development tunnel. Values describe the documented setup; verify live configuration before operating it. Never print credentials.

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

The current Hobby setup uses direct Atlas connections with dynamic Vercel egress. The production project's `0.0.0.0/0` IP access-list entry permits connection attempts from any IPv4 source; it does not restrict access to Vercel. Database authentication, strong separate credentials, least-privilege roles, and TLS remain required. On October 21, 2026, the owner approved unrestricted IPv4 development access (`0.0.0.0/0`) to avoid repeated interruptions from changing home/work egress addresses. This is a development policy decision, not a claim that the range is private or restricted to the application. Keep separate strong credentials, restricted database roles, and TLS; narrow the allowlist again when stable egress is available. If fixed-egress infrastructure is introduced later, replace the broad production entry with its actual static addresses.

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

Do not set `AUTH_DEV_ORIGIN` in production. Do not copy production secrets into Preview deployments or the development `.env.local`; the ignored, temporary production provisioning file described above is the only documented local preparation exception. Preview authentication remains disabled until a separate explicit environment is configured. Changes become effective in a subsequent deployment; this setup does not itself deploy anything.

When a permanent domain is ready, add its Google callback first, connect the domain, update `BETTER_AUTH_URL`, and deploy through the owner's normal workflow. Keep the same production database and secret to preserve identities. Users must sign in again on the new hostname because cookies are host-only. Remove the old callback when the old domain is retired. Never rotate a secret just to rename a domain.
