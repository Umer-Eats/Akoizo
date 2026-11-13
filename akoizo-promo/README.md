# Akoizo portrait promo

Interactive 30-second promotional film: 1080 × 1920, 9:16, 30 fps. Six editable scenes, original music, real product imagery and mobile-safe text.

Watch: run `node scripts/preview.mjs`, then open http://127.0.0.1:3101. The responsive player includes play/pause, scrubbing, volume, fullscreen, chapters, and links to Akoizo and school setup.

Edit: run `npx remotion studio --no-open --port=3100`, then open http://localhost:3100/Akoizo-Portrait. Individual scenes are under Scenes. Text layers use Remotion Interactive elements.

Export when needed: `npx remotion render Akoizo-Portrait output/akoizo-portrait.mp4 --codec=h264 --crf=16`.

The interactive player is the deliverable. A flat MP4 retains the film and music; clickable links and chapter controls belong to the player.

Messaging follows https://akoizo.app and existing app source. The 400+ students impacted metric was supplied by the user. School contact points to https://akoizo.app/contact. Original soundtrack: scripts/soundtrack.mjs. No third-party music samples.

Design notes: DESIGN.md. Scene preview images: output/. The main application remains separate from this video project.

## How-to Reels (10 tutorials)

Ten 9:16 feature tutorials (six for students, four for coaches) live in `src/tutorials/`, with original per-video music from `scripts/tutorial-soundtrack.mjs`. Renders are in `output/tutorials/`. Captions, hashtags and the posting plan are in [TUTORIALS.md](TUTORIALS.md).

## Instagram Reel (fast cut)

`Akoizo-Reel`: a separate 30-second, 1080 × 1920 fast-paced Reel in `src/reel/`. Thirteen beat-synced scenes (120 BPM): curiosity hook, free, the scattered-PDF problem, logo drop, then events, lessons, labs, past tests, ranked tests (the site's real rank badges, Iron → Radiant), binders, coaches, 400+ students and the akoizo.app call to action. Important text stays inside Instagram's safe area.

- Re-record app clips (dev server running, everything mocked): from the Akoizo root, `TEST_BASE_URL=http://127.0.0.1:3006 node akoizo-promo/scripts/reel-capture.mjs`
- Regenerate the original soundtrack: `node scripts/reel-soundtrack.mjs`. Cut timing lives in `src/reel/timeline.json` and drives both picture and sound.
- Render: `npx remotion render Akoizo-Reel output/akoizo-reel.mp4 --codec=h264 --crf=18 --audio-codec=aac --audio-bitrate=320k`
- `Akoizo-Reel-SFX-Only` keeps the hits and whooshes but drops the music, so a trending Instagram sound can go underneath.
