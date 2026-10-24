'use client';
import { useEffect, useId, useState } from 'react';
import { Check, Lightbulb, RotateCcw, Target } from 'lucide-react';
import {
  labDefaults,
  runLab,
  type LabPlot,
  type LabResult,
  type LabValues,
  type Shape,
  type TopicLab,
} from '@/lib/topic-lab-kit';
import './lesson-extras.css';
import { DiagramViewer } from './diagram-viewer';

const fmt = (n: number | string, digits = 3) =>
  typeof n === 'string'
    ? n
    : !Number.isFinite(n)
      ? 'Undefined'
      : Number(n.toPrecision(digits)).toLocaleString('en-US', { maximumFractionDigits: 5 });

const sceneColors = {
  ink: 'var(--text)',
  accent: 'var(--accent)',
  slot: 'var(--lesson-pink)',
  warm: 'var(--tl-warm)',
  cool: 'var(--tl-cool)',
  green: 'var(--tl-green)',
  gold: 'var(--tl-gold)',
  muted: 'var(--muted)',
};
function ShapeNode({ s, sceneId }: { s: Shape; sceneId: string }) {
  const tone = `tl-${s.tone}`;
  const material =
    'fill' in s && s.fill
      ? { fill: `url(#${sceneId}-${s.tone})`, stroke: sceneColors[s.tone], strokeWidth: 0.7 }
      : undefined;
  switch (s.k) {
    case 'line':
      return (
        <line
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          className={`tl-stroke ${tone}`}
          strokeWidth={s.w}
          strokeDasharray={s.dash ? '6 5' : undefined}
        />
      );
    case 'rect':
      return (
        <rect
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          rx={s.rx}
          opacity={s.o}
          style={s.color ? { fill: s.color } : material}
          className={`${s.fill ? 'tl-fill' : 'tl-stroke'} ${tone}`}
        />
      );
    case 'circle':
      return (
        <circle
          cx={s.x}
          cy={s.y}
          r={s.r}
          style={material}
          opacity={s.o}
          className={`${s.fill ? 'tl-fill' : 'tl-stroke'} ${tone}`}
        />
      );
    case 'ellipse':
      return (
        <ellipse
          cx={s.x}
          cy={s.y}
          rx={s.rx}
          ry={s.ry}
          style={material}
          opacity={s.o}
          className={`${s.fill ? 'tl-fill' : 'tl-stroke'} ${tone}`}
        />
      );
    case 'path':
      return (
        <path
          d={s.d}
          style={material}
          opacity={s.o}
          strokeWidth={s.w}
          strokeDasharray={s.dash ? '6 5' : undefined}
          className={`${s.fill ? 'tl-fill' : 'tl-stroke'} ${tone}`}
        />
      );
    case 'text':
      return (
        <text x={s.x} y={s.y} textAnchor={s.anchor} fontSize={s.size} className={`tl-text ${tone}`}>
          {s.s}
        </text>
      );
  }
}

function Viewer({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <DiagramViewer label={label}>
      <svg className="tl-svg" viewBox="0 0 640 340" role="img" aria-label={label}>
        {children}
      </svg>
    </DiagramViewer>
  );
}

