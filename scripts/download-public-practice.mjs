// Retrieve public Scioly wiki copies, then match their bytes to the existing archive.
// No account cookies or gated download routes are used.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root = 'output/practice-research/bulk';
const papers = JSON.parse(await readFile(`${root}/wiki-candidates.json`, 'utf8'));
const sources = JSON.parse(await readFile(`${root}/public-candidates.json`, 'utf8'));
const urls = [
  ...new Set([
    ...papers.flatMap((p) => p.files.map((f) => f.url)),
    ...sources.flatMap((s) => s.publicFiles.map((f) => f.url)),
  ]),
];
const queue = JSON.parse(await readFile(`${root}/queue.json`, 'utf8'));
const hashes = new Map(queue.flatMap((s) => s.files.map((f) => [f.sha256, f.name])));
await mkdir(`${root}/public`, { recursive: true });
const results = [];
async function download(url) {
  if (!/^https:\/\/scioly\.org\/w\/images\//.test(url))
    throw new Error('Not a public Scioly asset');
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.subarray(0, 5).toString() !== '%PDF-' || bytes.length > 18000000)
      throw new Error('Not a supported PDF');
    const hash = createHash('sha256').update(bytes).digest('hex');
    const path = `${root}/public/${hash}.pdf`;
    await writeFile(path, bytes);
    results.push({ url, path, hash, matchedName: hashes.get(hash) ?? null });
  } catch (error) {
    results.push({ url, error: error.message });
  }
}
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(urls.slice(i, i + 4).map(download));
  console.log(
    JSON.stringify({
      processed: results.length,
      total: urls.length,
      matched: results.filter((r) => r.matchedName).length,
    }),
  );
}
await writeFile(`${root}/public-downloads.json`, JSON.stringify(results, null, 2) + '\n');
console.log(
  JSON.stringify({
    files: results.length,
    matched: results.filter((r) => r.matchedName).length,
    errors: results.filter((r) => r.error).length,
  }),
);
