# Product scope and behavior

## Accounts and dashboards

The previous `/preview/*` routes and demo data are removed. Landing links now open protected study routes. Students and instructors sign in with Firebase email/password or Google. Incomplete enrollment remains recoverable but cannot access school data.

Instructor signup requires the private invitation password and creates a random school name and joining password. Students choose A/B/C and provide the school password. School/role authorization runs on the server for all data requests.

The student dashboard shows its own real lesson completions, practice/ranked test counts, total points, assignments, and event catalog. A division change is saved to the account. Each event has seven buttons: lessons, practice tests, ranked tests, practice question bank, vocab rush, notes/binder generator, and cheatsheet generator. The destinations are intentionally empty until the learning features are built.

The instructor dashboard contains only its school's students. Selecting a student changes the event list and progress table to that student's current division. Instructors can assign an event, Practice/Ranked type, and due date, without selecting a particular test. Assignments persist in Turso and appear in the assigned student's account. Progress starts at zero and will reflect stored completion records once learning tools launch.

The public rankings page displays only actual earned points with generated public learner names. It has an empty state until points exist. No fictional ranking remains.

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
