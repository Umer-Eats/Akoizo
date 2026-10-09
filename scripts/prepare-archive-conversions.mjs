// Inventory only the unconverted B/C sources exposed by Akoizo's practice libraries.
// Files are matched by the archive's SHA-256, never by a guessed filename.
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { practiceTests, listArchiveSources } from '../src/lib/practice-catalog.ts';
import { eventsForDivision } from '../src/lib/events.ts';
import { eventToolIds } from '../src/lib/event-rules.ts';
const root = 'output/practice-research';
await mkdir(`${root}/bulk`, { recursive: true });
const assets = new Map();
async function index(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${item.name}`;
    if (item.isDirectory()) await index(path);
    else if (/\.pdf$/i.test(item.name)) {
      const bytes = await readFile(path);
      if (bytes.subarray(0, 5).toString() === '%PDF-')
        assets.set(createHash('sha256').update(bytes).digest('hex'), path);
    }
  }
}
await index(root);
const rows = [];
for (const division of ['B', 'C']) {
  for (const event of eventsForDivision(division)) {
    if (!eventToolIds(division, event).includes('practice-tests')) continue;
    for (const source of listArchiveSources(division, event.id)) {
      const test = source.files.find((file) => file.type === 'test');
      const key = source.files.find((file) => file.type === 'answer_key');
      // Attachments are sometimes labeled "other". Do not silently omit diagrams.
      const contexts = source.files.filter(
        (file) => file !== test && file !== key && /\.pdf$/i.test(file.name),
      );
      const id = `scioly-${source.sourceId.toLowerCase().replace(/_/g, '-')}-${division.toLowerCase()}`;
      const paperPath = test && assets.get(test.sha256);
      const keyPath = key && assets.get(key.sha256);
      const context = contexts.find((file) => assets.has(file.sha256));
      const ready =
        !!paperPath &&
        (!key || !!keyPath) &&
        contexts.length <= 1 &&
        contexts.every((file) => assets.has(file.sha256));
      rows.push({
        id,
        sourceId: source.sourceId,
        sourceUrl: source.sourceUrl,
        division,
        eventId: event.id,
        competition: source.competition,
        year: source.year,
        level: source.level,
        levelText: source.levelEvidence?.text,
        paperUrl: source.sourceUrl,
        keyUrl: key ? source.sourceUrl : null,
        ...(paperPath ? { paperPath } : {}),
        ...(keyPath ? { keyPath } : {}),
        ...(context ? { contextPath: assets.get(context.sha256) } : {}),
        files: source.files,
        state: !test
          ? 'no-test-file'
          : !/\.pdf$/i.test(test.name)
            ? 'non-pdf-test'
            : contexts.length > 1 &&
                paperPath &&
                (!key || keyPath) &&
                contexts.every((file) => assets.has(file.sha256))
              ? 'needs-attachment-bundle'
              : ready
                ? 'downloaded'
                : 'needs-download',
      });
    }
  }
}
if (new Set(rows.map((row) => row.id)).size !== rows.length)
  throw new Error('Conversion IDs collide; resolve before processing.');
rows.sort(
  (a, b) =>
    Number(b.state === 'downloaded') - Number(a.state === 'downloaded') ||
    b.year - a.year ||
    a.id.localeCompare(b.id),
);
await writeFile(`${root}/bulk/queue.json`, JSON.stringify(rows, null, 2) + '\n');
await writeFile(
  `${root}/bulk/local-manifest.json`,
  JSON.stringify(
    rows.filter((row) => row.state === 'downloaded'),
    null,
    2,
  ) + '\n',
);
const states = Object.fromEntries(
  [...new Set(rows.map((row) => row.state))].map((state) => [
    state,
    rows.filter((row) => row.state === state).length,
  ]),
);
await writeFile(
  'documents/PRACTICE_CONVERSION_QUEUE.md',
  `# Remaining practice conversions\n\nInventory of the unconverted sources shown in Akoizo's Division B/C Practice Tests libraries. Generated ${new Date().toISOString().slice(0, 10)}.\n\n` +
    `${practiceTests.length} converted papers are already available. ${rows.length} remaining division-specific entries represent ${new Set(rows.map((row) => row.sourceId)).size} unique archive sources.\n\n` +
    `| File availability | Entries |\n| --- | ---: |\n` +
    Object.entries(states)
      .map(([state, count]) => `| ${state} | ${count} |`)
      .join('\n') +
    `\n\nA downloaded file is not a completed conversion. Each paper still needs question extraction, rubric checks and publication. Missing keys use independent Auto Grade references after conversion; they do not prevent question extraction. Missing tests and non-PDF sources need separate retrieval/format handling. Login-gated files are downloaded only through normal authorized access.\n`,
);
console.log(
  JSON.stringify({
    entries: rows.length,
    uniqueSources: new Set(rows.map((row) => row.sourceId)).size,
    states,
    localReady: rows.filter((row) => row.state === 'downloaded').map((row) => row.id),
  }),
);
