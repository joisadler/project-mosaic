# Project Mosaic

Mobile-first educational microlearning feed. The first MVP focuses on frontend interview preparation: JavaScript, TypeScript, React, HTML, CSS, and browser APIs.

## Language

- Always communicate with the user in Russian, including questions, updates, and reports.
- Use English for source code, identifiers, code comments, documentation, and Git commit messages.

## Stack and workflow

- Next.js App Router, React, strict TypeScript, and a `src/` directory.
- SCSS Modules for component styles; global SCSS for resets, variables, and shared styles.
- ESLint and built-in Next.js metadata/manifest support. Mobile-first design.
- Run `nvm use` before npm commands; `.nvmrc` pins the project Node.js version.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` after relevant changes.
- Keep dependencies compatible and reproducible through `package-lock.json`.

## Scope and principles

- Current status: initialization only, with a placeholder homepage and PWA metadata. Implement features only when requested.
- Future MVP: vertical touch-first feed, InfoCard, QuizCard, FlipCard, and local structured frontend content. Mix explanations and exercises; use taps/selections/gestures, no mobile code typing, and allow skipping cards.
- Implement only the authorized task in small, independently verifiable increments.
- Prefer simple readable code, focused reusable components, strong typing, and native browser/framework capabilities. Avoid `any` unless justified.
- Prioritize mobile UX, accessibility, and performance. Separate business logic from presentation where practical.
- No Tailwind, utility-first CSS frameworks, CSS-in-JS, or UI component libraries.
- Discuss major architecture changes or additional dependencies before introducing them. No speculative abstractions, plugin systems, premature optimization, or complex state management.
- No authentication, backend/database, runtime AI, recommendations, spaced repetition, tracking/analytics, social features, or multiple domains in the current scope.
- No service workers, offline caching libraries, or push infrastructure during initialization.
- Tentative roadmap stages must not drive current infrastructure; no cross-platform abstractions for possible React Native work.
- Preserve unrelated files and repository configuration. Commit or push only when explicitly requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
