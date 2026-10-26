# Frontend Interview Preparation pack fe-1.3

136 cards: **43 InfoCards, 62 QuizCards and 31 FlipCards**. The InfoCards contain 131 explicit horizontal pages; the complete normal presentation has 503 states.

Source: [1.3. Functions, Closures & Functional Patterns](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/03-functions-closures-and-functional-patterns.md), reviewed 2026-10-25. The source curriculum and coverage map assign JS-12–JS-21; the source review records owner approval on 2026-10-07. Its approval does not establish Mosaic acceptance.

The owner approved the coverage and amber capture/invocation/composition direction before full authoring. [MOS-39](https://linear.app/joisadler/issue/MOS-39) tracks this registered integration. On 2026-10-26 the owner authorized committing and pushing the completed work; final content/device acceptance remains recorded separately in Linear. The owner explicitly accepted the demonstrated minor icon/text overlap and retained the transparent right-hand controls. Separate shared compact-mode typography/safe-zone limitations remain recorded in [MOS-203](https://linear.app/joisadler/issue/MOS-203); no shared layout change is included. Commit/push authorization does not establish deployment or full physical-device validation.

## Integration

The three `src/content/fe-1.3-*-cards.ts` arrays use stable `fe-1.3-*` card IDs and identifier-safe exports `feSection1_3InfoCards`, `feSection1_3QuizCards` and `feSection1_3FlipCards`. `learning-sections.ts` registers them under `fe-1.3`, chapter `fe-1`, title “Функции, замыкания и функциональные паттерны”. Existing card/option/section identities remain unchanged.

Each card includes a direct `readMoreUrl` from `fe-1.3-source-urls.ts`. All 26 handbook heading permalinks were checked against the rendered GitHub page. [COVERAGE.md](COVERAGE.md) maps every card to its primary handbook teaching question, question-bank IDs and exercises. Content is adapted for independent shuffled study, code reading and recall; it requires no mobile code entry.

## Source artifacts

The source repository was read only. Its subsection 1.3 artifacts match source HEAD `7e57113`; unrelated uncommitted subsection 1.5 work was preserved. Reviewed artifacts:

- The complete handbook chapter, including its practical reference, mistakes, traps and references.
- Section 1.3 of `question-bank/by-domain/01-javascript-and-async-programming.md` and its answer file: JS-FUNCTIONS-Q01–Q28.
- Section 1.3 of `exercises/prompts/by-domain/01-javascript-and-async-programming.md` and its solution file: JS-FUNCTIONS-EX01–EX12.
- Section 1.3 of `summaries/01-javascript-and-async-programming.md`.
- `reviews/stage-4-section-reviews/01-03-functions-closures-and-functional-patterns.md`, curriculum, coverage map and progress records.
- The existing English A4 infographic (SVG visually inspected; PDF companion identified).

## Coverage map

`H` means the numbered teaching question in the handbook; `Q` and `EX` refer to the IDs above. Formats describe different learning objectives, not a fixed card quota. The final distribution is 43 InfoCards, 62 QuizCards and 31 FlipCards.

| Area | Sources | InfoCard objectives | QuizCard objectives | FlipCard objectives |
| --- | --- | --- | --- | --- |
| Function values and forms (`JS-12/13`) | H1–4; Q01–03/07; EX01–02 | Function identity, named-expression recursion, arrow return syntax and semantic differences | Trace internal name after outer reassignment; distinguish implicit object return from a block | Choose a form by `this`, `arguments` and construction requirements |
| Parameters and call contracts (`JS-19`) | H5–8; Q04–05/10–11; EX01–02/08 | Parameters vs arguments; missing vs `undefined` vs `null`; default evaluation order/scope; destructuring defaults; rest vs `arguments`; arity | Predict fresh defaults, parameter TDZ, default/body visibility, the three length counts; isolated strict/sloppy aliasing | Explain rest/arguments boundaries and why `fn.length` is not validation |
| First-class functions, callbacks and HOF (`JS-14`) | H9–10; Q06/12/23; EX06/11 | Passing vs calling; callback timing, signature, result, errors and cleanup; adapters | Diagnose `map(parseInt)` and select a signature adapter; distinguish synchronous callback from deferred work | Reconstruct the callback contract and identify HOF |
| Invocation and lexical `this` (`JS-13/16`) | H4/11–12/14; Q07/13/16; EX05/11 | Regular receiver by call form; detached methods; arrows inherit outer `this`; explicit strict/sloppy environment | Predict method, detached and explicit calls; show why `call`/`bind` cannot replace arrow `this` | Choose stored binding vs an adapter reading the current object binding |
| `call`, `apply`, `bind` (`JS-17`) | H13–15; Q14–16/26; EX05 | Immediate call vs prepared function; array-like vs iterable; bound arguments and identity; method borrowing with modern alternative | Trace repeated binding, receiver and argument order, `name`/`length`, stable listener removal | Compare APIs and explain why separate `bind` calls break cleanup |
| Constructibility (`JS-18`) | H16; Q01/17; EX01/11 | Practical `new` steps; returned object vs primitive; arrow and concise-method boundaries | Predict constructor return, bound arguments under `new`, isolated `TypeError` for arrows/bound arrows | Explain that binding preserves construction only when the target supports it |
| Closures and private state (`JS-15`) | H17–19/21; Q08/18–20/24; EX03–04/08 | Live binding vs explicit snapshot; shared methods vs separate factory calls; mutation vs reassignment; encapsulation and bounded state | Trace independent counters, shared state, old object vs current binding; diagnose loop fixes without repeating existing elementary loop quizzes | Explain closure vs active stack and factory lifecycle |
| Memoization and lifetime (`JS-15/21`) | H20/22; Q25–28; EX07/09/11–12 | Cache contract, full input dependencies, `has` for cached `undefined`, key identity, bounds/reset; retaining paths and cleanup | Trace cache hits, object keys, recency/eviction and synchronous throws; diagnose mismatched listener identity and repeated start/stop | Recall when caching is unsuitable and why a closure alone does not prove a leak |
| Purity and ownership (`JS-21`) | H23/26; Q09/23/27–28; EX03/06/10–12 | Determinism and observable effects; fresh local mutation; shared nested data; explicit effect boundary | Review a small transformation for external mutation, hidden state or time dependency; select safe ownership | Explain practical immutability and necessary effects |
| Currying, partial application and composition (`JS-20`) | H24–26; Q21–22/28; EX10–12 | Curried calls vs fixed leading arguments; named compatible stages; compose/pipe direction; abstraction limits | Predict noncommuting operation order; select partial application; identify broken contracts | Recall the distinctions and when a settings object or explicit control flow is clearer |

Integrated Q28/EX12 scenarios are decomposed into independent diagnosis, prediction and decision cards. They use code reading and decisions rather than a long code-entry exercise. Each card includes enough context for shuffled study.

## Overlap and intentional exclusions

- Handbook H2 declaration timing is intentionally served by existing fe-1.1 coverage. `fe-1.1` already explains declaration timing, named-expression scope, lexical lookup and basic `var`/`let` loop output. Use these as short local context; do not reproduce its standalone hoisting/TDZ quizzes or identical loop snippets. New goals concern self-reference after reassignment, shared closure state, snapshot errors and choosing a loop repair.
- `fe-1.2` already covers identity, pass-by-value, mutation/reassignment, shallow copies and equality. Revisit only when needed to explain captured state, cache keys and function purity.
- Preserve the source review's explicit scope decision: function-focused `this`, `call/apply/bind` and practical `new` belong here even though 1.4 repeats related curriculum bullets.
- Exclude the full prototype/object model, classes/inheritance, descriptors, getters/setters and `Object.create` implementation (1.4); full array/copying surveys (1.5); collection/WeakMap internals (1.6); detailed GC/profiling instruction (1.8); event-loop scheduling and promise/async pipeline implementations (1.9–1.11).
- Mention cache freshness/rejection/cancellation policies as design limitations only. Do not introduce an advanced cache library, network-backed examples, universal curry framework, runtime AI or new app interactions.
- No typing code on mobile. Source implementation exercises become short code reading, repair selection and active recall.

## Source cautions resolved in adaptation

1. EX02 solution C writes `"function undefined"`, although the original `console.log(fn(), typeof inside)` receives two string values. Mosaic writes `"function" / "undefined"` and preserves separate logged arguments.
2. Q28/EX12 cache examples accept a per-call `transform` while using only the value/id as key. A cached result can bypass a different transform. Do not present these as generally correct memoization: fix the transform for the factory lifetime, include every relevant dependency in the key, or explicitly teach the limitation.
3. Historical source verification is evidence about that source revision. Every new runnable Mosaic example must be executed again, with value/type assertions and separate distractor review.

## Approved visual identity

Warm amber/copper: accent `#efc58b`, base `#2b2117`, floor `#17120d`, restrained amber glow. Existing correct/incorrect colors are retained.

- Default `capture`: function nodes connected to an enclosed binding, for closures, private state, memoization and lifetime.
- `invocation`: call paths converging on a receiver, for arguments, invocation, `this`, binding and construction.
- `composition`: linked operation blocks, for HOF/adapters, partial application, currying and transformation boundaries.

The existing presentation registry selects the motif by the primary learning objective. CSS/SVG artwork is static, peripheral, hidden from accessibility APIs, pointer-inert and bounded by the card. Data contains only allowed motif metadata. All pages, selected-answer states and flip sides retain the same section identity. Shared control placement, typography and progress/session behavior are unchanged.

## Reproduce semantic verification

From the repository root:

```bash
source "$HOME/.nvm/nvm.sh"
nvm use
node scripts/check-fe-1.3-semantics.mjs
```

The runner parses the actual authored arrays using the existing TypeScript dependency, checks every fenced JavaScript example against a hash-bound expectation, executes Node examples in isolated VM contexts with a 1 second timeout, captures real console argument values before text formatting, and checks exception categories. Explicit legacy examples run in sloppy mode; other contexts are strict. No timers, network, storage, account or user data are touched.

It checks all quiz identities, four distinct choices and executable-output answer notation. The expectation manifest also records the editorial rationale for each alternative; execution alone does not prove distractor quality. All 62 quizzes received separate editorial review, including decision questions. Expected comments, explanations and recall answers were compared with the typed results.

The command prints its OS temporary output directory. Open the generated `browser-semantics.html` in ordinary Chrome (or serve that directory locally) to run the two real EventTarget/Event examples in disposable iframes. Both must report PASS. The browser harness is intentionally separate from Node execution; no fake window is used.

## Verification results

Checked on 2026-10-25–26 with Node.js 24.21.0 and ordinary owner Chrome:

- All 86 authored JavaScript fences are covered: 84 execute in isolated Node contexts and two use real browser EventTarget/Event. Six supplementary scenarios bring Node executions to 90. All 62 quizzes received separate alternative/answer review.
- Content validation (356 registered cards), lint, typecheck, standard production build, 36 ordering/session/progress tests (including seven queue/distribution regressions) and `git diff --check` passed. The standard build passed outside the restricted sandbox; no configuration was changed. The earlier Webpack fallback also passed.
- Every authored state was measured at 320×568 and 375×667: 131 Info pages, 310 Quiz states and 62 Flip sides (503 states per viewport), with requested Swiper page/side assertions. No portrait content overflow or rail overlap was found. Desktop, landscape, reflow and actual 400% Chrome zoom were also checked.
- The owner reviewed and accepted minor transparent-icon overlap in landscape on 2026-10-26. Existing shared QuizCard typography at 320×568 remains below the documented 14/12px floors; extreme compact mode retains safe-zone and small intrinsic-scroll limitations. See MOS-203. A complete strict-contract visual pass and physical-device acceptance are not claimed.
- All 26 source anchors were checked against rendered GitHub headings. Non-executable semantics were reviewed against ECMAScript 2026 and MDN documentation for parameters, arguments, arrows, binding, construction, closures and event cleanup.
- Screenshots, per-state measurements and verbose audit artifacts are kept outside the repository. Temporary application/public audit pages were removed. The semantic runner and its expectations remain the reproducible package check.

The normal development server and its existing ngrok origin are the owner phone-review entry. Review covers Info pages, Quiz feedback, both Flip sides and portrait–landscape recovery. No commit/push/deployment is implied by these checks; acceptance remains in Linear.
