# Ako v2 — articulated character

Ako remains the male ivory lab rat with blue goggles and coat trim, pink ears/paws/tail, and a small fur tuft. The current version replaces the rejected six-frame pose animation with a continuously animated 2D rig.

## Reusable files

| File                               | Responsibility                                                                                           |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/components/ako-character.tsx` | Reusable SVG renderer: attached layers, procedural eyes and tail, clock, joint updates                   |
| `src/lib/ako-motion.ts`            | Pure continuous pose model, gaze timing, blink envelope, breathing and wave timing                       |
| `public/art/ako/parts.png`         | Transparent 1536 × 1024 body-part atlas                                                                  |
| `public/art/ako/rig.json`          | Versioned manifest: source/destination rectangles, alpha centroids, pivots, viewBox, foot anchor, timing |
| `src/components/art.tsx`           | Website adapter: accessible button/greeting, pointer gaze, visibility and motion preferences             |
| `tests/ako-motion.test.ts`         | Continuity, completed-wave return, manifest bounds and part separation                                   |

## Renderer API

Import `AkoCharacter` into the next feature without copying home-page behavior.

| Prop        | Default   | Behavior                                                              |
| ----------- | --------- | --------------------------------------------------------------------- |
| `action`    | `idle`    | `idle` or `wave`                                                      |
| `actionKey` | `0`       | Increment to retrigger a wave; joint smoothing prevents abrupt resets |
| `look`      | automatic | Optional normalized horizontal gaze from -1 to +1                     |
| `paused`    | `false`   | Retain current pose and elapsed clock without rendering               |
| `motion`    | `true`    | When false, show a neutral still pose and cancel the loop             |

The SVG is decorative. Its consuming control supplies the accessible name and status text, as the shared `Mascot` adapter does.

## Art and alignment

The atlas contains six disconnected parts: head base, body/legs, resting arm, upper waving arm, waving forearm/hand, and muzzle. Generated spacing was not a uniform grid, so the manifest records measured alpha-content bounds instead of equal cells. Transparent margins are retained, and no neighboring part enters a source rectangle.

Source rectangles and destination geometry remain fixed throughout animation. The same artwork retains its proportions and identity. Nested joints connect the forearm to its upper arm. The body breathes around its foot anchor at `[200, 448]`; it is not repositioned from a moving image bounding box. Pupils and eyelids are vector features; the tail uses a continuously changing curve.

This is a front-view articulated character with smooth gaze changes and a shallow head turn, not a full-profile or eight-direction game sprite set. Separate side/back artwork and engine-specific exports remain future work if needed.

## Timing and transitions

- requestAnimationFrame drives time-based interpolation. React does not rerender the character on every display frame.
- Automatic gaze holds on each side and eases between them over 14 seconds. Pointer gaze and joints use damping; there is no horizontal image flip.
- Blinks use a short close/open envelope every 5.4 seconds. Breathing and tail movement use low-amplitude continuous curves.
- A wave lasts 2.8 seconds, easing in and out. Shoulder and elbow motion are independently interpolated.
- Repeated activation resets action time without remounting art. Joint damping handles the new target smoothly.
- Leaving the viewport or hiding the tab pauses the clock. Resuming does not accumulate a large elapsed-time jump. Listeners and animation callbacks are cleaned up on unmount.
- The footer setting and dynamic system reduced-motion changes are respected. Greeting text remains available without movement.

## Website placement

The home page uses `Mascot corner` inside `hero-corner`, below navigation. The rig rotates inward and is partially clipped by its corner button. Status text remains outside the crop. Other pages display the full rig. The flat SVG logo and favicon remain separate static marks.

## Provenance

Parts were generated with the built-in imagegen tool, using the prior blue Ako still as an identity reference. Rendering and animation are original project code. PerfectPixel was studied as an alignment/quality reference; its app, services, and AI-generation pipeline are not runtime dependencies. See [research](ANIMATION_RESEARCH.md), [prompts](ART_PROVENANCE.md), and [verification](VERIFICATION.md).
