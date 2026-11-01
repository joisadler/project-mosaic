# fe-1.4 coverage

Source: approved handbook 1.4. H denotes its numbered teaching question; Q/EX use JS-OBJECTS source IDs.

124 registered cards: 40 InfoCards (120 explicit pages), 57 QuizCards and 27 FlipCards. The full ID mapping below is authoritative; [README](README.md#coverage-and-exclusions) explains exclusions and [verification results](README.md#verification-and-owner-review) separate checks from shared limitations.

## Primary inventory crosswalk

| Inventory | Objective | Representative card IDs |
| --- | --- | --- |
| JS-23 | Object creation and state/method placement | `fe-1.4-info-creation-contract`, `fe-1.4-info-state-method-placement`, `fe-1.4-quiz-create-no-constructor` |
| JS-24 | Prototype topology, lookup and writes | `fe-1.4-info-prototype-links`, `fe-1.4-info-lookup-shadow`, `fe-1.4-quiz-inherited-readonly` |
| JS-25 | Classes, inheritance, super, static/private elements | `fe-1.4-info-inheritance-chains`, `fe-1.4-info-private-brand`, `fe-1.4-quiz-field-init-order` |
| JS-26 | Own/inherited and enumerable/non-enumerable properties | `fe-1.4-info-property-axes`, `fe-1.4-info-enumeration-choice`, `fe-1.4-quiz-forin-shadow` |
| JS-27 | Descriptors, getters, setters and receivers | `fe-1.4-info-descriptor-kinds`, `fe-1.4-info-accessor-receiver`, `fe-1.4-quiz-validate-before-write` |
| JS-28 | Shallow integrity guarantees | `fe-1.4-info-integrity-levels`, `fe-1.4-info-frozen-private-state`, `fe-1.4-flip-integrity-matrix` |
| JS-39 | Bounded Proxy/Reflect survey | `fe-1.4-info-proxy-operations`, `fe-1.4-info-proxy-invariants`, `fe-1.4-quiz-proxy-validation-rule` |

H1–4 supply a short receiver/class bridge; the detailed binding/new inventory remains in fe-1.3. No extra primary inventory groups are claimed. Q01–Q30 and EX01–EX14 are adapted into independent reading/repair/recall objectives rather than mobile implementation exercises. Their complete mappings follow.

## Card-to-source mapping

| Card ID | H | Question Bank | Exercise |
| --- | --- | --- | --- |
| `fe-1.4-info-assignment-receiver` | 10 | Q11/Q19 | EX04 |
| `fe-1.4-quiz-descriptor-defaults` | 20 | Q18 | EX06 |
| `fe-1.4-flip-proxy-identity` | 25 | Q16/Q28 | EX11 |
| `fe-1.4-info-inherited-receiver` | 1 | Q02/Q03 | EX02 |
| `fe-1.4-info-class-callback` | 14 | Q15 | EX07 |
| `fe-1.4-info-creation-contract` | 5 | Q01/Q10 | EX08/EX09 |
| `fe-1.4-info-state-method-placement` | 5 | Q01/Q10 | EX03/EX08 |
| `fe-1.4-info-construction-topology` | 6 | Q04/Q09 | EX03 |
| `fe-1.4-info-new-target` | 7 | Q04/Q09 | EX02/EX03 |
| `fe-1.4-info-prototype-links` | 8 | Q05 | EX03 |
| `fe-1.4-info-lookup-shadow` | 9 | Q11/Q12 | EX04 |
| `fe-1.4-info-writable-shadow` | 10 | Q11 | EX04 |
| `fe-1.4-info-chain-checks` | 11 | Q23 | EX03 |
| `fe-1.4-info-null-dictionary` | 12 | Q12/Q22 | EX03 |
| `fe-1.4-info-prototype-changes` | 12 | Q13/Q23 | EX03 |
| `fe-1.4-info-class-contract` | 13 | Q07 | EX07 |
| `fe-1.4-info-methods-fields` | 14 | Q07/Q15 | EX07 |
| `fe-1.4-info-field-vs-assignment` | 14 | Q15/Q25 | EX07 |
| `fe-1.4-info-inheritance-chains` | 15 | Q05/Q14 | EX03/EX07 |
| `fe-1.4-info-super-receiver` | 15 | Q14/Q30 | EX07 |
| `fe-1.4-info-initialization-order` | 15 | Q14 | EX07 |
| `fe-1.4-info-static-placement` | 16 | Q07/Q14 | EX07 |
| `fe-1.4-info-private-brand` | 16 | Q16/Q23 | EX07 |
| `fe-1.4-info-private-inheritance` | 16 | Q16/Q30 | EX07 |
| `fe-1.4-info-composition-contract` | 17 | Q10/Q24 | EX08/EX13 |
| `fe-1.4-info-property-axes` | 18 | Q06/Q22 | EX05 |
| `fe-1.4-info-enumeration-choice` | 19 | Q17 | EX05 |
| `fe-1.4-info-symbols-not-private` | 18 | Q06/Q17 | EX05 |
| `fe-1.4-info-enumeration-getters` | 19 | Q17/Q25 | EX05 |
| `fe-1.4-info-descriptor-kinds` | 20 | Q18/Q21 | EX06 |
| `fe-1.4-info-descriptor-defaults` | 20 | Q18 | EX06 |
| `fe-1.4-info-descriptor-redefinition` | 20 | Q18/Q25 | EX06 |
| `fe-1.4-info-accessor-receiver` | 21 | Q19/Q21/Q25 | EX06/EX11 |
| `fe-1.4-info-integrity-levels` | 22 | Q08 | EX10 |
| `fe-1.4-info-shallow-integrity` | 22 | Q20/Q25 | EX10 |
| `fe-1.4-info-frozen-accessors` | 23 | Q20/Q25 | EX10 |
| `fe-1.4-info-frozen-private-state` | 23 | Q20 | EX10 |
| `fe-1.4-info-proxy-operations` | 24 | Q26/Q27/Q29 | EX11 |
| `fe-1.4-info-proxy-receiver` | 25 | Q16/Q26/Q28 | EX11/EX13 |
| `fe-1.4-info-proxy-invariants` | 26 | Q26/Q29 | EX11/EX12 |
| `fe-1.4-info-proxy-revocation` | 26 | Q28/Q29 | EX12 |
| `fe-1.4-info-object-diagnosis` | 28 | Q30 | EX01/EX13/EX14 |
| `fe-1.4-quiz-inherited-call` | 1 | Q02 | EX02 |
| `fe-1.4-quiz-class-detached` | 2 | Q02/Q15 | EX07 |
| `fe-1.4-quiz-class-arrow-owner` | 14 | Q03/Q15 | EX07 |
| `fe-1.4-quiz-create-no-constructor` | 5 | Q01/Q23 | EX03/EX09 |
| `fe-1.4-quiz-shared-method` | 5 | Q01/Q10 | EX03 |
| `fe-1.4-quiz-replacement-topology` | 6 | Q04 | EX03 |
| `fe-1.4-quiz-new-target-derived` | 7 | Q04/Q14 | EX03 |
| `fe-1.4-quiz-prototype-two-links` | 8 | Q05 | EX03 |
| `fe-1.4-quiz-own-undefined` | 9 | Q11 | EX04 |
| `fe-1.4-quiz-delete-shadow` | 9 | Q11 | EX04 |
| `fe-1.4-quiz-writable-own` | 10 | Q11 | EX04 |
| `fe-1.4-quiz-inherited-readonly` | 10 | Q11 | EX04 |
| `fe-1.4-quiz-setter-receiver` | 10 | Q11/Q19 | EX04 |
| `fe-1.4-quiz-instanceof-without-call` | 11 | Q23 | EX03 |
| `fe-1.4-quiz-prototype-replacement` | 11 | Q13/Q23 | EX03 |
| `fe-1.4-quiz-null-proto-key` | 12 | Q12 | EX03 |
| `fe-1.4-quiz-class-method-enumerability` | 13 | Q07 | EX07 |
| `fe-1.4-quiz-class-call` | 13 | Q07 | EX07 |
| `fe-1.4-quiz-class-tdz` | 13 | Q07 | EX07 |
| `fe-1.4-quiz-field-identity` | 14 | Q15 | EX07 |
| `fe-1.4-quiz-field-bypasses-setter` | 14 | Q15/Q25 | EX07 |
| `fe-1.4-quiz-super-call-receiver` | 15 | Q14 | EX07 |
| `fe-1.4-quiz-this-before-super` | 15 | Q14 | EX07 |
| `fe-1.4-quiz-field-init-order` | 15 | Q14 | EX07 |
| `fe-1.4-quiz-borrowed-super` | 15 | Q14/Q30 | EX07 |
| `fe-1.4-quiz-static-inherited` | 16 | Q07/Q14 | EX07 |
| `fe-1.4-quiz-private-imitation` | 16 | Q16/Q23 | EX07 |
| `fe-1.4-quiz-private-inherited` | 16 | Q16 | EX07 |
| `fe-1.4-quiz-private-static` | 16 | Q16 | EX07 |
| `fe-1.4-quiz-composition-choice` | 17 | Q24 | EX08/EX13 |
| `fe-1.4-quiz-hasown-in` | 18 | Q06/Q22 | EX05 |
| `fe-1.4-quiz-hidden-key` | 18 | Q06/Q17 | EX05 |
| `fe-1.4-quiz-symbol-ownkeys` | 18 | Q17 | EX05 |
| `fe-1.4-quiz-enumeration-match` | 19 | Q17 | EX05 |
| `fe-1.4-quiz-forin-shadow` | 19 | Q17 | EX05 |
| `fe-1.4-quiz-keys-vs-values` | 19 | Q17/Q25 | EX05 |
| `fe-1.4-quiz-mixed-descriptor` | 20 | Q18/Q21 | EX06 |
| `fe-1.4-quiz-redefine-flags` | 20 | Q18/Q25 | EX06 |
| `fe-1.4-quiz-immutable-back` | 20 | Q18/Q25 | EX06 |
| `fe-1.4-quiz-reflect-getter` | 21 | Q19 | EX04/EX11 |
| `fe-1.4-quiz-getteronly-write` | 21 | Q11/Q19 | EX04 |
| `fe-1.4-quiz-prevent-delete` | 22 | Q08 | EX10 |
| `fe-1.4-quiz-sealed-write` | 22 | Q08 | EX10 |
| `fe-1.4-quiz-frozen-nested` | 22 | Q20 | EX10 |
| `fe-1.4-quiz-frozen-setter` | 23 | Q20/Q25 | EX10 |
| `fe-1.4-quiz-frozen-private` | 23 | Q20 | EX10 |
| `fe-1.4-quiz-reflect-frozen` | 22 | Q08/Q25 | EX10 |
| `fe-1.4-quiz-proxy-getreceiver` | 25 | Q26 | EX11 |
| `fe-1.4-quiz-set-forgot-return` | 24 | Q27 | EX11 |
| `fe-1.4-quiz-proxy-invariant` | 26 | Q26 | EX11 |
| `fe-1.4-quiz-revoked-typeof` | 26 | Q28 | EX12 |
| `fe-1.4-quiz-proxy-choice` | 27 | Q28/Q30 | EX13 |
| `fe-1.4-quiz-diagnose-shared-state` | 28 | Q30 | EX14 |
| `fe-1.4-quiz-choose-property-operation` | 28 | Q11/Q25/Q30 | EX04/EX14 |
| `fe-1.4-flip-inherited-this` | 1 | Q02 | EX02 |
| `fe-1.4-flip-creation-placement` | 5 | Q01/Q10 | EX08 |
| `fe-1.4-flip-new-vs-create` | 6 | Q04/Q23 | EX03 |
| `fe-1.4-flip-prototype-links` | 8 | Q05 | EX03 |
| `fe-1.4-flip-undefined-shadow` | 9 | Q11 | EX04 |
| `fe-1.4-flip-inherited-write` | 10 | Q11/Q19 | EX04 |
| `fe-1.4-flip-instanceof-limits` | 11 | Q23 | EX03 |
| `fe-1.4-flip-method-vs-field` | 14 | Q07/Q15 | EX07 |
| `fe-1.4-flip-super-receiver` | 15 | Q14 | EX07 |
| `fe-1.4-flip-two-inheritance-chains` | 15 | Q05/Q14 | EX03/EX07 |
| `fe-1.4-flip-initialization-order` | 15 | Q14 | EX07 |
| `fe-1.4-flip-static-placement` | 16 | Q07/Q16 | EX07 |
| `fe-1.4-flip-brand-vs-prototype` | 16 | Q16/Q23 | EX07 |
| `fe-1.4-flip-composition-criteria` | 17 | Q24 | EX08/EX13 |
| `fe-1.4-flip-hasown-vs-in` | 18 | Q06/Q22 | EX05 |
| `fe-1.4-flip-enumeration-axes` | 19 | Q17 | EX05 |
| `fe-1.4-flip-hidden-not-private` | 18 | Q06/Q17 | EX05 |
| `fe-1.4-flip-descriptor-kinds` | 20 | Q18/Q21 | EX06 |
| `fe-1.4-flip-descriptor-defaults` | 20 | Q18/Q25 | EX06 |
| `fe-1.4-flip-accessor-receiver` | 21 | Q19 | EX04/EX11 |
| `fe-1.4-flip-integrity-matrix` | 22 | Q08 | EX10 |
| `fe-1.4-flip-shallow-freeze` | 22 | Q20 | EX10 |
| `fe-1.4-flip-frozen-state` | 23 | Q20/Q25 | EX10 |
| `fe-1.4-flip-reflect-receiver` | 25 | Q26 | EX11 |
| `fe-1.4-flip-invariants-revocation` | 26 | Q26/Q28 | EX12 |
| `fe-1.4-flip-diagnosis-sequence` | 28 | Q30 | EX14 |
| `fe-1.4-quiz-validate-before-write` | 21 | Q21/Q25 | EX06 |
| `fe-1.4-quiz-proxy-validation-rule` | 24 | Q29 | EX11/EX12 |
