# Product scope and feature behavior

## Preview boundary

This version contains no backend identity or persistence. `/preview/*` pages are intentionally public demonstrations using fictional data. The visual school ranking is not an access-control implementation. No real user or school data belongs in `src/lib/demo.ts` or browser storage.

## Public pages

- Landing: wide beveled chrome title with Ako peeking diagonally from the page's upper-right corner, concise opening, scroll-driven learning/practice/community sections, and one small interactive science example. No dashboard wall before login.
- Branding: flat monochrome blue rat SVG in the header, footer, and browser tab; blue accents in both themes.
- Mascot: Ako is the male lab rat. A reusable articulated rig animates his head, eyelids, pupils, shoulders, elbow, and tail continuously. He looks around and follows nearby pointer movement; click, tap, or keyboard activation plays a smoothly blended wave. Off-screen/hidden-tab animation pauses, and reduced motion or the footer motion switch leaves him still. See [animation behavior](MASCOT_ANIMATION.md).
- Typography: headings and study-tool/event titles use upright text; the previous italic heading accents are removed.
- Header: Global Rankings and Mission on the left; Student login and Instructor login on the right. Mobile menu offers the same routes.
- Mission: free access to study tools, confidence through practice, shared progress.
- Rankings: all sample members by default; division filter, member/school search, and pagination. Filtering by division recomputes ordinal ranks; searching retains those ranks. Tie sorting is deterministic by handle for this sample only. A live points/tie policy is still required.

## Students

The preview can switch A/B/C to inspect all designs. A live student will belong to a school and division verified by the server. Lessons, practice tests, ranked tests, question bank, vocab rush, notes/binder, and cheatsheet all have navigable placeholders. Nothing generates real tests or points yet.

## Instructors

Selecting a sample student updates lesson completion, tests completed, points, and assignment choices. The selected student's division determines the available event list. One preview assignment specifies student, event, practice/ranked type, and due date. Duplicate identical assignments are rejected. Removal is supported. Assignments are kept in this browser tab's session storage, shared between the two preview routes, not between users.

## Live enrollment requirements

Instructor signup will require the user-requested invitation password, then generate a random school name and joining password. Student signup must validate the school password before access. The actual invitation value is intentionally excluded from source and documentation and must be set as a server-only secret. Firebase authentication alone does not confer school membership or instructor privileges.

## Event catalog

Reviewed October 5, 2026 for the 2027 competition season. Each B/C slate contains 23 unique event IDs. Names are grounded in:

- [Official 2027 Division B events](https://www.soinc.org/events/2027-division-b-events)
- [Official 2027 Division C events](https://www.soinc.org/events/2027-division-c-events)
- [Official B/C overview](https://www.soinc.org/bc-events)

Division A remains unconfigured because a local event slate has not been supplied. Event category and study/build/lab tags organize the preview; rules and allowed study resources must be reviewed per event before tools are delivered.
