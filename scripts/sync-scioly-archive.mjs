import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { normalizeSource, readPageData, reportedCompetitionLevel } from './scioly-source.mjs';

const output = 'src/data/scioly-archive.json';
const cache = 'output/practice-research/scioly/pages';
const offline = process.argv.includes('--offline');
const details = process.argv.includes('--details');
await mkdir(cache, { recursive: true });
const local = JSON.parse(
  (await readFile('scioly_all_tests_full.json', 'utf8')).replace(/^\uFEFF/, ''),
);
const tests = new Map(
  local
    .map(normalizeSource)
    .filter(Boolean)
    .map((t) => [t.sourceId, t]),
);
try {
  const existing = JSON.parse(await readFile(output, 'utf8'));
  for (const item of existing.tests) {
    const level = reportedCompetitionLevel(item.competition);
    tests.set(item.sourceId, {
      ...item,
      level,
      levelEvidence: level
        ? {
            sourceUrl: item.sourceUrl,
            text: item.competition,
            basis: 'Reported tournament level',
          }
        : null,
    });
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
async function fetchPublic(url, options = {}) {
  const response = await fetch(url, { ...options, signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`Public archive HTTP ${response.status}`);
  return response;
}
if (!offline) {
  for (let page = 1, total = Infinity; (page - 1) * 50 < total; page++) {
    const response = await fetchPublic('https://scioly.org/api/tests/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters: {}, page, sort: [] }),
    });
    const data = await response.json();
    if (!Array.isArray(data.tests) || !Number.isInteger(data.total) || data.page !== page)
      throw new Error('Unexpected archive listing');
    total = data.total;
    for (const raw of data.tests) {
      const normalized = normalizeSource(raw);
      if (normalized)
        tests.set(normalized.sourceId, { ...tests.get(normalized.sourceId), ...normalized });
    }
    console.log(`Archive page ${page}: ${tests.size} unique B/C sources`);
  }
}
if (details) {
  const queue = [...tests.values()];
  let done = 0;
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const item = queue.shift();
        try {
          let html;
          try {
            html = await readFile(`${cache}/${item.sourceId}.html`, 'utf8');
          } catch (error) {
            if (offline || error.code !== 'ENOENT') throw error;
            html = await (await fetchPublic(item.sourceUrl)).text();
            await writeFile(`${cache}/${item.sourceId}.html`, html);
          }
          const data = readPageData(html);
          item.files = data.files.map((f) => ({
            name: f.name,
            type: f.type,
            size: f.sizeBytes,
            sha256: f.hashHex,
          }));
          item.status = !item.files.some((f) => f.type === 'answer_key')
            ? 'missing-key'
            : data.canDownloadFiles === false
              ? 'login-required'
              : 'awaiting-conversion';
          delete item.error;
        } catch (error) {
          item.status = 'source-unavailable';
          item.error = error.message;
        }
        done++;
        if (done % 25 === 0) console.log(`Inspected ${done}/${tests.size} source pages`);
      }
    }),
  );
}
const rows = [...tests.values()].sort((a, b) => a.sourceId.localeCompare(b.sourceId));
const statuses = {};
for (const row of rows) statuses[row.status] = (statuses[row.status] || 0) + 1;
await writeFile(
  output,
  JSON.stringify(
    {
      source: 'https://scioly.org/tests',
      checkedAt: new Date().toISOString(),
      count: rows.length,
      tests: rows,
    },
    null,
    2,
  ) + '\n',
);
console.log(JSON.stringify({ total: rows.length, statuses }));
