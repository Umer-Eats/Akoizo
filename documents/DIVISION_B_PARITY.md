# Division B feature and content parity

The audit uses the repository's supplied 2027 Division B event PDFs. It does not claim to incorporate later tournament clarifications.

## Working tools

All 16 Division B study events have courses. Events with practice tabs have archived papers, and the existing ranked-test, tutor, assignment, progress, binder, and cheat-sheet systems accept Division B. The five subjects unique to B have their own courses and interactive extras: Crime Busters, Food Science, Heredity, Meteorology, and Solar System. They are not aliases for C subjects.

Water Quality B now exposes its missing Lab Practice and build-tool navigation. Its new salinometer simulation uses the required 1–10% mass/volume scale, with adjustable standards and float mass, unknown samples, plots, saved trial notebooks, answer checking, and the shared lab-submission workflow. The density relation is explicitly a synthetic teaching approximation. It does not relabel C's g/kg measurements as percent.

## Lesson adaptations

Shared subjects receive B-specific introductions and direct B rulebook references. Fifteen lessons have B-specific text, worked examples, evidence investigations, practice, inline checks, term classification, and process visuals:

- Circuit Lab: replace advanced semiconductor content with troubleshooting; omit the C semiconductor enrichment unit.
- Codebusters: replace affine content with Atbash/Caesar; rewrite table ciphers around Porta, Nihilist, and checkerboard; add columnar and homophonic coverage.
- Remote Sensing: replace six units covering sensors, orbits, maps, light equations, thermal interpretation, and land-cover change. Follow the B quantitative/qualitative distinction.
- Thermodynamics: replace calculus/logarithmic treatment of gas processes and entropy with graph interpretation, simple algebra, and energy reasoning.
- Botany: teach photosynthesis through inputs, outputs, respiration, and limiting factors.
- Experimental Design: replace the C abstract-focused unit with B evidence/report preparation.
- Water Quality: teach percent mass/volume calibration rather than treating g/kg as the tournament scale.

Freshwater monitoring, applied image interpretation, and emerging water contaminants remain core B material rather than being labeled optional extensions. Challenging topics explicitly present in B, such as Hardy–Weinberg calculations and thermodynamic cycles, remain available. Introductions identify important State/National distinctions; there is not a tournament-level filtering control.

Replacement lessons have distinct IDs so their C-specific extras and previous answers are not reused. Browser progress storage now includes the actual division. Existing C browser keys are unchanged; B no longer reads the old mixed C key. Server learning records are not deleted.

## Existing product limits

Video grading, course generation, CAD grading, and build-only lesson pages remain placeholders where they were already placeholders in C. Showing Water Quality's build navigation does not implement those engines. This work matches functioning C study features and fixes B-specific gaps; it does not turn placeholder tools into working services. Existing papers retain their archive/season scope information.

## Verification

`npm test` covers feature/content availability, independent B/C registries, replacement lesson activity integrity, division-isolated storage, and salinometer model/calibration behavior, alongside the existing service tests. `scripts/division-b-browser-check.mjs` checks mocked B navigation, a rewritten lesson on mobile, the four B Lab Practice pages, and B reference-tool libraries without modifying real school data.
