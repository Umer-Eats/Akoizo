# Division B parity

Every tool that Division C events have now works for the matching Division B events. Practice Tests and Ranked Tests already served both divisions; this change adds Lessons, Cheat Sheets, Binders, and Lab tabs for Division B.

## Lessons

- **Shared events** (Anatomy and Physiology, Botany, Circuit Lab, Codebusters, Disease Detectives, Dynamic Planet, Experimental Design, Remote Sensing, Rocks and Minerals, Thermodynamics, Water Quality) reuse the Division C course, including Ako teaching, topic labs, PhET embeds, figures, and practice. The 2027 B rules cover the same topics at a narrower depth, so the course intro tells B students that some units go deeper than their rules. See `sharedDivisionBEvents` in `src/lib/lessons-registry.ts`.
- **Division B-only events** have new courses written from the 2027 B rules: Crime Busters (7 units), Food Science (7), Heredity (8), Meteorology (8), and Solar System (7), in `src/lib/lessons-*.ts` and collected in `src/lib/lessons-division-b.ts`. Each lesson meets the same bar as the C courses (6 sections of at least 345 words, 3-step visual, 3 contrasts, 7 practice questions) and uses an evidence investigation as its lab. Their extras (`src/lib/extras/{crime-busters,food-science,heredity,meteorology,solar-system}.ts`) add 24 topic labs, PhET embeds, sorting activities, and inline checks.
- Build events (Boomilever, gliders, Roller Coaster, and so on) still have no course in either division.

## Cheat sheets and binders

- Division B students can generate cheat sheets for the 8 B cheat-sheet events and binders for the 6 B binder events (including Meteorology, which has new page guidance).
- Generation is grounded in the Division B rulebook text in `src/data/cheatsheet-rules-b.json` and `src/data/binder-rules-b.json`. Rebuild them with `node scripts/extract-division-b-rules.mjs` (needs Poppler’s `pdftotext`).
- `cheat_sheets` and `binders` have a `division` column (existing rows default to C; `initializeDatabase` adds the column to older databases). Each division has its own shared cheat sheet library. The binder library stays readable by everyone; event views filter by the student’s division, and cards show the division.

## Labs

Division B Lab tabs now open the virtual labs, each built on a Division B archive question: a series/parallel resistor bench (BullSO 2026 Circuit Lab B), ink chromatography (Greenbrier 2026 Crime Busters B), and a new percent-curd lab (Wicklund 2016 Food Science B, `curd` model). Experimental Design shares its design lab with Division C. Instructors can assign these labs and their PhET companions.

## Verification

- `tests/division-b.test.ts` checks that every B tool with C content has content in B, and the quality bar for the new courses. Lesson extras, labs, cheat sheet, and binder tests cover both divisions.
- `TEST_BASE_URL=http://127.0.0.1:3006 node scripts/division-b-browser-check.mjs` drives the real UI as a Division B student with mocked auth and API; screenshots go to `documents/qa/division-b/`.
