# fe-1.7 — Modules, Errors & Serialization

Status: coverage and visual direction approved by the owner on 2026-11-17 with “Одобряю”. The owner subsequently confirmed final review and authorized commit/push on 2026-11-17 with “Проверил, одобряю.” Device/browser and deployment acceptance were not specified.

## Source and current state

- Task: [MOS-43](https://linear.app/joisadler/issue/MOS-43/add-fe-17-modules-errors-and-serialization).
- Mosaic: `main` at `021783e`; six registered packages / 712 cards. The existing uncommitted update to `docs/content/section-integration-workflow.md` predates this proposal and is preserved separately.
- Read-only handbook: `/Users/yossiadler/Projects/personal/frontend-interview-preparation`, clean `main` at `c60ffec` when inspected.
- [Chapter](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/07-modules-errors-and-serialization.md): 24 teaching questions, inventory `JS-41–JS-44`.
- [Source review](https://github.com/joisadler/frontend-interview-preparation/blob/main/reviews/stage-4-section-reviews/01-07-modules-errors-and-serialization.md) and PROGRESS record owner approval of the complete artifact set on 2026-11-05.
- Companion material: `JS-MODULES-Q01–Q24` with separate answers, `JS-MODULES-EX01–EX10` with separate solutions, compact summary and English A4 SVG/PDF infographic. Source approval is not Mosaic acceptance.

## Proposed coverage

H denotes chapter teaching questions; Q/EX refer to the companion source IDs. Counts estimate distinct standalone objectives; final counts follow meaningful coverage and rendered fit rather than a quota.

| Area | Sources | Info / Quiz / Flip | Teaching objectives |
| --- | --- | --- | --- |
| ESM boundary and exports | H1–5; Q01–04/08; EX01–02 | 6 / 8 / 4 | Module scope/strict mode, named/default/namespace exports, import placement, live bindings versus local snapshots, reassignment versus object mutation, default expression versus exported binding. |
| Dependency graph and readiness | H6–9; Q09–11/21; EX04/06 | 5 / 7 / 4 | Legal cycles versus early TDZ reads, deferred reads and removing cycles, dynamic import success/failure, dependent readiness with top-level await, tree shaking and observable side effects. No language-level promise of bundle size or chunk count. |
| CommonJS and runtime boundaries | H10–14; Q12–13/19–20; EX05/10 | 5 / 7 / 4 | Explicit file/package formats, exports alias versus module.exports, CJS default/named interop, version- and graph-dependent require(esm), conditional exports and separate state/constructor identity. Mark CJS as legacy/interoperability knowledge. |
| Throw, finally and asynchronous boundaries | H15–17; Q05/14/18; EX03/07 | 4 / 6 / 3 | Propagation and unreachable statements, finally preserving/replacing completion, mutation versus return replacement, try boundaries, awaiting rejection inside try versus returning a Promise. |
| Context, cause and handling policy | H18–19; Q15/23; EX07/10 | 3 / 4 / 2 | Rethrow the same value or add operation context, custom Error/cause, arbitrary thrown values, known error codes, handling at an actionable boundary, avoiding silent success. |
| JSON representation and hooks | H20–22; Q07/16–17/22; EX03/08 | 6 / 9 / 4 | Object/array/root losses, cycles and BigInt, explicit DTOs, toJSON before replacer, root calls/property-list filtering, bottom-up reviver/deletion, large IDs and bounded context.source compatibility. |
| Schema and integrated import boundary | H23–24; Q06/23–24; EX09–10 | 4 / 5 / 3 | Syntax versus shape/version/field validation, own/allowed fields and dangerous keys, separate parse/transform/schema failures, stable codes/cause and module-loader failure. Convert implementation work to bounded reading/repair/recall decisions. |
| **Estimate** | **24 H / 24 Q / 10 EX** | **33 / 46 / 24** | **103 cards; no mobile code typing.** |

## Overlap and exclusions

- fe-1.1 owns general scope/TDZ; revisit only module binding and evaluation boundaries.
- fe-1.4 owns the object model and general property mutation; revisit only export/namespace/DTO contracts.
- fe-1.5 owns copying/structuredClone and brief JSON-copy losses. This package adds serialization contracts, hooks, validation and error attribution rather than another clone-method survey.
- fe-1.6 owns collections/iteration. Use their JSON representation only to explain explicit DTO choices.
- Keep general GC in 1.8, scheduling in 1.9, Promise coordination in 1.10–1.11 and detailed bundler/package-tool configuration in domain 14.
- No new loader framework, schema library, security framework, production network client, dependency upgrade or bundler installation. Do not expand the topic into a generic package-authoring course.

## Proposed visual identity

Muted dusty rose on graphite: accent `#d8afbf`, base `#2a2229`, floor `#141115`. This is less violet than fe-1.2 plum and cooler than fe-1.5 coral. Preserve shared feedback colors and the established control placement.

- Default `boundary`: two separate file contours with edge ports and a single link, for module/API ownership boundaries.
- Optional `causes`: offset frames joined by a short chain, for propagation and retained causes.
- Optional `payload`: a value contour and text-record contour separated by an encoding boundary, for JSON representation and validation.

Keep motifs peripheral, static, faint, accessibility-hidden and pointer-inert. Extend only the existing typed presentation registry/SVG/SCSS system after approval. Preserve symmetric padding, typography, header/indicators, right-side icon rail and accepted interactions.

The accompanying three-card preview is an illustrative direction sketch, not actual-component or mobile-fit evidence. Its temporary HTML and screenshot live outside Git under `/private/tmp/mosaic17/`.

## Verification after approval

Follow the current [integration workflow](../section-integration-workflow.md), including high/medium reminders and CLI-first browser work. Reuse the existing semantic and rendered-audit runners. Validate a dense actual-component sample before bulk authoring and apply its measured limits; do not repeat the whole inventory after a local content fix.

Run multi-file ESM/CJS examples as actual temporary modules with the pinned Node runtime, not by pretending imports are ordinary VM expressions. Extend the shared semantic runner narrowly if necessary, without an additional dependency or per-section engine. Separate executed outcomes, source-backed compatibility statements and manual review. Review each quiz alternative individually.

Audit every new authored page, unanswered/each-choice Quiz state and both Flip sides at 320×568 and 375×667; add representative desktop/landscape/reflow/zoom/keyboard and existing-package samples plus ordinary mixed-feed/selection/reload/client-navigation checks. Retain reusable scenarios in Git and raw evidence outside it. Preserve per-card fingerprints and an inspected-image index. Remove any temporary fixture route before final build/review. Run build and typecheck sequentially.

The completion report must distinguish rendering rerun savings from actual model/allowance usage and retain existing shared layout limitations honestly. Owner device review and commit/push approval remain separate gates.
