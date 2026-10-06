# Design and motion

## Direction

An editorial Y2K study space: near-black or pearl white, chrome lettering, lavender accents, fine orbital wireframes, holographic glass, and a warm pixel-art mascot. The user-supplied `Y2K Style 02.png` informed the visual vocabulary. The approved mockups informed the navigation and content hierarchy. The supplied reference is not published as a site asset.

## Typography and layout

Space Grotesk for display, Manrope for body, IBM Plex Mono for small labels. Fonts are packaged locally so the running site does not request Google Fonts. A large first viewport introduces Akoizo; sequential sections explain features lower down. Theme tokens live in `src/app/globals.css`.

## Ako, the mascot

`public/art/ako-sprite.png` is an original image generated with the built-in imagegen tool: a pixel-art Venezuelan poodle moth inspired by the approved concept, redesigned with expressive eyes, playful feet, feathered antennae, and raised wings. Generation prompt: four consistent transparent poses, ivory fur, plum outline, brown antennae, lavender shadows, hard square pixels, relaxed/lifted/spread/lowered wings.

The sheet is 2172 × 724. CSS presents one cell using background positioning, with no raster editing. The two clean poses are animated; the oversized third pose and neighboring fourth-frame edge are excluded to avoid clipping and stray pixels. The runtime therefore uses two-frame flutter plus smooth floating and a tap-triggered celebration. A perfectly registered atlas is listed in the backlog.

## Motion

- Gentle moth hover/tilt, intermittent wing flutter, short greeting on activation.
- Fine orbital drift, small floating iridescent spheres, slow holographic light sweep.
- One-time content reveals as sections enter the viewport.
- Button hover movement and theme transitions.

All decorative motion stops for `prefers-reduced-motion: reduce` and the footer motion switch. Content remains visible in that state. The moth button is keyboard accessible and its greeting uses a status announcement. No looping flash effects or autoplay audio.

## Inspiration research

- [Lusion v3](https://www.awwwards.com/sites/lusion-v3): reference for reactive detail and scroll pacing.
- [Active Theory](https://www.commarts.com/webpicks/active-theory-2): reference for an immersive opening with restrained interface chrome.

These informed motion direction, not copied layouts or assets. The site uses lightweight CSS/SVG geometry rather than a full 3D rendering engine.
