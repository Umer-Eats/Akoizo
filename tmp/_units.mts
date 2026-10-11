import { anatomyLessons } from '../src/lib/lessons-anatomy.ts';
import { forensicsLessons } from '../src/lib/lessons-forensics.ts';
import { yellowPurpleCourses } from '../src/lib/lessons-yellow-purple.ts';
import { blueGreenOrangeCourses } from '../src/lib/lessons-blue-green-orange.ts';
import { lessonReferenceFigures } from '../src/lib/lesson-reference-figures.ts';
const courses = [anatomyLessons, forensicsLessons, ...yellowPurpleCourses, ...blueGreenOrangeCourses];
for (const c of courses) {
  console.log(`\n## ${c.eventId} (${c.syllabus})`);
  for (const l of c.lessons) {
    const s = l.simulation;
    const k = s.kind === 'explorer' ? `E${s.topic}` : s.kind === 'model' ? `M:${s.model}` : `I${s.diagram ? ':' + s.diagram : ''}`;
    const nf = (l.referenceFigures ?? lessonReferenceFigures.filter(f=>f.lessonId===l.id)).length;
    console.log(`${l.id} [${k}] figs=${nf} secs=${l.sections.length} :: ${l.title} || ${l.sections.map(x=>x.heading).join(' | ')}`);
  }
}
