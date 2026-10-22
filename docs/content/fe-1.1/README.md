# Frontend Interview Preparation pack fe-1.1

100 cards: 40 InfoCards, 36 QuizCards and 24 FlipCards.

Source: [Frontend Interview Preparation, section 1.1: Execution Model, Declarations & Scope](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/01-execution-model-declarations-and-scope.md), retrieved 2026-10-10.

Adapted to the current Project Mosaic `card-types.ts` schema. The source handbook is not modified. This pack is included in the feed alongside later handbook sections. InfoCards may use multiple compact horizontal pages; questions and answers are independent of feed order.

Every card includes a `readMoreUrl` for the handbook question that best matches its primary topic. The shared, verified GitHub anchors live in `src/content/fe-1.1-source-urls.ts`; card objects reference those URLs rather than duplicating long source strings. The anchors were checked against GitHub's rendered heading permalinks on 2026-10-11. `COVERAGE.md` records the card-to-question mapping and the exact source-link index.

## Integration

The card arrays live in `src/content/`, beside `card-types.ts`:

- `fe-1.1-info-cards.ts`
- `fe-1.1-quiz-cards.ts`
- `fe-1.1-flip-cards.ts`
- `fe-1.1-source-urls.ts`

`src/content/learning-sections.ts` registers the arrays as the `fe-1.1` learning subsection of chapter `fe-1`:

```ts
{
  id: "fe-1.1",
  chapterId: "fe-1",
  number: "1.1",
  title: "Модель выполнения, объявления и области видимости",
  cards: [
    ...feSection1_1InfoCards,
    ...feSection1_1QuizCards,
    ...feSection1_1FlipCards,
  ],
}
```

`src/content/learning-cards.ts` derives the flat collection from that shared registry. Each new device-local session shuffles the complete registered inventory once and then restores its order and interactions across reloads. Selected subsections and completion project the study/review views without creating a new session. No package-specific shuffle or component changes are required. See [Study sessions](../../study-sessions.md).

All card IDs start with `fe-1.1-`. Option IDs are unique within each quiz. The coverage table is documentation only; it is not imported into the app or used to order the feed.

The package follows the shared namespace, content budgets and verification workflow in [`docs/content/README.md`](../README.md).

## Verification completed

The results below record the package integration audit. They do not establish that every state has been rechecked after later content or shared-layout changes; follow the shared rendered-validation contract when making such changes.

- Checked all 100 cards against the field structure and four-option quiz constraint.
- Checked unique card IDs, unique option IDs per quiz, and exactly one referenced correct option.
- Parsed generated TypeScript with Node.js `stripTypeScriptTypes` and compared evaluated arrays with the authored data.
- Executed 24 quiz code fragments in isolated Node.js VM contexts; compared exact console output and exception class.
- Executed all 12 InfoCard code blocks; compared output and exception class.
- The browser classic-script quiz was checked in the Node.js VM classic-script model. This is not a real Safari test.

## Editorial scope

The pack covers declaration lifecycle, binding, var/let/const, scope, identifier resolution, execution contexts, hoisting, TDZ, function readiness, declaration conflicts, script/module differences, strict mode, delete and iteration bindings. It intentionally excludes full closure mechanics, event-loop scheduling, module graphs and advanced class behavior from later handbook sections.

Different formats may revisit the same concept for explanation, prediction and recall. This is intentional learning reinforcement. The pack is not a claim that every advanced edge case of the chapter has a dedicated card.

Use `COVERAGE.md` to locate the source subsection behind each card. It documents editorial coverage; runtime section membership comes from `learning-sections.ts`.

## Visual identity

Blue/cyan with cropped braces and nested contours (`scope`) by default. Cards centered on declaration preparation, initialization, TDZ or execution phases explicitly select `lifecycle`. The connected stages do not represent event-loop scheduling, which remains outside this package. See the shared [optional motif contract](../README.md#optional-visual-motifs) for supported identifiers and fallback behavior. No learning text, IDs or source links are changed by these assignments.
