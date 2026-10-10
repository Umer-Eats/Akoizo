# Yellow and Purple Division C courses

The expansion covers every unit in the six supplied syllabi. Each unit has one complete text lesson: six developed explanation sections, objectives, key terms, a worked example with a revealable solution, a contextual process diagram, comparison table, inline subject diagram, interactive lab, three automatically checked MCQs, and four written questions with model answers and explicit self-review. The explanations total approximately 25,000 words, excluding examples, terms, practice, and lab guidance. Teacher names are omitted.

| Timeslot | Event               | Units / lessons | Practice questions | Source PDF                                             |
| -------- | ------------------- | --------------: | -----------------: | ------------------------------------------------------ |
| Yellow   | Codebusters         |               7 |                 49 | Codebusters SciConnect Syllabus 2026 - Google Docs.pdf |
| Yellow   | Remote Sensing      |              10 |                 70 | SciConnect Syllabus Remote Sensing.pdf                 |
| Yellow   | Disease Detectives  |              10 |                 70 | Intro to Disease Detectives Syllabus.pdf               |
| Purple   | Astronomy           |               8 |                 56 | Astronomy C SciConnect Syllabus 2026 - Google Docs.pdf |
| Purple   | Botany              |              10 |                 70 | Botany B_C SciConnect Syllabus 2026 - Google Docs.pdf  |
| Purple   | Experimental Design |               8 |                 56 | Introduction to Experimental Design Syllabus.pdf       |

## Scope and authoring

Sources are the local PDFs under `C:/Users/umerq/Downloads/SCIOLY-syllubi`. Their unit/topic lists inform original teaching prose; embedded document text is source material rather than instructions to the agent. The registry requires Division C. This expansion did not enable Division B, Division A, or Engineering CAD. Additional timeslots are documented in [Blue, Green, and Orange coverage](BLUE_GREEN_ORANGE_LESSONS.md). Course accents and labels follow the actual school timeslot mapping.

Remote Sensing Unit 10 and Disease Detectives Unit 10 retain optional extension labels. Codebusters distinguishes the syllabus's historical complete-columnar material from its checkerboard replacement note; historical notes are not presented as current tournament rules. Experimental Design includes standards of comparison, significant figures, and abstracts, while directing learners to the applicable competition checklist for current requirements. The Disease Detectives report walkthrough is explicitly synthetic and is never labeled a published MMWR report.

The six `src/lib/lessons-*.ts` course files contain authored explanations, examples, and question sets. `lesson-course-builder.ts` assembles this data without generating generic scientific prose. It rotates answer positions while preserving exact answer text. `lessons-yellow-purple.ts` collects the six courses. The existing practice component and browser-local progress model are reused.

## Interactive labs and original visuals

All new figures are original HTML/SVG schematics or plots, with readable labels, accessible names, and keyboard-scrollable viewers on narrow screens. Each lesson has an inline explanation diagram in addition to its lab. Flow nodes and comparison tables are tailored to that unit.

- **Codebusters:** reversible Caesar, Atbash, affine, Porta, checkerboard, Nihilist, modern Baconian, fractionated Morse, and historical complete-columnar transforms; a two-row alphabet mapping or keyed square; an input frequency histogram; and a SEND + MORE constraint inspector in Unit 6. Conventions include A=0, I/J combined in squares, 1–5 row/column labels, integer Nihilist addition, explicit Morse triple order, and retained columnar padding. These are teaching conventions rather than a claim of supporting every tournament variant. Invalid coordinates, groups, or keys show explanatory errors.
- **Remote Sensing:** adjustable band reflectance, linear vegetation/soil mixtures, NDVI/EVI, pixel area, illustrative composite channels, pulse range, and shortwave energy partition. Undefined ratios are reported. Separate physical models do not pretend to predict temperature, climate trends, or crop diagnoses.
- **Disease Detectives:** editable complete-cohort or diagnostic 2×2 tables, correctly oriented RR/OR and sensitivity/specificity/predictive values, independent onset-bin editing, and two-wave/low-prevalence examples. Undefined denominators are explicit. No inferred confidence interval, clinical recommendation, or causal proof is produced.
- **Astronomy:** fixed logarithmic H–R axes with decreasing temperature, temperature/radius/distance controls, giant and small-emitter presets, luminosity, inverse-square relative flux, Wien wavelength peak, distance modulus, and parallax. Independent temperature/radius controls isolate equations and do not infer a physical mass or age.
- **Botany:** labeled leaf anatomy, selectable structure explanations, stomatal geometry, relative light-response and water-loss indices, wet/dry scenarios, and life-cycle transitions with ploidy in the relevant units. The response model is illustrative rather than species-calibrated or a disease diagnostic.
- **Experimental Design:** synthetic raw trials, level means, sample SD/range, baseline differences, scatter diagrams, noise/offset controls, time drift, randomized order, a flagged anomaly, and new reproducible datasets. Synthetic jitter is deterministic and not claimed to be a statistical random sample. No significance test is implied.

Each lab has prediction and reasoning fields, a six-trial comparison notebook, and reset. Lab state is temporary and explicitly labeled; practice drafts and review progress retain the existing per-student/event browser persistence. Inline diagrams and lab controls use separate state so exploring an explanation does not silently alter a recorded experiment.

## References and verification

Course resource links point to [Science Olympiad Codebusters C](https://www.soinc.org/codebusters-c), [NASA Earthdata remote sensing](https://www.earthdata.nasa.gov/learn/backgrounders/remote-sensing), [USGS EVI](https://www.usgs.gov/landsat-missions/landsat-enhanced-vegetation-index), [CDC epidemiology training](https://www.cdc.gov/training-publichealth101/php/training/introduction-to-epidemiology.html), [CDC field analysis](https://www.cdc.gov/field-epi-manual/php/chapters/analyze-interpret-data.html), [OpenStax Astronomy](https://openstax.org/books/astronomy-2e/pages/1-introduction), [NASA Stars](https://science.nasa.gov/universe/stars/), [OpenStax Plant Body](https://openstax.org/books/biology-2e/pages/30-1-the-plant-body), [OpenStax Plant Transport](https://openstax.org/books/biology-2e/pages/30-5-transport-of-water-and-solutes-in-plants), and [Science Olympiad Experimental Design C](https://www.soinc.org/experimental-design-c). These support continued study; lessons are original explanations of established concepts rather than copied source passages.

Checks:

- `npm run typecheck`, `npm test`, `npm run build`.
- `node --experimental-strip-types scripts/subject-lessons-browser-check.mjs` against port 3005 (or `TEST_BASE_URL`). Covers all 53 units, six live labs, worked calculations, reset, practice completion/restoration, both themes at 320/390 pixels, diagram keyboard scrolling, and Division B exclusion.
- `node --experimental-strip-types scripts/lessons-browser-check.mjs` for existing Pink lesson regression coverage.

Screenshots are saved under ignored `documents/qa/subject-lessons`.
