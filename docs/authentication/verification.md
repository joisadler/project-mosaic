# Authentication verification

Read when validating authentication changes. Earlier acceptance is [historical evidence](../history/accepted-milestones.md), not a fresh test.

## Validation

For the current end-to-end flow, open the fixed tunnel root in iPhone Safari, install/open its PWA, and use the account icon to reach `/account`. Test sign-in, return to study, review navigation, and session resume there. Production uses a separate origin and installation.

For an isolated auth-only check, `/sign-in` still provides the original **Mosaic Dev** entry. With `MOSAIC_AUTH_ENV=development`, this page links a separate development manifest whose launch URL is `/sign-in`; the root feed manifest still launches `/`. The development manifest reuses the existing icons, safe-area setup, standalone display, and orientation fallback. Its route returns `404` outside the development auth environment. Remove the temporary Home Screen app when validation is complete. An existing production installation is a different origin and does not test the local auth code.

In either installed development entry, perform Google sign-in, and check where the provider callback returns. Reopen from the Home Screen and verify that the installed app sees the authenticated session, then test sign-out and cancellation there. A successful Safari login alone does not establish standalone PWA authentication: the operating system may use different browser/app cookie stores. Record actual observed behavior before choosing any workaround.

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

Use the following checklist when revalidating authentication changes with real credentials:

- Guest feed works before and after authentication setup; `/api/account` returns `401` when signed out.
- Google success creates one user and provider account; signing in again keeps the same user ID.
- Localhost and the fixed tunnel can sign in with the same Google account and resolve the same development user; production remains separate.
- Canceling Google or rejecting consent returns a readable failure with retry and guest access. Disconnecting the database/network shows a recoverable error without exposing secrets.
- Refresh/revisit retains a valid session. An expired/revoked session returns to the signed-out state and `/api/account` returns `401`.
- Sign-out removes the current session; retry errors do not falsely claim success. Switching Google accounts exposes only the new identity.
- An untrusted host is rejected; cross-origin mutations and external callback redirects are rejected by the auth library.
- Review `/account`, `/learning`, and `/sign-in` with keyboard, at narrow phone sizes and desktop, and in landscape. Confirm study and review still handle touch/keyboard navigation and inactive feeds do not capture input.
- The owner tests actual iPhone browser and installed PWA login, callback, cancellation, revisit, and sign-out. OAuth should open in the system browser, not an embedded webview.

MOS-24 is complete following the owner's production desktop/iPhone/PWA acceptance on October 15, 2026. Future authentication changes still require actual provider/database checks and physical-device validation where relevant; successful typechecking/building or mocked UI states alone do not establish that Google or Atlas is configured.

References: [Better Auth Next.js integration](https://better-auth.com/docs/integrations/next), [MongoDB adapter](https://better-auth.com/docs/adapters/mongo), [Google OAuth redirect validation](https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation), [ngrok free development domains](https://ngrok.com/docs/pricing-limits/free-plan-limits).
