# fe-1.5 source coverage

Source: subsection 1.5, inventory JS-29–JS-34. H refers to the numbered handbook teaching question; Q and EX use JS-ARRAYS prefixes. 128 registered cards: 40 InfoCards (119 pages), 60 QuizCards and 28 FlipCards. Q/EX references identify related source topics, not identical prompts. Counts are actual registered cards; see README.md for scope, exclusions and verification.

## Primary inventory coverage

| Inventory | Teaching boundary | Representative actual cards |
| --- | --- | --- |
| JS-29 | Mutation, return values and copying APIs | `fe-1.5-info-mutator-returns`, `fe-1.5-info-slice-splice`, `fe-1.5-quiz-with-outside` |
| JS-30 | Transformations, queries and callbacks | `fe-1.5-info-method-result`, `fe-1.5-info-foreach-async`, `fe-1.5-quiz-traversal-delete` |
| JS-31 | Structure, length, holes and traversal | `fe-1.5-info-length-failure`, `fe-1.5-info-holes-copying`, `fe-1.5-quiz-map-hole` |
| JS-32 | Comparator consistency, stability and sorting copies | `fe-1.5-info-stable-sort`, `fe-1.5-quiz-multi-field`, `fe-1.5-quiz-sort-hole-order` |
| JS-33 | Destructuring, rest and spread | `fe-1.5-info-destructuring-default`, `fe-1.5-info-spread-context`, `fe-1.5-quiz-rest-dense` |
| JS-34 | Copy contracts, sharing, clone and transfer | `fe-1.5-info-structural-sharing`, `fe-1.5-info-clone-graph`, `fe-1.5-info-transfer-buffer`, `fe-1.5-info-json-copy` |

## Long exercise adaptation

EX15–EX16 become separate mobile decisions rather than a long code-entry challenge. Input length/ownership maps to `fe-1.5-info-length-boundary` and `fe-1.5-info-mutation-ownership`; significant falsy values to `fe-1.5-quiz-filter-boolean`; comparator defects and tie-breaking to `fe-1.5-quiz-comparator-boolean` and `fe-1.5-quiz-multi-field`; nested updates to `fe-1.5-quiz-sharing-update`; snapshot identity and types to `fe-1.5-info-clone-graph` and `fe-1.5-quiz-json-aliases`; measurement/design tradeoffs to `fe-1.5-info-copy-cost` and `fe-1.5-flip-review-checklist`.

The package does not ask learners to implement the complete source pipeline on a phone or claim benchmark results. The [plan](PLAN.md) and [package notes](README.md) explain overlap, exclusions and verification boundaries.

## Card-to-source mapping

