# Explicit understanding confirmations

MOS-14 introduces the same **Понятно** toggle for InfoCard, QuizCard, and FlipCard. Viewing, answering, or revealing content never awards progress automatically. Each qualifying confirmation adds 10 percentage points, capped at 100. This is a product indicator of repeated explicit confirmations, not a validated mastery score. Cards at 100% are excluded from normal study and available through the account page in the separate `/review` feed.


Read only for award/exposure/ownership changes. For other tasks use [presentation](progress/presentation.md), [sync/API](progress/synchronization.md), [selection/reset UI](progress/selection-and-reset.md) or [verification](progress/verification.md).

## Study exposure and input

- InfoCard: visit every page of the current presentation before confirming. A direct jump to the last page is insufficient.
- FlipCard: reveal the answer before confirming.
- QuizCard: select any answer and expose its explanation. Correctness does not determine progress. In the compact landscape layout, visit the explanation panel; selecting an option alone does not satisfy review.

In study, the accessible toggle is above Read more and the account entry in the vertical action rail on the right. Card content keeps symmetric side padding; no extra right-only column is reserved for the controls. Feed actions display icons without circular backgrounds, borders, or shadows; invisible hit areas remain at least 44 by 44 CSS pixels, with a keyboard-only focus outline. The selected check uses the section accent and a heavier stroke. `Enter` and `Space` activate it; `aria-pressed` communicates its state. A native progress element exposes the current card total; its visible fill belongs to the [card header](progress/presentation.md). An unavailable action explains its review/spacing condition without awarding points. Touch double-tap on a non-interactive card area performs the same toggle. It ignores code blocks, inline code, links, buttons, quiz options, long presses, movement, scrolling, canceled/multiple pointers, and gestures crossing card boundaries. Existing paging, flip, quiz keyboard semantics, safe areas, and the landscape fallback remain in place. The visible progress fill animates over 450 ms on confirmation/cancellation, continuing from the current displayed value if interrupted. The semantic progress value updates immediately; saved progress is not replayed as a new award on mount. Reduced-motion preference disables interpolation, and animation frames are canceled on unmount. Optional action feedback is described in [Interaction feedback](interaction-feedback.md); sound/haptics do not alter confirmation eligibility or progress awards.


## Presentation identity and repeat eligibility

Each confirmation belongs to a stable `round UUID:card ID` presentation. The first study round and finite review use the session UUID; subsequent continuous study rounds have separate prefixes while retaining the root session UUID. Canceling changes only that confirmation's `active` field. Re-enabling restores the same ID and original award time; toggling, immediate back/forward, page changes, or answering again cannot create additional awards. A full reload creates new presentation IDs; the durable timing/distinct-card gate still prevents immediate additional awards. Earlier confirmations remain intact.

A new presentation of a previously awarded card is eligible only after **10 minutes** and after visiting **5 different other cards** since the previous award. With fewer than 6 eligible cards, visit all other cards; a single-card pool still requires the time interval. New sessions never clear that history. The latest award counts for spacing even if canceled, preventing cancel/restart farming. Re-enabling its original presentation does not create a new repeat opportunity. Constants and the pure eligibility function are in `src/lib/learning-progress/progress.ts`; Ordering must reuse this rule instead of inventing a second spacing policy. Study now generates continuous rounds with a soft 2:1 mix, subsection/type balance, recent-display spacing, and bounded history. Existing planned entries stay device-local and stable; selection/completion filter that view. A new round supplies distinct presentations, but cannot bypass the eligibility rule above. See [Study ordering](study-ordering.md) for the exact policy; this is not an advanced spaced-repetition scheduler.


## Local persistence

Versioned local storage uses `mosaic:progress:v1:<encoded owner>`, independently of session restart. Guests and each confirmed server account have separate namespaces. An unresolved identity restores no account data; unavailable authentication permits only unsaved browsing. Guest progress stays device-local and separate. The owner explicitly selected no guest-to-account transfer for MOS-22. Signed-in confirmations synchronize through the [account boundary](progress/synchronization.md).

`ProgressData` contains:

- `confirmations`: presentation-keyed records with a unique confirmation UUID, presentation ID, stable card ID, explicit registry section ID, active flag, creation/update timestamps, and local visit ordinal.
- `reviews`: in-memory-only per-presentation page/answer/feedback exposure; it is omitted from serialized progress and not restored after reload.
- A monotonic local visit ordinal and per-card last-visit ordinals for distinct-card spacing.

The explicit section registry supplies membership; titles and ID prefix heuristics do not. Removed cards and section mismatches are discarded when restoring durable confirmations; old per-presentation exposure fields are ignored. Malformed/unsupported data starts safely; read/write failures keep in-memory interaction and expose a storage notice to assistive technology. Browser storage is not encrypted and is not an authorization boundary. No credentials or profile fields are stored in progress.

`createProgressStore` exposes cached snapshots, subscriptions, review updates, a toggle operation, and confirmation reconciliation. Reconciliation replaces only confirmations: local exposure history, visit ordinals, and the separate study session are retained. Continuous study separately prunes exposure records for discarded queue entries; confirmation history and spacing evidence remain intact. For an unseen remote confirmation, the current local visit ordinal becomes its conservative spacing baseline; visit counters from different devices are never compared.


## Completed-card review

The profile page (`/account`) links to `/review` and counts completed cards in the selected subsections. Review reuses InfoCard, QuizCard, and FlipCard with paging, quiz explanations, and answer sides. It displays a static 100% indicator and a return-to-study link instead of the understanding toggle. The review context disables both exposure recording and confirmation mutations, including double-tap; viewing or answering cannot award, cancel, or lower progress. Review does not advance study repeat-spacing visits. Explicit progress resets remain separate My learning actions.

Study and review derive disjoint eligible card sets from active confirmations and the explicit section registry. Both respect the same selected subsection IDs. No selection, no completed cards, and exhausted study have navigable empty states. Cloud progress reconciliation updates eligibility without creating session identities; reset cards become eligible for study again. Review order, position, pages, answers, and flip sides remain device-local in a separate session scope. See [Study sessions](study-sessions.md).
