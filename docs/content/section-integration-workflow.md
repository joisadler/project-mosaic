# Handbook subsection integration workflow

Use for one explicitly requested `TARGET_SECTION` in Project Mosaic. Discover its title, source boundary and existing Linear issue. Repository: `/Users/yossiadler/Projects/personal/project-mosaic`; source handbook: `/Users/yossiadler/Projects/personal/frontend-interview-preparation` (read-only). Do not start a section when asked only to edit the workflow.

Read this route once, then only the current phase's references. Do not preload all package/subsystem docs. Check live Git state and preserve existing edits. Linear owns task status; [catalog](catalog.md) and the runtime registry own availability.

## Reasoning reminders at phase boundaries

Before coverage, authoring or substantive semantic review, ask in Russian: “Йоси, переключи reasoning на high и напиши «готово». После этого начну работу над содержанием.” Before browser work (including preview/sample), automated rendering/interaction checks and layout-only fixes, request `medium` the same way. **End the turn immediately; start that phase only after explicit acknowledgment or an explicit instruction to proceed at the current level.** Do not follow a commentary reminder with tool calls or other task work. Silence, elapsed time, coverage approval and a previous section's confirmation do not acknowledge a new switch. Do not claim to change or independently verify the setting.

A confirmed phase survives compaction/resumption. Switch only at real transitions: high planning → medium browser preview/sample → high bulk content → medium final verification; skip unnecessary browser-preview transitions when a code-native static proposal suffices. Ordinary wrapping/typos stay medium; substantive semantic fixes return to high. Workflow maintenance/log analysis does not itself start a learning-content phase.

## Phase route and completion gates

For an existing approved package, enter only the affected phase. A layout-only fix starts at medium; do not repeat coverage/visual approval unless the objective/direction changes. Routine final commands stay in the confirmed verification phase.

| Phase | Work and required reference | Exit |
| --- | --- | --- |
| Scope — high | Verify source is authored/owner-approved, not a placeholder; read target chapter, related Q/A, practice/solutions, summary/infographic and overlap only. Read [authoring](authoring.md). Find the existing Linear issue/acceptance criteria; mark In Progress when implementation begins. Propose concepts, errors/limits, coverage by type, exclusions and [visual direction](presentation.md), illustrated for all three types. | Owner coverage + visual approval before bulk authoring |
| Dense sample — high then medium | Author one dense actual-component Info/Quiz/Flip sample; execute its code via [semantics](semantics.md). After the medium handoff, check pages, choices/feedback and sides at both required phone sizes via [rendered checks](rendered-checks.md). Use measured text/code limits for the package. | Reliable fit/capture; discuss substantial visual departure |
| Bulk content — high | Write independent shuffled-feed cards, verify each distractor, execute examples, verify source anchors and map every card to source objectives. Reuse semantic tools. Extend only approved presentation/registry patterns. | Complete coverage and semantic evidence |
| Final verification — medium | Read [rendered checks](rendered-checks.md) and [browser protocol](../verification.md). Audit all new states, appropriate regression samples and ordinary feed; rerun only affected evidence. Register explicit chapter/subsection membership. Run [required checks](../development.md#choose-checks-by-impact) sequentially where needed. | Final-tree evidence, clean temporary routes, ordinary review URL |
| Review/publication | Read [release](release.md). Report results/limitations and propose a focused commit. | Owner approval, then verified commit/push + Linear update; stop |

## Efficient continuation

Use a fresh focused conversation per completed section. At a phase boundary/interruption save a compact temporary handoff: target/approval, base+diff, phase/requested level/acknowledgment, completed/remaining work, check commands/results, evidence/fingerprints/inspected-image index, and task-owned server/process details. No credentials/owner session data. Read live state on resumption; do not replay history or rerun valid stages. A new chat does not reset allowance.

Use scripts for deterministic enumeration/capture; keep reusable verification code in Git, raw evidence outside it. Return counts/failures/paths, normally ≤1,000 text tokens. Avoid reloading inspected images or dumping raw queues/API objects. Preserve tests/approval gates; shared changes expand verification to actual impact. Report executed versus retained evidence, not invented allowance savings.

Maintain one canonical rule per phase document. Fix repeatable helper failures in code; historical incidents belong in retrospective/package notes. Update guidance only for a demonstrated reusable omission, and describe material policy changes to the owner.
