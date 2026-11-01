# fe-1.4 integration proposal

The owner approved this coverage and presentation direction on 2026-11-01. Counts below remain planning estimates; actual registered coverage and verification are documented in README.md and COVERAGE.md. [MOS-40](https://linear.app/joisadler/issue/MOS-40) owns decisions and task status; follow the [integration workflow](../section-integration-workflow.md).

## Inspected source and application

Source: subsection **1.4. `this`, Invocation & Object Model** in the read-only Frontend Interview Preparation checkout. Source HEAD is `7e57113`; the subsection review records owner approval on 2026-10-08. Uncommitted source work concerns subsection 1.5 and shared navigation/status files and must be preserved.

The handbook contains 28 teaching questions. The associated source set has 30 question/answer pairs (`JS-OBJECTS-Q01–Q30`), 14 exercise/solution pairs (`JS-OBJECTS-EX01–EX14`), a compact summary and an English SVG/PDF infographic. The curriculum and coverage map assign `JS-23–JS-28` and `JS-39`. Handbook, review, summary, prompt/answer and exercise/solution structure were inspected for this proposal; detailed adaptation and independent execution checks remain implementation work. Historical source checks do not validate new Mosaic examples.

Mosaic at proposal baseline `a2bd04c` registers fe-1.1–fe-1.3 (356 cards); fe-1.4 is absent. The proposal adds one subsection under chapter `fe-1` using the existing card types and presentation registry.

## Proposed coverage

`H` identifies a handbook teaching question; `Q` and `EX` use the source IDs above. Counts are estimates by distinct learning objectives, not quotas. Split, combine or remove cards when actual standalone quality and rendered fit justify it; record final IDs and totals in COVERAGE.md after implementation.

| Area | Source anchors | Info / Quiz / Flip | Learning objectives and mistakes |
| --- | --- | --- | --- |
| Invocation bridge | H1–4; Q02–04/09; EX02 | 2 / 3 / 1 | Restore receiver reasoning specifically for inherited methods and class callbacks; avoid repeating fe-1.3's basic binding/output inventory. |
| Creation and construction | H5–7/17/27; Q01/04/09–10/24; EX03/08–09/13 | 4 / 4 / 2 | Compare literal, factory, constructor, Object.create and class by state/method placement; connect new to topology, prototype fallback and new.target with explicit execution context. |
| Prototype topology and operations | H8–12; Q05/11–13/23; EX03–04 | 6 / 9 / 4 | Separate .prototype from [[Prototype]], own undefined from absence, lookup from assignment/definition; shared mutable prototype state, shadowing/deletion, instanceof/constructor limits, null prototypes and legacy __proto__. |
| Classes, methods and fields | H13–15; Q03/07/14–15; EX07–09 | 6 / 9 / 4 | Class requirements/strictness, shared methods versus per-instance functions, field definition versus assignment, two inheritance chains, super receiver, initialization order and premature virtual calls. |
| Static/private elements and composition | H16–17/27; Q07/16/24; EX07–08/13 | 4 / 5 / 3 | Locate static elements; private brand versus prototype identity, separate base/derived private names, inherited static method receiver; choose composition from an actual contract. |
| Ownership, enumerability and keys | H18–19; Q06/12/17/22; EX05 | 4 / 6 / 3 | Choose hasOwn/in/keys/entries/for...in/ownKeys; distinguish string and Symbol keys, hidden from private, and key listing from getter execution. |
| Descriptors and accessors | H10/20–21; Q11/18–19/21/25; EX04/06 | 5 / 6 / 3 | Data versus accessor descriptors, new-property defaults versus redefinition, configurable/writable limits, inherited setter, explicit Reflect receiver, side effects and explicit-method alternatives. |
| Integrity and ownership limits | H22–23; Q08/20/25; EX10 | 4 / 6 / 3 | Compare preventExtensions/seal/freeze, strict failures and Reflect results; shallow guarantees, existing setters, private/internal state and const versus object integrity. |
| Proxy/Reflect survey | H24–27; Q16/26–29; EX11–12 | 4 / 5 / 3 | Operation/trap/forwarding, receiver preservation, set success and changes without rollback, identity/private-slot limits, representative invariants and revocation; choose an explicit adapter when appropriate. |
| Integrated diagnosis and recall | H28; Q30; EX01/13–14 | 1 / 2 / 1 | Classify the operation, draw identities, find descriptor/receiver, predict the first failure and choose a focused remedy. Decompose long exercises into independent mobile decisions. |
| **Estimated total** | **7 primary inventory groups** | **40 / 55 / 27** | **122 cards; final totals follow adaptation and validation.** |

InfoCards explain one idea with authored horizontal pages; Quizzes require four plausible mutually exclusive choices; Flips ask one clear recall question with exactly two sides. All cards stand alone in a shuffled feed and require no code typing. Source Q/EX IDs can map to multiple formats with different objectives; avoid duplicating the same example/question for volume.

## Overlap and exclusions

- fe-1.1 already teaches lexical scope, TDZ and strict mode. Use those only as local class/invocation context.
- fe-1.2 already teaches identity, shared references and mutation. Revisit only to explain prototype state, property presence, integrity and Proxy identity.
- fe-1.3 owns the detailed JS-16–JS-18 function/binding/constructibility material. The short bridge and construction cards here must add object-topology, placement or class-specific objectives. Do not count those source inventory IDs again.
- Array methods, copying/cloning, structuredClone and deep-freeze implementations are excluded. Integrity examples may reference a nested object solely to show the shallow boundary.
- Symbols appear only as property keys; iteration protocols, collection internals and well-known-Symbol customization remain in 1.6. instanceof limits may mention Symbol.hasInstance without developing its protocol.
- Prototype pollution defenses, full DOM-event instruction, async scheduling and framework reactivity implementations remain outside this package. Proxy is a bounded survey, not a reactive system or security boundary implementation.

## Proposed visual identity

Restrained jade/sage: accent `#a8d5ba`, base `#152b23`, floor `#0b1712`, faint green glow. Preserve current correct/incorrect feedback colors and supplement color with existing textual states/icons.

- Default `prototype`: separate rounded object contours joined by directional links, representing delegation rather than copying. Used for creation, prototype lookup, classes and inheritance.
- Optional `descriptor`: a property contour with a small divided attribute panel, for ownership, descriptors, accessors and integrity.
- Optional `interception`: two separate target/wrapper contours with a routed path between them, for Proxy/Reflect and revocation.

Use the primary learning objective to select one motif. Keep decoration peripheral, static, accessibility-hidden and pointer-inert with no reserved reading space. Retain symmetric content padding, header/indicators and the vertical right-hand icon rail. Retain motif and palette across Info pages, Quiz selections and both Flip sides. Implement artwork only in the existing presentation system, with optional typed metadata in card data.

The temporary three-card direction preview is illustrative HTML outside Git, not a verified application sample. After approval, build a small sample in the actual components: a dense multi-page InfoCard, a code Quiz with every feedback choice, and both sides of a FlipCard at 320×568 and 375×667. Revise content lengths before bulk authoring.

## Verification and integration contract

Follow the linked workflow and shared authoring contract rather than creating a parallel process. Execute every runnable new example in its real environment, preserve JavaScript value types, review all distractors separately and retain a reproducible semantic runner using existing tools. Verify linked source headings and primary-source claims.

Register stable fe-1.4 card/section IDs with chapter fe-1; update package coverage, availability and actual counts together. Preserve existing IDs, owner data, ordering, selection and runtime lifecycle. Test actual mixed-feed sequences, new-section-only selection, re-enabling other sections, true reload and return from learning settings using isolated data.

Audit every Info page, all five states per Quiz and both Flip sides at both required mobile viewports, plus desktop, landscape, enlargement and reflow. Record measurements and screenshots outside Git. Inspect existing shared compact-layout exceptions recorded in MOS-203 before classifying a failure; accepted exceptions remain separate from passing checks. Do not repair shared behavior without separately agreed scope.

Run content validation, semantic checks, lint, typecheck, the standard production build, applicable existing regression tests and diff checks against the final implementation. Owner device review and commit/push approval remain separate gates. Review instructions for evidence-based refinements at completion and stop after the approved save/report cycle.
