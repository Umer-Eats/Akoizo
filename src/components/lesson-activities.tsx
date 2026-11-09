'use client';
import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { ArrowDown, ArrowUp, Check, RotateCcw } from 'lucide-react';
import { useLessonDrag } from './use-lesson-drag';
import type { Lesson } from '@/lib/lessons';
import {
  solutionSequence,
  stableShuffle,
  termRounds,
  type QuickCheck,
  type SortActivity,
} from '@/lib/lesson-extras';
import './lesson-extras.css';

// One-question pause inside the reading. Feedback explains the idea rather than only marking.
export function InlineCheck({ check }: { check: QuickCheck }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <aside className="la-check" aria-label="Check your understanding">
      <p className="eyebrow">PAUSE AND CHECK</p>
      <p className="la-question">{check.q}</p>
      <div className="tl-options">
        {check.options.map((option, i) => (
          <button
            key={option}
            type="button"
            className="tl-option"
            aria-pressed={picked === i}
            data-state={
              picked === null
                ? undefined
                : i === check.correct
                  ? 'right'
                  : picked === i
                    ? 'wrong'
                    : undefined
            }
            onClick={() => setPicked(i)}
          >
            {option}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className="tl-feedback" role="status" data-correct={picked === check.correct}>
          <strong>
            {picked === check.correct ? 'Correct.' : 'Not quite — compare with the marked answer.'}
          </strong>
          <p>{check.why}</p>
        </div>
      )}
    </aside>
  );
}

// Draggable items are not <button>s (a native drag cannot start on one), so they take the
// button role and answer Enter/Space themselves.
function pressable(onPress: () => void, disabled = false) {
  return {
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled || undefined,
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      if (!disabled) onPress();
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) onPress();
    },
  } as const;
}

const POOL = -1;

/** Reports how many items were right on the first check; later retries are not recorded. */
type FirstTry = (score: number, maxScore: number) => void;

function useFirstTry(onFirstTry?: FirstTry) {
  const reported = useRef(false);
  return (score: number, maxScore: number) => {
    if (reported.current) return;
    reported.current = true;
    onFirstTry?.(score, maxScore);
  };
}

