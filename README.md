# Akoizo

A free Science Olympiad study space with a chrome-and-pixel Y2K identity, a lively Venezuelan poodle moth mascot, and matching light and dark themes.

## Current status

**This version is a working design preview.** Per the project owner's request, Firebase and Turso will be connected later. No account is created, no password is collected, and no real student data or ranked points are stored. All dashboard members, progress, and leaderboard scores are fictional. Study tools intentionally lead to coming-soon pages.

## Run locally

Use Node.js 24+ and npm. Open this folder in VS Code, then run:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. No environment variables are needed for the preview. If port 3000 is occupied, follow the address printed by Next.js.

```sh
npm run typecheck
npm test
npm run build
npm start
```

The browser checks require a running server on port 3000 and locally installed Google Chrome:

```sh
npm run test:browser
```

They use a fresh headless browser and write ignored screenshots under `documents/qa/`. Chrome is used for verification only, not required for site visitors. The Playwright script can be changed to another installed browser channel if needed.

## Explore

| Route                                                        | Experience                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `/`                                                          | Spacious animated landing page; interactive sample science question                                          |
| `/mission`                                                   | Free learning, practice, and community mission                                                               |
| `/rankings`                                                  | Public sample leaderboard; division filter, search, pagination                                               |
| `/login/student`                                             | Student login/signup design; link to sample dashboard                                                        |
| `/login/instructor`                                          | Instructor login/signup design; link to sample dashboard                                                     |
| `/preview/student`                                           | Division A/B/C selection, event catalog, seven tool entry points, assignments, school/global sample rankings |
| `/preview/instructor`                                        | Sample roster, per-student progress, division-specific assignment preview                                    |
| `/preview/student/events/[eventId]?division=C`               | Tools for a selected event                                                                                   |
| `/preview/student/tools/[toolId]?division=C&event=astronomy` | Clearly marked unimplemented study tool                                                                      |

Instructor preview assignments persist in `sessionStorage` **within the same browser tab** and can be removed. Switching to the student preview in that tab shows assignments for that sample student. The sample student shown for Division C is Alex, Division B is Drew, and Division A is Sky. No changes reach another person, browser, or server.

Theme and motion preferences are stored on the device. The system's reduced-motion setting is respected. Tap the moth to greet it. The footer includes a motion toggle.

## Project structure

```text
src/app/           Pages, shared layout, styles
src/components/    UI and preview interactions
src/lib/           Event catalog and fictional demo data
public/art/        Original generated moth sprite sheet
scripts/           Browser verification helpers
tests/             Domain checks for event lists, rankings, assignments
documents/         Feature specifications, design decisions, service setup, QA notes
README.md          Getting started
BACKLOG.md         Remaining work and acceptance criteria
```

All feature Markdown belongs in `documents/`, never next to feature components. README and BACKLOG are the root-level project entry points.

## Stack and deployment

Next.js App Router, React, TypeScript, authored CSS, Lucide icons, locally packaged fonts. Exact dependency versions and the lockfile are checked in. The project is prepared for Vercel's standard Next.js build, but **has not been deployed**.

To publish the preview later, import its Git repository into Vercel, choose Next.js, and use the repository root. The defaults run `npm run build`; do not configure a static export. Confirm that fictional-data labels and disabled live login are still visible. To make this a live application, complete the service and authorization work in [BACKLOG.md](BACKLOG.md) first. Adding environment variables alone will not activate accounts or rankings.

See [service setup](documents/SERVICE_SETUP.md), [product scope](documents/FEATURES.md), [design and motion](documents/DESIGN.md), and [verification](documents/VERIFICATION.md).

## Event content

The catalog uses the official **2027 season** Division B and C event names (23 each). Division A is deliberately empty until a school-specific local slate is supplied. Events, names, and rules change by season. See the sources and review date in [FEATURES.md](documents/FEATURES.md). No competition papers or copyrighted study resources have been copied into this project.

Akoizo is an independent learning project, not affiliated with Science Olympiad, Inc.
