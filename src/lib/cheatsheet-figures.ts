import { lessonReferenceFigures } from './lesson-reference-figures.ts';

// Real figures come only from the lesson library's reviewed, openly licensed catalog. The model
// chooses ids from this list; it never supplies a URL, so nothing unvetted reaches a sheet.
const lessonPrefix: Record<string, string> = {
  'anatomy-and-physiology': 'anat',
  botany: 'bot',
  'chemistry-lab': 'chem',
  'designer-genes': 'gene',
  'disease-detectives': 'epi',
  forensics: 'for',
  'protein-modeling': 'prot',
  'water-quality': 'water',
};
export type SheetFigure = { id: string; title: string; alt: string; src: string; credit: string };

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}
const catalog = new Map<string, SheetFigure[]>();
const byId = new Map<string, SheetFigure>();
for (const [eventId, prefix] of Object.entries(lessonPrefix)) {
  const figures: SheetFigure[] = [];
  for (const f of lessonReferenceFigures) {
    if (!f.lessonId.startsWith(`${prefix}-`) || !f.src.startsWith('https://')) continue;
    // Ids depend only on the source address, so stored sheets survive catalog reordering.
    const id = `${prefix}-${hash(f.src)}`;
    if (byId.has(id)) continue;
    const figure = {
      id,
      title: f.title,
      alt: f.alt,
      src: f.src,
      credit: `${f.author}, ${f.license}`,
    };
    byId.set(id, figure);
    figures.push(figure);
  }
  catalog.set(eventId, figures);
}
export const sheetFigures = (eventId: string) => catalog.get(eventId) ?? [];
export const sheetFigure = (id: string) => byId.get(id);
