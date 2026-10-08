# Pink timeslot lessons

The lesson catalog currently serves Division C Anatomy and Physiology and Forensics. Engineering CAD and other divisions/events do not receive these courses.

- Anatomy and Physiology: 10 units, 20 lessons, 140 practice questions.
- Forensics: 9 units, 20 lessons, 140 practice questions. Includes the syllabus's integumentary-system, pollen/seed, and track topics.
- Every lesson has developed text, learning objectives, key terms, a worked example with a revealable solution, an interactive model or evidence investigation, and seven practice questions.
- These courses follow the supplied 2026 SciConnect syllabi. Their scope is intentionally distinguished from the application's tournament-year rulebooks. Anatomy Unit 10 retains its extension status.
- Course metadata and displayed lesson content omit teacher names. All current lessons are explicitly text lessons; no empty video tabs are offered.

## Implementation

`src/lib/lessons-anatomy.ts` and `src/lib/lessons-forensics.ts` contain the complete authorable course data. `lessonsForEvent(eventId, division)` enforces Division C availability. The event dashboard passes the authenticated student ID to the lesson workspace.

`src/lib/lesson-models.ts` contains ten bounded numerical teaching models: feedback correction, airway resistance, ventilation/dead space, diffusion, lactose substrate balance, illustrative immune memory, density/buoyancy, chromatography, ideal stain angle, and thermal accumulation. Each exposes its equation and assumptions. Model outputs are not clinical predictions or complete forensic reconstructions. A temporary six-trial notebook supports comparison within the open lesson.

Evidence investigations require collecting observations before selecting a conclusion and provide explanatory feedback. Simulations reset when changing lessons. Their notebook is session-only; the page labels this explicitly.

## Practice and persistence

Multiple-choice questions use their configured point values. Written answers are **not** assigned keyword scores: students compare each answer with its explanation and explicitly mark it reviewed. Submission requires every answer to be nonblank. A completed practice means submitted responses plus all written reviews, not a claim of mastery or a server-awarded score. Revising answers clears completion while retaining the draft.

Draft answers, submitted state, written review state, and selected lesson are saved under a versioned local-storage key scoped to student ID, Division C, and event. Reloading restores validated data. Corrupted or unavailable storage does not prevent study. Progress is local to the current browser; it does not synchronize across devices or update instructor assignments, rankings, or dashboard totals.

## Verification

- `npm run typecheck`
- `npm test`
- `node --experimental-strip-types scripts/lessons-browser-check.mjs`

The browser check defaults to `http://127.0.0.1:3005` and accepts `TEST_BASE_URL`. It uses mocked authentication/API responses and creates no real accounts or server assignments. It covers all 40 lessons, unit/lesson controls, investigations, calculations, trial reset, weighted scoring, written review, whitespace rejection, draft/selection restoration, student separation, Division B/CAD exclusions, corrupted/blocked storage, and 320/390/1440-pixel layouts in both themes. Review images are written under ignored `documents/qa/lessons`.
