# Akoizo

A free Science Olympiad study space with separate student and instructor accounts, a chrome-and-pixel visual identity, and Ako the animated lab rat.

## Working pages

Firebase handles email/password and Google authentication. Turso stores schools, verified school membership, student divisions, assignments, and progress records. There are no public preview dashboards or fictional students and scores.

- `/login/student` and `/login/instructor`: login, signup, password reset, and recovery of unfinished enrollment.
- `/dashboard/student`: saved A/B/C division, searchable event catalog, assignments, and progress.
- `/dashboard/student/events/[eventId]`: a rules-driven toolkit for the selected event. Lessons is always first and Rules is always last; test, build, and lab tools depend on that event's rules.
- `/dashboard/student/events/[eventId]/[toolId]`: study-tool pages with an embedded rulebook view for Rules.
- `/dashboard/instructor`: school credentials, student roster, lesson/test/points totals, progress by event, and saved practice/ranked assignments with due dates.
- `/rankings`: earned points only, using generated public learner names. Empty until ranked tests launch.
- `/` and `/mission`: public landing and mission pages.

Instructor enrollment checks the private invitation setting before creating school membership. Successful signup generates a random school name and joining password. Students must supply that password before accessing a dashboard. The instructor can generate a replacement password; existing students stay enrolled. School passwords are stored as salted hashes and only shown in the session that creates them.

Study engines are deliberately not implemented yet. The event workspace now exposes only the tools supported by each event's rules, including test practice, reference generators, build review, lab practice, CAD review, and the embedded rules tab. New accounts show zero activity. Assignments save across accounts and reloads; completing them will depend on the future test engine.

## Run locally

Use Node.js 24+ and npm. Copy `.env.example` to `.env.local` and configure Firebase and Turso as described in [service setup](documents/SERVICE_SETUP.md). Existing local credentials are reused.

```sh
npm ci
npm run dev
```

Open the address printed by Next.js (normally `http://127.0.0.1:3000`).

```sh
npm run typecheck
npm test
npm run build
npm start
```

The schema and season catalog initialize idempotently on the first service request. No sample accounts or scores are seeded. All private APIs verify Firebase tokens and school membership independently of browser navigation.

## Verification

`npm test` covers enrollment, password hashing/rotation, cross-school and cross-role authorization, assignment dates and divisions, persistent division changes, progress queries, and the mascot rig.

The browser check expects a local server on port 3002 by default; set `TEST_BASE_URL` to use another address. It requires installed Google Chrome.

```sh
npm run start -- --port 3002
npm run test:browser
```

For an integration run that creates and then deletes its own temporary Firebase and Turso records:

```sh
node scripts/browser-check.mjs --live
```

Use a staging project for repeated live verification. Screenshots are saved under ignored `documents/qa/`. See [verification](documents/VERIFICATION.md).

## Events

Division B and C each use the official 2027 slate of 23 events. Division A follows the supplied **2027 Florida Elementary Science Olympiad manual**: 15 regular events and 2 explicitly marked special events. Special event availability varies by tournament. Event types guide preparation; they do not replace competition rules. See [product scope and sources](documents/FEATURES.md).

## Structure

`src/app/` contains pages and server APIs; `src/components/` contains UI; `src/lib/` contains the event catalog, authorization, data model, and school services. `tests/` covers business rules and persistence with an isolated SQLite database. Feature documentation lives in `documents/`.

The Next.js application is ready for standard server deployment. It has not been deployed by this task. Configure service secrets and Firebase authorized domains on the host; do not use a static export. Remaining content and release work is tracked in [BACKLOG.md](BACKLOG.md).

Akoizo is independent and is not affiliated with Science Olympiad, Inc.

## Ako pixel companion

Ako is original code-drawn, 48×48 pixel artwork, shared by the page mascots and the roaming companion. Animation design references [PerfectPixel Studio](https://github.com/gykim80/perfectpixel-studio), especially its `internal/sprite/presets.go` motion catalog and fixed-frame, shared-palette, stable-anchor approach. No external generation service or API key is required.

- Click the roaming Ako for expression previews and controls. Right-click him (or focus him and press M) to toggle encouragement; the preference survives reloads.
- Triple left-click a spot to drop cheese. Ako runs there, eats, and celebrates. Typing fields are excluded. The Give cheese button (or F while focused on Ako) also works with touch and keyboard.
- Encouragement appears as text bubbles at most once every 75 seconds after the greeting. Reduced-motion preferences and the site's motion setting disable roaming and frame animation; feeding remains available.
- Clips: idle, wave, thinking, angry (red), happy (sparkles), sad, walk, run, eat, sleep, and surprised. Click an expression to preview it.
- Future chat code can import `setAkoMood` from `src/lib/ako-motion.ts`, call `setAkoMood('thinking', 30000)` while waiting, and `setAkoMood('happy')` when finished. These are animation hooks; there is no chatbot backend in this change.

Run `node scripts/ako-browser-check.mjs` against the development server at port 3000 (or supply `TEST_BASE_URL`) to verify feeding, emotions, mute persistence, keyboard controls, and mobile bounds.

### Account settings and placement

The signed-in header and mobile navigation link to `/settings/student` or `/settings/instructor`. Students can edit their full name, configure Ako, and leave a community. Instructors can rotate the joining password, rename students in their own roster, and close their own study group after typing its name.

Community closure is a logical deletion: it invalidates joining passwords and memberships and removes assignments. Leaving also removes the student's assignments and roster access. Authentication accounts and individual learning records are retained so the same account can re-enroll without losing progress. Every authenticated request checks active membership; closed/departed members are excluded from rankings. The new membership tables are created by the existing idempotent schema initialization.

Ako is now the only page character. Dragging him anchors him and saves his screen position in this browser. The panel's Anchor in place / Release anchor button controls roaming; when anchored, feeding happens at his current position. The student settings controls share the same saved browser preferences for visibility, encouragement, and anchoring.

`node scripts/settings-browser-check.mjs` checks placement and both settings interfaces using mocked account APIs (no real account changes). `npm test` checks name authorization, membership revocation, preserved progress, password invalidation, and re-enrollment with an isolated SQLite database.
