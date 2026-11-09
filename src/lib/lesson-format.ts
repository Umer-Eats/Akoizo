// Turns each lesson section's prose into a study layout: the key idea first, then the
// explanation, any key relationship (formula), the "apply it" instructions and the limits
// to keep in mind. Sentences keep their Ako line ids, so guided reading still highlights them.
import type { Lesson } from './lessons';

export type FormatLine = { id: string; sectionIndex: number; paragraphIndex: number; text: string };
export type Segment = { text: string; term?: string; definition?: string };
export type FormattedLine = FormatLine & { segments: Segment[] };
export type BodyBlock =
  { kind: 'text'; lines: FormattedLine[] } | { kind: 'formula'; line: FormattedLine };
export type FormattedSection = {
  lead: FormattedLine | null;
  body: BodyBlock[];
  apply: FormattedLine[];
  cautions: FormattedLine[];
  exam: FormattedLine[];
};

// Verbs that open an instruction ("Identify the reference frame…", "Check that…").
const IMPERATIVE = new Set(
  (
    'add apply ask assign begin calculate check choose cite classify combine compare confirm ' +
    'connect consider convert count describe determine distinguish divide document draw estimate ' +
    'evaluate examine explain find focus follow graph identify include inspect interpret justify ' +
    'keep label list locate look mark match measure multiply name note observe plot practice ' +
    'predict prefer read recognize record relate remember report separate show sketch sort ' +
    'specify start state subtract test think trace treat use verify watch write'
  ).split(' '),
);
const WARNING_START = /^(?:do not|don[’']t|never|avoid)\b/i;
const LIMIT =
  /\b(?:does not|do not|did not|is not|are not|was not|cannot|can not|should not|need not|must not|doesn[’']t|don[’']t|isn[’']t|aren[’']t|can[’']t|rather than|instead of|not (?:a|an|the|every|all|always|automatically|necessarily|merely|simply|only|proof|one|enough|guaranteed)|no single)\b/i;
const FORMULA = /[=≈∝]/;
const EXAM =
  /\b(?:competitions?|judges?|exams?|test questions?|on (?:a|the) test|tournaments?|event rules?)\b/i;
const MAX_CAUTIONS = 2;
const CHUNK = 3;

export function isInstruction(text: string) {
  // "Use a table…" is an instruction; "Uses of…" or "Records show…" are not (not in the set).
  const first =
    text
      .trim()
      .match(/^[A-Za-z]+(?=[\s,])/)?.[0]
      ?.toLowerCase() ?? '';
  return IMPERATIVE.has(first);
}
export function isCaution(text: string) {
  return WARNING_START.test(text.trim()) || LIMIT.test(text);
}
export function isExamTip(text: string) {
  return EXAM.test(text);
}
export function isFormula(text: string) {
  return FORMULA.test(text);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Search forms of a key term: "Residence time", "RR (relative risk)" → RR, relative risk. */
export function termPatterns(term: string) {
  const base = term.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  const inner = term.match(/\(([^)]+)\)/)?.[1]?.trim();
  return [...new Set([term.trim(), base, inner].filter((t): t is string => !!t && t.length >= 2))];
}

type Candidate = { pattern: RegExp; t: Lesson['keyTerms'][number] };
const compiled = new WeakMap<Lesson['keyTerms'], Candidate[]>();

/** Search patterns for a term list, longest form first, built once per list. */
function candidatesFor(terms: Lesson['keyTerms']) {
  let list = compiled.get(terms);
  if (!list) {
    list = terms
      .flatMap((t) =>
        [...termPatterns(t.term), ...(t.aliases ?? []).filter((a) => a.length >= 2)].map(
          (form) => ({ form, t }),
        ),
      )
      .sort((a, b) => b.form.length - a.form.length)
      .map(({ form, t }) => ({
        // Short forms are acronyms, so they only match in capitals.
        pattern: new RegExp(
          `(?<![\\w-])${escape(form)}(?:es|s)?(?![\\w-])`,
          form.length <= 3 ? '' : 'i',
        ),
        t,
      }));
    compiled.set(terms, list);
  }
  return list;
}

/**
 * One list of terms: the lesson's key terms first, then the event glossary. A repeated term
 * keeps the first definition but gains the later entry's extra word forms.
 */
export function mergeTerms(...lists: (Lesson['keyTerms'] | undefined)[]) {
  const byKey = new Map<string, Lesson['keyTerms'][number]>();
  for (const t of lists.flatMap((list) => list ?? [])) {
    const key = t.term.trim().toLowerCase();
    const first = byKey.get(key);
    if (!first) byKey.set(key, t);
    else if (t.aliases?.length)
      byKey.set(key, { ...first, aliases: [...new Set([...(first.aliases ?? []), ...t.aliases])] });
  }
  return [...byKey.values()];
}

/** Marks the first appearance of each term; `used` carries across the lines that share it. */
export function highlightTerms(
  text: string,
  terms: Lesson['keyTerms'],
  used: Set<string>,
): Segment[] {
  const marks: { start: number; end: number; term: string; definition: string }[] = [];
  for (const { pattern, t } of candidatesFor(terms)) {
    if (used.has(t.term)) continue;
    const match = pattern.exec(text);
    if (!match) continue;
    const start = match.index,
      end = start + match[0].length;
    if (marks.some((m) => start < m.end && end > m.start)) continue;
    marks.push({ start, end, term: t.term, definition: t.definition });
    used.add(t.term);
  }
  marks.sort((a, b) => a.start - b.start);
  const out: Segment[] = [];
  let at = 0;
  for (const m of marks) {
    if (m.start > at) out.push({ text: text.slice(at, m.start) });
    out.push({ text: text.slice(m.start, m.end), term: m.term, definition: m.definition });
    at = m.end;
  }
  if (at < text.length) out.push({ text: text.slice(at) });
  return out;
}

/** Classifies one section's sentences into the study layout. */
export function formatSection(
  lines: FormatLine[],
  terms: Lesson['keyTerms'] = [],
  used: Set<string> = new Set(),
): FormattedSection {
  if (!lines.length) return { lead: null, body: [], apply: [], cautions: [], exam: [] };
  const [first, ...rest] = lines;
  const examIds = new Set(
    rest.filter((l) => isExamTip(l.text) && !isFormula(l.text)).map((l) => l.id),
  );
  const cautionIds = new Set(
    rest
      .filter(
        (l) =>
          !examIds.has(l.id) &&
          !isFormula(l.text) &&
          (WARNING_START.test(l.text.trim()) || (isCaution(l.text) && !isInstruction(l.text))),
      )
      .slice(-MAX_CAUTIONS)
      .map((l) => l.id),
  );
  const applyIds = new Set(
    rest
      .filter(
        (l) =>
          !examIds.has(l.id) &&
          !cautionIds.has(l.id) &&
          !isFormula(l.text) &&
          isInstruction(l.text),
      )
      .map((l) => l.id),
  );
  // Highlight terms in reading order so the first appearance is the one marked.
  const fmt = new Map<string, FormattedLine>();
  for (const line of lines)
    fmt.set(line.id, { ...line, segments: highlightTerms(line.text, terms, used) });
  const body: BodyBlock[] = [];
  let chunk: FormattedLine[] = [];
  let paragraph = first.paragraphIndex;
  const flush = () => {
    if (chunk.length) body.push({ kind: 'text', lines: chunk });
    chunk = [];
  };
  for (const line of rest) {
    if (cautionIds.has(line.id) || applyIds.has(line.id) || examIds.has(line.id)) continue;
    const f = fmt.get(line.id)!;
    if (isFormula(line.text)) {
      flush();
      body.push({ kind: 'formula', line: f });
      continue;
    }
    if (line.paragraphIndex !== paragraph || chunk.length >= CHUNK) flush();
    paragraph = line.paragraphIndex;
    chunk.push(f);
  }
  flush();
  return {
    lead: fmt.get(first.id)!,
    body,
    apply: rest.filter((l) => applyIds.has(l.id)).map((l) => fmt.get(l.id)!),
    cautions: rest.filter((l) => cautionIds.has(l.id)).map((l) => fmt.get(l.id)!),
    exam: rest.filter((l) => examIds.has(l.id)).map((l) => fmt.get(l.id)!),
  };
}

/**
 * Formats every section of a lesson. Each key term and glossary term is marked at its first
 * appearance in every section, so a student who jumps to any section can still look it up.
 */
export function formatLesson(
  lesson: Pick<Lesson, 'sections' | 'keyTerms'>,
  lines: FormatLine[],
  glossary: Lesson['keyTerms'] = [],
) {
  const terms = mergeTerms(lesson.keyTerms, glossary);
  return lesson.sections.map((_, i) =>
    formatSection(
      lines.filter((l) => l.sectionIndex === i),
      terms,
      new Set(),
    ),
  );
}

/** One sentence that sums up the lesson, when the course supplies one. */
export function lessonBigIdea(lesson: Pick<Lesson, 'simulation'>) {
  return lesson.simulation.kind === 'investigation' ? '' : lesson.simulation.takeaway;
}
