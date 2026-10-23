# Project Mosaic

A mobile-first educational feed designed to turn passive scrolling into microlearning.

**Turn scrolling into learning.**

The completed MVP focuses on frontend interview preparation using short explanations and interactive learning cards.

## Stack

- Next.js 16.4.0 with App Router and React 19.3.0
- TypeScript 6.0.3 with strict checking
- SCSS Modules and global SCSS (Sass)
- Swiper for touch, mouse, and keyboard navigation
- react-markdown for local learning content
- ESLint with Next.js rules
- Built-in Next.js PWA metadata and web app manifest
- Node.js 24.21.0 LTS and npm

The installed versions and engine requirements are defined in `package.json`, `.nvmrc`, and `package-lock.json`. Runtime dependencies and most development tools use exact versions; `@types/node` uses a range resolved by the lockfile. Use `npm ci` to reproduce the dependency tree and check compatibility before upgrading.

## Local development

With nvm installed:

```bash
nvm install
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. The dev script listens on all interfaces for phone testing; raw LAN development access may require adding the current hostname/IP to `allowedDevOrigins` in `next.config.ts` and restarting. Use the fixed HTTPS tunnel for Google sign-in on a phone, as described in the authentication guide. Run `nvm use` in each new terminal before working on this project. Guest browsing needs no environment variables or external services. Optional Google sign-in uses Better Auth and MongoDB; see the [authentication setup guide](docs/authentication.md) for local, fixed-tunnel, and production configuration. Real credentials belong only in ignored local files or the deployment environment.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm run validate:content` | Validate card structure and mobile content budgets |
| `npm run test:auth` | Check authentication origin/configuration boundaries |
| `npm run test:ordering` | Check soft mixing, round spacing, continuous queue, and migration |
| `npm run test:session` | Check device-local session restoration, filtering, and study/review isolation |
| `npm run test:progress` | Check explicit confirmations, repeat eligibility, completion, and aggregates |
| `npm run test:sync` | Check account synchronization, offline retries, conflicts, and resets |
| `npm run typecheck` | Generate Next.js types and run TypeScript checks |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build after `npm run build` |

In the restricted agent environment, the configured Turbopack build can fail while its SCSS worker tries to bind a local port (`EPERM`). Record that limitation and validate with `npx next build --webpack`; do not change repository build configuration just for this environment. This fallback does not establish a successful deployment.

## Structure

- `src/app/`: root layout, feed entry page, global SCSS, and manifest.
- `src/components/learning-feed/`: virtualized vertical feed, horizontal card pages, and Markdown rendering.
- `src/content/`: typed local learning content.
- `src/lib/auth/`: server authentication, MongoDB connection, and ownership helpers.
- `src/app/(study)/`: shared persistent layout for `/`, `/account`, and `/review`; `(study)` is a route group and is not part of the URL.
- `src/components/study-shell/`: owner-scoped study/review sessions and shared progress/sync providers.
- `src/lib/study-session/`: device-local navigation persistence and subsection selection helpers.
- `src/lib/learning-progress/`: confirmations, aggregates, completion, synchronization, and account-owned persistence.
- `src/app/api/study-state/`: authenticated progress, subsection preferences, and scoped reset API.
- `src/components/account/`: sign-in/profile/sign-out controls, subsection selection, progress/reset controls, and review entry.
- `src/app/sign-in/`: independently testable legacy authentication page.
- `docs/content/`: shared content rules and source-specific package documentation.
- `docs/authentication.md`: environments, OAuth/MongoDB setup, session ownership, and auth validation.
- `docs/study-sessions.md`: device-local study/review navigation and recovery.
- `docs/study-ordering.md`: continuous rounds, soft new/partial mixing, spacing, limits, and tuning parameters.
- `docs/learning-progress.md`: confirmation rules, synchronization, review, aggregates, and resets.
- `public/illustrations/`: local content illustrations.
- `public/icons/`: placeholder app icons.
- `AGENTS.md`: development and communication rules.
- `ROADMAP.md`: completed MVP scope, post-MVP guidance, and tentative later stages.

## Current status

