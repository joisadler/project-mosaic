# Content authoring contract

Read in the confirmed high phase. Verify the target handbook's owner-approved source, chapter, companion Q/A, practice/solutions, summary/infographic and relevant overlap. Source existence alone is insufficient. Adapt to mobile objectives; do not mechanically copy long exercises or expand into adjacent sections. Counts follow meaningful coverage, never quotas.

## Package namespace and registry

Use `fe-<section>.<subsection>` everywhere: `fe-1.12`, not `fe112`. Files: `src/content/fe-1.12-{info,quiz,flip}-cards.ts`; IDs: `fe-1.12-{info,quiz,flip}-<objective>`; exports: identifier-safe `feSection1_12InfoCards`. Keep stable card/option/section IDs because progress depends on them. Preserve source terminology/APIs/output in English; learning text is natural Russian with canonical English terms at first mention.

Register only when all three files exist, in `src/content/learning-sections.ts`, with explicit `chapterId`; add `learningChapters` only for a new chapter. Titles/ID prefixes never define membership. `fe` names the source handbook, regardless of JavaScript/React/CSS topic. Parent controls select existing children; persisted subsection IDs must not silently opt into future content. Use current types, validator and one neighboring package for conventions, not all historical packages.

## Standalone learning cards

- Info: one clear idea, explicitly authored horizontal `pages`; split long content.
- Quiz: a contextual comprehension question, four distinct plausible alternatives, one unambiguous answer and individual concise rationales. No clues/answer-revealing code comments or typing. Move detailed explanation into an InfoCard.
- Flip: a meaningful recall question and answer, exactly two sides; shorten/split excessive answers.

Every card works independently in the mixed shuffled feed. Explain causes/practical consequences and misconceptions; state environment/version/mode when they affect the result. Avoid unjustified categorical claims, ambiguity and repeated objectives without added value. Review every alternative separately; execution alone does not prove distractor exclusivity/quality.

After coverage/visual approval, test a dense actual-component three-type sample before bulk writing. Apply its measured limits to prose, code, inline identifiers and selected feedback. Reformat code deliberately; do not split lexical tokens automatically or postpone predictable fit problems. [Rendered constraints](rendered-checks.md#layout-and-accessibility) remain mandatory.

## Optional source links

Each card may define `readMoreUrl` for the real source section explaining its primary objective. Prefer a stable verified anchor. Only absolute HTTP(S), no placeholder/relative/credential-bearing/data/javascript URLs. Missing/invalid URLs produce no action; do not weaken the existing UI validation. Map multi-topic source choices and exclusions in COVERAGE.

## Result notation in examples and quiz options

Represent values/types, not a console's visual formatting. Double-quote all string results, including numeric-looking strings, `typeof` and hypothetical string distractors: `"12"`, `"undefined"`. Numbers, booleans, null, undefined, BigInt and exception names remain unquoted. Distinguish one string `"A,B,C"` from separate strings `"A", "B", "C"` and mixed output `7 / "seven"`. Apply to comments/options/explicit explanation values; category names in prose are not string literals. Check actual types before changing notation; keep answer identity stable.

Execute all checkable examples under [the semantic contract](semantics.md). Typecheck/build/structural validation and reasoning are not correctness evidence. Keep package README and COVERAGE source-specific: actual IDs/objectives, exclusions, sources, counts, reproducible checks, dated results and limitations. Release/count updates belong to [release](release.md).
