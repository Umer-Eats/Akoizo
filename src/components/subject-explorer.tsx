'use client';
import { useState, type ReactNode } from 'react';
import type { LessonSim } from '@/lib/lessons';
import {
  alphabet,
  cipherTransform,
  cleanLetters,
  keyedAlphabet,
  vegetation,
  epiMeasures,
  stellar,
  plantResponse,
  experimentData,
  type CipherMode,
} from '@/lib/subject-labs';
import './subject-explorer.css';

type Explorer = Extract<LessonSim, { kind: 'explorer' }>;
type Props = { sim: Explorer; preview?: boolean };
const f = (n: number | null, digits = 3) =>
  n === null
    ? 'Undefined'
    : Number(n.toPrecision(digits)).toLocaleString('en-US', { maximumFractionDigits: 5 });
function Slider({
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
function Plot({ label, children }: { label: string; children: ReactNode }) {
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
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
function LabFrame({
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
function CipherLab({ sim, preview }: Props) {
  const modes: CipherMode[] = [
    'Caesar',
    'Atbash',
    'Affine',
    'Porta',
    'Checkerboard',
    'Nihilist',
    'Baconian',
    'Fractionated Morse',
    'Complete columnar',
  ];
  const [mode, setMode] = useState<CipherMode>(
      sim.topic === 4
        ? 'Checkerboard'
        : sim.topic === 5
          ? 'Baconian'
          : sim.topic === 2
            ? 'Affine'
            : 'Caesar',
    ),
    [text, setText] = useState('MEET ME AT NOON'),
    [shift, setShift] = useState(sim.topic === 2 ? 8 : 3),
    [a, setA] = useState(5),
    [key, setKey] = useState('SCIENCE'),
    [decode, setDecode] = useState(false),
    [selected, setSelected] = useState(0),
    [digits, setDigits] = useState('95671082');
  let result = '',
    error = '';
  try {
    result = cipherTransform(text, mode, shift, a, key, decode);
  } catch (e) {
    error = (e as Error).message;
  }
  let mapping = '';
  try {
    mapping = cipherTransform(alphabet, mode, shift, a, key, decode);
  } catch {}
  const square = keyedAlphabet(key, true),
    freq = [...alphabet].map((ch) => [...cleanLetters(text)].filter((c) => c === ch).length),
    max = Math.max(1, ...freq);
  const validDigits = /^\d{8}$/.test(digits),
    vals = Object.fromEntries([...'SENDMORY'].map((ch, i) => [ch, Number(digits[i] ?? 0)]));
  const number = (word: string) => Number([...word].map((ch) => vals[ch]).join(''));
  const sumValid =
    validDigits &&
    new Set(digits).size === 8 &&
    vals.S !== 0 &&
    vals.M !== 0 &&
    number('SEND') + number('MORE') === number('MONEY');
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `${mode}; ${decode ? 'decode' : 'encode'}; a=${a}, b=${shift}; keyword=${key}; input=${text}`,
        result: error || result,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <label>
            Cipher system
            <select
              aria-label="Cipher system"
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as CipherMode);
                setDecode(false);
              }}
            >
              {modes.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Message
            <textarea
              aria-label="Cipher message"
              rows={3}
              maxLength={500}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <label>
            Keyword
            <input
              aria-label="Cipher keyword"
              value={key}
              maxLength={20}
              onChange={(e) => setKey(e.target.value)}
            />
          </label>
          {['Caesar', 'Affine'].includes(mode) && (
            <Slider label="Alphabet shift" value={shift} min={0} max={25} set={setShift} />
          )}
          {mode === 'Affine' && (
            <label>
              Affine multiplier
              <select
                aria-label="Affine multiplier"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
              >
                {[1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
          )}
          <label className="subject-check">
            <input type="checkbox" checked={decode} onChange={(e) => setDecode(e.target.checked)} />{' '}
            Decode the supplied input
          </label>
        </div>
      )}
      {['Checkerboard', 'Nihilist'].includes(mode) ? (
        <div
          className="cipher-square"
          role="table"
          aria-label="Keyed Polybius square; row and column labels 1 through 5"
        >
          <div role="row">
            <span role="columnheader">Row / col</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <span role="columnheader" key={n}>
                {n}
              </span>
            ))}
          </div>
          {[0, 1, 2, 3, 4].map((r) => (
            <div role="row" key={r}>
              <span role="rowheader">{r + 1}</span>
              {[0, 1, 2, 3, 4].map((c) => (
                <span role="cell" key={c}>
                  {square[r * 5 + c]}
                </span>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="cipher-alphabet" aria-label="Input letters and transformed symbols">
          {[...alphabet].map((ch, i) => (
            <button
              type="button"
              key={ch}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <strong>{ch}</strong>
              <span>
                {['Caesar', 'Atbash', 'Affine', 'Porta'].includes(mode) ? mapping[i] : 'index ' + i}
              </span>
            </button>
          ))}
        </div>
      )}
      <p className="cipher-focus">
        {mode === 'Affine'
          ? `For ${alphabet[selected]}: (${a} × ${selected} + ${shift}) mod 26 = ${(a * selected + shift) % 26}. Decode by subtracting b and multiplying by the modular inverse.`
          : mode === 'Porta'
            ? 'Porta repeats paired-key reciprocal rows; spaces do not advance the key. The displayed A–Z sequence uses the repeating keyword, so it is positional rather than a single substitution alphabet.'
            : mode === 'Nihilist'
              ? 'I/J share a square cell. Add repeating keyword coordinates as integers; decode by subtraction. A slash separates words.'
              : mode === 'Checkerboard'
                ? 'Read row first, then column. I/J share a cell; rows and columns are labeled 1–5.'
                : mode === 'Baconian'
                  ? 'Modern 26-letter convention: A = 00000, B = 00001, …, Z = 11001. A/B groups are separated by spaces; / separates words.'
                  : mode === 'Fractionated Morse'
                    ? 'Dot, dash, X triples in lexicographic order (dot before dash before X); XXX is omitted. X separates letters, XX words. Final X padding is removed when decoding.'
                    : mode === 'Complete columnar'
                      ? 'Historical syllabus material: fill rows, pad X to a complete rectangle, read columns in sorted keyword order with ties left to right. Decoding retains ambiguous X padding.'
                      : `${alphabet[selected]} has index ${selected}. Track wraparound and reverse the same convention.`}
      </p>
      <Plot label="Letter-frequency histogram of the supplied input">
        <text x="25" y="24">
          Input letter counts (not a guaranteed language ranking)
        </text>
        {freq.map((n, i) => (
          <g key={i}>
            <rect
              x={40 + i * 22}
              y={275 - (n / max) * 210}
              width="15"
              height={(n / max) * 210}
              className="subject-fill"
            />
            <text x={47 + i * 22} y="300" textAnchor="middle">
              {alphabet[i]}
            </text>
            {n > 0 && (
              <text x={47 + i * 22} y={265 - (n / max) * 210} textAnchor="middle">
                {n}
              </text>
            )}
          </g>
        ))}
      </Plot>
      <div className="cipher-result" role="status">
        <strong>{decode ? 'Decoded result' : 'Encoded result'}</strong>
        <p>{error || result || 'Enter a message.'}</p>
      </div>
      {!preview && (
        <div className="lesson-actions">
          <button
            className="button button-small button-glass"
            disabled={!!error || !result}
            onClick={() => {
              setText(result);
              setDecode(!decode);
            }}
          >
            Reverse this result
          </button>
          <button
            className="button button-small button-glass"
            onClick={() => {
              setText('CAT');
              setMode('Affine');
              setA(5);
              setShift(8);
              setDecode(false);
            }}
          >
            Load CAT affine example
          </button>
        </div>
      )}
      {!preview && sim.topic === 6 && (
        <details open>
          <summary>Cryptarithm constraint inspector: SEND + MORE = MONEY</summary>
          <label>
            Digits for S E N D M O R Y
            <input
              aria-label="Cryptarithm digits"
              inputMode="numeric"
              maxLength={8}
              value={digits}
              onChange={(e) => setDigits(e.target.value.replace(/\D/g, ''))}
            />
          </label>
          <p role="status">
            {validDigits
              ? `${number('SEND')} + ${number('MORE')} = ${number('SEND') + number('MORE')}; MONEY = ${number('MONEY')}. ${sumValid ? 'All arithmetic, distinct-digit, and nonzero-leading constraints pass.' : 'At least one constraint fails; check arithmetic, distinct digits, and leading zeros.'}`
              : 'Enter eight digits in the stated letter order.'}
          </p>
        </details>
      )}
    </LabFrame>
  );
}

function RemoteLab({ sim, preview }: Props) {
  const [nir, setNir] = useState(0.6),
    [red, setRed] = useState(0.2),
    [blue, setBlue] = useState(0.1),
    [fraction, setFraction] = useState(100),
    [pixel, setPixel] = useState(30),
    [albedo, setAlbedo] = useState(0.3),
    [pulse, setPulse] = useState(8),
    [falseColor, setFalseColor] = useState(true);
  const n = (nir * fraction) / 100 + 0.3 * (1 - fraction / 100),
    r = (red * fraction) / 100 + 0.2 * (1 - fraction / 100),
    b = (blue * fraction) / 100 + 0.15 * (1 - fraction / 100),
    v = vegetation(n, r, b),
    range = pulse * 150;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `Endmember NIR=${nir}, red=${red}, blue=${blue}; vegetation fraction=${fraction}%; pixel=${pixel}m; albedo=${albedo}; round trip=${pulse}µs`,
        result: `Mixed NDVI=${f(v.ndvi)}; EVI=${f(v.evi)}; range=${f(range)}m; absorbed shortwave=${f(400 * (1 - albedo))} W/m²`,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Slider
            label="Vegetation NIR reflectance"
            value={nir}
            min={0}
            max={1}
            step={0.01}
            set={setNir}
          />
          <Slider
            label="Vegetation red reflectance"
            value={red}
            min={0}
            max={1}
            step={0.01}
            set={setRed}
          />
          <Slider
            label="Vegetation blue reflectance"
            value={blue}
            min={0}
            max={1}
            step={0.01}
            set={setBlue}
          />
          <Slider
            label="Vegetation area fraction"
            value={fraction}
            min={0}
            max={100}
            unit="%"
            set={setFraction}
          />
          <Slider
            label="Pixel side"
            value={pixel}
            min={10}
            max={100}
            step={10}
            unit="m"
            set={setPixel}
          />
          <Slider
            label="Surface albedo"
            value={albedo}
            min={0}
            max={1}
            step={0.05}
            set={setAlbedo}
          />
          <Slider
            label="Round-trip pulse time"
            value={pulse}
            min={1}
            max={20}
            unit="µs"
            set={setPulse}
          />
          <label className="subject-check">
            <input
              type="checkbox"
              checked={falseColor}
              onChange={(e) => setFalseColor(e.target.checked)}
            />{' '}
            Display NIR in red channel
          </label>
        </div>
      )}
      <Plot
        label={`Mixed-pixel spectral response: blue ${f(b)}, red ${f(r)}, NIR ${f(n)}; vegetation fraction ${fraction}%`}
      >
        <text x="24" y="25">
          Band reflectance (0–1) and a 10 × 10 illustrative mixture
        </text>
        <path d="M55 60 V270 H325" className="subject-axis" />
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <text x="45" y={275 - v * 200} textAnchor="end">
              {v}
            </text>
            <path d={`M55 ${270 - v * 200} H325`} className="subject-grid" />
          </g>
        ))}
        {[b, r, n].map((v, i) => (
          <g key={i}>
            <rect
              x={85 + i * 80}
              y={270 - v * 200}
              width="45"
              height={v * 200}
              fill={['#7299ff', '#e68b9b', '#b678ff'][i]}
            />
            <text x={107 + i * 80} y="295" textAnchor="middle">
              {['Blue', 'Red', 'NIR'][i]}
            </text>
          </g>
        ))}
        {Array.from({ length: 100 }, (_, i) => (
          <rect
            key={i}
            x={360 + (i % 10) * 24}
            y={65 + Math.floor(i / 10) * 20}
            width="22"
            height="18"
            fill={i < fraction ? (falseColor ? '#b33b54' : '#3d8545') : '#a28b65'}
          />
        ))}
        <text x="360" y="292">
          {fraction}% vegetation; remainder soil
        </text>
        <text x="360" y="315">
          Illustrative display colors
        </text>
      </Plot>
      {[2, 7, 8, 9].includes(sim.topic) && (
        <Plot
          label={`Pulse range ${range} metres; absorbed flux ${400 * (1 - albedo)} W per square metre`}
        >
          <text x="20" y="25">
            Separate physical models: pulse ranging and shortwave partition
          </text>
          <rect x="55" y="70" width="95" height="48" className="subject-box" />
          <text x="102" y="100" textAnchor="middle">
            Sensor
          </text>
          <path d="M160 82 L390 155 M390 168 L160 110" className="subject-line" />
          <path d="M280 185 H480" className="subject-axis" />
          <text x="270" y="215">
            Target range: {f(range)} m
          </text>
          <text x="25" y="252">
            400 W/m² incoming, fixed local illumination
          </text>
          <rect x="25" y="272" width={500 * albedo} height="18" fill="#b678ff" />
          <rect
            x={25 + 500 * albedo}
            y="272"
            width={500 * (1 - albedo)}
            height="18"
            className="subject-fill"
          />
          <text x="25" y="320">
            Reflected {f(400 * albedo)}; absorbed {f(400 * (1 - albedo))} W/m²
          </text>
        </Plot>
      )}
      <div className="subject-metrics" aria-live="polite">
        <Metric label="Mixed NDVI" value={f(v.ndvi)} />
        <Metric label="Mixed EVI" value={f(v.evi)} />
        <Metric label="Pixel area" value={`${pixel ** 2} m²`} />
        <Metric label="One-way range" value={`${range} m`} />
      </div>
      <p>
        Linear mixture in each band: vegetation fraction × vegetation reflectance + soil fraction ×
        soil reflectance. Fixed soil is NIR 0.30, red 0.20, blue 0.15. NDVI = (NIR − red)/(NIR +
        red). EVI = 2.5(NIR − red)/(NIR + 6red − 7.5blue + 1), using fractions. Undefined
        denominators are reported explicitly.
      </p>
      <p>
        Range = ct/2 with c = 3 × 10⁸ m/s. Absorbed local shortwave = 400(1 − albedo) W/m². These
        separate ideal models do not retrieve temperature, climate trends, sensor revisit, or crop
        stress cause.
      </p>
      {!preview && (
        <button
          className="button button-small button-glass"
          onClick={() => {
            setNir(0.6);
            setRed(0.1);
            setBlue(0.05);
            setFraction(50);
          }}
        >
          Load half vegetation / half soil example
        </button>
      )}
    </LabFrame>
  );
}

