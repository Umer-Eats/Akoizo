# Product scope and behavior

## Accounts and dashboards

The previous `/preview/*` routes and demo data are removed. Landing links now open protected study routes. Students and instructors sign in with Firebase email/password or Google. Incomplete enrollment remains recoverable but cannot access school data.

Instructor signup requires the private invitation password and creates a random school name and joining password. Students choose A/B/C and provide the school password. School/role authorization runs on the server for all data requests.

Instructor signup also requires a school community. The only options are Pembroke Pines Charter High School and the Central, West, and Academic Village campuses of Pembroke Pines Charter Middle School. Campus names are placed first in middle-school options so they are distinct on narrow screens. The choice is saved and shown on instructor and student dashboards. Communities label each instructor's private study group; choosing the same campus does not grant access to another instructor's roster. The generated group name and joining password continue to control enrollment.

The campus list was verified October 6, 2026 against the [official Pembroke Pines Charter directory](https://www.pinescharter.net/2308/Contact-Us). No other Florida schools or elementary-only campuses are offered. Existing groups without a saved community retain their current names.

The student dashboard shows its own real lesson completions, practice/ranked test counts, total points, assignments, and event catalog. A division change is saved to the account. Each event receives a rules-driven toolkit: Lessons is always first and Rules is always last. Test events receive Practice Tests, Ranked Tests, Practice Question Bank, Vocab Rush, and the reference generator permitted by their rules (Notes / Binder Generator or Cheatsheet Generator). Build events receive Video Grader and Course Generator. Lab events receive Lab Practice; Experimental Design receives its dedicated Lab Generator; Engineering CAD receives CAD File Grader. Mixed events combine the relevant test, build, and lab tools. Event cards open Lessons automatically. The Rules tab embeds a locally hosted PDF containing only that event's rules section. Its original PDF page range appears beside the Rules title, with links below the viewer to open the section or complete manual. The sources and update workflow are documented in [Local 2027 rulebooks](RULEBOOKS.md).

The instructor dashboard contains only its school's students. Selecting a student changes the event list and progress table to that student's current division. Instructors can assign an event, Practice/Ranked type, and due date, without selecting a particular test. Assignments persist in Turso and appear in the assigned student's account. Progress starts at zero and will reflect stored completion records once learning tools launch.

Practice Tests opens a searchable list by competition, level, year and topic, with optional level/year filters. Six historical papers currently cover Heredity B, Disease Detectives B, Anatomy & Physiology C and Dynamic Planet C. The complete original paper is embedded beside one scrollable answer sheet. Multiple choice supports one or multiple selections; written responses preserve exact text. Scores and rubric corrections persist in the database, and local drafts survive reloads. Open explanations need instructor rubric review before the provisional score becomes final. Only instructors in the student's current study group can review them. See [practice sources and limits](PRACTICE_TESTS.md).

## Ranked tests and teams

The instructor toolkit has two further tabs. **Teams** is a sheet per team: a name, a derived roster with each student’s event count, and one row per event of the team’s division, colored by tournament timeslot. Each partner seat is filled by choosing a student card (two seats; three for Codebusters and Experimental Design). A student seated in two events of one timeslot is flagged. Seats, teams and tests belong to one school roster and are never shared across school communities.

**Ranked Tests** builds a custom test for one event. The server collects questions that stand on their own (full prompt, real answer choices, a published or generated key, and no reference to the original paper, a numbered exhibit or a specimen), and Gemini chooses which to combine, drawing on several converted tests. Model output is never trusted: unknown or repeated IDs are dropped, no single source may supply more than 70% when others exist, and shortfalls are topped up from the least-used sources. Questions and keys are copied unchanged, so grading uses the original rubric. Instructors can preview the paper and key, and remove questions until a student starts.

Assigning reaches every student seated in that event on any team in one step, or chosen students, whose event partners are always included. A student sees assigned tests under the event’s Ranked Tests tab. Questions are sent only after the student starts. The test runs in a full-screen locked view with a server-side deadline, autosave, and a record of each time the student leaves full screen or the tab; copy, paste, the context menu, printing shortcuts and the back button are blocked. Browsers cannot be fully locked by a web page, so this deters and records rather than guarantees; a managed kiosk or lockdown browser is needed for stricter control.

Submission grades objective answers at once and written answers with Gemini against the rubric; anything Gemini cannot settle waits for the instructor. The student sees the score immediately. Their answers, the correct answers and feedback stay hidden, and are not sent to the browser, until the instructor releases results for that student. Each ranked test awards up to 100 ranking points (the rounded percentage) exactly once and counts toward dashboard totals. Verified by `tests/ranked.test.ts` and `scripts/ranked-browser-check.mjs`.

**Analytics** is a further instructor tab. It compares every team in the school (and students not yet on a team) by accuracy, points, tests completed and assigned work done, charts weekly accuracy per team, and grids accuracy by event and team. Opening a team shows the same for its students: each student’s points, a weekly trend against the division, accuracy by event and student with seated students outlined, and a per-student breakdown (overall, multiple choice, written, practice, ranked, lessons, assigned work) for all events or one. Accuracy is points earned out of points graded; written answers awaiting review are excluded until scored. Data comes from `/api/analytics`, scoped to the instructor’s school. Verified by `tests/analytics.test.ts` and `scripts/analytics-browser-check.mjs`.

The public rankings page displays only actual earned points with generated public learner names. It has an empty state until points exist. Practice submission does not award ranked points; ranked tests do. No fictional ranking remains.

## Catalog and sources

Reviewed October 6, 2026 for the 2027 competition season:

- [Official 2027 Division B list](https://www.soinc.org/events/2027-division-b-events): 23 events.
- [Official 2027 Division C list](https://www.soinc.org/events/2027-division-c-events): 23 events.
- [User-supplied 2027 Florida Elementary Science Olympiad manual](https://docs.google.com/document/d/1gji19ZeWW5H_yfTI2mwR4Rboskdwyv27N6BfrShAjR8/edit?tab=t.0): 15 regular Division A events plus 2 special events.

Division A regular events: Aerodynamics; A Matter of Matter; Chew the Fat; Crave the Wave; Crimebusters; Deep Blue Sea; Fast Facts; Metric Mastery; Mission Possible; Mystery Packaging; ProGamers; Rock Hound; Tennis Ball Catapult; Weather Permitting; Write It, Do It.

Special events: Shelby Jacobs Rocketry and Professor Jensen’s Potions. The latter's rules specify the Orlando tournament and no contribution to overall team standings. Both are explicitly labeled special in the catalog and assignment chooser. Their availability depends on the tournament.

The manual's event rules inform the UI's Study/Build/Lab/Skill types; these are preparation categories, not replacements for the manual's competition rules. ProGamers uses Scratch; Write It, Do It emphasizes communication and construction. Notes/binder and cheatsheet tools must respect the event's actual allowed-resource rules when implemented.

## Existing design

The responsive dark/light visual system, public mission and landing content, local fonts, blue rat logo, and animated Ako rig are retained. Theme and motion preferences remain local device settings. Account data and assignments are not kept in browser session storage.
