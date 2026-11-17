# Semantic verification

Read when preparing/executing examples or changing the shared runner. Authoring examples/expectations and substantive educational review belong to confirmed high. Routine final runs/diagnostics belong to confirmed medium; browser-hosted execution waits for the medium handoff. Keep inline semantic checks with the current content phase rather than switching for every command.

Execute every new checkable example and compare actual values/types/errors/order with comments, answer identity, explanations and Flip answers. Review every distractor separately. For non-executable claims use primary specifications/official docs. Report execution-backed, source-backed, manual and unverified evidence separately.

## Reuse the shared runner

`node scripts/check-content-semantics.mjs fe-1.7` reads hash-bound expectations/review rationales from `scripts/fe-1.7-semantic-expectations.json`. Keep existing package wrappers working. Extend narrowly rather than creating an engine per section; no extra dependencies/framework without discussion.

| Environment | Use |
| --- | --- |
| `node` | Isolated VM for browser-independent synchronous logic |
| `node-process` | Actual native APIs/realm; `async: true` awaits async completion/rejection |
| `node-module` | Real temporary ESM/CJS graph; default `main.mjs` or explicit `entry`; `files` maps dependencies to literal source or `{ "sourceHash": "..." }` authored fences |
| `browser` | Actual browser APIs/DOM/events, executed in the generated ordinary-browser harness |

Never fake `window = globalThis`, APIs/timers or module semantics. TypeScript claims require the compiler with explicit relevant settings, plus runtime JavaScript when relevant. React claims account for version, Strict Mode and build mode; HTML/CSS behavior needs actual rendering/interaction.

Use isolation, bounded timeouts and no owner data/unwanted network/persistent side effects. Await async order/completion; an unobserved Promise is not evidence. Assert intended error categories, not arbitrary failure or engine-specific message text. The log encoder alone cannot distinguish sparse holes from explicit undefined: assert presence/length separately. Native fixtures clean themselves up.

Keep necessary runner/expectations and brief commands in Git; logs/screenshots/harness output stay outside Git. Supplemental repair/edge scenarios are reported separately from authored fences. After changing a shared execution path, check an affected existing package for compatibility. Rerun changed assertions after fixes; a prose-only edit does not justify all unrelated semantic checks.