function EpiLab({ sim, preview }: Props) {
  const [cells, setCells] = useState([20, 30, 5, 45]),
    [diagnostic, setDiagnostic] = useState(sim.topic === 7 || sim.topic === 9),
    [bins, setBins] = useState([1, 3, 8, 12, 6, 2]),
    [binSelected, setBinSelected] = useState(0);
  const [a, b, c, d] = cells,
    m = epiMeasures(a, b, c, d),
    max = Math.max(1, ...bins);
  const labels = diagnostic
    ? ['True positive', 'False positive', 'False negative', 'True negative']
    : ['Exposed ill', 'Exposed well', 'Unexposed ill', 'Unexposed well'];
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `${diagnostic ? 'Diagnostic reference' : 'Complete cohort'} orientation; a=${a}, b=${b}, c=${c}, d=${d}; onset bins=${bins.join(',')}`,
        result: diagnostic
          ? `Sensitivity=${f(m.sensitivity)}, specificity=${f(m.specificity)}, PPV=${f(m.ppv)}, NPV=${f(m.npv)}`
          : `Exposed risk=${f(m.exposed)}, reference risk=${f(m.unexposed)}, RR=${f(m.rr)}, OR=${f(m.or)}`,
      }}
    >
      {!preview && (
        <>
          <label className="subject-check">
            <input
              type="checkbox"
              checked={diagnostic}
              onChange={(e) => setDiagnostic(e.target.checked)}
            />{' '}
            Use diagnostic test/reference orientation
          </label>
          <div className="subject-controls">
            {cells.map((n, i) => (
              <Slider
                key={i}
                label={labels[i]}
                value={n}
                min={0}
                max={1000}
                set={(v) => setCells((c) => c.map((n, j) => (i === j ? v : n)))}
              />
            ))}
          </div>
        </>
      )}
      <div className="subject-table-scroll">
        <table className="subject-table">
          <caption>
            {diagnostic
              ? 'Diagnostic classification against a reference standard'
              : 'Synthetic complete-cohort exposure/outcome table'}
          </caption>
          <thead>
            <tr>
              <th>Group</th>
              <th>{diagnostic ? 'Reference disease +' : 'Ill'}</th>
              <th>{diagnostic ? 'Reference disease −' : 'Well'}</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{diagnostic ? 'Test +' : 'Exposed'}</th>
              <td>a = {a}</td>
              <td>b = {b}</td>
              <td>{a + b}</td>
            </tr>
            <tr>
              <th>{diagnostic ? 'Test −' : 'Unexposed'}</th>
              <td>c = {c}</td>
              <td>d = {d}</td>
              <td>{c + d}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="subject-metrics" aria-live="polite">
        {diagnostic ? (
          <>
            <Metric label="Sensitivity a/(a+c)" value={f(m.sensitivity)} />
            <Metric label="Specificity d/(b+d)" value={f(m.specificity)} />
            <Metric label="PPV a/(a+b)" value={f(m.ppv)} />
            <Metric label="NPV d/(c+d)" value={f(m.npv)} />
          </>
        ) : (
          <>
            <Metric label="Exposed risk a/(a+b)" value={f(m.exposed)} />
            <Metric label="Reference risk c/(c+d)" value={f(m.unexposed)} />
            <Metric label="RR (ratio of risks)" value={f(m.rr)} />
            <Metric label="OR ad/bc" value={f(m.or)} />
          </>
        )}
      </div>
      <Plot label={`Synthetic onset histogram; six one-day bins with counts ${bins.join(', ')}`}>
        <text x="25" y="25">
          Cases by synthetic onset day · equal-width one-day bins
        </text>
        <path d="M65 55 V270 H600" className="subject-axis" />
        <text x="15" y="55">
          Cases
        </text>
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <text x="55" y={275 - v * 200} textAnchor="end">
              {f(max * v)}
            </text>
            <path d={`M65 ${270 - v * 200} H600`} className="subject-grid" />
          </g>
        ))}
        {bins.map((n, i) => (
          <g key={i}>
            <rect
              x={85 + i * 82}
              y={270 - (n / max) * 200}
              width="65"
              height={(n / max) * 200}
              className="subject-fill"
            />
            <text x={117 + i * 82} y="295" textAnchor="middle">
              Day {i + 1}
            </text>
          </g>
        ))}
        <text x="80" y="328">
          Onset counts are separate from the table; no automatic causal link is asserted.
        </text>
      </Plot>
      {!preview && (
        <div className="subject-controls">
          <label>
            Onset day to edit
            <select
              aria-label="Onset day to edit"
              value={binSelected}
              onChange={(e) => setBinSelected(Number(e.target.value))}
            >
              {bins.map((_, i) => (
                <option key={i} value={i}>
                  Day {i + 1}
                </option>
              ))}
            </select>
          </label>
          <Slider
            label="Cases in selected onset bin"
            value={bins[binSelected]}
            min={0}
            max={30}
            set={(v) => setBins((b) => b.map((n, i) => (i === binSelected ? v : n)))}
          />
          <button
            className="button button-small button-glass"
            onClick={() => setBins([1, 8, 3, 1, 8, 3])}
          >
            Load two-wave pattern
          </button>
          <button
            className="button button-small button-glass"
            onClick={() => {
              setCells([9, 99, 1, 891]);
              setDiagnostic(true);
            }}
          >
            Load low-prevalence test example
          </button>
        </div>
      )}
      <p>
        {diagnostic
          ? 'The reference classification is assumed known in this synthetic example. Predictive values differ from sensitivity and specificity.'
          : 'Risks assume complete, comparable follow-up in a defined cohort. If these were selected case-control counts, their sample risks would not estimate population risks; interpret the OR under the design assumptions.'}{' '}
        Zero denominators are undefined. No confidence interval, clinical conclusion, or causal
        proof is implied. Onset-curve shape supplies clues, not a unique source diagnosis.
      </p>
    </LabFrame>
  );
}

