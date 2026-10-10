# JavaScript section 1.1 card pack

64 cards: 24 InfoCards, 24 QuizCards and 16 FlipCards.

Source: [Frontend Interview Preparation, section 1.1](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/01-execution-model-declarations-and-scope.md), retrieved 2026-10-10.

Adapted to the current Project Mosaic `card-types.ts` schema. The source handbook is not modified. This pack is the only learning content currently included in the feed. Each InfoCard has one compact page; questions and answers are independent of feed order.

## Integration

The card arrays live in `src/content/`, beside `card-types.ts`:

- `js-1.1-info-cards.ts`
- `js-1.1-quiz-cards.ts`
- `js-1.1-flip-cards.ts`

`src/content/learning-cards.ts` imports the arrays from these paths:

```ts
import { js11InfoCards } from "./js-1.1-info-cards";
import { js11QuizCards } from "./js-1.1-quiz-cards";
import { js11FlipCards } from "./js-1.1-flip-cards";
```

The feed combines only these three arrays:

```ts
export const learningCards: LearningCardData[] = [
  ...js11InfoCards,
  ...js11QuizCards,
  ...js11FlipCards,
];
```

The current feed shuffles all 64 cards once per mount. No shuffle or component changes are required.

All card IDs start with `js11-`. Option IDs are unique within each quiz. The coverage table is documentation only; it is not imported into the app or used to order the feed.

## Verification completed

- Checked all 64 cards against the field structure and four-option quiz constraint.
- Checked unique card IDs, unique option IDs per quiz, and exactly one referenced correct option.
- Parsed generated TypeScript with Node.js `stripTypeScriptTypes` and compared evaluated arrays with the authored data.
- Executed 24 quiz code fragments in isolated Node.js VM contexts; compared exact console output and exception class.
- Executed all 12 InfoCard code blocks; compared output and exception class.
- The browser classic-script quiz was checked in the Node.js VM classic-script model. This is not a real Safari test.

Run the repository checks after content changes:

```sh
nvm use
npm run lint
npm run typecheck
npm run build
```

Check long questions and answers on a small iPhone viewport. Confirm that the existing overflow behavior remains comfortable, especially for code quizzes with an explicit environment note.

## Editorial scope

The pack covers declaration lifecycle, binding, var/let/const, scope, identifier resolution, execution contexts, hoisting, TDZ, function readiness, declaration conflicts, script/module differences, strict mode, delete and iteration bindings. It intentionally excludes full closure mechanics, event-loop scheduling, module graphs and advanced class behavior from later handbook sections.

Different formats may revisit the same concept for explanation, prediction and recall. This is intentional learning reinforcement. The pack is not a claim that every advanced edge case of the chapter has a dedicated card.

Use `COVERAGE.md` to locate the source subsection behind each card. It contains no runtime metadata and adds no fields to the app schema.
