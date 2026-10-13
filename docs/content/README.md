# Content authoring

Project Mosaic learning content is organized against the structure of the Frontend Interview Preparation handbook. Shared rules live in this document; package directories contain only source-specific context, verification notes and coverage.

## Package namespace

Use `fe-<section>.<subsection>` as the canonical package identifier. Preserve the dot so sections above 9 remain unambiguous: `fe-1.1`, `fe-1.12` and `fe-11.3` are distinct packages. Do not collapse section numbers into forms such as `fe11`.

Apply the identifier consistently:

- Documentation directory: `docs/content/fe-1.1/`
- Runtime files: `fe-1.1-info-cards.ts`, `fe-1.1-quiz-cards.ts` and `fe-1.1-flip-cards.ts`
- Card IDs: `fe-1.1-info-*`, `fe-1.1-quiz-*` and `fe-1.1-flip-*`
- TypeScript exports: use the identifier-safe form `feSection1_1InfoCards`, `feSection1_1QuizCards` and `feSection1_1FlipCards`

## Learning section registry

`src/content/learning-sections.ts` is the runtime source of truth for selectable learning units. Each handbook section or subsection has one canonical ID, section number, human-readable Russian title and the three card arrays that belong to it. The flat feed is derived from this registry, so future filtering, visual identity, ordering and progress aggregation can use the same `LearningSectionId` values.

Register a package only after all three card files exist. `npm run validate:content` rejects missing packages, duplicate registrations, cross-section card arrays and registered sections without content. Keep section selection at the handbook section/subsection level; do not replace these identities with a broad JavaScript topic taxonomy.

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
- In the standard mobile layout, keep primary prose, options and explanations at `14px` or larger, and code at `12px` or larger. The reviewed compact-height and zoom/reflow fallbacks may use their existing smaller CSS tokens because the enlarged browser scale supplies the visual magnification; do not reduce those tokens further to make new content fit.
- Keep touch targets at least `44 × 44` CSS pixels.
- Preserve at least `32px` between the last visible QuizCard element and the bottom of the viewport.

`npm run validate:content` discovers every `fe-<section>.<subsection>-*-cards.ts` file and enforces the shared structural budgets: page, question, option, explanation and answer lengths; an aggregate QuizCard layout estimate; Markdown line counts; fenced-code line lengths; IDs; section registry membership; coverage synchronization; and the four-option quiz contract. These limits are an early warning, not a substitute for rendered checks.

After content changes, inspect every card state at `320 × 568` and `375 × 667`. The rendered check is the source of truth: `scrollHeight <= clientHeight` and `scrollWidth <= clientWidth` must hold, the applicable standard or reviewed compact typography floors must remain intact, and the last visible QuizCard element must retain the `32px` bottom safe zone. If a card fails, rewrite or split its content rather than shrinking text or introducing nested vertical scrolling.

## Text enlargement and reflow

Also inspect the feed at browser zoom up to `400%`, including a reflow viewport equivalent to `320` CSS pixels wide. This is a rendered accessibility check, not a runtime content transformation:

- InfoCard pages remain the explicit top-level entries in `pages`. Never create viewport-dependent subpages or split Markdown at runtime.
- QuizCard may present its existing question, options and selected-answer explanation as separate horizontal panels in an extreme compact layout. This changes presentation only; the selected answer remains owned by the feed.
- FlipCard always remains exactly two sides. Do not add nested answer pages or vertical scrolling.
- If an InfoCard page or FlipCard side still does not fit after the compact layout is applied, split or shorten the source content for every viewport and review that content change explicitly.
- `validate:content` can enforce approximate authoring budgets, but it cannot determine rendered fit. Browser checks remain the source of truth.

The web app manifest requests `portrait-primary` for installed experiences. Treat this as a best-effort platform hint, not a guaranteed browser lock and not a substitute for landscape or zoom fallbacks. The project owner's iPhone continued to rotate after installation from both Chrome and Safari, while the responsive layout and fixed viewport shell recovered correctly after returning to portrait.

Run the repository checks after content changes:

```sh
nvm use
npm run validate:content
npm run lint
npm run typecheck
npm run build
```
