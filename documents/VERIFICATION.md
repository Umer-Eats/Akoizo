# Verification

Checks performed October 5, 2026 on Windows with Node 24 and headless Chrome.

## Automated checks

- TypeScript type checking passes.
- Production Next.js build passes; public pages are prerendered and event/tool routes render dynamically.
- Three domain tests pass: both 23-event slates and division separation; sample ranking school filters and stable search ranks; assignment division/date validation.
- Browser flow checks pass for both themes and at 1440 × 1000 and 390 × 844 viewports on the landing, rankings, mission, both login designs, and both dashboards.
- Browser tests cover theme persistence, mobile menu navigation, moth greeting, reduced motion, the sample science question, ranking division/search/pagination controls, event catalog division switching, event/tool navigation, and invalid cross-division event routes.
- Assignment checks cover an instructor assigning a Division B event to a B student, excluding C-only events, persistence within the tab across reload, no A assignments before a local slate, showing C assignments only to the C sample student, and the sample school ranking filter.
- No browser page errors or document-level horizontal overflow in the tested views. Ranking tables can scroll inside their own labeled keyboard-focusable region on small screens.

## Visual review

Desktop and phone screenshots reviewed for the landing page, light/dark styling, mission layout, instructor form, and sample rankings. Corrected the moth/headline spacing, field labeling for selectors, and the small-mascot greeting's mobile overflow. The generated sprite's overly wide pose is excluded from runtime animation.

## Not verified or implemented

No Firebase credentials, database, real school membership, live scoring, uploaded test content, deployed Vercel environment, or external messaging was involved. Client-side sample filters are not a privacy boundary. Production school isolation and role authorization require separate backend tests when services are connected.

This is not a complete accessibility audit or cross-browser certification. Manual screen-reader, 200% text enlargement, Safari, Firefox, older devices, and production performance checks remain in the backlog.

## Repeat the checks

```sh
npm run typecheck
npm test
npm run build
# With the preview server already running:
npm run test:browser
```

`scripts/visual-check.mjs` provides a shorter screenshot pass. Generated QA screenshots under `documents/qa/` are ignored by Git.
