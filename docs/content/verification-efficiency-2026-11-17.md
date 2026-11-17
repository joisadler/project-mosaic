# fe-1.7 execution efficiency review

The owner requested this retrospective on 2026-11-17 after accepting fe-1.7. It does not authorize another content section or a dependency upgrade. The canonical rules remain in [the integration workflow](section-integration-workflow.md).

## Evidence and measurement boundary

Read-only analysis used the actual project conversation rollout `01a1de96-b1d0-74e2-8a09-821c48a9af49`, bounded to 2026-11-17 13:02–14:11 UTC (section request through delivery, before publication approval). Guardian-review sessions were excluded. Raw calculations and browser evidence remain outside Git in `/private/tmp/mosaic17/`. Source paths, credentials and conversation contents were not copied into the repository.

The run contains **106 token-usage records and 103 outer tool calls**. An outer `exec` can contain several commands or images, so it is not a browser-action count. All three recorded turn contexts name `gpt-6.1-sol` with `medium` effort; no recorded `high` context confirms a successful switch. Turn metadata is evidence of recorded configuration, not independent verification of every backend request.

| Approximate phase, split at explicit transitions | Usage records | Output tokens | Reasoning tokens within output |
| --- | ---: | ---: | ---: |
| Coverage and visual proposal | 15 | 19,403 | 10,260 |
| Dense sample and verification setup | 9 | 12,204 | 6,826 |
| Bulk authoring and semantics | 13 | 42,399 | 20,779 |
| Browser audit, inspection, helper diagnosis and final delivery | 69 | 38,975 | 13,188 |
| Total | 106 | 112,981 | 51,053 |

Phase attribution is approximate: requests may include work/output from the preceding boundary. The final phase accounts for about **65% of usage records**, but only **34.5% of output tokens**. Bulk authoring produced more output tokens than browser verification. Thus “the browser consumes everything” is not supported by these counters.

Summed input is 26,571,721 tokens, of which 25,947,264 is recorded cached input (97.65%); uncached input is 624,457. These sums repeatedly count the conversation/context across requests; they are not unique content volume or billable-equivalent allowance units. The first request alone records 263,704 uncached input tokens, about 42% of the run's uncached input, consistent with substantial inherited-history overhead. A fresh, focused conversation with a compact handoff is a useful next-run experiment; it does not reset the allowance.

Tool outputs contain 88 image blocks (85 distinct serialized image blocks). Image serialization includes encoded image data, so multi-megabyte output sizes are not text-token counts. Distinct images also do not equal distinct card states. Some image/text responses were truncated or downscaled, requiring smaller subsequent batches. The inspection index and final manifests establish actual visual coverage.

## Findings and applied rules

1. **The old instructions explicitly allowed proceeding after a reminder.** Workflow and local skill now require ending the turn and waiting for explicit acknowledgment of the requested switch. A new phase cannot start on silence or coverage approval alone. Already confirmed phases survive resumption.
2. **Rendering reuse worked.** After 752 initial portrait states, Info/Flip formatting reruns executed only 6 and 4 states, retaining 746 and 748. Keep this behavior. The initial 20-state sample needed a fresh full metric audit after adding exact-1px reporting; establish the measurement schema before the sample next time.
3. **Helper diagnosis caused avoidable iteration.** Ordinary integration initially failed on a Playwright context-lifecycle misuse; zoom failures lacked card/state labels and capture-before-failure diagnostics; the final tunnel smoke needed initialization/selector corrections. Reuse the committed helpers, preflight them on an existing representative card, and diagnose only the failing surface before one final complete scenario.
4. **Visual inspection still required many model turns.** Start with readable one/two-sheet batches, avoid extremely wide downscaled desktop sheets, keep logs separate, and persist inspection progress per confirmed batch. Do not reduce required pages/choices/sides or count truncated images as inspected.
5. **Switching alone is not a proven allowance saving.** It restores the intended quality/cost allocation. Track observed allowance separately from token/cache counters. Compare future runs using similar content/state counts and separate initial inspection from reruns and helper failures.

No application/card behavior changed during this retrospective. Existing content tests/build/browser evidence remains applicable; only documentation and the local workflow skill changed. No new dependencies were installed. The skill validator could not run because its Python environment lacks PyYAML; frontmatter/name/description and required pause/link text were checked directly instead.
