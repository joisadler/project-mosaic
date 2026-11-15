# fe-1.6 — Collections, Symbols & Iteration

Status: coverage and visual direction approved by the owner on 2026-11-15 after the three-card image preview. Implementation follows this scope. On 2026-11-15 the owner confirmed the iPhone check and approved commit/push; the browser and installed-PWA mode were not specified.

## Source and readiness

- Task: [MOS-42](https://linear.app/joisadler/issue/MOS-42/add-fe-16-collections-symbols-and-iteration).
- Read-only handbook checkout: `/Users/yossiadler/Projects/personal/frontend-interview-preparation`, clean `main` at `c60ffec` when inspected on 2026-11-15.
- [Chapter](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/06-collections-symbols-and-iteration.md): 22 teaching questions, inventory groups `JS-35–JS-38`.
- [Review and acceptance](https://github.com/joisadler/frontend-interview-preparation/blob/main/reviews/stage-4-section-reviews/01-06-collections-symbols-and-iteration.md): owner approved all source artifacts on 2026-11-04.
- Source section 1.6 also contains `JS-COLLECTIONS-Q01–Q24` and separate answers, `JS-COLLECTIONS-EX01–EX10` and separate solutions, a compact summary and an English A4 SVG/PDF infographic.
- Mosaic base: `3161f6c`, clean `main` before this proposal. Integrated inventory remains 608 cards across fe-1.1–fe-1.5.

## Proposed coverage

`H` denotes chapter teaching questions; `Q` and `EX` denote the source IDs above. Counts estimate useful standalone objectives; final counts follow coverage and rendered fit, without a quota.

| Area | Source | Info / Quiz / Flip | Objectives and mistakes |
| --- | --- | --- | --- |
| Map and object boundaries | H1–5; Q01–03/08–09/19; EX01–02/05 | 6 / 8 / 4 | Select a record or index; arbitrary keys, identity and SameValueZero; distinguish missing from stored undefined; set versus property assignment; size, insertion order, live traversal, snapshot boundaries and explicit JSON representation. Avoid fixed O(1) claims. |
| Set and collection operations | H6–7; Q04/10/20; EX01–02/05/10 | 4 / 6 / 3 | Membership and insertion order; deduplicate by identity or stable ID; define first/last winner; set operations and set-like inputs; intersection order; Map.groupBy versus Object.groupBy. |
| Weak collections and WeakRef | H8–11; Q11–12/21; EX01/03/06/10 | 5 / 7 / 4 | Match metadata, membership or optional reuse to the API; strong reachability, valid weak targets, non-enumerability; conditional value-to-key references versus external roots; deterministic miss tests and explicit cache bounds. Never predict collection timing. |
| Symbols and protocol keys | H12–13; Q05/13–14; EX01/03–04 | 4 / 6 / 3 | Symbol identity, registry and keyFor; exact well-known keys; reflection, enumerability and copying; symbol keys do not establish privacy. Mention toPrimitive/toStringTag only as protocol examples. |
| Iterable and iterator contracts | H14–16; Q06–07/14–16/22; EX01/04/07 | 5 / 7 / 4 | Separate source from cursor; value/done and valid undefined elements; independent traversal state; iterable versus array-like; for...of versus for...in; choose a repair to a small custom iterator. |
| Generators, closing and lazy helpers | H17–20; Q15–17/19/22–23; EX04/07–08 | 5 / 7 / 4 | Lazy start, suspension, one-shot cursors and restart; yield versus return, yield*, next(value) and bounded throw examples; break/return/finally, errors from next and manual ownership; limit before materialization and avoid unnecessary reads. |
| Async iteration and integrated decisions | H21–22 and compatibility notes; Q18/24; EX09–10 | 4 / 5 / 3 | asyncIterator, async generators, sequential consumption and awaited closing; for await...of versus Array.fromAsync; already-started promises; zero limit, deduplication across pages, no extra page request, errors and cleanup. Separate runtime-dependent rejected-promise behavior. |
| **Estimated total** | **4 inventory groups** | **33 / 46 / 25** | **104 cards; adjust for meaningful coverage rather than a target count.** |

Modern API coverage includes set operations, grouping, iterator helpers, Array.fromAsync and short compatibility-focused treatments of getOrInsert/getOrInsertComputed and Iterator.concat. Verify exact target runtimes before asserting availability; retain portable alternatives. Use primary specifications and official runtime documentation. The living draft may describe a later edition than the published source edition.

## Overlap and exclusions

- fe-1.2 owns general equality/coercion; revisit identity only to explain keys, membership and symbols.
- fe-1.4 owns property descriptors, prototypes and private fields; revisit reflection and ownership only at collection/protocol boundaries.
- fe-1.5 owns array transformations, copying and spread mechanics; revisit array-like inputs, Object.fromEntries and grouping only for new collection/iteration objectives.
- Keep full JSON serialization/revival in 1.7, general memory/GC engineering in 1.8, scheduling in 1.9 and Promise coordination in 1.10–1.11.
- Async iteration is a bounded protocol bridge. Exclude a streaming framework, network implementation, prefetch/cancellation architecture, a cache implementation, timing-based GC tests, benchmarks and general polyfills.
- Adapt implementation exercises into independent code-reading, repair-choice, comparison and recall cards. Require no mobile code typing.

## Proposed visual identity

Muted periwinkle on a dark ink base: accent `#aebeff`, base `#20263d`, floor `#101322`. This is cooler than fe-1.2 plum/lilac and distinct from cyan, amber, jade and coral. Keep existing feedback colors independent of section identity.

- Default `entries`: two columns of small paired nodes with short links, suggesting collection entries without a prototype hierarchy or function pipeline.
- Optional `tokens`: distinct outlined tokens with a small identifying notch, for symbol identity and exact protocol keys.
- Optional `cursor`: a sparse dotted path with one outlined position marker, for traversal, suspension and resumption. It represents a cursor, not an event-loop queue.

Keep artwork peripheral, faint, static, accessibility-hidden and pointer-inert. Preserve the existing typography, symmetric content padding, header, indicators and vertical right-hand icon rail. Extend the current presentation registry/SCSS/SVG system after approval; card data receives only typed optional motif metadata. No dependencies or architecture changes.

The accompanying conversation preview shows all three card types and motifs. It is an illustrative direction sketch with local page/answer/side interactions, not actual-component evidence or a mobile-fit claim. Its temporary file must be removed before the integration handoff/commit.

## Execution after approval

1. Validate an actual-component sample at 320×568 and 375×667: a dense multi-page InfoCard, a code quiz in all answer states and both FlipCard sides. Seek further agreement only if it requires a substantial departure from this direction.
2. Author stable fe-1.6 IDs and verified source links, reuse the semantic runner, document card-to-source coverage and review each distractor separately. Execute asynchronous examples through completion and isolate intentional errors.
3. Register fe-1.6 under chapter fe-1; update README availability/counts and package documentation. Preserve progress/session/selection semantics.
4. Reuse a parameterized browser runner and batch actual components into galleries. Audit every new Info page, all five Quiz states and both Flip sides at both portrait viewports. Run relevant existing-package samples, ordinary mixed-feed/selection/reload/navigation checks, landscape/reflow/zoom/accessibility checks and required repository commands.
5. Keep per-card content and relevant rendering fingerprints with raw evidence outside Git. After content corrections, rerun affected states and retain valid evidence for unchanged states. Shared rendering changes expand coverage according to impact.
6. Return bounded counts/failures/evidence paths. Save a compact temporary handoff at phase boundaries. Track task-owned caffeinate/server processes, preserve owner access and remove temporary fixtures/previews before final review.

Record initial state count, targeted rerun count, retained coverage and browser recovery attempts so the owner can assess this cycle's execution cost. Do not claim measured improvement before the audit completes.

Coverage and visual approval were received on 2026-11-15. The owner subsequently confirmed the iPhone check and approved commit/push on 2026-11-15. This does not establish production-deployment validation.