The project owner accepted the existing application as the completed MVP on October 11, 2026. Linear issue [MOS-1](https://linear.app/joisadler/issue/MOS-1) records that acceptance. Remaining backlog items are post-MVP improvements and do not prevent the MVP from being complete.

The MVP implements a full-screen virtualized educational feed that mixes multi-page InfoCards, accessible multiple-choice QuizCards, and swipe-driven question-and-answer FlipCards. Markdown content is stored locally, the inventory contains 220 cards from the Frontend Interview Preparation `fe-1.1` and `fe-1.2` packs. Normal study continuously generates unique-card rounds with a soft new/partial mix and subsection/type balance. Session order, position, and card interactions resume from device-local storage.

Both packs use the explicit learning-section registry. Blue/cyan scope and declaration-lifecycle compositions identify fe-1.1; plum/lilac value, equality, and conversion compositions identify fe-1.2. Shared section presets apply across all three card types, with optional typed motifs and safe fallbacks. See the [content authoring contract](docs/content/README.md#optional-visual-motifs).

The core controls support visible keyboard focus and accessible names. Multi-page InfoCards use Left/Right navigation, FlipCards expose their two sides as a named keyboard surface, and QuizCard arrows move focus without submitting an answer; click, Space or Enter makes the selection and reveals textual feedback. Reduced-motion preferences disable the relevant feed, page and flip transitions. Extreme zoom/reflow uses compact horizontal presentation without changing the authored InfoCard pages, QuizCard data or two-sided FlipCard structure.

The standalone iPhone PWA flow includes safe-area-aware metadata, protection against unintended navigation from the home gesture, and feed realignment after viewport or app lifecycle changes. The fixed viewport shell prevents the stale-height bottom gap observed after returning from landscape. The project owner confirmed the original PWA fixes on October 11, 2026, and confirmed the portrait-landscape-portrait recovery on October 12, 2026. The manifest requests `portrait-primary`, but the owner's iPhone still rotates when the app is installed from either Chrome or Safari; responsive landscape behavior remains required.

The manifest includes standalone display, a best-effort portrait orientation hint, app icons, and theme colors. Service workers, offline caching, and push notifications are not configured; install behavior depends on the browser, and offline app loading is not supported. An already loaded app can queue account progress changes during a temporary network failure. See [ROADMAP.md](ROADMAP.md) for future scope.

## Post-MVP work

Use the product, gather feedback, and select small improvements according to user value, priority, and dependencies. The [Project Mosaic Linear project](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6) is the source of truth for tasks and backlog status; this repository documentation describes product scope and working agreements rather than duplicating the task tracker.

The owner approved a bounded learning-state and account plan on October 12, 2026, recorded in [MOS-12](https://linear.app/joisadler/issue/MOS-12). It selects Google sign-in, a minimal MongoDB user/backend foundation through Next.js route handlers, a dedicated user/settings page, device-local session resume, explicit understanding progress, account synchronization, section controls, completed-card review, and progress-aware ordering with basic repeat spacing. Implement these as small tasks in the recorded sequence and observe their dependencies.

The Google/MongoDB foundation is implemented behind optional environment configuration: `/sign-in`, `/api/auth/*`, and the authenticated `/api/account` boundary. Development credentials are configured, and the owner confirmed Google sign-in, refresh persistence, sign-out, and repeat sign-in on desktop and iPhone Safari. On October 14, 2026, the owner also confirmed Google sign-in returning to the installed development PWA, session persistence after closing/reopening, and sign-out there. Production is deployed; the owner confirmed the desktop and installed iPhone/PWA authentication checks on October 15, 2026. Live development checks cover session expiry/revocation, signed cookies, ownership, origin checks, and OAuth cancellation callbacks. The owner confirmed account selection and switching between both test Google accounts in the installed development PWA on October 15, 2026. MOS-24 is complete and accepted; detailed validation evidence is recorded in Linear. A bottom-right account entry and `/account` page are implemented for MOS-23 and were accepted by the owner on iPhone/PWA on October 21, 2026. Client-side account visits preserve the mounted feed; device-local session resume is implemented for MOS-17, accepted by the owner after iPhone/PWA reopen validation on October 21, 2026. Explicit local understanding confirmations are implemented for MOS-14, accepted by the owner on October 22, 2026; MOS-22 account synchronization is implemented and accepted by the owner after phone/desktop synchronization checks on October 22, 2026. See [Learning progress](docs/learning-progress.md). The feed needs no account; order, position, page, quiz choice, and flip side are stored locally per guest/account. See [Study sessions](docs/study-sessions.md). Account synchronization shares confirmation records and selected section IDs across devices while active session order and position stay device-local. Guest progress remains separate; see the retry, conflict, and reset policy in [Learning progress](docs/learning-progress.md). My learning (`/learning`), reached from the compact profile (`/account`), contains hierarchical chapter/subsection selection, aggregate progress, confirmed scoped resets and the shuffle action; the owner accepted MOS-15 functionality and phone/desktop synchronization on October 22, 2026. The owner accepted the profile/My learning separation (MOS-33) on October 23, 2026, after confirming that the page flows work. Compact section controls and visual improvements remain under [MOS-32](https://linear.app/joisadler/issue/MOS-32).

Completed-card review is implemented and pushed for MOS-16: the account page opens a separate, read-only `/review` feed; normal study excludes cards at 100%. Both respect selected subsections and retain independent device-local navigation. The owner accepted the development iPhone/PWA review checklist on October 22, 2026.

Continuous progress-aware ordering (MOS-13) was accepted by the owner in the development iPhone/PWA workflow on October 22, 2026. The soft 2:1 mix never duplicates scarce partial cards within a round; the existing reward gate remains separate from display spacing. See [Study ordering](docs/study-ordering.md) for exact rules and tuning guidance.

Other backlog ideas, including sound/haptics and user-reporting flows, remain tentative until selected. Runtime AI, recommendation engines, advanced spaced-repetition infrastructure, analytics, social features, and additional domains are outside the approved plan. See [ROADMAP.md](ROADMAP.md) for scope boundaries; current task status remains in Linear.

## Dependency notes

`package-lock.json` is the reproducible dependency source. Run `npm audit` (or `npm audit --omit=dev` for production dependencies) when reviewing dependency security; earlier setup audit results are historical, not a current security assessment. Do not apply incompatible framework/lint downgrades solely to silence audit output.
