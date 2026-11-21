'use client';
// Event vocabulary on presentation slides: the lessons' term pop-up, plus emphasis. Each slide
// marks an event term once, where it first appears; the lesson's key terms get a highlighter mark,
// other glossary terms a bold dotted underline, and both show their definition on hover or focus.
import { createContext, useContext, useId, useMemo, useRef } from 'react';
import type { Lesson } from '@/lib/lessons';
import type { Slide } from '@/lib/presentation-types';
import { highlightTerms, mergeTerms } from '@/lib/lesson-format';

type Term = Lesson['keyTerms'][number];
type Marks = { byText: Map<string, Term[]>; key: Set<string> };

/** The event glossary (every lesson's key terms plus event vocabulary), from PresentationsView. */
export const SlideGlossary = createContext<Term[]>([]);

const SlideMarks = createContext<Marks | null>(null);

/** Deck emphasis: **bold**, ==highlight==, and the capitalized warnings NOT, NORMAL and ALL. */
export const EMPHASIS = /(\*\*[^*]+\*\*|==[^=]+==|\b(?:NOT|NORMAL|ALL)\b)/;

/**
 * The slide's reading text, in the order it is shown. Titles, card faces and answer choices are
 * left out: card faces are the terms themselves, and choices must not come with definitions.
 */
function slideTexts(slide: Slide): string[] {
  switch (slide.kind) {
    case 'title':
      return [slide.subtitle, ...slide.objectives];
    case 'bullets':
      return [...slide.bullets, ...(slide.callout ? [slide.callout] : [])];
    case 'figure':
      return [slide.caption, ...(slide.bullets ?? [])];
    case 'compare':
      return slide.rows.flat();
    case 'flow':
      return slide.steps.flatMap((step) => [step.label, step.detail]);
    case 'example':
      return [slide.problem, ...slide.steps, slide.conclusion];
    case 'summary':
      return slide.points;
    case 'cards':
      return [];
    default:
      return 'explanation' in slide ? [slide.explanation] : [];
  }
}

/** Which terms each text on the slide marks: each term once, where it first appears. */
export function slideMarks(slide: Slide, terms: Term[]) {
  const used = new Set<string>();
  const byText = new Map<string, Term[]>();
  for (const text of slideTexts(slide)) {
    // Words already set in **bold** or ==highlight== keep that emphasis and are not marked again.
    const plain = text
      .split(EMPHASIS)
      .filter((_, i) => i % 2 === 0)
      .join(' ');
    const found = highlightTerms(plain, terms, used).flatMap((part) => part.term ?? []);
    if (found.length)
      byText.set(
        text,
        terms.filter((t) => found.includes(t.term)),
      );
  }
  return byText;
}

/** Works out the slide's marks once, for every Rich text inside it. */
export function SlideTermsProvider({
  slide,
  lesson,
  children,
}: {
  slide: Slide;
  lesson?: Lesson;
  children: React.ReactNode;
}) {
  const glossary = useContext(SlideGlossary);
  const marks = useMemo(() => {
    const keyTerms = lesson?.keyTerms ?? [];
    return {
      byText: slideMarks(slide, mergeTerms(keyTerms, glossary)),
      key: new Set(keyTerms.map((t) => t.term)),
    };
  }, [slide, lesson, glossary]);
  return <SlideMarks value={marks}>{children}</SlideMarks>;
}

/**
 * A term with the lessons' definition pop-up. The pop-up opens in the top layer (popover), so the
 * slide's edges never clip it and it still shows in fullscreen.
 */
function SlideTerm({
  text,
  term,
  definition,
  keyTerm,
}: {
  text: string;
  term: string;
  definition: string;
  keyTerm: boolean;
}) {
  const id = useId();
  const anchor = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const show = () => {
    const box = tip.current;
    const word = anchor.current;
    if (!box || !word || typeof box.showPopover !== 'function') return;
    if (!box.matches(':popover-open')) box.showPopover();
    const at = word.getBoundingClientRect();
    const above = at.top - box.offsetHeight - 8;
    const left = at.left + at.width / 2 - box.offsetWidth / 2;
    box.style.top = `${above >= 8 ? above : at.bottom + 8}px`;
    box.style.left = `${Math.min(Math.max(8, left), window.innerWidth - box.offsetWidth - 8)}px`;
  };
  const hide = () => {
    if (tip.current?.matches(':popover-open')) tip.current.hidePopover();
  };
  return (
    <span
      ref={anchor}
      className={keyTerm ? 'pres-term pres-key-term' : 'pres-term'}
      tabIndex={0}
      aria-describedby={id}
      onPointerEnter={show}
      onPointerLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {text}
      <span ref={tip} id={id} role="tooltip" popover="manual" className="pres-term-tip">
        <strong>{term}</strong> {definition}
      </span>
    </span>
  );
}

/** One piece of deck emphasis: **bold**, ==highlight==, or a capitalized warning. */
function Emphasis({ part }: { part: string }) {
  if (part.startsWith('==')) return <mark className="pres-mark">{part.slice(2, -2)}</mark>;
  if (part.startsWith('**')) return <strong className="pres-em">{part.slice(2, -2)}</strong>;
  return <strong className="pres-em">{part}</strong>;
}

/**
 * Slide text with its emphasis drawn (**bold** and ==highlight== written in the deck, and the
 * capitalized warnings NOT, NORMAL and ALL) and its event terms marked in the plain words between.
 */
export function Rich({ text }: { text: string }) {
  const marks = useContext(SlideMarks);
  const terms = marks?.byText.get(text);
  const used = new Set<string>();
  // split() with a capturing group alternates plain text (even) and emphasis (odd).
  return (
    <>
      {text
        .split(EMPHASIS)
        .map((part, i) =>
          i % 2 ? (
            <Emphasis key={i} part={part} />
          ) : !terms ? (
            part
          ) : (
            highlightTerms(part, terms, used).map((piece, j) =>
              piece.term ? (
                <SlideTerm
                  key={`${i}-${j}`}
                  text={piece.text}
                  term={piece.term}
                  definition={piece.definition!}
                  keyTerm={marks!.key.has(piece.term)}
                />
              ) : (
                piece.text
              ),
            )
          ),
        )}
    </>
  );
}
