# Handbook subsection integration workflow

Apply this workflow when the owner supplies `TARGET_SECTION` and requests its integration. The number is the only routine input: discover the exact title, source boundary and existing Linear issue rather than asking the owner to supply them. Do not start an integration merely because this document is being edited.

Work only on the requested subsection. Adapt its material into learning cards, integrate its visual identity, document coverage, verify the result and synchronize Linear. Adjacent subsections and unrelated product tasks are outside this authorization.

Repository locations in the owner's workspace:

- Mosaic: `/Users/yossiadler/Projects/personal/project-mosaic`
- Read-only source handbook: `/Users/yossiadler/Projects/personal/frontend-interview-preparation`
- Task source of truth: [Project Mosaic in Linear](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6)

Read current files rather than treating these locations, previous results or remembered implementation details as proof of current state. If a location has changed, establish the actual checkout before proceeding.

## 1. Inspect current instructions and state

Read:

- Root `AGENTS.md`, `README.md` and [the content authoring contract](README.md).
- Existing package documentation, current card types/components, the learning-section registry and presentation system.
- Relevant rules in [Study ordering](../study-ordering.md), [Study sessions](../study-sessions.md) and [Learning progress](../learning-progress.md).
- Applicable local Next.js guides under `node_modules/next/dist/docs/` before writing framework code, as required by `AGENTS.md`.

Check the active branch, Git status and existing uncommitted changes. Preserve other people's and unrelated changes. Communicate and author learning content in Russian; use English for repository documentation, source code, identifiers, code comments and commit messages. Retain canonical English technical terms at first mention and preserve APIs/code/output.

Use the Node.js version in `.nvmrc`. Run `nvm use` before npm commands; explicitly source nvm first when the shell requires it.

When resuming after an interruption, reconstruct completed, approved, verified and committed work from Git, Linear and available evidence. Identify changes since the last successful checks. Do not restart implementation or repeat unchanged stages just because the conversation resumed. Repeat affected or stale checks; repeat the full rendered audit when shared rendering changes could affect the whole package. Associate results with a commit or an identifiable working-tree state so their applicability is clear.

### Efficient execution and handoff

Use scripts for deterministic enumeration, measurement and capture instead of asking the model to perform one browser action per state. Reuse the existing semantic runner and any suitable browser audit runner. When browser automation needs extending, keep one reusable runner parameterized by section/card IDs, viewports and output directory; do not rebuild a package-specific audit system each cycle. Keep necessary reusable verification code in Git and raw evidence outside the worktree.

Return bounded results to the model: counts, failed assertions, affected card/state IDs and evidence paths. Keep full queues, raw API objects, server logs and measurements in temporary files. Project only needed fields from tool responses, including Linear. Inspect tool schemas selectively. Supply screenshots in manageable contact-sheet batches; enlarge individual captures only when needed to resolve a finding. File size or a truncated tool result is not proof that the entire output reached the model.

At the authoring-to-verification boundary or before an interruption, save a short handoff outside Git: target scope and approvals; base commit and changed files; remaining work; test commands, results and evidence paths; applicable content/rendering fingerprints; server/port and task-owned process details. Exclude credentials and owner session data. A verification phase can continue from this handoff in a fresh conversation rather than replaying the authoring history. Recheck live Git state and evidence availability before reuse. A fresh conversation does not reset the usage allowance.

Keep the existing approval gates. This handoff is a compact continuation record, not another tracker or a reason to repeat completed work.

## 2. Synchronize Linear and keep authorization boundaries

Find the existing issue for `TARGET_SECTION`; read its description, acceptance criteria, parent and material comments. Do not create a duplicate. Move it to the appropriate working status when implementation begins. Record the approved scope and significant decisions.

If Linear is unavailable, report this immediately. Independent read-only source investigation may continue; do not silently substitute a local tracker or claim a failed update succeeded.

Coverage/visual approval authorizes implementation of this subsection within that scope. Discussion of an improvement, “we will do that later,” creation of a follow-up issue, or approval to commit does not authorize starting the next task.

Record unrelated findings in an existing or new focused Linear issue after checking for duplicates. Do not silently fix them in the content package. If a finding blocks integration, show evidence and propose the minimum remedy; obtain separate approval for shared application behavior changes.

