# Project Mosaic

Mobile-first educational microlearning feed. The completed MVP focuses on frontend interview preparation: JavaScript, TypeScript, React, HTML, CSS, and browser APIs.

## Language

- Always communicate with the user in Russian, including questions, updates, and reports.
- Use English for source code, identifiers, code comments, documentation, and Git commit messages.
- Write learning content in natural Russian. Keep technical terminology in English at its first mention, and keep code, identifiers, APIs, and program output in English.

## Stack and workflow

- Next.js App Router, React, strict TypeScript, and a `src/` directory.
- SCSS Modules for component styles; global SCSS for resets, variables, and shared styles.
- ESLint and built-in Next.js metadata/manifest support. Mobile-first design.
- Run `nvm use` before npm commands; `.nvmrc` pins the project Node.js version.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` after relevant changes.
- Keep dependencies compatible and reproducible through `package-lock.json`.

## Scope and principles

- Current status: the project owner accepted the existing application as the completed MVP on October 11, 2026. It includes a virtualized vertical feed with InfoCards, accessible multiple-choice QuizCards, swipe-driven question-and-answer FlipCards, Markdown rendering, local structured frontend content, and a stable randomized order for each mounted feed.
- Real-device validation: the owner confirmed on October 11, 2026, that the previously discussed iPhone/PWA bugs were fixed and verified on his device. Do not attribute that validation to an agent or infer a tested commit or deployment.
- Current stage: post-MVP improvement. Use the product, gather feedback, and select small changes by user value, priority, and dependencies.
- Keep the [Project Mosaic Linear project](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6) as the source of truth for tasks and backlog status. Do not create a duplicate tracker in repository documentation.
- Preserve the accepted interaction model unless a change is explicitly authorized: mix explanations and exercises; use taps, selections, and gestures; require no mobile code typing; and allow users to skip cards.
- Implement only the authorized task in small, independently verifiable increments.
- Prefer simple readable code, focused reusable components, strong typing, and native browser/framework capabilities. Avoid `any` unless justified.
- Prioritize mobile UX, accessibility, and performance. Separate business logic from presentation where practical.
- Name handbook-derived content packages with the unambiguous `fe-<section>.<subsection>` namespace across directories, files, card IDs and documentation. Use identifier-safe names such as `feSection1_1InfoCards` only where source-code syntax cannot contain dots or hyphens.
- No Tailwind, utility-first CSS frameworks, CSS-in-JS, or UI component libraries.
- Discuss major architecture changes or additional dependencies before introducing them. No speculative abstractions, plugin systems, premature optimization, or complex state management.
- No authentication, backend/database, runtime AI, recommendations, spaced repetition, tracking/analytics, social features, or multiple domains in the current scope.
- Do not add service workers, offline caching libraries, or push infrastructure unless explicitly approved as a post-MVP improvement.
- Tentative roadmap stages must not drive current infrastructure; no cross-platform abstractions for possible React Native work.
- Preserve unrelated files and repository configuration. Commit or push only when explicitly requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
