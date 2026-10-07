# Verification — October 6, 2026

## Passed

- `npm run typecheck`: clean.
- `npm test`: 8 tests passed, covering event catalogs, enrollment validation, salted school-password hashing and rotation, account-role protection, cross-school access, division-safe assignments, real progress aggregation, enrollment limits, and mascot motion.
- `npm run build`: production build completed with the real dashboard/API routes and no `/preview/*` routes.
- `npm run format:check` and `git diff --check`: clean.
- `node scripts/browser-check.mjs --live`: passed against local production server and the configured Firebase/Turso services.
- `node scripts/theme-check.mjs`: public and guarded routes, dark/light themes, 320/390/768/1440px layouts, theme persistence, reduced motion, navigation, landing question, and both enrollment forms.

## Live account checks

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
