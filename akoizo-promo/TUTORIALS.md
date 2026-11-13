# Akoizo how-to Reels (10)

Ten 9:16 (1080 × 1920, 30 fps) tutorial Reels: six for students, four for coaches. Each one teaches a single feature on the real app, recorded with mocked sign-in and demo data.

| # | File | For | Feature | Length |
| --- | --- | --- | --- | --- |
| 01 | `output/tutorials/01-find-your-events.mp4` | Students | Event catalog + timeslot filter | 21 s |
| 02 | `output/tutorials/02-interactive-lessons.mp4` | Students | Interactive lessons + simulations | 21 s |
| 03 | `output/tutorials/03-virtual-labs.mp4` | Students | Virtual chemistry lab | 21 s |
| 04 | `output/tutorials/04-past-tests.mp4` | Students | Real past tournament tests | 21 s |
| 05 | `output/tutorials/05-ranked-tests.mp4` | Students | Ranked tests, Iron → Radiant | 21 s |
| 06 | `output/tutorials/06-binder-generator.mp4` | Students | Binder generator | 21 s |
| 07 | `output/tutorials/07-coach-school-code.mp4` | Coaches | School joining password | 24 s |
| 08 | `output/tutorials/08-coach-teams.mp4` | Coaches | Team builder by timeslot | 24 s |
| 09 | `output/tutorials/09-coach-assignments.mp4` | Coaches | Assigning lessons, tests, labs | 24 s |
| 10 | `output/tutorials/10-coach-analytics.mp4` | Coaches | Analytics + student progress | 24 s |

`output/tutorials/sfx-only/` has the same ten Reels with only the hits and whooshes, so a trending sound can go underneath inside Instagram.

## Why they're built this way

- **The hook lands on frame 0.** The audience tag, a pain point, the promise, and a glimpse of the finished result are all on screen immediately. Reels judge the hook at about 3 seconds, and the first 1–1.5 seconds carry it. Frame 0 also works as the cover.
- **It reads without sound.** Every step is captioned. Most Reels start muted.
- **There's a cut on every beat.** It runs hook (4 beats), drop, three numbered steps (8 beats each), payoff, then call to action. The visuals change every 1.5–3 seconds.
- **Retention cues.** A progress bar runs along the top, step dots sit at the top right, and stickers pop on the beat.
- **One idea per Reel, plus a series.** Each one is "how-to NN/10" and its end card says "Next: …", which gives viewers a reason to follow.
- **The calls to action ask for saves and sends,** which matter more for Reels reach than likes. Examples: "Save this for tryouts", "Send this to your event partner", "Share with your co-coach".
- **Akoizo's design.** It uses the ink and cobalt palette, Space Grotesk, Manrope and IBM Plex Mono, the lab-rat mark, the 2027 timeslot colours (one per video), and the app's real rank badges.
- **The audio is original.** It's synthesized from scratch with no samples, so it's safe for a business account. Student videos use bright study-pop at 112.5 BPM; coach videos use warm lo-fi house at 100 BPM. Each video has its own key and progression. The drop lands on Step 1, and the hits and whooshes land on the cuts. The tempos sit in the range that suits tutorials with on-screen text.

## Captions (paste-ready)

Keep 3–5 focused hashtags. Put the keyword first, because Instagram search reads captions.

1. **Find your Science Olympiad events in 10 seconds.** Every 2027 event, colour-coded by timeslot. Free at akoizo.app. Save this for tryouts 📌 #scienceolympiad #scioly #studytips #stem
2. **Science Olympiad lessons you can actually touch.** Drag the model, watch it react. Send this to your event partner. #scienceolympiad #scioly #anatomy #studywithme
3. **No lab before invitationals? Practice Chem Lab on your phone.** Hypothesis, trials, analysis. #scienceolympiad #chemlab #scioly #chemistry
4. **Practice real Science Olympiad tournament tests, free.** Tag who you're testing with 👇 #scienceolympiad #scioly #astronomy #testprep
5. **What rank are you? Iron to Radiant.** Ranked tests on Akoizo. Comment your rank 👇 #scienceolympiad #scioly #ranked #studytok
6. **Stop building SciOly binders by hand.** Akoizo's binder generator does it for you. Send this to your binder partner. #scienceolympiad #scioly #binder #studytips
7. **Coaches: your whole Science Olympiad team, one password.** Share with your co-coach. #scienceolympiad #sciolycoach #stemteacher #teachersofinstagram
8. **Coaches: seat every event without the spreadsheet.** Timeslot-coloured team sheets. #scienceolympiad #sciolycoach #stemeducation #teachersofinstagram
9. **Coaches: assign practice in 3 steps.** Lessons, tests or labs, with due dates. #scienceolympiad #sciolycoach #stemteacher #edtech
10. **Coaches: see who's actually studying.** Accuracy over time, per event and per student. Follow for more coach tools. #scienceolympiad #sciolycoach #edtech #teachersofinstagram

## Posting plan

- Post one a day, in order (01 → 10). The "Next:" end card only pays off if the next episode follows soon.
- Post students' Reels after school (about 3:30–6 pm local) and coaches' Reels on weekday evenings. Then check your own Insights and adjust.
- Pin 01, 05 and 07 to the profile grid as the entry points for students, the most shareable one, and coaches.
- Reply to every "rank" comment on 05. Comments in the first hour help distribution.
- Watch the retention graph: a drop before 2 s means the hook needs work, so swap the kicker line in `src/tutorials/tutorials.json` and re-render.

## Editing and rendering

- Change copy or clip timing in `src/tutorials/tutorials.json`. Picture and music both follow it.
- Regenerate the music: `node scripts/tutorial-soundtrack.mjs [id]`
- Re-record app clips (dev server running, everything mocked): from the Akoizo root, `TEST_BASE_URL=http://127.0.0.1:3006 node akoizo-promo/scripts/reel-capture.mjs school assign analytics progress studyview`
- Preview: `npx remotion studio`, folders **Tutorials** and **Tutorials-SFX-Only**
- Render one: `npx remotion render Tutorial-01-find-your-events output/tutorials/01-find-your-events.mp4 --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=320k`

The demo school, students and joining password in the clips are fictional. Nothing touched live accounts or the live database.
