# Frontend Interview Preparation pack fe-1.6

Subsection **1.6. Collections, Symbols & Iteration** adapts the approved handbook into independent Russian learning cards. The owner approved [coverage and visual direction](PLAN.md) on 2026-11-15. [MOS-42](https://linear.app/joisadler/issue/MOS-42) tracks integration and review. On 2026-11-15 the owner confirmed the iPhone check and approved publication with “На айфоне проверил, все нормально, можешь пушить.” The browser, installed-PWA mode and production deployment were not specified.

**104 cards: 33 InfoCards (89 authored pages), 46 QuizCards and 25 FlipCards.** Each phone viewport has 369 presentation states: 89 pages, 230 unanswered/selected quiz states and 50 flip sides. Registration under chapter `fe-1` brings the application inventory to **712 cards across six subsections**.

## Sources and boundaries

The source checkout `/Users/yossiadler/Projects/personal/frontend-interview-preparation` was clean, read-only `main` at `c60ffec` when inspected. Its section review records owner approval on 2026-11-04. Source approval is separate from Mosaic acceptance.

- [Chapter: 22 teaching questions](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/06-collections-symbols-and-iteration.md), inventory `JS-35–JS-38`.
- Question Bank and separate answers: `JS-COLLECTIONS-Q01–Q24`.
- Practice prompts and separate solutions: `JS-COLLECTIONS-EX01–EX10`.
- Section summary, English SVG/PDF infographic and [source review](https://github.com/joisadler/frontend-interview-preparation/blob/main/reviews/stage-4-section-reviews/01-06-collections-symbols-and-iteration.md).

[COVERAGE.md](COVERAGE.md) maps all 104 actual IDs to related chapter, question-bank and practice topics. These are mobile adaptations rather than literal reproductions of long exercises. All 23 source URL fragments (22 questions and compatibility recommendations) matched the current rendered GitHub heading anchors on 2026-11-15.

Coverage includes Map/record selection, key equality and identity, presence, insertion order, live iteration and bounded JSON representation; Set membership, deduplication policy, set operations and grouping; weak ownership, valid targets, conditional value references and deterministic WeakRef misses; Symbol identity, registry, reflection and exact protocol keys; iterable/iterator contracts, independent cursors and array-like inputs; generators, closing, lazy helpers and ownership limits; async iteration, awaited cleanup, materialization and bounded paged deduplication.

General equality, the object model and array transformations remain with earlier subsections. Full serialization, general memory/GC engineering, scheduling and Promise coordination belong to later sections. No network client, cache framework, polyfill library or mobile code typing is introduced.

## Presentation

The approved periwinkle/ink palette uses accent `#aebeff`, base `#20263d` and floor `#101322`. Default `entries` pairs collection nodes; optional `tokens` identifies symbols; optional `cursor` represents traversal/suspension. These extend the existing typed motif registry, static SVG component and SCSS Module. No dependencies are added.

Decoration is accessibility-hidden, pointer-inert and stable across pages, choices and sides. Feedback retains the shared success/error colors and textual labels. Symmetric content padding, typography, header/indicators and the vertical right-side icon rail are preserved.

## Semantic verification

```sh
source "$HOME/.nvm/nvm.sh"
nvm use
node scripts/check-fe-1.6-semantics.mjs
# Equivalent shared entry point:
node scripts/check-content-semantics.mjs fe-1.6
```

**63 Node executions pass on pinned Node.js v24.21.0:** 53 authored executable fences and 10 supplementary scenarios. Expectations bind to exact source hashes and compare typed values and exception categories. All 46 quizzes have four distinct options, one answer identity and a separate editorial rationale for every alternative. Output quizzes additionally match the executed value/type; conceptual alternatives require editorial review rather than treating execution as proof of wording.

The shared runner adds opt-in `environment: "node-process", async: true`. A bounded native Node child process awaits the example and records asynchronous rejection; existing synchronous VM/native paths remain intact. The unchanged fe-1.5 command passed its 116 Node executions as a compatibility check. Its two unrelated browser cases were not freshly rerun.

Supplementary cases cover weak Symbol targets, deterministic WeakRef fallback, last-winner ordering, set operations, runtime feature checks, errors from `next()`, async consumer rejection, sync-generator rejected-promise behavior, awaited `return()` and paged deduplication with zero limit/no extra request/cleanup. No test predicts GC timing. Runtime-dependent behavior is identified rather than generalized across engines.

Primary-source review supports compatibility and protocol distinctions:

- [ECMAScript keyed collections](https://tc39.es/ecma262/multipage/keyed-collections.html) and [iteration](https://tc39.es/ecma262/multipage/control-abstraction-objects.html).
- [WeakMap target restrictions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).
- [Set.intersection ordering](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection).
- [Map.getOrInsert compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsert) and [Iterator.concat compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/concat).

## Browser verification

Evidence applies to baseline Mosaic `3161f6c` plus this integration's final parsed content and unchanged shared rendering. The SHA-256 of the sorted `(card ID, parsed-card hash)` inventory is `0c7739a1f4377e45e02bdc5862b7f2d3cac3616895f36582d085b9c6cea50ab5`. Actual components were captured in headed, isolated Playwright contexts. Owner accounts, progress and browser profile were not used. Temporary fixtures and the illustrative direction preview are removed before final build/review.

| Scope | States | Result |
| --- | ---: | --- |
| 320×568 | 369 | Every Info page, all five states of every Quiz, both Flip sides inspected |
| 375×667 | 369 | Same complete coverage |
| 568×320 and 320×240 | 20 | Representative Info/Quiz/Flip states; no content overflow greater than 1px |
| 1280×800 | 10 | Representative three-page Info, five-state Quiz and both Flip sides |
| Actual Chrome 400% zoom | 5 surfaces | Effective 320×233 CSS viewport; Info, Quiz question/options/feedback and Flip answer inspected |
| Existing fe-1.5 samples | 24 | One three-page Info, one five-state Quiz and two two-sided FlipCards at both phone sizes |

All 738 final portrait states matched their requested page/side/answer. No learning-content horizontal or vertical excess greater than 1px remained. Minimum measured normal Quiz bottom gap was **72px**; choice targets were at least **44px**, action targets **48×48px**. Motifs reported `aria-hidden=true` and `pointer-events:none`. The geometry check allows 1px fractional differences; this is not a claim that every outer container has exactly equal intrinsic and client dimensions.

The real browser zoom was set and verified through Chrome's tab zoom API in a temporary extension/profile, not simulated with CSS or pinch scaling. Quiz compact panels were reached with keyboard ArrowRight and observed at indices 1 and 2. Surface capture was used after the ordinary screenshot API produced cropped zoom captures; the cropped files did not establish visual coverage.

### Reused evidence and execution cost

The reusable [browser runner](../../../scripts/audit-content-browser.mjs) accepts a Playwright Page plus `root`, `section`, `output`, optional `ids`, `viewports`, `batchSize` and `reuse`. Its manifest stores per-card content and relevant rendering fingerprints, requested/observed state, measurements and screenshot paths. Unknown requested IDs fail explicitly. Shared rendering files are hashed; the changing content registry does not invalidate unrelated card layout evidence.

The [fixture component](../../../scripts/content-audit-fixture.tsx) can be temporarily hosted in a local App Router page inside Suspense at `/content-audit-temp`, with `card`, `page`, `side` or `option` search parameters. It writes no study progress. Start the dev server, pass its origin through `base` if needed, then invoke the runner from a Node host with an available Playwright installation. Remove the route before final build and verify its 404 response. The fixture is verification source, not a published application route.

- Initial complete audit: **738 states in 62 sheets**. It found 54 states with long code overflow.
- Wrapping code on 35 affected cards: **250 states executed, 488 retained**, 21 new sheets. No remaining findings in that rerun.
- Two successive prose adjustments on one InfoCard: **6 states executed, 732 retained** each time, one sheet per run. The second removed a 2px compact overflow.
- Final terminology edit on two cards: **16 states executed, 722 retained**, two sheets.

The four portrait reruns executed **278 states instead of 2,952** complete-rerun states (about 91% fewer rerun state executions). This measures saved repeated rendering, not total elapsed time or token cost. Initial coverage was complete; final coverage combines inspected retained evidence and inspected targeted captures. All raw logs/manifests/screenshots remain outside Git under `/private/tmp/mosaic16/`; these temporary local files are not durable cross-device attachments.

Connected Playwright's restricted code host lacked the needed import interface, so capture moved to a native Node Playwright host after two attempts. Later native Computer Use could not supply reliable zoom control; isolated Chrome's tab zoom API completed that check. Reliable captures and prior valid evidence were retained rather than restarting the full audit.

### Shared limitations

The integration preserves limitations already recorded in [MOS-203](https://linear.app/joisadler/issue/MOS-203):

- At 320×568, shared compact tokens fall below the 14px prose / 12px code standard (observed floors 12.48px / 10.88px). 230 portrait states contain standard-floor exceptions. This is not a strict typography pass.
- Extreme compact/reflow modes retain existing smaller tokens (11.2px prose / 9.28px code in sampled states). The edge audit reports those typography failures separately from clear geometry; they were not concealed or fixed by lowering fonts.
- Minor overlap by transparent right-side actions follows the existing owner-accepted compromise. It does not establish approval of other defects.

Browser emulation does not establish physical iPhone/PWA, safe-area-inset or production-deployment acceptance. The owner later supplied the separate iPhone confirmation recorded above; it does not identify a browser, installed-PWA mode or individual test scenarios. Ordinary focus/navigation checks are not a fresh physical-backgrounding test.

## Ordinary-feed integration and review

An isolated guest context used real application controls and actual rendered card IDs. A 36-card mixed sample included fe-1.1/fe-1.5/fe-1.6; selecting only fe-1.6 produced 24 sampled cards all from the new section; re-enabling all sections yielded all six packages in a 48-card sample. These are sequence samples, not assertions that the inventory has only that many cards.

The current InfoCard presentation and page survived client-side profile/learning visits. Quiz arrow keys moved focus without selecting; Space submitted, correctness did not award understanding progress, and the selected answer survived a profile return. A true reload created a fresh sequence/presentation identity. No ordering, progress, authentication or synchronization algorithms changed.

Final checks passed: `validate:content` (712 cards), lint, typecheck, 63 semantic executions and `npx next build --webpack`. Existing ordering/session suites passed 26 tests. The standard Turbopack build stopped making progress at compilation and was terminated after about two minutes; this run did not emit a diagnostic identifying the cause. The repository already documents Webpack as the build fallback. An initial concurrent typegen/build run raced over `.next/types`; the final sequential typecheck passed. The final route table has no audit route. `git diff --check` passed.

The [ordinary development app](https://kissable-confetti-suffice.ngrok-free.dev/) was verified after cleanup: root 200, removed audit route 404, real guest session 200/null, all six registered sections available. Three representative screenshots were captured from its real feed at 375×667 (cursor Info, tokens Quiz and entries Flip), with no page errors or content excess greater than 1px. The normal server/tunnel and an ordinary review tab remain open; task-owned sleep prevention was stopped after browser verification. No credentials, backend fixtures or restricted content registry were introduced. Owner review should select only 1.6 in “Моё обучение”, inspect a multi-page explanation, answer a Quiz, reveal both Flip sides, return through profile/learning, re-enable other sections and reload. Record the actual device/browser and owner response separately. The owner subsequently confirmed that the iPhone check was satisfactory and authorized commit/push on 2026-11-15.


The shared content contract now documents awaited async execution; the new reusable browser runner/fixture is documented above. The canonical integration workflow already covered affected-state reruns, recovery limits and temporary-route cleanup, so no policy change was needed.
