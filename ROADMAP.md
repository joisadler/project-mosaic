# Project Mosaic Roadmap

## Current status

MVP complete and accepted by the project owner on October 11, 2026. Linear issue [MOS-1](https://linear.app/joisadler/issue/MOS-1) records that acceptance. Remaining backlog items are post-MVP improvements and do not block MVP completion.

The accepted implementation includes a virtualized vertical educational feed with multi-page InfoCards, accessible multiple-choice QuizCards, and swipe-driven question-and-answer FlipCards with Markdown on both sides. Content is organized by card type and presented in continuous progress-aware study rounds, with device-local order, position, horizontal card state, and quiz selections restored across reloads. The feed currently combines 220 cards from the Frontend Interview Preparation `fe-1.1` and `fe-1.2` packs.

The fe-1.2 pack and explicit learning-section registry are integrated. Both sections have accepted palettes and reusable static graphic motifs across InfoCard, QuizCard, and FlipCard. Optional Google sign-in, sessions/sign-out, and MongoDB ownership helpers have been implemented. Development infrastructure has been checked; the owner confirmed the basic desktop/iPhone Safari auth cycle and installed development PWA callback return, session persistence, and sign-out. Production is deployed; the owner confirmed the desktop and installed iPhone/PWA authentication checks on October 15, 2026. Development session/security integration checks passed. The owner confirmed account selection and switching between both test Google accounts in the installed development PWA on October 15, 2026. MOS-24 is complete and accepted; detailed validation evidence is recorded in Linear. See the [authentication guide](docs/authentication.md). The MOS-23 account entry/page shell is implemented and was accepted by the owner on iPhone/PWA on October 21, 2026. It preserves the mounted feed across client-side account visits. Device-local resume is implemented for MOS-17, accepted by the owner after iPhone/PWA reopen validation on October 21, 2026. Explicit local understanding confirmations are implemented for MOS-14, accepted by the owner on October 22, 2026. Account synchronization, hierarchical subsection selection, aggregate progress, and scoped resets are implemented and owner-accepted after phone/desktop checks on October 22, 2026. Completed-card review and simultaneous normal-study exclusion (MOS-16) were accepted by the owner in the development iPhone/PWA workflow on October 22, 2026. Continuous progress-aware ordering (MOS-13) was accepted by the owner in the development iPhone/PWA workflow on October 22, 2026; see [Study ordering](docs/study-ordering.md). See [Learning progress](docs/learning-progress.md) and [Study sessions](docs/study-sessions.md) for the current behavior.

The project owner confirmed on October 11, 2026, that the original iPhone/PWA fixes worked on his device, including top safe-area metadata and home-gesture navigation protection. On October 12, 2026, he also confirmed that the feed correctly rebuilds its layout after a portrait-landscape-portrait cycle without leaving a bottom gap. The manifest's portrait orientation is only a best-effort hint and did not prevent rotation when installed from either Chrome or Safari, so the responsive landscape fallback remains part of the supported layout.

## Stage 1 — MVP (Complete)

- Full-screen vertical scrolling feed with smooth touch-first navigation.
- InfoCard: short explanations, definitions, facts, and code examples.
- QuizCard: multiple-choice questions, immediate feedback, and answer explanations.
- FlipCard: a question and answer revealed with a horizontal swipe.
- Frontend interview content stored locally in structured TypeScript or JSON files.
- Mixed educational and interactive cards; users can skip any card.
- Mobile UX and basic accessibility, with taps/selections/gestures rather than typing code.
- Basic PWA experience through the manifest and metadata. Offline support is not part of the accepted MVP.

This stage describes the accepted product baseline, not a list of open tasks. Existing study materials may still become a source for future content.

## Post-MVP operating guidance

- Use the current product and gather feedback before expanding scope.
- Select small improvements by user value, priority, and dependencies.
- Keep the [Project Mosaic Linear project](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6) as the source of truth for tasks and backlog status; do not reproduce an issue tracker here.
- Follow the owner-approved plan in [MOS-12](https://linear.app/joisadler/issue/MOS-12) for selected work. Other backlog entries remain candidates until explicitly selected. Approval of a capability does not establish implementation or validation.

## Stage 2 — Approved Learning and Account Improvements

- Google sign-in, authenticated sessions/sign-out, and a minimal MongoDB user/backend foundation through Next.js route handlers.
- A dedicated user/settings page with a bottom-right entry; guest browsing remains available.
- Durable device-local session order, current card, and informational page, with safe resume after reload or PWA reopen.
- Consistent explicit understanding confirmation and cancellation across all three card types. Initial progress target: ten eligible confirmations at ten percentage points each; this is a product indicator, not a validated mastery score.
- Account synchronization for card progress and selected sections, with ownership checks and guest/account isolation. Active feed position and order remain device-local.
- Section selection, aggregate progress, and confirmed scoped resets.
- Completed-card review and normal-study exclusion delivered together, so completed cards remain accessible.
- Bounded progress-aware ordering with section/type balance and basic separated repeat opportunities; no advanced scheduling framework.

This scope was approved on October 12, 2026. The implementation and acceptance boundaries are summarized above; the list defines approved capabilities, not an unchecked implementation backlog. Guest progress remains separate with no transfer action; synchronization/conflict/reset behavior and repeat eligibility are documented in [Learning progress](docs/learning-progress.md). Continuous ordering is implemented with a bounded queue, unique-card rounds, soft 2:1 mixing, and shared repeat eligibility; the owner accepted development iPhone/PWA behavior on October 22, 2026. Use MOS-12 and its linked issues for authoritative work order, status, dependencies, and validation gates. A pushed commit alone does not establish deployment success or physical-device acceptance.

The owner accepted Profile/My learning separation (MOS-33) on October 23, 2026, after confirming that the page flows work. Compact chapter/subsection controls and a more engaging visual direction remain follow-up work under [MOS-32](https://linear.app/joisadler/issue/MOS-32). This includes expressive, lightweight illustrated empty states. Review a coherent design direction with the owner before implementation. Feed actions remain vertically aligned on the right with icon-only styling; card content uses symmetric side padding. Do not change control placement without discussing it with the owner.

## Unselected Backlog and Potential Expansion

- Optional sound/haptics and broader interaction effects.
- Card-problem and application-bug reporting flows.
- Additional interactive card formats.
- Additional educational domains, broader user-selected interests, or native mobile applications.

These possibilities remain subject to feedback, prioritization, and explicit approval. Runtime AI, recommendation engines, advanced spaced-repetition infrastructure, tracking/analytics, and social features remain outside the approved scope. Service workers, offline caching, and push infrastructure require separate approval. Do not introduce cross-platform abstractions or infrastructure for unselected ideas.
