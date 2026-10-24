'use client';

import { useEffect, useId, useState } from 'react';
import { FlaskConical, ExternalLink, RotateCcw, Download, Play, BookOpen } from 'lucide-react';
import { labsForEvent, phetActivities, phetUrl, type LabActivity } from '@/lib/division-c-labs';
import {
  calculateLab,
  checkLabAnswer,
  initialLabValues,
  labPlot,
  type LabValues,
  type Reading,
} from '@/lib/division-c-lab-models';
import { useAuth, authMessage } from './auth-context';
import { PHET_LAB } from '@/lib/domain';
import { Slider } from './subject-lab-frame';
import './subject-explorer.css';
import './division-c-labs.css';
import { DiagramViewer } from './diagram-viewer';

const number = (v: number) =>
  Number(v.toPrecision(5)).toLocaleString('en-US', { maximumFractionDigits: 5 });
type Trial = { values: LabValues; readings: Reading[]; sample: number };
type Notebook = { prediction: string; conclusion: string; trials: Trial[] };
const emptyNotebook = (): Notebook => ({ prediction: '', conclusion: '', trials: [] });

function BenchDiagram({
  lab,
  values: v,
  data,
}: {
  lab: LabActivity;
  values: LabValues;
  data: number[];
}) {
  const artId = useId().replace(/:/g, '');
  return (
    <svg
      className="archive-bench-diagram"
      viewBox="0 0 600 260"
      role="img"
      aria-label={`${lab.title}: live apparatus`}
    >
      <defs>
        <linearGradient id={`${artId}-glass`} x1="0" x2="1">
          <stop stopColor="var(--accent)" stopOpacity=".06" />
          <stop offset=".2" stopColor="var(--accent)" stopOpacity=".17" />
          <stop offset=".35" stopColor="var(--accent)" stopOpacity=".02" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`liquid-${lab.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {lab.model === 'kinetics' || lab.model === 'colorimetry' ? (
        <>
          <rect x="35" y="90" width="100" height="80" rx="10" className="bench-outline" />
          <text x="85" y="156" textAnchor="middle">
            Light source
          </text>
          <path d="M135 130H240" className="bench-ray" />
          <rect x="240" y="55" width="90" height="150" rx="6" className="bench-outline" />
          <rect
            x="245"
            y="85"
            width="80"
            height="115"
            fill="var(--accent)"
            opacity={Math.min(0.85, 0.12 + data[0] * 0.6)}
          />
          <path
            d="M330 130H440"
            className="bench-ray"
            style={{ opacity: Math.max(0.08, 10 ** -data[0]) }}
          />
          <rect x="440" y="90" width="125" height="80" rx="10" className="bench-outline" />
          <text x="502" y="123" textAnchor="middle">
            Detector
          </text>
          <text x="502" y="149" textAnchor="middle">
            A = {number(data[0])}
          </text>
          <text x="285" y="235" textAnchor="middle">
            {lab.model === 'kinetics'
              ? `Reaction time: ${v.time} s`
              : `Standard: ${v.concentration} µmol/L`}
          </text>
        </>
      ) : lab.model === 'circuit' ? (
        <>
          <path
            d={
              v.parallel
                ? 'M100 80H400V113 M100 80V205H400V168 M220 80V113 M220 168V205'
                : 'M100 80H500V205H100Z'
            }
            className="bench-wire"
          />
          <rect x="80" y="110" width="40" height="55" className="bench-solid" />
          <path d="M80 125H120 M88 144H112" className="bench-wire" />
          <text x="48" y="190">
            {v.voltage} V
          </text>
          <rect
            x={v.parallel ? 205 : 220}
            y={v.parallel ? 113 : 65}
            width={v.parallel ? 30 : 80}
            height={v.parallel ? 55 : 30}
            className="bench-solid"
          />
          <rect
            x={v.parallel ? 385 : 350}
            y={v.parallel ? 113 : 65}
            width={v.parallel ? 30 : 80}
            height={v.parallel ? 55 : 30}
            className="bench-solid"
          />
          <text x={v.parallel ? 220 : 260} y="47" textAnchor="middle">
            R₁ {v.r1} Ω
          </text>
          <text x="400" y="47" textAnchor="middle">
            R₂ {v.r2} Ω
          </text>
          <rect x="140" y="190" width="65" height="30" fill="var(--bg)" />
          <path d={v.closed ? 'M140 205H205' : 'M140 205L195 178'} className="bench-wire" />
          <text x="300" y="249" textAnchor="middle">
            {v.closed ? 'Closed' : 'Open'} switch ·{' '}
            {v.parallel ? 'Parallel branches' : 'Series loop'} · I = {number(data[0] * 1000)} mA
          </text>
        </>
      ) : lab.model === 'bridge' ? (
        <>
          <path d="M300 35L120 130L300 225L480 130Z M120 130H480" className="bench-wire" />
          <circle cx="300" cy="130" r="38" className="bench-solid" />
          <text x="300" y="135" textAnchor="middle">
            {number(data[0] - data[1])} V
          </text>
          <text x="125" y="65">
            R₁ {v.r1} Ω
          </text>
          <text x="125" y="213">
            R₂ {v.r2} Ω
          </text>
          <text x="385" y="65">
            R₃ {v.r3} Ω
          </text>
          <text x="405" y="213">
            Rx ?
          </text>
          <text x="300" y="20" textAnchor="middle">
            Supply {v.voltage} V
          </text>
        </>
      ) : lab.model === 'chromatography' ? (
        <>
          <rect x="110" y="25" width="380" height="205" rx="4" className="bench-outline" />
          <path d="M110 210H490" className="bench-wire" />
          <path d={`M110 ${210 - v.front * 9}H490`} className="bench-dashed" />
          {[0, 1, 2].map((column) => {
            const matching = column === 0 || column === data[2] + 1;
            return (
              <g key={column}>
                <circle
                  cx={180 + column * 120}
                  cy={210 - v.front * 9 * (matching ? data[0] : 0.5)}
                  r="9"
                  fill="var(--accent)"
                />
                <circle
                  cx={180 + column * 120}
                  cy={210 - v.front * 9 * (matching ? 0.3 : 0.2)}
                  r="9"
                  fill="var(--lesson-pink)"
                />
                <text x={180 + column * 120} y="249" textAnchor="middle">
                  {['Trace', 'Reference A', 'Reference B'][column]}
                </text>
              </g>
            );
          })}
          <text x="20" y="215">
            Baseline
          </text>
          <text x="495" y={215 - v.front * 9}>
            Front
          </text>
        </>
      ) : lab.model === 'salinometer' || lab.model === 'salinometer-b' ? (
        <>
          {[0, 1].map((i) => (
            <g key={i}>
              <path d={`M${95 + i * 290} 35V215H${230 + i * 290}V35`} className="bench-wire" />
              <rect
                x={97 + i * 290}
                y="70"
                width="131"
                height="143"
                fill={`url(#liquid-${lab.id})`}
              />
              <rect
                x={153 + i * 290}
                y={70 + data[i] * 8 - 130}
                width="20"
                height="130"
                rx="4"
                className="bench-solid"
              />
              <circle cx={163 + i * 290} cy={70 + data[i] * 8 - 7} r="7" fill="var(--accent)" />
              <path d={`M${95 + i * 290} 70H${230 + i * 290}`} className="bench-dashed" />
              <text x={163 + i * 290} y="242" textAnchor="middle">
                {i ? 'Unknown' : 'Standard'}: {number(data[i])} cm
              </text>
            </g>
          ))}
          <text x="300" y="25" textAnchor="middle">
            Immersion measured below waterline
          </text>
        </>
      ) : lab.model === 'curd' ? (
        <>
          <path d="M120 60H300V215H120Z" className="bench-outline" />
          <rect x="125" y="95" width="170" height="115" fill={`url(#liquid-${lab.id})`} />
          {Array.from({ length: Math.round(data[1] * 14) }, (_, i) => (
            <circle
              key={i}
              cx={145 + (i % 7) * 22}
              cy={120 + Math.floor(i / 7) * 26}
              r="8"
              fill="var(--surface)"
              stroke="var(--accent)"
            />
          ))}
          <text x="210" y="45" textAnchor="middle">
            Milk + {v.vinegar} mL vinegar
          </text>
          <path d="M360 90H540L505 150H395Z" className="bench-outline" />
          <path d="M370 100H530" className="bench-dashed" />
          <rect x="380" y="180" width="140" height="40" rx="5" className="bench-solid" />
          <text x="450" y="206" textAnchor="middle">
            {number(data[0])} g curd
          </text>
          <text x="450" y="75" textAnchor="middle">
            Cheesecloth · 15 min drain
          </text>
          <text x="300" y="248" textAnchor="middle">
            {data[1] >= 1 ? 'All casein curdled' : `${number(data[1] * 100)}% of casein curdled`} ·
            milk {v.milk} g
          </text>
        </>
      ) : lab.model === 'bod' ? (
        <>
          <path d="M225 45H375V220H225Z" className="bench-outline" />
          <rect x="220" y="30" width="160" height="20" rx="4" className="bench-solid" />
          <rect x="230" y="70" width="140" height="145" fill={`url(#liquid-${lab.id})`} />
          {Array.from({ length: Math.round(data[0] * 3) }, (_, i) => (
            <circle
              key={i}
              cx={245 + (i % 5) * 27}
              cy={85 + Math.floor(i / 5) * 20}
              r="4"
              fill="var(--accent)"
            />
          ))}
          <text x="300" y="247" textAnchor="middle">
            Sealed bottle · Day {v.day} of 5 · {number(data[0])} mg/L oxygen
          </text>
        </>
      ) : (
        <>
          <rect
            x="70"
            y="50"
            width={Math.sqrt(v.area) * 11}
            height={Math.sqrt(v.area) * 11}
            fill={`url(#liquid-${lab.id})`}
            stroke="var(--accent)"
          />
          <text x="70" y="220">
            Towel area: {v.area} cm²
          </text>
          <path d="M335 180H520L490 145H365Z" className="bench-outline" />
          <rect x="350" y="180" width="155" height="45" rx="5" className="bench-solid" />
          <text x="427" y="209" textAnchor="middle">
            {number(data[0])} g
          </text>
          <text x="425" y="95" textAnchor="middle">
            Absorbed water mass
          </text>
          <text x="425" y="122" textAnchor="middle">
            Soak {v.soak} s · Trial {v.replicate}
          </text>
        </>
      )}
      <g className="bench-detail" aria-hidden="true">
        {(lab.model === 'kinetics' || lab.model === 'colorimetry') && (
          <>
            <circle cx="85" cy="115" r="12" fill="var(--accent-soft)" stroke="var(--accent)" />
            <path d="M78 115L82 111L87 119L92 115M81 130H89" className="bench-ray" />
            <path d="M135 121L238 112V148L135 139Z" fill="var(--accent)" opacity=".08" />
            <path
              d="M330 115L440 124V136L330 145Z"
              fill="var(--accent)"
              opacity={Math.max(0.025, 0.15 * 10 ** -data[0])}
            />
            <path d="M187 103V124M187 136V157" className="bench-wire" />
            <rect x="240" y="55" width="90" height="150" rx="6" fill={`url(#${artId}-glass)`} />
            <path
              d="M246 61V197M324 61V197M245 85Q285 91 325 85"
              stroke="var(--accent)"
              fill="none"
              opacity=".4"
            />
            <path d="M240 45H330M240 41V49M330 41V49" className="bench-wire" />
            <text x="285" y="29" textAnchor="middle">
              Optical path
            </text>
            <text x="185" y="182" textAnchor="middle">
              Slit · I₀
            </text>
            <text x="386" y="182" textAnchor="middle">
              I transmitted
            </text>
          </>
        )}
        {lab.model === 'circuit' && (
          <>
            <text x="64" y="121">
              +
            </text>
            <text x="64" y="157">
              −
            </text>
            {[0, 1, 2].map((i) => (
              <g key={i} stroke="var(--accent)" opacity=".5">
                {v.parallel ? (
                  <>
                    <path d={`M209 ${124 + i * 14}h22`} />
                    <path d={`M389 ${124 + i * 14}h22`} />
                  </>
                ) : (
                  <>
                    <path d={`M${238 + i * 20} 69v22`} />
                    <path d={`M${368 + i * 20} 69v22`} />
                  </>
                )}
              </g>
            ))}
            {v.parallel &&
              [220, 400].flatMap((x) =>
                [80, 205].map((y) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="var(--text)" />
                )),
              )}
            <circle cx="140" cy="205" r="3" fill="var(--text)" />
            <circle cx="205" cy="205" r="3" fill="var(--text)" />
          </>
        )}
        {lab.model === 'bridge' && (
          <>
            {[
              [210, 82, -28],
              [390, 82, 28],
              [210, 177, 28],
              [390, 177, -28],
            ].map(([x, y, a], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
                <rect x="-25" y="-9" width="50" height="18" className="bench-solid" />
                {[-12, 0, 12].map((b) => (
                  <path key={b} d={`M${b} -6V6`} stroke="var(--accent)" opacity=".5" />
                ))}
              </g>
            ))}
            {[
              [300, 35],
              [120, 130],
              [300, 225],
              [480, 130],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="var(--text)" />
            ))}
            <path d="M278 150H322" stroke="var(--line-strong)" />
          </>
        )}
        {lab.model === 'chromatography' && (
          <>
            {[180, 300, 420].map((x) => (
              <g key={x}>
                <path d={`M${x} 30V210`} stroke="var(--line-strong)" strokeDasharray="2 7" />
                <path d={`M${x - 5} 210h10`} className="bench-wire" />
              </g>
            ))}
            {Array.from({ length: 18 }, (_, i) => (
              <path
                key={i}
                d={`M114 ${35 + i * 10}h${i % 5 ? 6 : 12}`}
                stroke="var(--muted)"
                opacity=".5"
              />
            ))}
          </>
        )}
        {(lab.model === 'salinometer' || lab.model === 'salinometer-b') &&
          [0, 1].map((i) => (
            <g key={i}>
              <path
                d={`M${100 + i * 290} 42V208M${225 + i * 290} 42V208`}
                stroke="var(--accent)"
                opacity=".15"
                strokeWidth="3"
              />
              {Array.from({ length: 12 }, (_, j) => (
                <path
                  key={j}
                  d={`M${155 + i * 290} ${70 + data[i] * 8 - 121 + j * 8}h${j % 3 ? 6 : 12}`}
                  stroke="var(--accent)"
                  strokeWidth=".8"
                />
              ))}
              <path
                d={`M${98 + i * 290} 70Q${163 + i * 290} 76 ${227 + i * 290} 70`}
                fill="none"
                stroke="var(--accent)"
                opacity=".5"
              />
            </g>
          ))}
        {lab.model === 'curd' && (
          <>
            <rect x="120" y="60" width="180" height="155" fill={`url(#${artId}-glass)`} />
            {Array.from({ length: 7 }, (_, i) => (
              <path key={i} d={`M125 ${111 + i * 14}h${i % 2 ? 9 : 17}`} stroke="var(--muted)" />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={`M${380 + i * 18} 94L${398 + i * 13} 146`}
                stroke="var(--muted)"
                opacity=".3"
              />
            ))}
            <path
              d="M405 110H496M410 125H490M422 150V169M449 150V174M476 150V169"
              stroke="var(--accent)"
              opacity=".5"
            />
          </>
        )}
        {lab.model === 'bod' && (
          <>
            <rect x="225" y="45" width="150" height="175" fill={`url(#${artId}-glass)`} />
            {Array.from({ length: 14 }, (_, i) => (
              <path key={i} d={`M${229 + i * 10} 33V46`} stroke="var(--accent)" opacity=".4" />
            ))}
            <path d="M235 55V204M365 55V204" stroke="var(--accent)" opacity=".2" strokeWidth="3" />
            <path d="M377 110H431V82H462" className="bench-dashed" />
            <text x="468" y="86">
              Sealed sample
            </text>
            <path d="M230 70Q300 77 370 70" fill="none" stroke="var(--accent)" opacity=".4" />
          </>
        )}
        {lab.model === 'absorption' && (
          <>
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i} stroke="var(--accent)" opacity=".18">
                <path d={`M${70 + i * Math.sqrt(v.area) * 1.1} 50v${Math.sqrt(v.area) * 11}`} />
                <path d={`M70 ${50 + i * Math.sqrt(v.area) * 1.1}h${Math.sqrt(v.area) * 11}`} />
              </g>
            ))}
            <path d="M360 226v7h18v-7M476 226v7h18v-7" className="bench-wire" />
          </>
        )}
      </g>
    </svg>
  );
}

