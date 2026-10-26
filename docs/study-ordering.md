# Continuous study ordering

This document is the behavior and tuning contract for MOS-13. Linear remains the task/status source of truth. The owner approved continuous forward scrolling and a **soft 2:1 mix** on October 22, 2026, after explicitly rejecting repeated sampling of a tiny partially completed group merely to maintain that ratio.

## Invariants

- Membership comes from `learningSectionIdByCardId` and saved selected subsection IDs. Titles, topic keywords, and ID prefixes never determine membership.
- Normal study includes only selected cards below 100%. Completed cards remain accessible in the separate, progress-read-only review feed.
- A round is a permutation of the eligible inventory at generation time: each card appears at most once. A round is not sampling with replacement.
- Progress is awarded only by explicit eligible confirmation. Ordering, prefetched entries, new rounds, reload, and mode changes award nothing.
- Presentation IDs and current/backward state survive account visits, backgrounding and study/review transitions within the open runtime. Full reload creates a fresh balanced queue. Selection/inventory expansion can interleave additional eligible entries after the current presentation. Incoming cloud progress never supplies another device's position.
- No UI rearrangement, AI recommendation engine, service worker, push transport, or new dependency is involved.

## Selecting a round

`src/lib/study-session/ordering.ts` exports the pure `orderStudyRound` function. It accepts cards, explicit membership, selected subsections, current progress, recent/planned card IDs, a generation timestamp, and an injectable random function.

1. Deduplicate registered cards, apply selected subsections, and exclude cards at 100%.
2. Classify 0% as the new group and 1–99% as the partial group. These are progress buckets, not a record that the learner has never seen a card. A canceled confirmation can leave a card in the 0% bucket.
3. For each slot, first prefer cards outside the last five recent/planned IDs. If none remain, relax the oldest exclusions until there is a candidate. Thus a pool with more than one available card avoids an immediate boundary repeat; smaller pools relax spacing instead of stopping the feed. A one-card pool necessarily repeats that card.
4. Among safe candidates, request two new slots followed by one partial slot. If that bucket is empty, use the other bucket. Never repeat a card within the round to satisfy the ratio. Spacing can also override a requested bucket.
5. Rank candidates lexicographically: repeat eligibility, lowest fraction of the subsection's eligible inventory already selected, change from the previous subsection, fewest selected of the card type, change from the previous type, and one random tie-break value per candidate. Proportional subsection balance distributes unequal inventories throughout the round instead of exhausting small subsections early and leaving a large single-subsection tail. Progress buckets and repeat eligibility remain higher-priority preferences; this is not a strict quota for every subsection/type or sliding window.
6. Remove the chosen card from the round's remaining inventory and continue until empty.

For 200 new cards and three partial cards, the three partial cards each appear once. Once they are used, the rest of that round consists of new cards. The ratio shapes ordering while both buckets are available; it does not promise one partial card every third swipe indefinitely. Random values are consumed only during generation, not on rerender or ordinary foregrounding. Fresh-runtime generation uses the most recent saved visit ordinals for the initial recent-card window.

## Continuous rounds and presentation identity

`src/lib/study-session/study-queue.ts` keeps an in-memory ordered `queue` of `{ id, cardId }` entries and `currentEntryId`. `order` is the unique canonical inventory used for filtering and repeat eligibility. The ephemeral `queuePlan` records selected subsections, eligible card IDs and prepared round IDs so live selection changes do not reconstruct discarded history or rerun planning. It has no storage/version/migration role. A full reload starts fresh from durable learning data; see [Study sessions](study-sessions.md).
The first round retains `session UUID:card ID` identities. Each appended round gets a fresh UUID prefix, yielding distinct presentation IDs in the existing confirmation format. The root session UUID changes on full reload/new runtime or explicit shuffle. Pages, selected quiz options, and flip sides are keyed by presentation ID in queued study sessions. Returning to a retained older presentation restores its interactions and confirmation; it does not create a new award. A new round starts its own unexposed pages/question/options, so the study exposure requirement still applies.

When fewer than two visible entries remain ahead, append enough complete eligible rounds to restore that buffer. Existing upcoming entries stay in place; recent-card exclusions include them at the new boundary. Planning entries does not mark them visited. On reaching the previous last card, another swipe therefore continues without a settings visit or manual restart. There is no timer-driven reset and no automatic jump when time passes.