The completion report in Linear must include integration, coverage/counts, technical and visual results, limitations, accepted exceptions and the actual commit once created. Do not mark Done before criteria and required owner review are satisfied. Keep backlog/status in Linear, not a duplicate documentation tracker.

## 3. Establish source scope and approve coverage

Resolve the exact title and boundary from the source `CURRICULUM.md` and coverage documents. Inspect the relevant handbook chapter, question-bank questions/answers, exercise prompts/solutions, summaries, reviews, existing infographic and source readiness/approval records. The handbook checkout is read-only; preserve work on all other subsections.

A placeholder is not a substantive source. Explain missing readiness or material contradictions before bulk authoring. Adapt rather than mechanically copy. Source approval does not establish Mosaic availability or acceptance.

Present a coverage map covering:

- Core concepts and practical skills.
- Common mistakes, important distinctions and limits.
- Proposed InfoCard/QuizCard/FlipCard distribution.
- Overlap with integrated packages and the new teaching objective where overlap is necessary.
- Intentionally excluded topics and their reasons.

Present the visual proposal alongside this map and obtain owner approval before bulk authoring.

## 4. Author standalone cards and validate a small sample first

Use the existing types for their intended purpose:

- **InfoCard:** one clear idea; divide longer explanations into coherent authored horizontal pages.
- **QuizCard:** a comprehension question, exactly four plausible alternatives, exactly one unambiguous correct answer and a concise explanation after answering.
- **FlipCard:** a clear recall question and useful answer, exactly two sides.

Choose counts by meaningful coverage, not a round quota. Avoid duplication for volume. Every card must stand alone in a shuffled feed, supply enough context, explain causes, include practical examples/misconceptions and require no mobile code typing. Use natural Russian. State environment, version and execution mode whenever they affect the answer.

Avoid multiple correct choices, wording clues, answers revealed by comments in question code, unjustified categorical claims and repeats without a new learning objective. Move detailed Quiz explanations to a separate InfoCard when needed. Use the existing `readMoreUrl` for a real, verified page/anchor; never invent a URL.

After coverage/visual approval and before bulk authoring, prepare a small sample in the actual components: a multi-page InfoCard, a QuizCard with code and feedback, and a FlipCard. Include the densest expected example. Check both required mobile viewports, selected Quiz feedback and both Flip sides. Use the findings to set practical text/code lengths across the package. Obtain further approval if the sample requires a substantial departure from the approved direction. Do not build separate components/architecture for the sample. This early check does not replace the final full audit.

## 5. Execute examples and preserve reproducibility

Typecheck, structural validation, a successful build and reasoning alone do not establish educational correctness. Execute every new example whose behavior can be checked programmatically. Compare actual values and types with expected-output comments, the correct Quiz choice, explanations and Flip answers. Capture real `console.log` arguments before text formatting when necessary.

Represent JavaScript values, not console display conventions:

```js
console.log("1" + 2); // "12"
console.log(typeof missingName); // "undefined"
console.log(undefined); // undefined
```

Double-quote string results, including hypothetical string distractors. Do not quote actual numbers, booleans, `null`, `undefined`, BigInt values or exception names. Distinguish one string `"A,B,C"` from separate string results `"A", "B", "C"` and mixed output such as `7 / "seven"`. Apply the rule to comments, options and explicit values in explanations.

Review every distractor separately for plausibility, meaning and exclusivity. Executing the original snippet proves neither distractor quality nor unique correctness.

Choose the real environment:

- Node.js for browser-independent logic.
- An actual browser for DOM, browser APIs, events and browser behavior; never substitute `window = globalThis`.
- The TypeScript compiler with explicit relevant settings for compile-time behavior; check runtime JavaScript separately.
- React with its version, Strict Mode and build mode accounted for.
- Actual rendering/interaction for HTML and CSS.

For asynchronous examples, verify actual order and completion. Do not replace timers/APIs with stubs that change the semantics. Isolate intentional errors and assert the expected exception category, not an arbitrary failure or engine-specific wording. Use isolation and reasonable timeouts; avoid user-data changes, unwanted network requests and persistent side effects. Verify non-executable claims against primary specifications or official documentation.

Keep a reproducible semantic check and brief run instructions. Inspect and reuse existing tools first; otherwise add a simple script consistent with the project. Do not introduce dependencies, a complex framework or a separate verification infrastructure per package without discussion.

