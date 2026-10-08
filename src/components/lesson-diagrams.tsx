import type { ReactNode } from 'react';
import type { LessonSim } from '@/lib/lessons';
import { calculateModel, type ModelId } from '@/lib/lesson-models';
import './lesson-diagrams.css';

const primary = 'var(--diagram-primary)';
const secondary = 'var(--diagram-secondary)';
const water = 'var(--diagram-water)';
const ink = 'var(--text)';
const muted = 'var(--muted)';
const line = 'var(--line-strong)';
const format = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);

function Diagram({
  title,
  summary,
  children,
  model,
}: {
  title: string;
  summary: string;
  children: ReactNode;
  model: string;
}) {
  return (
    <figure className="lab-figure" data-diagram={model}>
      <div className="lab-figure-heading">
        <strong>{title}</strong>
        <span>Live diagram</span>
      </div>
      <div
        className="lab-diagram-viewport"
        role="region"
        aria-label={`${title} diagram viewer`}
        tabIndex={0}
      >
        <svg
          viewBox="0 0 480 280"
          className="lab-diagram"
          role="img"
          aria-label={`${title}. ${summary}`}
        >
          {children}
        </svg>
      </div>
      <p className="lab-diagram-scroll-hint">Scroll sideways to explore the full diagram.</p>
      <figcaption>{summary}</figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  x2,
  y,
  color = primary,
  width = 3,
}: {
  x1: number;
  x2: number;
  y: number;
  color?: string;
  width?: number;
}) {
  const direction = Math.sign(x2 - x1);
  return (
    <g stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x1} ${y} H${x2}`} />
      <path d={`M${x2 - direction * 9} ${y - 7} L${x2} ${y} L${x2 - direction * 9} ${y + 7}`} />
    </g>
  );
}

function Axes({
  xLabel,
  yLabel,
  maxX,
  maxY,
}: {
  xLabel: string;
  yLabel: string;
  maxX: number;
  maxY: number;
}) {
  return (
    <g fill={muted}>
      <text x="48" y="25">
        {yLabel}
      </text>
      {[0, 0.5, 1].map((fraction) => (
        <g key={fraction}>
          <path d={`M48 ${225 - 175 * fraction} H445`} stroke={line} strokeDasharray="4 5" />
          <text x="39" y={230 - 175 * fraction} textAnchor="end">
            {format(fraction * maxY)}
          </text>
          <text x={48 + 397 * fraction} y="249" textAnchor="middle">
            {format(fraction * maxX)}
          </text>
        </g>
      ))}
      <path d="M48 45 V225 H445" stroke={muted} fill="none" />
      <text x="247" y="274" textAnchor="middle">
        {xLabel}
      </text>
    </g>
  );
}

/** All geometry is driven by the same bounded teaching models as the lab readout. */
export function ModelDiagram({
  model,
  values: v,
}: {
  model: ModelId;
  values: Record<string, number>;
}) {
  const result = calculateModel(model, v);
  switch (model) {
    case 'feedback': {
      const point = (step: number) => ({
        x: 48 + (step / 12) * 397,
        y: 137 - v.disturbance * (1 - v.gain) ** step * 8.5,
      });
      const current = point(v.steps);
      return (
        <Diagram
          model={model}
          title="Return toward the set point"
          summary={`After ${v.steps} steps, the deviation is ${format(result.metrics[0].value)} units. The dashed line is the set point; the dot marks the selected step.`}
        >
          <text x="48" y="25" fill={muted}>
            Deviation (units)
          </text>
          {[-10, 0, 10].map((n) => (
            <g key={n}>
              <path
                d={`M48 ${137 - n * 8.5} H445`}
                stroke={n === 0 ? secondary : line}
                strokeDasharray="5 5"
              />
              <text x="38" y={142 - n * 8.5} fill={muted} textAnchor="end">
                {n}
              </text>
            </g>
          ))}
          <path d="M48 45 V225 H445" stroke={muted} fill="none" />
          <polyline
            points={Array.from({ length: 13 }, (_, i) => `${point(i).x},${point(i).y}`).join(' ')}
            stroke={primary}
            strokeWidth="3"
            fill="none"
          />
          <path d={`M${current.x} 45 V225`} stroke={secondary} strokeDasharray="3 5" />
          <circle cx={current.x} cy={current.y} r="6" fill={primary} stroke={ink} strokeWidth="2" />
          {[0, 6, 12].map((n) => (
            <text key={n} x={point(n).x} y="249" fill={muted} textAnchor="middle">
              {n}
            </text>
          ))}
          <text x="246" y="274" fill={muted} textAnchor="middle">
            Elapsed steps
          </text>
        </Diagram>
      );
    }
    case 'airway': {
      const radius = v.radius * 0.48;
      return (
        <Diagram
          model={model}
          title="Airway cross-section and flow"
          summary={`Radius is ${v.radius}% and driving pressure is ${v.pressure}% of baseline. Airflow is ${format(result.metrics[1].value)} × baseline. The dashed circle shows the baseline radius; arrow thickness is schematic.`}
        >
          <text x="125" y="35" fill={ink} textAnchor="middle">
            Airway lumen
          </text>
          <circle
            cx="125"
            cy="140"
            r={radius}
            fill={primary}
            fillOpacity="0.18"
            stroke={primary}
            strokeWidth="3"
          />
          <circle cx="125" cy="140" r="48" fill="none" stroke={muted} strokeDasharray="5 5" />
          <path d={`M125 140 h${radius}`} stroke={secondary} strokeWidth="3" />
          <text x="125" y="240" fill={secondary} textAnchor="middle">
            Radius: {v.radius}%
          </text>
          <text x="345" y="76" fill={ink} textAnchor="middle">
            Pressure: {v.pressure}%
          </text>
          <Arrow x1={245} x2={442} y={140} width={2 + Math.min(16, result.metrics[1].value * 3)} />
          <text x="345" y="213" fill={primary} textAnchor="middle">
            Flow: {format(result.metrics[1].value)}×
          </text>
          <text x="345" y="240" fill={muted} textAnchor="middle">
            Fixed length &amp; viscosity
          </text>
        </Diagram>
      );
    }
    case 'ventilation': {
      const fresh = Math.max(0, v.tidal - v.dead);
      return (
        <Diagram
          model={model}
          title="Where each breath goes"
          summary={`Each ${v.tidal} mL breath includes ${v.dead} mL of dead-space air and ${fresh} mL reaching exchange regions. At ${v.rate} breaths/min, alveolar ventilation is ${format(result.metrics[1].value)} L/min. Lung outlines are schematic.`}
        >
          <path
            d="M104 79 C59 74 28 135 30 219 Q61 245 106 214 Z M132 79 C177 74 208 135 206 219 Q175 245 130 214 Z"
            fill={primary}
            fillOpacity={0.15 + (fresh / 900) * 0.5}
            stroke={primary}
            strokeWidth="2"
          />
          <path
            d="M118 40 V120 M118 112 L72 168 M118 112 L164 168"
            stroke={secondary}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <text x="118" y="265" textAnchor="middle" fill={ink}>
            {v.rate} breaths / min
          </text>
          <text x="350" y="27" textAnchor="middle" fill={ink}>
            One breath (mL)
          </text>
          <rect x="302" y="55" width="80" height="180" fill="none" stroke={line} />
          <rect x="302" y={235 - v.tidal * 0.2} width="80" height={fresh * 0.2} fill={primary} />
          <rect x="302" y={235 - v.dead * 0.2} width="80" height={v.dead * 0.2} fill={secondary} />
          <text x="394" y="62" fill={muted}>
            900
          </text>
          <text x="394" y="240" fill={muted}>
            0
          </text>
          <text x="286" y="90" textAnchor="end" fill={primary}>
            {fresh}
          </text>
          <text x="286" y="225" textAnchor="end" fill={secondary}>
            {v.dead}
          </text>
          <text x="342" y="265" textAnchor="middle" fill={muted}>
            Fresh air / dead space
          </text>
        </Diagram>
      );
    }
    case 'diffusion': {
      const thickness = v.thickness * 0.24;
      const height = 50 + v.area * 0.8;
      const count = 3 + Math.ceil(v.gradient / 15);
      return (
        <Diagram
          model={model}
          title="Gas crossing an exchange barrier"
          summary={`Exchange area ${v.area}%, gradient ${v.gradient}%, thickness ${v.thickness}%: transfer is ${format(result.metrics[0].value)}% of baseline. Barrier height represents area; barrier width represents thickness. Dots and arrows are schematic.`}
        >
          <text x="98" y="30" fill={ink} textAnchor="middle">
            Higher pressure
          </text>
          <text x="380" y="30" fill={ink} textAnchor="middle">
            Lower pressure
          </text>
          <rect
            x={240 - thickness / 2}
            y={140 - height / 2}
            width={thickness}
            height={height}
            fill={secondary}
            fillOpacity="0.3"
            stroke={secondary}
            strokeWidth="2"
          />
          {Array.from({ length: count }, (_, i) => (
            <circle
              key={i}
              cx={45 + (i % 4) * 33}
              cy={70 + Math.floor(i / 4) * 38}
              r="6"
              fill={primary}
            />
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={352 + i * 30} cy={110 + (i % 2) * 35} r="5" fill={primary} />
          ))}
          <Arrow x1={170} x2={317} y={140} width={2 + Math.min(9, result.metrics[0].value / 50)} />
          <text x="240" y="245" fill={secondary} textAnchor="middle">
            Barrier thickness: {v.thickness}%
          </text>
          <text x="240" y="272" fill={primary} textAnchor="middle">
            Transfer: {format(result.metrics[0].value)}% of baseline
          </text>
        </Diagram>
      );
    }
    case 'digestion': {
      const digested = result.metrics[0].value,
        residual = result.metrics[1].value;
      return (
        <Diagram
          model={model}
          title="Trace the lactose load"
          summary={`Of ${v.load} g entering the intestine, ${format(digested)} g is hydrolyzed and ${format(residual)} g reaches the colon. Each particle represents 2 g (a partial particle represents the remainder).`}
        >
          <text x="240" y="28" fill={ink} textAnchor="middle">
            Intake: {v.load} g · Capacity: {v.capacity} g
          </text>
          <rect
            x="25"
            y="60"
            width="185"
            height="165"
            rx="22"
            fill={primary}
            fillOpacity="0.07"
            stroke={primary}
            strokeWidth="2"
          />
          <rect
            x="280"
            y="60"
            width="175"
            height="165"
            rx="22"
            fill={secondary}
            fillOpacity="0.07"
            stroke={secondary}
            strokeWidth="2"
          />
          <text x="118" y="86" fill={ink} textAnchor="middle">
            Small intestine
          </text>
          <text x="368" y="86" fill={ink} textAnchor="middle">
            Colon
          </text>
          <Arrow x1={220} x2={270} y={144} color={secondary} />
          {[
            { amount: digested, x: 46, color: primary },
            { amount: residual, x: 299, color: secondary },
          ].map(({ amount, x, color }) => (
            <g key={x}>
              {Array.from({ length: Math.ceil(amount / 2) }, (_, i) => (
                <circle
                  key={i}
                  cx={x + (i % 5) * 28}
                  cy={110 + Math.floor(i / 5) * 22}
                  r={6 * Math.sqrt(Math.min(1, amount / 2 - i))}
                  fill={color}
                />
              ))}
            </g>
          ))}
          <text x="118" y="254" fill={primary} textAnchor="middle">
            Hydrolyzed: {digested} g
          </text>
          <text x="368" y="254" fill={secondary} textAnchor="middle">
            Unhydrolyzed: {residual} g
          </text>
        </Diagram>
      );
    }
    case 'immune': {
      const response = (day: number, memory: number) =>
        calculateModel('immune', { day, memory }).metrics[0].value;
      const xy = (day: number, memory: number) =>
        `${48 + (day / 28) * 397},${225 - (response(day, memory) / 14) * 175}`;
      return (
        <Diagram
          model={model}
          title="Compare primary and memory responses"
          summary={`Day ${v.day}, memory ${v.memory ? 'present' : 'absent'}: response ${format(result.metrics[0].value)} arbitrary units. The solid blue curve is primary; the dashed pink curve is memory. The dot follows the selected response. This is a conceptual model.`}
        >
          <Axes
            xLabel="Days since exposure"
            yLabel="Antibody response (arbitrary units)"
            maxX={28}
            maxY={14}
          />
          {[0, 1].map((memory) => (
            <polyline
              key={memory}
              points={Array.from({ length: 113 }, (_, i) => xy(i / 4, memory)).join(' ')}
              fill="none"
              stroke={memory ? secondary : primary}
              strokeWidth="3"
              strokeDasharray={memory ? '7 4' : undefined}
            />
          ))}
          <path d={`M${48 + (v.day / 28) * 397} 45 V225`} stroke={muted} strokeDasharray="3 5" />
          <circle
            cx={48 + (v.day / 28) * 397}
            cy={225 - (result.metrics[0].value / 14) * 175}
            r="6"
            fill={v.memory ? secondary : primary}
            stroke={ink}
            strokeWidth="2"
          />
        </Diagram>
      );
    }
    case 'density': {
      const ratio = v.sample / v.liquid;
      const state =
        Math.abs(v.sample - v.liquid) < 0.0001
          ? 'Neutral buoyancy'
          : ratio > 1
            ? 'Sinks'
            : 'Floats';
      const y =
        state === 'Sinks' ? 183 : state === 'Neutral buoyancy' ? 143 : 106 - 52 * (1 - ratio);
      return (
        <Diagram
          model={model}
          title="Float, suspend, or sink"
          summary={`${state}: sample ${format(v.sample)} g/mL, liquid ${format(v.liquid)} g/mL.${state === 'Floats' ? ` ${format(ratio * 100)}% of the ideal sample is submerged.` : ''} The dashed line is the liquid surface; the block position represents ideal behavior.`}
        >
          <path d="M80 45 V237 H340 V45" fill="none" stroke={muted} strokeWidth="3" />
          <rect x="82" y="106" width="256" height="129" fill={water} fillOpacity="0.2" />
          <path d="M80 106 H340" stroke={water} strokeDasharray="6 4" strokeWidth="2" />
          <rect
            x="173"
            y={y}
            width="75"
            height="52"
            rx="4"
            fill={secondary}
            fillOpacity="0.8"
            stroke={secondary}
            strokeWidth="2"
          />
          <text x="210" y="29" textAnchor="middle" fill={ink}>
            {state}
          </text>
          <text x="356" y="112" fill={water}>
            Surface
          </text>
          <text x="210" y="268" textAnchor="middle" fill={water}>
            Liquid: {format(v.liquid)} g/mL
          </text>
        </Diagram>
      );
    }
    case 'chromatography': {
      const front = 231 - v.front * 18,
        spot = 231 - v.front * v.rf * 18;
      return (
        <Diagram
          model={model}
          title="Measure migration from the baseline"
          summary={`The solvent front traveled ${v.front} cm; the spot center traveled ${format(result.metrics[0].value)} cm. Rf = ${format(v.rf)}. Both distances start at the same baseline.`}
        >
          <rect
            x="115"
            y="28"
            width="162"
            height="220"
            rx="3"
            fill={water}
            fillOpacity="0.04"
            stroke={line}
            strokeWidth="2"
          />
          <rect
            x="116"
            y={front}
            width="160"
            height={231 - front}
            fill={water}
            fillOpacity="0.12"
          />
          <path d={`M115 ${front} H277`} stroke={water} strokeWidth="3" strokeDasharray="6 4" />
          <path d="M108 231 H286" stroke={muted} strokeWidth="2" />
          <circle cx="196" cy={spot} r="9" fill={secondary} />
          <path
            d={`M81 231 V${front} M74 231 H88 M74 ${front} H88`}
            stroke={water}
            strokeWidth="2"
          />
          <path
            d={`M310 231 V${spot} M303 231 H317 M303 ${spot} H317`}
            stroke={secondary}
            strokeWidth="2"
          />
          <text x="25" y="134" fill={water}>
            {v.front} cm
          </text>
          <text x="330" y="162" fill={secondary}>
            {format(result.metrics[0].value)} cm
          </text>
          <text x="196" y="271" fill={muted} textAnchor="middle">
            Origin baseline · Rf {format(v.rf)}
          </text>
          <text x="330" y="47" fill={water}>
            Solvent front
          </text>
          <text x="330" y="74" fill={secondary}>
            Spot center
          </text>
        </Diagram>
      );
    }
    case 'bloodstain': {
      const rx = v.length * 4,
        ry = rx * v.ratio,
        angle = Math.asin(v.ratio);
      const tip = { x: 365 - 100 * Math.cos(angle), y: 196 - 100 * Math.sin(angle) };
      return (
        <Diagram
          model={model}
          title="Stain shape and impact angle"
          summary={`Length ${v.length} mm, width ${format(result.metrics[0].value)} mm: angle ${format(result.metrics[1].value)}° from the surface. The left view excludes tails; the right view illustrates ideal impact geometry.`}
        >
          <text x="126" y="29" fill={ink} textAnchor="middle">
            Surface view
          </text>
          <ellipse
            cx="126"
            cy="137"
            rx={rx}
            ry={ry}
            fill={secondary}
            fillOpacity="0.4"
            stroke={secondary}
            strokeWidth="2"
          />
          <path
            d={`M${126 - rx} 137 H${126 + rx} M126 ${137 - ry} V${137 + ry}`}
            stroke={ink}
            strokeDasharray="4 3"
          />
          <text x="126" y="247" fill={secondary} textAnchor="middle">
            L {v.length} · W {format(result.metrics[0].value)} mm
          </text>
          <text x="360" y="29" fill={ink} textAnchor="middle">
            Side view
          </text>
          <path d="M270 196 H450" stroke={muted} strokeWidth="3" />
          <path
            d={`M${tip.x} ${tip.y} L365 196 l-10 -2 M365 196 l-2 -10`}
            stroke={primary}
            strokeWidth="3"
            fill="none"
          />
          <path
            d={`M330 196 A35 35 0 0 1 ${365 - 35 * Math.cos(angle)} ${196 - 35 * Math.sin(angle)}`}
            stroke={secondary}
            strokeWidth="2"
            fill="none"
          />
          <text x="360" y="247" fill={primary} textAnchor="middle">
            {format(result.metrics[1].value)}° from surface
          </text>
        </Diagram>
      );
    }
    case 'thermal': {
      const effective = Math.max(0, v.temperature - v.base);
      const x = 48 + (v.hours / 72) * 397,
        y = 225 - (result.metrics[0].value / 2000) * 175;
      return (
        <Diagram
          model={model}
          title="Accumulate thermal time"
          summary={`At ${v.temperature} °C with a ${v.base} °C threshold, each hour adds ${effective} degree-hours. Over ${v.hours} hours the total is ${format(result.metrics[0].value)} degree-hours. Below the threshold the curve remains flat.`}
        >
          <Axes
            xLabel="Hours at constant temperature"
            yLabel="Thermal accumulation (degree-hours)"
            maxX={72}
            maxY={2000}
          />
          <path
            d={`M48 225 L445 ${225 - ((effective * 72) / 2000) * 175}`}
            stroke={primary}
            strokeWidth="3"
          />
          <path d={`M${x} 45 V225`} stroke={secondary} strokeDasharray="4 5" />
          <circle cx={x} cy={y} r="6" fill={primary} stroke={ink} strokeWidth="2" />
          <text x="432" y="65" textAnchor="end" fill={secondary}>
            {v.temperature} °C − {v.base} °C threshold
          </text>
        </Diagram>
      );
    }
  }
}

type Investigation = Extract<LessonSim, { kind: 'investigation' }>;
const wrap = (label: string) => {
  const words = label.split(' '),
    lines: string[] = [];
  for (const word of words) {
    if (!lines.length || `${lines.at(-1)} ${word}`.length > 26) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
};

export function InvestigationDiagram({
  sim,
  observed,
}: {
  sim: Investigation;
  observed: number[];
}) {
  const has = (n: number) => observed.includes(n);
  const summary = `${observed.length} of ${sim.observations.length} observations revealed. Use the observation buttons below to uncover the diagram and evidence before choosing a conclusion.`;
  if (sim.diagram === 'tissue-section')
    return (
      <Diagram
        model="tissue-section"
        title="Explore the unknown organ wall"
        summary={`${summary} This schematic shows selected wall layers, not a histology image.`}
      >
        <ellipse
          cx="170"
          cy="142"
          rx="121"
          ry="92"
          fill={has(1) ? secondary : line}
          fillOpacity="0.22"
          stroke={has(1) ? secondary : muted}
          strokeWidth="3"
        />
        <ellipse
          cx="170"
          cy="142"
          rx="91"
          ry="66"
          fill="var(--surface)"
          stroke={has(0) ? primary : muted}
          strokeWidth={has(0) ? 26 : 2}
        />
        {has(0) &&
          Array.from({ length: 96 }, (_, i) => {
            const row = Math.floor(i / 32);
            const theta = (((i % 32) + row * 0.4) / 32) * 2 * Math.PI;
            const x = 170 + (83 + row * 8) * Math.cos(theta);
            const y = 142 + (58 + row * 8) * Math.sin(theta);
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="2"
                ry="5"
                fill={ink}
                transform={`rotate(${(theta * 180) / Math.PI} ${x} ${y})`}
              />
            );
          })}
        <text x="170" y="148" fill={ink} textAnchor="middle">
          Lumen
        </text>
        <text x="330" y="86" fill={has(0) ? primary : muted}>
          {has(0) ? 'Layered lining' : 'Lining: hidden'}
        </text>
        <text x="330" y="123" fill={has(1) ? secondary : muted}>
          {has(1) ? 'Muscle wall' : 'Wall: hidden'}
        </text>
        <path d="M260 82 H315 M283 121 H315" stroke={muted} />
        <text x="240" y="265" textAnchor="middle" fill={muted}>
          {has(2) ? 'Behind trachea → toward stomach' : 'Location revealed by observation 3'}
        </text>
      </Diagram>
    );
  if (sim.diagram === 'str')
    return (
      <Diagram
        model="str"
        title="Compare the two STR loci"
        summary={`${summary} Allele positions are schematic; these are the supplied teaching profiles.`}
      >
        <text x="220" y="32" textAnchor="middle" fill={ink}>
          Locus 1
        </text>
        <text x="391" y="32" textAnchor="middle" fill={ink}>
          Locus 2
        </text>
        {[
          { name: 'Questioned', alleles: [10, 12, 8, 9], show: has(0) },
          { name: 'Reference A', alleles: [10, 12, 8, 9], show: has(1) },
          { name: 'Reference B', alleles: [10, 11, 8, 9], show: has(1) },
        ].map((row, i) => (
          <g key={row.name}>
            <text x="15" y={86 + i * 70} fill={ink}>
              {row.name}
            </text>
            <path d={`M159 ${92 + i * 70} H445`} stroke={line} />
            {row.show ? (
              row.alleles.map((allele, j) => {
                const x = j < 2 ? 175 + (allele - 10) * 43 : 353 + (allele - 8) * 64;
                return (
                  <g key={j}>
                    <path
                      d={`M${x - 9} ${90 + i * 70} L${x} ${56 + i * 70} L${x + 9} ${90 + i * 70}`}
                      stroke={i === 0 ? primary : secondary}
                      strokeWidth="2"
                      fill="none"
                    />
                    <text x={x} y={111 + i * 70} textAnchor="middle" fill={muted}>
                      {allele}
                    </text>
                  </g>
                );
              })
            ) : (
              <text x="292" y={84 + i * 70} textAnchor="middle" fill={muted}>
                Not yet revealed
              </text>
            )}
          </g>
        ))}
      </Diagram>
    );
  if (sim.diagram === 'glass') {
    const x = (ri: number) => 130 + ((ri - 1.516) / 0.022) * 314;
    return (
      <Diagram
        model="glass"
        title="Compare refractive-index intervals"
        summary={`${summary} Each interval extends ±0.002 around its measured value; agreement does not establish a unique source.`}
      >
        {[1.52, 1.53, 1.538].map((ri) => (
          <g key={ri}>
            <path d={`M${x(ri)} 35 V230`} stroke={line} strokeDasharray="4 4" />
            <text x={x(ri)} y="255" textAnchor="middle" fill={muted}>
              {ri}
            </text>
          </g>
        ))}
        {[
          { name: 'Questioned', ri: 1.52 },
          { name: 'Reference A', ri: 1.521 },
          { name: 'Reference B', ri: 1.535 },
        ].map((row, i) => (
          <g key={row.name}>
            <text x="10" y={71 + i * 70} fill={ink}>
              {row.name}
            </text>
            {has(i) ? (
              <g stroke={i ? secondary : primary} strokeWidth="3">
                <path
                  d={`M${x(row.ri - 0.002)} ${66 + i * 70} H${x(row.ri + 0.002)} M${x(row.ri - 0.002)} ${57 + i * 70} v18 M${x(row.ri + 0.002)} ${57 + i * 70} v18`}
                />
                <circle cx={x(row.ri)} cy={66 + i * 70} r="5" fill={i ? secondary : primary} />
              </g>
            ) : (
              <text x="295" y={71 + i * 70} fill={muted} textAnchor="middle">
                Not yet revealed
              </text>
            )}
          </g>
        ))}
        <text x="287" y="274" fill={muted} textAnchor="middle">
          Refractive index (unitless)
        </text>
      </Diagram>
    );
  }
  return (
    <Diagram model="investigation" title="Build the evidence map" summary={summary}>
      {sim.observations.map((observation, i) => {
        const y = 43 + i * (195 / Math.max(1, sim.observations.length - 1));
        const textLines = wrap(observation.label);
        return (
          <g key={observation.label}>
            <path
              d={`M284 ${y} H311 V140 H349`}
              fill="none"
              stroke={has(i) ? primary : line}
              strokeWidth="2"
              strokeDasharray={has(i) ? undefined : '4 4'}
            />
            <rect
              x="12"
              y={y - 30}
              width="272"
              height="60"
              rx="8"
              fill={has(i) ? 'var(--accent-soft)' : 'var(--surface)'}
              stroke={has(i) ? primary : line}
            />
            <circle cx="36" cy={y} r="13" fill={has(i) ? primary : line} />
            <text x="36" y={y + 5} textAnchor="middle" fill={has(i) ? 'var(--surface)' : ink}>
              {has(i) ? '✓' : i + 1}
            </text>
            {textLines.map((text, j) => (
              <text
                key={j}
                x="59"
                y={y + 5 + (j - (textLines.length - 1) / 2) * 18}
                fill={has(i) ? ink : muted}
              >
                {text}
              </text>
            ))}
          </g>
        );
      })}
      <circle
        cx="405"
        cy="140"
        r="54"
        fill="var(--surface)"
        stroke={observed.length === sim.observations.length ? primary : line}
        strokeWidth="2"
      />
      <text x="405" y="133" textAnchor="middle" fill={ink}>
        {observed.length}/{sim.observations.length}
      </text>
      <text x="405" y="157" textAnchor="middle" fill={muted}>
        {observed.length === sim.observations.length ? 'Compare' : 'Collect'}
      </text>
    </Diagram>
  );
}
