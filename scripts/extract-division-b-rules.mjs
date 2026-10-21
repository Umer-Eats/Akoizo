// Rebuilds the Division B rule text used to ground cheat sheet and binder generation.
// Requires `pdftotext` (Poppler) on PATH. Reads the per-event PDFs in public/rules/2027/b.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const cheatsheetEvents = [
  'anatomy-and-physiology',
  'botany',
  'crime-busters',
  'disease-detectives',
  'food-science',
  'heredity',
  'solar-system',
  'water-quality',
];
const binderEvents = [
  'circuit-lab',
  'dynamic-planet',
  'meteorology',
  'remote-sensing',
  'rocks-and-minerals',
  'thermodynamics',
];

function ruleText(eventId) {
  const pdf = `${root}public/rules/2027/b/${eventId}.pdf`;
  const text = execFileSync('pdftotext', ['-enc', 'UTF-8', pdf, '-'], { encoding: 'utf8' });
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/\f/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function write(file, events) {
  const data = Object.fromEntries(events.map((id) => [id, ruleText(id)]));
  writeFileSync(`${root}src/data/${file}`, JSON.stringify(data, null, 2) + '\n');
  console.log(`${file}: ${events.length} Division B events`);
}

write('cheatsheet-rules-b.json', cheatsheetEvents);
write('binder-rules-b.json', binderEvents);