function AstronomyLab({ sim, preview }: Props) {
  const [temperature, setTemperature] = useState(5772),
    [radius, setRadius] = useState(1),
    [distance, setDistance] = useState(10),
    [region, setRegion] = useState('Main sequence');
  const s = stellar(temperature, radius, distance),
    x = (t: number) =>
      70 + ((Math.log10(40000) - Math.log10(t)) / (Math.log10(40000) - Math.log10(2500))) * 500,
    y = (l: number) => 285 - ((Math.log10(l) + 6) / 14) * 230;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `T=${temperature}K; R=${radius}Rsun; d=${distance}pc`,
        result: `L=${f(s.luminosity)} Lsun; relative flux=${f(s.flux)}; peak=${f(s.peak)}nm; distance modulus=${f(s.modulus)}`,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Slider
            label="Effective temperature"
            value={temperature}
            min={2500}
            max={40000}
            step={1}
            unit="K"
            set={setTemperature}
          />
          <Slider
            label="Stellar radius"
            value={radius}
            min={0.01}
            max={100}
            step={0.01}
            unit="Rsun"
            set={setRadius}
          />
          <Slider
            label="Observer distance"
            value={distance}
            min={1}
            max={1000}
            unit="pc"
            set={setDistance}
          />
          <div className="lesson-actions">
            <button
              className="button button-small button-glass"
              onClick={() => {
                setTemperature(3500);
                setRadius(60);
              }}
            >
              Load cool giant
            </button>
            <button
              className="button button-small button-glass"
              onClick={() => {
                setTemperature(20000);
                setRadius(0.01);
              }}
            >
              Load hot small emitter
            </button>
            <button
              className="button button-small button-glass"
              onClick={() => {
                setTemperature(5772);
                setRadius(1);
                setDistance(10);
              }}
            >
              Load solar reference
            </button>
          </div>
        </div>
      )}
      <Plot
        label={`H–R teaching diagram: temperature ${temperature}K, luminosity ${f(s.luminosity)} Lsun; temperature decreases rightward`}
      >
        <text x="25" y="23">
          H–R diagram · fixed logarithmic axes · schematic class guides
        </text>
        <path d="M70 45 V285 H580" className="subject-axis" />
        {[0.000001, 0.0001, 0.01, 1, 100, 10000, 1000000, 100000000].map((l) => (
          <g key={l}>
            <text x="60" y={y(l) + 4} textAnchor="end">
              10^{Math.round(Math.log10(l))}
            </text>
            <path d={`M70 ${y(l)} H580`} className="subject-grid" />
          </g>
        ))}
        {[40000, 20000, 10000, 5000, 2500].map((t) => (
          <text key={t} x={x(t)} y="307" textAnchor="middle">
            {t}
          </text>
        ))}
        <path d="M130 100 L510 243" className="subject-guide" />
        <text x="238" y="166">
          Main sequence
        </text>
        <text x="390" y="90">
          Giants / supergiants
        </text>
        <text x="145" y="260">
          White dwarfs
        </text>
        <circle cx={x(temperature)} cy={y(s.luminosity)} r="8" className="subject-point" />
        <text x="320" y="335" textAnchor="middle">
          Effective temperature (K) · hotter ← → cooler
        </text>
        <text x="80" y="42">
          L / Lsun
        </text>
      </Plot>
      {!preview && (
        <div className="subject-region-controls" role="group" aria-label="Explore stellar classes">
          {['Main sequence', 'Giants', 'White dwarfs'].map((r) => (
            <button
              className="button button-small button-glass"
              aria-pressed={region === r}
              key={r}
              onClick={() => setRegion(r)}
            >
              {r}
            </button>
          ))}
          <p>
            {region === 'Main sequence'
              ? 'Core hydrogen-fusing stars occupy a mass-dependent band; arbitrary T/R settings do not establish a physical main-sequence mass.'
              : region === 'Giants'
                ? 'A large radius can produce high luminosity despite a cool photosphere.'
                : 'A small emitting area can keep total luminosity low despite a hot photosphere. The emitter model does not describe degeneracy or infer a remnant identity.'}
          </p>
        </div>
      )}
      <div className="subject-metrics" aria-live="polite">
        <Metric label="Intrinsic luminosity" value={`${f(s.luminosity)} Lsun`} />
        <Metric label="Flux / solar flux at 10 pc" value={f(s.flux)} />
        <Metric label="Wien wavelength peak" value={`${f(s.peak)} nm`} />
        <Metric label="Distance modulus m − M" value={f(s.modulus)} />
        <Metric label="Parallax" value={`${f(s.parallax)} arcsec`} />
      </div>
      <p>
        L/Lsun = R²(T/5772 K)⁴. Relative flux = (L/Lsun)(10 pc/d)². Wavelength peak = 2.898 × 10⁶/T
        nm. m − M = 5 log10(d/10 pc), with no extinction. Radius and temperature are independent
        controls for equation exploration; no mass, age, atmosphere, binary, or relativistic model
        is inferred.
      </p>
    </LabFrame>
  );
}