function ResponsePlot({
  lab,
  values,
  scenario,
}: {
  lab: LabActivity;
  values: LabValues;
  scenario: number;
}) {
  const [transform, setTransform] = useState('A');
  const plot = labPlot(lab, values, scenario, transform);
  const xs = plot.points.map((p) => p.x),
    ys = plot.points.map((p) => p.y);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY =
      lab.model === 'salinometer' || lab.model === 'salinometer-b'
        ? Math.min(...ys) * 0.999
        : Math.min(0, ...ys),
    maxY = Math.max(...ys, 0.001);
  const x = (n: number) => 75 + ((n - minX) / (maxX - minX)) * 460;
  const y = (n: number) => 200 - ((n - minY) / (maxY - minY)) * 150;
  return (
    <div className="archive-response-plot">
      {lab.model === 'kinetics' && (
        <label>
          Plot transformation
          <select value={transform} onChange={(e) => setTransform(e.target.value)}>
            <option>A</option>
            <option>ln(A)</option>
            <option>1/A</option>
          </select>
        </label>
      )}
      <DiagramViewer label={`${plot.yLabel} against ${plot.xLabel}`}>
        <svg viewBox="0 0 600 260" role="img" aria-label={`${plot.yLabel} against ${plot.xLabel}`}>
          <text x="75" y="24">
            {plot.yLabel}
          </text>
          <path d="M75 40V200H545" className="bench-wire" />
          {[0, 0.5, 1].map((t) => (
            <g key={t}>
              <text x="67" y={204 - t * 150} textAnchor="end">
                {number(minY + (maxY - minY) * t)}
              </text>
              <path d={`M75 ${200 - t * 150}H535`} className="bench-dashed" />
              <text x={75 + t * 460} y="222" textAnchor="middle">
                {number(minX + (maxX - minX) * t)}
              </text>
            </g>
          ))}
          <path
            d={plot.points.map((p, i) => `${i ? 'L' : 'M'}${x(p.x)},${y(p.y)}`).join(' ')}
            className="bench-ray"
          />
          <circle
            cx={x(plot.current.x)}
            cy={y(plot.current.y)}
            r="6"
            fill="var(--lesson-pink)"
            stroke="var(--text)"
          />
          <text x="305" y="250" textAnchor="middle">
            {plot.xLabel}
          </text>
        </svg>
      </DiagramViewer>
      <p className="archive-plot-reading">
        Current point: {plot.xLabel} = {number(plot.current.x)}; {plot.yLabel} ={' '}
        {number(plot.current.y)}.
      </p>
      <small>
        Model prediction curve; the dot marks the current setting. Record your own trials below.
        {(lab.model === 'salinometer' || lab.model === 'salinometer-b') &&
          ' The vertical axis is expanded to show small changes in immersion.'}
      </small>
    </div>
  );
}