function PlotView({ plot }: { plot: LabPlot }) {
  const [x0, x1, xl] = plot.x,
    [y0, y1, yl] = plot.y;
  const px = (x: number) => 74 + ((x - x0) / (x1 - x0)) * 536,
    py = (y: number) => 286 - ((Math.min(y1, Math.max(y0, y)) - y0) / (y1 - y0)) * 244;
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const summary = (plot.points ?? [])
    .map((p) => `${p.label ?? 'point'} at ${fmt(p.x)}, ${fmt(p.y)}`)
    .join('; ');
  return (
    <>
      {plot.title && (
        <p className="tl-plot-heading">
          <strong>{plot.title}</strong>
        </p>
      )}
      <Viewer label={`${plot.title ?? `${yl} against ${xl}`}${summary ? `: ${summary}` : ''}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1="74" x2="610" y1={286 - t * 244} y2={286 - t * 244} className="tl-grid" />
            <text
              x="66"
              y={290 - t * 244}
              textAnchor="end"
              className="tl-text tl-muted"
              fontSize="11"
            >
              {fmt(y0 + t * (y1 - y0))}
            </text>
            <text
              x={74 + t * 536}
              y="304"
              textAnchor="middle"
              className="tl-text tl-muted"
              fontSize="11"
            >
              {fmt(x0 + t * (x1 - x0))}
            </text>
          </g>
        ))}
        <path d="M74 42V286H610" className="tl-stroke tl-muted" strokeWidth="1.5" />
        <text x="342" y="328" textAnchor="middle" className="tl-text tl-ink" fontSize="12">
          {xl}
        </text>
        <text x="74" y="22" className="tl-text tl-ink" fontSize="12">
          {yl}
        </text>
        {(plot.hlines ?? []).map((h) => (
          <g key={`h${h.y}`}>
            <line
              x1="74"
              x2="610"
              y1={py(h.y)}
              y2={py(h.y)}
              className="tl-stroke tl-gold"
              strokeDasharray="6 5"
            />
            {h.label && (
              <text
                x="606"
                y={py(h.y) - 5}
                textAnchor="end"
                className="tl-text tl-gold"
                fontSize="11"
              >
                {h.label}
              </text>
            )}
          </g>
        ))}
        {(plot.vlines ?? []).map((v) => (
          <g key={`v${v.x}`}>
            <line
              x1={px(v.x)}
              x2={px(v.x)}
              y1="42"
              y2="286"
              className="tl-stroke tl-gold"
              strokeDasharray="6 5"
            />
            {v.label && (
              <text x={px(v.x) + 5} y="54" className="tl-text tl-gold" fontSize="11">
                {v.label}
              </text>
            )}
          </g>
        ))}
        {plot.curves.map((curve, n) => (
          <path
            key={n}
            className={`tl-stroke tl-${curve.tone ?? (n ? 'cool' : 'accent')}`}
            strokeWidth="2.75"
            strokeDasharray={curve.dash ? '7 5' : undefined}
            d={Array.from({ length: 161 }, (_, i) => {
              const x = x0 + ((x1 - x0) * i) / 160;
              return `${i ? 'L' : 'M'}${px(x).toFixed(1)},${py(curve.f(x)).toFixed(1)}`;
            }).join('')}
          />
        ))}
        {(plot.points ?? []).map((p, n) => (
          <g key={n}>
            <circle
              cx={px(p.x)}
              cy={py(p.y)}
              r="7"
              className={`tl-fill tl-${p.tone ?? 'slot'} tl-marker`}
            />
            {p.label && (
              <text
                x={px(p.x) + (px(p.x) > 480 ? -11 : 11)}
                y={py(p.y) - 10}
                textAnchor={px(p.x) > 480 ? 'end' : 'start'}
                className="tl-text tl-ink"
                fontSize="12"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </Viewer>
      <div className="tl-plot-key" aria-label="Chart legend and readings">
        {plot.curves.map((curve, i) => (
          <span key={i}>
            <svg width="28" height="12" aria-hidden="true">
              <line
                x1="0"
                y1="6"
                x2="28"
                y2="6"
                strokeWidth="3"
                strokeDasharray={curve.dash ? '5 3' : undefined}
                className={`tl-stroke tl-${curve.tone ?? (i ? 'cool' : 'accent')}`}
              />
            </svg>
            {curve.label ?? `Model curve ${i + 1}`}
          </span>
        ))}
      </div>
      {!!plot.points?.length && (
        <dl className="model-reading-guide">
          {plot.points.map((point, i) => (
            <div key={i}>
              <dt>{point.label ?? `Selected point ${i + 1}`}</dt>
              <dd>
                {xl}: {fmt(point.x)}
                <br />
                {yl}: {fmt(point.y)}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}

function BarsView({ bars }: { bars: NonNullable<LabResult['bars']> }) {
  const max = bars.max ?? Math.max(1e-9, ...bars.items.map((b) => Math.abs(b.value)));
  return (
    <div className="tl-bars" role="group" aria-label={bars.title ?? 'Output comparison'}>
      {bars.title && <strong>{bars.title}</strong>}
      {bars.items.map((bar) => (
        <div key={bar.label}>
          <span>
            {bar.label}: {fmt(bar.value)}
          </span>
          <div className="tl-bar-track">
            <div
              className={`tl-bar tl-${bar.tone ?? 'accent'}`}
              style={{ width: `${Math.min(100, (Math.abs(bar.value) / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LabFigure({ result, title }: { result: LabResult; title: string }) {
  const sceneId = useId().replace(/:/g, '');
  return (
    <>
      {result.scene && (
        <Viewer label={result.sceneLabel ?? `${title} diagram`}>
          <defs>
            {Object.entries(sceneColors).map(([tone, color]) => (
              <radialGradient key={tone} id={`${sceneId}-${tone}`} cx="32%" cy="25%" r="85%">
                <stop stopColor={color} stopOpacity=".5" />
                <stop offset=".55" stopColor={color} stopOpacity=".8" />
                <stop offset="1" stopColor={color} />
              </radialGradient>
            ))}
          </defs>
          {result.scene.map((s, i) => (
            <ShapeNode key={i} s={s} sceneId={sceneId} />
          ))}
        </Viewer>
      )}
      {result.plot && <PlotView plot={result.plot} />}
      {result.bars && <BarsView bars={result.bars} />}
    </>
  );
}

// Static first-look figure placed inside the reading; the full lab appears in the lab section.
export function TopicLabPreview({ lab }: { lab: TopicLab }) {
  const result = runLab(lab, labDefaults(lab));
  return (
    <figure className="lesson-visual tl-preview">
      <figcaption>
        <span className="eyebrow">MODEL PREVIEW</span>
        <strong>{lab.title}</strong>
      </figcaption>
      <LabFigure result={result} title={lab.title} />
      <p>
        {lab.lead} <a href={`#topic-lab-${lab.id}`}>Open this lab and change the variables ↓</a>
      </p>
    </figure>
  );
}

type Trial = { values: LabValues; metrics: LabResult['metrics'] };

export function TopicLabView({ lab }: { lab: TopicLab }) {
  const uid = useId();
  const [values, setValues] = useState<LabValues>(() => labDefaults(lab));
  const [done, setDone] = useState<number[]>([]);
  const [hints, setHints] = useState<number[]>([]);
  const [guess, setGuess] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [trials, setTrials] = useState<Trial[]>([]);
  const sweepControls = lab.controls.filter(
    (c) => !c.options && !c.toggle && c.min !== undefined && c.max !== undefined,
  );
  const [sweepKey, setSweepKey] = useState(sweepControls[0]?.key ?? '');
  const [sweeping, setSweeping] = useState(false);
  const sweep = sweepControls.find((c) => c.key === sweepKey);
  useEffect(() => {
    if (!sweeping || !sweep || sweep.min === undefined || sweep.max === undefined) return;
    if (values[sweep.key] >= sweep.max) {
      setSweeping(false);
      return;
    }
    const timer = window.setTimeout(() => {
      const max = sweep.max!;
      const step = sweep.step ?? 1;
      setValues((current) => ({
        ...current,
        [sweep.key]: Math.min(max, Number((current[sweep.key] + step).toPrecision(12))),
      }));
    }, 180);
    return () => window.clearTimeout(timer);
  }, [sweeping, sweep, values]);
  const result = runLab(lab, values);
  // Missions latch: once reached, a goal stays complete while the student keeps exploring.
  useEffect(() => {
    const reached = lab.missions
      .map((m, i) => (m.done(result.o, values) ? i : -1))
      .filter((i) => i >= 0 && !done.includes(i));
    if (reached.length) setDone((current) => [...current, ...reached]);
  }, [lab, result.o, values, done]);
  const set = (key: string, value: number) => {
    setSweeping(false);
    setValues((current) => ({ ...current, [key]: value }));
  };
  return (
    <section className="tl-lab" id={`topic-lab-${lab.id}`} aria-labelledby={`${uid}-title`}>
      <header>
        <p className="eyebrow">VIRTUAL LAB · CHANGE ONE VARIABLE AT A TIME</p>
        <h4 id={`${uid}-title`}>{lab.title}</h4>
        <p>{lab.lead}</p>
      </header>
      {sweep && (
        <div className="tl-sweep">
          <label>
            Animate one variable
            <select
              aria-label="Variable to animate"
              value={sweepKey}
              onChange={(e) => {
                setSweeping(false);
                setSweepKey(e.target.value);
              }}
            >
              {sweepControls.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <p>
            Watch {sweep.label.toLowerCase()} change from {sweep.min} to {sweep.max}{' '}
            {sweep.unit ?? ''}. All other inputs stay fixed. This is a variable sweep, not elapsed
            experimental time.
          </p>
          <div className="lesson-actions">
            <button
              type="button"
              className="button button-small button-glass"
              aria-pressed={sweeping}
              onClick={() => {
                if (sweeping) setSweeping(false);
                else {
                  setValues((current) => ({ ...current, [sweep.key]: sweep.min! }));
                  setSweeping(true);
                }
              }}
            >
              {sweeping ? 'Pause animation' : 'Animate variable'}
            </button>
            <button
              type="button"
              className="button button-small button-glass"
              disabled={sweeping || values[sweep.key] >= sweep.max!}
              onClick={() =>
                set(
                  sweep.key,
                  Math.min(
                    sweep.max!,
                    Number((values[sweep.key] + (sweep.step ?? 1)).toPrecision(12)),
                  ),
                )
              }
            >
              Advance variable one step
            </button>
          </div>
        </div>
      )}
      <fieldset className="tl-predict">
        <legend>
          <Lightbulb size={15} aria-hidden="true" /> Predict before you test: {lab.predict.q}
        </legend>
        <div className="tl-options">
          {lab.predict.options.map((option, i) => (
            <button
              key={option}
              type="button"
              className="tl-option"
              aria-pressed={guess === i}
              disabled={revealed}
              onClick={() => setGuess(i)}
            >
              {option}
            </button>
          ))}
        </div>
        {guess !== null && !revealed && (
          <p className="tl-quiet">
            Prediction saved. Use the controls to test it, then check your prediction.
          </p>
        )}
      </fieldset>
      <div className="tl-bench">
        <div className="tl-stage">
          <LabFigure result={result} title={lab.title} />
        </div>
        <div className="tl-controls">
          {lab.controls.map((c) =>
            c.options ? (
              <label key={c.key} className="tl-control">
                <span>{c.label}</span>
                <select
                  aria-label={c.label}
                  value={values[c.key]}
                  onChange={(e) => set(c.key, Number(e.target.value))}
                >
                  {c.options.map((option, i) => (
                    <option key={option} value={i}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ) : c.toggle ? (
              <label key={c.key} className="tl-control tl-toggle">
                <input
                  type="checkbox"
                  checked={values[c.key] >= 0.5}
                  onChange={(e) => set(c.key, e.target.checked ? 1 : 0)}
                />
                <span>{c.label}</span>
              </label>
            ) : (
              <label key={c.key} className="tl-control">
                <span>{c.label}</span>
                <output>
                  {fmt(values[c.key], 5)} {c.unit}
                </output>
                <input
                  type="range"
                  aria-label={c.label}
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={values[c.key]}
                  onChange={(e) => set(c.key, Number(e.target.value))}
                />
              </label>
            ),
          )}
        </div>
      </div>
      <div className="tl-metrics" aria-live="polite" aria-atomic="true">
        {result.metrics.map((m) => (
          <div key={m.label}>
            <span>{m.label}</span>
            <strong>
              {fmt(m.value)} {m.unit && <small>{m.unit}</small>}
            </strong>
          </div>
        ))}
      </div>
      {result.note && (
        <p className="tl-note" role="status">
          {result.note}
        </p>
      )}
      <div className="tl-missions">
        <h5>
          <Target size={15} aria-hidden="true" /> Lab goals · {done.length} of {lab.missions.length}{' '}
          reached
        </h5>
        <ol>
          {lab.missions.map((m, i) => (
            <li key={m.goal} data-done={done.includes(i)}>
              <span className="tl-mission-mark" aria-hidden="true">
                {done.includes(i) ? <Check size={14} /> : i + 1}
              </span>
              <div>
                <p>
                  {m.goal}
                  <span className="sr-only">
                    {done.includes(i) ? ' — reached' : ' — not yet reached'}
                  </span>
                </p>
                {!done.includes(i) &&
                  (hints.includes(i) ? (
                    <p className="tl-quiet">Hint: {m.hint}</p>
                  ) : (
                    <button
                      type="button"
                      className="tl-link"
                      onClick={() => setHints((current) => [...current, i])}
                    >
                      Show a hint
                    </button>
                  ))}
              </div>
            </li>
          ))}
        </ol>
        {done.length === lab.missions.length && (
          <p className="tl-complete" role="status">
            All goals reached. Check your prediction and explain the pattern in your own words.
          </p>
        )}
      </div>
      <div className="lesson-actions">
        <button
          type="button"
          className="button button-small button-glass"
          disabled={guess === null || revealed}
          onClick={() => setRevealed(true)}
        >
          Check my prediction
        </button>
        <button
          type="button"
          className="button button-small button-glass"
          disabled={trials.length >= 8}
          onClick={() => setTrials((current) => [...current, { values, metrics: result.metrics }])}
        >
          Record data row ({trials.length}/8)
        </button>
        <button
          type="button"
          className="button button-small button-glass"
          onClick={() => {
            setSweeping(false);
            setValues(labDefaults(lab));
            setDone([]);
            setHints([]);
            setGuess(null);
            setRevealed(false);
            setTrials([]);
          }}
        >
          <RotateCcw size={15} aria-hidden="true" /> Reset lab
        </button>
      </div>
      {revealed && guess !== null && (
        <div className="tl-feedback" role="status" data-correct={guess === lab.predict.correct}>
          <strong>
            {guess === lab.predict.correct
              ? 'Your prediction matches the model.'
              : `The model supports: ${lab.predict.options[lab.predict.correct]}`}
          </strong>
          <p>{lab.predict.why}</p>
        </div>
      )}
      {trials.length > 0 && (
        <div className="tl-table-scroll" tabIndex={0} role="region" aria-label="Recorded lab data">
          <table className="tl-table">
            <caption>Recorded data · compare rows to see what each variable changed</caption>
            <thead>
              <tr>
                <th scope="col">Row</th>
                {lab.controls.map((c) => (
                  <th scope="col" key={c.key}>
                    {c.label}
                  </th>
                ))}
                {result.metrics.map((m) => (
                  <th scope="col" key={m.label}>
                    {m.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trials.map((trial, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  {lab.controls.map((c) => (
                    <td key={c.key}>
                      {c.options
                        ? c.options[trial.values[c.key]]
                        : c.toggle
                          ? trial.values[c.key]
                            ? 'On'
                            : 'Off'
                          : `${fmt(trial.values[c.key], 5)} ${c.unit ?? ''}`}
                    </td>
                  ))}
                  {trial.metrics.map((m) => (
                    <td key={m.label}>
                      {fmt(m.value, 4)} {m.unit ?? ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <details className="lesson-disclosure">
        <summary>Model, equations, and limits</summary>
        <p>{lab.model}</p>
      </details>
    </section>
  );
}
