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
- Real-device validation: the owner confirmed on October 11, 2026, that the original iPhone/PWA bugs were fixed, and on October 12, 2026, that the feed correctly recovers after a portrait-landscape-portrait cycle without leaving a bottom gap. The manifest's `portrait-primary` hint did not prevent rotation when installed from either Chrome or Safari on the owner's iPhone, so preserve the responsive landscape fallback. Do not attribute physical-device validation to an agent or infer a tested commit or deployment.
- Current stage: the owner-approved post-MVP learning plan. The integrated fe-1.1/fe-1.2 content and section visual identities are implemented and accepted. The Google sign-in and minimal MongoDB user/backend foundation through Next.js route handlers are complete and accepted. The user/settings page, device-local session resume, and explicit local understanding progress are complete and accepted. Remaining selected capabilities include account synchronization, section controls, completed-card review, and bounded progress-aware ordering. Read [MOS-12](https://linear.app/joisadler/issue/MOS-12) and the individual issues for current sequence, dependencies, acceptance criteria, and status; approval of the plan does not authorize implementing every task in one increment.
- Keep the [Project Mosaic Linear project](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6) as the source of truth for tasks and backlog status. Do not create a duplicate tracker in repository documentation.
- Preserve the accepted interaction model unless a change is explicitly authorized: mix explanations and exercises; use taps, selections, and gestures; require no mobile code typing; and allow users to skip cards.
- Implement only the authorized task in small, independently verifiable increments.
- Prefer simple readable code, focused reusable components, strong typing, and native browser/framework capabilities. Avoid `any` unless justified.
- Prioritize mobile UX, accessibility, and performance. Separate business logic from presentation where practical.
- Name handbook-derived content packages with the unambiguous `fe-<section>.<subsection>` namespace across directories, files, card IDs and documentation. Use identifier-safe names such as `feSection1_1InfoCards` only where source-code syntax cannot contain dots or hyphens.
- No Tailwind, utility-first CSS frameworks, CSS-in-JS, or UI component libraries.
- Discuss major architecture changes or additional dependencies before introducing them. No speculative abstractions, plugin systems, premature optimization, or complex state management.
- Google authentication, MongoDB, and focused Next.js route handlers are approved for the selected account and learning-data tasks. Keep guest browsing available. The optional Google/MongoDB foundation has development credentials and live database/provider checks. On October 14, 2026, the owner confirmed the basic auth cycle on desktop and iPhone Safari, plus Google callback return, session persistence after reopening, and sign-out in the installed development PWA. Production is deployed; the owner confirmed the desktop and installed iPhone/PWA authentication checks on October 15, 2026. Live development session/security integration checks passed on October 15, 2026. The owner confirmed account selection and switching between both test Google accounts in the installed development PWA on October 15, 2026. MOS-24 is complete and accepted; detailed validation evidence is recorded in Linear. The MOS-23 account icon entry and `/account` shell are implemented locally, accepted by the owner on iPhone/PWA on October 21, 2026. The shared study layout keeps the feed mounted for client-side account visits; keep it hidden/inert and disable its global input while the account page is visible. Device-local feed resume is implemented for MOS-17, accepted by the owner after iPhone/PWA reopen validation on October 21, 2026; account synchronization remains unimplemented. MOS-14 explicit local understanding confirmations are implemented, accepted by the owner on October 22, 2026. Keep progress isolated by guest/account and reuse the documented presentation/repeat rule in [Learning progress](docs/learning-progress.md); do not infer understanding from quiz correctness. Later synchronization shares account progress and selected sections across devices while active feed order, current card, and page stay device-local. Follow [the authentication guide](docs/authentication.md) for environment separation, the development PWA entry, and ownership boundaries.
- No runtime AI, recommendation engine, advanced spaced-repetition framework, tracking/analytics, social features, or multiple domains in the approved scope. A small repeat-eligibility/spacing rule is included only in the selected progress and ordering tasks. Sound/haptics and user-reporting ideas remain unselected backlog proposals.
- Do not add service workers, offline caching libraries, or push infrastructure unless explicitly approved as a post-MVP improvement.
- Tentative roadmap stages must not drive current infrastructure; no cross-platform abstractions for possible React Native work.
- Preserve unrelated files and repository configuration. Proactively propose a focused commit when a task is ready, before starting the next task. Obtain owner approval before committing or pushing; do not wait for the owner to initiate the commit discussion.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
