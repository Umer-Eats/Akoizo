// Builds starter notes from an event's course: an overview page, one page per unit and per
// lesson, and a glossary. Pages link to each other with [[wikilinks]], so the notebook's graph
// and backlinks work from the first open. Key terms come pre-highlighted.
import type { EventLessons, Lesson } from './lessons.ts';
import type { NoteSourceKind } from './note-types.ts';
import { escapeHtml } from './note-html.ts';

export type GeneratedPage = {
  kind: NoteSourceKind;
  refId: string;
  section: string;
  title: string;
  label: string;
  html: string;
};

const link = (title: string) =>
  `<a data-wikilink="${escapeHtml(title)}">${escapeHtml(title)}</a>`;
export const unitPageTitle = (title: string) => `${title} (unit)`;
export const overviewTitle = (eventName: string) => `${eventName} overview`;
export const glossaryTitle = (eventName: string) => `${eventName} glossary`;

// The opening sentence of a paragraph, plus the next one when the first is very short.
function lead(paragraph: string) {
  const sentences = paragraph.split(/(?<=[.!?])\s+(?=[A-Z0-9“"(])/);
  const first = sentences[0] ?? '';
  return first.length < 70 && sentences[1] ? `${first} ${sentences[1]}` : first;
}

// Escapes text and highlights the first mention of each key term not yet highlighted.
function marked(text: string, terms: string[], used: Set<string>) {
  let html = escapeHtml(text);
  for (const term of terms) {
    if (used.has(term.toLowerCase())) continue;
    const safe = escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(^|[^\\w&])(${safe})(?![\\w])`, 'i');
    if (!pattern.test(html)) continue;
    html = html.replace(pattern, '$1<mark data-color="yellow">$2</mark>');
    used.add(term.toLowerCase());
  }
  return html;
}

export function lessonNoteHtml(course: EventLessons, lesson: Lesson) {
  const unit = course.units.find((item) => item.id === lesson.unitId);
  const terms = lesson.keyTerms.map((term) => term.term).sort((a, b) => b.length - a.length);
  const used = new Set<string>();
  const parts: string[] = [];
  parts.push(
    `<p>Part of ${unit ? link(unitPageTitle(unit.title)) : link(overviewTitle(course.eventName))} · about ${lesson.durationMin} min · #${course.eventId}</p>`,
  );
  if (lesson.objectives.length)
    parts.push(
      `<blockquote data-callout="key"><p><strong>By the end you can</strong></p><ul>${lesson.objectives
        .map((objective) => `<li>${escapeHtml(objective)}</li>`)
        .join('')}</ul></blockquote>`,
    );
  for (const section of lesson.sections) {
    const points = section.body.map(lead).filter(Boolean);
    if (!points.length) continue;
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    parts.push(`<ul>${points.map((point) => `<li>${marked(point, terms, used)}</li>`).join('')}</ul>`);
  }
  if (lesson.keyTerms.length)
    parts.push(
      `<h2>Key terms</h2><ul>${lesson.keyTerms
        .map(
          (term) =>
            `<li><strong>${escapeHtml(term.term)}</strong>: ${escapeHtml(term.definition)}</li>`,
        )
        .join('')}</ul>`,
    );
  const example = lesson.workedExample;
  if (example?.steps?.length)
    parts.push(
      `<h2>Worked example: ${escapeHtml(example.title)}</h2><p>${escapeHtml(example.problem)}</p><ol>${example.steps
        .map((step) => `<li>${escapeHtml(step)}</li>`)
        .join('')}</ol><p><strong>So:</strong> ${escapeHtml(example.conclusion)}</p>`,
    );
  const questions = lesson.practice.slice(0, 5);
  if (questions.length)
    parts.push(
      `<h2>Check yourself</h2><ul data-checklist="true">${questions
        .map((question) => `<li data-checked="false">${escapeHtml(question.prompt)}</li>`)
        .join('')}</ul>`,
    );
  parts.push(
    '<h2>My summary</h2><blockquote data-callout="question"><p>Close the lesson and write what you remember in two or three sentences. Then check it against the key terms above.</p></blockquote><p><br></p>',
  );
  return parts.join('');
}

/** Every page for one event's course, in reading order. */
export function eventNotePages(course: EventLessons): GeneratedPage[] {
  const pages: GeneratedPage[] = [];
  const unitList = course.units
    .map((unit) => `<li>${link(unitPageTitle(unit.title))}<br>${escapeHtml(unit.description)}</li>`)
    .join('');
  pages.push({
    kind: 'event',
    refId: 'overview',
    section: '',
    title: overviewTitle(course.eventName),
    label: `${course.eventName} lessons`,
    html: `<p>${escapeHtml(course.intro)}</p><blockquote data-callout="tip"><p>Each unit page links its lessons. Open a lesson page while you read the lesson, and add your own notes under each heading.</p></blockquote><h2>Units</h2><ol>${unitList}</ol><h2>Reference</h2><ul><li>${link(glossaryTitle(course.eventName))}</li>${course.references
      .slice(0, 6)
      .map((ref) => `<li><a href="${escapeHtml(ref.url)}">${escapeHtml(ref.title)}</a></li>`)
      .join('')}</ul>`,
  });
  for (const [index, unit] of course.units.entries()) {
    const lessons = unit.lessonIds
      .map((id) => course.lessons.find((lesson) => lesson.id === id))
      .filter((lesson): lesson is Lesson => !!lesson);
    pages.push({
      kind: 'unit',
      refId: unit.id,
      section: unit.title,
      title: unitPageTitle(unit.title),
      label: `Unit ${index + 1}: ${unit.title}`,
      html: `<p>Unit ${index + 1} of ${course.units.length} in ${link(overviewTitle(course.eventName))}</p><p>${escapeHtml(unit.description)}</p><h2>Lessons</h2><ul data-checklist="true">${lessons
        .map((lesson) => `<li data-checked="false">${link(lesson.title)}</li>`)
        .join('')}</ul><h2>Big ideas in this unit</h2><p><br></p>`,
    });
    for (const lesson of lessons)
      pages.push({
        kind: 'lesson',
        refId: lesson.id,
        section: unit.title,
        title: lesson.title,
        label: lesson.title,
        html: lessonNoteHtml(course, lesson),
      });
  }
  const glossary = new Map<string, string>();
  for (const term of [...(course.glossary ?? []), ...course.lessons.flatMap((l) => l.keyTerms)])
    if (!glossary.has(term.term.toLowerCase())) glossary.set(term.term.toLowerCase(), `<li><strong>${escapeHtml(term.term)}</strong>: ${escapeHtml(term.definition)}</li>`);
  pages.push({
    kind: 'event',
    refId: 'glossary',
    section: '',
    title: glossaryTitle(course.eventName),
    label: `${course.eventName} glossary`,
    html: `<p>Every key term in ${link(overviewTitle(course.eventName))}, A to Z.</p><ul>${[...glossary.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, item]) => item)
      .join('')}</ul>`,
  });
  return pages;
}
