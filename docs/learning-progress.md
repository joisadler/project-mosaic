# Explicit understanding confirmations

MOS-14 introduces the same **Понятно** toggle for InfoCard, QuizCard, and FlipCard. Viewing, answering, or revealing content never awards progress automatically. Each qualifying confirmation adds 10 percentage points, capped at 100. This is a product indicator of repeated explicit confirmations, not a validated mastery score. Completed cards remain in the feed until MOS-16 delivers review access and normal-feed exclusion together.

## Review and input

- InfoCard: visit every page of the current presentation before confirming. A direct jump to the last page is insufficient.
- FlipCard: reveal the answer before confirming.
- QuizCard: select any answer and expose its explanation. Correctness does not determine progress. In the compact landscape layout, visit the explanation panel; selecting an option alone does not satisfy review.

The accessible toggle is above Read more and the account entry. Feed actions display icons without circular backgrounds, borders, or shadows; invisible hit areas remain at least 44 by 44 CSS pixels, with a keyboard-only focus outline. The selected check uses the section accent and a heavier stroke. `Enter` and `Space` activate it; `aria-pressed` communicates its state. A native progress element and percentage show the current card total. An unavailable action explains its review/spacing condition without awarding points. Touch double-tap on a non-interactive card area performs the same toggle. It ignores code blocks, inline code, links, buttons, quiz options, long presses, movement, scrolling, canceled/multiple pointers, and gestures crossing card boundaries. Existing paging, flip, quiz keyboard semantics, safe areas, and the landscape fallback remain in place. Percentage text and the visible progress fill animate together over 450 ms on confirmation/cancellation, continuing from the current displayed value if interrupted. The semantic progress value updates immediately; saved progress is not replayed as a new award on mount. Reduced-motion preference disables interpolation, and animation frames are canceled on unmount. No decorative animation is added.

## Presentation identity and repeat eligibility

Each confirmation belongs to the stable `session UUID:card ID` presentation from MOS-17. Canceling changes only that confirmation's `active` field. Re-enabling restores the same ID and original award time; toggling, reload, immediate back/forward, page changes, or answering again cannot create additional awards. Earlier confirmations remain intact.

A new presentation of a previously awarded card is eligible only after **10 minutes** and after visiting **5 different other cards** since the previous award. With fewer than 6 eligible cards, visit all other cards; a single-card pool still requires the time interval. New sessions never clear that history. The latest award counts for spacing even if canceled, preventing cancel/restart farming. Re-enabling its original presentation does not create a new repeat opportunity. Constants and the pure eligibility function are in `src/lib/learning-progress/progress.ts`; MOS-13 must reuse this rule instead of inventing a second spacing policy. Feed ordering itself is unchanged here.

## Persistence and future synchronization

Versioned local storage uses `mosaic:progress:v1:<encoded owner>`, independently of session restart. Guests and each confirmed server account have separate namespaces. An unresolved identity restores no account data; unavailable authentication permits only unsaved browsing. No guest import or server synchronization is implemented in this increment. Signed-in progress is local to this browser until MOS-22.

`ProgressData` contains:

- `confirmations`: presentation-keyed records with a unique confirmation UUID, presentation ID, stable card ID, explicit registry section ID, active flag, creation/update timestamps, and local visit ordinal.
- `reviews`: per-presentation visited page indices, flip-answer exposure, and the quiz option whose feedback was exposed.
- A monotonic local visit ordinal and per-card last-visit ordinals for distinct-card spacing.

The explicit section registry supplies membership; titles and ID prefix heuristics do not. Removed cards and section mismatches are discarded on restoration; page indices and option IDs are checked against current content. Malformed/unsupported data starts safely; read/write failures keep in-memory interaction and expose a storage notice to assistive technology. Browser storage is not encrypted and is not an authorization boundary. No credentials or profile fields are stored in progress.

`createProgressStore` exposes cached snapshots, subscriptions, review updates, and a toggle operation. MOS-22 can persist/merge confirmation records by their UUID and update only the targeted confirmation when canceling. Aggregate percentage must be derived, never decremented as a global counter that could erase another device's award. Server ownership, conflicts/retries, resets, guest migration, and synchronized preferences remain MOS-22/MOS-15 work. Local visit ordinals are device-local, not globally comparable server timestamps. No network calls, synchronization queue, analytics, or recommendation framework is added here.

## Verification

Run `npm run test:progress`, session/auth tests, content validation, lint, typecheck, and build. Verify all three types, review gating, keyboard/touch activation, cancel/re-enable, reload/back-forward, immediate new-session blocking, corrupt/denied storage, and owner separation. Test narrow portrait, desktop, and compact landscape feedback. Physical iPhone double-tap/gesture/PWA validation must be attributed separately to the owner before MOS-14 is Done.

The owner confirmed the requested functionality after local/PWA testing and accepted the icon-only controls and progress animation on October 22, 2026, then authorized commit/push. Detailed evidence is recorded in MOS-14. This acceptance does not establish validation of a later production deployment.
