# Akoizo backlog

## Completed

- [x] Remove public preview routes, fictional dashboard data, and sample rankings.
- [x] Firebase email/password and Google login, signup, enrollment recovery, logout, and password-reset action.
- [x] Server-verified roles and school memberships; student and instructor route guards.
- [x] Private instructor invitation check and cryptographically random school credentials.
- [x] Salted school-password hashing, enrollment rate limits, one-session reveal, and password rotation.
- [x] Turso schema, account-specific dashboards, real roster and progress queries.
- [x] Saved Division A/B/C choice and instructor options limited to the selected student's current division.
- [x] 23-event 2027 B/C catalogs and supplied Florida A catalog (15 regular + 2 special).
- [x] Seven navigable study-tool pages for each event, intentionally empty.
- [x] Saved practice/ranked assignments with due dates, duplicate checks, removal, and student visibility.
- [x] Public rankings using actual positive points and generated public learner aliases.
- [x] Retain responsive themes, mascot, navigation, and existing visual design.
- [x] Searchable past-paper practice library, complete embedded tests and scrollable answer sheets, automatic objective scoring, saved attempts, answer colors and instructor rubric review.
- [x] Six source-checked archived papers / 465 answer fields across four event subjects, with 2027 subject matches and explicit differences.
- [x] Idempotent practice submission and completion of one pending event practice assignment.
- [x] Ranked tests: Gemini combines questions from several converted tests of one event; one-attempt, timed, full-screen locked sittings; server-side grading; one idempotent points award per test; results hidden until the instructor releases them.
- [x] Team sheets with per-event partner seats and timeslot colors; ranked assignment by event across all teams of one school.

## Learning features requested for a later phase

- [ ] Lessons and reviewed event-specific content; lesson completion totals and meaningful completion percentages.
- [ ] Expand verified past-paper coverage to remaining events and levels; review source discrepancies and full 2027 topic compliance.
- [ ] Fully automatic semantic grading of open explanations; current prose scores require instructor rubric review.
- [ ] Practice question bank and vocab rush.
- [ ] Notes/binder and cheatsheet generation with editable exports and event resource limits.
- [ ] Permission/provenance tracking for all study resources and competition papers.
- [ ] Annual event catalogs with historical season context and additional local Division A slates.

- [ ] Ranked tests for events whose converted questions depend on the original paper (Division C Disease Detectives, Codebusters, Rocks and Minerals identification); these need question text in the catalog first.

## Release work

- [ ] Interactive Google consent/provider/domain check using a real user's Google account.
- [ ] Student-data retention/deletion, community moderation and public-ranking opt-out policy.
- [ ] Teacher/student accessibility review, screen readers, and zoom checks.
- [ ] Production monitoring, backup/restore procedures, security headers, and deployed-domain verification.
- [ ] Configure hosting environment and deploy when requested.
