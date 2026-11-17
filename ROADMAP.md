# Product scope and roadmap

The existing MVP was accepted on 2026-10-11 ([MOS-1](https://linear.app/joisadler/issue/MOS-1)). Current tasks, priorities, dependencies and statuses live only in [Linear](https://linear.app/joisadler/project/project-mosaic-1db195c51ec6). This file defines boundaries, not an implementation queue.

## Existing product

Mobile-first mixed Info/Quiz/Flip feed; guest browsing and optional Google/MongoDB accounts; explicit progress; section selection/aggregates/scoped resets; account sync; separate completed-card review; continuous balanced rounds. True reload starts a fresh queue; same-runtime navigation retains state. Optional local feedback preferences and static loading/empty-state presentation are implemented. [Product contract](docs/product-contract.md) defines preserved behavior; [catalog](docs/content/catalog.md) defines registered learning material. Implementation does not establish physical-device or production acceptance.

## Incremental work

Select one bounded improvement or source-approved content subsection at a time. Follow the relevant Linear issue and owner authorization. Review significant visual changes before implementation; commit/push after owner approval. Historical milestones belong in [history](docs/history/accepted-milestones.md).

## Requires separate approval

New content formats/domains, reporting flows, native applications or other backlog proposals. Runtime AI, recommendation engines, advanced spaced repetition, analytics/social infrastructure, service workers/offline app caching and push transport are outside current scope. Do not build abstractions for tentative future platforms. Guest data does not transfer into accounts; an already loaded sync outbox is not offline app loading.
