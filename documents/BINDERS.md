# Division C study binders

The Notes / Binder Generator tab builds a binder for the six Division C events that have it: Astronomy, Circuit Lab, Dynamic Planet, Remote Sensing, Rocks and Minerals, and Thermodynamics. Division A and B are unchanged.

## Length

Students choose any whole number of pages from 10 to 400. `binderRecommendations` in `src/lib/binders.ts` gives each event a suggested range based on its 2027 rules: Circuit Lab and Thermodynamics 10–60, Astronomy and Remote Sensing 50–250, Dynamic Planet and Rocks and Minerals 50–400. The range is guidance on the form, not a limit.

## Generation

The server uses `GEMINI_API_KEY` with `GEMINI_BINDER_MODEL`, falling back to `GEMINI_MODEL`. Each request to `/api/binders` makes one Gemini call and saves the result, so a closed tab or failed call loses only that call:

1. An outline: sections, their focus, and each section's share of the pages.
2. Topics for one section at a time (up to 60 per call), never repeating a planned topic.
3. Pages in batches of four. Every page has prose, key facts, an optional table, a labeled diagram, and a photo request.

The browser retries a failed call up to four times, then pauses with Resume. Model text is trimmed to fit rather than rejected; only a page that is too thin, or a diagram with no labels, fails its batch.

`src/data/binder-rules.json` holds the rule text for the six events, extracted from `public/rules/2027/c/`. Regenerate it when the rulebooks change.

## Diagrams and photographs

Gemini chooses a diagram kind (flow, cycle, layers, compare, scale, or plot) and supplies labels or data points. `binderDiagramSvg` draws it, so diagrams are always legible and never contain model-written markup.

For each page the server searches Wikimedia Commons with the page's photo request and keeps the best-matching file under a public-domain, CC0, CC BY, or CC BY-SA licence. The file is shown unmodified with its title, author, and licence. A page with no match simply has no photograph. An uploaded image the model selects takes the photo slot instead.

## Uploads

Up to six PDFs, PNGs, JPEGs, or WebP images: 2 MB each, 3 MB total (file signatures are checked). They are sent to Gemini with every call until the binder is finished, then the stored input is erased; images used in the binder stay with it.

## The document

Letter pages: one to five contents pages listing every topic with its page number, then one topic per page. Each section has its own color on the page edge, a numbered tab, and a tab in the on-screen navigation. The preview shrinks text, then scales a page's content, until it fits; nothing is clipped.

Print / save PDF waits for the photographs, then opens the print dialog. Download HTML embeds every photograph so the file works offline. The generation date and school appear on the library card, not in the binder.

## Sharing

A finished binder is published automatically and is readable by every signed-in member of every school. Only Division C students can generate: one unfinished binder at a time, three per day.

## Verification

- `npm test` runs `tests/binders.test.ts` with an in-memory database and mocked Gemini and Commons responses.
- `node --env-file=.env.local --experimental-strip-types scripts/binder-live-check.ts [eventId] [pages]` generates a real binder into ignored `tmp/binders/` without touching the database.
- `TEST_BASE_URL=http://127.0.0.1:3002 node --experimental-strip-types scripts/binder-check.mjs` drives the real page with mocked sign-in and API, and checks 10- and 400-page layouts.
