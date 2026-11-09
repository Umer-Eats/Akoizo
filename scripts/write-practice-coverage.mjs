import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import { practiceTests } from '../src/lib/practice-catalog.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';

const rows = [
  '# Practice coverage',
  '',
  'Coverage updated November 9, 2026. New additions reviewed against the local 2027 rules; individual source limitations are recorded below.',
  '',
  `${practiceTests.length} ready practice papers, ${practiceTests.reduce((n, t) => n + t.questionCount, 0).toLocaleString('en-US')} answer fields. Every one of the 46 Division B/C events has at least five current-topic papers. Includes ${practiceTests.filter((t) => t.origin === 'original').length} original curriculum forms and ${practiceTests.filter((t) => t.origin === 'adapted').length} repaired editions; remaining papers are archived competition conversions. Original editions superseded by repairs remain available through saved-attempt links. Division A is outside this expansion.`,
  '',
  'Difficulty estimates reflect question content within the test’s division. Competition tiers use reported evidence; an unconfirmed tier does not prevent conversion. Historical rotations are labeled separately from current-topic papers.',
  '',
  '| Division | Event | Papers | Current topic | Historical rotation |',
  '| --- | --- | ---: | ---: | ---: |',
];
for (const division of ['B', 'C']) {
  for (const event of eventsForDivision(division)) {
    if (!eventToolIds(division, event).includes('practice-tests')) continue;
    const tests = practiceTests.filter((t) => t.division === division && t.eventId === event.id);
    if (tests.length < 5)
      throw new Error(`Fewer than five practice papers: ${division}/${event.id}`);
    if (tests.filter((t) => t.topicMatch === 'current').length < 5)
      throw new Error(`Fewer than five 2027-topic papers: ${division}/${event.id}`);
    rows.push(
      `| ${division} | ${event.name} | ${tests.length} | ${tests.filter((t) => t.topicMatch === 'current').length} | ${tests.filter((t) => t.topicMatch === 'different').length} |`,
    );
  }
}
rows.push(
  '',
  '## Papers and scoring notes',
  '',
  'The point totals apply to the available written questions. Original curriculum forms include their own authored keys. Repaired editions retain archived pages and append clearly marked authored corrections or self-contained substitutes; historical source pages and saved-attempt editions remain unchanged. Physical performance is practiced separately.',
  '',
  '| Division / event | Competition / year | Level | Difficulty | Fields / points | Source and scoring |',
  '| --- | --- | --- | --- | --- | --- |',
);
for (const t of [...practiceTests].sort((a, b) =>
  `${a.division}/${a.eventId}/${a.year}`.localeCompare(`${b.division}/${b.eventId}/${b.year}`),
)) {
  const name = eventsForDivision(t.division).find((e) => e.id === t.eventId).name;
  rows.push(
    `| ${t.division} / ${name} | ${t.competition} / ${t.year} | ${t.level ?? 'Level not reported'} | ${t.difficulty} | ${t.questionCount} / ${t.maxScore} | [Source](${t.sourceUrl}). ${t.scoringBasis.replaceAll('|', '/').replaceAll('\n', ' ')} |`,
  );
}
rows.push(
  '',
  '## Import evidence',
  '',
  '- Original download URLs and reviewed local inputs are recorded in `practice-import-sources.json`. The imported catalog stores every scoring criterion; public paper responses omit the keys.',
  '- UT Austin Botany B and C are separately published papers in the [official ATX resource archive](https://www.atxscioly.org/resources). The [2020 event report](https://www.atxscioly.org/external-blog?offset=1605717022386) identifies October 23–25, 2020; the 2021 season listing and PDF export date are not used as the competition year. The [additional written rubric](https://drive.google.com/file/d/1AdV9hBW4-yIlcE5BT_l2W3ey3lpjWfF5/view) supplies the extended scoring criteria.',
  '- BullSO Remote Sensing B/C and Disease Detectives B/C have separately published division files; identical content is retained only where the publisher actually supplied it for both divisions.',
  '- Keyless Solar System B and Thermodynamics C use independent generated references through Auto Grade, labeled as AI-generated. They are not represented as possessing an official key.',
  '- MIT 2020 explicitly [reported national rules for all events](https://scioly.mit.edu/archives/2020/). Its Botany paper is labeled national guidelines while retaining the Invitational competition name. The conversion excludes conflicting source answers and discloses the reversed classification headings.',
  '- Chem2000 Chemistry Lab uses the archive’s Regional practice-paper designation. Its combined source is split at the published answer-key boundary; test pages 1–12 and key pages 13–14 retain their original contents. Lake Erie/Niagara and UT Austin Protein Modeling use their cover dates (2018 and 2019), not the following season year.',
  '- The October 9 batch adds 20 division-specific entries from 15 original public Scioly papers. Public wiki filenames and archive metadata establish mirror identity; compressed mirror bytes may differ. Nine drafts used model extraction and eleven used direct published-key transcription, followed by review. Historical freshwater-organism papers are separated from the 2027 coral-reef rotation. Source-key conflicts, unscored items and practice weighting are disclosed per paper. A daily Gemini quota interrupted extraction; live written Auto Grade was not revalidated after that limit.',
  '',
  'Regenerate this report with `node --experimental-strip-types scripts/write-practice-coverage.mjs`.',
  '',
);
await writeFile(
  'documents/PRACTICE_COVERAGE.md',
  await format(rows.join('\n'), { parser: 'markdown', proseWrap: 'preserve' }),
);
console.log(`Coverage report written for ${practiceTests.length} papers.`);