For compatible JavaScript packages, reuse `scripts/check-content-semantics.mjs` with a package ID and package-specific expectations; see the [shared semantic-check convention](README.md#result-notation-in-examples-and-quiz-options). Preserve existing wrapper commands when extracting or extending a shared runner.

Keep necessary verification code and concise documentation in Git. Store screenshots, raw measurements, logs, temporary pages and diagnostic output outside the working tree, for example in an OS temporary directory. Do not add `verification`, `artifacts` or similar output directories without separate approval. For durable evidence use available Linear attachments or another agreed location; do not add dependencies for uploads or imply temporary files are permanent/cross-device links.

Report evidence separately as execution-backed, primary-source-backed, manually checked or unverified.

## 6. Integrate the approved visual identity

Inspect [Optional visual motifs](README.md#optional-visual-motifs), `src/components/learning-feed/section-presentation.ts`, `section-presentation.module.scss`, `CardDecoration.tsx` and integrated packages.

Before bulk implementation, propose a palette and a primary geometric motif tied to the subsection, with additional motifs only for substantially different subtopics. Show the direction on all three card types and obtain approval together with coverage. Do not independently make substantial new visual-direction decisions.

Implement approved artwork in CSS/SVG through the existing presentation system. Add at most two or three optional motifs when justified. Select by the primary learning objective rather than random variety. Keep motifs stable across pages, answer reveal, flip sides and revisits. Card data may contain only permitted `visual` metadata, never colors, SVG markup, coordinates or styles.

Decoration must be hidden from accessibility APIs, pointer-inert, readable/low-noise on small screens and consume no content space. Preserve full-width content with symmetric padding, the vertical icon-only action rail on the right, header/indicator placement and mobile content space. Do not rearrange controls or redesign the app. Discuss substantial presentation-system changes rather than extending architecture for one package.

Check dense prose, code, selected feedback, all pages/sides, phone, desktop and landscape layouts.

## 7. Register, document and verify mixed-feed integration

Use `fe-<TARGET_SECTION>` consistently:

- `src/content/fe-<TARGET_SECTION>-info-cards.ts` and matching quiz/flip files.
- Stable meaningful card IDs under that namespace.
- Identifier-safe exports, for example `feSection1_4InfoCards` for `fe-1.4`.
- `docs/content/fe-<TARGET_SECTION>/`.

Derive fields/format from current types, packages and validator. Register the subsection in `src/content/learning-sections.ts` with the correct `chapterId`; add a top-level `learningChapters` entry if introducing a new chapter. Preserve existing card/option/section IDs unless a separately justified change is necessary: progress can depend on them.

Never reset or modify owner progress, accounts, sessions or production data for testing.

Create package documentation and `COVERAGE` mapping source topics/questions to actual card IDs, exclusions/reasons, sources, counts by type, semantic-check instructions, concise visual results and material limitations/accepted exceptions. Update root README availability, package/chapter/overall counts, links and Current status. A subsection is available only after actual registration/integration, not merely source completion. Do not duplicate the Linear backlog.

Use isolated data to check the actual ordinary feed:

1. Select several subsections including the new one.
2. Select only the new subsection.
3. Re-enable the others.
4. Perform a true application reload.
5. Return from learning settings within the same open runtime.

Verify actual card sequences, not just checked boxes/counts. New content must participate in current ordering; other selected subsections must not disappear because of test restrictions; registry order or an integration error must not append the new package as a solid block. Consider inventory sizes, progress, completed-card exclusion and current ordering priorities: diversity is not strict alternation or equal quotas in every short window. Use temporary diagnostics if needed, without lasting product UI changes.

Preserve the current lifecycle: a true reload/new runtime produces a fresh balanced feed; ordinary backgrounding, focus and client-side navigation retain the current card/interactions; preferences, progress and repetition evidence persist independently. Ordinary progress changes must not spuriously restart the feed. Do not change the ordering algorithm without separate approval.

## 8. Audit every rendered state and preserve owner access

For initial integration, audit every new card at both `320 × 568` and `375 × 667` CSS pixels. Existing packages need only relevant regression samples and mixed-feed verification, not another full inventory audit:

- Every authored InfoCard page.
- Each QuizCard unanswered and after selecting each of its four options.
- Both FlipCard sides.

### Reuse evidence and rerun only affected states

Preserve a coverage manifest associating each checked card/state and viewport with the card-content fingerprint, relevant rendering/style/fixture fingerprint, observed state, result and evidence path. A commit or working-tree reference alone is insufficient to decide which evidence a later change invalidates. Hash only relevant dependencies; including the whole changing content registry in every rendering fingerprint would unnecessarily invalidate all cards.

- If only individual cards' text, code, options or answers change, rerun their affected semantic assertions and rendered states at the applicable viewports. For a Quiz option/explanation change, include unanswered and all selected-option states of that card; for a page/side-local edit, include that page/side and any affected navigation or pagination states. Do not repeat other cards or packages merely because the package file or commit changed.
- A section palette/motif change invalidates the affected section's visual evidence. Shared typography, Markdown, card components, layout or rendering-fixture changes expand the audit to the states those changes can affect, including relevant existing packages. If the impact cannot be bounded reliably, broaden the check and explain why.
- Registry/selection/ordering changes require appropriate integration and mixed-feed checks; they do not by themselves invalidate unchanged card-layout evidence. Continue running required structural, lint, type and build checks for the final tree.
- Missing, unreliable or incompatible evidence requires checking the uncovered states. Otherwise combine valid earlier results with targeted reruns; the final report should state initial coverage, rerun scope and the reason for any broader audit. Do not present reused evidence as a fresh execution.

### Batch capture and inspect actual components

Prefer a reusable gallery/contact-sheet view that renders several real card components and states on one page. Give every tile the exact target viewport, the production layout/styles and an unambiguous card/state label outside the measured area. Batch state enumeration, assertions and capture in the runner; wait for fonts, rendering and transitions to settle, and verify the observed page/side/selected option before capture. Inspect every required state, using readable contact sheets and full-size captures for dense or suspicious tiles. Batch presentation does not reduce the required coverage.

A gallery must not replace ordinary-feed integration and interaction checks. If its surrounding layout, transforms or scaling differ from production, confirm affected geometry in the actual feed before drawing conclusions. Scope temporary fixture routes to isolated verification and remove them before final build/review; reuse the runner rather than retaining test UI in the product.

Combine visual inspection with `scrollWidth/clientWidth` and `scrollHeight/clientHeight` measurements. Check text/code/options/feedback are not clipped, no horizontal overflow (including code), no nested vertical scrolling, applicable typography floors and touch targets, the QuizCard bottom safe gap, action/header/indicator conflicts, long identifiers/Markdown/wrapping, motif readability and meaningful contrast. Follow current [mobile and compact-layout requirements](README.md#shared-mobile-content-contract), including landscape, text enlargement and reflow. One convenient screenshot is insufficient.

Confirm that evidence writes/uploads actually succeed and that the saved report contains the expected states before relying on it.

Record the observed active page/side and selected option as well as the requested state. An attempted navigation or a fixture parameter does not establish that the intended state actually rendered. Report exact dimension mismatches, including one-pixel discrepancies; distinguish intrinsic/fractional geometry from clipped or scrollable learning content without silently treating a tolerance as a strict pass. If accessibility snapshots advance while screenshots remain stale, do not count the unseen states as visually reviewed. Restore reliable capture or switch to another available, permitted tool, then inspect only the missing or invalidated states.

Fix authored overflow by shortening, reformatting or splitting content. Never conceal learning text with clipping/line-clamp, lower fonts below applicable requirements or alter global typography to accommodate a long example.

For a visual deviation, first determine whether new content introduced it or existing cards already exhibit it. Fix new-content problems in the content first. Do not automatically declare existing behavior a blocker. Before proposing shared repairs, show the exact card/state, viewport and screenshot, explain practical impact and the minimum change, and obtain separate approval for shared typography/components/control placement.

Respect documented owner-accepted compromises. Minor text overlap by a transparent action icon was accepted on October 26, 2026 and does not alone justify rearranging the layout. Do not generalize that acceptance to other problems. Record actual requirement failures honestly: an accepted exception is not a clean pass.

### Browser choice and owner visibility

The owner authorizes choosing the fastest reliable available browser tool, including Playwright from the start; automated checks do not have to use owner Chrome. Prefer headed mode with a visible browser window so the owner can observe progress. Use headless mode only when a visible surface is unavailable or unsuitable, and state this limitation. An isolated Playwright browser context for synthetic checks is allowed; do not change the owner's persistent browser profile/settings or close owner tabs. Tool permissions still apply; tool choice does not authorize public exposure, uploads or owner-data changes.

Preflight browser availability, reliable capture and state observation before a long audit. After at most two recovery attempts for the same stale capture/control failure, switch to a reliable permitted alternative. If none is available, report the concrete blocker rather than continuing a blind retry loop. Keep valid earlier evidence and resume missing states.

Isolate synthetic progress/preferences from owner origins/accounts. Remove temporary pages/probes/backend or auth fixtures before completion; they must not survive in the final diff or review environment.

On macOS, always start a temporary `caffeinate -d -t 1800` process before browser verification, as authorized in `AGENTS.md`. Renew it when needed and stop only the process started for this task after browser work. Keep persistent sleep settings unchanged. Preventing sleep cannot unlock an already locked session; verify that the browser surface is available before continuing.

Before starting servers, inspect existing processes/ports, the owner's active server and the ngrok upstream/address if present. Prefer the existing environment. Keep the normal dev server and established ngrok access working. Isolated testing must not replace the owner's app with a fixture, restricted inventory or mock backend. Explain any separate technical hostname/port and its purpose.

For long audits, route task-started server logs to a temporary file and inspect bounded excerpts. Unconsumed tool output, including repeated browser-extension hydration warnings, can stall the server; do not change the owner's browser extensions or persistent logging settings to suppress it.

For owner acceptance provide the ordinary working ngrok app URL, with full registered content subject to real selection/progress, no diagnostic UI or test restrictions. Verify the address serves the current implementation. Leave the review tab open. Save representative screenshots and measurements outside Git; attach accessible evidence to the report/Linear when supported.

Viewport emulation is not a physical-phone check. Provide a short explicit owner device scenario and record the actual response separately. A statement that everything works does not identify a device, browser, tested commit or deployment unless the owner supplies that information.

## 9. Run final checks and inspect the whole diff

Run with the pinned Node.js version:

```sh
nvm use
npm run validate:content
npm run lint
npm run typecheck
npm run build
```

Also run semantic checks, mixed-feed checks, applicable existing tests for changed application code, `git diff --check`, and registry/COVERAGE/README/count consistency checks. Establish complete new-package visual coverage through the initial audit plus targeted reruns under section 8; do not restart the full audit as a final-check ritual. Repeat affected checks after fixes and retain valid results for unchanged stages. Final evidence must apply to the final tree.

If the standard build is environment-blocked, report the exact reason and alternative validation. Do not change project configuration merely to bypass an environment limitation.

Review the entire diff for secrets, temporary pages/probes, restricted inventories, mock backend/auth behavior, unapproved screenshots/raw logs, caches, accidental files and unrelated changes. Verify retained scripts/docs are necessary and follow project structure. Track unrelated findings in Linear instead of silently repairing them.

## 10. Owner review, commit/push and stop

Present a Russian report containing:

- Subsection number/title and Linear issue link.
- Card counts by type, covered topics and deliberate exclusions.
- Approved visual direction.
- Executed examples/environments and source/manual/unverified evidence.
- Structural, semantic, rendered and mixed-feed results.
- Limitations and explicitly accepted compromises.
- A short owner-review scenario, the normal ngrok URL and representative screenshots.
- Readiness for commit.

Do not call the package fully ready when required checks remain incomplete. List accepted exceptions separately from passed checks. Proactively propose commit and push once ready; perform them only after owner approval. Recheck status/diff, stage only agreed files and preserve unrelated work.

Before the final report, review this workflow and the content contract for lessons from the integration. Update instructions when actual evidence reveals a reusable omission or ambiguity; the owner's short invocation explicitly requests this maintenance. Keep changes focused, in English, and included in the reviewable diff. Prefer links to existing contracts over competing rules. Do not weaken checks to turn failures into passes, silently change approved product behavior, add speculative process or create a backlog here. Propose substantial policy changes for approval; put unresolved product work in Linear. Summarize instruction changes in the report, or state that no update was needed. Do not create edits merely to satisfy a ritual.

After approved commit/push, verify success, report the actual commit/branch, update Linear with the commit/results/owner acceptance, set only the justified status and report Git state. A push does not establish deployment success. Complete this save/report cycle and stop. Do not begin any next task, even if previously discussed or recorded in Linear, without a separate owner instruction.

The initial integration response must present source/state findings, coverage and visual direction for approval before bulk authoring.
