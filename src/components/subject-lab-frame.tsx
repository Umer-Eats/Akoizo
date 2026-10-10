'use client';
import { useState, type ReactNode } from 'react';
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
      <div
        className="subject-plot-scroll"
        role="region"
        aria-label={`${label} diagram viewer`}
        tabIndex={0}
      >
        <svg className="subject-plot" viewBox="0 0 640 340" role="img" aria-label={label}>
          {children}
        </svg>
      </div>
      <p className="subject-scroll-hint">
        Scroll the diagram sideways to inspect every label. You can focus the viewer and use the
        arrow keys.
      </p>
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
    [trials, setTrials] = useState<{ settings: string; result: string; prediction: string }[]>([]);
  return (
    <div className={`subject-explorer${preview ? ' subject-preview' : ''}`} data-subject={sim.lab}>
      <p className="subject-model-note">
        {preview ? 'EXPLANATORY DIAGRAM' : 'SYNTHETIC INVESTIGATION'} ·{' '}
        {sim.lab === 'cipher'
          ? 'Defined reversible cipher conventions'
          : 'Simplified teaching model; not observed field data'}
      </p>
      {children}
      {!preview && (
        <>
          <div className="lab-challenge">
            <strong>Lesson challenge</strong>
            <p>{sim.challenge}</p>
          </div>
          <label className="subject-note">
            Your prediction and reason
            <textarea
              aria-label="Your prediction and reason"
              rows={3}
              maxLength={3000}
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              placeholder="Predict what will change and name the mechanism before adjusting a control."
            />
          </label>
          <button
            className="button button-small button-glass"
            disabled={trials.length >= 6}
            onClick={() => setTrials((t) => [...t, { ...snapshot, prediction }])}
          >
            Record trial ({trials.length}/6)
          </button>
          {!!trials.length && (
            <section className="subject-notebook" aria-label="Subject lab trial notebook">
              <h4>Compare recorded trials</h4>
              <ol>
                {trials.map((trial, i) => (
                  <li key={i}>
                    <strong>Trial {i + 1}</strong>
                    <p>{trial.settings}</p>
                    <p>{trial.result}</p>
                    {trial.prediction && <p>Prediction: {trial.prediction}</p>}
                  </li>
                ))}
              </ol>
              <button className="button button-small button-glass" onClick={() => setTrials([])}>
                Clear trial notebook
              </button>
            </section>
          )}
          <label className="subject-note">
            Explain the evidence
            <textarea
              aria-label="Explain the evidence"
              rows={3}
              maxLength={4000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Compare trials. What supports your prediction? What alternative explanation or model limitation remains?"
            />
          </label>
          <p>
            <strong>Connect to the lesson:</strong> {sim.takeaway}
          </p>
          <small>
            Lab notes and trials last while this lesson is open. Practice answers save separately.
          </small>
        </>
      )}
    </div>
  );
}
