# Lesson visuals and experiment workbenches

The 40 Pink timeslot Division C lessons include 118 visual explanation panels: 40 original process diagrams, 40 comparison tables, 17 interactive model curves, and 21 placements of five sourced reference images. Panels appear within the relevant reading sections. The existing course prose, practice assignments, and Division C scope remain intact.

`src/lib/lesson-atlas.ts` holds the contextual diagram steps, comparison rows, and image attribution. `src/components/lesson-atlas.tsx` renders them. Process nodes are keyboard-operable; chart values also have a table; images support enlargement, zoom, scrolling, and Escape to close. All reference images are local assets, so lessons do not depend on third-party image servers. The chart controls are independent teaching examples whose fixed inputs are stated beside the plot.

## Image sources

Sources and licenses were checked with Firecrawl on October 9, 2026. Images are unmodified; the page credits the creator and links to the source and license beside every use.

| Local image             | Creator                                    | Source                                                                                                                    | License                                                   |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `respiratory-zone.jpg`  | OpenStax College                           | [The Respiratory Zone](https://commons.wikimedia.org/wiki/File:2309_The_Respiratory_Zone.jpg)                             | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `digestive-system.jpg`  | OpenStax College                           | [Components of the Digestive System](https://commons.wikimedia.org/wiki/File:2401_Components_of_the_Digestive_System.jpg) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `lymphatic-system.jpg`  | OpenStax College                           | [Anatomy of the Lymphatic System](https://commons.wikimedia.org/wiki/File:2201_Anatomy_of_the_Lymphatic_System.jpg)       | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `skin-structure.jpg`    | OpenStax College                           | [Structure of the Skin](https://commons.wikimedia.org/wiki/File:501_Structure_of_the_skin.jpg)                            | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `fingerprint-whorl.jpg` | NIST database, U.S. Department of Commerce | [Fingerprint Whorl](https://commons.wikimedia.org/wiki/File:Fingerprint_Whorl.jpg)                                        | Public domain, as documented on the source page           |

The skin image depicts hair-bearing skin; its caption explicitly distinguishes thick palmar friction skin. The NIST image is a whorl reference, not an image from a fictional case. The respiratory figure is a detailed anatomical reference, not a radiograph. These distinctions avoid assigning findings to an image it does not show.

## Interactive experiments

All ten numerical models offer three bounded presets, prediction checking against the current settings, a single-variable sweep, and a one-step advance. Sweep frames recompute the same model used by the readout and live diagram. Pause and reset stop playback. The trial notebook plots one selected output at a time with consistent units and a shared axis; each recorded trial retains its settings and all output values. Predictions and trial records are session-only learning aids.

Evidence investigations include a working-hypothesis selector, staged observation collection, per-observation reasoning notes, and an interactive reference pathway. Observations and conclusion feedback continue to use the authored case findings. Ten forensics investigations have original specimen viewers for powder/control assays, fibers, hair, prints, spectra, and botanical assemblages. Students can change magnification, annotations, reference comparisons, and optical focus where appropriate. The views are illustrative schematics, not new measurements. Focus changes do not recover missing detail from a smeared record. The spectrum shows the supplied base peak at m/z 91 without inventing unreported peaks.

Restarting an investigation clears the view, working hypothesis, and notebook. Changing lessons unmounts lab state and stops active sweep timers. Lesson practice persistence remains separate from temporary lab state.

## Verification

Run the type check, unit tests, production build, and `scripts/lessons-browser-check.mjs` against a local app. Browser coverage includes all 40 visual atlases, locally loading images, image zoom and Escape, model chart interaction, prediction/run feedback, playback pause and reset, recorded trial plots, specimen comparison/focus/zoom, per-observation notes, reference-pathway exploration, practice persistence, and narrow layouts in both themes. Screenshots are saved under ignored `documents/qa/lessons`.
