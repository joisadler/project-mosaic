# Frontend Interview Preparation pack fe-1.4

Subsection **1.4. `this`, Invocation & Object Model** adapts the owner-approved handbook object-model material to standalone Russian InfoCards, QuizCards and FlipCards. [MOS-40](https://linear.app/joisadler/issue/MOS-40) records implementation, evidence and owner acceptance. The [approved coverage and presentation proposal](PLAN.md) defines scope; its counts were estimates rather than quotas.

124 cards: **40 InfoCards (120 authored pages), 57 QuizCards and 27 FlipCards**. There are 459 normal presentation states per mobile viewport, 918 across both required sizes. Two validation questions beyond the 122-card estimate cover checking before mutation and rejecting invalid Proxy input; they stay within the approved descriptor/Proxy scope.

The package uses stable `fe-1.4-*` IDs and identifier-safe `feSection1_4*Cards` exports, registered under chapter `fe-1` in `src/content/learning-sections.ts`. Existing package, card and option identities remain intact. No new interactions, dependencies, account data or ordering rules are introduced.

## Source boundary

Read-only source checkout: Frontend Interview Preparation, HEAD `7e57113`. The subsection review records owner approval on 2026-10-08. The six subsection text artifacts match that revision in substance; uncommitted subsection 1.5 material and shared navigation/status work were preserved. Source approval does not establish Mosaic acceptance.

Source set:

- [Handbook: 28 teaching questions](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/04-this-invocation-and-object-model.md).
- `question-bank/by-domain/01-javascript-and-async-programming.md` and its separate answer file: `JS-OBJECTS-Q01–Q30`.
- `exercises/prompts/by-domain/01-javascript-and-async-programming.md` and its separate solution file: `JS-OBJECTS-EX01–EX14`.
- The subsection summary, existing English SVG/PDF infographic, curriculum/coverage map and `reviews/stage-4-section-reviews/01-04-this-invocation-and-object-model.md`.

Primary inventory groups: `JS-23–JS-28` and `JS-39`. [COVERAGE.md](COVERAGE.md) maps actual card IDs to handbook questions, source questions and exercises. Long implementation challenges become code reading, repair selection and short recall; no mobile code entry is required.

## Coverage and exclusions

Coverage includes creation strategies and state/method placement; prototype topology, lookup, shadowing and write/define distinctions; classes, fields, initialization, inheritance and super; static/private elements and composition; ownership, enumerability and key APIs; descriptors, accessors, receivers and validation; integrity limits; and a bounded Proxy/Reflect survey with identity, invariants and revocation.

- fe-1.1 remains authoritative for general lexical scope, strict-mode and TDZ instruction. Class/invocation cards restore only the needed local context.
- fe-1.2 already teaches identity and shared references. Revisit them for prototype state, presence checks, integrity and Proxy identity, rather than reproducing general equality or copying cards.
- fe-1.3 owns the detailed `JS-16–JS-18` function/binding/constructibility material. Handbook H1–4 serve as a bridge; basic call/apply/bind and new puzzles are not counted again. New cards add prototype, placement or class-specific objectives.
- Arrays, copying/cloning, structuredClone and deep-freeze implementations remain outside this package. Nested objects appear only to explain shared state and shallow integrity.
- Symbol is used as a property key; collection internals, full iteration protocols and well-known-Symbol implementation remain in 1.6. instanceof caveats may name Symbol.hasInstance without developing its protocol.
- Full prototype-pollution defenses, DOM-event instruction, async scheduling and framework reactivity implementations are excluded. Proxy is not presented as a security boundary or universally transparent wrapper.

## Approved presentation

The owner approved jade/sage on 2026-11-01: accent `#a8d5ba`, base `#152b23`, floor `#0b1712`, restrained glow. Current correct/incorrect feedback colors and textual states remain separate.

- Default `prototype`: separate rounded object contours joined by directional links for delegation, creation and classes.
- Optional `descriptor`: a property contour with a divided attribute panel for ownership, descriptors, accessors and integrity.
- Optional `interception`: separate wrapper/target contours with a routed path for Proxy/Reflect and revocation.

Artwork lives only in the existing presentation registry, CSS Module and static SVG component. Card data contains only permitted motif metadata. Decoration is accessibility-hidden, pointer-inert and stable across pages, choices, sides and revisits. Shared content padding, header, action rail and typography remain unchanged.

A three-card actual-component sample covered a dense multi-page explanation, code quiz with all feedback choices and both recall sides before the final package audit. Its initial long code line was rewritten after a measured 320px overflow; no font reduction or shared-layout repair was used.

## Reproduce semantic verification

```sh
source "$HOME/.nvm/nvm.sh"
nvm use
node scripts/check-fe-1.4-semantics.mjs
# Equivalent shared entry point:
node scripts/check-content-semantics.mjs fe-1.4
```

The existing fe-1.3 semantic runner was extracted into a shared parameterized runner. The old command remains compatible through its wrapper. Each package keeps its own hash-bound expectations and editorial quiz rationale; verification does not depend on temporary authoring tools.

The runner parses actual authored arrays with the existing TypeScript dependency, executes every fenced JavaScript example in isolated Node VM contexts, compares typed console arguments and exception categories, and checks output-answer identity. Supplementary scenarios verify inline/prose claims and repairs, including state after a failed Proxy write. The one combined error/state question uses scenario review rather than pretending its answer is only an exception name. All alternatives receive separate editorial review; executing a snippet alone does not establish distractor quality.

Examples use standard JavaScript supported by pinned Node.js 24.21.0. Strict mode is the execution default; mode-sensitive questions name it. Sloppy-mode behavior is checked separately. There are no DOM/browser-only executable examples in this package. Source discussion of realms and built-in internal slots is kept bounded and is not presented as a new browser exercise.

## Primary-source review

Non-executable semantics and practical boundaries were checked against:

- [ECMAScript 2026: ordinary object operations and Proxy internal methods](https://tc39.es/ecma262/2026/multipage/ordinary-and-exotic-objects-behaviours.html).
- [ECMAScript 2026: functions and classes](https://tc39.es/ecma262/2026/multipage/ecmascript-language-functions-and-classes.html).
- [ECMAScript 2026: Object APIs](https://tc39.es/ecma262/2026/multipage/fundamental-objects.html).
- [MDN: standard public class field behavior and transpilation caveat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields).
- [MDN: ownership/enumerability API matrix](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties).

All 28 heading anchors in `fe-1.4-source-urls.ts` were checked against rendered GitHub HTML on 2026-11-01. Historical source verification is not reused as proof that new Mosaic snippets ran.

## Verification and owner review

Execution-backed checks on 2026-11-01 include 78 authored JavaScript fences plus 22 supplementary scenarios (100 Node executions), all 57 Quiz answer identities and editorial rationale coverage, content validation of 480 registered cards, lint, typecheck, the standard Turbopack production build, 36 ordering/session/progress regression tests and diff whitespace checks. The production build was made without temporary audit routes.

Portrait measurements cover 918 requested states with observed active page/side/selected-option checks. The minimum QuizCard bottom gap is about 87px. A long inline legacy expression and two 1px code-line overflows were fixed in content; the last two fixes were rerendered across all 12 affected page states. All horizontal excess is resolved in those measured states.

Exact geometry still includes 1px intrinsic-height discrepancies. Existing fe-1.3 FlipCard fixtures reproduce the outer article discrepancy (569/568 and 668/667). Existing fe-1.3 QuizCard fixtures also reproduce 12.48px prose / 10.88px code at 320×568, below the shared contract floors; at 375×667 the measured minimum is 14px / 12px. These are limitations, not a strict-contract pass or new owner acceptance.

All 918 portrait states were visually inspected in actual-component contact sheets, with the final 60 affected Quiz states inspected again after focused wording changes. Buttons measured 44px or larger for options and 48×48px for the action rail in representative phone samples; decoration is aria-hidden and pointer-inert. Textual correct/incorrect states remain independent of the palette.

Extended review covered dense examples at 1440×900, 667×375, 568×320 and 320×240, including all three compact Quiz panels. All 285 Quiz states were measured at 667×375. Fifteen selected states initially missed the 32px bottom gap; six cards received shorter option/feedback wording, preserving their meaning and IDs. Final minimum landscape gap is 37.87px. Scroller geometry still reports unused-padding excess on 228 selected states; an existing fe-1.2 Quiz reproduces 356/331px with visible content ending 47.29px above the bottom. This is not a strict dimension pass.

Ordinary owner Chrome confirmed actual browser zoom 400% (420×232 CSS px, devicePixelRatio 8 on the Retina display) for dense Info/Quiz/Flip states. Native screenshots became unreliable/gray after navigation; visual comparisons used the separately authorized isolated Playwright context at the same dimensions and the narrower 320×240 reflow size. The compact 568×320/320×240 review still reproduces the shared explanation-action bottom gap of about 7.2px, and small 1–2px intrinsic discrepancies. Existing cards reproduce the compact gap. Right-rail overlap remains a shared limitation; no shared typography, components or control placement were changed.

Ordinary mixed-feed verification used an isolated guest context, the actual UI and real local session endpoint (200/null), without an auth/backend mock. A complete round contained 480 unique cards: 100/120/136/124 from fe-1.1/1.2/1.3/1.4. New-only selection yielded 124 unique fe-1.4 cards; re-enabling the others restored all four packages in actual sequences. Client-side account/learning visits preserved the current presentation plus Quiz choice, Info page and Flip side. Switching away/back retained the current presentation. True reload produced a new runtime ID and a different balanced order with all four packages. These checks remain applicable after text-only refinements; no ordering/session code changed.

After the long pause, the two task-started servers returned unavailable/stalled auth responses despite a successful direct development database connection. Restarting those servers restored both real guest endpoints to 200/null. The isolated built-app server used a process-only localhost:3134 origin override; tracked configuration and account data were unchanged.

The owner explicitly authorized isolated Playwright verification after Computer Use repeatedly failed; this is a task-specific exception to the default owner-Chrome workflow. Screenshots, raw measurements, generated harnesses and logs stay outside Git. A complete strict mobile-contract pass is not implied by structural validation, performed reviews or accepted shared exceptions.

The existing shared compact typography/safe-zone and landscape rail limitations are tracked in [MOS-203](https://linear.app/joisadler/issue/MOS-203). The owner's prior acceptance of minor transparent-icon overlap does not waive other failures. New-content overflow must be fixed in this package; shared product behavior requires separate authorization.

Owner review uses the [ordinary development app](https://kissable-confetti-suffice.ngrok-free.dev/) with full registered content and actual selection/progress. The normal app returned HTTP 200 and the removed audit route HTTP 404 after fixture cleanup; the production route table contains no audit route. The temporary isolated server was stopped and the browser zoom restored to 100%.

Suggested owner phone scenario: select only 1.4 in My learning; read several jade Info pages, choose correct/incorrect Quiz answers and flip both recall sides; rotate portrait–landscape–portrait; re-enable the other packages and check their presence. Return from profile/settings to the same card, then reload to obtain a fresh feed. Report the device/browser/PWA and any clipping or controls overlap. Agent viewport checks do not establish this physical-device acceptance.

Instruction maintenance: AGENTS and the workflow now require the owner-authorized temporary caffeinate process by default on macOS; shared semantic-runner reuse is documented; rendered evidence must identify actual selected/pages/sides and exact dimension discrepancies; report writes/uploads must be confirmed before relying on saved evidence. Browser emulation is not physical-device validation. Final content/device acceptance and commit/push approval are separate; a push does not establish deployment validation.

The owner accepted the reported integration and authorized commit/push on 2026-11-01 after reviewing the results and disclosed shared limitations. This approval does not identify a physical device/browser or establish deployment validation. [MOS-40](https://linear.app/joisadler/issue/MOS-40) records the acceptance and saved commit.
