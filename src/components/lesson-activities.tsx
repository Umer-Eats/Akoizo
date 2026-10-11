'use client';
import { useState } from 'react';
import { ArrowDown, ArrowUp, Check, RotateCcw } from 'lucide-react';
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
            data-state={picked === null ? undefined : i === check.correct ? 'right' : picked === i ? 'wrong' : undefined}
            onClick={() => setPicked(i)}
          >
            {option}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className="tl-feedback" role="status" data-correct={picked === check.correct}>
          <strong>{picked === check.correct ? 'Correct.' : 'Not quite — compare with the marked answer.'}</strong>
          <p>{check.why}</p>
        </div>
      )}
    </aside>
  );
}

export function SortBoard({ activity, lessonId }: { activity: SortActivity; lessonId: string }) {
  const [order] = useState(() => stableShuffle(activity.items, lessonId));
  const [placed, setPlaced] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const complete = Object.keys(placed).length === order.length;
  const right = order.filter(([, bin], i) => placed[i] === bin).length;
  return (
    <section className="la-card" aria-label={activity.title}>
      <p className="eyebrow">CLASSIFY THE EVIDENCE</p>
      <h4>{activity.title}</h4>
      <p className="tl-quiet">
        Choose a category for every card, then check. Wrong cards stay open so you can revise.
      </p>
      <ul className="la-sort">
        {order.map(([text], i) => {
          const state = !checked ? undefined : placed[i] === order[i][1] ? 'right' : 'wrong';
          return (
            <li key={text} data-state={state}>
              <span>{text}</span>
              <div role="group" aria-label={`Category for: ${text}`}>
                {activity.bins.map((bin, b) => (
                  <button
                    key={bin}
                    type="button"
                    className="la-chip"
                    aria-pressed={placed[i] === b}
                    disabled={checked && state === 'right'}
                    onClick={() => {
                      setPlaced((current) => ({ ...current, [i]: b }));
                      setChecked(false);
                    }}
                  >
                    {bin}
                  </button>
                ))}
              </div>
              {state && (
                <span className="la-mark">
                  {state === 'right' ? 'Correct' : `Revise — not ${activity.bins[placed[i]]}`}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div className="lesson-actions">
        <button
          type="button"
          className="button button-small button-glass"
          disabled={!complete}
          onClick={() => setChecked(true)}
        >
          Check classification
        </button>
        <button
          type="button"
          className="button button-small button-glass"
          onClick={() => {
            setPlaced({});
            setChecked(false);
          }}
        >
          <RotateCcw size={15} aria-hidden="true" /> Start over
        </button>
        <span aria-live="polite">
          {checked
            ? `${right} of ${order.length} correct${right === order.length ? ' — complete.' : '. Revise the marked cards.'}`
            : `${Object.keys(placed).length} of ${order.length} placed`}
        </span>
      </div>
    </section>
  );
}

function TermMatch({ lesson }: { lesson: Lesson }) {
  const rounds = termRounds(lesson);
  const [picks, setPicks] = useState<Record<number, string>>({});
  if (!rounds.length) return null;
  const right = rounds.filter((r, i) => picks[i] === r.answer).length;
  return (
    <section className="la-card" aria-label="Match key terms">
      <p className="eyebrow">VOCABULARY IN CONTEXT</p>
      <h4>Match each term to its meaning</h4>
      <ol className="la-terms">
        {rounds.map((round, i) => (
          <li key={round.term}>
            <strong>{round.term}</strong>
            <div className="tl-options">
              {round.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="tl-option"
                  aria-pressed={picks[i] === option}
                  data-state={
                    picks[i] === undefined
                      ? undefined
                      : option === round.answer
                        ? 'right'
                        : picks[i] === option
                          ? 'wrong'
                          : undefined
                  }
                  onClick={() => setPicks((current) => ({ ...current, [i]: option }))}
                >
                  {option}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="tl-quiet">
        {Object.keys(picks).length} of {rounds.length} answered · {right} correct
      </p>
    </section>
  );
}

function SolutionOrder({ lesson }: { lesson: Lesson }) {
  const sequence = solutionSequence(lesson);
  const [order, setOrder] = useState<string[]>(() => sequence?.scrambled ?? []);
  const [checked, setChecked] = useState(false);
  if (!sequence) return null;
  const solved = order.every((step, i) => step === sequence.answer[i]);
  const move = (from: number, to: number) => {
    setChecked(false);
    setOrder((current) => {
      const next = [...current];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  };
  return (
    <section className="la-card" aria-label="Rebuild the worked solution">
      <p className="eyebrow">REBUILD THE REASONING</p>
      <h4>Put the worked-example steps in a defensible order</h4>
      <p className="tl-quiet">{lesson.workedExample.problem}</p>
      <ol className="la-order">
        {order.map((step, i) => (
          <li key={step} data-state={checked ? (step === sequence.answer[i] ? 'right' : 'wrong') : undefined}>
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
          onClick={() => setChecked(true)}
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
      </div>
    </section>
  );
}

export function LessonActivities({
  lesson,
  sortActivity,
}: {
  lesson: Lesson;
  sortActivity?: SortActivity;
}) {
  return (
    <section id="lesson-activities" className="lesson-activities" aria-labelledby="lesson-activities-title">
      <p className="eyebrow">ACTIVE RECALL · NOT GRADED</p>
      <h3 id="lesson-activities-title">Practice the ideas before the lab</h3>
      <p>
        Short activities built from this lesson. They give immediate feedback and reset when you
        leave the lesson; only the practice assignment below is saved.
      </p>
      {sortActivity && <SortBoard activity={sortActivity} lessonId={lesson.id} />}
      <SolutionOrder lesson={lesson} />
      <TermMatch lesson={lesson} />
    </section>
  );
}
