# Akoizo public pages: study vault

November 7, 2026. The public pages should feel like a study app where you take notes, in the spirit of Obsidian and Mindcorpus, with Valus-level motion. No paper or notebook styling, and nothing copied from those sites.

## Ideas

- The site is a "vault": events are notes and folders, sections carry a file path (`akoizo / events`), and Ctrl K opens a command palette that searches every event guide and page.
- Hero: a live knowledge graph of every Division C event, clustered by subject, with concept notes orbiting each event. Hover lights up a note's links; click opens the event guide. Faint particles add depth and lean away from the pointer.
- Workspace walkthrough: a sticky app window (file tree, editor, local graph, backlinks) that changes as you scroll through Read, Write, Connect and Recall. The note types itself, its `[[links]]` light up, the local graph draws, and a quick check is answerable.
- Event explorer: divisions as vaults, timeslot groups as folders, events as files.
- Motion: blur-and-rise reveals, words that light up on scroll, pointer-following glow on cards and buttons. The motion setting and the system reduced-motion preference turn it off; the graph then renders still.

## Tokens

Blue, white and black only. Dark: background #050505, surface #0e0e0e, raised #171717, text #ffffff, muted #a3a3a3, accent #4d7cff. Light: background #ffffff, raised #f4f4f4, text #0a0a0a, muted #525252, accent #2455f5. Fonts stay Space Grotesk, Manrope and IBM Plex Mono. Events keep their timeslot colours (pink, yellow, purple, blue, green, orange) from theme.css. Ako keeps his own colours; product screenshots stay greyscale.

## Whole site

Every page, signed in or not, uses the same navigation (with Ctrl K search) and footer. The signed-in app takes the same black, white and blue tokens (theme.css), rounded controls and panels (app-vault.css, app-shapes.css). Inside an event, the toolkit sidebar, headings and accents switch to that event's timeslot colour; the public event guides do the same.

## Recordings

The home and Study tools pages show short clips recorded from a demo student account: dashboard, lessons, a past test and a lab. Each clip carries its event's timeslot colour. Re-record with `TEST_BASE_URL=http://127.0.0.1:3006 node scripts/home-videos.mjs` (sign-in and API calls are mocked in the browser; output in public/home/videos). Clips pause off-screen and do not autoplay when motion is off.

## Files

`src/app/vault.css`, `src/components/vault-graph.tsx`, `src/components/vault-workspace.tsx`, `src/components/command-palette.tsx`, `src/components/home.tsx`. Screenshots from `documents/qa/vault/`.
