import type { ReactNode } from 'react';
import type { LessonSim } from '@/lib/lessons';
import './lesson-diagrams.css';
import { DiagramViewer } from './diagram-viewer';

const primary = 'var(--diagram-primary)';
const secondary = 'var(--diagram-secondary)';
const ink = 'var(--text)';
const muted = 'var(--muted)';
const line = 'var(--line-strong)';

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
      <DiagramViewer label={title}>
        <svg
          viewBox="0 0 480 280"
          className="lab-diagram"
          role="img"
          aria-label={`${title}. ${summary}`}
        >
          {children}
        </svg>
      </DiagramViewer>
      <figcaption>{summary}</figcaption>
    </figure>
  );
}

export { ScientificModelArt as ModelDiagram } from './scientific-model-art';

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
