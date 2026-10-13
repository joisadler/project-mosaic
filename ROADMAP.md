# Project Mosaic Roadmap

## Current status

MVP complete and accepted by the project owner on October 11, 2026. Linear issue `JOI-10` was closed with that acceptance recorded. Remaining backlog items are post-MVP improvements and do not block MVP completion.

The accepted implementation includes a virtualized vertical educational feed with multi-page InfoCards, accessible multiple-choice QuizCards, and swipe-driven question-and-answer FlipCards with Markdown on both sides. Content is organized by card type and shuffled once for each mounted feed, while horizontal card state and quiz selections persist while that feed remains mounted. The feed currently combines 220 cards from the Frontend Interview Preparation `fe-1.1` and `fe-1.2` packs.

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
- Treat backlog entries and the ideas below as candidates, not as completed work or approved commitments.

## Stage 2 — Learning Improvements (Optional)

- Additional interactive card formats.
- Spaced repetition.
- Learning progress tracking.
- Improved content selection.

Tentative and subject to feedback, prioritization, dependencies, and explicit approval. These possibilities must not introduce unnecessary dependencies or architecture into the current implementation.

## Stage 3 — Potential Product Expansion

- Additional educational domains.
- User-selected interests.
- Personalized recommendation algorithms.
- Accounts and synchronization if needed.
- Possible native mobile applications.

Tentative possibilities, not committed requirements. Evaluate only when product feedback and priorities justify the work. Do not create backend, cross-platform abstractions, or other speculative infrastructure for this stage.
