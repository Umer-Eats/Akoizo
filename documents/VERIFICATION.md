# Verification

## October 6, 2026 — Chrome title and articulated Ako

- TypeScript checking and the production Next.js build pass.
- Five unit tests pass: event slates/division separation, ranking filters, assignment validation, continuous character motion, and rig geometry.
- Motion tests sample joint targets at 240 Hz to check continuity, bounded blink/gaze values, and a smooth greeting exit. Rig tests validate atlas bounds, non-overlapping source regions, targets, and pivots.
- The browser suite samples twenty animation frames and confirms changing joint transforms while the artwork remains the same. Off-screen motion pauses and resumes, keyboard/pointer greetings work, and the greeting returns to idle.
- Footer motion-off and system reduced motion show a still character while retaining the greeting. Hidden-tab pausing is implemented through page visibility; actual background-tab scheduling was not separately exercised by the headless suite.
- Existing browser flows pass: theme persistence, mobile navigation, sample quiz, rankings, division selection, assignment previews, and event/tool routes.
- Both themes pass route/layout checks at 1440 × 1000 and 390 × 844, with no page errors or document-level horizontal overflow. All checked heading elements and their spans have normal, non-italic font style.
- Additional landing screenshots at 320 × 900 and 768 × 900 show the corner character clear of the main title and introduction, without horizontal overflow.
- Visually reviewed the assembled full-body character, dark desktop landing, light phone landing, and narrow/tablet layouts. The title uses the reference-inspired chrome artwork. The generated atlas remains unchanged; its measured source regions are assembled at runtime.

The current implementation and reusable API are documented in [Ako's animation](MASCOT_ANIMATION.md). Research and image-generation provenance are in [animation research](ANIMATION_RESEARCH.md) and [art provenance](ART_PROVENANCE.md).

## Scope of existing flow checks

Assignment checks cover assigning a Division B event to a B student, excluding C-only events, persistence within the tab across reload, no A assignments before a local slate, showing C assignments only to the C sample student, and the sample school-ranking filter. Ranking checks cover division/search/pagination controls; event checks cover division switching, navigation, and invalid cross-division routes. Small-screen ranking tables can scroll inside their labeled keyboard-focusable region.

## Not verified or implemented

No Firebase credentials, database, real school membership, live scoring, uploaded test content, deployed Vercel environment, or external messaging was involved. Client-side sample filters are not a privacy boundary. Production school isolation and role authorization require backend tests when services are connected.

Ako currently has a front-view articulated rig and shallow head/gaze turns. Full side/back poses and eight-direction exports are not implemented. His appearance and timing should receive user review before reuse in the next task.

This is not a complete accessibility audit or cross-browser certification. Manual screen-reader checks, 200% text enlargement, Safari, Firefox, older devices, and production performance checks remain in the backlog.

## Repeat the checks

```sh
npm run typecheck
npm test
npm run build
# With the preview server already running:
npm run test:browser
```

The shorter screenshot pass, `scripts/visual-check.mjs`, uses reduced motion for deterministic captures. Generated QA screenshots under `documents/qa/` are ignored by Git.
