# Lesson-specific labs, PhET investigations, and activities

Every one of the 167 Division C lessons now carries interactive material written for that lesson alone, in addition to its existing text, worked example, course lab, and practice assignment.

| Added                                | Count | Where it appears                                 |
| ------------------------------------ | ----: | ------------------------------------------------ |
| Lesson-specific virtual labs         |   168 | “Lesson labs” section; a preview inside the text |
| Guided PhET investigations (50 sims) |    55 | “Lesson labs” section                            |
| Classification boards                |   167 | “Practice the ideas before the lab”              |
| Inline “pause and check” questions   |   167 | Inside the reading, after a chosen section       |
| Solution-ordering and term-matching  |   all | Generated from each lesson’s own worked example  |
| Credited reference figures           |   +90 | Inside the reading (180 in total)                |

## Why this was needed

An audit of the catalog found no duplicated prose, examples, or questions between events. The sameness was structural: in 14 of the 16 courses every unit reused one course-wide lab (all eight Astronomy units showed the same H–R diagram; all ten Dynamic Planet units the same hydrograph), all of them shared one instruction paragraph, and 96 lessons had no figure at all. The Chemistry and Thermodynamics courses also shared a gas-path panel.

Each lesson now leads with material of its own. No virtual lab is used by more than one event, and none appears in more than two lessons. Tests enforce both rules.

| Course               | New labs | PhET placements |
| -------------------- | -------: | --------------: |
| Anatomy & Physiology |       18 |               2 |
| Forensics            |       18 |               2 |
| Codebusters          |        8 |               0 |
| Remote Sensing       |       10 |               4 |
| Disease Detectives   |       11 |               1 |
| Astronomy            |        7 |               4 |
| Botany               |       11 |               1 |
| Experimental Design  |        7 |               6 |
| Chemistry Lab        |        9 |               9 |
| Rocks & Minerals     |        9 |               2 |
| Circuit Lab          |       11 |               8 |
| Water Quality        |       10 |               4 |
| Protein Modeling     |        9 |               1 |
| Designer Genes       |       11 |               3 |
| Dynamic Planet       |       10 |               1 |
| Thermodynamics       |        9 |               7 |

Codebusters has no PhET placement because no PhET simulation covers its content; it has eight purpose-built cipher labs instead.

## Virtual labs

`src/lib/topic-lab-kit.ts` defines a lab as plain data plus one pure `run(values)` function that returns numbers, metrics, and an optional scene, plot, or bar chart. `src/components/topic-lab.tsx` renders every lab with the same inquiry sequence:

1. **Predict** — a multiple-choice prediction is committed before testing.
2. **Test** — sliders, selects, and toggles update a live diagram, graph, and read-outs.
3. **Reach the goals** — two to four goals are detected automatically from the lab’s state and stay ticked once reached. Each has an optional hint.
4. **Record** — up to eight data rows can be captured into a comparison table.
5. **Check** — the prediction is explained, and the equations, assumptions, and limits are stated.

Because models are pure functions they are unit-tested in Node. For all 168 labs, `tests/lesson-extras.test.ts` checks that every output, shape coordinate, and curve is finite at the defaults and at each end of every control; that non-finite input is bounded like slider input; that no goal is already satisfied when the lab opens; and that each goal’s recorded solution lies on a reachable slider step and actually satisfies it.

All lab data are synthetic teaching values. Each lab’s disclosure panel says what the model omits; clinical and forensic labs state that they are not decision tools.

Lab definitions live in one file per event under `src/lib/extras/`, alongside that event’s PhET placements, classification boards, and inline checks. `src/lib/extras/index.ts` exposes them by lesson ID, so course objects and their identity in the registry are unchanged.

## PhET simulations

`src/components/phet-sim.tsx` embeds PhET HTML5 simulations from `https://phet.colorado.edu/sims/html/<sim>/latest/<sim>_en.html`. Nothing is copied or modified: the simulation runs from PhET’s servers inside a frame, loaded only when the student presses **Start simulation**. Each placement has an original rationale and an ordered checklist of investigation tasks tied to the lesson. All 50 embed URLs returned HTTP 200 when authored, and the test suite restricts placements to that verified list.

**Licence.** PhET’s regular HTML simulations are published under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) ([licensing page](https://phet.colorado.edu/en/licensing), read with Firecrawl). The required attribution is shown beneath every embed, and the PhET logo inside the frame is left untouched. Non-commercial educational use needs no further permission. PhET counts ad-supported sites and paid or subscription products as commercial use, which requires a licence from the University of Colorado Boulder — **if Akoizo ever carries advertising or a paid tier, the PhET embeds must be licensed or removed first.**

Several virtual labs were inspired by PhET’s predict–explore–explain style but share no code or artwork with PhET.

## Activities

`src/components/lesson-activities.tsx` adds ungraded practice with immediate feedback:

- **Classification boards** — authored per lesson; every card is assigned a category, and incorrect cards stay open for revision.
- **Rebuild the reasoning** — the lesson’s own worked-example steps, presented in a stable scrambled order to be re-sequenced with keyboard-accessible controls.
- **Vocabulary in context** — each key term matched against definitions drawn from the same lesson.
- **Pause and check** — one authored question inside the reading, with the correct option’s position rotated deterministically.

Activity and lab state is deliberately not saved; only the practice assignment persists, as before.

## Reference figures

`src/lib/lesson-reference-commons.ts` adds 90 Wikimedia Commons figures. Candidates were found with Firecrawl and Commons search. Each file’s existence, author, and licence were then confirmed through the Commons API; only public-domain, CC0, CC BY, and CC BY-SA files were accepted (one GFDL-only candidate was rejected). Every image was viewed before its alternative text and study prompt were written — twenty captions were rewritten after viewing — and one photograph of an identifiable person was dropped. Each URL was confirmed to return an image.

Lessons without any reference figure fell from 96 to 20; all 20 have a lab diagram or graph of their own.

## Verification

- `npm run typecheck`
- `npm test` — 65 tests, including the three in `tests/lesson-extras.test.ts`
- `node --experimental-strip-types scripts/lesson-extras-browser-check.mjs`

The browser check defaults to `http://127.0.0.1:3005` and accepts `TEST_BASE_URL` and `EVENTS=astronomy,botany`. It uses mocked authentication, blocks remote hosts, and for every lesson completes the classification board, checks the solution ordering and inline check, drives each lab’s sliders to their limits looking for `NaN`, commits and checks the prediction, records and clears a data row, starts and closes each PhET frame, and asserts no horizontal overflow at 1440 and 390 pixels. `SHOTS=1` writes review images under the ignored `documents/qa/lesson-extras`.