The queue is bounded. On replenishment, retain at most `max(full inventory size, 20)` entries behind the current entry, plus current/planned entries and enough upcoming rounds for the buffer. Older backward history is discarded; backward navigation is supported within retained history, not indefinitely. Prune interaction state and local exposure records for discarded presentations, while keeping confirmations, visit ordinals, and per-card last-seen history. Those records still prevent reward farming. Swiper continues to virtualize nearby slides.

The displayed card position/count refers to the retained visible entries of that round, rather than presenting the entire rolling buffer as a fixed curriculum total.

## Eligibility is separate from display frequency

`repeatEligibility` in `src/lib/learning-progress/progress.ts` is shared by ordering and `confirmationStatus`. Its existing rule is unchanged: a new confirmation after an earlier award needs at least 10 minutes and five distinct other eligible cards visited since that award; with fewer than six cards, visit all other cards. A one-card pool still requires 10 minutes. Canceled awards remain part of this history. Re-enabling the same presentation restores its original award rather than creating a new one.

This is an **award gate**, not a promise to hide a card for 10 minutes. Ordering prefers eligible cards within the chosen bucket/balance constraints, but still displays unfinished cards whose next award is unavailable. Otherwise a small/all-partial pool would terminate the feed. The existing control explains why a confirmation is unavailable. No progress is inferred from quiz correctness.

## Runtime changes and failure behavior

- A new signed-in session waits for the initial progress/preferences read to settle; a failed read uses the available local state with the existing sync warning. Later account polls do not reorder an already prepared queue.
- Pending identity/progress initialization shows the loading status and account entry. A verified guest stays mounted during anonymous session refetches.
- Full reload creates new session/presentation IDs and empty page/answer/side state. Old navigation snapshots are ignored rather than migrated. Award/recency history, preferences and account synchronization remain independent.
- Selection narrowing and completion project a filtered queue. If the current entry disappears, select the next survivor or the final survivor. Expansion inserts newly eligible material into the upcoming current round using the existing planner for insertion slots, preserving current/backward state and retained future IDs/order.
- Prepared-round markers prevent reconstructing a discarded prefix when navigating backward. Later planned rounds are reconciled when they become current. Expansion may temporarily keep the current full round and an already planned next round; history remains bounded. An unchanged selected/eligible pool consumes no new planning randomness.
- Remote reset makes a card unfinished again; remote completion removes it from study. Neither operation imports another device's position or replaces the open session UUID.
- Empty/all-completed selection retains the navigable settings/review state. Review remains a separate finite, read-only live session and never awards progress.
- Guest/account isolation, unsaved authentication-error browsing and no guest-to-account import remain unchanged. Storage denial affects durable learning data, not live navigation. Focus/visibility/online handlers retry synchronization without restarting the queue.

## Tuning and verification

| Concern | Source | Current setting |
| --- | --- | --- |
| New/partial slot pattern | `ordering.ts`: `NEW_CARD_SLOTS` | 2 new, then 1 partial; soft fallback |
| Recent display exclusions | `ordering.ts`: `RECENT_CARD_WINDOW` | Last 5 IDs; relax oldest when necessary |
| Forward buffer | `study-queue.ts`: `FORWARD_BUFFER` | At least 2 visible upcoming entries |
| Backward history floor | `study-queue.ts`: `MIN_HISTORY_ENTRIES` | 20 entries; retain more when inventory is larger |
| Award spacing | `progress.ts`: `REPEAT_DELAY_MS`, `REPEAT_OTHER_CARDS` | 10 minutes and 5 others, with the documented small-pool rule |

Changing the display mix/window must not silently change award eligibility. Change one policy deliberately, update this contract and focused tests, and review product-facing behavior with the owner. Do not reorder a mounted queue on every progress update.

Run `npm run test:ordering`, session/progress/sync/auth tests, content validation, lint, typecheck, and build. Ordering tests cover the rare-partial case, boundary spacing, balance, eligibility preference, completion/selection, fresh-runtime generation, durable initial recency, repeated forward replenishment with bounded history, backtracking, storage-independent navigation, and immediate-award prevention. Browser checks must exercise enough swipes to cross a round, verify fresh presentation state after reload, retain quiz feedback/InfoCard pages/FlipCard sides during same-runtime backgrounding and route visits, and verify that reload does not manufacture progress. Real iPhone/PWA acceptance remains a separate owner check.
