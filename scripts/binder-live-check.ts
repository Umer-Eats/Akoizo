// Opt-in local smoke test. Calls Gemini, writes only local QA output; no school DB changes.
import { mkdir, writeFile } from 'node:fs/promises';
import { planBinder, writeBinderPages } from '../src/lib/binder-ai.ts';
import { binderDocument } from '../src/lib/binder-document.ts';
import type { Binder, BinderInput } from '../src/lib/binder-types.ts';
const input: BinderInput = { eventId: 'dynamic-planet', title: 'Freshwater systems', level: 'national', pageCount: 10, notes: '', uploads: [] };
await mkdir('tmp/binders', { recursive: true });
const config = { fetcher: (async (...args: Parameters<typeof fetch>) => {
  try { const response = await fetch(...args); if (!response.ok) console.log(`Gemini HTTP ${response.status}`); if (response.ok) await writeFile('tmp/binders/last-response.json', await response.clone().text()); return response; }
  catch (e) { console.log('Network failure:', (e as { cause?: { code?: string } }).cause?.code ?? (e as Error).name); throw e; }
}) as typeof fetch };
const plan = await planBinder(input, config);
console.log(`Outline: ${plan.sections.length} sections, ${plan.sections.flatMap(s => s.topics).length} pages`);
const pages: Binder['pages'] = [];
while (pages.length < 9) { pages.push(...await writeBinderPages(input, plan, pages.length, config)); console.log(`${pages.length}/9 content pages generated`); }
const binder: Binder = { ...input, id: 'qa', status: 'ready', completedPages: 9, schoolName: 'QA School', createdAt: '2026-10-12T12:00:00.000Z', generatedAt: null, plan, pages, images: [] };
await mkdir('tmp/binders', { recursive: true });
await writeFile('tmp/binders/live-binder.json', JSON.stringify(binder, null, 2));
await writeFile('tmp/binders/live-binder.html', binderDocument(binder));
console.log('Local 10-page binder ready for layout QA.');
