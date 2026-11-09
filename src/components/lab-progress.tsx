'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import './lab-steps.css';

/** A lab's progress: goals reached plus a keyed answer right on the first try, if it has one. */
export type LabStatus = { score: number; maxScore: number; done: boolean };
export type LabGoal = { label: string; done: boolean; hint?: string };

const LabReport = createContext<((status: LabStatus) => void) | null>(null);
export const LabReportProvider = LabReport.Provider;

/** Goals latch: once reached, a goal stays reached until the lab is reset. */
export function useLatched(flags: boolean[], resetKey: unknown = 0) {
  const [latched, setLatched] = useState<boolean[]>(flags);
  const [key, setKey] = useState(resetKey);
  if (key !== resetKey) {
    setKey(resetKey);
    setLatched(flags);
  }
  const merged = flags.map((flag, i) => flag || !!latched[i]);
  const changed = merged.some((flag, i) => flag !== !!latched[i]);
  useEffect(() => {
    if (changed) setLatched(merged);
  });
  return merged;
}

/**
 * Reports a lab's goals to the Labs stage. `firstTry` is undefined when the lab has no keyed
 * question, null until it is answered, then whether the first answer was right.
 */
export function useLabReport(goals: LabGoal[], firstTry?: boolean | null) {
  const report = useContext(LabReport);
  const reached = goals.filter((goal) => goal.done).length;
  const score = reached + (firstTry ? 1 : 0);
  const maxScore = goals.length + (firstTry === undefined ? 0 : 1);
  const done = reached === goals.length && firstTry !== null;
  useEffect(() => {
    report?.({ score, maxScore, done });
  }, [report, score, maxScore, done]);
}

export function LabGoals({ goals }: { goals: LabGoal[] }) {
  const [hints, setHints] = useState<number[]>([]);
  const reached = goals.filter((goal) => goal.done).length;
  const complete = reached === goals.length;
  return (
    <div className="lab-goals" data-complete={complete}>
      <div className="lab-goals-head">
        <strong>{complete ? 'Lab complete' : 'Lab goals'}</strong>
        <span>
          {reached} of {goals.length} reached
        </span>
      </div>
      <div className="lab-goals-bar" aria-hidden="true">
        <span style={{ width: `${(reached / Math.max(1, goals.length)) * 100}%` }} />
      </div>
      <ol>
        {goals.map((goal, i) => (
          <li key={goal.label} data-done={goal.done}>
            <span className="lab-goal-mark" aria-hidden="true">
              {goal.done ? <Check size={13} strokeWidth={3} /> : i + 1}
            </span>
            <span>
              {goal.label}
              <span className="sr-only">{goal.done ? ' (done)' : ' (not done yet)'}</span>
              {goal.hint &&
                !goal.done &&
                (hints.includes(i) ? (
                  <small className="lab-goal-hint">Hint: {goal.hint}</small>
                ) : (
                  <button
                    type="button"
                    className="lab-goal-hint-button"
                    onClick={() => setHints((current) => [...current, i])}
                  >
                    Show a hint
                  </button>
                ))}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function LabStep({
  n,
  title,
  hint,
  done,
  children,
}: {
  n: number;
  title: string;
  hint?: ReactNode;
  done?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="lab-step" data-done={done || undefined} aria-label={`Step ${n}: ${title}`}>
      <header>
        <span className="lab-step-n" aria-hidden="true">
          {done ? <Check size={15} strokeWidth={3} /> : n}
        </span>
        <div>
          <h5>{title}</h5>
          {hint && <p>{hint}</p>}
        </div>
      </header>
      <div className="lab-step-body">{children}</div>
    </section>
  );
}

/** The task a lab sets, shown above its goals. */
export function LabTask({ children }: { children: ReactNode }) {
  return (
    <div className="lab-task">
      <span>Your task</span>
      <p>{children}</p>
    </div>
  );
}

export const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
