# Animation research — October 6, 2026

## Requested PerfectPixel reference

[PerfectPixel Studio](https://github.com/gykim80/perfectpixel-studio) emphasizes stable anchors, consistent scale, transparent art, and explicit animation metadata. Those constraints address the identity and position changes visible in Ako's retired pose sheet.

The reviewed [frame extraction implementation](https://github.com/gykim80/perfectpixel-studio/blob/main/internal/sprite/extract.go) measures alpha-weighted centers and retains baseline information. Its [inspection implementation](https://github.com/gykim80/perfectpixel-studio/blob/main/internal/sprite/inspect.go) checks content, boundaries, and visual consistency.

Applied here: measure actual alpha regions, record immutable bounds and pivots, retain one set of artwork, validate bounds/continuity, and expose a versioned manifest. Ako uses an articulated renderer for continuous movement. We did not install PerfectPixel, copy its implementation, or run its full generation/inspection pipeline. Directional sprite exports remain a future deliverable.

## On-screen pet behavior

[VS Code's pet reference](https://code.visualstudio.com/docs/agents/reference/chat-pet) demonstrates pointer-aware gaze, idle behavior, and activation reactions. The design inference for Ako is quiet idle holds, attentive gaze, and a deliberate greeting, while keeping clear of navigation and primary content. Dragging, throwing, audio, and achievement reactions were not added.

## Animation states and performance

[Rive's state-machine overview](https://rive.app/docs/editor/state-machine/state-machine) describes linking states through explicit transitions. Ako separates idle, gaze, greeting, and paused behavior in an original motion model; Rive is not a dependency.

[web.dev's animation guidance](https://web.dev/articles/animations-guide) favors avoiding layout work. The rig updates SVG transforms and a small tail curve while document layout stays fixed. [Reduced-motion guidance](https://web.dev/articles/prefers-reduced-motion) informed the static alternative and dynamic preference listener.

## Typography reference

The user-supplied image is the primary typography reference. The revised AKOIZO title uses broad geometric proportions, beveled silver edges, dark metallic inset faces, and reflective highlights. The rejected tube wordmark is no longer rendered. All ordinary website headings use upright text.
