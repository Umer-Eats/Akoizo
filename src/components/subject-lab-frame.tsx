'use client';
import { useState, type ReactNode } from 'react';
import { DiagramViewer } from './diagram-viewer';
import { LabGoals, LabStep, LabTask, useLabReport, useLatched, wordCount } from './lab-progress';
import type { LessonSim } from '@/lib/lessons';
export type Explorer = Extract<LessonSim, { kind: 'explorer' }>;
export type Props = { sim: Explorer; preview?: boolean };
export const f = (n: number | null, digits = 3) =>
  n === null
    ? 'Undefined'
    : Number(n.toPrecision(digits)).toLocaleString('en-US', { maximumFractionDigits: 5 });
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  set,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  set: (v: number) => void;
}) {
  return (
    <label className="subject-slider">
      <span>{label}</span>
      <output>
        {f(value, 5)} {unit}
      </output>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
      />
    </label>
  );
}
export function Plot({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="subject-figure">
      <DiagramViewer label={label}>
        <svg className="subject-plot" viewBox="0 0 640 340" role="img" aria-label={label}>
          {children}
        </svg>
      </DiagramViewer>
    </div>
  );
}
export function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
/** How many settings differ between two snapshots ("a=1; b=2" style strings). */
function settingsChanged(a: string, b: string) {
  const left = a.split(/;\s*/),
    right = b.split(/;\s*/);
  const length = Math.max(left.length, right.length);
  return Array.from({ length }).filter((_, i) => left[i] !== right[i]).length;
}

type Trial = { settings: string; result: string };

export function LabFrame({
  sim,
  preview,
  snapshot,
  children,
}: {
  sim: Explorer;
  preview?: boolean;
  snapshot: { settings: string; result: string };
  children: ReactNode;
}) {
  const [prediction, setPrediction] = useState(''),
    [notes, setNotes] = useState(''),
    [trials, setTrials] = useState<Trial[]>([]),
    [revealed, setRevealed] = useState(false),
    [resetKey, setResetKey] = useState(0);
  const baseline = trials[0];
  const compared = trials.slice(1).some((t) => settingsChanged(baseline.settings, t.settings) > 0);
  const [predicted, recorded, varied, explained] = useLatched(
    [wordCount(prediction) >= 5, trials.length > 0, compared, revealed],
    resetKey,
  );
  const goals = [
    { label: 'Predict what will change, and why', done: predicted },
    { label: 'Record a baseline trial', done: recorded },
    { label: 'Change an input and record again', done: varied },
    { label: 'Explain the evidence and compare with the model', done: explained },
  ];
  useLabReport(preview ? [] : goals);
  const note =
    sim.lab === 'cipher'
      ? 'Defined reversible cipher conventions.'
      : 'Simplified teaching model with synthetic data, not observed field data.';
  if (preview)
    return (
      <div className="subject-explorer subject-preview" data-subject={sim.lab}>
        <p className="subject-model-note">EXPLANATORY DIAGRAM · {note}</p>
        {children}
      </div>
    );
  const sameAsLast = trials.at(-1)?.settings === snapshot.settings;
  return (
    <div className="subject-explorer lab-guided" data-subject={sim.lab}>
      <LabTask>{sim.challenge}</LabTask>
      <LabGoals goals={goals} />
      <LabStep
        n={1}
        title="Predict"
        hint="Before you touch a control, write what you expect to happen and the reason."
        done={predicted}
      >
        <label className="subject-note">
          <span className="sr-only">Your prediction and reason</span>
          <textarea
            aria-label="Your prediction and reason"
            rows={2}
            maxLength={3000}
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            placeholder="I predict … because …"
          />
        </label>
      </LabStep>
      <LabStep
        n={2}
        title="Experiment"
        hint="Record a baseline first. Then change one input at a time and record each new trial."
        done={recorded && varied}
      >
        <div className="subject-bench">{children}</div>
        <p className="lab-now" aria-live="polite">
          <strong>Current inputs:</strong> {snapshot.settings}
          <br />
          <strong>Output:</strong> {snapshot.result}
        </p>
        <div className="lab-actions">
          <button
            type="button"
            className="button button-small button-primary"
            disabled={trials.length >= 8 || sameAsLast}
            onClick={() => setTrials((t) => [...t, snapshot])}
          >
            {trials.length ? 'Record this trial' : 'Record baseline'} ({trials.length}/8)
          </button>
          <span>
            {sameAsLast
              ? 'Change an input before recording another trial.'
              : trials.length >= 8
                ? 'Notebook full. Clear it to record more.'
                : ''}
          </span>
        </div>
        {!!trials.length && (
          <section aria-label="Recorded trials" className="lab-trial-log">
            <ol className="lab-trials">
              {trials.map((trial, i) => {
                const changed = i ? settingsChanged(baseline.settings, trial.settings) : 0;
                return (
                  <li key={i}>
                    <strong>{i ? `Trial ${i + 1}` : 'Trial 1 · baseline'}</strong>
                    <p>{trial.settings}</p>
                    <p>→ {trial.result}</p>
                    {i > 0 && (
                      <small data-fair={changed === 1}>
                        {changed === 1
                          ? 'One input changed from the baseline: a fair comparison.'
                          : `${changed} inputs changed from the baseline. Change one at a time to know which caused the result.`}
                      </small>
                    )}
                  </li>
                );
              })}
            </ol>
            <button
              type="button"
              className="button button-small button-glass"
              onClick={() => setTrials([])}
            >
              Clear trials
            </button>
          </section>
        )}
      </LabStep>
      <LabStep
        n={3}
        title="Explain"
        hint="Use your recorded trials: what changed, by how much, and was your prediction right?"
        done={explained}
      >
        <label className="subject-note">
          <span className="sr-only">Explain the evidence</span>
          <textarea
            aria-label="Explain the evidence"
            rows={3}
            maxLength={4000}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="When I changed …, the output … This supports my prediction because …"
          />
        </label>
        <div className="lab-actions">
          <button
            type="button"
            className="button button-small button-primary"
            disabled={revealed || trials.length < 2 || wordCount(notes) < 8}
            onClick={() => setRevealed(true)}
          >
            Compare with the model
          </button>
          {!revealed && (
            <span>
              {trials.length < 2
                ? 'Record at least two trials first.'
                : wordCount(notes) < 8
                  ? 'Write at least one full sentence first.'
                  : ''}
            </span>
          )}
          <button
            type="button"
            className="button button-small button-glass"
            onClick={() => {
              setPrediction('');
              setNotes('');
              setTrials([]);
              setRevealed(false);
              setResetKey((k) => k + 1);
            }}
          >
            Start the lab over
          </button>
        </div>
        {revealed && (
          <div className="lab-reveal" role="status">
            <strong>What the model shows</strong>
            <p>{sim.takeaway}</p>
          </div>
        )}
      </LabStep>
      <p className="subject-model-note">{note} Notes and trials last while this lesson is open.</p>
    </div>
  );
}
