# Project Mosaic Roadmap

## Current status

Iteration 1 complete: a virtualized vertical feed, multi-page InfoCards, Markdown rendering, local frontend content, responsive mobile layout, keyboard controls, and PWA metadata/manifest. QuizCard and FlipCard remain future MVP work.

## Stage 1 — MVP

- Full-screen vertical scrolling feed with smooth touch-first navigation.
- InfoCard: short explanations, definitions, facts, and code examples.
- QuizCard: multiple-choice questions, immediate feedback, and answer explanations.
- FlipCard: a question and a tap-to-reveal answer.
- Frontend interview content stored locally in structured TypeScript or JSON files.
- Mixed educational and interactive cards; users can skip any card.
- Mobile UX and basic accessibility, with taps/selections/gestures rather than typing code.
- Basic PWA experience, building on the initial manifest and metadata. Any offline support is a separate future task.

Implement incrementally after scope approval. Existing study materials may later become a content source.

## Stage 2 — Learning Improvements (Optional)

- Additional interactive card formats.
- Spaced repetition.
- Learning progress tracking.
- Improved content selection.

Tentative and subject to product validation and explicit approval. These possibilities must not introduce unnecessary dependencies or architecture into the current implementation.

## Stage 3 — Potential Product Expansion

- Additional educational domains.
- User-selected interests.
- Personalized recommendation algorithms.
- Accounts and synchronization if needed.
- Possible native mobile applications.

Tentative possibilities, not committed requirements. Evaluate only when the MVP demonstrates value. Do not create backend, cross-platform abstractions, or other speculative infrastructure for this stage.
