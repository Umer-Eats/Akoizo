import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons } from '../src/lib/lessons-forensics.ts';
import { yellowPurpleCourses } from '../src/lib/lessons-yellow-purple.ts';
import { blueGreenOrangeCourses } from '../src/lib/lessons-blue-green-orange.ts';
import { lessonReferenceFigures } from '../src/lib/lesson-reference-figures.ts';
const courses = [anatomyLessons, forensicsLessons, ...yellowPurpleCourses, ...blueGreenOrangeCourses];
const figs = (l:any)=> (l.referenceFigures ?? lessonReferenceFigures.filter(f=>f.lessonId===l.id));
for (const c of courses) {
  const sims: Record<string, number> = {};
  let nf = 0, noFig = 0, words = 0;
  for (const l of c.lessons) {
    const k = l.simulation.kind === 'explorer' ? `explorer:${l.simulation.lab}` : l.simulation.kind === 'model' ? `model:${l.simulation.model}` : `investigation${l.simulation.diagram ? ':' + l.simulation.diagram : ''}`;
    sims[k] = (sims[k] ?? 0) + 1;
    const n = figs(l).length; nf += n; if (!n) noFig++;
    words += l.sections.flatMap(s=>s.body).join(' ').split(/\s+/).length;
  }
  console.log(`${c.eventId.padEnd(24)} units=${c.units.length} lessons=${c.lessons.length} figs=${nf} lessonsNoFig=${noFig} words/lesson=${Math.round(words/c.lessons.length)} sims=${JSON.stringify(sims)}`);
}
// cross-event duplicates
const seen = new Map<string, Set<string>>();
const add = (kind:string, text:string, ev:string) => { const k = kind+'|'+text.trim().toLowerCase(); if(!seen.has(k)) seen.set(k,new Set()); seen.get(k)!.add(ev); };
for (const c of courses) for (const l of c.lessons) {
  for (const s of l.sections) { add('heading', s.heading, c.eventId); for (const p of s.body) add('para', p, c.eventId); }
  for (const t of l.keyTerms) add('term', t.term+'::'+t.definition, c.eventId);
  for (const q of l.practice) add('q', q.prompt, c.eventId);
  for (const o of l.objectives) add('obj', o, c.eventId);
  add('title', l.title, c.eventId);
  add('challenge', (l.simulation as any).challenge ?? (l.simulation as any).question, c.eventId);
  add('instructions', l.simulation.instructions, c.eventId);
  add('wex', l.workedExample.problem, c.eventId);
  if (l.visual) for (const s of l.visual.steps) add('flow', s.label+'::'+s.detail, c.eventId);
  for (const f of figs(l)) add('fig', f.src, c.eventId);
}
const byKind: Record<string, number> = {};
for (const [k, v] of seen) if (v.size > 1) { const kind = k.split('|')[0]; byKind[kind] = (byKind[kind] ?? 0) + 1; if (kind !== 'heading') console.log('DUP', [...v].join(','), '::', k.slice(0, 160)); }
console.log(byKind);
// within-event dup figs
const figUse = new Map<string,string[]>();
for (const c of courses) for (const l of c.lessons) for (const f of figs(l)) { figUse.set(f.src,[...(figUse.get(f.src)??[]), l.id]); }
for (const [s,v] of figUse) if (v.length>1) console.log('FIGDUP', v.join(','), s.slice(0,100));
console.log('total figs', lessonReferenceFigures.length, 'unique src', figUse.size);
