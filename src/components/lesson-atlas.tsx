import { useRef, useState } from 'react';
import type { Lesson } from '@/lib/lessons';
import { atlasImages, lessonAtlas, type AtlasEntry, type AtlasImage } from '@/lib/lesson-atlas';
import { calculateModel, modelControls, modelDefaults, type ModelId } from '@/lib/lesson-models';
import './lesson-atlas.css';

export function ProcessAtlas({ entry, compact = false }: { entry: AtlasEntry; compact?: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <figure className={`lesson-visual process-atlas${compact ? ' compact' : ''}`}>
      <figcaption>
        <span className="eyebrow">TRACE THE MECHANISM</span>
        <strong>{entry.title}</strong>
      </figcaption>
      <ol className="process-path">
        {entry.steps.map((step, i) => (
          <li key={step.label}>
            <button type="button" aria-pressed={active === i} onClick={() => setActive(i)}>
              <span className="process-index">{i + 1}</span>
              <strong>{step.label}</strong>
              {!compact && <span>{step.detail}</span>}
            </button>
          </li>
        ))}
      </ol>
      <div className="process-focus" aria-live="polite">
        <strong>
          Step {active + 1}: {entry.steps[active].label}
        </strong>
        <p>{entry.steps[active].detail}</p>
        {active < entry.steps.length - 1 && (
          <small>Trace the connection to {entry.steps[active + 1].label.toLowerCase()}.</small>
        )}
      </div>
    </figure>
  );
}

