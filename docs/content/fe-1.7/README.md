# Frontend Interview Preparation pack fe-1.7

Subsection **1.7. Modules, Errors & Serialization** adapts the approved handbook into independent Russian learning cards. The owner approved [coverage and visual direction](PLAN.md) on 2026-11-17. [MOS-43](https://linear.app/joisadler/issue/MOS-43) tracks integration. On 2026-11-17 the owner confirmed review and approved commit/push with “Проверил, одобряю.” The device/browser and individual test scenarios were not specified.

**103 cards: 33 InfoCards (98 pages), 46 QuizCards and 24 FlipCards.** Each phone viewport has 376 states: 98 pages, 230 unanswered/selected quiz states and 48 flip sides. Registration under `fe-1` brings the inventory to **815 cards across seven subsections**. [COVERAGE.md](COVERAGE.md) maps every actual card ID to related chapter, question-bank and practice objectives.

## Sources and boundaries

The read-only source checkout was clean `main` at `c60ffec`; its section review records owner approval on 2026-11-05. Source acceptance is separate from Mosaic acceptance.

- [Chapter](https://github.com/joisadler/frontend-interview-preparation/blob/main/handbook/01-javascript-and-async-programming/07-modules-errors-and-serialization.md): 24 teaching questions, inventory `JS-41–JS-44`.
- Companion Question Bank and answers: `JS-MODULES-Q01–Q24`; practice prompts and solutions: `JS-MODULES-EX01–EX10`.
- Section summary and English A4 SVG/PDF infographic.

All 24 source fragments matched the rendered GitHub heading anchors on 2026-11-17. Cards adapt the objectives for mobile reading, repair decisions and recall; long exercises are not reproduced verbatim.

Coverage includes ESM scope, exports, live bindings, graphs/cycles, dynamic import and top-level await; tree-shaking boundaries; CommonJS and version-dependent interoperability; throw/finally/async handling boundaries, arbitrary causes and handling policy; JSON losses/hooks/precision, explicit DTOs, schema checks and integrated module/data error attribution. General scope/object/copying/collection material stays with earlier packages. General GC, scheduling, Promise coordination and full bundler/package configuration remain excluded. No runtime framework or dependency is introduced.

## Presentation

Approved dusty rose/graphite palette: accent `#d8afbf`, base `#2a2229`, floor `#141115`. Default `boundary` links file contours; `causes` links context frames; `payload` shows a value/text boundary. The existing typed SVG/SCSS system supplies these static, faint, accessibility-hidden, pointer-inert decorations. Shared typography, symmetric padding, feedback colors and the vertical right-side icon rail are preserved.

## Semantic evidence

```sh
source "$HOME/.nvm/nvm.sh"
nvm use
node scripts/check-fe-1.7-semantics.mjs
# Equivalent:
node scripts/check-content-semantics.mjs fe-1.7
```

**82 executions pass on pinned Node.js v24.21.0:** 70 authored-fence uses (69 unique hashes) and 12 supplementary scenarios. Expectations bind to exact authored source hashes and typed logs/error categories. The narrowly extended shared runner supports `environment: "node-module"`: bounded native child processes execute real temporary `.mjs`/`.cjs` entry/dependency files and clean them afterward. Files may refer to another authored fence by hash. Imports are not simulated as VM expressions. The unchanged fe-1.6 command passed 63 executions as a compatibility check.

Supplementary cases cover live-binding default export, star/default re-export, valid deferred cycle, conditional-exports split state, arbitrary cause, finally throw, JSON hooks and root/property-list behavior, precision through reviver context, dangerous property names, and integrated parse/schema errors. Code/output quizzes are checked against executed results; all four alternatives also received separate editorial review. Execution does not prove conceptual wording or every runtime's compatibility.

Runtime-specific cards identify Node.js 24.21.0 rather than promising behavior for a whole historical release branch. Native `require(esm)` cases distinguish synchronous graphs from transitive top-level await. Browser loading, tree-shaking and schema-policy statements are source/manual evidence; no production bundler, network client or compatibility matrix was tested.

## Browser evidence and reuse

Verification uses CLI/direct-library Playwright, with isolated guest contexts and temporary macOS `caffeinate`. No browser MCP or additional dependency was used. Reusable entry points are [run-content-browser-audit.mjs](../../../scripts/run-content-browser-audit.mjs), [audit-content-browser.mjs](../../../scripts/audit-content-browser.mjs), [check-content-browser-integration.mjs](../../../scripts/check-content-browser-integration.mjs) and [check-content-browser-zoom.mjs](../../../scripts/check-content-browser-zoom.mjs).

The CLI host takes a JSON config path with `section`, `output`, optional `base`, `playwrightModule`, `channel`, `headless`, and `mode` (`audit`, `integration`, `zoom`). Audit accepts `ids`, `viewports`, `batchSize`, `reuse`; integration requires `allSections`; zoom requires an extension-capable `executablePath` and `zoomCards` with explicit state. Optional `jobs` reuses one browser for sequential audit/integration jobs. Restore the temporary fixture route described in the shared audit runner only during checks, then remove it before owner review/build. Raw manifests, logs and screenshots stay outside Git under `/private/tmp/mosaic17/`.

| Check | States | Result |
| --- | ---: | --- |
| 320×568 and 375×667 | 752 | All new pages, quiz alternatives and flip sides measured; no overflow >1px, outside content or page/state errors |
| 568×320 and 320×240 | 20 | Representative three card types; geometry clear, inherited typography exceptions reported |
| 1280×800 | 10 | Representative three types; geometry clear |
| Existing fe-1.6 at both portrait widths | 20 | Representative regression sample; clear geometry |
| Real Chrome 400% tab zoom | 5 surfaces | Three types plus compact Quiz options/feedback panels, effective width 320px; keyboard panel access |

Portrait measurements record five exact 1px excesses separately, minimum Quiz bottom clearance 72px and minimum measured action target 44px. The runner now records `onePixelExcess` and invalidates older measurements lacking that field. The initial dense 20-state sample therefore did not replace the fresh complete metric audit.

After the full 752-state audit, formatting-only fixes to one InfoCard and one FlipCard removed compact inline-code excess without shrinking fonts. Targeted portrait reruns executed **6/752** and **4/752** states, retaining **746** and **748** respectively. These are rendering rerun savings, not measured reductions in model tokens or the owner's allowance. Contact-sheet inspection is indexed separately; unchanged inspected evidence is retained.

An isolated ordinary guest flow checked a 42-card mix of fe-1.1/fe-1.6/fe-1.7, 24 cards with only fe-1.7 selected, all seven sections across 56 cards after re-enabling, and a fresh 12-card sequence after reload. Info page, Quiz choice and Flip side/presentation identity survive client visits through profile/learning. Keyboard selection does not auto-award understanding. Guest auth returns HTTP 200/null; no page errors. Representative ordinary screenshots are in `integration/ordinary-contact.png`.

### Inherited limitations

[MOS-203](https://linear.app/joisadler/issue/MOS-203) remains separate: 230 portrait states use shared compact typography below the 14px prose / 12px code standard (observed 12.48px / 10.88px). Extreme compact samples retain 11.2px prose / 9.28px code; their 20 typography findings are not a strict accessibility pass. Minor overlap from transparent right-side actions follows the existing owner-accepted compromise. No shared layout/font change is included.

Emulation and desktop zoom do not establish physical iPhone/PWA, safe-area, real backgrounding or production-deployment acceptance. Owner review should select only 1.7 in “Моё обучение”, inspect an InfoCard's pages, answer a Quiz, reveal both Flip sides, return through profile/learning, re-enable other sections and reload. Record the actual device/browser and response separately. The owner subsequently confirmed review and authorized commit/push on 2026-11-17; that confirmation does not identify a device/browser or establish deployment acceptance.

## Final repository checks

Pinned Node.js v24.21.0: `validate:content` (815 cards), lint, typecheck, 82 fe-1.7 semantic executions, 63 unchanged fe-1.6 semantic executions, 16 ordering tests, 10 session tests and `git diff --check` pass. Standard Turbopack production compilation/static generation completed; the first command then stopped on Next.js's security advisory notification. A repeat of the same `npm run build` completed successfully without changing dependencies or configuration. The installed Next.js 16.4.3 still requires a separate security-upgrade review; a successful build does not resolve that advisory. The temporary audit route is absent from the final build.

Final post-cleanup smoke through the existing development tunnel returned HTTP 200, displayed the real fe-1.7 selection control and 815-card total, and returned guest auth 200/null. The temporary route returned 404 both locally and through the tunnel. Browser initialization was awaited before clicking the accordion; early smoke-script attempts clicked before guest initialization and used an incorrectly escaped selector. These script failures did not change owner data.

The final portrait manifest has 752 visually inspected states across 65 retained/updated contact sheets; the inspection index also covers current edge, desktop, existing-package and zoom/ordinary-feed evidence. Rendering fingerprint: `6588fa6f2cbc8ece05f8039a0ee2ef13deed1c3c8d50cc69053faf19ef3d613d`. Local evidence index: `/private/tmp/mosaic17/inspected-images.json`. The ordinary review URL is https://kissable-confetti-suffice.ngrok-free.dev/.
