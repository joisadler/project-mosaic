# fe-1.5 integration proposal

The owner approved this coverage and coral presentation direction on 2026-11-08 and authorized implementation. Counts below remain planning estimates; actual coverage, counts and verification belong in README.md and COVERAGE.md. [MOS-41](https://linear.app/joisadler/issue/MOS-41) owns task status and acceptance; follow the [integration workflow](../section-integration-workflow.md). Implementation approval did not authorize publication. The owner separately approved publication of the reported integration on 2026-11-08 with “пуш”; no specific physical-device/browser result was supplied.

## Inspected source and application

The next unintegrated subsection is **1.5. Arrays, Transformations & Copying**. The read-only source checkout is `/Users/yossiadler/Projects/personal/frontend-interview-preparation`, HEAD `c60ffec02d64d58f3e13bfadda96204e9be9a656`, with a clean worktree at inspection. Its PROGRESS and handoff now record owner approval of subsections 1.1–1.12; this does not authorize integrating them together.

The [1.5 source chapter](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/05-arrays-transformations-and-copying.md) and its review record identify approval on 2026-11-04. It contains 31 teaching questions, 32 question/answer pairs (`JS-ARRAYS-Q01–Q32`), 16 exercise/solution pairs (`JS-ARRAYS-EX01–EX16`), a domain-summary subsection and an English SVG/PDF infographic. Primary inventory groups are `JS-29–JS-34`.

The chapter structure, teaching boundaries, question topics, answer/solution structure, summary and approval evidence were inspected for planning. The infographic files exist; this proposal does not claim a fresh visual audit of them. New card examples, links, distractors and primary-source semantics still require independent implementation-time verification. Historical handbook checks are not verification of Mosaic cards.

Mosaic baseline `dfbd4f7920524995b5eda98da55e50705c45ed6e` registers fe-1.1–fe-1.4: 480 cards. The working tree was clean before this proposal. The package will use the existing three card types, chapter `fe-1` and section ID `fe-1.5`.

## Proposed coverage

`H` refers to the numbered teaching questions in the chapter. `Q` and `EX` refer to the source IDs above. Exercise references below follow the current prompt headings. Counts estimate distinct teaching objectives; they are neither a quota nor a requirement to reproduce each source item in all three formats.

| Area | Source anchors | Info / Quiz / Flip | Learning objectives and mistakes |
| --- | --- | --- | --- |
| Array model, branding and length | H1–2/7; Q01–02; EX01–02 | 4 / 5 / 3 | Distinguish arrays, objects and typed arrays; explain cross-realm branding, indexed properties, non-index keys, length growth/truncation and a bounded non-configurable-index failure. |
| Holes and method-specific traversal | H3–6/17/20; Q03–04/10–11/16/20; EX02/05/07 | 5 / 8 / 3 | Separate missing own properties from explicit undefined; compare delete with sequence removal; predict skipped callbacks, preserved holes, dense copies and inherited-index caveats. Avoid treating every array method alike. |
| Mutation, return values and copying APIs | H4/8–11/20; Q04–06/12; EX03–04/09 | 5 / 7 / 3 | Couple input mutation with the actual return value; cover push/pop/shift/unshift/splice/sort/reverse and bounded fill/copyWithin cases. Compare slice/concat/Array.from and toSorted/toSpliced/toReversed/with, including negative and invalid replacement indices. |
| Transformations, queries and callback contracts | H12–17; Q07–08/13–17; EX03/06–07 | 6 / 9 / 4 | Select map/filter/find/some/every/forEach/reduce by result shape; missing return, filter(Boolean) data loss, ambiguous find(undefined), empty inputs, early exit, initialValue, traversal mutation and the async-callback mismatch. |
| Sorting | H18–20; Q09/12/18–20; EX08–09 | 4 / 6 / 3 | Default string order; comparator sign, equality, consistency and transitivity; stable multi-field ordering; sort versus toSorted, undefined/holes, locale-aware comparison and limits of complexity claims. Never demand a portable output from an inconsistent comparator. |
| Destructuring, rest and spread | H21–23; Q21–23; EX10 | 4 / 5 / 3 | Defaults for undefined versus null, skipped positions, rest placement, array/call/object spread, overwrite order and argument-count limits. Compare getter reads, target setters and descriptor copying only where they change copying behavior. |
| Shallow copies, structural sharing and ownership | H10–11/24–26; Q24–25/31; EX11/15 | 4 / 5 / 3 | Draw outer and nested identities; copy the changed path, preserve unchanged branches and avoid later mutation of shared data. Distinguish caller-owned input from a fresh local result; consider copying cost without prescribing speculative optimization. |
| Deep-copy contracts, structuredClone and transfer | H27–30; Q26–29; EX12–13 | 5 / 6 / 3 | Define the supported graph first; preserve cycles and repeated references within a new graph. Explain supported built-ins, DataCloneError, class/prototype/descriptor/accessor limits and ArrayBuffer detachment after transfer. |
| JSON round-trip losses | H31; Q30; EX14 | 2 / 3 / 2 | Compare missing properties with null array entries, non-finite numbers, Date/toJSON, BigInt/cycle failures and lost shared identity. Keep JSON cloning bounded to an explicitly compatible data model. |
| Integrated diagnosis and decisions | Chapter review checklist; Q31–32; EX15–16 | 1 / 2 / 1 | Diagnose one ownership, callback, sorting or copying defect at a time. Turn long table-processing exercises into independent code-reading, repair-choice and recall decisions. |
| **Estimated total** | **6 primary inventory groups** | **40 / 56 / 28** | **124 cards; actual counts follow standalone quality, coverage and rendered fit.** |

InfoCards explain one idea over coherent authored horizontal pages. Quizzes have exactly four plausible, mutually exclusive choices and one correct answer. FlipCards ask one clear recall question and have exactly two sides. All cards must work independently in a shuffled feed, use natural Russian and require no mobile code typing. Preserve value types in output notation; show sparse structure through explicit presence/length checks rather than console-specific empty-item formatting.

## Overlap and exclusions

- fe-1.1 remains authoritative for general scope, declaration timing and strict mode. Restore only the execution context needed for a particular snippet.
- fe-1.2 already covers equality, shared references and truthiness. New cards use these for array structure, predicate correctness and copying contracts rather than repeating generic coercion puzzles.
- fe-1.3 owns general callbacks, closures, rest parameters and function binding. Revisit callbacks only through array-method contracts; forEach(async ...) is a bounded mismatch example, not a Promise-coordination lesson.
- fe-1.4 owns prototypes, descriptors, accessors and integrity. Revisit them only to explain array length failures or how a copying operation reads/writes properties. No second object-model survey.
- Map, Set, Symbols and custom iterator/generator protocols remain in 1.6. Mention built-in clone support and built-in array iteration only as context; do not teach collection APIs here.
- Full serialization, replacer/reviver and schema validation remain in 1.7. Memory/GC, event-loop scheduling and Promise coordination remain in 1.8–1.11.
- Exclude a general-purpose deep-clone implementation, cloning-library adoption, React-specific state architecture, worker infrastructure and engine-performance benchmarks. Transfer uses small isolated buffers, not user data or a new messaging feature.

## Proposed visual identity

Muted coral on a dark graphite/rose base: accent `#efad9f`, base `#302025`, floor `#170f13`, restrained glow. This adds a recognizable palette beside existing cyan, lilac, amber and jade sections. Existing success/error colors, textual feedback and icons retain their roles; the section accent does not encode correctness.

- Default `slots`: a peripheral row of separate rounded cells, with one outlined/empty cell. For array structure, length, holes and general method contracts.
- Optional `transformation`: two short offset cell rows joined by a directional path. For filtering, ordering, replacement and independent copying/clone results; distinguish it geometrically from fe-1.3's function-composition blocks.
- Optional `sharing`: two container contours with links converging on one nested node. For shallow copies, aliasing and structural sharing, not as an illustration of independent deep copies or prototype inheritance.

Use one motif according to the primary learning objective, not cosmetic variety. Artwork remains peripheral, static, accessibility-hidden and pointer-inert in the existing presentation registry, SCSS Module and SVG component. Keep symmetric content padding, typography, header/indicators and the vertical right-hand icon rail. Preserve palette/motif across pages, choices, sides and revisits. Card data receives only optional typed motif metadata, never drawing instructions.

The accompanying in-conversation direction preview shows this palette on an InfoCard with the slots motif, a QuizCard with the transformation motif and a FlipCard with the sharing motif. It includes illustrative local page, answer and side interactions. It is a separate sketch, not actual-component evidence or a new interaction design; its sample wording and dimensions do not establish final content correctness or mobile fit. Keep the preview outside the integration commit.

After approval, validate a small actual-component sample before bulk authoring: a dense multi-page InfoCard on holes/copying, a code Quiz with every feedback choice, and both sides of a structural-sharing FlipCard. Check 320×568 and 375×667 and shorten content where needed. Return for further agreement if the sample needs a substantial departure from this direction.

## Implementation and verification after approval

Follow the shared workflow rather than introducing another process. Read the relevant local Next.js guide before framework changes. Preserve existing card/option IDs, progress, account synchronization, selection and active-session state; each true reload must still create a fresh balanced queue.

Use stable fe-1.5 IDs, three typed card arrays, verified source URLs and explicit chapter/section registration. Update final source-to-card coverage, README availability and all affected counts together. Keep 1.6–1.12 outside this implementation even though their source is ready.

Reuse the shared semantic runner where its execution model fits. Inspect its globals and assertions before using it for structuredClone, transfer or asynchronous examples; do not assume a Node VM exposes every host API. Use real Node/browser behavior for the appropriate claims, isolate deliberate failures and buffers, preserve holes and typed values in assertions, and review all distractors separately. Verify DOM-specific and cross-realm examples in a real browser if authored. Historical source Node checks do not establish compatibility with Mosaic's pinned runtime.

Run structural/content validation, semantic checks, lint, typecheck, production build, applicable existing regressions and diff checks. Audit every Info page, all five Quiz states and both Flip sides at both required phone viewports; cover landscape, desktop, enlargement, reflow and accessibility as required by the workflow. Start and later stop the task-owned temporary caffeinate process for macOS browser work. Keep screenshots, logs and temporary fixtures outside Git and remove any audit routes before handoff.

Compare any shared compact-layout failures with [MOS-203](https://linear.app/joisadler/issue/MOS-203). Existing exceptions are not a new strict-contract pass; fix new-content overflow within this package and obtain separate scope approval for shared behavior changes. Verify actual mixed-feed sequences, new-only selection, re-enabling prior packages, live navigation state and true reload using isolated data.

Owner review and focused commit/push approval remain separate final gates. Do not mark the package integrated, close MOS-41 or advance to another subsection based on this proposal.
