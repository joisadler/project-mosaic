# Frontend Interview Preparation pack fe-1.5

Subsection **1.5. Arrays, Transformations & Copying** adapts owner-approved handbook material into standalone Russian InfoCards, QuizCards and FlipCards. [MOS-41](https://linear.app/joisadler/issue/MOS-41) records scope, implementation and acceptance. The owner approved the [coverage and presentation proposal](PLAN.md) on 2026-11-08; the owner subsequently approved publication of the reported integration on the same date with “пуш”. No specific physical-device/browser result was supplied.

128 cards: **40 InfoCards (119 authored pages), 60 QuizCards and 28 FlipCards**. There are 475 normal presentation states per phone viewport, 950 across the two required sizes. Four extra QuizCards beyond the planning estimate isolate JSON cycles/shared-identity loss and structuredClone function/RegExp boundaries. Counts follow distinct learning objectives rather than a quota.

Stable `fe-1.5-*` IDs and identifier-safe `feSection1_5*Cards` exports are registered under chapter `fe-1` in `src/content/learning-sections.ts`. Existing card/option IDs, progress, selection, account behavior and ordering rules are preserved. No dependencies or new product interactions are introduced.

## Source and scope

Read-only handbook checkout: `/Users/yossiadler/Projects/personal/frontend-interview-preparation`, HEAD `c60ffec02d64d58f3e13bfadda96204e9be9a656`, clean when inspected. The subsection review and PROGRESS record owner approval on 2026-11-04. Source readiness does not establish Mosaic availability or acceptance.

Source set:

- [Handbook: 31 teaching questions](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/05-arrays-transformations-and-copying.md).
- Question Bank and separate answers: `JS-ARRAYS-Q01–Q32`.
- Exercise prompts and separate solutions: `JS-ARRAYS-EX01–EX16`.
- Subsection summary, English SVG/PDF infographic and `reviews/stage-4-section-reviews/01-05-arrays-transformations-and-copying.md`.
- Curriculum and coverage mapping: primary inventory `JS-29–JS-34`.

[COVERAGE.md](COVERAGE.md) maps actual IDs to chapter questions and related question/practice topics. Source Q/EX references identify related material; the mobile cards are adaptations rather than identical copies of the long source prompts. Prompt/answer and exercise/solution ID parity were checked: 32/32 and 16/16. All 31 source heading URLs were matched against rendered GitHub HTML on 2026-11-08.

Coverage: array branding, indices/length and partial truncation failure; missing properties versus explicit undefined; method-specific sparse traversal; mutation and return values; copying APIs; transformation/query selection, callback mistakes and bounded async mismatch; comparator consistency, stability and multi-field sorting; destructuring/rest/spread; shallow copying, accessors and structural sharing; supported clone graphs, cycles/shared references, class and host limits, transferable buffers; bounded JSON round-trip losses and ownership review.

Overlap is intentional only when it adds an array/copying objective: fe-1.2 owns general identity/truthiness, fe-1.3 owns functions/rest parameters, and fe-1.4 owns the general object/descriptor/prototype model. Other collections and custom iteration protocols remain in 1.6; full serialization in 1.7; memory, scheduling and Promise coordination in later subsections. This package does not implement a universal clone utility, worker infrastructure, React state architecture or cloning-library integration.

## Approved presentation

Muted coral: accent `#efad9f`, base `#302025`, floor `#170f13`, restrained glow. Existing success/error feedback colors, icons and textual states retain their roles.

- Default `slots`: separate array cells with one outlined empty position.
- Optional `transformation`: offset input/output rows with a directed path, for transformations and independent copies.
- Optional `sharing`: two containers linked to one nested object, only where shared identity is the objective.

Artwork stays in the existing presentation registry, SCSS Module and static SVG component. Card data contains only typed motif metadata. Decoration is accessibility-hidden, pointer-inert and stable across pages/choices/sides/revisits. Shared content padding, typography, header and right-side icon rail are preserved.

The early actual-component sample checked a three-page InfoCard, a code Quiz in all five states and both Flip sides at 320×568 and 375×667 in ordinary owner Chrome. No horizontal excess was measured; the minimum Quiz bottom gap was 141.80px. FlipCard outer height reproduced a 1px intrinsic discrepancy already documented for existing content. The separately approved illustrative preview is not application evidence and stays outside the integration commit.

## Reproduce semantic verification

```sh
source "$HOME/.nvm/nvm.sh"
nvm use
node scripts/check-fe-1.5-semantics.mjs
# Equivalent shared entry point:
node scripts/check-content-semantics.mjs fe-1.5
```

The shared runner parses the literal authored arrays, binds expectations to fenced-source hashes, compares typed console values and exception categories, checks output-answer identity, and retains per-option editorial rationale for all 60 quizzes. The two decision quizzes require explicit editorial review rather than claiming an output test proves their alternatives correct. Correct-answer positions vary across the package.

The 97 authored JavaScript fences comprise 95 Node executions and two browser cases. Twenty-one additional scenarios cover inline claims, repairs, inherited indices, descriptors, empty sparse reduction, supported clone types, getters, Symbol-key omission, transfer ownership and JSON losses. **116 Node executions pass on pinned Node.js v24.21.0.** Strict mode is the execution default.

The runner uses the existing VM path for ordinary JavaScript. Native structuredClone/transfer cases opt into the shared `node-process` environment: a bounded child process runs with native Node globals in its own realm. It does not inject a host clone function into another VM realm. Existing package commands remain compatible.

Sparse structure is asserted with Object.hasOwn, in, length and callbacks. The shared log encoder alone does not distinguish a hole from explicit undefined; no sparse-array display shorthand is used as an output oracle here. Expected string results are quoted in output captions and options. InfoCard examples show expected results beneath the code; quizzes do not reveal answers in code comments.

Open the generated `browser-semantics.html` in ordinary Chrome to reproduce the two browser-only cases: cross-realm Array branding and DOM-node clone rejection. Both passed in owner Chrome on 2026-11-08 and passed again from the final generated harness in the owner-authorized Playwright fallback (observed title `PASS: fe-1.5 browser semantics`, typed report 2/2). These checks create only disposable frames/nodes and do not access owner progress or accounts. Browser execution does not establish a physical-device check.

Primary-source review:

- [ECMAScript 2026 array APIs and sorting](https://tc39.es/ecma262/2026/multipage/indexed-collections.html).
- [ECMAScript 2026 ArraySetLength](https://tc39.es/ecma262/2026/multipage/ordinary-and-exotic-objects-behaviours.html#sec-arraysetlength).
- [ECMAScript 2026 JSON serialization](https://tc39.es/ecma262/2026/multipage/structured-data.html#sec-json.stringify).
- [HTML structured serialization, deserialization and transfer](https://html.spec.whatwg.org/multipage/structured-data.html).

## Verification and owner review

Verified on 2026-11-08 against Mosaic baseline `dfbd4f7920524995b5eda98da55e50705c45ed6e` plus this uncommitted integration. Parsed card-data SHA-256: `2a1683d3fba4bec11ebfe17df19f435cb7018c15e468e3dc26c0a79f74ed4a7c`. The handbook remained clean and read-only.

Passed technical checks: `validate:content` (608 cards), lint, typecheck, 116 Node executions and two real-browser cases. Existing ordering/session/progress/sync suites passed all 51 tests. Shared-runner compatibility was checked through the unchanged fe-1.3 and fe-1.4 commands (90 and 100 Node executions). COVERAGE matches all 128 IDs; all 60 quizzes have four distinct alternatives, one answer identity and individually reviewed explanations.

The standard Turbopack build failed, including outside the sandbox, while binding a service port for SCSS: `Failed to write app endpoint /manifest.webmanifest/route`, `Operation not permitted (os error 1)`. `npx next build --webpack` completed successfully without a configuration change. Its route table contains no diagnostic routes. Lint/typecheck passed again after diagnostic cleanup.

### Rendered evidence

Every one of the 475 presentation states was measured at each size below. All 950 phone states were visually reviewed, including every Info page, all five states of every Quiz and both Flip sides. Requested states were compared with observed active content and selected choices; all 900 Quiz states across the three sizes matched their intended choice/unanswered state.

| CSS viewport | Measured states | Horizontal excess | Minimum normal Quiz bottom gap | Minimum prose / code |
| --- | ---: | ---: | ---: | ---: |
| 320×568 | 475 | 0 | 109.17px | 12.8px / 10.88px |
| 375×667 | 475 | 0 | 122.56px | 14px / 12px |
| 667×375 | 475 | 0 | 37.87px | 14px / 12px |

Representative dense states were also inspected at 568×320, 320×240 reflow and actual Chrome 400% zoom. The compact Quiz question, options and feedback panels remained reachable with the keyboard. Action targets measured 48×48px; sampled Quiz choices measured at least 44px high. SVG icon dimensions are not the surrounding target size. Decoration measured `aria-hidden=true` and `pointer-events:none`; motifs, colors and layout remain stable across state changes.

Native Computer Use supplied the initial sample, complete measurements, enlarged/compact checks and most 320px visual review. The browser connection host was unavailable, and native screenshots later stopped advancing despite changing accessibility snapshots (`noWindowsAvailable` for pointer input). Those stale captures were not counted as reviewed states. The owner explicitly authorized Playwright; the remaining 320px states and the complete 375px visual review were finished in an isolated browser context. Full-size screenshots of all three types were additionally checked in the ordinary application after removing diagnostics. This is browser evidence, not a physical-device or safe-area-inset check.

Shared exceptions remain tracked in [MOS-203](https://linear.app/joisadler/issue/MOS-203), separately from passed checks:

- Existing 320px compact typography falls below the shared 14px prose / 12px code floor. Baseline cards reproduced 12.48px / 10.88px; this integration changes no shared fonts. This is not a strict typography pass.
- Exact 1px `scrollHeight` surplus occurred in 65 / 62 / 56 measured elements at the respective sizes. Each size includes 56 Flip outer-container entries; remaining phone cases are fractional Markdown geometry. Baseline cards reproduced the Flip surplus at both phone sizes and a Markdown surplus at 320px. No excess greater than 1px, nested content scrolling or visibly clipped learning text remained. The 1px differences are retained explicitly, not rounded into a clean geometry pass.
- Minor overlap with transparent right-side actions follows the documented owner-accepted compromise. At 320×240 the shared compact “show explanation” panel retains a roughly 7px bottom gap. This does not generalize acceptance to other layout defects or establish new owner approval.

Screenshots, reports and logs are outside Git under `/private/tmp/mosaic15/`; these local temporary files are not durable cross-device attachments. The owner separately authorized uploading three representative ordinary-app screenshots (Info/Quiz/Flip at 375×667); all three uploads returned 200 and are linked in MOS-41 Resources. Scaled contact sheets supplement full-size dense-state checks; their scale is not the tested iframe viewport. The direction sketch under `outputs/fe-1.5-preview/` remains separate from the integration commit.

### Ordinary feed and handoff

An isolated guest browser context exercised the real application and auth endpoint (`200`, session `null`), without auth/backend mocks or a restricted registry. A temporary opt-in read-only session probe observed actual queues and presentation IDs; it did not change application state. All diagnostic routes/probes were removed before handoff and return 404; the ordinary app has no diagnostic UI.

The initial queue contained 608 unique cards: 100 / 120 / 136 / 124 / 128 from fe-1.1–fe-1.5. Real learning controls selected only fe-1.5, yielding 128 unique cards, then re-enabled all five packages and restored 608. The new package appeared throughout mixed sequences rather than as an appended block. Info page, Quiz answer and Flip side survived client-side profile/learning visits with the same presentation IDs. A true reload created a new session ID and a different mixed queue, retained all selected sections and cleared transient page/answer/side state. Tab activation did not change the queue; the fallback browser continued to report `visibilityState=visible`, so this is not a fresh physical-backgrounding test. No understanding confirmations or owner data were changed.

The owner explicitly authorized opening the established ngrok development endpoint. [The ordinary review app](https://kissable-confetti-suffice.ngrok-free.dev/) was checked through the tunnel: root 200, full 608-card guest inventory, real guest session endpoint 200/null, no diagnostic probe, removed audit route 404 and no browser console errors/warnings. The review tab and normal dev server/tunnel remain available for the owner.

The owner approved publication of the reported integration on 2026-11-08 with “пуш”, authorizing its focused commit and push. This approval does not identify a tested device/browser or establish deployment validation. Suggested device scenario for any subsequent check: select only 1.5 in “Моё обучение”; inspect a multi-page explanation, every answer of a Quiz and both Flip sides; return through profile/learning; re-enable other subsections; then reload and confirm that the new feed remains mixed. Record the actual device/browser and owner response separately. Do not infer deployment validation from local integration or a later push.
