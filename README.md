# Project Mosaic

A mobile-first educational feed designed to turn passive scrolling into microlearning.

**Turn scrolling into learning.**

The first MVP will focus on frontend interview preparation using short explanations and interactive learning cards.

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
- `ROADMAP.md`: MVP scope and tentative later stages.

## Current status

Iteration 1 implements a full-screen information-card feed with virtualized vertical navigation, horizontal pages, Markdown content, keyboard controls, and local demo content. QuizCard and FlipCard are not implemented yet.

The manifest includes standalone display, app icons, and theme colors. Service workers, offline caching, and push notifications are not configured; install behavior depends on the browser, and offline use is not supported. See [ROADMAP.md](ROADMAP.md) for future scope.

## Dependency notes

At initialization, `npm audit --omit=dev` reports no known production dependency vulnerabilities. The full audit reports five related high-severity entries originating from `braces` through the Next.js ESLint tooling. The latest `braces` release is affected; npm suggests an incompatible downgrade of the Next.js lint configuration rather than a compatible fix. Recheck when upstream releases are available. ESLint 9 also reports an end-of-support notice, but the current React lint plugin does not support ESLint 10.
