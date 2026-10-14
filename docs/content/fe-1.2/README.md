# Frontend Interview Preparation pack fe-1.2

120 cards: 39 InfoCards, 51 QuizCards and 30 FlipCards.

Source: [Frontend Interview Preparation, section 1.2: Values, Types, Equality & Coercion](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/02-values-types-equality-and-coercion.md), retrieved 2026-10-13.

Adapted to the current Project Mosaic `card-types.ts` schema. The source handbook is not modified. InfoCards may use multiple compact horizontal pages; questions and answers are independent of feed order.

Every card includes a direct `readMoreUrl` for the handbook question that best matches its primary topic. `COVERAGE.md` records the card-to-question mapping.

## Integration

The card arrays live in `src/content/`, beside `card-types.ts`:

- `fe-1.2-info-cards.ts`
- `fe-1.2-quiz-cards.ts`
- `fe-1.2-flip-cards.ts`

`src/content/learning-sections.ts` registers all three arrays under `fe-1.2`, section `1.2`, with the title “Значения, типы, равенство и приведение типов”. `src/content/learning-cards.ts` derives the flat collection from that shared registry. The feed shuffles the complete 220-card collection once per mount; no component or package-specific shuffle changes are required.

All card IDs start with `fe-1.2-`. Option IDs are unique within each quiz. The coverage table is documentation only; it is not imported into the app or used to order the feed.

The package follows the shared namespace, content budgets and verification workflow in [`docs/content/README.md`](../README.md).

## Verification completed

- `npm run validate:content` checked the integrated 220-card collection against the structural budgets, ID rules, four-option quiz contract and coverage synchronization.
- All 120 cards in this package and their 398 rendered states passed the browser layout audit at `320 × 568` and `375 × 667`.
- The rendered audit covered every InfoCard page, both FlipCard sides, and every unselected and selected QuizCard state.
- No vertical or horizontal content overflow was found. QuizCard options retained at least `44px` height and every selected-answer state retained the required `32px` bottom safe zone.

## Editorial scope

The pack covers JavaScript values and runtime types, primitive and object semantics, identity and mutation, numeric edge cases, truthiness, logical and optional operators, equality semantics, explicit and implicit coercion, relational comparison and object-to-primitive conversion.

Different formats may revisit the same concept for explanation, prediction and recall. This is intentional learning reinforcement. Use `COVERAGE.md` to locate the source subsection behind each card.

## Visual identity

Plum/lilac with distinct value shapes (`values`) by default. Cards centered on equality or identity comparisons explicitly select `equality`; conversion, coercion and operator-conversion cards select `conversion`. General type, mutation, numeric representation and optional-access cards retain the default. See the shared [optional motif contract](../README.md#optional-visual-motifs) for supported identifiers and fallback behavior. No learning text, IDs or source links are changed by these assignments.
