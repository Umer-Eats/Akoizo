# Competition reference formatting

Reviewed November 8, 2026.

## Research used

- [Scioly.org binder guide](https://scioly.org/wiki/Binders): prioritize retrieval speed, an explicit contents list, tabs and labels, and specimen images for identification. Page count alone does not determine usefulness.
- [ScioVirtual: Create Winning Binders](https://learn.sciovirtual.org/create-winning-binders-1), by Dynamic Planet instructor Michelle Li: organize by rule topics, use recognizable headings and subheadings, replace large paragraphs with bullets, emphasize key phrases, and label or caption scientific images.

These sources inform organization, not current resource permissions. Bundled division-specific 2027 event rules remain the generator's authority.

## Applied design

Each new binder page starts with an explanatory diagram, followed by lookup bullets and a comparison or identification table where useful. Critical facts include supported exceptions, look-alikes, units, assumptions and scoring traps. Topic contents, section numbers, page numbers and section tabs remain available for rapid retrieval during a 50-minute test. Short entries retain scientific specificity rather than replacing detail with topic headings.

The existing `paragraphs` field carries concise reference entries for storage compatibility. Existing stored content remains intact; regenerate an older binder to get the new concise writing style.

Course diagrams retain generated coordinates and draw numbered markers, separating nearby callouts with leaders. Full labels and dimensions appear in a wrapped key below the map. This prevents text collisions without changing the physical setup. Course generation can use `GEMINI_COURSE_MODEL`; video grading uses `GEMINI_VIDEO_MODEL`, with `GEMINI_MODEL` as the shared fallback.

## Verification

- Focused regression tests: `node --import ./tests/enrollment-env.mjs --experimental-strip-types --test --test-isolation=none tests/build-tools.test.ts tests/binders.test.ts`.
- Browser layout checks: `node --experimental-strip-types scripts/competition-format-check.mjs`. Checks SVG text collisions and bounds, a crowded 20-node course, long unbroken labels, five binder diagram types with 3–6 items, page clipping and excessive scaling. Uses local QA artifacts from a previous live check.
- Live provider check: `node --env-file=.env.local --experimental-strip-types scripts/competition-live-check.mjs`. Requires the local Dynamic Planet outline produced by `scripts/binder-live-check.ts`; sends bundled rules and synthetic QA input only. Generates two courses and a four-page binder sample without changing the school database.

The live check succeeded for Division C Electric Vehicle, Division B Scrambler and four Dynamic Planet pages. All four binder pages contained six compact entries and four table rows. Sample pages fit without zoom scaling after failed images were resolved. Artifacts are written under `tmp/competition-qa/`.

## Saved courses and libraries

Completed generated courses are stored on the server before the generation response is returned. A storage failure preserves the generated course and offers a retry. Saving identical content again returns the existing snapshot; edited courses create a new snapshot. School attribution and timestamps come from the authenticated account and server.

The new `/dashboard/courses` library supports division/event filters, pagination, reopening, and use in the course generator. `/dashboard/cheatsheets` exposes the existing division-specific sheet library for eligible student accounts. Both pages appear beside binders in the reference tabs and site navigation.

Courses now export through the shared HTML, PDF, PNG ZIP and DOCX pipeline, in addition to their existing JSON and SVG exports. Printable course setup blocks paginate at 11 pt rather than shrinking a long diagram onto one page. Word exports now decode SVG images with explicit intrinsic dimensions so generated diagrams are retained.

`scripts/course-library-check.mjs` verifies save failure/retry, reopening across reloads, all four document formats, Word diagram inclusion, library navigation, and desktop/mobile layouts using mocked accounts and storage. Database tests in `tests/courses.test.ts` verify persistence, deduplication, separate edited snapshots, authorization and pagination.
