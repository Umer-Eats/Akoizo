'use client';
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { f, Slider, Plot, Metric, LabFrame, type Props } from './subject-lab-frame';
import {
  gasProcess,
  gasR,
  waterHeating,
  strongTitration,
  resistorNetwork,
  gateOutput,
  cross,
  runoff,
  darcy,
  chainCoordinates,
  chainContacts,
  type GasPath,
  type Gate,
} from '@/lib/extended-lab-models';

function Selector({
  label,
  value,
  options,
  set,
}: {
  label: string;
  value: string;
  options: string[];
  set: (v: string) => void;
}) {
  return (
    <label>
      {label}
      <select aria-label={label} value={value} onChange={(e) => set(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
function Axes({ x, y }: { x: string; y: string }) {
  return (
    <>
      <path className="subject-axis" d="M70 40V280H590" />
      <text x="300" y="325">
        {x}
      </text>
      <text x="16" y="22">
        {y}
      </text>
    </>
  );
}
function Buttons({
  labels,
  active,
  set,
}: {
  labels: string[];
  active: string;
  set: (s: string) => void;
}) {
  return (
    <div className="subject-region-controls">
      {labels.map((s) => (
        <button
          className="button button-small button-glass"
          aria-pressed={s === active}
          key={s}
          onClick={() => set(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export function ChemistryLab({ sim, preview }: Props) {
  const [mode, setMode] = useState(
    sim.topic === 8
      ? 'First-order decay'
      : sim.topic === 9
        ? 'Enzyme saturation'
        : sim.topic === 6
          ? 'Strong-acid titration'
          : sim.topic === 4 || sim.topic === 7
            ? 'Gas paths'
            : 'Amount and concentration',
  );
  const [base, setBase] = useState(20),
    [baseM, setBaseM] = useState(0.1),
    [k, setK] = useState(0.02),
    [time, setTime] = useState(35),
    [vmax, setVmax] = useState(10),
    [km, setKm] = useState(2),
    [substrate, setSubstrate] = useState(2),
    [amount, setAmount] = useState(0.1),
    [volume, setVolume] = useState(1);
  const [gasSnapshot, setGasSnapshot] = useState({
    settings: 'isothermal; volume ratio 2',
    result: 'Work 1729 J; heat 1729 J; change U 0 J',
  });
  const tit = strongTitration(base, baseM),
    frac = Math.exp(-k * time),
    rate = (vmax * substrate) / (km + substrate);
  const result =
    mode === 'Strong-acid titration'
      ? `pH ${f(tit.ph, 5)}; equivalence ${f(tit.equivalenceML)} mL`
      : mode === 'First-order decay'
        ? `Fraction ${f(frac)}; half-life ${f(Math.LN2 / k)} s`
        : mode === 'Enzyme saturation'
          ? `Rate ${f(rate)} μmol/min`
          : `Concentration ${f(amount / volume)} mol/L`;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={
        mode === 'Gas paths'
          ? gasSnapshot
          : {
              settings: `${mode}; base ${base}mL at ${baseM}M; k=${k}; t=${time}; Vmax=${vmax}; Km=${km}; S=${substrate}; n=${amount}; V=${volume}`,
              result,
            }
      }
    >
      {!preview && (
        <div className="subject-controls">
          <Selector
            label="Chemistry investigation"
            value={mode}
            options={[
              'Strong-acid titration',
              'First-order decay',
              'Enzyme saturation',
              'Amount and concentration',
              'Gas paths',
            ]}
            set={setMode}
          />
          {mode === 'Gas paths' ? null : mode === 'Strong-acid titration' ? (
            <>
              <Slider
                label="Added base volume"
                value={base}
                min={0}
                max={50}
                step={0.5}
                unit="mL"
                set={setBase}
              />
              <Slider
                label="Base concentration"
                value={baseM}
                min={0.05}
                max={0.2}
                step={0.01}
                unit="mol/L"
                set={setBaseM}
              />
            </>
          ) : mode === 'First-order decay' ? (
            <>
              <Slider
                label="Rate constant"
                value={k}
                min={0.005}
                max={0.1}
                step={0.005}
                unit="s⁻¹"
                set={setK}
              />
              <Slider label="Reaction time" value={time} min={0} max={200} unit="s" set={setTime} />
            </>
          ) : mode === 'Enzyme saturation' ? (
            <>
              <Slider
                label="Maximum enzyme rate"
                value={vmax}
                min={2}
                max={20}
                unit="μmol/min"
                set={setVmax}
              />
              <Slider
                label="Michaelis constant"
                value={km}
                min={0.5}
                max={5}
                step={0.5}
                unit="mM"
                set={setKm}
              />
              <Slider
                label="Substrate concentration"
                value={substrate}
                min={0}
                max={20}
                step={0.5}
                unit="mM"
                set={setSubstrate}
              />
            </>
          ) : (
            <>
              <Slider
                label="Solute amount"
                value={amount}
                min={0.05}
                max={1}
                step={0.05}
                unit="mol"
                set={setAmount}
              />
              <Slider
                label="Solution volume"
                value={volume}
                min={0.1}
                max={2}
                step={0.1}
                unit="L"
                set={setVolume}
              />
            </>
          )}
        </div>
      )}
      {mode === 'Gas paths' ? (
        <GasPathPanel preview={preview} onSnapshot={setGasSnapshot} />
      ) : (
        <>
          <Plot label={`${mode}: ${result}`}>
            {mode === 'Amount and concentration' ? (
              <>
                <rect className="subject-box" x="180" y="55" width="280" height="220" />
                <rect
                  x="182"
                  y={273 - (volume / 2) * 200}
                  width="276"
                  height={(volume / 2) * 200}
                  fill="var(--accent)"
                  opacity=".15"
                />
                {Array.from({ length: Math.round(amount * 100) }, (_, i) => (
                  <circle
                    key={i}
                    cx={195 + (i % 12) * 22}
                    cy={
                      275 -
                      (Math.floor(i / 12) + 0.5) *
                        ((volume * 100) / Math.max(1, Math.ceil(Math.round(amount * 100) / 12)))
                    }
                    r="3"
                    className="subject-fill"
                  />
                ))}
                <text x="180" y="305">
                  Dots encode amount; height encodes volume.
                </text>
              </>
            ) : (
              <>
                <Axes
                  x={
                    mode === 'Strong-acid titration'
                      ? 'Added base (mL)'
                      : mode === 'First-order decay'
                        ? 'Time (s)'
                        : 'Substrate (mM)'
                  }
                  y={
                    mode === 'Strong-acid titration'
                      ? 'pH (0–14)'
                      : mode === 'First-order decay'
                        ? 'Fraction remaining (0–1)'
                        : 'Rate (0–20 μmol/min)'
                  }
                />
                <path
                  className="subject-line"
                  d={Array.from({ length: 201 }, (_, i) => {
                    const x = i / 200;
                    const y =
                      mode === 'Strong-acid titration'
                        ? strongTitration(x * 50, baseM).ph / 14
                        : mode === 'First-order decay'
                          ? Math.exp(-k * x * 200)
                          : (vmax * x * 20) / (km + x * 20) / 20;
                    return `${i ? 'L' : 'M'}${70 + x * 520},${280 - y * 240}`;
                  }).join(' ')}
                />
                {[0, 1, 2, 3, 4].map((i) => (
                  <text key={i} x={65 + i * 130} y="302">
                    {mode === 'Strong-acid titration'
                      ? i * 12.5
                      : mode === 'First-order decay'
                        ? i * 50
                        : i * 5}
                  </text>
                ))}
                <circle
                  className="subject-point"
                  r="6"
                  cx={
                    70 +
                    (mode === 'Strong-acid titration'
                      ? base / 50
                      : mode === 'First-order decay'
                        ? time / 200
                        : substrate / 20) *
                      520
                  }
                  cy={
                    280 -
                    (mode === 'Strong-acid titration'
                      ? tit.ph / 14
                      : mode === 'First-order decay'
                        ? frac
                        : rate / 20) *
                      240
                  }
                />
              </>
            )}
          </Plot>
          <div className="subject-metrics">
            <Metric label="Current calculation" value={result} />
            {mode === 'Strong-acid titration' && (
              <Metric label="Total solution volume" value={`${f(tit.volumeL * 1000)} mL`} />
            )}
          </div>
          <p>
            {mode === 'Strong-acid titration'
              ? 'Fixed acid: 25.0 mL × 0.100 M, monoprotic strong acid, ideal dilute behavior at 25 °C. Solve [H⁺]−Kw/[H⁺] = excess acid concentration with Kw=10⁻¹⁴. This includes water autoionization and is not a weak-acid titration.'
              : mode === 'First-order decay'
                ? 'Fraction remaining = exp(−kt); t½ = ln2/k. Constant first-order k, normalized starting amount, no reverse reaction or transport limitation.'
                : mode === 'Enzyme saturation'
                  ? 'v = Vmax[S]/(Km+[S]). Initial-rate Michaelis–Menten approximation with substrate excess, steady-state complex, and no inhibition or cooperativity.'
                  : 'Concentration = amount/volume. The container is schematic and dots are a proportional display, not literal molecules. This mode does not calculate reaction yield or equilibrium.'}
          </p>
        </>
      )}
    </LabFrame>
  );
}

const specimens = [
  {
    name: 'Calcite',
    hardness: '3',
    streak: 'White',
    breakage: 'Three cleavage directions, rhombohedral angles',
    extra: 'Recorded carbonate reaction; weak magnetism',
    shape: 'rhombohedral',
  },
  {
    name: 'Quartz',
    hardness: '7',
    streak: 'No useful streak on a typical plate',
    breakage: 'Conchoidal fracture; no cleavage',
    extra: 'No recorded carbonate reaction; not strongly magnetic',
    shape: 'prismatic',
  },
  {
    name: 'Pyrite',
    hardness: '6–6.5',
    streak: 'Greenish to brownish black',
    breakage: 'Uneven fracture; poor cleavage',
    extra: 'Brassy metallic luster; often cubic habit',
    shape: 'cubic',
  },
  {
    name: 'Magnetite',
    hardness: '5.5–6.5',
    streak: 'Black',
    breakage: 'Uneven fracture',
    extra: 'Strong magnetism; metallic to submetallic',
    shape: 'octahedral',
  },
  {
    name: 'Hematite',
    hardness: 'Variable, commonly 5–6',
    streak: 'Reddish brown',
    breakage: 'Uneven fracture',
    extra: 'Not strongly magnetic in this simplified case',
    shape: 'massive',
  },
  {
    name: 'Halite',
    hardness: '2–2.5',
    streak: 'White',
    breakage: 'Three cleavage directions at right angles',
    extra: 'Nonmetallic; never use tasting for identification',
    shape: 'cubic',
  },
];
const rockSteps = {
  Melt: 'Cooling and crystallization produce igneous rock.',
  Igneous: 'Weathering can produce sediment; heat and stress can produce metamorphic rock.',
  Sediment: 'Deposition followed by compaction/cementation can produce sedimentary rock.',
  Sedimentary: 'Heat, pressure, stress, and fluids can produce metamorphic rock.',
  Metamorphic: 'Melting can produce melt; weathering can also return material to sediment.',
};
export function MineralLab({ sim, preview }: Props) {
  const [index, setIndex] = useState((sim.topic - 1) % specimens.length),
    [revealed, setRevealed] = useState<string[]>([]),
    [guess, setGuess] = useState(''),
    [checked, setChecked] = useState(false),
    [stage, setStage] = useState('Igneous');
  const s = specimens[index];
  const tests = ['hardness', 'streak', 'breakage', 'extra'] as const;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `Specimen ${index + 1}; tests ${revealed.join(', ')}; rock stage ${stage}`,
        result: checked
          ? `${guess}; ${guess === s.name ? 'supported' : 'revise'} by supplied evidence`
          : 'Identification not checked',
      }}
    >
      {!preview && (
        <>
          <div className="subject-controls">
            <Selector
              label="Virtual specimen"
              value={`Unknown ${index + 1}`}
              options={specimens.map((_, i) => `Unknown ${i + 1}`)}
              set={(v) => {
                setIndex(Number(v.split(' ')[1]) - 1);
                setRevealed([]);
                setGuess('');
                setChecked(false);
              }}
            />
          </div>
          <div className="subject-region-controls">
            {tests.map((t) => (
              <button
                className="button button-small button-glass"
                key={t}
                onClick={() => setRevealed((v) => (v.includes(t) ? v : [...v, t]))}
              >
                Reveal {t}
              </button>
            ))}
          </div>
        </>
      )}
      <Plot label={`Schematic mineral evidence map, specimen ${index + 1}`}>
        <path
          className="subject-guide"
          d="M320 155L125 75M320 155L505 75M320 155L125 255M320 155L505 255"
        />
        <polygon className="subject-box" points="275,110 330,85 380,130 365,205 295,220 260,170" />
        <text x="282" y="156">
          Unknown
        </text>
        <text x="300" y="180">
          {index + 1}
        </text>
        {tests.map((t, i) => (
          <g key={t}>
            <rect
              className="subject-box"
              x={i % 2 ? 420 : 35}
              y={i < 2 ? 40 : 230}
              width="180"
              height="60"
              rx="6"
            />
            <text x={i % 2 ? 430 : 45} y={i < 2 ? 65 : 255}>
              {t}
            </text>
            <text x={i % 2 ? 430 : 45} y={i < 2 ? 85 : 275}>
              {revealed.includes(t) || preview ? 'Evidence available' : 'Not revealed'}
            </text>
          </g>
        ))}
      </Plot>
      <div className="subject-focus">
        {tests
          .filter((t) => revealed.includes(t) || preview)
          .map((t) => (
            <p key={t}>
              <strong>{t}:</strong> {s[t]}
            </p>
          ))}
        {!preview && !revealed.length && (
          <p>
            Reveal observations before choosing a candidate. The generic shape does not identify the
            specimen.
          </p>
        )}
      </div>
      {!preview && (
        <>
          <div className="subject-controls">
            <Selector
              label="Mineral candidate"
              value={guess}
              options={['', ...specimens.map((s) => s.name)]}
              set={(v) => {
                setGuess(v);
                setChecked(false);
              }}
            />
          </div>
          <button
            className="button button-small button-glass"
            disabled={revealed.length < 3 || !guess}
            onClick={() => setChecked(true)}
          >
            Check mineral identification
          </button>
          {checked && (
            <p role="status">
              {guess === s.name ? 'Supported.' : 'Reconsider.'} This case represents {s.name}:
              hardness {s.hardness}, {s.breakage.toLowerCase()}, and {s.streak.toLowerCase()}{' '}
              streak. Compare the nearest alternative.
            </p>
          )}
        </>
      )}
      <h4>Trace a possible rock-cycle pathway</h4>
      <Buttons labels={Object.keys(rockSteps)} active={stage} set={setStage} />
      <p className="subject-focus">{rockSteps[stage as keyof typeof rockSteps]}</p>
      <p>
        Generic shape and display color are deliberately nondiagnostic. Property cards are idealized
        cases; natural specimens vary. Rock-cycle routes are alternatives, not a mandatory closed
        sequence. No physical chemical tests are required here.
      </p>
    </LabFrame>
  );
}

export function CircuitLab({ sim, preview }: Props) {
  const [mode, setMode] = useState(
      sim.topic === 5 || sim.topic === 9
        ? 'Boolean logic'
        : sim.topic === 4 || sim.topic === 8
          ? 'LED current limit'
          : 'Resistor network',
    ),
    [v, setV] = useState(6),
    [r1, setR1] = useState(100),
    [r2, setR2] = useState(300),
    [parallel, setParallel] = useState(false),
    [closed, setClosed] = useState(true),
    [vf, setVf] = useState(2),
    [reversed, setReversed] = useState(false),
    [gate, setGate] = useState<Gate>('AND'),
    [a, setA] = useState(false),
    [b, setB] = useState(false);
  const n = resistorNetwork(v, r1, r2, parallel, closed),
    led = closed && !reversed ? Math.max(0, v - vf) / r1 : 0,
    out = gateOutput(gate, a, b);
  const result =
    mode === 'Boolean logic'
      ? `${gate}(${Number(a)},${Number(b)}) = ${Number(out)}`
      : mode === 'LED current limit'
        ? `LED current ${f(led * 1000)} mA`
        : `Req ${f(n.resistance)} Ω; source ${f(n.current * 1000)} mA; ${f(n.power)} W`;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `${mode}; V=${v}; R1=${r1}; R2=${r2}; parallel=${parallel}; closed=${closed}; Vf=${vf}; reversed=${reversed}`,
        result,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Selector
            label="Circuit investigation"
            value={mode}
            options={['Resistor network', 'LED current limit', 'Boolean logic']}
            set={setMode}
          />
          {mode === 'Boolean logic' ? (
            <>
              <Selector
                label="Logic gate"
                value={gate}
                options={['AND', 'OR', 'XOR', 'NAND', 'NOR']}
                set={(v) => setGate(v as Gate)}
              />
              <label className="subject-check">
                <input type="checkbox" checked={a} onChange={(e) => setA(e.target.checked)} />
                Input A
              </label>
              <label className="subject-check">
                <input type="checkbox" checked={b} onChange={(e) => setB(e.target.checked)} />
                Input B
              </label>
            </>
          ) : (
            <>
              <Slider
                label="Source voltage"
                value={v}
                min={1}
                max={12}
                step={0.5}
                unit="V"
                set={setV}
              />
              <Slider
                label="Resistance R1"
                value={r1}
                min={50}
                max={1000}
                step={50}
                unit="Ω"
                set={setR1}
              />
              {mode === 'Resistor network' ? (
                <>
                  <Slider
                    label="Resistance R2"
                    value={r2}
                    min={50}
                    max={1000}
                    step={50}
                    unit="Ω"
                    set={setR2}
                  />
                  <label className="subject-check">
                    <input
                      type="checkbox"
                      checked={parallel}
                      onChange={(e) => setParallel(e.target.checked)}
                    />
                    Parallel branches
                  </label>
                </>
              ) : (
                <>
                  <Slider
                    label="LED forward drop"
                    value={vf}
                    min={1.5}
                    max={3.5}
                    step={0.1}
                    unit="V"
                    set={setVf}
                  />
                  <label className="subject-check">
                    <input
                      type="checkbox"
                      checked={reversed}
                      onChange={(e) => setReversed(e.target.checked)}
                    />
                    Reverse LED
                  </label>
                </>
              )}
              <label className="subject-check">
                <input
                  type="checkbox"
                  checked={closed}
                  onChange={(e) => setClosed(e.target.checked)}
                />
                Closed switch
              </label>
            </>
          )}
        </div>
      )}
      <Plot label={`${mode}: ${result}`}>
        {mode === 'Boolean logic' ? (
          <>
            <path className="subject-axis" d="M80 110H240M80 230H240M400 170H550" />
            <rect className="subject-box" x="240" y="80" width="160" height="180" rx="25" />
            <text x="290" y="175">
              {gate}
            </text>
            <text x="80" y="95">
              A = {Number(a)}
            </text>
            <text x="80" y="215">
              B = {Number(b)}
            </text>
            <circle
              cx="550"
              cy="170"
              r="20"
              fill={out ? 'var(--lesson-pink)' : 'var(--surface)'}
              stroke="currentColor"
            />
            <text x="455" y="215">
              Output = {Number(out)}
            </text>
          </>
        ) : (
          <>
            <path
              className="subject-axis"
              d="M100 80V140M100 165V270H550M100 80H135M175 80H340M430 80H550"
            />
            <path className="subject-line" d={closed ? 'M135 80H175' : 'M135 80L175 50'} />
            <path className="subject-axis" d="M75 140H125M85 165H115" />
            <text x="25" y="220">
              {v} V source
            </text>
            <rect className="subject-box" x="340" y="65" width="90" height="30" />
            <text x="340" y="50">
              R1 {r1} Ω
            </text>
            {mode === 'LED current limit' ? (
              <>
                <path className="subject-axis" d="M550 80V125M550 175V270" />
                <g transform={reversed ? 'rotate(180 550 150)' : undefined}>
                  <path className="subject-line" d="M530 125H570L550 175Z M530 175H570" />
                  <path
                    className="subject-axis"
                    d="M575 140L595 120M580 155L600 135M588 120H595V127M593 135H600V142"
                  />
                </g>
                <text x="440" y="220">
                  LED {reversed ? 'reverse' : 'forward'}
                </text>
                <text x="440" y="242">
                  Vf ≈ {vf} V
                </text>
              </>
            ) : parallel ? (
              <>
                <path className="subject-axis" d="M220 80V210H300M390 210H480V80M550 80V270" />
                <rect className="subject-box" x="300" y="195" width="90" height="30" />
                <text x="290" y="245">
                  R2 {r2} Ω
                </text>
                <text x="245" y="145">
                  Shared terminal nodes
                </text>
              </>
            ) : (
              <>
                <path className="subject-axis" d="M550 80V145M550 215V270" />
                <rect className="subject-box" x="535" y="145" width="30" height="70" />
                <text x="420" y="190">
                  R2 {r2} Ω
                </text>
              </>
            )}
            <text x="200" y="305">
              Ideal DC circuit · {closed ? 'closed path' : 'open path'}
            </text>
          </>
        )}
      </Plot>
      <div className="subject-metrics">
        <Metric label="Result" value={result} />
        {mode === 'Resistor network' && (
          <>
            <Metric label="R1: voltage / current" value={`${f(n.v1)} V / ${f(n.i1 * 1000)} mA`} />
            <Metric label="R2: voltage / current" value={`${f(n.v2)} V / ${f(n.i2 * 1000)} mA`} />
          </>
        )}
      </div>
      {mode === 'Boolean logic' && (
        <div className="subject-table-scroll">
          <table className="subject-table">
            <caption>All input combinations for {gate}</caption>
            <thead>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {[false, true].flatMap((x) =>
                [false, true].map((y) => (
                  <tr key={`${x}${y}`}>
                    <td>{Number(x)}</td>
                    <td>{Number(y)}</td>
                    <td>{Number(gateOutput(gate, x, y))}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      )}
      <p>
        {mode === 'Boolean logic'
          ? 'Exact Boolean abstraction; no voltage thresholds, propagation delay, transistor bias, or stored state.'
          : mode === 'LED current limit'
            ? 'Constant-drop forward model: I=max(0,Vs−Vf)/R1; reverse current is modeled as zero. This omits breakdown, optical calibration, and device ratings. Use approved equipment and procedures for real builds.'
            : 'Series Req=R1+R2; parallel Req=1/(1/R1+1/R2). I=V/Req, P=VI. Ideal wires/source/resistors; open switch means zero current. The diagram is a schematic, not a breadboard wiring guide.'}
      </p>
    </LabFrame>
  );
}

const habitats = {
  Estuary:
    'Freshwater, tides, and marine water can create strong temporal and vertical gradients. Sample depth and tidal stage.',
  Reef: 'Corals, algae, grazers, and microbes interact with light, temperature, carbonate chemistry, and nutrients. Bleaching is a stress response, not automatic death.',
  Ocean:
    'Depth, circulation, light, and productivity vary across marine environments. A surface sample does not represent the whole water column.',
};
export function WaterLab({ sim, preview }: Props) {
  const [fresh, setFresh] = useState(40),
    [sea, setSea] = useState(35),
    [start, setStart] = useState(8),
    [input, setInput] = useState(0.4),
    [demand, setDemand] = useState(0.8),
    [hours, setHours] = useState(4),
    [habitat, setHabitat] = useState(sim.topic === 5 || sim.topic === 6 ? 'Reef' : 'Estuary');
  const salinity = sea * (1 - fresh / 100),
    raw = start + (input - demand) * hours,
    oxygen = Math.max(0, raw);
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `Fresh ${fresh}%; sea ${sea}; DO0 ${start}; input ${input}; demand ${demand}; t ${hours}h; ${habitat}`,
        result: `Salinity ${f(salinity)}; oxygen ${f(oxygen)} mg/L`,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Slider
            label="Freshwater fraction"
            value={fresh}
            min={0}
            max={100}
            unit="%"
            set={setFresh}
          />
          <Slider
            label="Seawater endmember"
            value={sea}
            min={25}
            max={40}
            step={0.5}
            unit="salinity units"
            set={setSea}
          />
          <Slider
            label="Starting dissolved oxygen"
            value={start}
            min={1}
            max={12}
            step={0.5}
            unit="mg/L"
            set={setStart}
          />
          <Slider
            label="Oxygen input rate"
            value={input}
            min={0}
            max={2}
            step={0.1}
            unit="mg/(L h)"
            set={setInput}
          />
          <Slider
            label="Oxygen demand rate"
            value={demand}
            min={0}
            max={2}
            step={0.1}
            unit="mg/(L h)"
            set={setDemand}
          />
          <Slider
            label="Budget duration"
            value={hours}
            min={0}
            max={8}
            step={0.5}
            unit="h"
            set={setHours}
          />
        </div>
      )}
      <Plot label={`Conservative salinity mixing: ${f(salinity)} units`}>
        <Axes x="Freshwater fraction (%)" y="Salinity (0–40 teaching units)" />
        <path className="subject-line" d={`M70 ${280 - (sea / 40) * 240}L590 280`} />
        {[0, 25, 50, 75, 100].map((v) => (
          <text key={v} x={65 + (v / 100) * 520} y="302">
            {v}
          </text>
        ))}
        <text x="30" y="45">
          40
        </text>
        <text x="42" y="285">
          0
        </text>
        <circle
          className="subject-point"
          cx={70 + (fresh / 100) * 520}
          cy={280 - (salinity / 40) * 240}
          r="7"
        />
      </Plot>
      <Plot label={`Short oxygen budget: ${f(oxygen)} mg/L at ${hours} hours`}>
        <Axes x="Time (0–8 h)" y="Dissolved oxygen (0–30 mg/L)" />
        <path
          className="subject-line"
          d={Array.from(
            { length: 33 },
            (_, i) =>
              `${i ? 'L' : 'M'}${70 + (i / 32) * 520},${280 - (Math.max(0, start + ((input - demand) * i) / 4) / 30) * 240}`,
          ).join(' ')}
        />
        {[0, 2, 4, 6, 8].map((v) => (
          <text key={v} x={65 + (v / 8) * 520} y="302">
            {v}
          </text>
        ))}
        <text x="30" y="45">
          30
        </text>
        <text x="42" y="285">
          0
        </text>
        <circle
          className="subject-point"
          cx={70 + (hours / 8) * 520}
          cy={280 - (oxygen / 30) * 240}
          r="7"
        />
      </Plot>
      <div className="subject-metrics">
        <Metric label="Mixture salinity" value={`${f(salinity)} units`} />
        <Metric label="Final modeled oxygen" value={`${f(oxygen)} mg/L`} />
        <Metric label="Net oxygen rate" value={`${f(input - demand)} mg/(L h)`} />
      </div>
      <Buttons labels={Object.keys(habitats)} active={habitat} set={setHabitat} />
      <p className="subject-focus">{habitats[habitat as keyof typeof habitats]}</p>
      <p>
        Salt model: S=(1−freshwater fraction)×seawater endmember, fresh endmember=0, conservative
        additive-volume approximation. Oxygen model: DO=max(0,DO₀+(input−demand)t), independent of
        the mixture. Zero clipping means the constant-rate approximation has reached a limit; demand
        cannot continue consuming unavailable oxygen. No solubility feedback, transport, toxicity,
        or universal health threshold is inferred. Salinity units are a classroom approximation, not
        a full conductivity equation.
      </p>
      {raw < 0 && (
        <p role="status">
          The unconstrained budget would be negative. Reported oxygen is zero; revise the model
          beyond depletion rather than interpreting negative oxygen.
        </p>
      )}
    </LabFrame>
  );
}

const residueClasses = ['Nonpolar', 'Polar', 'Positive', 'Negative'] as const;
export function ProteinLab({ sim, preview }: Props) {
  const [angle, setAngle] = useState(30),
    [compact, setCompact] = useState(50),
    [cutoff, setCutoff] = useState(2),
    [selected, setSelected] = useState(8),
    [highlight, setHighlight] = useState('All residues');
  const points = chainCoordinates(compact),
    radians = (angle * Math.PI) / 180;
  const projected = points.map((p) => ({
    x: 320 + (p.x * Math.cos(radians) + p.z * Math.sin(radians)) * 35,
    y: 155 + p.y * 30,
    depth: p.z * Math.cos(radians) - p.x * Math.sin(radians),
  }));
  const contacts = chainContacts(points, cutoff),
    className = residueClasses[(selected - 1) % 4];
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `Rotation ${angle}°; compaction ${compact}; cutoff ${cutoff}; residue ${selected}; ${highlight}`,
        result: `${contacts} nonlocal contacts in arbitrary units; ${className} residue category`,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Slider
            label="Protein view rotation"
            value={angle}
            min={0}
            max={360}
            unit="degrees"
            set={setAngle}
          />
          <Slider label="Schematic compaction" value={compact} min={0} max={100} set={setCompact} />
          <Slider
            label="Geometric contact cutoff"
            value={cutoff}
            min={0.5}
            max={4}
            step={0.1}
            unit="arbitrary units"
            set={setCutoff}
          />
          <Slider label="Selected residue" value={selected} min={1} max={24} set={setSelected} />
          <Selector
            label="Highlight residue class"
            value={highlight}
            options={['All residues', ...residueClasses]}
            set={setHighlight}
          />
        </div>
      )}
      <Plot
        label={`Synthetic 24-residue chain, rotated ${angle} degrees; ${contacts} nonlocal contacts`}
      >
        <polyline
          className="subject-line"
          points={projected.map((p) => `${p.x},${p.y}`).join(' ')}
        />
        {projected.map((p, i) => (
          <g
            key={i}
            opacity={
              i + 1 === selected ||
              i === 0 ||
              i === 23 ||
              highlight === 'All residues' ||
              highlight === residueClasses[i % 4]
                ? 1
                : 0.2
            }
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={i + 1 === selected ? 10 : 6}
              className={i + 1 === selected ? 'subject-point' : 'subject-fill'}
            />
            {(i === 0 || i === 23 || i + 1 === selected) && (
              <text x={p.x + 10} y={p.y - 10}>
                {i === 0 ? 'N' : i === 23 ? 'C' : `Residue ${i + 1}`}
              </text>
            )}
          </g>
        ))}
        <text x="40" y="280">
          N → C backbone trace · generic coordinates
        </text>
        <text x="40" y="305">
          Rotation preserves connectivity; compaction changes coordinates.
        </text>
      </Plot>
      {!preview && (
        <div className="subject-region-controls">
          {residueClasses.map((s, i) => (
            <button
              className="button button-small button-glass"
              key={s}
              onClick={() => {
                setHighlight(s);
                setSelected(i + 1);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="subject-metrics">
        <Metric label="Nonlocal geometric contacts" value={String(contacts)} />
        <Metric label={`Residue ${selected} category`} value={className} />
      </div>
      <p className="subject-focus">
        {className === 'Nonpolar'
          ? 'Nonpolar groups often participate in buried packing in soluble proteins; lipid-facing surfaces can differ.'
          : className === 'Polar'
            ? 'Polar groups may donate or accept hydrogen bonds when chemistry and geometry permit.'
            : className === 'Positive'
              ? 'Positive charge depends on protonation and context; screening and partners affect interactions.'
              : 'Negative charge depends on protonation and context; a projected neighbor is not proof of a salt bridge.'}
      </p>
      <p>
        Original synthetic chain, not a PDB structure, HA sequence, secondary-structure assignment,
        or energy minimization. Categories repeat illustratively and are not amino-acid identities.
        A contact is a pair at least three sequence positions apart with 3D distance below the
        chosen arbitrary cutoff. Camera rotation must not change the count; compaction and cutoff
        can. Contact count is not stability, a bond count, or function. Consult the real coordinate
        source and assembly for molecular claims.
      </p>
    </LabFrame>
  );
}

export function GeneticsLab({ sim, preview }: Props) {
  const [p1, setP1] = useState('Aa'),
    [p2, setP2] = useState('Aa'),
    [dominance, setDominance] = useState('Complete dominance'),
    [p, setP] = useState(0.7);
  const result = cross(p1, p2),
    q = 1 - p,
    expected = [p * p, 2 * p * q, q * q];
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `${p1} × ${p2}; ${dominance}; population p=${p}`,
        result: `Cross AA=${f(result.AA)}, Aa=${f(result.Aa)}, aa=${f(result.aa)}; population 2pq=${f(expected[1])}`,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Selector
            label="First parent genotype"
            value={p1}
            options={['AA', 'Aa', 'aa']}
            set={setP1}
          />
          <Selector
            label="Second parent genotype"
            value={p2}
            options={['AA', 'Aa', 'aa']}
            set={setP2}
          />
          <Selector
            label="Phenotype model"
            value={dominance}
            options={['Complete dominance', 'Incomplete dominance']}
            set={setDominance}
          />
          <Slider
            label="Population allele A frequency"
            value={p}
            min={0}
            max={1}
            step={0.01}
            set={setP}
          />
        </div>
      )}
      <Plot
        label={`Punnett square ${p1} by ${p2}; AA ${result.AA}, Aa ${result.Aa}, aa ${result.aa}`}
      >
        <text x="80" y="35">
          Independent one-locus cross · each cell has probability 1/4
        </text>
        {[...p2].map((a, i) => (
          <text key={i} x={280 + i * 140} y="75">
            Gamete {a}
          </text>
        ))}
        {[...p1].map((a, i) => (
          <text key={i} x="85" y={145 + i * 100}>
            Gamete {a}
          </text>
        ))}
        {result.cells.map((g, i) => (
          <g key={i}>
            <rect
              className="subject-box"
              x={235 + (i % 2) * 140}
              y={95 + Math.floor(i / 2) * 100}
              width="135"
              height="95"
            />
            <text x={285 + (i % 2) * 140} y={145 + Math.floor(i / 2) * 100}>
              {g}
            </text>
            <text x={280 + (i % 2) * 140} y={170 + Math.floor(i / 2) * 100}>
              25%
            </text>
          </g>
        ))}
      </Plot>
      <div className="subject-metrics">
        <Metric
          label="Cross genotype probabilities"
          value={`AA ${f(result.AA)} · Aa ${f(result.Aa)} · aa ${f(result.aa)}`}
        />
        <Metric
          label="Phenotype probabilities"
          value={
            dominance === 'Complete dominance'
              ? `A-like ${f(result.AA + result.Aa)}; recessive ${f(result.aa)}`
              : `A-like ${f(result.AA)}; intermediate ${f(result.Aa)}; recessive ${f(result.aa)}`
          }
        />
      </div>
      <Plot
        label={`Hardy–Weinberg expectations at p=${p}: ${expected.map((n) => f(n)).join(', ')}`}
      >
        <Axes
          x="Population genotype (separate from selected parents)"
          y="Expected frequency (0–1)"
        />
        {expected.map((n, i) => (
          <g key={i}>
            <rect
              className="subject-fill"
              x={130 + i * 150}
              y={280 - n * 220}
              width="80"
              height={n * 220}
            />
            <text x={140 + i * 150} y="302">
              {['AA', 'Aa', 'aa'][i]}
            </text>
            <text x={140 + i * 150} y={265 - n * 220}>
              {f(n)}
            </text>
          </g>
        ))}
      </Plot>
      <p>
        The cross assumes one autosomal locus, equal segregation, random fertilization, and no
        viability differences. Dominance changes phenotype interpretation, not genotype
        transmission. Population bars independently use p², 2pq, q² under Hardy–Weinberg
        assumptions; they are not offspring of the chosen parent pair and are not a simulation of
        evolution. Probabilities are expectations, not exact family quotas. No clinical or forensic
        inference is made.
      </p>
    </LabFrame>
  );
}

export function HydrologyLab({ sim, preview }: Props) {
  const [mode, setMode] = useState(
      sim.topic === 7 ? 'Darcy groundwater' : 'Rainfall and hydrograph',
    ),
    [rain, setRain] = useState(20),
    [area, setArea] = useState(2),
    [fraction, setFraction] = useState(0.3),
    [duration, setDuration] = useState(4),
    [k, setK] = useState(0.001),
    [flowArea, setFlowArea] = useState(10),
    [drop, setDrop] = useState(2),
    [length, setLength] = useState(100);
  const event = runoff(rain, area, fraction, duration),
    ground = darcy(k, flowArea, drop, length);
  const result =
    mode === 'Darcy groundwater'
      ? `Q=${f(ground.flow, 5)} m³/s; i=${f(ground.gradient)}`
      : `Runoff ${f(event.volume, 5)} m³; peak ${f(event.peak)} m³/s`;
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={{
        settings: `${mode}; rain=${rain}; area=${area}; fraction=${fraction}; duration=${duration}; K=${k}; A=${flowArea}; Δh=${drop}; L=${length}`,
        result,
      }}
    >
      {!preview && (
        <div className="subject-controls">
          <Selector
            label="Hydrology investigation"
            value={mode}
            options={['Rainfall and hydrograph', 'Darcy groundwater']}
            set={setMode}
          />
          {mode === 'Rainfall and hydrograph' ? (
            <>
              <Slider
                label="Rainfall depth"
                value={rain}
                min={5}
                max={100}
                step={5}
                unit="mm"
                set={setRain}
              />
              <Slider
                label="Basin area"
                value={area}
                min={0.5}
                max={10}
                step={0.5}
                unit="km²"
                set={setArea}
              />
              <Slider
                label="Direct runoff fraction"
                value={fraction}
                min={0.1}
                max={0.9}
                step={0.05}
                set={setFraction}
              />
              <Slider
                label="Event duration"
                value={duration}
                min={1}
                max={12}
                step={0.5}
                unit="h"
                set={setDuration}
              />
            </>
          ) : (
            <>
              <Slider
                label="Hydraulic conductivity"
                value={k}
                min={0.0001}
                max={0.01}
                step={0.0001}
                unit="m/s"
                set={setK}
              />
              <Slider
                label="Flow cross-section"
                value={flowArea}
                min={1}
                max={50}
                unit="m²"
                set={setFlowArea}
              />
              <Slider
                label="Head drop"
                value={drop}
                min={0.5}
                max={10}
                step={0.5}
                unit="m"
                set={setDrop}
              />
              <Slider
                label="Flow length"
                value={length}
                min={10}
                max={200}
                step={10}
                unit="m"
                set={setLength}
              />
            </>
          )}
        </div>
      )}
      <Plot label={`${mode}: ${result}`}>
        {mode === 'Rainfall and hydrograph' ? (
          <>
            <Axes x="Time (0–12 h)" y="Discharge (0–500 m³/s, fixed scale)" />
            <path
              className="subject-line"
              d={`M70 280L${70 + (duration / 24) * 520} ${280 - (event.peak / 500) * 240}L${70 + (duration / 12) * 520} 280L590 280`}
            />
            {[0, 3, 6, 9, 12].map((n) => (
              <text x={65 + (n / 12) * 520} y="302" key={n}>
                {n}
              </text>
            ))}
            <text x="20" y="45">
              500
            </text>
            <text x="42" y="285">
              0
            </text>
            <text x="230" y="60">
              Area under curve = runoff volume
            </text>
          </>
        ) : (
          <>
            <rect className="subject-box" x="90" y="115" width="460" height="145" />
            {Array.from({ length: 35 }, (_, i) => (
              <circle
                key={i}
                cx={110 + (i % 7) * 65}
                cy={135 + Math.floor(i / 7) * 26}
                r="3"
                className="subject-fill"
                opacity=".4"
              />
            ))}
            <path
              className="subject-line"
              d={`M110 ${110 - drop * 4}L530 110M200 185H450L430 175M450 185L430 195`}
            />
            <text x="95" y="50">
              Higher head
            </text>
            <text x="425" y="85">
              Lower head
            </text>
            <text x="245" y="210">
              Flow →
            </text>
            <text x="110" y="285">
              L = {length} m · Δh = {drop} m
            </text>
            <text x="110" y="310">
              Homogeneous saturated medium; schematic geometry
            </text>
          </>
        )}
      </Plot>
      <div className="subject-metrics">
        <Metric label="Model result" value={result} />
        {mode === 'Rainfall and hydrograph' && (
          <Metric
            label="Integral check: ½ × duration × peak"
            value={`${f(0.5 * duration * 3600 * event.peak, 5)} m³`}
          />
        )}
      </div>
      <p>
        {mode === 'Rainfall and hydrograph'
          ? 'V = rainfall(mm) × area(km²) × 1000 × fraction. A triangular direct-runoff hydrograph has peak 2V/(duration×3600). Zero baseflow; event response is not a calibrated catchment forecast. The fixed 500 m³/s scale includes all bounded settings. No sediment or flood-probability prediction is made.'
          : 'Darcy Q=K A Δh/L, directed toward lower head. Homogeneous one-dimensional saturated flow with suitable laminar behavior. Q/A is Darcy flux, not pore-water velocity. No well yield, karst-conduit turbulence, dispersion, or contaminant travel time is inferred.'}
      </p>
    </LabFrame>
  );
}

export function GasPathPanel({
  preview = false,
  onSnapshot,
}: {
  preview?: boolean;
  onSnapshot?: Dispatch<SetStateAction<{ settings: string; result: string }>>;
}) {
  const [path, setPath] = useState<GasPath>('isothermal'),
    [ratio, setRatio] = useState(2),
    [tr, setTr] = useState(1.5);
  const g = gasProcess(path, ratio, tr);
  useEffect(() => {
    const state = gasProcess(path, ratio, tr);
    onSnapshot?.({
      settings: `${path}; volume ratio ${ratio}; temperature ratio ${tr}`,
      result: `T2=${f(state.t2)}K; Wby=${f(state.work)}J; Q=${f(state.heat)}J; change U=${f(state.du)}J`,
    });
  }, [path, ratio, tr, onSnapshot]);
  const points = Array.from({ length: 101 }, (_, i) => {
    const v = path === 'isochoric' ? g.v1 : g.v1 + ((g.v2 - g.v1) * i) / 100;
    const p =
      path === 'isochoric'
        ? g.p1 + ((g.p2 - g.p1) * i) / 100
        : path === 'isobaric'
          ? g.p1
          : path === 'isothermal'
            ? (g.p1 * g.v1) / v
            : g.p1 * (g.v1 / v) ** (5 / 3);
    return `${i ? 'L' : 'M'}${70 + ((v - 0.01) / 0.03) * 520},${280 - (p / 800000) * 240}`;
  }).join(' ');
  return (
    <>
      {!preview && (
        <div className="subject-controls">
          <Selector
            label="Gas process"
            value={path}
            options={['isothermal', 'isobaric', 'isochoric', 'adiabatic']}
            set={(v) => setPath(v as GasPath)}
          />
          {path === 'isochoric' ? (
            <Slider
              label="Final temperature ratio"
              value={tr}
              min={0.5}
              max={3}
              step={0.1}
              set={setTr}
            />
          ) : (
            <Slider
              label="Final volume ratio"
              value={ratio}
              min={1}
              max={4}
              step={0.1}
              set={setRatio}
            />
          )}
        </div>
      )}
      <Plot label={`${path} gas path: work ${f(g.work)} J, heat ${f(g.heat)} J`}>
        <Axes x="Volume (0.010–0.040 m³)" y="Pressure (0–800 kPa)" />
        <path className="subject-line" d={points} />
        {[0.01, 0.02, 0.03, 0.04].map((v) => (
          <text key={v} x={55 + ((v - 0.01) / 0.03) * 520} y="302">
            {v.toFixed(3)}
          </text>
        ))}
        <text x="20" y="45">
          800
        </text>
        <text x="40" y="285">
          0
        </text>
        <text x="250" y="60">
          One mole · initial 300 K
        </text>
        <circle
          className="subject-point"
          r="6"
          cx={70 + ((g.v2 - 0.01) / 0.03) * 520}
          cy={280 - (g.p2 / 800000) * 240}
        />
      </Plot>
      <div className="subject-metrics">
        <Metric label="Final temperature" value={`${f(g.t2)} K`} />
        <Metric label="Work by gas" value={`${f(g.work, 5)} J`} />
        <Metric label="Heat into gas" value={`${f(g.heat, 5)} J`} />
        <Metric label="Internal-energy change" value={`${f(g.du, 5)} J`} />
        <Metric label="Gas entropy change" value={`${f(g.entropy)} J/K`} />
      </div>
      <p>
        Ideal monatomic gas, n=1 mol, T₁=300 K, V₁=0.010 m³, R={gasR} J/(mol K), Cv=3R/2, γ=5/3.
        Quasistatic reversible paths. ΔU=nCvΔT; ΔU=Q−Wby. Isothermal Wby=nRT ln(V₂/V₁); isobaric
        Wby=PΔV; isochoric Wby=0; reversible adiabatic Q=0. Fixed axes permit comparison; no actual
        piston apparatus or engine cycle is simulated.
      </p>
    </>
  );
}
export function ThermodynamicsLab({ sim, preview }: Props) {
  const [mode, setMode] = useState(
      sim.topic === 2 || sim.topic === 3 || sim.topic === 4
        ? 'Heating and phases'
        : sim.topic === 8 || sim.topic === 9
          ? 'Carnot limits'
          : 'Gas paths',
    ),
    [mass, setMass] = useState(0.2),
    [specificEnergy, setSpecificEnergy] = useState(500),
    [hot, setHot] = useState(600),
    [cold, setCold] = useState(300);
  const [gasSnapshot, setGasSnapshot] = useState({
    settings: 'isothermal; volume ratio 2',
    result: 'Work 1729 J; heat 1729 J; change U 0 J',
  });
  const e = mass * specificEnergy,
    h = waterHeating(mass, e),
    eta = 1 - cold / hot,
    cop = cold / (hot - cold);
  const result =
    mode === 'Heating and phases'
      ? `${f(e, 5)} kJ; ${f(h.temperature)} °C; ${h.phase}`
      : mode === 'Carnot limits'
        ? `η=${f(eta)}; COPref=${f(cop)}; COPheat=${f(cop + 1)}`
        : 'See gas-path heat, work, and state values above; record their values in your explanation.';
  return (
    <LabFrame
      sim={sim}
      preview={preview}
      snapshot={
        mode === 'Gas paths'
          ? gasSnapshot
          : {
              settings: `${mode}; mass ${mass}kg; specific energy ${specificEnergy}kJ/kg; Th=${hot}K; Tc=${cold}K`,
              result,
            }
      }
    >
      {!preview && (
        <div className="subject-controls">
          <Selector
            label="Thermodynamics investigation"
            value={mode}
            options={['Gas paths', 'Heating and phases', 'Carnot limits']}
            set={setMode}
          />
        </div>
      )}
      {mode === 'Gas paths' ? (
        <GasPathPanel preview={preview} onSnapshot={setGasSnapshot} />
      ) : mode === 'Heating and phases' ? (
        <>
          {!preview && (
            <div className="subject-controls">
              <Slider
                label="Water mass"
                value={mass}
                min={0.1}
                max={1}
                step={0.1}
                unit="kg"
                set={setMass}
              />
              <Slider
                label="Energy per mass"
                value={specificEnergy}
                min={0}
                max={3100}
                step={1}
                unit="kJ/kg"
                set={setSpecificEnergy}
              />
            </div>
          )}
          <Plot label={`Water heating: ${h.phase}, ${f(h.temperature)} degrees Celsius`}>
            <Axes x="Total added energy (0–3100 kJ, fixed scale)" y="Temperature (−20 to 130 °C)" />
            <path
              className="subject-line"
              d={Array.from(
                { length: 311 },
                (_, i) =>
                  `${i ? 'L' : 'M'}${70 + ((i * 10 * mass) / 3100) * 520},${280 - ((waterHeating(1, i * 10).temperature + 20) / 150) * 240}`,
              ).join(' ')}
            />
            {[0, 1000, 2000, 3000].map((v) => (
              <text key={v} x={60 + (v / 3100) * 520} y="302">
                {v}
              </text>
            ))}
            <text x="22" y="45">
              130
            </text>
            <text x="22" y="285">
              −20
            </text>
            <circle
              className="subject-point"
              r="6"
              cx={70 + (e / 3100) * 520}
              cy={280 - ((h.temperature + 20) / 150) * 240}
            />
            <text x="200" y="60">
              Start: ice at −20 °C · about 1 atm
            </text>
          </Plot>
          <div className="subject-metrics">
            <Metric label="Total input energy" value={`${f(e, 5)} kJ`} />
            <Metric label="State" value={`${h.phase}: ${f(h.temperature)} °C`} />
            {h.fraction !== null && (
              <Metric
                label="Fraction converted within transition"
                value={`${f(h.fraction * 100)}%`}
              />
            )}
          </div>
          <p>
            Rounded constants in kJ/(kg K): ice c=2.1, water c=4.18, vapor c=2.0; latent fusion 334
            kJ/kg and vaporization 2260 kJ/kg. Cumulative breakpoints per kg: 42, 376, 794, 3054
            kJ/kg. Constant-pressure equilibrium approximation, no heat losses or heating-time
            prediction. Mass changes total energy at the same selected energy per mass; the fixed
            total-energy axis exposes this scaling.
          </p>
        </>
      ) : (
        <>
          {!preview && (
            <div className="subject-controls">
              <Slider
                label="Hot reservoir temperature"
                value={hot}
                min={500}
                max={1000}
                step={10}
                unit="K"
                set={setHot}
              />
              <Slider
                label="Cold reservoir temperature"
                value={cold}
                min={200}
                max={450}
                step={10}
                unit="K"
                set={setCold}
              />
            </div>
          )}
          <Plot label={`Carnot limit efficiency ${f(eta)}; refrigerator COP ${f(cop)}`}>
            <rect className="subject-box" x="60" y="45" width="180" height="65" />
            <text x="85" y="80">
              Hot: {hot} K
            </text>
            <rect className="subject-box" x="60" y="230" width="180" height="65" />
            <text x="85" y="265">
              Cold: {cold} K
            </text>
            <circle className="subject-box" cx="360" cy="170" r="65" />
            <text x="325" y="175">
              Engine
            </text>
            <path
              className="subject-line"
              d="M240 80L325 115M325 225L240 255M425 170H570L550 160M570 170L550 180"
            />
            <text x="270" y="75">
              Qh in
            </text>
            <text x="265" y="285">
              Qc out
            </text>
            <text x="465" y="145">
              Work out
            </text>
            <text x="425" y="310">
              W = Qh − Qc
            </text>
          </Plot>
          <div className="subject-metrics">
            <Metric label="Maximum engine efficiency" value={`${f(eta * 100)}%`} />
            <Metric label="Reversible refrigerator COP" value={f(cop)} />
            <Metric label="Reversible heat-pump COP" value={f(cop + 1)} />
          </div>
          <p>
            η=1−Tc/Th; COPref=Tc/(Th−Tc); COPheat=Th/(Th−Tc). Reversible bounds between ideal fixed
            reservoirs, temperatures in Kelvin. Controls keep Th&gt;Tc. Diagram arrows show engine
            magnitudes; refrigerators reverse the heat-moving purpose and require work input. COP
            above one means heat moved per work input, not energy creation. Real equipment has
            additional losses and constraints.
          </p>
        </>
      )}
    </LabFrame>
  );
}
