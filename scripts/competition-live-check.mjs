import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { blankCourse, courseSvg } from '../src/lib/build-events.ts';
import { runBuildAI } from '../src/lib/build-ai.ts';
import { writeBinderPages } from '../src/lib/binder-ai.ts';
import { binderDocument } from '../src/lib/binder-document.ts';
await mkdir('tmp/competition-qa', { recursive: true });
const old = JSON.parse(await readFile('tmp/binders/live-dynamic-planet.json', 'utf8'));
const tasks = [
  ...['C/electric-vehicle', 'B/scrambler'].map(async (key) => {
    const [division, event] = key.split('/');
    const course = await runBuildAI(blankCourse(division, event), 'course');
    const path = `tmp/competition-qa/${division}-${event}`;
    await writeFile(path + '.json', JSON.stringify(course, null, 2));
    await writeFile(path + '.svg', courseSvg(course));
    console.log(key + ': live Gemini OK, ' + course.diagram.nodes.length + ' nodes');
  }),
  (async () => {
    const input = {
      eventId: old.eventId,
      division: 'C',
      title: old.title,
      level: old.level,
      pageCount: old.pageCount,
      notes: '',
      uploads: [],
    };
    const pages = await writeBinderPages(input, old.plan, 0);
    await writeFile('tmp/competition-qa/binder.json', JSON.stringify({ ...old, pages }, null, 2));
    await writeFile('tmp/competition-qa/binder.html', binderDocument({ ...old, pages }));
    console.log(
      'Binder: live Gemini OK, ' +
        pages.length +
        ' pages; bullets ' +
        pages.map((p) => p.paragraphs.length).join(',') +
        '; tables ' +
        pages.map((p) => p.table.rows.length).join(','),
    );
  })(),
];
const results = await Promise.allSettled(tasks);
results.forEach((r, i) => {
  if (r.status === 'rejected') {
    console.log('Live check ' + i + ' failed: ' + r.reason.message);
    process.exitCode = 1;
  }
});
