'use client';
import { useId, type ReactNode } from 'react';
import { calculateModel, modelControls, type ModelId } from '@/lib/lesson-models';
import { DiagramViewer } from './diagram-viewer';
import './scientific-model-art.css';

const p = 'var(--art-blue)',
  s = 'var(--art-rose)',
  w = 'var(--art-teal)';
const fmt = (v: number) => Number(v.toFixed(2)).toLocaleString('en-US');
const titles: Record<ModelId, string> = {
  airway: 'Inside an airway',
  ventilation: 'From conducting airways to gas exchange',
  diffusion: 'Across the exchange membrane',
  digestion: 'Lactose: hydrolysis and onward transit',
  density: 'Density and displacement',
  chromatography: 'Anatomy of a chromatogram',
  bloodstain: 'Reconstructing an impact angle',
  feedback: 'A feedback response, step by step',
  immune: 'Primary and memory response profiles',
  thermal: 'Temperature above threshold, accumulated over time',
};

function Label({
  x,
  y,
  children,
  tone,
  anchor = 'start',
}: {
  x: number;
  y: number;
  children: ReactNode;
  tone?: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={tone ?? 'var(--text)'} stroke="none">
      {children}
    </text>
  );
}
function Leader({ points, color = 'var(--muted)' }: { points: string; color?: string }) {
  return <polyline points={points} fill="none" stroke={color} strokeWidth="1.4" />;
}
function Dimension({
  x1,
  x2,
  y,
  label,
  color = p,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  color?: string;
}) {
  return (
    <g stroke={color} fill="none">
      <path d={`M${x1} ${y - 6}v12 M${x1} ${y}H${x2} M${x2} ${y - 6}v12`} />
      <Label x={(x1 + x2) / 2} y={y - 11} anchor="middle" tone={color}>
        {label}
      </Label>
    </g>
  );
}
function LungTree({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <g>
      <path
        d="M218 82C167 61 111 129 102 245Q94 308 121 322Q174 334 223 286Z M260 82C309 61 365 129 374 245Q382 308 355 322Q302 334 255 286Z"
        fill={p}
        fillOpacity={opacity}
        stroke={p}
        strokeWidth="2"
      />
      <path
        d="M237 48V132M237 125L177 189M237 125L298 189"
        fill="none"
        stroke={s}
        strokeWidth="14"
        strokeLinecap="round"
      />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M228 ${57 + i * 9}h18`} stroke="var(--surface)" strokeWidth="2" />
      ))}
      {[0, 1].map((side) => (
        <g key={side} transform={side ? 'translate(476 0) scale(-1 1)' : undefined}>
          <path
            d="M185 179L147 211M185 179L180 242M147 211L125 247M147 211L155 265M180 242L176 284M180 242L204 267"
            fill="none"
            stroke={s}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {[
            [125, 247],
            [155, 265],
            [176, 284],
            [204, 267],
          ].map(([x, y]) => (
            <g key={x}>
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx={x + Math.cos(i * 1.26) * 10}
                  cy={y + Math.sin(i * 1.26) * 10}
                  r="8"
                  fill={w}
                  fillOpacity=".25"
                  stroke={w}
                  strokeWidth="1"
                />
              ))}
            </g>
          ))}
        </g>
      ))}
      <path d="M98 343Q237 294 378 343" fill="none" stroke={w} strokeWidth="3" />
    </g>
  );
}

export function ScientificModelArt({
  model,
  values,
}: {
  model: ModelId;
  values: Record<string, number>;
}) {
  const id = useId().replace(/:/g, '');
  const v = Object.fromEntries(
    modelControls[model].map((c) => [
      c.key,
      Math.min(c.max, Math.max(c.min, Number.isFinite(values[c.key]) ? values[c.key] : c.initial)),
    ]),
  );
  const result = calculateModel(model, v);
  const fill = (tone: string) => `url(#${id}-${tone})`;
  let art: ReactNode;
  if (model === 'airway') {
    const r = v.radius * 0.58;
    art = (
      <>
        <Label x={40} y={34}>
          TRANSVERSE SECTION
        </Label>
        <circle cx="200" cy="207" r={r + 32} fill={fill('rose')} stroke={s} strokeWidth="2" />
        {Array.from({ length: 28 }, (_, i) => {
          const a = (i * Math.PI) / 14;
          return (
            <ellipse
              key={i}
              cx={200 + (r + 23) * Math.cos(a)}
              cy={207 + (r + 23) * Math.sin(a)}
              rx="7"
              ry="3"
              transform={`rotate(${(i * 180) / 14 + 90} ${200 + (r + 23) * Math.cos(a)} ${207 + (r + 23) * Math.sin(a)})`}
              fill={s}
              opacity=".65"
            />
          );
        })}
        <circle cx="200" cy="207" r={r + 9} fill="var(--surface)" stroke={p} strokeWidth="9" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i * Math.PI) / 18;
          return (
            <path
              key={i}
              d={`M${200 + (r + 4) * Math.cos(a)} ${207 + (r + 4) * Math.sin(a)}L${200 + (r - 2) * Math.cos(a)} ${207 + (r - 2) * Math.sin(a)}`}
              stroke={p}
              strokeWidth="1.4"
            />
          );
        })}
        <circle cx="200" cy="207" r={r - 3} fill={fill('blue')} />
        <circle cx="200" cy="207" r="58" fill="none" stroke="var(--muted)" strokeDasharray="5 5" />
        <Dimension x1={200} x2={200 + r} y={207} label="r" color={s} />
        <Leader points={`${200 + r + 25},190 365,106 447,106`} color={s} />
        <Label x={459} y={111} tone={s}>
          Smooth-muscle layer
        </Label>
        <Leader points={`${200 + r + 5},222 365,164 447,164`} color={p} />
        <Label x={459} y={169} tone={p}>
          Epithelial lining
        </Label>
        <Leader points="200,242 365,222 447,222" />
        <Label x={459} y={227}>
          Open lumen · radius {v.radius}%
        </Label>
        <path
          d="M460 284h220"
          stroke={p}
          strokeWidth={3 + Math.min(13, result.metrics[1].value * 2)}
          markerEnd={`url(#${id}-arrow)`}
        />
        <Label x={459} y={267} tone={p}>
          Flow {fmt(result.metrics[1].value)} × baseline
        </Label>
        <Label x={459} y={323}>
          Driving pressure: {v.pressure}%
        </Label>
        <Label x={40} y={380}>
          Dashed circle: baseline radius · Tissue layers are schematic.
        </Label>
      </>
    );
  } else if (model === 'ventilation') {
    const fresh = Math.max(0, v.tidal - v.dead);
    art = (
      <>
        <LungTree opacity={0.12 + fresh / 1800} />
        <Leader points="247,74 405,74 440,74" />
        <Label x={454} y={79} tone={s}>
          Trachea / conducting airways
        </Label>
        <Leader points="310,260 405,152 440,152" />
        <Label x={454} y={157} tone={w}>
          Alveolar exchange regions
        </Label>
        <Label x={454} y={202}>
          ONE BREATH · {v.tidal} mL
        </Label>
        <rect x="454" y="220" width="250" height="36" rx="5" fill="var(--line)" />
        <rect x="454" y="220" width={(250 * v.dead) / 900} height="36" fill={s} />
        <rect
          x={454 + (250 * v.dead) / 900}
          y="220"
          width={(250 * fresh) / 900}
          height="36"
          fill={p}
        />
        <Dimension x1={454} x2={704} y={282} label="Fixed scale: 0–900 mL" />
        <Label x={454} y={314} tone={s}>
          Dead space: {v.dead} mL
        </Label>
        <Label x={454} y={342} tone={p}>
          Fresh air: {fresh} mL
        </Label>
        <Label x={44} y={385}>
          {v.rate} breaths/min · Branches and alveolar clusters are illustrative.
        </Label>
      </>
    );
  } else if (model === 'diffusion') {
    const width = v.thickness * 0.3,
      height = 90 + v.area * 0.9;
    art = (
      <>
        <Label x={40} y={36} tone={p}>
          HIGHER PARTIAL PRESSURE
        </Label>
        <Label x={483} y={36} tone={w}>
          LOWER PARTIAL PRESSURE
        </Label>
        <rect x="35" y="65" width="240" height="250" rx="18" fill={fill('blue')} />
        <rect x="485" y="65" width="240" height="250" rx="18" fill={fill('teal')} />
        <rect
          x={380 - width / 2}
          y={190 - height / 2}
          width={width}
          height={height}
          rx="5"
          fill={fill('rose')}
          stroke={s}
          strokeWidth="2"
        />
        {Array.from({ length: Math.ceil(height / 18) }, (_, i) => (
          <path
            key={i}
            d={`M${380 - width / 2 + 3} ${190 - height / 2 + i * 18 + 8}h${width - 6}`}
            stroke={s}
            opacity=".35"
          />
        ))}
        {Array.from({ length: 6 + Math.ceil(v.gradient / 10) }, (_, i) => (
          <g key={i}>
            <circle
              cx={62 + (i % 5) * 43}
              cy={95 + Math.floor(i / 5) * 48}
              r="7"
              fill={fill('blue')}
              stroke={p}
            />
            <circle cx={64 + (i % 5) * 43} cy={93 + Math.floor(i / 5) * 48} r="2" fill={p} />
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={535 + (i % 2) * 83}
            cy={124 + Math.floor(i / 2) * 88}
            r="7"
            fill={w}
          />
        ))}
        {[135, 190, 245].map((y) => (
          <path
            key={y}
            d={`M290 ${y}H470`}
            stroke={p}
            strokeWidth="2"
            strokeDasharray="7 5"
            markerEnd={`url(#${id}-arrow)`}
          />
        ))}
        <Dimension
          x1={380 - width / 2}
          x2={380 + width / 2}
          y={335}
          label={`${v.thickness}% thickness`}
          color={s}
        />
        <Label x={38} y={372}>
          Gradient: {v.gradient}%
        </Label>
        <Label x={300} y={372}>
          Area: {v.area}%
        </Label>
        <Label x={483} y={372} tone={w}>
          Transfer: {fmt(result.metrics[0].value)}%
        </Label>
        <Label x={38} y={401}>
          Particles show a pressure difference; their number is illustrative.
        </Label>
      </>
    );
  } else if (model === 'digestion') {
    art = (
      <>
        <Label x={36} y={35}>
          SMALL INTESTINE · BRUSH BORDER
        </Label>
        <Label x={490} y={35}>
          ONWARD TO THE COLON
        </Label>
        <rect x="35" y="65" width="395" height="235" rx="16" fill={fill('blue')} />
        <path
          d="M35 292Q55 204 75 292Q95 204 115 292Q135 204 155 292Q175 204 195 292Q215 204 235 292Q255 204 275 292Q295 204 315 292Q335 204 355 292Q375 204 395 292H430V329H35Z"
          fill={fill('rose')}
          stroke={s}
          strokeWidth="2"
        />
        {[75, 155, 235, 315, 395].map((x) => (
          <g key={x}>
            <path d={`M${x - 8} 247v-12h16v12`} stroke={w} strokeWidth="3" fill="none" />
            <circle cx={x} cy="259" r="3" fill={s} />
          </g>
        ))}
        <g stroke={p} strokeWidth="2">
          <path d="M110 142h34" />
          <circle cx="105" cy="142" r="15" fill={fill('blue')} />
          <circle cx="149" cy="142" r="15" fill={fill('teal')} />
        </g>
        <path d="M182 142H239" stroke={p} strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
        <circle cx="275" cy="124" r="15" fill={fill('blue')} stroke={p} />
        <circle cx="324" cy="162" r="15" fill={fill('teal')} stroke={w} />
        <Label x={83} y={99}>
          Lactose
        </Label>
        <Label x={254} y={94} tone={p}>
          Glucose
        </Label>
        <Label x={298} y={205} tone={w}>
          Galactose
        </Label>
        <Leader points="395,236 451,213 474,213" />
        <Label x={490} y={218}>
          Lactase at the cell surface
        </Label>
        <path d="M456 112H501" stroke={s} strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
        <rect x="520" y="65" width="190" height="115" rx="22" fill={fill('rose')} stroke={s} />
        <Label x={615} y={111} anchor="middle">
          Unhydrolyzed
        </Label>
        <Label x={615} y={146} anchor="middle" tone={s}>
          {fmt(result.metrics[1].value)} g
        </Label>
        <Label x={490} y={276}>
          Load: {v.load} g
        </Label>
        <Label x={490} y={307}>
          Capacity: {v.capacity} g
        </Label>
        <Label x={36} y={370} tone={p}>
          Hydrolyzed: {fmt(result.metrics[0].value)} g lactose
        </Label>
        <Label x={36} y={400}>
          Molecules and villus detail illustrate the mechanism, not particle counts.
        </Label>
      </>
    );
  } else if (model === 'density') {
    const ratio = v.sample / v.liquid,
      neutral = Math.abs(ratio - 1) < 0.0001;
    const by = neutral ? 220 : ratio > 1 ? 288 : 155 - 62 * (1 - ratio);
    art = (
      <>
        <Label x={40} y={36}>
          IDEAL SAMPLE IN A LIQUID
        </Label>
        <path
          d="M94 78V340Q94 354 108 354H374Q388 354 388 340V78"
          fill={fill('glass')}
          stroke="var(--muted)"
          strokeWidth="2"
        />
        <rect x="97" y="155" width="288" height="195" fill={fill('teal')} />
        <ellipse cx="241" cy="155" rx="144" ry="8" fill={w} fillOpacity=".15" stroke={w} />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M105 ${174 + i * 17}h${i % 2 ? 12 : 22}`} stroke={w} opacity=".6" />
        ))}
        <rect
          x="201"
          y={by}
          width="80"
          height="62"
          rx="4"
          fill={fill('rose')}
          stroke={s}
          strokeWidth="2"
        />
        <path d={`M208 ${by + 8}h63`} stroke={s} opacity=".4" />
        <Leader points={`282,${by + 30} 426,110 463,110`} />
        <Label x={480} y={115} tone={s}>
          Sample: {fmt(v.sample)} g/mL
        </Label>
        <Leader points="385,155 426,178 463,178" color={w} />
        <Label x={480} y={183} tone={w}>
          Liquid: {fmt(v.liquid)} g/mL
        </Label>
        <Label x={480} y={248}>
          {neutral
            ? 'Neutral buoyancy'
            : ratio > 1
              ? 'Sinks to the bottom'
              : 'Floats at the surface'}
        </Label>
        <Label x={480} y={285}>
          {ratio < 1 ? `${fmt(ratio * 100)}% submerged` : 'Fully submerged'}
        </Label>
        <Label x={40} y={399}>
          Graduations are schematic; vertical position shows the ideal equilibrium state.
        </Label>
      </>
    );
  } else if (model === 'chromatography') {
    const front = 329 - v.front * 25,
      spot = 329 - v.front * v.rf * 25;
    art = (
      <>
        <Label x={36} y={34}>
          PAPER / STATIONARY PHASE
        </Label>
        <rect
          x="176"
          y="55"
          width="230"
          height="296"
          rx="5"
          fill={fill('glass')}
          stroke="var(--muted)"
        />
        <rect x="178" y={front} width="226" height={329 - front} fill={fill('teal')} />
        {Array.from({ length: 24 }, (_, i) => (
          <path key={i} d={`M${182 + i * 9} 59V346`} stroke="var(--muted)" opacity=".06" />
        ))}
        <path d={`M176 ${front}H406`} stroke={w} strokeWidth="2" strokeDasharray="6 4" />
        <path d="M167 329H416" stroke="var(--muted)" strokeWidth="2" />
        <ellipse cx="291" cy={spot} rx="24" ry="12" fill={s} opacity=".13" />
        <ellipse cx="291" cy={spot} rx="16" ry="8" fill={s} opacity=".35" />
        <circle cx="291" cy={spot} r="4" fill={s} />
        <path d={`M132 329V${front}M125 329h14M125 ${front}h14`} stroke={w} />
        <Label x={110} y={207} anchor="end" tone={w}>
          {v.front} cm
        </Label>
        <path d={`M446 329V${spot}M439 329h14M439 ${spot}h14`} stroke={s} />
        <Leader points={`${406},${front} 484,82 502,82`} color={w} />
        <Label x={518} y={87} tone={w}>
          Solvent front
        </Label>
        <Leader points={`315,${spot} 484,157 502,157`} color={s} />
        <Label x={518} y={162} tone={s}>
          Spot center
        </Label>
        <Label x={518} y={199}>
          {fmt(v.front * v.rf)} cm from origin
        </Label>
        <Label x={518} y={255}>
          Rf = spot ÷ front
        </Label>
        <Label x={518} y={287} tone={p}>
          Rf = {fmt(v.rf)}
        </Label>
        <Leader points="407,329 502,329" />
        <Label x={518} y={334}>
          Pencil origin
        </Label>
        <Label x={36} y={399}>
          Both distances share one origin. Spot spread is illustrative.
        </Label>
      </>
    );
  } else if (model === 'bloodstain') {
    const rx = v.length * 6,
      ry = rx * v.ratio,
      angle = Math.asin(v.ratio);
    const tx = 636 - 170 * Math.cos(angle),
      ty = 295 - 170 * Math.sin(angle);
    art = (
      <>
        <Label x={40} y={35}>
          PLAN VIEW · IDEAL ELLIPSE
        </Label>
        <Label x={431} y={35}>
          SIDE VIEW · IMPACT GEOMETRY
        </Label>
        <rect
          x="34"
          y="60"
          width="340"
          height="280"
          rx="12"
          fill={fill('glass')}
          stroke="var(--line)"
        />
        <ellipse cx="204" cy="200" rx={rx} ry={ry} fill={fill('rose')} stroke={s} strokeWidth="2" />
        <path
          d={`M${204 - rx} 200H${204 + rx}M204 ${200 - ry}V${200 + ry}`}
          stroke="var(--muted)"
          strokeDasharray="4 4"
        />
        <Dimension x1={204 - rx} x2={204 + rx} y={350} label={`Length ${v.length} mm`} color={s} />
        <Label x={204} y={385} anchor="middle">
          Width {fmt(v.length * v.ratio)} mm
        </Label>
        <path d="M427 295H720" stroke="var(--muted)" strokeWidth="2" />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M${430 + i * 21} 295l-10 10`} stroke="var(--line-strong)" />
        ))}
        <path
          d={`M${tx} ${ty}L636 295`}
          stroke={p}
          strokeWidth="3"
          markerEnd={`url(#${id}-arrow)`}
        />
        <path
          d={`M584 295A52 52 0 0 1 ${636 - 52 * Math.cos(angle)} ${295 - 52 * Math.sin(angle)}`}
          fill="none"
          stroke={s}
          strokeWidth="2"
        />
        <circle cx={tx} cy={ty} r="7" fill={fill('rose')} stroke={s} />
        <Label x={445} y={349} tone={p}>
          θ = sin⁻¹(width / length)
        </Label>
        <Label x={445} y={385} tone={s}>
          θ = {fmt(result.metrics[1].value)}°
        </Label>
      </>
    );
  } else {
    const isFeedback = model === 'feedback',
      isImmune = model === 'immune';
    const maxX = isFeedback ? 12 : isImmune ? 28 : 72;
    const minY = isFeedback ? -10 : 0,
      maxY = isFeedback ? 10 : isImmune ? 14 : 2000;
    const x = (n: number) => 68 + (n / maxX) * 620,
      y = (n: number) => 305 - ((n - minY) / (maxY - minY)) * 230;
    const fn = (n: number, memory = v.memory) =>
      isFeedback
        ? v.disturbance * (1 - v.gain) ** n
        : isImmune
          ? calculateModel('immune', { day: n, memory }).metrics[0].value
          : Math.max(0, v.temperature - v.base) * n;
    const selected = isFeedback ? v.steps : isImmune ? v.day : v.hours;
    const series = (memory: number) =>
      Array.from(
        { length: 113 },
        (_, i) => `${x((i * maxX) / 112)},${y(fn((i * maxX) / 112, memory))}`,
      ).join(' ');
    art = (
      <>
        <Label x={68} y={35}>
          {isFeedback
            ? 'Deviation from the set point'
            : isImmune
              ? 'Antibody response · arbitrary units'
              : 'Accumulated degree-hours'}
        </Label>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <path
              d={`M68 ${75 + t * 230}H688M${68 + t * 620} 75V305`}
              stroke="var(--line)"
              strokeDasharray="3 5"
            />
            <Label x={55} y={80 + t * 230} anchor="end">
              {fmt(maxY - t * (maxY - minY))}
            </Label>
            <Label x={68 + t * 620} y={329} anchor="middle">
              {fmt(t * maxX)}
            </Label>
          </g>
        ))}
        <path d="M68 65V305H698" stroke="var(--muted)" fill="none" />
        <polygon
          points={`${x(0)},${y(isFeedback ? 0 : 0)} ${series(0)} ${x(maxX)},${y(0)}`}
          fill={p}
          opacity=".08"
        />
        <polyline points={series(0)} fill="none" stroke={p} strokeWidth="3" />
        {isImmune && (
          <polyline
            points={series(1)}
            fill="none"
            stroke={s}
            strokeWidth="3"
            strokeDasharray="7 4"
          />
        )}
        {isFeedback && (
          <path d={`M68 ${y(0)}H688`} stroke={w} strokeWidth="2" strokeDasharray="7 5" />
        )}
        <path
          d={`M${x(selected)} 75V305M68 ${y(fn(selected))}H${x(selected)}`}
          stroke={s}
          strokeDasharray="3 5"
        />
        <circle cx={x(selected)} cy={y(fn(selected))} r="11" fill={s} opacity=".15" />
        <circle
          cx={x(selected)}
          cy={y(fn(selected))}
          r="5"
          fill={s}
          stroke="var(--surface)"
          strokeWidth="2"
        />
        <Label x={378} y={360} anchor="middle">
          {isFeedback
            ? 'Elapsed correction steps'
            : isImmune
              ? 'Days since exposure'
              : 'Hours at constant temperature'}
        </Label>
        <Label x={68} y={397} tone={p}>
          {isImmune
            ? 'Solid: primary response'
            : isFeedback
              ? `Correction gain: ${fmt(v.gain)} per step`
              : `Effective temperature: ${Math.max(0, v.temperature - v.base)} °C`}
        </Label>
        <Label x={425} y={397} tone={s}>
          {isImmune
            ? 'Dashed: memory response'
            : `Selected output: ${fmt(result.metrics[0].value)}`}
        </Label>
      </>
    );
  }
  return (
    <figure className="lab-figure scientific-model" data-diagram={model}>
      <div className="lab-figure-heading">
        <strong>{titles[model]}</strong>
        <span>Live scientific model</span>
      </div>
      <DiagramViewer label={titles[model]}>
        <svg
          className="lab-diagram science-art"
          viewBox="0 0 760 430"
          role="img"
          aria-label={`${titles[model]}. ${result.interpretation}`}
        >
          <defs>
            {(
              [
                ['blue', p],
                ['rose', s],
                ['teal', w],
                ['glass', 'var(--muted)'],
              ] as const
            ).map(([name, color]) => (
              <linearGradient key={name} id={`${id}-${name}`} x1="0" y1="0" x2=".8" y2="1">
                <stop stopColor={color} stopOpacity={name === 'glass' ? 0.04 : 0.08} />
                <stop offset=".55" stopColor={color} stopOpacity={name === 'glass' ? 0.08 : 0.24} />
                <stop offset="1" stopColor={color} stopOpacity={name === 'glass' ? 0.13 : 0.45} />
              </linearGradient>
            ))}
            <marker
              id={`${id}-arrow`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M1 1L9 5L1 9Z" fill="context-stroke" />
            </marker>
          </defs>
          {art}
        </svg>
      </DiagramViewer>
      <figcaption>
        {result.equation} · {result.interpretation}
      </figcaption>
    </figure>
  );
}
