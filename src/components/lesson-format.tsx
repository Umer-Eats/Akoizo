'use client';
// Building blocks for the lesson layout: stage tabs, the section study layout (key idea,
// explanation, key relationship, apply-it steps, limits), inline key terms, the step-by-step
// worked example, the glossary and the "in this lesson" contents rail.
import { Fragment, createContext, useContext, useEffect, useId, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Check,
  ClipboardCheck,
  FlaskConical,
  Lightbulb,
  ListChecks,
  PanelRightClose,
  PanelRightOpen,
  PenLine,
  Sigma,
  Trophy,
} from 'lucide-react';
import type { Lesson } from '@/lib/lessons';
import { highlightTerms, type FormattedLine, type FormattedSection } from '@/lib/lesson-format';

export type LessonStage = 'learn' | 'practice' | 'labs' | 'checkpoint';
export const lessonStages: {
  id: LessonStage;
  label: string;
  hint: string;
  icon: typeof BookOpen;
}[] = [
  { id: 'learn', label: 'Learn', hint: 'Read and see it', icon: BookOpen },
  { id: 'practice', label: 'Practice', hint: 'Quick recall', icon: PenLine },
  { id: 'labs', label: 'Labs', hint: 'Test the ideas', icon: FlaskConical },
  { id: 'checkpoint', label: 'Checkpoint', hint: 'Show what you know', icon: ClipboardCheck },
];

