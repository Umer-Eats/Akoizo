// Publish only explicitly reviewed draft IDs into the local catalog. Does not deploy.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { validatePracticeCatalog } from '../src/lib/practice-catalog.ts';
const ids = process.argv.slice(2);
if (!ids.length || ids.some(id => !/^[a-z0-9-]+$/.test(id))) throw new Error('Pass reviewed draft IDs.');
const sources = JSON.parse(await readFile('documents/practice-import-sources.json', 'utf8'));
const output = 'src/data/imported-practice-tests.json';
const existing = JSON.parse(await readFile(output, 'utf8'));
for (const id of ids) {
  const source = sources.find(s => s.id === id);
  if (!source) throw new Error(`Missing source manifest: ${id}`);
  const test = JSON.parse(await readFile(`output/practice-research/converted/${id}.json`, 'utf8'));
  validatePracticeCatalog([test]);
  await mkdir(`public/practice/${id}`, { recursive: true });
  await copyFile(source.paperPath, `public/practice/${id}/test.pdf`);
  test.paperUrl = `/practice/${id}/test.pdf`;
  if (source.keyPath) {
    await copyFile(source.keyPath, `public/practice/${id}/key.pdf`);
    test.keyUrl = `/practice/${id}/key.pdf`;
  }
  if (source.contextPath) {
    await copyFile(source.contextPath, `public/practice/${id}/images.pdf`);
    test.supplementUrl = `/practice/${id}/images.pdf`;
  }
  const index = existing.findIndex(t => t.id === id);
  if (index < 0) existing.push(test); else existing[index] = test;
}
validatePracticeCatalog(existing);
await writeFile(output, await format(JSON.stringify(existing), { ...(await resolveConfig(output)), parser:'json' }));
console.log(`Imported ${ids.length} reviewed papers; ${existing.length} imported papers total.`);
