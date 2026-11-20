'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Check, ChevronRight, RotateCcw, X } from 'lucide-react';
import type { Lesson } from '@/lib/lessons';
import type {
  ActivitySlide,
  InfoSlide,
  PhotoId,
  Slide,
  SlideAnswer,
} from '@/lib/presentation-types';
import { gradeSlide, slideOrder, validAnswer } from '@/lib/presentation-grading';
import type { LiveState } from '@/lib/presentation-service';
import { presentationPhotos } from '@/lib/presentation-photos';
import { PresentationDiagram } from './presentation-diagrams';

/** A student's in-progress answer, before it becomes a SlideAnswer. */
export type Draft = number | number[] | string | string[] | undefined;

export function initialDraft(slide: ActivitySlide): Draft {
  switch (slide.kind) {
    case 'mcq':
    case 'poll':
      return undefined;
    case 'multi':
      return [];
    case 'match':
      return slide.pairs.map(() => -1);
    case 'order':
      return slideOrder(slide.id, slide.items.length);
    case 'sort':
      return slide.items.map(() => -1);
    case 'numeric':
    case 'open':
      return '';
    case 'fill':
      return slide.blanks.map(() => '');
  }
}

/** The submittable answer for a finished draft, or null while it is incomplete. */
export function draftAnswer(slide: ActivitySlide, draft: Draft): SlideAnswer | null {
  if (slide.kind === 'numeric') {
    const text = typeof draft === 'string' ? draft.trim().replace(/,/g, '') : '';
    return text ? validAnswer(slide, Number(text)) : null;
  }
  if (slide.kind === 'fill' && Array.isArray(draft) && draft.some((word) => word === ''))
    return null;
  if (slide.kind === 'multi' && Array.isArray(draft) && !draft.length) return null;
  return validAnswer(slide, draft);
}

/** Restore a saved answer as a draft (numbers in a numeric box are shown as text). */
export const answerDraft = (slide: ActivitySlide, answer: unknown): Draft =>
  slide.kind === 'numeric' && typeof answer === 'number' ? String(answer) : (answer as Draft);

const sectionHeading = (lesson: Lesson | undefined, slide: Slide) =>
  slide.section === undefined ? null : lesson?.sections[slide.section]?.heading;

