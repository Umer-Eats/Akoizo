# Division C lessons

The lesson catalog serves the Pink, Yellow, Purple, Blue, Green, and Orange timeslots in Division C, except Engineering CAD. Division B and A remain outside this lesson rollout.

- Anatomy and Physiology: 10 units, 20 lessons, 140 practice questions.
- Forensics: 9 units, 20 lessons, 140 practice questions. Includes the syllabus's integumentary-system, pollen/seed, and track topics.
- Yellow: Codebusters (7 units), Remote Sensing (10), Disease Detectives (10).
- Purple: Astronomy (8 units), Botany (10), Experimental Design (8).
- The Yellow/Purple expansion adds 53 unit lessons and 371 practice questions, bringing that rollout to 93 lessons and 651 practice questions. See [Yellow and Purple course coverage](YELLOW_PURPLE_LESSONS.md).
- Blue: Chemistry Lab (9 units), Rocks & Minerals (8).
- Green: Circuit Lab (10), Water Quality (9), Protein Modeling (8).
- Orange: Designer Genes (10), Dynamic Planet (10), Thermodynamics (10).
- The Blue/Green/Orange expansion adds 74 lessons and 518 questions: the full catalog now has **167 lessons and 1,169 practice questions**. See [Blue, Green, and Orange coverage](BLUE_GREEN_ORANGE_LESSONS.md) for eight new labs and 18 credited online figures.
- Every lesson has developed text, learning objectives, key terms, a worked example with a revealable solution, an interactive model or evidence investigation, and seven practice questions.
- These courses follow the supplied 2026 SciConnect syllabi. Their scope is intentionally distinguished from the application's tournament-year rulebooks. Anatomy Unit 10 retains its extension status.
- Course metadata and displayed lesson content omit teacher names. All current lessons are explicitly text lessons; no empty video tabs are offered.

## Implementation

The [external figure expansion](LESSON_IMAGE_EXPANSION.md) and [further diagrams](MORE_LESSON_DIAGRAMS.md) add 72 images and diagrams discovered with Firecrawl, bringing the reference catalog to 90 figures across all 16 Division C courses. Each has a lesson-specific interpretation prompt, source credits, reuse terms, and an enlargement viewer.

`src/lib/lessons-anatomy.ts` and `src/lib/lessons-forensics.ts` contain the complete authorable course data. `lessonsForEvent(eventId, division)` enforces Division C availability. The event dashboard passes the authenticated student ID to the lesson workspace.

`src/lib/lesson-models.ts` contains ten bounded numerical teaching models: feedback correction, airway resistance, ventilation/dead space, diffusion, lactose substrate balance, illustrative immune memory, density/buoyancy, chromatography, ideal stain angle, and thermal accumulation. Each exposes its equation and assumptions. Model outputs are not clinical predictions or complete forensic reconstructions. A temporary six-trial notebook supports comparison within the open lesson.

Evidence investigations require collecting observations before selecting a conclusion and provide explanatory feedback. Simulations reset when changing lessons. Their notebook is session-only; the page labels this explicitly.

`src/components/lesson-diagrams.tsx` supplies live SVG diagrams for all ten models. Slider changes update geometry, labels, and a text description of the result. Graphs keep fixed axes for comparisons. On narrow screens, diagrams retain readable labels inside a keyboard-accessible horizontal scroll area. Each investigation has an evidence map; tissue-section, STR, and glass-comparison labs have dedicated diagrams whose evidence is revealed by the observation controls. Restarting a lab resets its diagram.

The ventilation diagram's distinction between conducting-airway dead space and gas-exchanging regions was checked against [OpenStax, The Process of Breathing](https://openstax.org/books/anatomy-and-physiology-2e/pages/22-3-the-process-of-breathing), using Firecrawl search excerpts. It illustrates the existing fixed-dead-space model; it does not introduce a new physiological model.

## Practice and persistence

Multiple-choice questions use their configured point values. Written answers are **not** assigned keyword scores: students compare each answer with its explanation and explicitly mark it reviewed. Submission requires every answer to be nonblank. A completed practice means submitted responses plus all written reviews, not a claim of mastery or a server-awarded score. Revising answers clears completion while retaining the draft.

Draft answers, submitted state, written review state, and selected lesson are saved under a versioned local-storage key scoped to student ID, Division C, and event. Reloading restores validated data. Corrupted or unavailable storage does not prevent study. Progress is local to the current browser; it does not synchronize across devices or update instructor assignments, rankings, or dashboard totals.

Lesson assignments and practice tests share `ChoiceOptions` and its stylesheet. Both use compact 18-pixel controls, adjacent wrapping answer text, selected-answer labels, and correct-answer feedback after submission. Multi-select practice-test behavior remains supported. Lesson self-review checkboxes also override global text-input sizing.

## Verification

The lessons also include contextual visual atlases and expanded experiment workbenches. See [lesson visuals and source credits](LESSON_VISUALS.md) for image licensing, placement, model-chart behavior, specimen-viewer assumptions, and additional browser coverage.

- `npm run typecheck`
- `npm test`
- `node --experimental-strip-types scripts/lessons-browser-check.mjs`

The browser check defaults to `http://127.0.0.1:3005` and accepts `TEST_BASE_URL`. It uses mocked authentication/API responses and creates no real accounts or server assignments. It covers all 40 lessons, all ten diagram models at slider limits, observation reveals/resets, keyboard navigation and diagram scrolling, MCQ control dimensions and text alignment, unit/lesson controls, calculations, trial reset, weighted scoring, written review, whitespace rejection, draft/selection restoration, student separation, Division B/CAD exclusions, corrupted/blocked storage, and 320/390/1440-pixel layouts in both themes. Review images are written under ignored `documents/qa/lessons`. The separate practice browser check verifies the shared controls in practice tests, including multi-select drafts and graded feedback.