| Card ID | Handbook | Question / exercise |
| --- | --- | --- |
| `fe-1.5-info-holes-copying` | H5 | Q03/Q10/Q11; EX05 |
| `fe-1.5-quiz-copy-reverse-hole` | H6 | Q11; EX05 |
| `fe-1.5-flip-shallow-alias` | H24 | Q24; EX11 |
| `fe-1.5-info-array-brand` | H1 | Q01; EX01 |
| `fe-1.5-info-length-boundary` | H2 | Q02; EX02 |
| `fe-1.5-info-non-index-keys` | H2 | Q02; EX02 |
| `fe-1.5-info-length-failure` | H7 | Q02; EX02 |
| `fe-1.5-info-own-hole` | H3 | Q03; EX02 |
| `fe-1.5-info-delete-sequence` | H4 | Q04/Q06; EX04 |
| `fe-1.5-info-traversal-holes` | H5 | Q10; EX05 |
| `fe-1.5-info-copy-dense` | H6 | Q11; EX05 |
| `fe-1.5-info-mutator-returns` | H8 | Q05; EX04 |
| `fe-1.5-info-fill-alias` | H8 | Q05/Q24; EX04 |
| `fe-1.5-info-slice-splice` | H9 | Q06; EX04/EX09 |
| `fe-1.5-info-mutation-ownership` | H10 | Q12/Q31; EX15 |
| `fe-1.5-info-copy-api` | H11 | Q06/Q11; EX09 |
| `fe-1.5-info-method-result` | H12 | Q07; EX03 |
| `fe-1.5-info-map-return` | H13 | Q08; EX06 |
| `fe-1.5-info-callback-arguments` | H12 | Q07/Q08; EX06 |
| `fe-1.5-info-filter-falsy` | H14 | Q13; EX06 |
| `fe-1.5-info-find-absence` | H14 | Q10/Q15; EX05 |
| `fe-1.5-info-empty-quantifiers` | H14 | Q15; EX06 |
| `fe-1.5-info-reduce-seed` | H15 | Q14; EX06 |
| `fe-1.5-info-foreach-async` | H16 | Q17; EX07 |
| `fe-1.5-info-traversal-mutation` | H17 | Q16; EX07 |
| `fe-1.5-info-default-sort` | H18 | Q09; EX08 |
| `fe-1.5-info-comparator-contract` | H19 | Q18; EX08 |
| `fe-1.5-info-stable-sort` | H19 | Q19; EX08 |
| `fe-1.5-info-sort-holes` | H20 | Q20; EX05/EX08 |
| `fe-1.5-info-destructuring-default` | H21 | Q21; EX10 |
| `fe-1.5-info-rest-array` | H21 | Q21; EX10 |
| `fe-1.5-info-spread-context` | H22 | Q22; EX10 |
| `fe-1.5-info-assign-setter` | H23 | Q23; EX10 |
| `fe-1.5-info-getter-copy` | H23 | Q23; EX10 |
| `fe-1.5-info-shallow-graph` | H24 | Q24; EX11 |
| `fe-1.5-info-structural-sharing` | H25 | Q25; EX11 |
| `fe-1.5-info-copy-cost` | H26 | Q31/Q32; EX15/EX16 |
| `fe-1.5-info-deep-contract` | H27 | Q26; EX12 |
| `fe-1.5-info-clone-graph` | H28 | Q27; EX13 |
| `fe-1.5-info-clone-limits` | H29 | Q28; EX12/EX13 |
| `fe-1.5-info-transfer-buffer` | H30 | Q29; EX13 |
| `fe-1.5-info-json-copy` | H31 | Q30; EX14 |
| `fe-1.5-quiz-typed-array-brand` | H1 | Q01; EX01 |
| `fe-1.5-quiz-fake-array-brand` | H1 | Q01; EX01 |
| `fe-1.5-quiz-index-growth` | H2 | Q02; EX02 |
| `fe-1.5-quiz-non-index` | H2 | Q02; EX02 |
| `fe-1.5-quiz-length-truncate` | H2 | Q02; EX02 |
| `fe-1.5-quiz-length-refusal` | H7 | Q02; EX02 |
| `fe-1.5-quiz-explicit-undefined` | H3 | Q03; EX02 |
| `fe-1.5-quiz-delete-length` | H4 | Q04; EX04 |
| `fe-1.5-quiz-map-hole` | H5 | Q10–Q11; EX05 |
| `fe-1.5-quiz-filter-hole` | H5 | Q10–Q11; EX05 |
| `fe-1.5-quiz-find-hole` | H5 | Q10–Q11; EX05 |
| `fe-1.5-quiz-spread-hole` | H5 | Q10–Q11; EX05 |
| `fe-1.5-quiz-with-dense` | H6 | Q11; EX05 |
| `fe-1.5-quiz-push-return` | H8 | Q05; EX04 |
| `fe-1.5-quiz-pop-empty` | H8 | Q05; EX04 |
| `fe-1.5-quiz-splice-result` | H9 | Q06; EX04/EX09 |
| `fe-1.5-quiz-slice-end` | H9 | Q06; EX04/EX09 |
| `fe-1.5-quiz-reverse-identity` | H8 | Q05; EX04 |
| `fe-1.5-quiz-to-spliced` | H11 | Q06/Q11; EX09 |
| `fe-1.5-quiz-with-negative` | H11 | Q06/Q11; EX09 |
| `fe-1.5-quiz-with-outside` | H11 | Q06/Q11; EX09 |
| `fe-1.5-quiz-fill-shared` | H8 | Q05; EX04 |
| `fe-1.5-quiz-copy-within-hole` | H8 | Q05; EX04 |
| `fe-1.5-quiz-map-missing-return` | H13 | Q08; EX06 |
| `fe-1.5-quiz-foreach-result` | H13 | Q08; EX06 |
| `fe-1.5-quiz-filter-boolean` | H14 | Q10/Q13/Q15; EX06 |
| `fe-1.5-quiz-filter-nullish` | H14 | Q10/Q13/Q15; EX06 |
| `fe-1.5-quiz-find-distinction` | H14 | Q10/Q13/Q15; EX06 |
| `fe-1.5-quiz-every-empty` | H14 | Q10/Q13/Q15; EX06 |
| `fe-1.5-quiz-some-empty` | H14 | Q10/Q13/Q15; EX06 |
| `fe-1.5-quiz-reduce-empty` | H15 | Q14; EX06 |
| `fe-1.5-quiz-reduce-single` | H15 | Q14; EX06 |
| `fe-1.5-quiz-reduce-initial` | H15 | Q14; EX06 |
| `fe-1.5-quiz-async-foreach-return` | H16 | Q17; EX07 |
| `fe-1.5-quiz-traversal-append` | H17 | Q16; EX07 |
| `fe-1.5-quiz-traversal-delete` | H17 | Q16; EX07 |
| `fe-1.5-quiz-sort-default` | H18 | Q09; EX08 |
| `fe-1.5-quiz-sort-numeric` | H18 | Q09; EX08 |
| `fe-1.5-quiz-comparator-boolean` | H19 | Q18; EX08 |
| `fe-1.5-quiz-stable-order` | H19 | Q18–Q19; EX08 |
| `fe-1.5-quiz-multi-field` | H19 | Q18–Q19; EX08 |
| `fe-1.5-quiz-sort-hole-order` | H20 | Q12/Q20; EX08 |
| `fe-1.5-quiz-sorted-dense` | H20 | Q12/Q20; EX08 |
| `fe-1.5-quiz-destructure-default` | H21 | Q21; EX10 |
| `fe-1.5-quiz-rest-dense` | H21 | Q21; EX10 |
| `fe-1.5-quiz-object-spread-array` | H22 | Q22; EX10 |
| `fe-1.5-quiz-spread-getter` | H23 | Q23; EX10 |
| `fe-1.5-quiz-assign-target-setter` | H23 | Q23; EX10 |
| `fe-1.5-quiz-shallow-identity` | H24 | Q24; EX11 |
| `fe-1.5-quiz-sharing-update` | H25 | Q25; EX11 |
| `fe-1.5-quiz-clone-cycle` | H28 | Q27; EX13 |
| `fe-1.5-quiz-clone-aliases` | H28 | Q27; EX13 |
| `fe-1.5-quiz-clone-class` | H29 | Q28; EX12/EX13 |
| `fe-1.5-quiz-transfer-detach` | H30 | Q29; EX13 |
| `fe-1.5-quiz-json-null` | H31 | Q30; EX14 |
| `fe-1.5-quiz-json-cycle` | H31 | Q30; EX14 |
| `fe-1.5-quiz-clone-function` | H29 | Q28; EX12/EX13 |
| `fe-1.5-quiz-json-aliases` | H31 | Q30; EX14 |
| `fe-1.5-quiz-clone-regexp` | H29 | Q28; EX12/EX13 |
| `fe-1.5-flip-array-brand` | H1 | Q01; EX01 |
| `fe-1.5-flip-length-boundary` | H2 | Q02; EX02 |
| `fe-1.5-flip-hole-presence` | H3 | Q03; EX02 |
| `fe-1.5-flip-delete-splice` | H4 | Q04/Q06; EX04/EX09 |
| `fe-1.5-flip-map-filter-holes` | H5 | Q10; EX05 |
| `fe-1.5-flip-slice-spread-holes` | H5 | Q11; EX05 |
| `fe-1.5-flip-mutator-returns` | H8 | Q05; EX04 |
| `fe-1.5-flip-slice-splice-copy` | H9 | Q06; EX09 |
| `fe-1.5-flip-with-range` | H11 | Q11; EX09 |
| `fe-1.5-flip-map-foreach` | H13 | Q07/Q08; EX03/EX06 |
| `fe-1.5-flip-filter-boolean` | H14 | Q13; EX06 |
| `fe-1.5-flip-find-undefined` | H14 | Q10; EX05 |
| `fe-1.5-flip-empty-every` | H14 | Q15; EX06 |
| `fe-1.5-flip-reduce-initial` | H15 | Q14; EX06 |
| `fe-1.5-flip-async-foreach` | H16 | Q17; EX07 |
| `fe-1.5-flip-traversal-change` | H17 | Q16; EX07 |
| `fe-1.5-flip-comparator-sign` | H19 | Q18; EX08 |
| `fe-1.5-flip-stable-sort` | H19 | Q19; EX08 |
| `fe-1.5-flip-sort-copy` | H20 | Q12/Q20; EX08/EX09 |
| `fe-1.5-flip-destructure-default` | H21 | Q21; EX10 |
| `fe-1.5-flip-spread-contexts` | H22 | Q22; EX10 |
| `fe-1.5-flip-sharing-path` | H25 | Q25; EX11 |
| `fe-1.5-flip-deep-contract` | H27 | Q26; EX12 |
| `fe-1.5-flip-clone-limits` | H29 | Q28; EX12/EX13 |
| `fe-1.5-flip-transfer-ownership` | H30 | Q29; EX13 |
| `fe-1.5-flip-json-losses` | H31 | Q30; EX14 |
| `fe-1.5-flip-review-checklist` | H26 | Q31/Q32; EX15/EX16 |