export function StageNav({
  stage,
  onChange,
  done,
  counts,
}: {
  stage: LessonStage;
  onChange: (stage: LessonStage) => void;
  done: Record<LessonStage, boolean>;
  counts: Partial<Record<LessonStage, string>>;
}) {
  return (
    <nav className="lf-stages" aria-label="Lesson stages">
      <div role="tablist" aria-label="Lesson stages">
        {lessonStages.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`lesson-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={stage === item.id}
              aria-controls={`lesson-stage-${item.id}`}
              tabIndex={stage === item.id ? 0 : -1}
              data-done={done[item.id] || undefined}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => {
                const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
                if (!keys.includes(event.key)) return;
                event.preventDefault();
                const n = lessonStages.length;
                const next =
                  event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? n - 1
                      : (i + (event.key === 'ArrowRight' ? 1 : n - 1)) % n;
                onChange(lessonStages[next].id);
                document.getElementById(`lesson-tab-${lessonStages[next].id}`)?.focus();
              }}
            >
              <span className="lf-stage-icon" aria-hidden="true">
                {done[item.id] ? <Check size={15} /> : <Icon size={15} />}
              </span>
              <span className="lf-stage-text">
                <strong>
                  <span className="lf-stage-num">{i + 1}</span> {item.label}
                </strong>
                <small>{counts[item.id] ?? item.hint}</small>
              </span>
              {done[item.id] && <span className="sr-only"> (done)</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** A key term, highlighted where it first appears; its definition shows on hover or focus. */
export function TermTip({
  text,
  term,
  definition,
}: {
  text: string;
  term: string;
  definition: string;
}) {
  const id = useId();
  return (
    <span className="lf-term" tabIndex={0} aria-describedby={id}>
      {text}
      <span role="tooltip" id={id} className="lf-term-tip">
        <strong>{term}</strong> {definition}
      </span>
    </span>
  );
}

/** Plain text with its event terms underlined (first appearance of each in this text). */
export function TermText({ text, terms }: { text: string; terms?: Lesson['keyTerms'] }) {
  if (!terms?.length) return <>{text}</>;
  return (
    <>
      {highlightTerms(text, terms, new Set()).map((part, i) =>
        part.term ? (
          <TermTip key={i} text={part.text} term={part.term} definition={part.definition!} />
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}

/** Which sentences Ako is teaching right now. */
export const AkoReading = createContext<{ anchorId?: string; highlightIds: string[] }>({
  highlightIds: [],
});

/** One sentence, addressable by Ako (`ako-line-<id>`), with its key terms marked. */
function Sentence({ line }: { line: FormattedLine }) {
  const { anchorId, highlightIds } = useContext(AkoReading);
  const trimmed = line.text.trimEnd().length;
  const parts: { text: string; term?: string; definition?: string }[] = [];
  let at = 0;
  for (const segment of line.segments) {
    // Trailing whitespace stays outside the span so highlights end at the full stop.
    const text = segment.text.slice(0, Math.max(0, trimmed - at));
    at += segment.text.length;
    if (text) parts.push({ ...segment, text });
  }
  return (
    <>
      <span
        id={`ako-line-${line.id}`}
        data-ako-sentence={line.id}
        aria-current={anchorId === line.id ? 'step' : undefined}
        className={`lesson-ako-sentence${highlightIds.includes(line.id) ? ' is-teaching' : ''}`}
      >
        {parts.map((part, i) =>
          part.term ? (
            <TermTip key={i} text={part.text} term={part.term} definition={part.definition!} />
          ) : (
            <Fragment key={i}>{part.text}</Fragment>
          ),
        )}
      </span>
      {line.text.slice(trimmed)}
    </>
  );
}

/** Renders a section as key idea → explanation → key relationship → apply it → limits. */
export function SectionContent({ section }: { section: FormattedSection }) {
  const many = (lines: FormattedLine[]) =>
    lines.length > 1 ? (
      <ul>
        {lines.map((line) => (
          <li key={line.id}>
            <Sentence line={line} />
          </li>
        ))}
      </ul>
    ) : (
      lines.map((line) => (
        <p key={line.id}>
          <Sentence line={line} />
        </p>
      ))
    );
  return (
    <>
      {section.lead && (
        <p className="lf-lead">
          <Sentence line={section.lead} />
        </p>
      )}
      {section.body.map((block) =>
        block.kind === 'formula' ? (
          <div key={block.line.id} className="lf-formula">
            <span className="lf-callout-label">
              <Sigma size={14} aria-hidden="true" /> Key relationship
            </span>
            <p>
              <Sentence line={block.line} />
            </p>
          </div>
        ) : (
          <p key={block.lines[0].id}>
            {block.lines.map((line) => (
              <Sentence key={line.id} line={line} />
            ))}
          </p>
        ),
      )}
      {(section.apply.length > 0 || section.exam.length > 0 || section.cautions.length > 0) && (
        <div className="lf-callouts">
          {section.apply.length > 0 && (
            <aside className="lf-callout lf-apply">
              <span className="lf-callout-label">
                <ListChecks size={14} aria-hidden="true" /> Apply it
              </span>
              {section.apply.length > 1 ? (
                <ol>
                  {section.apply.map((line) => (
                    <li key={line.id}>
                      <Sentence line={line} />
                    </li>
                  ))}
                </ol>
              ) : (
                <p>
                  <Sentence line={section.apply[0]} />
                </p>
              )}
            </aside>
          )}
          {section.exam.length > 0 && (
            <aside className="lf-callout lf-exam">
              <span className="lf-callout-label">
                <Trophy size={14} aria-hidden="true" /> On the test
              </span>
              {many(section.exam)}
            </aside>
          )}
          {section.cautions.length > 0 && (
            <aside className="lf-callout lf-caution">
              <span className="lf-callout-label">
                <AlertTriangle size={14} aria-hidden="true" /> Keep in mind
              </span>
              {many(section.cautions)}
            </aside>
          )}
        </div>
      )}
    </>
  );
}

/** Worked example revealed one step at a time, after the student tries it. */
export function WorkedExampleSteps({
  example,
  terms,
}: {
  example: Lesson['workedExample'];
  terms?: Lesson['keyTerms'];
}) {
  const [shown, setShown] = useState(0);
  const total = example.steps.length;
  const finished = shown > total;
  return (
    <section
      id="lesson-example"
      className="lesson-example lf-example"
      aria-labelledby="lf-example-title"
    >
      <p className="eyebrow">
        <Lightbulb size={14} aria-hidden="true" /> WORKED EXAMPLE
      </p>
      <h3 id="lf-example-title">{example.title}</h3>
      <p className="lf-example-problem">
        <TermText text={example.problem} terms={terms} />
      </p>
      {shown === 0 && (
        <p className="lf-example-try">Try it on paper first, then reveal one step at a time.</p>
      )}
      {shown > 0 && (
        <ol className="lf-example-steps" aria-live="polite">
          {example.steps.slice(0, Math.min(shown, total)).map((step, i) => (
            <li key={i}>
              <span className="lf-step-num">Step {i + 1}</span>
              <p>
                <TermText text={step} terms={terms} />
              </p>
            </li>
          ))}
        </ol>
      )}
      {finished && (
        <p className="example-conclusion lf-example-answer">
          <strong>Conclusion</strong> <TermText text={example.conclusion} terms={terms} />
        </p>
      )}
      <div className="lesson-actions">
        {!finished && (
          <button
            type="button"
            className="button button-small button-primary"
            onClick={() => setShown((n) => n + 1)}
          >
            {shown === 0
              ? 'Show the first step'
              : shown < total
                ? 'Show the next step'
                : 'Show the conclusion'}
          </button>
        )}
        {!finished && (
          <button
            type="button"
            className="button button-small button-glass"
            onClick={() => setShown(total + 1)}
          >
            Show the full solution
          </button>
        )}
        {shown > 0 && (
          <button
            type="button"
            className="button button-small button-glass"
            onClick={() => setShown(0)}
          >
            Hide steps
          </button>
        )}
        <span className="lf-example-count">
          {Math.min(shown, total)} of {total} steps
        </span>
      </div>
    </section>
  );
}

export function KeyTermsGrid({ terms }: { terms: Lesson['keyTerms'] }) {
  return (
    <dl className="lf-terms">
      {terms.map((term) => (
        <div key={term.term}>
          <dt>{term.term}</dt>
          <dd>{term.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "In this lesson" contents; highlights the section currently on screen. */
export function LessonToc({
  items,
  active,
  collapsed = false,
  onToggle,
}: {
  items: { id: string; label: string; number?: string }[];
  active: string;
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <nav className="lf-toc" aria-label="In this lesson">
      <div className="lf-toc-head">
        {!collapsed && <p className="lf-toc-title">In this lesson</p>}
        {onToggle && (
          <button
            type="button"
            className="lf-toc-toggle"
            aria-expanded={!collapsed}
            aria-controls="lf-toc-list"
            aria-label={collapsed ? 'Show lesson contents' : 'Hide lesson contents'}
            title={collapsed ? 'Show lesson contents' : 'Hide lesson contents'}
            onClick={onToggle}
          >
            {collapsed ? <PanelRightOpen size={15} /> : <PanelRightClose size={15} />}
          </button>
        )}
      </div>
      <ol id="lf-toc-list" hidden={collapsed}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ block: 'start' });
              }}
            >
              {item.number && <span>{item.number}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Tracks which of the given element ids is nearest the top of the viewport. */
export function useScrollSpy(ids: string[], enabled: boolean) {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');
  useEffect(() => {
    if (!enabled) return;
    const list = key.split('|');
    const update = () => {
      let current = list[0];
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 180) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [key, enabled]);
  return active;
}

export function StageFooter({
  label,
  detail,
  onNext,
}: {
  label: string;
  detail: string;
  onNext: () => void;
}) {
  return (
    <div className="lf-stage-footer">
      <p>{detail}</p>
      <button type="button" className="button button-primary" onClick={onNext}>
        {label} →
      </button>
    </div>
  );
}
