# Product contract

Read before changing application behavior or scope. Detailed implementation belongs to the affected subsystem, reached through [the docs index](README.md). Linear owns priorities and task status.

## Preserved behavior

- Mix explanations and exercises; allow skips; use taps/selections/gestures without mobile code typing. InfoCards have authored horizontal pages; QuizCards have four choices/one answer; FlipCards have exactly two sides.
- True reload/new runtime generates a fresh balanced queue. Ordinary backgrounding/focus, progress updates and client-side account/learning visits retain the live card/page/choice/side. Durable progress/preferences/recency are separate from navigation. Keep the study feed mounted but hidden/inert without global input when account routes are visible.
- Normal study excludes completed cards; `/review` is separate and read-only for progress/exposure/spacing. `/account` is the compact profile; `/learning` owns selection/progress/reset/shuffle; `/settings` owns optional local feedback preferences.
- Preserve the soft 2:1 new/partial mix, no duplicate card within a round, bounded history and stable live presentation IDs. Display spacing and award eligibility are distinct. Use [ordering](study-ordering.md) and [sessions](study-sessions.md) only when changing these policies.
- Understanding requires explicit eligible confirmation, never quiz correctness. Guest/account data stays isolated; no guest-to-account import. Sync shares account confirmations/selected subsections, never another device's navigation. See [progress](learning-progress.md) and [sync](progress/synchronization.md) for affected changes.
- Keep full-width content, symmetric side padding and the vertical icon-only action rail on the right. Discuss layout/control or major visual changes before implementing them. Preserve keyboard/focus/reduced-motion behavior and responsive landscape/safe-area recovery; the manifest orientation hint does not guarantee a lock.

## Scope boundaries

Google authentication, MongoDB and focused Next.js route handlers are approved foundations. Keep guest browsing. Optional device-local sound/haptics and static loading/empty-state presentation already exist; their physical-device acceptance must be read from actual evidence, not inferred from implementation.

No runtime AI/recommendation engine, advanced spaced-repetition framework, analytics/tracking, social features, extra educational domains or speculative native/cross-platform infrastructure. Service workers, offline app caching and push infrastructure need separate approval. A loaded app's sync outbox does not supply offline app loading. Other backlog ideas require selection in Linear and explicit task authorization; approval of a plan is not permission to implement every task.

Use simple existing components/native capabilities and avoid unjustified `any`. No speculative plugin/state frameworks or premature abstractions. Keep credentials/browser profiles/tokens/raw evidence outside Git. [Historical approvals](history/accepted-milestones.md) do not prove a fresh deployment/device check.
