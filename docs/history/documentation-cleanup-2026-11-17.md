# Documentation cleanup — 2026-11-17

Owner-authorized context reduction and stale-documentation cleanup. This is a reference audit, not another startup document, task tracker or authorization for a new content section.

## Entry-point reductions

Baseline is the working tree immediately before cleanup, including the already requested workflow/explicit reasoning-wait edits.

| Document | Before, characters | After, characters |
| --- | ---: | ---: |
| Project AGENTS.md | 10,097 | 2,155 |
| Root README.md | 22,924 | 1,792 |
| Content README.md | 14,458 | 1,273 |
| Section workflow | 35,528 | 5,113 |
| Total | 83,007 | 10,333 |

These four entry documents are 87.6% shorter; this is a text-size result, not a measured allowance saving. Only applicable entry points/phases should be read. Detailed contracts remain available on demand. Global Codex AGENTS.md was separately reduced from 1,458 to 661 characters; its personal-reference verification/update rules were preserved in `~/.codex/references/personal-context.md`. The local Mosaic content skill is a short route to the canonical workflow, not a second full procedure. Local files outside the repository are not in its Git diff.

## Rule locations after cleanup

| Preserved requirement | Home |
| --- | --- |
| Russian communication/content; English code/docs; Git/dependency/visual approval boundaries | Project/global AGENTS and product contract |
| Wait after high/medium reminder; explicit acknowledgment; preserved phase through resumption | [Section workflow](../content/section-integration-workflow.md#reasoning-reminders-at-phase-boundaries) and local skill |
| Source approval + coverage/visual approval; dense sample before bulk authoring | [Section workflow](../content/section-integration-workflow.md) |
| Stable fe namespace/IDs, standalone cards, individual distractors and typed result notation | [Authoring](../content/authoring.md) |
| Native/browser/TS/React semantics and reproducible hash-bound checks | [Semantics](../content/semantics.md) |
| Every new page/quiz choice/flip side at both phone sizes; zoom/keyboard; exact1px and honest MOS-203 exceptions | [Rendered checks](../content/rendered-checks.md) |
| Per-card fingerprints, affected-state reuse, readable indexed inspection | [Rendered checks](../content/rendered-checks.md#evidence-reuse-and-capture) |
| CLI first; MCP last resort; caffeinate; isolated data; retained owner server/tunnel; no temporary route in review | [Browser protocol](../verification.md) |
| Appropriate final checks, sequential typecheck/build, no full rerun for docs-only changes | [Development](../development.md) |
| Owner review + commit/push approval, live remote verification and Linear synchronization | [Release](../content/release.md) |
| Guest/account isolation, fresh reload vs stable live queue, read-only review, explicit awards, scope limits | [Product contract](../product-contract.md) and affected subsystem |
| Auth provisioning vs ownership vs verification; progress sync vs presentation vs reset UI | [Docs index](../README.md) routes |
| Earlier dates, device scope, ratios and verification incidents | Affected package/history notes, never a current-status claim |

## Stale material corrected

- Removed ROADMAP's 220-card snapshot and superseded cross-reload navigation restoration; current availability comes from the runtime registry/catalog.
- Removed obsolete “future” scope claims for implemented sound/haptics, accordions/loading/illustrated-empty-state presentation; implementation is not physical-device acceptance.
- Removed changing card/section counts and section lists from the root README, including its stale fe-1.7 “review pending” row. The catalog reports registration/counts and routes acceptance to Linear/dated package evidence rather than cloning a status tracker.
- Removed the copied full 19-domain source curriculum table; its canonical source remains linked. No source handbook files were changed.
- Marked the two-palette contrast report as historical; its ratios do not establish current seven-palette conformance.
- Moved earlier auth/feedback test narratives to history. Technical configuration, ownership, mutation/conflict/reset details remain in their operation-specific references.
- Kept the Next.js-generated AGENTS block intact. Old plans/package baseline counts remain dated evidence rather than being rewritten as current tests.

## Verification

Local Markdown paths/anchors, documented npm script names, entry-size calculations, runtime/catalog counts, preserved Next.js block, skill/frontmatter/routes and explicit reasoning-wait rules were checked directly. `npm run validate:content` validates 815 cards; `git diff --check` passes. Standard skill validation is unavailable in the current Python environment without PyYAML, so direct structure/link checks were used without installing dependencies. App code, dependencies, credentials and runtime behavior are unchanged; app build/browser tests are reused from the accepted content delivery. The owner approved commit/push on 2026-11-17 after review with “Супер. Коммит, пуш.”
