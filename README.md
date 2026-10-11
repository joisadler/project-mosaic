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

TypeScript 6.0.3 and ESLint 9.39.5 are the latest releases compatible with the current Next.js lint plugins: the TypeScript parser does not yet support TypeScript 7, and the React plugin does not yet support ESLint 10. Versions are pinned in `package.json` and resolved in `package-lock.json`.

## Local development

With nvm installed:

```bash
nvm install
nvm use
npm ci
npm run dev
```

Open http://localhost:3000. Run `nvm use` in each new terminal before working on this project. No environment variables or external services are required.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm run typecheck` | Generate Next.js types and run TypeScript checks |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build after `npm run build` |

## Structure

- `src/app/`: root layout, feed entry page, global SCSS, and manifest.
- `src/components/learning-feed/`: virtualized vertical feed, horizontal card pages, and Markdown rendering.
- `src/content/`: typed local learning content.
- `public/illustrations/`: local content illustrations.
- `public/icons/`: placeholder app icons.
- `AGENTS.md`: development and communication rules.
- `ROADMAP.md`: completed MVP scope, post-MVP guidance, and tentative later stages.

## Current status

The project owner accepted the existing application as the completed MVP on October 11, 2026. Linear issue `JOI-10` was closed with that acceptance recorded. Remaining backlog items are post-MVP improvements and do not prevent the MVP from being complete.

The MVP implements a full-screen virtualized educational feed that mixes multi-page InfoCards, accessible multiple-choice QuizCards, and swipe-driven question-and-answer FlipCards. Markdown content is stored locally, the 64-card JavaScript section 1.1 pack is shuffled once per mounted feed, and card interaction state persists during the session.

The standalone iPhone PWA flow includes safe-area-aware top metadata, protection against unintended navigation from the home gesture, and feed realignment after viewport or app lifecycle changes. The project owner confirmed on October 11, 2026, that the previously discussed iPhone/PWA bugs were fixed and verified on his device. Reopen the relevant Linear issue if a regression recurs.

The manifest includes standalone display, app icons, and theme colors. Service workers, offline caching, and push notifications are not configured; install behavior depends on the browser, and offline use is not supported. See [ROADMAP.md](ROADMAP.md) for future scope.

## Post-MVP work

Use the product, gather feedback, and select small improvements according to user value, priority, and dependencies. The [Project Mosaic Linear project](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6) is the source of truth for tasks and backlog status; this repository documentation describes product scope and working agreements rather than duplicating the task tracker.

Future ideas remain tentative until they are prioritized and explicitly approved. A backlog item is not evidence that a feature is committed or that the completed MVP is incomplete.

## Dependency notes

At initialization, `npm audit --omit=dev` reports no known production dependency vulnerabilities. The full audit reports five related high-severity entries originating from `braces` through the Next.js ESLint tooling. The latest `braces` release is affected; npm suggests an incompatible downgrade of the Next.js lint configuration rather than a compatible fix. Recheck when upstream releases are available. ESLint 9 also reports an end-of-support notice, but the current React lint plugin does not support ESLint 10.