export function ComparisonAtlas({ entry }: { entry: AtlasEntry }) {
  return (
    <figure className="lesson-visual comparison-atlas">
      <figcaption>
        <span className="eyebrow">COMPARE & DISTINGUISH</span>
        <strong>Mechanism, evidence, and limits</strong>
      </figcaption>
      <div
        className="atlas-table-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${entry.title} comparison table`}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Feature or case</th>
              <th scope="col">What it tells you</th>
              <th scope="col">Keep in mind</th>
            </tr>
          </thead>
          <tbody>
            {entry.contrasts.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.mechanism}</td>
                <td>{row.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function SourceImage({ image }: { image: AtlasImage }) {
  const source = atlasImages[image];
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(100);
  return (
    <figure className="lesson-visual source-image">
      <figcaption>
        <span className="eyebrow">REFERENCE IMAGE</span>
        <strong>{source.title}</strong>
      </figcaption>
      <button
        className="atlas-image-button"
        aria-label={`Enlarge ${source.title}`}
        onClick={() => {
          setZoom(100);
          dialog.current?.showModal();
        }}
      >
        {/* Local educational assets have intrinsic sizes and are intentionally shown uncropped. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/lesson-visuals/${image}.jpg`} alt={source.alt} loading="lazy" />
        <span>Enlarge and inspect labels ↗</span>
      </button>
      <p className="atlas-credit">
        <a href={source.source} target="_blank" rel="noreferrer">
          {source.author} · source
        </a>{' '}
        ·{' '}
        <a href={source.licenseUrl} target="_blank" rel="noreferrer">
          {source.license}
        </a>{' '}
        · Unmodified
      </p>
      {image === 'skin-structure' && (
        <p>
          This figure shows hair-bearing skin. Compare it with thick palmar friction skin, which
          lacks hair follicles.
        </p>
      )}
      {image === 'fingerprint-whorl' && (
        <p>
          Inspect ridge flow and recording quality separately. This is a reference whorl, not a
          questioned case print.
        </p>
      )}
      <dialog
        ref={dialog}
        aria-label={source.title}
        className="atlas-image-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="atlas-dialog-toolbar">
          <strong>{source.title}</strong>
          <button
            className="button button-small button-glass"
            onClick={() => dialog.current?.close()}
          >
            Close image
          </button>
        </div>
        <label className="atlas-zoom">
          Image zoom <output>{zoom}%</output>
          <input
            aria-label="Image zoom"
            type="range"
            min="100"
            max="250"
            step="25"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </label>
        <p>Scroll to inspect the full-resolution labels. Press Escape to close.</p>
        <div
          className="atlas-enlarged-scroll"
          tabIndex={0}
          role="region"
          aria-label="Enlarged image viewer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/lesson-visuals/${image}.jpg`}
            alt={source.alt}
            style={{ width: `${zoom}%` }}
          />
        </div>
        <p className="atlas-credit">
          <a href={source.source}>{source.author}</a> ·{' '}
          <a href={source.licenseUrl}>{source.license}</a>
        </p>
      </dialog>
    </figure>
  );
}

export const chartControlKey: Record<ModelId, string> = {
  feedback: 'steps',
  airway: 'radius',
  ventilation: 'tidal',
  diffusion: 'thickness',
  digestion: 'capacity',
  immune: 'day',
  density: 'liquid',
  chromatography: 'front',
  bloodstain: 'ratio',
  thermal: 'hours',
};
export const teachingMetric: Partial<Record<ModelId, number>> = {
  airway: 1,
  ventilation: 1,
  digestion: 1,
  bloodstain: 1,
};
export function RelationshipChart({ model }: { model: ModelId }) {
  const baseline = modelDefaults(model),
    control = modelControls[model].find((c) => c.key === chartControlKey[model])!;
  const [value, setValue] = useState(control.initial);
  const metricIndex = teachingMetric[model] ?? 0;
  const resultAt = (n: number) =>
    calculateModel(model, { ...baseline, [control.key]: n }).metrics[metricIndex];
  const points = Array.from({ length: 51 }, (_, i) => {
    const x = control.min + ((control.max - control.min) * i) / 50;
    return { x, y: resultAt(x).value };
  });
  const low = Math.min(0, ...points.map((p) => p.y)),
    high = Math.max(1, ...points.map((p) => p.y));
  const x = (n: number) => 58 + ((n - control.min) / (control.max - control.min)) * 375;
  const y = (n: number) => 211 - ((n - low) / (high - low)) * 154;
  const metric = resultAt(value),
    fmt = (n: number) => Number(n.toFixed(2)).toLocaleString('en-US');
  return (
    <figure className="lesson-visual relationship-chart">
      <figcaption>
        <span className="eyebrow">EXPLORE THE RELATIONSHIP</span>
        <strong>
          {control.label} → {metric.label.toLowerCase()}
        </strong>
      </figcaption>
      <div
        className="atlas-chart-scroll"
        tabIndex={0}
        role="region"
        aria-label="Relationship chart viewer"
      >
        <svg
          viewBox="0 0 480 270"
          role="img"
          aria-label={`${metric.label} against ${control.label}. Selected ${value} ${control.unit} gives ${fmt(metric.value)} ${metric.unit}.`}
        >
          <text x="58" y="25">
            {metric.unit}
          </text>
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <path d={`M58 ${211 - f * 154} H433`} className="atlas-gridline" />
              <text x="50" y={216 - f * 154} textAnchor="end">
                {fmt(low + f * (high - low))}
              </text>
              <text x={58 + f * 375} y="237" textAnchor="middle">
                {fmt(control.min + f * (control.max - control.min))}
              </text>
            </g>
          ))}
          <path d="M58 50 V211 H433" className="atlas-axis" />
          <polyline
            points={points.map((p) => `${x(p.x)},${y(p.y)}`).join(' ')}
            className="atlas-curve"
          />
          <path d={`M${x(value)} 50 V211`} className="atlas-cursor" />
          <circle cx={x(value)} cy={y(metric.value)} r="6" className="atlas-point" />
          <text x="245" y="265" textAnchor="middle">
            {control.unit}
          </text>
        </svg>
      </div>
      <label className="atlas-zoom">
        Chart: {control.label}
        <output>
          {value} {control.unit}
        </output>
        <input
          aria-label={`Chart: ${control.label}`}
          type="range"
          min={control.min}
          max={control.max}
          step={control.step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </label>
      <p aria-live="polite">
        <strong>
          {fmt(metric.value)} {metric.unit}
        </strong>{' '}
        · {metric.label}
      </p>
      <p className="atlas-chart-note">
        Teaching model; other inputs stay fixed at{' '}
        {Object.entries(baseline)
          .filter(([key]) => key !== control.key)
          .map(([key, n]) => {
            const c = modelControls[model].find((c) => c.key === key)!;
            return `${c.label.toLowerCase()} ${n} ${c.unit}`;
          })
          .join('; ')}
        . Change the separate lab controls to test combined effects.
      </p>
      <details>
        <summary>Read the plotted values as a table</summary>
        <table>
          <thead>
            <tr>
              <th>{control.label}</th>
              <th>
                {metric.label} ({metric.unit})
              </th>
            </tr>
          </thead>
          <tbody>
            {[0, 10, 20, 30, 40, 50].map((i) => (
              <tr key={i}>
                <td>{fmt(points[i].x)}</td>
                <td>{fmt(points[i].y)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

export function LessonSectionVisuals({ lesson, index }: { lesson: Lesson; index: number }) {
  const atlas: AtlasEntry | undefined = lesson.visual ?? lessonAtlas[lesson.id];
  if (!atlas) return null;
  return (
    <>
      {index === atlas.section && <ProcessAtlas entry={atlas} />}
      {index === 2 && atlas.image && <SourceImage image={atlas.image} />}
      {index === 4 && <ComparisonAtlas entry={atlas} />}
      {index === 6 && lesson.simulation.kind === 'model' && (
        <RelationshipChart model={lesson.simulation.model} />
      )}
    </>
  );
}