export function SlideFrame({
  slide,
  lesson,
  index,
  total,
  children,
}: {
  slide: Slide;
  lesson?: Lesson;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const heading = sectionHeading(lesson, slide);
  const ref = useRef<HTMLElement>(null);
  useFitToSlide(ref, slide.id);
  return (
    <div className="presentation-viewport">
      <article
        ref={ref}
        className={`presentation-slide slide-${slide.kind}`}
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${total}`}
      >
        <header className="presentation-slide-meta">
          <span>
            {index + 1} / {total}
          </span>
          {heading && <span className="presentation-section-chip">Lesson section · {heading}</span>}
          {kindLabel[slide.kind] && (
            <span className="presentation-kind-chip">{kindLabel[slide.kind]}</span>
          )}
        </header>
        <div className="presentation-slide-body">{children}</div>
      </article>
    </div>
  );
}

/** The smallest text scale a slide may shrink to before it scrolls instead. */
const MIN_FIT = 0.55;
/** Short slides grow up to this scale so every slide fills its page. */
const MAX_FIT = 1.35;

/**
 * Every slide is the same fixed 16:9 canvas, like a presentation slide. Everything inside is sized
 * in em, so this picks the largest scale at which the slide's content (including a revealed answer,
 * flipped card or feedback) fits the page: short slides grow, long ones shrink, and only beyond
 * MIN_FIT does the body scroll.
 */
function useFitToSlide(ref: React.RefObject<HTMLElement | null>, slideId: string) {
  useLayoutEffect(() => {
    const slide = ref.current;
    const body = slide?.querySelector<HTMLElement>('.presentation-slide-body');
    if (!slide || !body) return;
    const overflows = () => body.scrollHeight > body.clientHeight + 1;
    const fit = () => {
      body.style.overflowY = 'hidden';
      slide.style.setProperty('--fit', String(MAX_FIT));
      if (!overflows()) return;
      let lo = MIN_FIT;
      let hi = MAX_FIT;
      for (let step = 0; step < 7; step++) {
        const mid = (lo + hi) / 2;
        slide.style.setProperty('--fit', String(mid));
        if (overflows()) hi = mid;
        else lo = mid;
      }
      slide.style.setProperty('--fit', String(lo));
      if (overflows()) body.style.overflowY = 'auto';
    };
    fit();
    let frame = 0;
    const refit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const resize = new ResizeObserver(refit);
    resize.observe(slide);
    const changes = new MutationObserver(refit);
    changes.observe(body, { childList: true, subtree: true, characterData: true });
    body.addEventListener('load', refit, true);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      changes.disconnect();
      body.removeEventListener('load', refit, true);
    };
  }, [ref, slideId]);
}

/** A real photograph or satellite image, credited to its source. */
function Photo({ id }: { id: PhotoId }) {
  const photo = presentationPhotos[id];
  return (
    <figure className="presentation-photo">
      <img
        src={`/presentations/${photo.file}`}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
      />
      <figcaption>
        {photo.caption}{' '}
        <a href={photo.source} target="_blank" rel="noreferrer">
          {photo.credit}
        </a>
      </figcaption>
    </figure>
  );
}

const kindLabel: Partial<Record<Slide['kind'], string>> = {
  mcq: 'Quick check',
  multi: 'Select all that apply',
  match: 'Matching',
  order: 'Put in order',
  sort: 'Sort it',
  numeric: 'Calculate',
  fill: 'Fill in the blanks',
  poll: 'Poll',
  open: 'Your thinking',
  cards: 'Flashcards',
  example: 'Worked example',
};

function FlipCards({ cards }: { cards: { front: string; back: string }[] }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  return (
    <div className="presentation-cards">
      {cards.map((card, i) => (
        <button
          key={card.front}
          className="presentation-card"
          aria-pressed={flipped.has(i)}
          onClick={() =>
            setFlipped((prev) => {
              const next = new Set(prev);
              if (next.has(i)) next.delete(i);
              else next.add(i);
              return next;
            })
          }
        >
          <span className="presentation-card-inner">
            <strong>{flipped.has(i) ? card.back : card.front}</strong>
            <small>{flipped.has(i) ? card.front : 'Tap to see the definition'}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

function StepReveal({ slide }: { slide: Extract<InfoSlide, { kind: 'example' }> }) {
  const [shown, setShown] = useState(0);
  return (
    <div className="presentation-example">
      <p className="presentation-problem">{slide.problem}</p>
      <ol>
        {slide.steps.slice(0, shown).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {shown < slide.steps.length ? (
        <button className="button button-small" onClick={() => setShown((n) => n + 1)}>
          Reveal step {shown + 1} <ChevronRight size={14} />
        </button>
      ) : (
        <p className="presentation-conclusion">
          <Check size={16} aria-hidden="true" /> {slide.conclusion}
        </p>
      )}
    </div>
  );
}

export function InfoSlideBody({ slide }: { slide: InfoSlide }) {
  switch (slide.kind) {
    case 'title':
      return (
        <div className={`presentation-title-slide${slide.image ? ' presentation-split' : ''}`}>
          <div>
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <h3>By the end you will be able to…</h3>
            <ul className="presentation-objectives">
              {slide.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </div>
          {slide.image && <Photo id={slide.image} />}
        </div>
      );
    case 'bullets': {
      const side = slide.image ? (
        <Photo id={slide.image} />
      ) : slide.diagram ? (
        <PresentationDiagram id={slide.diagram} />
      ) : null;
      return (
        <>
          <h2>{slide.title}</h2>
          <div className={side ? 'presentation-split' : 'presentation-text'}>
            <div className="presentation-split-text">
              <ul className="presentation-bullets">
                {slide.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {slide.callout && <p className="presentation-callout">{slide.callout}</p>}
            </div>
            {side}
          </div>
        </>
      );
    }
    case 'diagram':
      return (
        <>
          <h2>{slide.title}</h2>
          <PresentationDiagram id={slide.diagram} />
          <p className="presentation-caption">{slide.caption}</p>
          {slide.bullets && (
            <ul className="presentation-bullets">
              {slide.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </>
      );
    case 'compare':
      return (
        <>
          <h2>{slide.title}</h2>
          <div className="table-wrap">
            <table className="presentation-table">
              <thead>
                <tr>
                  {slide.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    case 'flow':
      return (
        <>
          <h2>{slide.title}</h2>
          <ol className="presentation-flow">
            {slide.steps.map((step) => (
              <li key={step.label}>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
        </>
      );
    case 'cards':
      return (
        <>
          <h2>{slide.title}</h2>
          <FlipCards cards={slide.cards} />
        </>
      );
    case 'example':
      return (
        <>
          <h2>{slide.title}</h2>
          <StepReveal slide={slide} />
        </>
      );
    case 'summary':
      return (
        <>
          <h2>{slide.title}</h2>
          <ul className="presentation-summary">
            {slide.points.map((point) => (
              <li key={point}>
                <Check size={18} aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
        </>
      );
  }
}

const mark = (ok: boolean) =>
  ok ? (
    <Check size={16} aria-label="correct" className="mark-right" />
  ) : (
    <X size={16} aria-label="incorrect" className="mark-wrong" />
  );

/**
 * One activity. `locked` stops edits (answer checked or submitted and revealed); `reveal` shows
 * the key and explanation; `tally` shows the room's responses in a live session.
 */
export function ActivityBody({
  slide,
  draft,
  setDraft,
  locked,
  reveal,
  tally,
}: {
  slide: ActivitySlide;
  draft: Draft;
  setDraft: (draft: Draft) => void;
  locked: boolean;
  reveal: boolean;
  tally?: LiveState['tally'];
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answer = reveal ? draftAnswer(slide, draft) : null;
  const result = answer !== null && reveal ? gradeSlide(slide, answer) : null;
  const total = tally?.answered ?? 0;
  const share = (i: number) =>
    tally?.options && total ? Math.round((tally.options[i] / total) * 100) : null;

  let body: React.ReactNode;
  switch (slide.kind) {
    case 'mcq':
    case 'poll':
    case 'multi': {
      const multi = slide.kind === 'multi';
      const chosen = (i: number) => (multi ? ((draft as number[]) ?? []).includes(i) : draft === i);
      const correct = (i: number) =>
        slide.kind === 'mcq'
          ? slide.answer === i
          : slide.kind === 'multi'
            ? slide.answers.includes(i)
            : false;
      body = (
        <div
          className="presentation-options"
          role={multi ? 'group' : 'radiogroup'}
          aria-label="Answer choices"
        >
          {slide.options.map((option, i) => {
            const state =
              reveal && slide.kind !== 'poll'
                ? correct(i)
                  ? 'right'
                  : chosen(i)
                    ? 'wrong'
                    : ''
                : '';
            const percent = share(i);
            return (
              <button
                key={option}
                role={multi ? 'checkbox' : 'radio'}
                aria-checked={chosen(i)}
                className={`presentation-option ${state}`}
                disabled={locked}
                onClick={() =>
                  setDraft(
                    multi
                      ? chosen(i)
                        ? (draft as number[]).filter((v) => v !== i)
                        : [...((draft as number[]) ?? []), i]
                      : i,
                  )
                }
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span>{option}</span>
                {percent !== null && (reveal || slide.kind === 'poll') && (
                  <span className="option-tally" style={{ ['--share' as string]: `${percent}%` }}>
                    {percent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      );
      break;
    }
    case 'match': {
      const links = (draft as number[]) ?? slide.pairs.map(() => -1);
      const rights = slideOrder(`${slide.id}:r`, slide.pairs.length);
      const linkOf = (right: number) => links.indexOf(right);
      body = (
        <div className="presentation-match">
          <p className="presentation-hint">
            {locked
              ? 'Your pairs'
              : 'Choose a term, then the description it matches. Choose a pair again to undo it.'}
          </p>
          <div className="match-columns">
            <ol className="match-left">
              {slide.pairs.map(([left], i) => (
                <li key={left}>
                  <button
                    className={`match-item${picked === i ? ' picked' : ''}${links[i] >= 0 ? ' linked' : ''}`}
                    disabled={locked}
                    aria-pressed={picked === i}
                    onClick={() => {
                      if (links[i] >= 0) {
                        setDraft(links.map((v, j) => (j === i ? -1 : v)));
                        setPicked(i);
                      } else setPicked(picked === i ? null : i);
                    }}
                  >
                    <span className="match-badge">{i + 1}</span>
                    {left}
                    {reveal && mark(links[i] === i)}
                  </button>
                </li>
              ))}
            </ol>
            <ul className="match-right">
              {rights.map((right) => {
                const owner = linkOf(right);
                return (
                  <li key={right}>
                    <button
                      className={`match-item${owner >= 0 ? ' linked' : ''}`}
                      disabled={locked || (picked === null && owner < 0)}
                      onClick={() => {
                        if (picked === null) {
                          if (owner >= 0) setDraft(links.map((v, j) => (j === owner ? -1 : v)));
                          return;
                        }
                        setDraft(
                          links.map((v, j) => (j === picked ? right : v === right ? -1 : v)),
                        );
                        setPicked(null);
                      }}
                    >
                      <span className="match-badge">{owner >= 0 ? owner + 1 : '·'}</span>
                      {slide.pairs[right][1]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {reveal && result && !result.correct && (
            <ul className="presentation-key">
              {slide.pairs.map(([left, right]) => (
                <li key={left}>
                  <strong>{left}</strong> → {right}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
      break;
    }
    case 'order': {
      const arrangement = (draft as number[]) ?? slideOrder(slide.id, slide.items.length);
      const move = (from: number, to: number) => {
        const next = [...arrangement];
        [next[from], next[to]] = [next[to], next[from]];
        setDraft(next);
      };
      body = (
        <>
          <ol className="presentation-order">
            {arrangement.map((item, position) => (
              <li key={item} className={reveal ? (item === position ? 'right' : 'wrong') : ''}>
                <span className="order-index">{position + 1}</span>
                <span>{slide.items[item]}</span>
                {!locked && (
                  <span className="order-controls">
                    <button
                      aria-label={`Move “${slide.items[item]}” up`}
                      disabled={position === 0}
                      onClick={() => move(position, position - 1)}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      aria-label={`Move “${slide.items[item]}” down`}
                      disabled={position === arrangement.length - 1}
                      onClick={() => move(position, position + 1)}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </span>
                )}
                {reveal && mark(item === position)}
              </li>
            ))}
          </ol>
          {reveal && result && !result.correct && (
            <ol className="presentation-key">
              {slide.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          )}
        </>
      );
      break;
    }
    case 'sort': {
      const bins = (draft as number[]) ?? slide.items.map(() => -1);
      const order = slideOrder(slide.id, slide.items.length);
      body = (
        <div className="presentation-sort">
          {order.map((i) => {
            const [text, key] = slide.items[i];
            return (
              <div
                key={text}
                className={`sort-row${reveal ? (bins[i] === key ? ' right' : ' wrong') : ''}`}
              >
                <span className="sort-text">
                  {text}
                  {reveal && bins[i] !== key && <small>→ {slide.bins[key]}</small>}
                </span>
                <span className="sort-bins" role="radiogroup" aria-label={`Category for ${text}`}>
                  {slide.bins.map((bin, b) => (
                    <button
                      key={bin}
                      role="radio"
                      aria-checked={bins[i] === b}
                      disabled={locked}
                      onClick={() => setDraft(bins.map((v, j) => (j === i ? b : v)))}
                    >
                      {bin}
                    </button>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      );
      break;
    }
    case 'numeric':
      body = (
        <div className="presentation-numeric">
          <label>
            Your answer
            <span>
              <input
                inputMode="decimal"
                value={(draft as string) ?? ''}
                disabled={locked}
                onChange={(event) => setDraft(event.target.value)}
                aria-label="Numeric answer"
              />
              {slide.unit && <span className="numeric-unit">{slide.unit}</span>}
            </span>
          </label>
          {reveal && (
            <p className={result?.correct ? 'right' : 'wrong'}>
              {mark(!!result?.correct)} Answer: {slide.answer.toLocaleString()} {slide.unit ?? ''}
            </p>
          )}
        </div>
      );
      break;
    case 'fill': {
      const words = (draft as string[]) ?? slide.blanks.map(() => '');
      const bank = slideOrder(slide.id, slide.blanks.length + slide.distractors.length).map(
        (i) => [...slide.blanks, ...slide.distractors][i],
      );
      const parts = slide.text.split(/\{(\d+)\}/);
      body = (
        <div className="presentation-fill">
          <p className="fill-text">
            {parts.map((part, i) =>
              i % 2 === 0 ? (
                <span key={i}>{part}</span>
              ) : (
                <button
                  key={i}
                  className={`fill-blank${reveal ? (words[+part] === slide.blanks[+part] ? ' right' : ' wrong') : ''}`}
                  disabled={locked || !words[+part]}
                  aria-label={
                    words[+part]
                      ? `Blank ${+part + 1}: ${words[+part]}. Choose to clear.`
                      : `Blank ${+part + 1}, empty`
                  }
                  onClick={() => setDraft(words.map((w, j) => (j === +part ? '' : w)))}
                >
                  {words[+part] || '____'}
                  {reveal && words[+part] !== slide.blanks[+part] && (
                    <small> ({slide.blanks[+part]})</small>
                  )}
                </button>
              ),
            )}
          </p>
          {!locked && (
            <div className="fill-bank" role="group" aria-label="Word bank">
              {bank.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  disabled={words.includes(word) || !words.includes('')}
                  onClick={() => {
                    const empty = words.indexOf('');
                    if (empty >= 0) setDraft(words.map((w, j) => (j === empty ? word : w)));
                  }}
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>
      );
      break;
    }
    case 'open':
      body = (
        <div className="presentation-open">
          <textarea
            value={(draft as string) ?? ''}
            disabled={locked}
            maxLength={2000}
            rows={4}
            aria-label="Your response"
            placeholder="Type your response…"
            onChange={(event) => setDraft(event.target.value)}
          />
          {reveal && (
            <p className="presentation-callout">
              <strong>Model answer:</strong> {slide.model}
            </p>
          )}
          {tally && tally.responses.length > 0 && (
            <div className="presentation-responses">
              <h3>Class responses</h3>
              <ul>
                {tally.responses.map((response) => (
                  <li key={response.name + response.text}>
                    <strong>{response.name}</strong> {response.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
      break;
  }
  return (
    <>
      <h2 className="presentation-activity-prompt">{slide.prompt}</h2>
      {body}
      {reveal && 'explanation' in slide && (
        <p className={`presentation-feedback ${result?.correct ? 'right' : 'wrong'}`} role="status">
          {result
            ? result.correct
              ? 'Correct! '
              : result.earned > 0
                ? `Partly right (${Math.round(result.earned * 100)}%). `
                : 'Not quite. '
            : ''}
          {slide.explanation}
        </p>
      )}
      {tally && total > 0 && slide.kind !== 'poll' && slide.kind !== 'open' && reveal && (
        <p className="presentation-room">
          Room: {tally.correct} of {total} fully correct · average {Math.round(tally.average * 100)}
          %
        </p>
      )}
    </>
  );
}

/** Self-paced activity: answer, check, and retry if wrong. */
export function SoloActivity({
  slide,
  saved,
  onAnswer,
}: {
  slide: ActivitySlide;
  saved: unknown;
  onAnswer: (answer: SlideAnswer | null) => void;
}) {
  const checked = saved !== undefined;
  const [draft, setDraft] = useState<Draft>(
    checked ? answerDraft(slide, saved) : initialDraft(slide),
  );
  const ready = draftAnswer(slide, draft);
  return (
    <>
      <ActivityBody
        slide={slide}
        draft={draft}
        setDraft={setDraft}
        locked={checked}
        reveal={checked}
      />
      <div className="presentation-activity-actions">
        {checked ? (
          <button
            className="text-link"
            onClick={() => {
              onAnswer(null);
              setDraft(initialDraft(slide));
            }}
          >
            <RotateCcw size={14} /> Try again
          </button>
        ) : (
          <button
            className="button button-primary"
            disabled={ready === null}
            onClick={() => onAnswer(ready)}
          >
            {slide.kind === 'poll' || slide.kind === 'open' ? 'Submit' : 'Check answer'}
          </button>
        )}
      </div>
    </>
  );
}
