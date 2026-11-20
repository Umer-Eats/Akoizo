'use client';
import { useState, type ReactNode } from 'react';
import type { WidgetId } from '@/lib/presentation-types';

// Small hands-on models for "explore" slides. Each widget keeps its own state, so in a live
// session every student experiments independently while the host talks through the prompt.

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => v.toFixed(2),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  return (
    <label className="pw-slider">
      <span>
        {label} <output>{format(value)}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

const Readout = ({ items }: { items: [string, ReactNode][] }) => (
  <dl className="pw-readout">
    {items.map(([label, value]) => (
      <div key={label}>
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    ))}
  </dl>
);

const Bar = ({
  label,
  value,
  max,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  tone: string;
}) => (
  <div className="pw-bar">
    <span>{label}</span>
    <div className="pw-bar-track">
      <div
        className={`pw-bar-fill ${tone}`}
        style={{ width: `${Math.max(0, Math.min(1, value / max)) * 100}%` }}
      />
    </div>
    <span>{value.toFixed(value >= 10 ? 0 : 2)}</span>
  </div>
);

const ndviOf = (nir: number, red: number) => (nir + red > 0 ? (nir - red) / (nir + red) : null);

function Ndvi() {
  const [nir, setNir] = useState(0.6);
  const [red, setRed] = useState(0.2);
  const [blue, setBlue] = useState(0.1);
  const ndvi = ndviOf(nir, red);
  const denominator = nir + 6 * red - 7.5 * blue + 1;
  const evi = Math.abs(denominator) > 1e-6 ? (2.5 * (nir - red)) / denominator : null;
  return (
    <div className="pw-grid">
      <div>
        <Slider label="NIR reflectance" value={nir} min={0} max={1} step={0.01} onChange={setNir} />
        <Slider label="Red reflectance" value={red} min={0} max={1} step={0.01} onChange={setRed} />
        <Slider
          label="Blue reflectance"
          value={blue}
          min={0}
          max={0.5}
          step={0.01}
          onChange={setBlue}
        />
      </div>
      <div>
        <Bar label="Blue" value={blue} max={1} tone="pd-b" />
        <Bar label="Red" value={red} max={1} tone="pd-r" />
        <Bar label="NIR" value={nir} max={1} tone="pd-nir" />
        <Readout
          items={[
            ['NDVI = (NIR − red)/(NIR + red)', ndvi === null ? 'undefined' : ndvi.toFixed(3)],
            [
              'EVI = 2.5(NIR − red)/(NIR + 6red − 7.5blue + 1)',
              evi === null ? 'check inputs' : evi.toFixed(3),
            ],
          ]}
        />
      </div>
    </div>
  );
}

function PulseRange() {
  const [micro, setMicro] = useState(8);
  const roundTrip = 3e8 * micro * 1e-6;
  return (
    <div className="pw-grid">
      <div>
        <Slider
          label="Round-trip time"
          value={micro}
          min={1}
          max={20}
          step={0.5}
          onChange={setMicro}
          format={(v) => `${v} µs`}
        />
        <Readout
          items={[
            ['Time in seconds', `${micro} × 10⁻⁶ s`],
            ['Round-trip distance c·t', `${roundTrip.toLocaleString()} m`],
            ['One-way range c·t ⁄ 2', `${(roundTrip / 2).toLocaleString()} m`],
          ]}
        />
      </div>
      <svg viewBox="0 0 200 220" className="pw-figure" role="img" aria-label="Pulse path to target">
        <rect x="80" y="8" width="40" height="18" rx="4" className="pd-accent" />
        <line
          x1="92"
          y1="28"
          x2="92"
          y2={40 + (micro / 20) * 160}
          className="pd-ink"
          strokeWidth={2}
        />
        <line
          x1="108"
          y1={40 + (micro / 20) * 160}
          x2="108"
          y2="28"
          className="pd-ink"
          strokeWidth={2}
          strokeDasharray="5 4"
        />
        <rect x="40" y={40 + (micro / 20) * 160} width="120" height="10" className="pd-soil" />
        <text x="100" y="215" textAnchor="middle" className="pd-text pd-small">
          {(roundTrip / 2).toLocaleString()} m
        </text>
      </svg>
    </div>
  );
}

function MixedPixelWidget() {
  const [fraction, setFraction] = useState(0.5);
  const veg = { nir: 0.6, red: 0.1 };
  const soil = { nir: 0.3, red: 0.2 };
  const nir = fraction * veg.nir + (1 - fraction) * soil.nir;
  const red = fraction * veg.red + (1 - fraction) * soil.red;
  const ndvi = ndviOf(nir, red)!;
  const curve = Array.from({ length: 21 }, (_, i) => {
    const f = i / 20;
    const n = ndviOf(f * veg.nir + (1 - f) * soil.nir, f * veg.red + (1 - f) * soil.red)!;
    return `${i ? 'L' : 'M'}${20 + f * 160} ${150 - n * 140}`;
  }).join(' ');
  return (
    <div className="pw-grid">
      <div>
        <Slider
          label="Vegetation fraction f"
          value={fraction}
          min={0}
          max={1}
          step={0.05}
          onChange={setFraction}
        />
        <div className="pw-pixel" aria-hidden="true">
          {Array.from({ length: 100 }, (_, i) => (
            <span key={i} className={i < Math.round(fraction * 100) ? 'pd-veg' : 'pd-soil'} />
          ))}
        </div>
        <p className="pw-note">Vegetation NIR 0.6 / red 0.1 · Soil NIR 0.3 / red 0.2</p>
      </div>
      <div>
        <Bar label="Mixed red" value={red} max={1} tone="pd-r" />
        <Bar label="Mixed NIR" value={nir} max={1} tone="pd-nir" />
        <Readout items={[['NDVI of mixed bands', ndvi.toFixed(3)]]} />
        <svg
          viewBox="0 0 200 170"
          className="pw-figure"
          role="img"
          aria-label="NDVI as vegetation fraction changes"
        >
          <path d="M20 10 L20 150 L180 150" className="pd-ink" fill="none" strokeWidth={1.5} />
          <path d="M20 136 L180 10" className="pd-ink pd-dash" fill="none" strokeWidth={1} />
          <path d={curve} className="pd-veg-line" fill="none" strokeWidth={3} />
          <circle cx={20 + fraction * 160} cy={150 - ndvi * 140} r="5" className="pd-accent" />
          <text x="100" y="166" textAnchor="middle" className="pd-text pd-small">
            vegetation fraction →
          </text>
        </svg>
      </div>
    </div>
  );
}

function Albedo() {
  const [flux, setFlux] = useState(400);
  const [albedo, setAlbedo] = useState(0.2);
  return (
    <div className="pw-grid">
      <div>
        <Slider
          label="Incoming shortwave"
          value={flux}
          min={100}
          max={1000}
          step={10}
          onChange={setFlux}
          format={(v) => `${v} W/m²`}
        />
        <Slider label="Albedo α" value={albedo} min={0} max={1} step={0.05} onChange={setAlbedo} />
        <p className="pw-note">Fresh snow ≈ 0.8 · desert ≈ 0.35 · forest ≈ 0.15 · ocean ≈ 0.06</p>
      </div>
      <div>
        <Bar label="Reflected" value={flux * albedo} max={1000} tone="pd-cool" />
        <Bar label="Absorbed" value={flux * (1 - albedo)} max={1000} tone="pd-warm" />
        <Readout
          items={[
            ['Reflected = α × S', `${(flux * albedo).toFixed(0)} W/m²`],
            ['Absorbed = (1 − α) × S', `${(flux * (1 - albedo)).toFixed(0)} W/m²`],
          ]}
        />
      </div>
    </div>
  );
}

function SnellWidget() {
  const [n1, setN1] = useState(1);
  const [n2, setN2] = useState(1.5);
  const [angle, setAngle] = useState(30);
  const sine = (n1 / n2) * Math.sin((angle * Math.PI) / 180);
  const refracted = sine <= 1 ? (Math.asin(sine) * 180) / Math.PI : null;
  const critical = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const media = [1, 1.33, 1.5];
  return (
    <div className="pw-grid">
      <div>
        <div className="pw-choices" role="group" aria-label="Medium 1 refractive index">
          <span>n₁</span>
          {media.map((n) => (
            <button key={n} aria-pressed={n1 === n} onClick={() => setN1(n)}>
              {n}
            </button>
          ))}
        </div>
        <div className="pw-choices" role="group" aria-label="Medium 2 refractive index">
          <span>n₂</span>
          {media.map((n) => (
            <button key={n} aria-pressed={n2 === n} onClick={() => setN2(n)}>
              {n}
            </button>
          ))}
        </div>
        <Slider
          label="Angle from normal θ₁"
          value={angle}
          min={0}
          max={89}
          step={1}
          onChange={setAngle}
          format={(v) => `${v}°`}
        />
        <Readout
          items={[
            ['sin θ₂ = (n₁/n₂) sin θ₁', sine.toFixed(3)],
            [
              'θ₂',
              refracted === null ? 'none: total internal reflection' : `${refracted.toFixed(1)}°`,
            ],
            ...(critical === null
              ? []
              : ([['Critical angle', `${critical.toFixed(1)}°`]] as [string, string][])),
          ]}
        />
      </div>
      <svg viewBox="0 0 200 200" className="pw-figure" role="img" aria-label="Ray diagram">
        <rect x="0" y="100" width="200" height="100" className="pd-water pd-soft" />
        <line x1="0" y1="100" x2="200" y2="100" className="pd-ink" strokeWidth={1.5} />
        <line x1="100" y1="0" x2="100" y2="200" className="pd-ink pd-dash" strokeWidth={1} />
        <line
          x1={100 - 90 * Math.sin(rad(angle))}
          y1={100 - 90 * Math.cos(rad(angle))}
          x2="100"
          y2="100"
          className="pd-ink"
          strokeWidth={2.5}
        />
        {refracted === null ? (
          <line
            x1="100"
            y1="100"
            x2={100 + 90 * Math.sin(rad(angle))}
            y2={100 - 90 * Math.cos(rad(angle))}
            className="pd-warm-line"
            strokeWidth={2.5}
          />
        ) : (
          <line
            x1="100"
            y1="100"
            x2={100 + 90 * Math.sin(rad(refracted))}
            y2={100 + 90 * Math.cos(rad(refracted))}
            className="pd-accent-line"
            strokeWidth={2.5}
          />
        )}
        <text x="6" y="16" className="pd-text pd-small">
          n₁ = {n1}
        </text>
        <text x="6" y="192" className="pd-text pd-small">
          n₂ = {n2}
        </text>
      </svg>
    </div>
  );
}

const surfaces = [
  { name: 'Healthy crop', blue: 0.04, green: 0.1, red: 0.05, nir: 0.5 },
  { name: 'Bare soil', blue: 0.12, green: 0.16, red: 0.2, nir: 0.26 },
  { name: 'Lake water', blue: 0.08, green: 0.06, red: 0.03, nir: 0.01 },
  { name: 'Concrete', blue: 0.25, green: 0.27, red: 0.28, nir: 0.3 },
];
const mappings = {
  'True color (R=red, G=green, B=blue)': ['red', 'green', 'blue'],
  'Color infrared (R=NIR, G=red, B=green)': ['nir', 'red', 'green'],
} as const;

function Composite() {
  const [mapping, setMapping] = useState<keyof typeof mappings>(
    'True color (R=red, G=green, B=blue)',
  );
  const [r, g, b] = mappings[mapping];
  const scale = (v: number) => Math.round(Math.min(1, v / 0.5) * 255);
  return (
    <div>
      <div className="pw-choices" role="group" aria-label="Band assignment">
        {(Object.keys(mappings) as (keyof typeof mappings)[]).map((key) => (
          <button key={key} aria-pressed={mapping === key} onClick={() => setMapping(key)}>
            {key}
          </button>
        ))}
      </div>
      <div className="pw-swatches">
        {surfaces.map((surface) => (
          <figure key={surface.name}>
            <span
              style={{
                background: `rgb(${scale(surface[r])},${scale(surface[g])},${scale(surface[b])})`,
              }}
              aria-hidden="true"
            />
            <figcaption>
              {surface.name}
              <small>
                B {surface.blue} · G {surface.green} · R {surface.red} · NIR {surface.nir}
              </small>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="pw-note">
        The reflectance numbers never change — only which band drives each screen color.
      </p>
    </div>
  );
}

function MapScaleWidget() {
  const [scale, setScale] = useState(50000);
  const [cm, setCm] = useState(3);
  const metres = (cm * scale) / 100;
  return (
    <div>
      <div className="pw-choices" role="group" aria-label="Map scale">
        {[10000, 24000, 50000, 100000, 250000].map((value) => (
          <button key={value} aria-pressed={scale === value} onClick={() => setScale(value)}>
            1:{value.toLocaleString()}
          </button>
        ))}
      </div>
      <Slider
        label="Distance on the map"
        value={cm}
        min={0.5}
        max={15}
        step={0.5}
        onChange={setCm}
        format={(v) => `${v} cm`}
      />
      <Readout
        items={[
          ['Ground distance (cm)', `${(cm * scale).toLocaleString()} cm`],
          [
            'Ground distance',
            metres >= 1000
              ? `${(metres / 1000).toLocaleString()} km`
              : `${metres.toLocaleString()} m`,
          ],
          ['1 cm on this map', `${(scale / 100).toLocaleString()} m`],
        ]}
      />
    </div>
  );
}

function BitDepth() {
  const [bits, setBits] = useState(3);
  const levels = 2 ** bits;
  const shown = Math.min(levels, 64);
  return (
    <div>
      <Slider
        label="Bit depth"
        value={bits}
        min={1}
        max={16}
        step={1}
        onChange={setBits}
        format={(v) => `${v}-bit`}
      />
      <div className="pw-ramp" aria-hidden="true">
        {Array.from({ length: shown }, (_, i) => (
          <span key={i} style={{ opacity: shown === 1 ? 1 : i / (shown - 1) }} />
        ))}
      </div>
      <Readout
        items={[
          ['Levels = 2^bits', levels.toLocaleString()],
          ['Brightest stored value', (levels - 1).toLocaleString()],
        ]}
      />
      {levels > 64 && <p className="pw-note">Showing 64 of {levels.toLocaleString()} levels.</p>}
    </div>
  );
}

const regions: [number, string][] = [
  [1e-8, 'X-ray / gamma'],
  [4e-7, 'Ultraviolet'],
  [7e-7, 'Visible'],
  [3e-6, 'Near/shortwave infrared'],
  [1e-3, 'Thermal infrared'],
  [1, 'Microwave (radar)'],
  [Infinity, 'Radio'],
];

function Wave() {
  const [exponent, setExponent] = useState(-6.3);
  const lambda = 10 ** exponent;
  const frequency = 3e8 / lambda;
  const energy = 6.626e-34 * frequency;
  const region = regions.find(([limit]) => lambda < limit)![1];
  const sci = (v: number, unit: string) => {
    const e = Math.floor(Math.log10(v));
    return `${(v / 10 ** e).toFixed(2)} × 10^${e} ${unit}`;
  };
  return (
    <div>
      <Slider
        label="Wavelength λ"
        value={exponent}
        min={-8}
        max={0}
        step={0.05}
        onChange={setExponent}
        format={() =>
          lambda < 1e-3
            ? `${(lambda * 1e9).toPrecision(3)} nm`
            : `${(lambda * 100).toPrecision(3)} cm`
        }
      />
      <Readout
        items={[
          ['Region', region],
          ['Frequency f = c/λ', sci(frequency, 'Hz')],
          ['Photon energy E = hf', sci(energy, 'J')],
        ]}
      />
      <button
        className="button button-small"
        onClick={() => setExponent((value) => Math.min(0, value + Math.log10(2)))}
      >
        Double the wavelength
      </button>
    </div>
  );
}

function Revisit() {
  const [opportunities, setOpportunities] = useState(4);
  const [cloud, setCloud] = useState(0.75);
  // A fixed pattern of cloudy passes so everyone in the room sees the same month.
  const cloudy = Array.from({ length: opportunities }, (_, i) => (i * 0.618) % 1 < cloud);
  const usable = cloudy.filter((c) => !c).length;
  return (
    <div>
      <Slider
        label="Scheduled passes this month"
        value={opportunities}
        min={1}
        max={30}
        step={1}
        onChange={setOpportunities}
        format={(v) => `${v}`}
      />
      <Slider
        label="Cloud cover"
        value={cloud}
        min={0}
        max={1}
        step={0.05}
        onChange={setCloud}
        format={(v) => `${Math.round(v * 100)}%`}
      />
      <div className="pw-passes" aria-hidden="true">
        {cloudy.map((c, i) => (
          <span key={i} className={c ? 'pd-cloud' : 'pd-veg'} title={c ? 'cloudy' : 'clear'} />
        ))}
      </div>
      <Readout
        items={[
          ['Nominal opportunities', String(opportunities)],
          ['Usable clear observations', String(usable)],
        ]}
      />
    </div>
  );
}

const widgets: Record<WidgetId, () => ReactNode> = {
  ndvi: Ndvi,
  'pulse-range': PulseRange,
  'mixed-pixel': MixedPixelWidget,
  albedo: Albedo,
  snell: SnellWidget,
  composite: Composite,
  'map-scale': MapScaleWidget,
  'bit-depth': BitDepth,
  wave: Wave,
  revisit: Revisit,
};

export function PresentationWidget({ id }: { id: WidgetId }) {
  const Widget = widgets[id];
  return (
    <div className="presentation-widget">
      <Widget />
    </div>
  );
}
