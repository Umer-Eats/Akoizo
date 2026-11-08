# Build event tools

Video Grader and Course Generator are implemented for all 17 B/C event/division combinations advertised by `eventToolIds`. Division A retains its existing placeholders.

Division B: Boomilever, Elastic Launched Gliders, Hovercraft, Ping-Pong Parachute, Roller Coaster, Scrambler, Thermodynamics, Water Quality.

Division C: Boomilever, Electric Vehicle, Hovercraft, Mission Possible, Ping-Pong Parachute, Protein Modeling, Thermodynamics, Water Quality, Wright Stuff.

## Student workflow

Enter event-specific setup parameters with units, select the tournament level, and add layout notes or measured build data. Generate a course to fill blank fields from the division’s bundled 2027 event rules. The model receives the original event PDF, selected on the server; it does not choose a season or source URL. Explicit dimensions, step-by-step setup instructions, rule references and a schematic accompany generated courses. For laboratory/modeling events this is a testing station, rather than a vehicle track.

The bundled 2027 Electric Vehicle rules use a water bottle and bottle line. These have their own fields. Custom cup settings remain available for practice; the grading prompt must flag conflicts with the authoritative rules instead of importing an older rubric.

Export a course as versioned JSON (all parameters, notes, diagram geometry, setup steps and references) or as a self-contained SVG containing the diagram and parameters. “Use in Video Grader” transfers the same course through browser storage. Courses can also be imported from JSON. Imports enforce event, division, season, field names, sizes and diagram geometry. Each draft is saved locally under the authenticated student, division and event. Changing a parameter or tournament level clears the generated diagram and setup instructions to avoid using stale geometry.

In Video Grader, attach an optional image/PDF course map and a complete MP4, WebM, MOV or MPEG video (up to 100 MiB). A generated diagram, uploaded map, or layout description is required. Small authenticated chunks are proxied to the Gemini Files API, keeping each application request below common hosting body limits. Processing is polled before grading. Files and upload sessions are represented by expiring HMAC tickets bound to the student. The API never accepts arbitrary file URLs. Completed videos are deleted after grading; the client also requests cleanup after cancellation or failure when it received a completed-file ticket. Interrupted uploads whose final response never reached the client rely on provider expiration.

The grader returns the event’s scoring formula, substitutions, rule references, timestamped observations, penalties, missing evidence, and suggested improvements. Missing inputs prevent a full numeric score. Observations, student-reported data and unverifiable measurements are distinguished. Written tests, unseen construction checks and precision measurements are not invented. Fast vehicle/parachute/coaster footage is sampled at 10 FPS, flight/action sequences at 5 FPS, and other stations at 1 FPS; this remains AI practice feedback rather than official judging. A review can be exported with the exact course snapshot used for grading. Reviews and videos are not added to ranked results or instructor assignments.

## Configuration and verification

Uses the existing server-only `GEMINI_API_KEY` and `GEMINI_MODEL`. Optionally set `GEMINI_VIDEO_MODEL` to override the model for these tools. No new package, database migration, or client credential is required.

- `npm test`: domain validation, all advertised events and PDF coverage, imported geometry, escaped SVG, missing-evidence grades, signed upload ownership/tampering/expiry, and mocked Gemini request/response boundaries.
- `node scripts/build-tools-check.mjs`: all 34 real B/C tool pages, browser-level auth/API fixtures, course generation/export/import/handoff, multi-chunk upload, missing-evidence feedback, parameter invalidation, retry, and 320/390/1440-pixel light/dark layouts. Defaults to the local server on port 3006; override `TEST_BASE_URL` as needed.
- `node --env-file=.env.local --experimental-strip-types scripts/build-tools-live-check.ts`: **makes real Gemini requests** for a B Scrambler and C Electric Vehicle course, uploads a synthetic no-attempt WebM, checks that grading withholds a score, and deletes the synthetic upload. Writes QA results under ignored `tmp/build-tools/`. Uses no student media.

Integration references: [Gemini video understanding](https://aistudio.google.com/docs/video-understanding?generate-content=true), [Gemini Files API](https://ai.google.dev/gemini-api/docs/files).
