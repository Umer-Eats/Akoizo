import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  calculateModel,
  modelControls,
  modelDefaults,
  type ModelId,
  type ModelResult,
} from '@/lib/lesson-models';
import { experimentPresets } from '@/lib/lesson-experiments';
import { chartControlKey, teachingMetric } from './lesson-atlas';
import './lesson-experiments.css';

export function ExperimentControls({
  model,
  values,
  setValues,
}: {
  model: ModelId;
  values: Record<string, number>;
  setValues: Dispatch<SetStateAction<Record<string, number>>>;
}) {
  const [preset, setPreset] = useState(0),
    [prediction, setPrediction] = useState(''),
    [feedback, setFeedback] = useState(''),
    [running, setRunning] = useState(false);
  const control = modelControls[model].find((c) => c.key === chartControlKey[model])!;
  const metricIndex = teachingMetric[model] ?? 0;
  const metric = calculateModel(model, values).metrics[metricIndex];
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () =>
        setValues((current) => ({
          ...current,
          [control.key]: Math.min(
            control.max,
            Number((current[control.key] + control.step).toFixed(3)),
          ),
        })),
      350,
    );
    return () => clearInterval(timer);
  }, [running, control, setValues]);
  useEffect(() => {
    if (values[control.key] >= control.max) setRunning(false);
  }, [values, control]);
  return (
    <div className="experiment-controls">
      <div>
        <p className="eyebrow">PREDICT → RUN → EXPLAIN</p>
        <h4>Test a scenario</h4>
        <p>
          Predict the change in <strong>{metric.label.toLowerCase()}</strong> relative to your
          current settings.
        </p>
      </div>
      <div className="experiment-presets">
        {experimentPresets[model].map((scenario, i) => (
          <button
            className="experiment-preset"
            key={scenario.title}
            aria-pressed={preset === i}
            onClick={() => {
              setPreset(i);
              setFeedback('');
            }}
          >
            {scenario.title}
          </button>
        ))}
      </div>
      <div className="experiment-scenario-inputs">
        {Object.entries({
          ...modelDefaults(model),
          ...experimentPresets[model][preset].inputs,
        }).map(([key, n]) => {
          const c = modelControls[model].find((c) => c.key === key)!;
          return (
            <span key={key}>
              {c.label}:{' '}
              <strong>
                {n} {c.unit}
              </strong>
            </span>
          );
        })}
      </div>
      <div className="experiment-prediction">
        <label>
          Your prediction
          <select
            aria-label="Your prediction"
            value={prediction}
            onChange={(e) => {
              setPrediction(e.target.value);
              setFeedback('');
            }}
          >
            <option value="">Choose before running</option>
            <option value="increase">Increase</option>
            <option value="decrease">Decrease</option>
            <option value="same">Stay the same</option>
          </select>
        </label>
        <button
          className="button button-small button-primary"
          disabled={!prediction}
          onClick={() => {
            setRunning(false);
            const next = { ...modelDefaults(model), ...experimentPresets[model][preset].inputs };
            const after = calculateModel(model, next).metrics[metricIndex];
            const change =
              Math.abs(after.value - metric.value) < 1e-8
                ? 'same'
                : after.value > metric.value
                  ? 'increase'
                  : 'decrease';
            setValues(next);
            setFeedback(
              `${prediction === change ? 'Prediction supported.' : 'Revise your explanation.'} ${metric.label}: ${Number(metric.value.toFixed(3))} → ${Number(after.value.toFixed(3))} ${metric.unit}. ${change === 'same' ? 'The modeled output stays the same.' : `The modeled output ${change === 'increase' ? 'increases' : 'decreases'}.`} Compare which inputs changed, then record the trial.`,
            );
          }}
        >
          Run scenario
        </button>
      </div>
      {feedback && (
        <p className="experiment-feedback" role="status">
          {feedback}
        </p>
      )}
      <div className="experiment-sweep">
        <strong>Watch a controlled sweep</strong>
        <p>
          Only {control.label.toLowerCase()} changes from {control.min} to {control.max}{' '}
          {control.unit}; other inputs stay at their current settings.
        </p>
        <div className="lesson-actions">
          <button
            className="button button-small button-glass"
            aria-pressed={running}
            onClick={() => {
              if (running) setRunning(false);
              else {
                setValues((current) => ({ ...current, [control.key]: control.min }));
                setRunning(true);
              }
            }}
          >
            {running ? 'Pause sweep' : 'Run variable sweep'}
          </button>
          <button
            className="button button-small button-glass"
            disabled={running || values[control.key] >= control.max}
            onClick={() =>
              setValues((current) => ({
                ...current,
                [control.key]: Math.min(
                  control.max,
                  Number((current[control.key] + control.step).toFixed(3)),
                ),
              }))
            }
          >
            Advance one step
          </button>
        </div>
      </div>
    </div>
  );
}

export type LabTrial = { settings: string; result: string; metrics: ModelResult['metrics'] };
export function TrialComparison({ trials, model }: { trials: LabTrial[]; model: ModelId }) {
  const [metricIndex, setMetricIndex] = useState(teachingMetric[model] ?? 0);
  const metric = trials[0].metrics[metricIndex],
    values = trials.map((t) => t.metrics[metricIndex].value);
  const low = Math.min(0, ...values),
    high = Math.max(1, ...values),
    y = (n: number) => 195 - ((n - low) / (high - low)) * 145;
  return (
    <figure className="lesson-visual trial-comparison">
      <figcaption>
        <span className="eyebrow">COMPARE YOUR EXPERIMENTS</span>
        <strong>One shared scale, one output at a time</strong>
      </figcaption>
      <label>
        Comparison output
        <select
          aria-label="Comparison output"
          value={metricIndex}
          onChange={(e) => setMetricIndex(Number(e.target.value))}
        >
          {trials[0].metrics.map((m, i) => (
            <option key={m.label} value={i}>
              {m.label} ({m.unit})
            </option>
          ))}
        </select>
      </label>
      <div
        className="atlas-chart-scroll"
        tabIndex={0}
        role="region"
        aria-label="Recorded trial chart"
      >
        <svg
          viewBox="0 0 480 260"
          className="trial-chart"
          role="img"
          aria-label={`${metric.label}: ${values.map((v, i) => `trial ${i + 1}, ${Number(v.toFixed(3))} ${metric.unit}`).join('; ')}`}
        >
          <text x="58" y="25">
            {metric.unit}
          </text>
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <path d={`M58 ${195 - f * 145} H433`} className="atlas-gridline" />
              <text x="48" y={200 - f * 145} textAnchor="end">
                {Number((low + f * (high - low)).toFixed(2))}
              </text>
            </g>
          ))}
          <path d="M58 45 V195 H433" className="atlas-axis" />
          {values.map((n, i) => (
            <g key={i}>
              <path
                d={`M${88 + i * 62} ${y(0)} V${y(n)}`}
                stroke="var(--accent)"
                strokeWidth="14"
              />
              <circle cx={88 + i * 62} cy={y(n)} r="5" className="atlas-point" />
              <text x={88 + i * 62} y="225" textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
          <text x="245" y="251" textAnchor="middle">
            Recorded trial
          </text>
        </svg>
      </div>
      <p>
        Compare the settings in your notebook to explain why the measured outputs differ. Recorded
        results use the same unit and axis.
      </p>
    </figure>
  );
}
