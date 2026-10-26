# In-memory study sessions

On October 26, 2026, the owner selected a fresh feed after a true application reload in [MOS-205](https://linear.app/joisadler/issue/MOS-205). This replaces the cross-reload navigation persistence previously accepted in MOS-17. Authentication, learning progress and preferences remain durable; the owner confirmed the implementation works and approved commit/push on October 26, 2026, as recorded in Linear.

## Runtime lifecycle

A full document reload or a new application runtime creates new study/review session UUIDs and presentation state. Study generates a new balanced queue from the current unfinished inventory, selected subsections and saved progress. Different random tie breaks can produce a different order; a tiny constrained pool may necessarily look the same. No previous card, page, quiz selection or flip side is restored.

While the runtime remains open, its mounted providers retain the queue, current presentation, Info pages, selected Quiz feedback, Flip sides and bounded backward history in memory. Background/foreground, focus, elapsed time, ordinary progress updates and synchronization polls do not restart the feed. If the operating system actually discards the runtime, reopening is a new runtime; physical PWA behavior must be verified on the device.

The profile icon opens `/account`; `/learning` contains selection, progress/reset and manual shuffle; `/review` is separate. These routes share the mounted `(study)` layout. Inactive feeds remain hidden, inert and excluded from global input. Client-side visits and returns retain the same live state and existing focus behavior. A full reload on any route creates fresh live sessions. Authentication cookies are independent of this navigation policy.

## Ownership and initial generation

`createSessionStore` is a small owner-bound in-memory store. It initializes once after identity becomes available, caches its snapshots for `useSyncExternalStore`, and retains them across subscription changes. Separate study/review stores and guest/account boundaries remain independent. No module-level shared server state is introduced.

A new signed-in study queue waits for the initial account progress/preferences read to settle, or uses the available local data after a reported synchronization failure. Later sync polls never supply another device's position. An unresolved identity exposes no account state. Temporary authentication errors retain the existing unsaved-browsing boundary. Verified guest refetches can briefly report pending with null session data; this public guest scope stays mounted during the check instead of restarting on focus. Confirmed account changes still remount the owner boundary.

## Durable learning data

[Learning progress](learning-progress.md) persists explicit confirmations and the local visit/per-card recency evidence used for repetition. Section preferences and settings keep their existing storage/synchronization. A fresh queue seeds its recent-card exclusions from the last few recorded visits, rather than blindly starting with the last shown cards.

Presentation UUIDs remain stable within the open queue and on backward navigation. A new runtime supplies new presentation IDs, but it does not bypass the shared award gates: review the new presentation, wait at least 10 minutes after the previous award and visit the required distinct other eligible cards. Historical confirmations, including canceled ones, remain intact. No progress is inferred from generation, navigation or correct quiz answers.

Per-presentation exposure evidence (visited pages, revealed answer, exposed quiz feedback) stays in the current progress store's memory. It is excluded from serialized progress and old exposure fields are ignored on restoration. Durable confirmation and visit records retain their existing format and namespace.

The app neither reads nor writes the old `mosaic:session:v1:*` navigation keys. Existing browser records can remain unused; no cleanup or progress reset is performed. Snapshot validation, navigation migration and versioned blocked-order repair are removed. The live `queuePlan` only reconciles selection/inventory changes while the current feed is open; it has no persistence version. See [Study ordering](study-ordering.md) for rounds and bounds.

## Explicit shuffle and storage failures

**Перемешать ленту** remains a confirmed way to request a fresh queue without reloading the application. It replaces only that open study session and its presentation interactions, then returns to the feed. Review, selected subsections, settings and learning progress are unaffected. Progress reset remains a separate confirmed operation.

Navigation does not depend on browser storage and creates no navigation-storage warning. Denied storage still affects progress, preferences, feedback settings and the account outbox; their existing notices remain. Guest progress stays separate from account progress, and unavailable authentication does not import either owner's data.

## Validation

Run ordering/session/progress/sync/auth/feedback tests, content validation, lint, typecheck, build and `git diff --check`. Verify actual components in ordinary Chrome with isolated test data: legacy keys ignored, fresh IDs/order after reload, unchanged confirmations/preferences, recent-card avoidance, all selected subsections, stable Info/Quiz/Flip state across client-side routes and actual tab background/foreground, read-only review, manual shuffle and storage denial. Confirm on the owner's iPhone/PWA that brief app switching keeps the unfinished card while a true reload starts a fresh feed. Browser checks do not establish physical-device acceptance.
