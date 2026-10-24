# Feed text contrast review

## Scope and method

This review covers the current InfoCard, QuizCard and FlipCard text styles in both registered section palettes (`fe-1.1`, `fe-1.2`) and the neutral fallback: headings/strong/emphasis, prose, inline/fenced code, type badges, card counters, progress text, flip hints, quiz option letters/text in default/hover/correct/incorrect states, feedback, explanation controls, tooltips and notices. Loading, recovery and empty-state text/action colors were checked against their separate surfaces as well. It is not a full WCAG conformance audit of every page, interaction, text-resize mode or future content package.

Ratios use WCAG sRGB relative luminance and alpha compositing. To bound the brightest possible card background conservatively, each preset's brightest gradient base is combined with both maximum glow layers and then 22% accent artwork. Foreground transparency and each local surface (code, options, letter chips, feedback, etc.) are composited separately. This can be brighter than any actual rendered point: a failing bound in the old styles does not establish that every screenshot failed. After correction, all reviewed text pairs meet 4.5:1 even under this bound; headings were also held to 4.5:1 rather than relying on the large-text exception.

Reference: [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). These calculations do not establish non-text contrast, focus, reflow, screen-reader, or physical-device conformance. Decorative emoji/icons and browser developer tools are not application text. Current local content illustrations contain no SVG text; future illustrations and new palettes require a fresh check. There are no authored inline Markdown hyperlinks in the current packs; future link colors/states also need verification.

## Conservative minimum ratios across current presets

| Text or state | Previous bound | Updated bound |
| --- | ---: | ---: |
| Card counter and flip hints | 3.29:1 | 4.80:1 |
| Paragraphs | 4.16:1 | 4.80:1 |
| Emphasis | 4.08:1 | 4.72:1 |
| Inline code | 3.38:1 | 4.58:1 |
| Quiz option on hover | 4.44:1 | 4.63:1 |
| Quiz option letters, including hover | 2.84:1 | 6.07:1 |

| Other reviewed text | Minimum bound |
| --- | ---: |
| Progress label | 4.80:1 |
| Headings and strong text | 5.63:1 |
| Fenced code | 14.59:1 |
| Type badge | 8.93:1 |
| Default quiz option | 4.73:1 |
| Correct quiz option | 4.77:1 |
| Incorrect quiz option | 5.64:1 |
| Quiz explanation/feedback | 5.72:1 |
| Explanation button | 12.29:1 |
| Tooltip | 19.17:1 |
| Toast/notice | 16.37:1 |
| Loading/recovery/empty view text and actions | 6.37:1 |

Counters, progress labels, prose and flip hints now use opaque `#e9edf5`. Inline code uses `#f7f8ff`; emphasis retains a lighter accent mixture. Quiz hover fill is slightly less bright, and option letters use bright text on a subtle dark chip. Semantic correct/incorrect colors and the section palettes remain intact. The compact progress label uses the unchanged system font family with weight 400. It now shares the per-card flex header with the type badge and counter; header/progress movement follows the card, not the viewport.

## Rendered checks

An isolated, temporary presentation route exercised the actual card components without using stored progress or account state. Header row centers were measured on all three card types at 375×812 with 47/34px emulated safe-area insets, plus the narrow 320px and compact landscape layouts. Quiz default/selected incorrect/selected correct colors were checked in rendered styles; forced-colors label text uses CanvasText. The temporary route was removed. These checks are browser evidence, not owner iPhone/PWA validation or a fresh exhaustive audit of all 220 authored card states.

Recheck this document's ratios whenever text tokens, surfaces, glow strength, artwork opacity, palettes, or applicable content change. The calculations are bounds over the current CSS tokens, not permanent guarantees for future design changes.
