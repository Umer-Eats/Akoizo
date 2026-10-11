# Division C Lab tabs

Eight native interactive stations now replace the placeholder on every existing Division C Lab tab. The Experimental Design station uses its existing Lab Generator route. No Division A/B tool availability or content is changed.

| Event               | Stations                                    | Archive basis                                                                                       |
| ------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Chemistry Lab       | Dye kinetics; spectrophotometer calibration | BullSO 2026 C, p. 13, Section III Lab 1–7                                                           |
| Circuit Lab         | Resistor network; Wheatstone bridge         | Virginia 2013 C, p. 4, questions 27, 28, 32; original practical extensions of written questions     |
| Forensics           | Ink chromatography                          | Clio 2013 C, p. 6, questions 32–33; synthetic reference ink patterns                                |
| Water Quality       | Straw salinometer; five-day BOD             | Boca Raton Placement 2019 C, p. 14, Part III dry lab                                                |
| Experimental Design | Towel absorption                            | SOnerd SSSS 2021 C notes, p. 2, Scenario 1; archived practice prompt, not a scored tournament paper |

Source links, page/section references, and adaptation details are displayed in each station. Existing imported C question metadata and original local PDFs were used for the first four events. The Experimental Design prompt was available in the web search index of [the archived notes](https://scioly.org/tests/files/experimentaldesign_2021_c_ssss-sonerd_notes.pdf); direct retrieval returned the archive’s access challenge. Only the absorption topic is adapted; all numerical observations are newly simulated. No restricted files were fetched.

Each station includes procedures, a hypothesis, interactive apparatus and controls, live readings, a labeled prediction curve, 30 saved measurements, export, numerical feedback, calculation guidance, and a conclusion. Source questions are not presented as newly graded tournament questions. Models disclose their assumptions and units. Five repeatable sample variants are available where a hidden sample or material coefficient is meaningful. Resetting controls preserves notes and trials.

Notes and trials use browser storage scoped to account and lab. They are not synchronized to a server or instructor gradebook. Saving failures are disclosed and JSON export remains available. Stored readings are recomputed from validated settings when reopened.

PhET companions load on demand in an iframe, with attribution and a direct new-tab fallback. Beer’s Law Lab, Circuit Construction Kit: DC, Density, and Pendulum Lab are mapped to relevant events. Forensics Density and Experimental Design Pendulum are explicitly marked as extensions; they do not claim to recreate archive tasks. Native simulations work independently of PhET availability.

Validation commands:

- `npm run typecheck`
- `npm test` (includes coverage, archive references, scientific invariants, generated sample boundaries, and answer validation)
- `node scripts/division-c-labs-check.mjs` (mocked authentication/API; all stations, live readings, calculation feedback, saved notebooks, export, reset, responsive layouts, and A/B isolation)
- `node scripts/phet-labs-check.mjs` (live external PhET rendering; requires internet)

Browser screenshots are stored in `output/lab-qa/`. No deployment was performed.
