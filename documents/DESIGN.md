# Design and motion

## Current direction

An editorial Y2K study space with near-black and pearl-white themes, wide beveled chrome lettering, blue accents, fine orbital wireframes, holographic glass, and Ako, the male lab-rat mascot. The supplied Y2K image is the visual reference; the reference image itself is not published as a site asset.

The main title follows the broad, softly squared, polished-metal lettering in the reference's “CORE VISUAL” headline. `public/art/akoizo-chrome.png` is original generated artwork spelling AKOIZO, with bright bevels, dark metallic faces, and icy-blue reflections. The former tube-shaped SVG is no longer rendered. The landing h1 retains the accessible name Akoizo; an SVG viewport displays the title PNG without its excess transparent margins.

## Palette and typography

Dark mode uses ice blue (`#93c5fd`); light mode uses royal blue (`#2563c9`). Glass, controls, orbit lines, and decorative gradients use blue/slate tones. The small header/footer rat SVG and favicon remain flat monochrome blue.

Space Grotesk is the display font, Manrope is the body font, and IBM Plex Mono is used for small labels. Fonts are packaged locally. All page, event, and study-tool headings are upright; the previous italic serif emphasis has been removed.

## Composition

The chrome wordmark sits above a concise introduction and primary action. Ako leans into the page from the upper-right corner below the navigation, angled inward. His lower body extends beyond the right edge. He is no longer centered or perched directly on the wordmark. Mobile eyebrow text wraps within the remaining space so it does not collide with him.

Features appear in sequential sections farther down the page. Other pages retain a full-body mascot. Global style tokens and responsive rules live in `src/app/globals.css`.

## Ako v2

The current character uses one persistent set of illustrated body parts with a procedural face and tail. Stable shoulder, elbow, head, and foot pivots replace the retired six-pose slideshow. Head/eye movement, breathing, blinking, arm waving, and tail curls interpolate continuously at the browser's display cadence. No full-character frame changes, squashed mirror turns, or crossfades are used.

The reusable renderer, motion model, source atlas, and manifest are described in [MASCOT_ANIMATION.md](MASCOT_ANIMATION.md). [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) explains how the requested PerfectPixel reference informed the design. Generated artwork prompts are preserved in [ART_PROVENANCE.md](ART_PROVENANCE.md).

## Motion and accessibility

- Ako periodically changes gaze and follows pointer movement over his interaction area. Click, tap, Enter, or Space triggers a 2.8-second jointed wave and status greeting.
- Character movement pauses off-screen and in hidden tabs. The footer setting and system reduced-motion preference stop the animation loop while retaining interaction and a still pose.
- Decorative orbit drift, iridescent spheres, and scroll reveals retain reduced-motion alternatives.
- Content is usable without animation. No sound, flashing effects, or pointer capture is added.

## Earlier visual research

[Lusion v3](https://www.awwwards.com/sites/lusion-v3) informed scroll pacing; [Active Theory](https://www.commarts.com/webpicks/active-theory-2) informed the spacious opening. These were direction references, not copied layouts or assets.