export function SortBoard({
  activity,
  lessonId,
  onFirstTry,
}: {
  activity: SortActivity;
  lessonId: string;
  onFirstTry?: FirstTry;
}) {
  const startDrag = useLessonDrag();
  const firstTry = useFirstTry(onFirstTry);
  const [order] = useState(() => stableShuffle(activity.items, lessonId));
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [dragged, setDragged] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const place = (item: number, bin: number) => {
    setPlaced((current) => {
      const next = { ...current };
      if (bin === POOL) delete next[item];
      else next[item] = bin;
      return next;
    });
    setChecked(false);
    setSelected(null);
    setDragged(null);
    setOver(null);
  };
  const stateOf = (i: number) =>
    !checked || placed[i] === undefined ? undefined : placed[i] === order[i][1] ? 'right' : 'wrong';
  // Drop zones: each category, plus the pool of unplaced cards.
  const dropZone = (target: number) => ({
    'data-over': over === target,
    onDragOver: (e: DragEvent) => {
      if (dragged === null) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOver(target);
    },
    onDragLeave: (e: DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(null);
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      if (dragged !== null) place(dragged, target);
    },
    onClick: () => {
      if (selected !== null) place(selected, target);
    },
  });
  const card = (i: number) => {
    const [text] = order[i];
    const state = stateOf(i);
    const locked = state === 'right';
    return (
      <li
        key={text}
        className="la-sort-card"
        data-state={state}
        data-dragging={dragged === i}
        aria-pressed={selected === i}
        draggable={!locked}
        onDragStart={(e) => {
          if (!startDrag(e, text)) return;
          setDragged(i);
        }}
        onDragEnd={() => {
          setDragged(null);
          setOver(null);
        }}
        {...pressable(() => setSelected(selected === i ? null : i), locked)}
      >
        <span>{text}</span>
        {state && (
          <span className="sr-only">
            {state === 'right' ? ' (correct)' : ' (incorrect, move this card)'}
          </span>
        )}
      </li>
    );
  };
  const unplaced = order.map((_, i) => i).filter((i) => placed[i] === undefined);
  const placedCount = order.length - unplaced.length;
  const right = order.filter(([, bin], i) => placed[i] === bin).length;
  return (
    <section
      className="la-card"
      aria-label={activity.title}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setSelected(null);
      }}
    >
      <p className="eyebrow">CLASSIFY THE EVIDENCE</p>
      <h4>{activity.title}</h4>
      <p className="tl-quiet">
        Drag each card into a category, or select a card and then a category. Check when every card
        is placed.
      </p>
      <div className="la-drop-bins" aria-label="Categories">
        {activity.bins.map((bin, b) => {
          const cards = order.map((_, i) => i).filter((i) => placed[i] === b);
          return (
            <div
              key={bin}
              className="la-drop-bin"
              data-ready={selected !== null && placed[selected] !== b}
              {...dropZone(b)}
            >
              <button
                type="button"
                className="la-bin-title"
                aria-disabled={selected === null}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selected !== null) place(selected, b);
                }}
              >
                {bin}
              </button>
              {cards.length > 0 && (
                <ul className="la-bin-cards" aria-label={`Cards in ${bin}`}>
                  {cards.map(card)}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {unplaced.length > 0 && (
        <ul className="la-sort" aria-label="Cards to place" {...dropZone(POOL)}>
          {unplaced.map(card)}
        </ul>
      )}
      <div className="lesson-actions">
        <button
          type="button"
          className="button button-small button-glass"
          disabled={unplaced.length > 0}
          onClick={() => {
            setChecked(true);
            firstTry(right, order.length);
          }}
        >
          Check classification
        </button>
        <button
          type="button"
          className="button button-small button-glass"
          onClick={() => {
            setPlaced({});
            setChecked(false);
            setSelected(null);
            setDragged(null);
            setOver(null);
          }}
        >
          <RotateCcw size={15} aria-hidden="true" /> Start over
        </button>
        <span aria-live="polite">
          {checked
            ? `${right} of ${order.length} correct${right === order.length ? ' — complete.' : '. Move the marked cards.'}`
            : `${placedCount} of ${order.length} placed`}
        </span>
      </div>
    </section>
  );
}

type MatchPick = { side: 'term' | 'def'; index: number };

// Two side-by-side columns: pair a term with its definition by selecting one of each, or by
// dragging a term onto a definition. Correct pairs lock in with a shared number.
function TermMatch({ lesson, onFirstTry }: { lesson: Lesson; onFirstTry?: FirstTry }) {
  const startDrag = useLessonDrag();
  const firstTry = useFirstTry(onFirstTry);
  const rounds = termRounds(lesson);
  // Terms paired wrongly at least once; a term counts as right only if matched first time.
  const missed = useRef(new Set<number>());
  // Each definition is identified by the index of the term it belongs to.
  const [definitions] = useState(() =>
    stableShuffle(
      rounds.map((_, i) => i),
      `${lesson.id}:definitions`,
    ),
  );
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [picked, setPicked] = useState<MatchPick | null>(null);
  const [miss, setMiss] = useState<{ term: number; def: number } | null>(null);
  const [misses, setMisses] = useState(0);
  const [dragged, setDragged] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  if (!rounds.length) return null;
  const termFor = (def: number) => {
    const entry = Object.entries(matched).find(([, d]) => d === def);
    return entry ? Number(entry[0]) : undefined;
  };
  const attempt = (term: number, def: number) => {
    setPicked(null);
    setDragged(null);
    setOver(null);
    // Compare definitions by text so two terms that share a definition both count.
    if (rounds[term].answer === rounds[def].answer) {
      const next = { ...matched, [term]: def };
      setMatched(next);
      setMiss(null);
      if (Object.keys(next).length === rounds.length)
        firstTry(rounds.length - missed.current.size, rounds.length);
    } else {
      missed.current.add(term);
      setMiss({ term, def });
      setMisses((n) => n + 1);
    }
  };
  const choose = (side: MatchPick['side'], index: number) => {
    setMiss(null);
    if (picked && picked.side !== side) {
      if (side === 'term') attempt(index, picked.index);
      else attempt(picked.index, index);
      return;
    }
    setPicked(picked?.side === side && picked.index === index ? null : { side, index });
  };
  const done = Object.keys(matched).length;
  return (
    <section
      className="la-card"
      aria-label="Match key terms"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setPicked(null);
      }}
    >
      <p className="eyebrow">VOCABULARY IN CONTEXT</p>
      <h4>Match each term to its meaning</h4>
      <p className="tl-quiet">
        Select a term, then its definition, or drag a term onto its definition.
      </p>
      <div className="la-match">
        <p className="la-match-head" aria-hidden="true">
          Term
        </p>
        <p className="la-match-head" aria-hidden="true">
          Definition
        </p>
        <ol className="la-terms" aria-label="Terms">
          {rounds.map((round, i) => {
            const isMatched = matched[i] !== undefined;
            return (
              <li
                key={round.term}
                className="la-match-item"
                data-state={isMatched ? 'right' : miss?.term === i ? 'wrong' : undefined}
                data-dragging={dragged === i}
                aria-pressed={picked?.side === 'term' && picked.index === i}
                draggable={!isMatched}
                onDragStart={(e) => {
                  if (!startDrag(e, round.term)) return;
                  setMiss(null);
                  setDragged(i);
                }}
                onDragEnd={() => {
                  setDragged(null);
                  setOver(null);
                }}
                {...pressable(() => choose('term', i), isMatched)}
              >
                {isMatched && <span className="la-match-num">{i + 1}</span>}
                <span>{round.term}</span>
              </li>
            );
          })}
        </ol>
        <ol className="la-defs" aria-label="Definitions">
          {definitions.map((d) => {
            const term = termFor(d);
            const isMatched = term !== undefined;
            return (
              <li
                key={d}
                className="la-match-item"
                data-state={isMatched ? 'right' : miss?.def === d ? 'wrong' : undefined}
                data-over={over === d}
                aria-pressed={picked?.side === 'def' && picked.index === d}
                onDragOver={(e) => {
                  if (dragged === null || isMatched) return;
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  setOver(d);
                }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragged !== null && !isMatched) attempt(dragged, d);
                }}
                {...pressable(() => choose('def', d), isMatched)}
              >
                {isMatched && <span className="la-match-num">{term + 1}</span>}
                <span>{rounds[d].answer}</span>
                {isMatched && <span className="sr-only"> (matched to {rounds[term].term})</span>}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="lesson-actions">
        <button
          type="button"
          className="button button-small button-glass"
          onClick={() => {
            setMatched({});
            setPicked(null);
            setMiss(null);
            setMisses(0);
            setDragged(null);
            setOver(null);
          }}
        >
          <RotateCcw size={15} aria-hidden="true" /> Start over
        </button>
        <span aria-live="polite">
          {miss
            ? 'Not a match. Try another pairing.'
            : done === rounds.length
              ? `All ${rounds.length} matched${misses ? ` with ${misses} ${misses === 1 ? 'miss' : 'misses'}` : ' on the first try'}.`
              : `${done} of ${rounds.length} matched`}
        </span>
      </div>
    </section>
  );
}

function SolutionOrder({ lesson, onFirstTry }: { lesson: Lesson; onFirstTry?: FirstTry }) {
  const startDrag = useLessonDrag();
  const firstTry = useFirstTry(onFirstTry);
  const sequence = solutionSequence(lesson);
  const [order, setOrder] = useState<string[]>(() => sequence?.scrambled ?? []);
  const [checked, setChecked] = useState(false);
  const [dragged, setDragged] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  if (!sequence) return null;
  const solved = order.every((step, i) => step === sequence.answer[i]);
  const move = (from: number, to: number) => {
    setChecked(false);
    setOrder((current) => {
      const next = [...current];
      const [step] = next.splice(from, 1);
      next.splice(to, 0, step);
      return next;
    });
  };
  return (
    <section className="la-card" aria-label="Rebuild the worked solution">
      <p className="eyebrow">REBUILD THE REASONING</p>
      <h4>Put the worked-example steps in a defensible order</h4>
      <p className="tl-quiet">{lesson.workedExample.problem}</p>
      <p className="tl-quiet">
        Drag a step onto another position, or use its up and down buttons. Follow the dependencies
        between steps.
      </p>
      <ol className="la-order">
        {order.map((step, i) => (
          <li
            key={step}
            draggable
            data-dragging={dragged === i}
            data-over={over === i}
            onDragStart={(e) => {
              if (!startDrag(e, step)) return;
              setDragged(i);
            }}
            onDragOver={(e) => {
              if (dragged !== null) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setOver(i);
              }
            }}
            onDragLeave={() => setOver(null)}
            onDragEnd={() => {
              setDragged(null);
              setOver(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragged !== null) move(dragged, i);
              setDragged(null);
              setOver(null);
            }}
            data-state={checked ? (step === sequence.answer[i] ? 'right' : 'wrong') : undefined}
          >
            <span>{step}</span>
            <div>
              <button
                type="button"
                className="la-move"
                aria-label={`Move step ${i + 1} up`}
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
              >
                <ArrowUp size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="la-move"
                aria-label={`Move step ${i + 1} down`}
                disabled={i === order.length - 1}
                onClick={() => move(i, i + 1)}
              >
                <ArrowDown size={15} aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="lesson-actions">
        <button
          type="button"
          className="button button-small button-glass"
          onClick={() => {
            setChecked(true);
            firstTry(order.filter((step, i) => step === sequence.answer[i]).length, order.length);
          }}
        >
          Check order
        </button>
        <span aria-live="polite">
          {checked &&
            (solved ? (
              <>
                <Check size={15} aria-hidden="true" /> The sequence matches the worked solution.
              </>
            ) : (
              'Some steps depend on a result that comes later. Move the marked steps.'
            ))}
        </span>
        <button
          type="button"
          className="button button-small button-glass"
          onClick={() => {
            setOrder(sequence.scrambled);
            setChecked(false);
            setDragged(null);
            setOver(null);
          }}
        >
          Reset order
        </button>
      </div>
    </section>
  );
}

type ActivityKey = 'sort' | 'order' | 'match';

/** The practice activities a lesson has, in the order they appear. */
export function practiceActivities(lesson: Lesson, sortActivity?: SortActivity): ActivityKey[] {
  return [
    ...(sortActivity ? (['sort'] as const) : []),
    ...(solutionSequence(lesson) ? (['order'] as const) : []),
    ...(termRounds(lesson).length ? (['match'] as const) : []),
  ];
}

export function LessonActivities({
  lesson,
  sortActivity,
  onComplete,
}: {
  lesson: Lesson;
  sortActivity?: SortActivity;
  /** Called once every activity has a first try, with the combined first-try accuracy. */
  onComplete?: (score: number, maxScore: number) => void;
}) {
  const activities = practiceActivities(lesson, sortActivity);
  const [results, setResults] = useState<Partial<Record<ActivityKey, [number, number]>>>({});
  const record = (key: ActivityKey) => (score: number, maxScore: number) =>
    setResults((current) => (current[key] ? current : { ...current, [key]: [score, maxScore] }));
  const finished = activities.filter((key) => results[key]);
  const score = finished.reduce((sum, key) => sum + results[key]![0], 0);
  const maxScore = finished.reduce((sum, key) => sum + results[key]![1], 0);
  const complete = finished.length === activities.length;
  const reported = useRef(false);
  useEffect(() => {
    if (!complete || reported.current) return;
    reported.current = true;
    onComplete?.(score, maxScore);
  }, [complete, score, maxScore, onComplete]);
  return (
    <section
      id="lesson-activities"
      className="lesson-activities"
      aria-labelledby="lesson-activities-title"
    >
      <p className="eyebrow">ACTIVE RECALL · FIRST TRY COUNTS</p>
      <h3 id="lesson-activities-title">Recall it before you test it</h3>
      <p>
        Short activities built from this lesson, with instant feedback. Your first try at each one
        is saved as practice accuracy for your instructor; retry as often as you like afterwards.
      </p>
      <p className="la-progress" role="status">
        {complete
          ? `Practice complete · first-try accuracy ${score}/${maxScore}${maxScore ? ` (${Math.round((score / maxScore) * 100)}%)` : ''}`
          : `${finished.length} of ${activities.length} activities tried`}
      </p>
      {sortActivity && (
        <SortBoard activity={sortActivity} lessonId={lesson.id} onFirstTry={record('sort')} />
      )}
      <SolutionOrder lesson={lesson} onFirstTry={record('order')} />
      <TermMatch lesson={lesson} onFirstTry={record('match')} />
    </section>
  );
}
