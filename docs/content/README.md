# Content authoring

Project Mosaic learning content is organized against the structure of the Frontend Interview Preparation handbook. Shared rules live in this document; package directories contain only source-specific context, verification notes and coverage.

## Package namespace

Use `fe-<section>.<subsection>` as the canonical package identifier. Preserve the dot so sections above 9 remain unambiguous: `fe-1.1`, `fe-1.12` and `fe-11.3` are distinct packages. Do not collapse section numbers into forms such as `fe11`.

Apply the identifier consistently:

- Documentation directory: `docs/content/fe-1.1/`
- Runtime files: `fe-1.1-info-cards.ts`, `fe-1.1-quiz-cards.ts` and `fe-1.1-flip-cards.ts`
- Card IDs: `fe-1.1-info-*`, `fe-1.1-quiz-*` and `fe-1.1-flip-*`
- TypeScript exports: use the identifier-safe form `feSection1_1InfoCards`, `feSection1_1QuizCards` and `feSection1_1FlipCards`

The `fe` prefix identifies the source handbook as a whole, not the technology discussed by an individual section. A JavaScript, React, CSS or browser APIs package therefore follows the same namespace.

## Optional source links

Every learning card may define `readMoreUrl?: string` in the shared `BaseCardData` type. Use it for a direct, verified source section that expands the card's primary topic.

- Store an absolute `http://` or `https://` URL. Prefer a stable source page with a verified section anchor when one exists.
- Do not add placeholder, relative, `javascript:`, `data:` or credential-bearing URLs.
- The UI validates the value again before rendering. Missing, malformed and non-HTTP(S) values produce no action.
- When a card covers several source sections, choose the section that best matches its main learning objective and record that choice in the package coverage document.

## Shared mobile content contract

The vertical feed is the only vertical gesture surface. Individual cards must not require nested vertical scrolling. Treat content that does not fit at a `320 × 568` CSS viewport as a content error:

- Split a long InfoCard across horizontal pages.
- Keep QuizCard explanations concise; move a detailed treatment into a standalone InfoCard.
- Shorten or split FlipCards instead of adding a scrollable side.
- Do not use line clamping or clipping to hide educational content.
- Keep primary prose, options and explanations at `14px` or larger, and code at `12px` or larger.
- Keep touch targets at least `44 × 44` CSS pixels.
- Preserve at least `32px` between the last visible QuizCard element and the bottom of the viewport.

`npm run validate:content` discovers every `fe-<section>.<subsection>-*-cards.ts` file and enforces the shared structural budgets: page, question, option, explanation and answer lengths; an aggregate QuizCard layout estimate; Markdown line counts; fenced-code line lengths; IDs; coverage synchronization; and the four-option quiz contract. These limits are an early warning, not a substitute for rendered checks.

After content changes, inspect every card state at `320 × 568` and `375 × 667`. The rendered check is the source of truth: `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth` must hold, primary text and target size floors must remain intact, and the last visible QuizCard element must retain the `32px` bottom safe zone. If a card fails, rewrite or split its content rather than shrinking text or introducing nested vertical scrolling.

Run the repository checks after content changes:

```sh
nvm use
npm run validate:content
npm run lint
npm run typecheck
npm run build
```
