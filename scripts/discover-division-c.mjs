// Inventory publicly linked Scioly wiki papers. Never request authenticated file routes.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { practiceTests } from '../src/lib/practice-catalog.ts';
const root = 'output/practice-research/division-c';
await mkdir(root, { recursive: true });
const wiki = JSON.parse(await readFile('output/practice-research/wiki-papers.json', 'utf8'));
const archive = JSON.parse(await readFile('output/practice-research/bulk/queue.json', 'utf8')).filter(s => s.division === 'C');
const published = JSON.parse(await readFile('documents/practice-import-sources.json', 'utf8'));
const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const normalize = text => decodeURIComponent(text).toLowerCase().replace(/[^a-z0-9]/g, '');
const events = new Set(practiceTests.filter(t => t.division === 'C').map(t => t.eventId));
const existingUrls = new Set(published.filter(s => s.division === 'C').map(s => s.paperUrl));
const tokens = text => new Set(text.toLowerCase().match(/[a-z0-9]+/g)?.filter(t => !'the of at test tests division c b invitational invitationals tournament region regional regionals state states practice user submitted unknown'.split(' ').includes(t)));
const results = [];
for (const paper of wiki) {
  const eventId = slug(paper.event);
  if (!events.has(eventId)) continue;
  const tests = paper.files.filter(f => /^(test|exam|quiz|part\s*1)/i.test(f.name.trim()) && !/answer sheet/i.test(f.name));
  if (!tests.length) { results.push({ eventId, title: paper.title, state: 'missing-test' }); continue; }
  const test = tests[0];
  if (/division\s*b\b|div\.?\s*b\b|\(b\)/i.test(paper.title) || /(?:^|[_ -])(?:div[_ -]?b|division[_ -]?b|b)(?:[_ .-]|$)/i.test(decodeURIComponent(test.url.split('/').at(-1)))) continue;
  if (existingUrls.has(test.url)) continue;
  const year = Number(paper.title.match(/\b(19\d{2}|20\d{2})\b/)?.[0]);
  if (!year) { results.push({ eventId, title: paper.title, state: 'year-needs-review', files:paper.files }); continue; }
  const key = paper.files.find(f => /^(master key|exam master key|answer key|key|solutions|supervisor)$/i.test(f.name.trim()));
  const combined = /key/i.test(test.name);
  const contexts = paper.files.filter(f => /image|figures|dso list|stations/i.test(f.name) && f.url !== test.url);
  const titleTokens = tokens(paper.title);
  const matches = archive.filter(s => {
    if (s.eventId !== eventId || s.year !== year) return false;
    const original = s.files.find(f => f.type === 'test');
    const base = normalize(test.url.split('/').at(-1));
    const filename = original && normalize(original.name);
    if (filename && base.length > 20 && (filename === base || filename.endsWith(base))) return true;
    const words = [...tokens(s.competition)];
    return words.length > 0 && words.every(w => titleTokens.has(w));
  });
  const source = matches.length === 1 ? matches[0] : null;
  const id = source?.id ?? `wiki-${eventId}-${createHash('sha256').update(test.url).digest('hex').slice(0, 10)}-c`;
  if (practiceTests.some(t => t.id === id) || results.some(s => s.id === id)) continue;
  const sourceUrl = source?.sourceUrl ?? 'https://scioly.org/wiki/Scioly.org:Test_Exchange';
  const level = /\bregional(?:s)?\b/i.test(paper.title) ? 'Regionals' : /\bstate(?:s)?\b/i.test(paper.title) && !/state invitational|state university/i.test(paper.title) ? 'States' : /\bnational(?:s)?\b/i.test(paper.title) ? 'Nationals' : null;
  const row = { id, ...(source ? {sourceId:source.sourceId} : {}), sourceUrl, division:'C', eventId, competition:paper.title.replace(/\b(19\d{2}|20\d{2})\b/, '').replace(/\s+/g,' ').trim(), year, level, levelText:level ? paper.title : undefined, paperUrl:test.url, keyUrl:key?.url ?? null, wikiTitle:paper.title, wikiTopic:paper.topic, files:paper.files, contextUrl:contexts[0]?.url, state:combined?'needs-key-split':tests.length>1?'needs-test-bundle':contexts.length>1?'needs-image-bundle':'ready-to-download' };
  results.push(row);
}
await writeFile(`${root}/inventory.json`, JSON.stringify(results,null,2)+'\n');
const existing = JSON.parse(await readFile('output/practice-research/bulk/public-downloads.json','utf8'));
const downloads = new Map(existing.filter(r => r.path).map(r => [r.url,r.path]));
const urls = [...new Set(results.filter(s => s.id).flatMap(s => s.files.map(f=>f.url)).filter(url=>/^https:\/\/scioly\.org\/w\/images\/.*\.pdf$/i.test(url)))];
const failures = [];
async function download(url) {
  if (downloads.has(url)) return;
  try {
    const response = await fetch(url, {signal:AbortSignal.timeout(60000)});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = Buffer.from(await response.arrayBuffer());
    if (data.subarray(0,5).toString() !== '%PDF-' || data.length > 18_000_000) throw new Error('Unsupported PDF');
    const path = `${root}/${createHash('sha256').update(data).digest('hex')}.pdf`;
    await writeFile(path,data); downloads.set(url,path);
  } catch(error) { failures.push({url,error:error.message}); }
}
for (let i=0;i<urls.length;i+=4) {
  await Promise.all(urls.slice(i,i+4).map(download));
  if (i%40===0) console.log(JSON.stringify({processed:Math.min(i+4,urls.length),total:urls.length,failed:failures.length}));
}
await writeFile(`${root}/downloads.json`,JSON.stringify([...downloads].map(([url,path])=>({url,path})),null,2)+'\n');
await writeFile(`${root}/download-errors.json`,JSON.stringify(failures,null,2)+'\n');
for (const s of results.filter(s=>s.id)) {
  s.paperPath=downloads.get(s.paperUrl);s.keyPath=downloads.get(s.keyUrl);s.contextPath=downloads.get(s.contextUrl);
  if (s.state==='ready-to-download') s.state = !s.paperPath || (s.keyUrl && !s.keyPath) || (s.contextUrl && !s.contextPath) ? 'unavailable-public-file' : 'downloaded';
}
await writeFile(`${root}/inventory.json`,JSON.stringify(results,null,2)+'\n');
await writeFile(`${root}/manifest.json`,JSON.stringify(results.filter(s=>s.state==='downloaded'),null,2)+'\n');
console.log(JSON.stringify({total:results.length,states:results.reduce((a,s)=>(a[s.state]=(a[s.state]??0)+1,a),{}),downloaded:downloads.size,failures:failures.length}));
