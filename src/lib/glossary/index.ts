// Event glossaries: plain-language definitions for every event-specific term used in the
// lessons, beyond each lesson's six key terms. The lesson reader underlines any of them.
import type { EventLessons } from '../lessons';
import { mergeTerms } from '../lesson-format.ts';
import { anatomyGlossary } from './anatomy.ts';
import { buildGlossaries } from './build.ts';
import { chemGlossaries } from './chem.ts';
import { earthGlossaries } from './earth.ts';
import { lifeGlossaries } from './life.ts';
import { physicalGlossaries } from './physical.ts';
import { spaceGlossaries } from './space.ts';

export type GlossaryEntries = Record<string, string>;

const eventGlossaries: Record<string, GlossaryEntries> = {
  ...buildGlossaries,
  ...lifeGlossaries,
  ...earthGlossaries,
  ...spaceGlossaries,
  ...chemGlossaries,
  ...physicalGlossaries,
  'anatomy-and-physiology': anatomyGlossary,
};

/** "Buckling|buckle|buckled" → term Buckling, also underlined as buckle and buckled. */
function entries(glossary: GlossaryEntries = {}) {
  return Object.entries(glossary).map(([key, definition]) => {
    const [term, ...aliases] = key.split('|');
    return aliases.length ? { term, definition, aliases } : { term, definition };
  });
}

/** Every key term in the course plus the event glossary, as one list. */
export function withGlossary(course: EventLessons): EventLessons {
  const extra = entries(eventGlossaries[course.eventId]);
  const glossary = mergeTerms(...course.lessons.map((lesson) => lesson.keyTerms), extra);
  return { ...course, glossary };
}
