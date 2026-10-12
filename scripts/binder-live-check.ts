// Opt-in local smoke test. Calls Gemini and Wikimedia Commons, writes only local QA output; no
// school DB changes. Usage:
//   node --env-file=.env.local --experimental-strip-types scripts/binder-live-check.ts [eventId] [pages]
import { mkdir, writeFile } from 'node:fs/promises';
import { outlineBinder, planBinderTopics, writeBinderPages } from '../src/lib/binder-ai.ts';
import { binderDocument } from '../src/lib/binder-document.ts';
import { binderContentPages, binderPlanReady, mergeBinderTopics } from '../src/lib/binders.ts';
import type { Binder, BinderInput } from '../src/lib/binder-types.ts';

const eventId = process.argv[2] ?? 'dynamic-planet',
  pageCount = Number(process.argv[3] ?? 10);
const input: BinderInput = {
  eventId,
  title: `${eventId} live check`,
  level: 'national',
  pageCount,
  notes: '',
  uploads: [],
};
const out = 'tmp/binders';
await mkdir(out, { recursive: true });
const started = Date.now();
let plan = await outlineBinder(input);
console.log(`Outline: ${plan.sections.map((s) => `${s.title} (${s.pages})`).join(' | ')}`);
while (!binderPlanReady(plan)) {
  const index = plan.sections.findIndex((s) => s.topics.length < s.pages);
  const merged = mergeBinderTopics(plan, index, await planBinderTopics(input, plan, index));
  if (!merged.added) throw new Error('No new topics returned');
  plan = merged.plan;
  console.log(`Topics: section ${index + 1} +${merged.added}`);
}
const total = binderContentPages(pageCount),
  pages: Binder['pages'] = [];
while (pages.length < total) {
  pages.push(...(await writeBinderPages(input, plan, pages.length)));
  console.log(`${pages.length}/${total} content pages generated`);
}
const binder: Binder = {
  ...input,
  id: 'qa',
  status: 'ready',
  completedPages: total,
  schoolName: 'QA School',
  createdAt: '2026-10-12T12:00:00.000Z',
  generatedAt: null,
  plan,
  pages,
  images: [],
};
await writeFile(`${out}/live-${eventId}.json`, JSON.stringify(binder, null, 2));
await writeFile(`${out}/live-${eventId}.html`, binderDocument(binder));
const kinds = pages.map((p) => p.diagram.kind).join(' ');
console.log(
  `${pageCount}-page binder ready in ${Math.round((Date.now() - started) / 1000)}s. Photos: ${pages.filter((p) => p.photo).length}/${total}. Diagrams: ${kinds}`,
);
