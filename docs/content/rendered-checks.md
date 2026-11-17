# Rendered content checks

Read in the confirmed medium phase with [browser protocol](../verification.md). Structural validation estimates budgets; actual rendering is the fit authority. Preserve product behavior; a content task does not authorize global layout repairs.

## Layout and accessibility

No clipped/line-clamped learning text, nested vertical scrolling or horizontal overflow (including code). Standard mobile prose/options/feedback ≥14px, code ≥12px; existing reviewed extreme compact/zoom tokens may remain, never shrink them further to fit new text. Touch targets ≥44×44 CSS px; last visible Quiz element ≥32px above viewport bottom. Check header/action/pagination conflicts, long identifiers/Markdown, contrast, decorative motif noise and focus visibility.

Measure `scrollHeight/clientHeight` and `scrollWidth/clientWidth`; report exact excess, including 1px rounding/intrinsic geometry. A tolerance or accepted exception is not a strict no-overflow/accessibility pass. New content failures are fixed by shortening/reformatting/splitting source, not lowering fonts, runtime Markdown splitting or hiding text.

Known MOS-203 exceptions remain explicit: sampled 320px compact typography uses 12.48px prose/10.88px code; extreme compact 11.2px/9.28px. Minor transparent right-action overlap was owner-accepted; that does not waive other defects. For a new shared-layout problem provide card/state, viewport, screenshot, practical impact and minimal proposed repair, then obtain separate approval before changing shared typography/components/control placement.

## Required coverage

For each new card at **320×568 and 375×667** inspect every Info page, Quiz unanswered plus each of four choices, and both Flip sides. Use representative desktop, landscape, narrow/short reflow, real browser zoom up to 400%, keyboard and existing-package regression checks. Required states must be visually inspected, not merely measured.

At extreme compact sizes, Info keeps its authored pages, Flip exactly two sides; Quiz may use existing horizontal question/options/feedback panels with feed-owned selection. Check keyboard panel access and explanation exposure. Preserve reduced-motion/focus semantics and manifest/landscape fallback. No viewport-dependent authored subpages.

Check the ordinary feed separately with synthetic data: new+other sections, only new, re-enabled sections, true reload, then same-runtime profile/learning return. Inspect actual rendered card sequences and stable Info page/Quiz choice/Flip side/presentation IDs. Mixed diversity is not strict alternation/quota; do not change ordering or use a restricted registry to force results. Verify keyboard Quiz arrows move focus without submitting/awarding understanding. New content must not form an accidental appended block or hide other selected subsections. Ordinary navigation checks do not replace physical backgrounding tests.

## Evidence reuse and capture

Manifest: per-card content + relevant rendering/style/fixture fingerprints, viewport, requested/observed state, findings and evidence path. Hash actual dependencies, not the entire changing registry. Set measurement schema (including exact 1px) before the dense sample; smoke-test helper behavior/capture readability on representative existing content before a full run.

| Change | Recheck |
| --- | --- |
| Card text/code/options/answer | Changed semantic assertions and affected states/viewports; Quiz options/feedback include unanswered + all choices |
| Section palette/motif | That section's visual evidence |
| Shared rendering/styles/fixture | Actual impacted states plus relevant existing packages; broaden when impact cannot be bounded |
| Registry/selection/ordering | Applicable tests + ordinary mixed-feed checks; unrelated card layout evidence remains valid |
| Docs/approval only | Docs/diff checks; retain valid app/browser evidence |

Missing/stale/incompatible evidence is checked; valid evidence is retained. Report fresh executions and retained states separately. Do not rerun the full audit as a completion ritual or infer allowance savings from state counts.

Contact sheets render real components at exact labeled tile viewports. Wait for fonts/transitions and verify state before capture. Surrounding transforms/scaling must not distort geometry; resolve suspicious measurements in the ordinary feed. Use readable one/two portrait-sheet batches; reduce columns for wide desktop captures. Keep large logs separate. Enlarge only unclear/dense tiles. Persist the inspected-image index after each confirmed batch; truncated/stale images do not count and unchanged inspected evidence is not reloaded after a handoff.

## Reusable CLI tools

- `scripts/run-content-browser-audit.mjs`: JSON config host; `section`, `output`, optional `base`, installed `playwrightModule`, `channel`, `headless`, `mode` (`audit`/`integration`/`zoom`). Owns temporary macOS caffeinate and browser cleanup.
- `scripts/audit-content-browser.mjs`: `ids`, `viewports`, `batchSize`, `reuse`, manifest and contact sheets.
- `scripts/check-content-browser-integration.mjs`: real guest flow; supply `allSections`. Waits for actual controls/state.
- `scripts/check-content-browser-zoom.mjs`: disposable profile/extension; `executablePath`, explicit `zoomCards` states. Tests actual Chrome tab zoom, not screenshot scaling.
- `scripts/content-audit-fixture.tsx`: actual-component fixture; mount a temporary route only while checking, remove before final build/review. Follow the runner's route/parameter contract. Optional `jobs` reuse one browser for audit/integration.

Read existing code before extending it; do not recreate hosts/fixtures per package. Keep raw configs/evidence outside Git and run instructions in the package notes. [Final repository checks](../development.md#choose-checks-by-impact) and [release](release.md) complete the task.