function BotanyLab({ sim, preview }: Props) {
  const [light, setLight] = useState(50),
    [opening, setOpening] = useState(70),
    [water, setWater] = useState(80),
    [dryness, setDryness] = useState(50),
    [structure, setStructure] = useState('Stomata'),
    [cycle, setCycle] = useState('Meiosis');
  const response = plantResponse(light, opening, water, dryness),
    structures = ['Cuticle', 'Mesophyll', 'Stomata', 'Xylem', 'Phloem'];
  const descriptions: Record<string, string> = {
    Cuticle: 'The surface barrier reduces uncontrolled water loss.',
    Mesophyll: 'Photosynthetic cells and air spaces connect light capture with gas diffusion.',
    Stomata: 'Guard-cell-regulated pores connect CO2 entry with water-vapor loss.',
    Xylem: 'Water and minerals arrive through a transpiration-linked hydraulic pathway.',
    Phloem: 'Organic solutes move from sources to sinks through a living conducting system.',
  };
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `Light=${light}; opening=${opening}%; water=${water}%; air dryness=${dryness}%; structure=${structure}; cycle=${cycle}`,
        result: `Relative carbon-gain index=${f(response.gain)}; relative water-loss index=${f(response.loss)}`,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Slider label="Relative light input" value={light} min={0} max={100} set={setLight} />
          <Slider
            label="Stomatal opening"
            value={opening}
            min={0}
            max={100}
            unit="%"
            set={setOpening}
          />
          <Slider
            label="Relative water supply"
            value={water}
            min={0}
            max={100}
            unit="%"
            set={setWater}
          />
          <Slider
            label="Relative air dryness"
            value={dryness}
            min={0}
            max={100}
            unit="%"
            set={setDryness}
          />
        </div>
      )}
      <Plot
        label={`Generalized leaf cross-section; selected ${structure}; stomatal opening ${opening}%`}
      >
        <text x="20" y="24">
          Generalized leaf cross-section · not every plant has this arrangement
        </text>
        <rect x="65" y="65" width="510" height="20" fill="#9bba81" />
        <text x="70" y="55">
          Cuticle / outer surface
        </text>
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={75 + i * 40}
            y="95"
            width="28"
            height="73"
            rx="10"
            fill="#499b61"
            fillOpacity=".5"
            stroke="currentColor"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse
            key={i}
            cx={92 + i * 55}
            cy={196 + (i % 2) * 20}
            rx="24"
            ry="14"
            fill="#499b61"
            fillOpacity=".4"
            stroke="currentColor"
          />
        ))}
        <ellipse cx="460" cy="190" rx="50" ry="32" className="subject-box" />
        <circle cx="448" cy="180" r="10" fill="#7299ff" />
        <circle cx="475" cy="200" r="10" fill="#e68b9b" />
        <text x="492" y="172">
          Xylem
        </text>
        <text x="492" y="221">
          Phloem
        </text>
        <path d="M65 255 H265 M375 255 H575" className="subject-axis" />
        <ellipse cx={320 - opening * 0.3} cy="255" rx="20" ry="10" fill="#499b61" />
        <ellipse cx={320 + opening * 0.3} cy="255" rx="20" ry="10" fill="#499b61" />
        <text x="80" y="310">
          Mesophyll above · stomatal pore below · vein at right
        </text>
      </Plot>
      {!preview && (
        <div className="subject-region-controls" role="group" aria-label="Explore plant structures">
          {structures.map((s) => (
            <button
              className="button button-small button-glass"
              key={s}
              aria-pressed={s === structure}
              onClick={() => setStructure(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <p className="subject-focus" role="status">
        <strong>{structure}:</strong> {descriptions[structure]}
      </p>
      {[5, 6, 8].includes(sim.topic) ? (
        <>
          <div className="subject-cycle">
            <span>2n sporophyte</span>
            <strong>→ meiosis →</strong>
            <span>n spore / gametophyte / gametes</span>
            <strong>→ fertilization →</strong>
            <span>2n zygote / sporophyte</span>
          </div>
          {!preview && (
            <div className="lesson-actions">
              {['Meiosis', 'Mitosis', 'Fertilization'].map((s) => (
                <button
                  className="button button-small button-glass"
                  aria-pressed={s === cycle}
                  key={s}
                  onClick={() => setCycle(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <p role="status">
            {cycle === 'Meiosis'
              ? 'Meiosis reduces chromosome sets: 2n → n. Spores, not gametes, are its ordinary product in land-plant alternation of generations.'
              : cycle === 'Mitosis'
                ? 'Mitosis preserves chromosome-set number during ordinary gametophyte or sporophyte growth; gametophytes produce gametes by mitosis.'
                : 'Fertilization combines haploid gametes: n + n → 2n. Pollination is transfer of pollen, a distinct earlier event in seed plants.'}
          </p>
        </>
      ) : null}
      <Plot
        label={`Relative light-response curve at opening ${opening}%, water ${water}%; selected carbon-gain index ${f(response.gain)}`}
      >
        <text x="25" y="25">
          Illustrative light response · fixed water and opening
        </text>
        <path d="M60 55 V275 H585" className="subject-axis" />
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <text x="50" y={280 - v * 2} textAnchor="end">
              {v}
            </text>
            <text x={60 + v * 5} y="300" textAnchor="middle">
              {v}
            </text>
          </g>
        ))}
        <polyline
          points={Array.from(
            { length: 51 },
            (_, i) =>
              `${60 + i * 10},${275 - plantResponse(i * 2, opening, water, dryness).gain * 2}`,
          ).join(' ')}
          className="subject-line"
        />
        <circle cx={60 + light * 5} cy={275 - response.gain * 2} r="6" className="subject-point" />
        <text x="290" y="332">
          Relative light input
        </text>
        <text x="70" y="50">
          Carbon-gain index
        </text>
      </Plot>
      <div className="subject-metrics" aria-live="polite">
        <Metric label="Relative carbon-gain index" value={f(response.gain)} />
        <Metric label="Relative water-loss index" value={f(response.loss)} />
      </div>
      <p>
        Illustrative equations: gain = 100 × light/(light + 30) × opening fraction × water fraction;
        loss = 100 × opening fraction × dryness fraction × water fraction. No species calibration,
        respiration, nutrient, hormone, disease, or yield mechanism is fitted. These indices show
        tradeoffs and saturation, not actual rates.
      </p>
      {!preview && (
        <div className="lesson-actions">
          <button
            className="button button-small button-glass"
            onClick={() => {
              setLight(80);
              setOpening(20);
              setWater(25);
              setDryness(90);
            }}
          >
            Load dry-condition scenario
          </button>
          <button
            className="button button-small button-glass"
            onClick={() => {
              setLight(80);
              setOpening(80);
              setWater(90);
              setDryness(40);
            }}
          >
            Load supplied-water scenario
          </button>
        </div>
      )}
    </LabFrame>
  );
}

function ExperimentLab({ sim, preview }: Props) {
  const [slope, setSlope] = useState(4),
    [noise, setNoise] = useState(2),
    [offset, setOffset] = useState(0),
    [replicates, setReplicates] = useState(3),
    [confounded, setConfounded] = useState(false),
    [randomized, setRandomized] = useState(false),
    [anomaly, setAnomaly] = useState(false),
    [run, setRun] = useState(0);
  const data = experimentData({
    slope,
    noise,
    offset,
    replicates,
    confounded,
    randomized,
    anomaly,
    run,
  });
  const all = data.observations.map((o) => o.value),
    low = Math.min(0, ...all),
    high = Math.max(50, ...all),
    y = (v: number) => 275 - ((v - low) / (high - low)) * 215;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `True slope=${slope}; noise amplitude=${noise}; offset=${offset}; n/level=${replicates}; time drift=${confounded}; randomized=${randomized}; anomaly=${anomaly}; run=${run}`,
        result: data.groups
          .map((g) => `Level ${g.level}: mean=${f(g.mean)}, sample SD=${f(g.sd)}`)
          .join('; '),
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Slider label="True response slope" value={slope} min={-5} max={10} set={setSlope} />
          <Slider
            label="Random variation amplitude"
            value={noise}
            min={0}
            max={10}
            set={setNoise}
          />
          <Slider label="Instrument offset" value={offset} min={-10} max={10} set={setOffset} />
          <Slider
            label="Replicates per level"
            value={replicates}
            min={2}
            max={10}
            set={setReplicates}
          />
          <label className="subject-check">
            <input
              type="checkbox"
              checked={confounded}
              onChange={(e) => setConfounded(e.target.checked)}
            />{' '}
            Add time drift of +0.6 units per trial
          </label>
          <label className="subject-check">
            <input
              type="checkbox"
              checked={randomized}
              onChange={(e) => setRandomized(e.target.checked)}
            />{' '}
            Randomize trial order
          </label>
          <label className="subject-check">
            <input
              type="checkbox"
              checked={anomaly}
              onChange={(e) => setAnomaly(e.target.checked)}
            />{' '}
            Add a known synthetic +15 anomaly to trial 1 at level 1
          </label>
          <button className="button button-small button-glass" onClick={() => setRun((r) => r + 1)}>
            Run a new synthetic dataset
          </button>
        </div>
      )}
      <Plot
        label={`Synthetic response scatter and means; ${replicates} trials per level, means ${data.groups.map((g) => f(g.mean)).join(', ')}`}
      >
        <text x="20" y="24">
          Individual synthetic trials (dots) and level means (horizontal lines)
        </text>
        <path d="M65 50 V275 H595" className="subject-axis" />
        {[0, 0.5, 1].map((v) => (
          <g key={v}>
            <text x="55" y={280 - v * 215} textAnchor="end">
              {f(low + v * (high - low))}
            </text>
            <path d={`M65 ${275 - v * 215} H595`} className="subject-grid" />
          </g>
        ))}
        {data.observations.map((o) => (
          <circle
            key={`${o.level}-${o.trial}`}
            cx={155 + (o.level - 1) * 165 + (o.trial - (replicates + 1) / 2) * 7}
            cy={y(o.value)}
            r="4"
            className="subject-point"
          />
        ))}
        {data.groups.map((g) => (
          <g key={g.level}>
            <path d={`M${125 + (g.level - 1) * 165} ${y(g.mean)} h60`} className="subject-line" />
            <text x={155 + (g.level - 1) * 165} y="301" textAnchor="middle">
              Level {g.level}
            </text>
          </g>
        ))}
        <text x="250" y="332">
          Independent-variable level (arbitrary units)
        </text>
        <text x="75" y="46">
          Response (arbitrary units)
        </text>
      </Plot>
      <div className="subject-table-scroll">
        <table className="subject-table">
          <caption>Calculated summaries from the displayed synthetic values</caption>
          <thead>
            <tr>
              <th>Level</th>
              <th>n</th>
              <th>Mean</th>
              <th>Sample SD</th>
              <th>Range</th>
              <th>Mean − level 1 mean</th>
            </tr>
          </thead>
          <tbody>
            {data.groups.map((g) => (
              <tr key={g.level}>
                <th>{g.level}</th>
                <td>{replicates}</td>
                <td>{f(g.mean)}</td>
                <td>{f(g.sd)}</td>
                <td>{f(g.range)}</td>
                <td>{f(g.mean - data.groups[0].mean)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!preview && (
        <details>
          <summary>Inspect every raw synthetic trial and collection order</summary>
          <div className="subject-table-scroll">
            <table className="subject-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Level</th>
                  <th>Replicate</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                {data.observations.map((o) => (
                  <tr key={o.order}>
                    <td>{o.order}</td>
                    <td>{o.level}</td>
                    <td>{o.trial}</td>
                    <td>{f(o.value, 5)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
      <p>
        Generating relation: response = 10 + true slope × level + instrument offset + synthetic
        jitter + optional time drift + optional flagged anomaly. Jitter is a reproducible
        deterministic sequence, not a statistical random sample. Sample SD uses n − 1. The baseline
        is level 1; no significance test or causal proof is reported. Randomized order can reduce
        structured time confounding but does not guarantee exact balance.
      </p>
    </LabFrame>
  );
}

export function SubjectExplorer({ sim, preview = false }: Props) {
  const [restart, setRestart] = useState(0);
  const Component = {
    cipher: CipherLab,
    remote: RemoteLab,
    epidemiology: EpiLab,
    astronomy: AstronomyLab,
    botany: BotanyLab,
    experiment: ExperimentLab,
  }[sim.lab];
  return (
    <div>
      <Component key={restart} sim={sim} preview={preview} />
      {!preview && (
        <button
          className="button button-small button-glass subject-reset"
          onClick={() => setRestart((n) => n + 1)}
        >
          Reset subject lab
        </button>
      )}
    </div>
  );
}
