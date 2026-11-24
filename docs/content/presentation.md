# Content presentation

Read when proposing or changing section palettes/motifs.

## Optional visual motifs

Cards may include `visual?: { motif?: VisualMotif }` in `BaseCardData`. Select a motif by the card's primary learning objective after reading all pages or both sides. Motifs are optional: omit `visual` for the section default, and do not add metadata just to vary the feed.

| Registered section | Palette | Default | Optional motifs |
| --- | --- | --- | --- |
| `fe-1.1` | Blue/cyan | `scope`: cropped braces and nested contours | `lifecycle`: connected stages for declaration preparation, initialization, TDZ and execution order |
| `fe-1.2` | Plum/lilac | `values`: distinct circle, rounded square and diamond | `equality`: paired circular contours for equality/identity semantics; `conversion`: directed paths between shapes for explicit/implicit conversion and operator coercion |
| `fe-1.3` | Amber/copper | `capture`: function nodes linked to an enclosed binding | `invocation`: call paths converging on a receiver; `composition`: linked operation blocks for HOF/adapters, currying and transformation boundaries |
| `fe-1.4` | Jade/sage | `prototype`: linked separate object contours for delegation | `descriptor`: divided property-attribute panel; `interception`: separate wrapper/target contours with a routed operation |
| `fe-1.5` | Muted coral | `slots`: separate array cells with an outlined empty position | `transformation`: offset input/output rows; `sharing`: two containers linked to one nested object |
| `fe-1.6` | Periwinkle/ink | `entries`: paired collection nodes | `tokens`: distinct notched symbol contours; `cursor`: a position marker on a dotted traversal path |
| `fe-1.7` | Dusty rose/graphite | `boundary`: separate linked module contours | `causes`: offset cause-chain frames; `payload`: value and text-record contours |
| `fe-1.8` | Steel blue | `reachability`: linked nodes and one disconnected contour | — |
| `fe-1.9` | Muted lime/olive | `queue`: outlined entries on an open track | `deadline`: tick marks and an endpoint; `frame`: offset frame outlines |

```ts
visual: { motif: "conversion" },
```

Section membership comes exclusively from `learningSectionIdByCardId`, derived from the explicit section registry. A missing, unsupported or cross-section motif uses that section's default. An unregistered card receives the neutral palette and composition, even if it requests a known motif. TypeScript checks authored identifiers; runtime fallback also tolerates unsupported identifiers.

Application presets and reusable artwork live in `src/components/learning-feed/section-presentation.ts`, `section-presentation.module.scss` and `CardDecoration.tsx`. Never put colors, SVG markup, coordinates or styling instructions in card data. A motif remains fixed across revisits, rerenders, horizontal pages and flip sides. Artwork is static, non-interactive, hidden from accessibility APIs and fainter on cramped layouts; it reserves no content space.

Use the default for general values, types and object mutation in `fe-1.2`; equality examples alone do not make equality the primary objective. Likewise, scope remains the default for `fe-1.1`: the lifecycle motif describes declaration stages, not an event-loop queue. Add future motifs only when a meaningful subtopic warrants distinct geometry and placement, with at most two or three optional motifs per section. Review all three card types, dense content, code, selected quiz feedback, pages, flip sides and phone/desktop/landscape layouts when extending artwork.


Preserve symmetric content padding, header/indicators and the vertical icon-only action rail on the right. Discuss substantial visual/control changes before implementation.
