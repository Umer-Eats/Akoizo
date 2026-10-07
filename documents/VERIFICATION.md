# Verification — October 6, 2026

## Local rulebooks and event navigation — October 7, 2026

- Type checking, all 15 unit tests, and the production build passed.
- The extraction script verified all 63 event PDFs against the source manuals: page counts, extracted text, and page dimensions match. Representative Division A text, Division B scoring checklist, and Division C construction diagrams were rendered and visually inspected.
- `scripts/event-workspace-check.mjs` passed against a fresh production preview with mocked authentication and account APIs. All 63 event sections and three complete manuals returned successful PDF responses. Rules assets allow same-origin embedding.
- Every event card in all three divisions links directly to Lessons; representative clicks and an existing base event URL opened the active Lessons tab.
- The page range appears beside Rules, and the former introductory block is absent. The embedded Anatomy and Physiology C section visibly renders its three pages. Desktop and phone layouts were reviewed; dark/light checks at 1440, 768, 390, and 320 pixels found no horizontal overflow.
- Screenshots are under ignored `documents/qa/event-workspace/` and `documents/qa/rules/`. No live accounts or school records were changed by these checks, and no deployment was performed.

## Passed

- `npm run typecheck`: clean.
- `npm test`: 8 tests passed, covering event catalogs, enrollment validation, salted school-password hashing and rotation, account-role protection, cross-school access, division-safe assignments, real progress aggregation, enrollment limits, and mascot motion.
- `npm run build`: production build completed with the real dashboard/API routes and no `/preview/*` routes.
- `npm run format:check` and `git diff --check`: clean.
- `node scripts/browser-check.mjs --live`: passed against local production server and the configured Firebase/Turso services.
- `node scripts/theme-check.mjs`: public and guarded routes, dark/light themes, 320/390/768/1440px layouts, theme persistence, reduced motion, navigation, landing question, and both enrollment forms.

## Live account checks

The school-community dropdown update also passed type checking, all 8 unit tests, a production build, and the live browser check. Instructor signup offers exactly four required choices: Pembroke Pines Charter High School and the Central, West, and Academic Village middle school campuses. The selected West campus persisted after reloading the instructor dashboard and appeared on enrolled students' dashboards. Validation rejects missing or unlisted communities, students inherit their school's community, and teachers at the same campus retain separate private groups. Desktop dark-theme and 390px light-theme signup screenshots were visually reviewed with no horizontal overflow. All five temporary accounts and their school-community records were removed by the browser runner.

A temporary instructor created a real school through the signup form. Three temporary students joined that school in Divisions A, B, and C. The instructor saw only the selected student's division events and assigned a practice test and a ranked test. Both assignments survived reloads and appeared in the correct student's account. A saved student division change updated the instructor's choices after refresh.

All seven feature routes opened. A Division B student could not open Astronomy. Student/instructor route guards and unauthenticated API rejection passed. Logout cleared the private screen; subsequent email/password login worked.

An additional temporary Firebase identity without school membership could not access the dashboard API. An incorrect school password was rejected. Completing enrollment with the correct password opened the real dashboard. That student was denied instructor assignment actions.

All five temporary Firebase accounts and their school records were deleted after the final run. A follow-up database query confirmed zero QA profiles remained. The event catalog contains 17 A events (15 regular + 2 special), 23 B events, and 23 C events.

## Configuration and visual review

Firebase email/password sign-in was disabled in the existing project. It is now enabled with password-based login. Google sign-in was already enabled. `127.0.0.1` was added to the existing authorized domains for local operation. No other providers or existing domains were removed.

The instructor invitation setting matches the requested value. A browser-bundle scan confirmed it is absent from frontend JavaScript. School credentials are masked in saved QA screenshots. Desktop instructor, mobile Division A, login, and event-tool screenshots were visually reviewed; the double event arrow found during review was removed.

## Deliberately unfinished / not exercised

- Study engines, generated content, grading, points awards, and automatic assignment completion remain intentionally unimplemented.
- Interactive Google account consent was not completed with a real user's Google account. Its provider setting and shared enrollment handling are wired, but final consent should be manually checked on the deployed domain.
- The password-reset action is wired to Firebase. No reset email was sent during verification.
- No public deployment was performed.

Screenshots are under ignored `documents/qa/`. The browser runner creates uniquely named QA accounts and cleans up only the accounts and schools created in its own run. Run `--live` against a staging project for repeat verification.
