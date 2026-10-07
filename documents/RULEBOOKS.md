# Local 2027 rulebooks

Rules are served from `public/rules/2027/`. The app embeds only the selected event's section and offers links to that section and the complete division manual. No external PDF request is needed to view rules.

Sources checked October 7, 2026:

- Division A: PDF export of the supplied [2027 Florida Elementary Science Olympiad manual](https://docs.google.com/document/d/1gji19ZeWW5H_yfTI2mwR4Rboskdwyv27N6BfrShAjR8/edit), downloaded October 7, 2026. 57 PDF pages; 17 event sections including two special events.
- Division B: the already downloaded official `Science_Olympiad_Div_B_Rules_2027.pdf`, copied from the user's Downloads folder. 80 PDF pages; 23 event sections.
- Division C: the already downloaded official `Science_Olympiad_Div_C_Rules_2027.pdf`, copied from the user's Downloads folder. 84 PDF pages; 23 event sections.

The former guessed `soinc.org/sites/default/files/uploaded_files/Science_Olympiad_Div_*_Rules_2027.pdf` addresses are no longer used. The complete local manuals retain their original contents and attribution.

## Page ranges and updates

`src/lib/event-rule-pages.json` is the shared manifest for the UI and extraction script. Its inclusive, one-based page ranges count all PDF pages, including the cover. The title labels these as **PDF Pages** to distinguish them from the manual's printed page numbers. An event section starts on its first rule page and retains its associated diagrams, scoring sheets, checklists, and reference lists. It does not include the next event or unrelated forms.

Division A's contents table does not match all exported PDF positions; ranges were checked against the actual pages. For example, Crave the Wave is PDF page 16, Crimebusters is 17–22, and Professor Jensen's Potions is 49–50. Division B Write It Do It is page 66 only; page 67 begins the trial-event introduction.

To refresh a manual, replace its `division-a.pdf`, `division-b.pdf`, or `division-c.pdf`, check every affected range, then run `python scripts/extract-event-rules.py` with `pypdf` installed. The script verifies each generated section's page count, text, and page dimensions against its source. Commit the updated manual, manifest, and extracted sections together. The app does not automatically fetch later corrections; tournament clarifications still apply.

Rules assets allow same-origin embedding. Other site responses retain the existing frame protection.
