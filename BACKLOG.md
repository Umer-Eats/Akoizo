# Akoizo backlog

The owner approved a preview first and deferred connection to Firebase and Turso. These items are explicit unfinished work, not working services hidden behind the preview.

## P0 — Live identity, schools, and private data

- [ ] Connect Firebase email/password authentication and optionally Google sign-in. Implement verification, password reset, safe error messages, and logout. Verify Firebase ID tokens server-side and establish secure sessions.
- [ ] Connect a Turso database. Add reviewed migrations for schools, school memberships, student profiles, events, progress, test attempts, assignments, and a points ledger.
- [ ] Create instructor signup with the requested invitation password checked only by the server. Keep that value in a private environment variable; never bundle it in browser code. Add rate limits before opening registration.
- [ ] Generate a random school name and cryptographically random joining password when an instructor completes signup. Store a salted password hash, provide a controlled reveal/rotation flow, and handle name collisions.
- [ ] Require students to supply a valid school password and choose a division before accessing the authenticated study space. Partial Firebase signup must not grant school access.
- [ ] Authorize school rankings, rosters, progress, and assignments with server-verified membership. Never trust a school ID or role from the browser. Test that one school cannot read or mutate another school's records.
- [ ] Replace preview routes with real authenticated dashboards or keep them explicitly isolated. Never promote fictional scores or browser storage into real records.
- [ ] Add secure sessions, CSRF protection for cookie-authenticated mutations, input validation, rate limiting, account recovery, account deletion, and a student-data retention policy before a public live launch.

Acceptance: two real test schools can independently enroll students, instructors cannot see other schools, students cannot access instructor actions, and unauthenticated school APIs return 401/403. The public ranking exposes only the intended public profile fields.

## P1 — Lessons, practice, and ranked tests

- [ ] Source old tournament tests with permission and record provenance/license, event, division, season, answers, and review status. Do not scrape or republish restricted papers.
- [ ] Build lessons with meaningful completion tracking, accessibility, and event-specific content.
- [ ] Build practice tests with answer review and explanations. Practice should not add ranked points.
- [ ] Build reviewed new ranked tests, scoring rules, attempt limits, and server-authoritative scoring. Never let the client submit arbitrary points.
- [ ] Create a transactional, idempotent points ledger; duplicate requests must not award points twice. Define ties and cross-event/division comparisons before ranking.
- [ ] Replace sample global ranking with every enrolled member's public ranking; private school rankings must include only verified school members.
- [ ] Implement instructor assignments across one or more events with a due date and test type. Completion means any eligible test in the assigned event/type after assignment, not a named test. Keep event choices restricted to the selected student's division.
- [ ] Record overdue/completed states and decide timezone, late completion, and how reassignment works. Preview assignments currently use an unscheduled calendar date only.

## P2 — Remaining study tools

- [ ] Question bank with topics, difficulty, explanations, and provenance.
- [ ] Vocab rush with an accessible non-timed option and reviewed vocabulary.
- [ ] Notes/binder generator with editable output and downloads, grounded in the student's event and rules.
- [ ] Cheatsheet generator respecting each event's allowed resource rules.
- [ ] Add tailored experiences for study, lab, inquiry, and build events. Current classifications are UI hints, not definitive competition policy.
- [ ] Configure school-specific Division A slates. Do not invent a national list of 23 A events.
- [ ] Maintain annual event catalogs and preserve historical test season context.

## P3 — Polish and release

- [ ] Commission or refine the moth into a precisely registered production sprite atlas with independent antenna/wing frames. The current generated sheet has four poses; the preview animates the two cleanly aligned poses to avoid clipping the widest pose.
- [ ] Add additional mascot reactions for completed lessons and milestones once real actions exist.
- [ ] Decide public profile fields, moderation/reporting, display-name rules, and opt-out policy for a student community.
- [ ] Review with teachers and students; test screen readers, zoom, touch targets, low-power devices, and contrast across all themes/states.
- [ ] Test live auth/database behavior in staging, add monitoring/error boundaries, backups, restore drills, and production security headers/CSP.
- [ ] Connect the repository and environment variables to Vercel, verify the intended domain, and deploy after reviewing the live-vs-preview boundary.

## Completed in this preview

- [x] Responsive dark and light public landing, rankings, and mission pages.
- [x] Original lively pixel poodle moth with idle flutter, float, and tap reaction; reduced-motion support.
- [x] Chrome type, holographic panel, orbital graphics, fine wireframe details, and scroll reveals inspired by the approved reference.
- [x] Separate instructor/student entry designs; no live credential collection.
- [x] Student and instructor demo dashboards, 23-event B/C catalogs, honest A setup state.
- [x] All seven tool buttons with explicit coming-soon destinations.
- [x] Filterable/searchable/paginated sample rankings; fictional school view inside student preview.
- [x] Same-tab assignment preview with division validation and date validation.
- [x] Documentation centralized under `documents/`, with root README and BACKLOG.
