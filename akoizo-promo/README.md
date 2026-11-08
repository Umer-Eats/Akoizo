# Akoizo portrait promo

Interactive 30-second promotional film: 1080 × 1920, 9:16, 30 fps. Six editable scenes, original music, real product imagery and mobile-safe text.

Watch: run `node scripts/preview.mjs`, then open http://127.0.0.1:3101. The responsive player includes play/pause, scrubbing, volume, fullscreen, chapters, and links to Akoizo and school setup.

Edit: run `npx remotion studio --no-open --port=3100`, then open http://localhost:3100/Akoizo-Portrait. Individual scenes are under Scenes. Text layers use Remotion Interactive elements.

Export when needed: `npx remotion render Akoizo-Portrait output/akoizo-portrait.mp4 --codec=h264 --crf=16`.

The interactive player is the deliverable. A flat MP4 retains the film and music; clickable links and chapter controls belong to the player.

Messaging follows https://akoizo.app and existing app source. The 400+ students impacted metric was supplied by the user. School contact points to https://akoizo.app/contact. Original soundtrack: scripts/soundtrack.mjs. No third-party music samples.

Design notes: DESIGN.md. Scene preview images: output/. The main application remains separate from this video project.