function LabCompletion({
  eventId,
  labId,
  disabled = false,
  submission,
}: {
  eventId: string;
  labId: string;
  disabled?: boolean;
  /** The setup and calculated answer of a graded lab. Without it the lab is only marked complete. */
  submission?: { values: LabValues; scenario: number; answer: string };
}) {
  const { request } = useAuth();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState('');
  return (
    <div className="archive-actions">
      <button
        className="button button-small button-primary"
        disabled={disabled || busy || (done && !submission)}
        onClick={async () => {
          setBusy(true);
          setError('');
          try {
            const saved = await request<{ accuracy?: number }>('/api/progress', {
              method: 'POST',
              body: JSON.stringify({ eventId, labId, ...submission }),
            });
            setAccuracy(saved.accuracy ?? null);
            setDone(true);
          } catch (error) {
            setError(authMessage(error));
          } finally {
            setBusy(false);
          }
        }}
      >
        {submission
          ? busy
            ? 'Submitting…'
            : done
              ? 'Submit lab again'
              : 'Submit lab'
          : done
            ? 'Lab completed'
            : busy
              ? 'Saving…'
              : 'Mark lab complete'}
      </button>
      {done && (
        <p role="status">
          {accuracy === null
            ? 'Completion saved. Any pending assignment for this lab is complete.'
            : `Lab submitted. Accuracy: ${accuracy}%. Your instructor sees this score, and any pending assignment for this lab is complete.`}
        </p>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

function LabStation({ lab, studentId }: { lab: LabActivity; studentId: string }) {
  const [values, setValues] = useState(() => initialLabValues(lab));
  const [scenario, setScenario] = useState(0),
    [notebook, setNotebook] = useState<Notebook>(emptyNotebook);
  const [loaded, setLoaded] = useState(false),
    [storageError, setStorageError] = useState(false);
  const [answer, setAnswer] = useState(''),
    [feedback, setFeedback] = useState('');
  const storageKey = `akoizo:division-c-lab:${studentId}:${lab.id}:v1`;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (
          typeof saved.prediction === 'string' &&
          typeof saved.conclusion === 'string' &&
          Array.isArray(saved.trials)
        ) {
          const trials = saved.trials
            .slice(0, 30)
            .filter(
              (t: Trial) =>
                t &&
                Number.isInteger(t.sample) &&
                t.values &&
                lab.controls.every(
                  (c) =>
                    Number.isFinite(t.values[c.key]) &&
                    t.values[c.key] >= c.min &&
                    t.values[c.key] <= c.max,
                ),
            );
          // Recompute readings instead of trusting stored display values.
          setNotebook({
            prediction: saved.prediction.slice(0, 3000),
            conclusion: saved.conclusion.slice(0, 5000),
            trials: trials.map((t: Trial) => ({
              ...t,
              readings: calculateLab(lab.model, t.values, t.sample).readings,
            })),
          });
        }
      }
    } catch {
      setStorageError(true);
    }
    setLoaded(true);
  }, [storageKey, lab]);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(notebook));
    } catch {
      setStorageError(true);
    }
  }, [loaded, notebook, storageKey]);
  const result = calculateLab(lab.model, values, scenario);
  function change(key: string, value: number) {
    setValues((v) => ({ ...v, [key]: value }));
    setFeedback('');
    setAnswer('');
  }
  function download() {
    const file = {
      event: lab.eventId,
      lab: lab.title,
      source: lab.source,
      dataType: 'Synthetic practice data',
      ...notebook,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lab.id}-notebook.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <article className="archive-lab-station" aria-label={lab.title}>
      <header className="archive-lab-heading">
        <div>
          <p className="eyebrow">ARCHIVE INVESTIGATION · {lab.minutes} MIN</p>
          <h2>{lab.title}</h2>
          <p>{lab.summary}</p>
        </div>
        <span className="tag">Sample {scenario + 1}</span>
      </header>
      <details className="archive-source">
        <summary>
          <BookOpen size={16} aria-hidden="true" /> Source & adaptation · {lab.source.title}
        </summary>
        <p>
          <strong>{lab.source.section}</strong>
        </p>
        <p>{lab.source.basis}</p>
        <div className="archive-actions">
          <a href={lab.source.paper} target="_blank" rel="noopener noreferrer">
            Read original lab questions <ExternalLink size={14} />
          </a>
          <a href={lab.source.url} target="_blank" rel="noopener noreferrer">
            Archive source <ExternalLink size={14} />
          </a>
        </div>
      </details>
      <div className="archive-procedure">
        <h3>Investigation brief</h3>
        <ol>
          {lab.procedure.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <label className="archive-writing">
        Your hypothesis
        <textarea
          aria-label="Your hypothesis"
          value={notebook.prediction}
          maxLength={3000}
          rows={2}
          onChange={(e) => setNotebook((n) => ({ ...n, prediction: e.target.value }))}
          placeholder="Predict a relationship and explain why. Identify what you will hold constant."
        />
      </label>
      <section className="archive-workbench" aria-label="Interactive simulation">
        <div className="archive-controls">
          <p className="eyebrow">01 / SET UP</p>
          <h3>Experiment controls</h3>
          {lab.controls.map((c) => (
            <Slider
              key={c.key}
              label={c.label}
              value={values[c.key]}
              min={c.min}
              max={c.max}
              step={c.step}
              unit={c.unit}
              set={(value) => change(c.key, value)}
            />
          ))}
          <div className="archive-actions">
            <button
              className="button button-small button-glass"
              onClick={() => {
                setValues(initialLabValues(lab));
                setAnswer('');
                setFeedback('');
              }}
            >
              <RotateCcw size={14} /> Reset controls
            </button>
            {lab.model !== 'circuit' && (
              <button
                className="button button-small button-glass"
                onClick={() => {
                  setScenario((s) => (s + 1) % 5);
                  setValues(initialLabValues(lab));
                  setAnswer('');
                  setFeedback('');
                }}
              >
                Generate next sample
              </button>
            )}
          </div>
        </div>
        <div className="archive-instrument">
          <p className="eyebrow">02 / OBSERVE · SYNTHETIC READINGS</p>
          <DiagramViewer label={lab.title + ' apparatus'}>
            <BenchDiagram lab={lab} values={values} data={result.diagram} />
          </DiagramViewer>
          <dl className="model-reading-guide">
            <div>
              <dt>Apparatus and purpose</dt>
              <dd>{lab.summary}</dd>
            </div>
            <div>
              <dt>Measure and explain</dt>
              <dd>{lab.question}</dd>
            </div>
          </dl>
          <div className="archive-readings" aria-live="polite">
            {result.readings.map((r) => (
              <div key={r.label}>
                <span>{r.label}</span>
                <strong>
                  {number(r.value)} <small>{r.unit}</small>
                </strong>
              </div>
            ))}
          </div>
          <ResponsePlot lab={lab} values={values} scenario={scenario} />
        </div>
      </section>
      <p className="archive-model-note">
        {lab.assumptions}
        {lab.model === 'kinetics' && scenario > 0
          ? ` Sample ${scenario + 1} uses k₂₉₈ = ${number(0.012 + scenario * 0.002)} s⁻¹.`
          : ''}
      </p>
      <section className="archive-notebook" aria-label="Lab notebook">
        <div className="archive-section-heading">
          <div>
            <p className="eyebrow">03 / RECORD</p>
            <h3>
              Trial notebook <span>({notebook.trials.length}/30)</span>
            </h3>
          </div>
          <div className="archive-actions">
            <button
              className="button button-small button-primary"
              disabled={!loaded || notebook.trials.length >= 30}
              onClick={() =>
                setNotebook((n) => ({
                  ...n,
                  trials: [
                    ...n.trials,
                    { values: { ...values }, readings: result.readings, sample: scenario },
                  ],
                }))
              }
            >
              Record measurement
            </button>
            <button className="button button-small button-glass" onClick={download}>
              <Download size={14} /> Export notebook
            </button>
          </div>
        </div>
        {!notebook.trials.length ? (
          <p>Record a baseline, change one variable, and compare your measurements here.</p>
        ) : (
          <>
            <div
              className="archive-table-scroll"
              role="region"
              tabIndex={0}
              aria-label="Recorded measurements"
            >
              <table>
                <caption>Saved synthetic measurements with sample numbers</caption>
                <thead>
                  <tr>
                    <th scope="col">Trial / sample</th>
                    {lab.controls.map((c) => (
                      <th key={c.key} scope="col">
                        {c.label} {c.unit && `(${c.unit})`}
                      </th>
                    ))}
                    {result.readings.map((r) => (
                      <th key={r.label} scope="col">
                        {r.label} ({r.unit || 'count'})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notebook.trials.map((trial, i) => (
                    <tr key={i}>
                      <th scope="row">
                        {i + 1} / {trial.sample + 1}
                      </th>
                      {lab.controls.map((c) => (
                        <td key={c.key}>{number(trial.values[c.key])}</td>
                      ))}
                      {trial.readings.map((r) => (
                        <td key={r.label}>{number(r.value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="text-link"
              onClick={() => setNotebook((n) => ({ ...n, trials: [] }))}
            >
              Clear recorded trials
            </button>
          </>
        )}
        <small>
          {storageError
            ? 'Browser saving is unavailable. Export your notebook to keep your work.'
            : 'Notes and trials save in this browser for your account. Export to keep a separate copy.'}
        </small>
      </section>
      <section className="archive-analysis">
        <p className="eyebrow">04 / ANALYZE</p>
        <h3>Check your calculation</h3>
        <p>{lab.question}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFeedback(
              result.ready
                ? checkLabAnswer(answer, result.answer)
                : result.hint || 'Complete the procedure first.',
            );
          }}
        >
          <label>
            Calculated answer ({lab.answerUnit})
            <input
              value={answer}
              inputMode="decimal"
              maxLength={40}
              onChange={(e) => {
                setAnswer(e.target.value);
                setFeedback('');
              }}
              placeholder="Enter a value"
            />
          </label>
          <button className="button button-small button-primary" type="submit">
            Check answer
          </button>
        </form>
        {feedback && (
          <p className="archive-feedback" role="status">
            {feedback}
          </p>
        )}
        <details>
          <summary>Show calculation guidance</summary>
          <p>{lab.explanation}</p>
        </details>
        <label className="archive-writing">
          Evidence and conclusion
          <textarea
            aria-label="Evidence and conclusion"
            rows={4}
            maxLength={5000}
            value={notebook.conclusion}
            onChange={(e) => setNotebook((n) => ({ ...n, conclusion: e.target.value }))}
            placeholder={lab.reflection}
          />
        </label>
        <p>{lab.reflection}</p>
        <p>
          Record your hypothesis, at least one trial, your calculated answer, and your conclusion,
          then submit this lab. Your accuracy is how close your calculated answer is to the model
          for the setup on screen.
        </p>
        <LabCompletion
          eventId={lab.eventId}
          labId={lab.id}
          submission={{ values, scenario, answer }}
          disabled={
            !loaded ||
            !notebook.prediction.trim() ||
            !notebook.trials.length ||
            !notebook.conclusion.trim() ||
            !answer.trim()
          }
        />
      </section>
    </article>
  );
}

function PhETPanel({ eventId }: { eventId: string }) {
  const sim = phetActivities[eventId];
  const [openedExternally, setOpenedExternally] = useState(false);
  const [launched, setLaunched] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!launched || ready) return;
    const timer = setTimeout(() => setFailed(true), 20000);
    return () => clearTimeout(timer);
  }, [launched, ready]);
  if (!sim) return null;
  return (
    <section className="archive-phet" aria-label="PhET simulation">
      <p className="eyebrow">EXPLORE FURTHER / PHET</p>
      <h2>{sim.title}</h2>
      <p>{sim.task}</p>
      <div className="archive-actions">
        <button
          className="button button-small button-primary"
          onClick={() => {
            setLaunched((v) => !v);
            setReady(false);
            setFailed(false);
          }}
        >
          <Play size={15} />
          {launched ? 'Close simulation' : 'Launch PhET simulation'}
        </button>
        <a
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
          href={phetUrl(sim.slug)}
          onClick={() => setOpenedExternally(true)}
        >
          Open in a new tab <ExternalLink size={14} />
        </a>
      </div>
      {launched && (
        <>
          {!ready && (
            <p role="status">
              {failed
                ? 'The embedded activity is taking longer to load. Use “Open in a new tab” or return to the built-in archive lab.'
                : 'Loading the interactive PhET activity…'}
            </p>
          )}
          <iframe
            src={phetUrl(sim.slug)}
            title={`PhET ${sim.title}`}
            allowFullScreen
            onLoad={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        </>
      )}
      <p>Complete the investigation described above, then mark the simulation complete.</p>
      <LabCompletion eventId={eventId} labId={PHET_LAB} disabled={!ready && !openedExternally} />
      <p className="archive-model-note">
        PhET Interactive Simulations, University of Colorado Boulder. Internet connection required.
        If the frame is blank, use the new-tab link.{' '}
        <a href="https://phet.colorado.edu/en/licensing" target="_blank" rel="noopener noreferrer">
          PhET licensing
        </a>
        .
      </p>
    </section>
  );
}

export function DivisionCLabs({
  eventId,
  eventName,
  studentId,
  division = 'C',
}: {
  eventId: string;
  eventName: string;
  studentId: string;
  division?: 'B' | 'C';
}) {
  const labs = labsForEvent(division, eventId);
  const [selected, setSelected] = useState(labs[0]?.id),
    [view, setView] = useState('archive');
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lab');
    if (requested === PHET_LAB && phetActivities[eventId]) setView('phet');
    else if (labs.some((lab) => lab.id === requested)) {
      setSelected(requested!);
      setView('archive');
    }
  }, [eventId]);
  const lab = labs.find((l) => l.id === selected) || labs[0];
  if (!lab) return null;
  return (
    <div className="archive-labs" data-event={eventId}>
      <header className="archive-overview">
        <div>
          <p className="eyebrow">
            <FlaskConical size={16} /> DIVISION {division} / VIRTUAL LABS
          </p>
          <h2>Think it. Test it. Explain it.</h2>
          <p>
            {eventName} investigations built around archived tasks. Change the setup, collect
            evidence, and practice the analysis.
          </p>
        </div>
        <span className="archive-lab-count">
          {labs.length}
          <small>{labs.length === 1 ? 'investigation' : 'investigations'}</small>
        </span>
      </header>
      <div className="archive-view-switch" role="group" aria-label="Lab activities">
        <button aria-pressed={view === 'archive'} onClick={() => setView('archive')}>
          Archive labs
        </button>
        <button aria-pressed={view === 'phet'} onClick={() => setView('phet')}>
          PhET simulations <ExternalLink size={13} />
        </button>
      </div>
      <div hidden={view !== 'archive'}>
        <nav className="archive-lab-picker" aria-label="Choose a lab">
          {labs.map((item, i) => (
            <button
              key={item.id}
              aria-pressed={lab.id === item.id}
              onClick={() => setSelected(item.id)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{item.title}</strong>
              <small>{item.minutes} min</small>
            </button>
          ))}
        </nav>
        <LabStation key={lab.id} lab={lab} studentId={studentId} />
      </div>
      {view === 'phet' && <PhETPanel eventId={eventId} />}
    </div>
  );
}
