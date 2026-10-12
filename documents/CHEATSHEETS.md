# Division C cheat sheets

The eight existing Division C cheat sheet tabs now generate references for Anatomy and Physiology, Botany, Chemistry Lab, Designer Genes, Disease Detectives, Forensics, Protein Modeling, and Water Quality. Division A and B tools are unchanged.

## Generation and scope

The server uses `GEMINI_API_KEY` and `GEMINI_MODEL`, with an optional `GEMINI_CHEATSHEET_MODEL` override. The model receives the full selected event section from the bundled 2027 Division C rulebook, tournament level, optional notes, and the student's known-topic exclusions. These exclusions remove content rather than being printed. Inputs and uploads are treated as data, not executable instructions. Structured responses undergo size, density, table, and diagram validation; an invalid or too-brief answer receives one automatic revision.

`src/data/cheatsheet-rules.json` contains text extracted with pypdf from the eight corresponding PDFs under `public/rules/2027/c/`. Regenerate this text whenever those rulebooks change. Tournament clarifications are not fetched automatically.

Students may attach up to four PNG/JPEG/WebP images, PDFs, TXT or CSV files: 900 KB per image/PDF, 100 KB per text file, and 2 MB total. Images are embedded in the exported sheet. Gemini distills PDF and text data. Raw PDF/text uploads and supplementary notes are not persisted. Uploaded images and generated content are shared; the form discloses this before generation.

## Real figures

Gemini also receives a catalog of real labeled illustrations for the event and places up to eight of them (two per section) by id. The catalog in `src/lib/cheatsheet-figures.ts` is the lesson library's reviewed, openly licensed figure set (OpenStax, Wikimedia Commons, NOAA, CDC, RCSB), so the model never supplies a URL; unknown or repeated ids are dropped. Only the ids are stored. `/api/cheatsheets/figure` serves a same-origin copy of a catalog image, and the browser downscales it to print resolution and embeds it, so exports remain standalone. Each figure prints with its title and author/licence credit. A figure that cannot be fetched is left out and never blocks sharing or export.

## Exactly one double-sided sheet

The document has exactly two portrait US Letter pages, four columns per side, and 0.25-inch margins. A measured browser layout places every content block, balances the columns, and chooses a font size from 7.5 down to 6 points. A crowded sheet first shrinks its figures, then allows 5.5-point type, before it is reported as not fitting. Wide comparisons become dense labeled rows to avoid unreadably narrow table cells. Scientific diagrams are rendered from validated primitives, never generated HTML or executable SVG. Uploaded images retain their aspect ratio.

A sheet is saved as a private draft until the preview verifies a complete two-page fit and every image loads. It is then published automatically, without an approval step. An overflow or failed image blocks publication/export rather than silently discarding content. Sharing can be retried after a network failure.

Print / save PDF prints only the two pages; download exports the exact measured pages as a standalone HTML file with embedded images. The student must choose Letter paper, 100% scale, no headers/footers, and double-sided printing with long-edge flipping in the printer dialog. Websites cannot force a printer's duplex setting. The generation date and originating school appear on library cards, not on the paper.

## Persistence and sharing

`cheat_sheets` stores metadata, original school name, generation timestamp, content, embedded images, and exclusions. Published sheets are globally available to enrolled Division C students, independently of school membership or event selection. Each event view can filter its event or show every supported event. Open libraries refresh every 20 seconds and on window focus. Results use cursor pagination. Drafts remain visible only to their owner.

An atomic database reservation permits at most three attempts per student per ten minutes and one active generation at a time. This limit works across server instances. Authentication and Division C/event restrictions are enforced on the server. Database initialization creates the tables and indexes; no new storage service is required.

## Verification

`tests/cheatsheets.test.ts` verifies upload restrictions, model validation/revision, escaping, cross-school access, draft privacy, school/date preservation, role/division gates, and persistent quotas. `node --experimental-strip-types scripts/cheatsheet-check.mjs` tests the real UI with mocked auth/API calls, including uploads, exclusions, automatic sharing, card metadata, exports, themes/mobile layout, and unchanged Division B behavior. Set `TEST_BASE_URL` to a running local server. Browser output goes to ignored `tmp/cheatsheets/`.

`node --env-file=.env.local --experimental-strip-types scripts/cheatsheet-live-check.ts [eventId]` calls Gemini once, fetches the chosen figures, and writes the laid-out sheet (HTML, PNG, PDF) to `tmp/cheatsheets/` without touching the database.

Live Gemini generation was verified with the configured backend. Its reference rendered as two 612 × 792 point PDF pages; all blocks were retained. The browser test also checks that an intentionally oversized reference fails fitting.
