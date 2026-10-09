import { useId, useState } from 'react';
import type { LessonSim } from '@/lib/lessons';
import { lessonAtlas } from '@/lib/lesson-atlas';
import { InvestigationDiagram } from './lesson-diagrams';
import { ProcessAtlas, SourceImage } from './lesson-atlas';
import './evidence-workbench.css';

type Investigation = Extract<LessonSim, { kind: 'investigation' }>;
type Specimen = 'powder' | 'assay' | 'fiber' | 'hair' | 'fingerprint' | 'spectrum' | 'botanical';
const specimenForLesson: Record<string, Specimen> = {
  'for-u1-l2': 'assay',
  'for-u2-l1': 'powder',
  'for-u2-l2': 'assay',
  'for-u4-l1': 'fiber',
  'for-u4-l2': 'hair',
  'for-u5-l2': 'spectrum',
  'for-u6-l1': 'fingerprint',
  'for-u6-l2': 'fingerprint',
  'for-u6-l3': 'fingerprint',
  'for-u8-l3': 'botanical',
};

function SpecimenDrawing({
  kind,
  stage,
  observed,
  reference,
  labels,
  focus,
  lessonId,
}: {
  kind: Specimen;
  stage: number;
  observed: number[];
  reference: number;
  labels: boolean;
  focus: number;
  lessonId: string;
}) {
  const id = useId().replaceAll(':', '');
  const [peakSelected, setPeakSelected] = useState(false);
  const known = observed.includes(stage);
  const assayStatus = (i: number) =>
    lessonId === 'for-u1-l2'
      ? observed.includes(i)
        ? 'Detected'
        : 'Not run'
      : i === 1
        ? 'Absent'
        : i === 0
          ? 'Detected'
          : stage === 1
            ? 'Absent'
            : stage === 2
              ? 'Detected'
              : 'Not run';
  const blue = 'var(--diagram-primary)',
    pink = 'var(--diagram-secondary)',
    muted = 'var(--muted)';
  const fibers = (x: number, ref: number) => (
    <g transform={`translate(${x},0)`}>
      {ref === 0 ? (
        <path
          d="M15 100 C55 60 65 155 110 105 S165 65 190 110 S235 155 265 100 L265 121 C225 170 215 77 190 130 S145 145 110 126 S55 76 15 121Z"
          fill={blue}
          fillOpacity=".28"
          stroke={blue}
          strokeWidth="2"
        />
      ) : (
        <>
          <path d="M15 108 H265 V129 H15Z" fill={pink} fillOpacity=".25" stroke={pink} />
          {ref === 1 &&
            Array.from({ length: 12 }, (_, i) => (
              <path key={i} d={`M${20 + i * 20} 108 l12 10 -12 11`} fill="none" stroke={pink} />
            ))}
        </>
      )}
    </g>
  );
  const hair = (x: number, variant: number) => (
    <g transform={`translate(${x},0)`}>
      <rect
        x="18"
        y="96"
        width="250"
        height="56"
        rx="18"
        fill={pink}
        fillOpacity=".25"
        stroke={pink}
      />
      <path d="M24 103 H259 M24 145 H259" stroke={blue} strokeWidth="3" />
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={30 + i * 12} cy={110 + (i % 3) * 12} r="2" fill={pink} />
      ))}
      <path
        d={variant === 0 ? 'M34 124 H252' : 'M34 124 h35 m18 0 h42 m20 0 h42 m18 0 h43'}
        stroke={muted}
        strokeWidth="9"
      />
    </g>
  );
  const ridges = (x: number, smeared: boolean) => (
    <g transform={`translate(${x},0)`} filter={`url(#${id}-${smeared ? 'smear' : 'focus'})`}>
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M${30 + i * 6} 230 V${130 + i * 2} C${30 + i * 6} ${30 + i * 6} ${250 - i * 7} ${28 + i * 6} ${240 - i * 7} ${128 + i * 3} Q${223 - i * 6} ${182 - i * 3} ${165 - i * 3} ${144 + i * 2}`}
          fill="none"
          stroke={blue}
          strokeWidth="3"
        />
      ))}
      {smeared && (
        <path
          d="M40 127 Q140 178 234 142 M37 152 Q150 188 232 164"
          stroke={blue}
          strokeWidth="13"
          opacity=".55"
          fill="none"
        />
      )}
    </g>
  );
  const pollen = (x: number, y: number, types: number[]) =>
    types.map((type, i) => (
      <g key={type} transform={`translate(${x + i * 65},${y})`}>
        {type < 2 ? (
          <>
            <circle
              r="18"
              fill={type === 0 ? blue : pink}
              fillOpacity=".3"
              stroke={type === 0 ? blue : pink}
            />
            {Array.from({ length: 10 }, (_, j) => (
              <path
                key={j}
                d={`M${Math.cos(j * 0.628) * 13} ${Math.sin(j * 0.628) * 13} l${Math.cos(j * 0.628) * 10} ${Math.sin(j * 0.628) * 10}`}
                stroke={type === 0 ? blue : pink}
                strokeWidth={type === 0 ? 2 : 4}
              />
            ))}
          </>
        ) : (
          <>
            <ellipse rx="11" ry="22" fill={pink} fillOpacity=".3" stroke={pink} />
            <path
              d="M-7 -16 l-7 -12 q-8 -6 -6 5 M7 -14 l12 -10 q8 -5 7 5"
              fill="none"
              stroke={pink}
              strokeWidth="2"
            />
          </>
        )}
        {labels && (
          <text x="0" y="42" textAnchor="middle">
            {['P', 'Q', 'R'][type]}
          </text>
        )}
      </g>
    ));
  return (
    <svg
      viewBox="0 0 620 310"
      className="lab-diagram specimen-drawing"
      role={kind === 'spectrum' ? 'group' : 'img'}
      aria-label={`${kind} virtual specimen, observation ${stage + 1}${known ? ' revealed' : ' not yet collected'}. ${reference ? 'Reference comparison visible.' : ''}`}
    >
      <defs>
        <filter id={`${id}-focus`}>
          <feGaussianBlur stdDeviation={Math.abs(5 - focus) * 0.4} />
        </filter>
        <filter id={`${id}-smear`}>
          <feGaussianBlur stdDeviation={2.2 + Math.abs(5 - focus) * 0.4} />
        </filter>
      </defs>
      <text x="20" y="28">
        {known
          ? 'Illustrative exhibit • interpret using the recorded findings below'
          : 'Collect the selected observation to reveal its exhibit'}
      </text>
      {!known ? (
        <g>
          <rect
            x="30"
            y="57"
            width="560"
            height="205"
            rx="16"
            fill="var(--surface-2)"
            stroke="var(--line-strong)"
            strokeDasharray="7 5"
          />
          <text x="310" y="151" textAnchor="middle">
            Exhibit awaiting observation {stage + 1}
          </text>
        </g>
      ) : (
        <>
          {(kind === 'fiber' || kind === 'hair') && (
            <g filter={`url(#${id}-focus)`}>
              {kind === 'fiber' ? fibers(12, 0) : hair(12, 0)}
              {reference > 0 &&
                (kind === 'fiber' ? fibers(315, reference - 1) : hair(315, reference - 1))}
              {labels && (
                <>
                  <text x="140" y="188" textAnchor="middle">
                    {kind === 'fiber' ? 'Ribbon and convolutions' : 'Cuticle · cortex · medulla'}
                  </text>
                  {reference > 0 && (
                    <text x="455" y="188" textAnchor="middle">
                      {kind === 'fiber'
                        ? ['', 'Cotton-like', 'Wool-like', 'Smooth filament'][reference]
                        : reference === 1
                          ? 'Continuous medulla'
                          : 'Fragmented medulla'}
                    </text>
                  )}
                </>
              )}
            </g>
          )}
          {kind === 'fingerprint' && (
            <>
              {ridges(10, stage === 1)}
              {reference > 0 && ridges(310, reference === 2)}
              {labels && (
                <>
                  <text x="150" y="274" textAnchor="middle">
                    {stage === 1
                      ? 'Smeared / limited usable detail'
                      : 'Illustrative loop ridge flow'}
                  </text>
                  {reference > 0 && (
                    <text x="450" y="274" textAnchor="middle">
                      {reference === 1 ? 'Clear reference record' : 'Distorted reference record'}
                    </text>
                  )}
                </>
              )}
            </>
          )}
          {(kind === 'powder' || kind === 'assay') &&
            [0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${98 + i * 205},0)`}>
                <path
                  d="M-34 76 V210 Q-34 244 0 244 Q34 244 34 210 V76"
                  fill="none"
                  stroke={blue}
                  strokeWidth="3"
                />
                <path
                  d="M-31 148 H31 V210 Q31 241 0 241 Q-31 241 -31 210Z"
                  fill={
                    kind === 'powder'
                      ? '#e5d5a8'
                      : assayStatus(i) === 'Detected'
                        ? pink
                        : 'var(--line-strong)'
                  }
                  fillOpacity={kind === 'powder' ? 0.35 : 0.4}
                />
                {kind === 'powder' && (
                  <>
                    {i === 0 &&
                      observed.includes(0) &&
                      Array.from({ length: 9 }, (_, j) => (
                        <circle
                          key={j}
                          cx={-20 + (j % 3) * 20}
                          cy={205 + Math.floor(j / 3) * 10}
                          r="4"
                          fill="#e5d5a8"
                        />
                      ))}
                    {i === 1 &&
                      observed.includes(1) &&
                      Array.from({ length: 7 }, (_, j) => (
                        <circle
                          key={j}
                          cx={(j % 3) * 15 - 15}
                          cy={180 - j * 12}
                          r={3 + (j % 3)}
                          stroke={blue}
                          fill="none"
                          className="specimen-bubble"
                        />
                      ))}
                  </>
                )}
                <text x="0" y="278" textAnchor="middle">
                  {kind === 'powder'
                    ? ['Water aliquot', 'Acid aliquot', 'Reagent blank'][i]
                    : ['Known', 'Blank', 'Unknown'][i]}
                </text>
                {labels && kind === 'assay' && (
                  <text x="0" y="58" textAnchor="middle">
                    {assayStatus(i)}
                  </text>
                )}
              </g>
            ))}
          {kind === 'spectrum' && (
            <>
              <path d="M60 60 V244 H568" stroke={muted} fill="none" />
              {[0, 50, 100, 150].map((n) => (
                <text key={n} x={60 + (n / 150) * 508} y="267" textAnchor="middle">
                  {n}
                </text>
              ))}
              <text x="310" y="304" textAnchor="middle">
                m/z
              </text>
              <text x="64" y="46">
                Relative intensity (base peak = 100)
              </text>
              <path d="M368 244 V66" stroke={blue} strokeWidth="5" />
              <g
                role="button"
                tabIndex={0}
                aria-label="Inspect base peak m/z 91"
                aria-pressed={peakSelected}
                onClick={() => setPeakSelected(!peakSelected)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPeakSelected(!peakSelected);
                  }
                }}
              >
                <rect
                  x="348"
                  y="60"
                  width="40"
                  height="184"
                  fill="transparent"
                  stroke={peakSelected ? pink : 'none'}
                />
              </g>
              {(labels || peakSelected) && (
                <text x="368" y="56" textAnchor="middle">
                  91
                </text>
              )}
              <text x="84" y="101">
                Other peak values
              </text>
              <text x="84" y="126">
                are not supplied.
              </text>
              {peakSelected && (
                <>
                  <text x="84" y="156">
                    Base peak: m/z 91, intensity 100
                  </text>
                  <text x="84" y="181">
                    Shared peak ≠ unique identity
                  </text>
                </>
              )}
              {reference > 0 && (
                <text x="84" y="214">
                  Both candidates share 91.
                </text>
              )}
            </>
          )}
          {kind === 'botanical' && (
            <>
              {pollen(96, 100, [0, 1, 2])}
              <text x="96" y="192">
                Questioned assemblage
              </text>
              {reference > 0 && (
                <>
                  {pollen(382, 100, reference === 1 ? [0, 1, 2] : [0])}
                  <text x="400" y="192">
                    {reference === 1 ? 'Site A sample' : 'Site B sample'}
                  </text>
                </>
              )}
              {stage === 2 && (
                <path
                  d="M64 218 h40 v45 h-40Z M117 218 h40 v45 h-40Z M170 218 h40 v45 h-40Z"
                  fill={blue}
                  opacity=".4"
                />
              )}
            </>
          )}
        </>
      )}
    </svg>
  );
}

export function EvidenceWorkbench({
  lessonId,
  sim,
  observed,
  onObserve,
}: {
  lessonId: string;
  sim: Investigation;
  observed: number[];
  onObserve: (index: number) => void;
}) {
  const [active, setActive] = useState(0),
    [zoom, setZoom] = useState(100),
    [focus, setFocus] = useState(5),
    [labels, setLabels] = useState(true),
    [reference, setReference] = useState(0),
    [atlas, setAtlas] = useState(false),
    [hypothesis, setHypothesis] = useState(''),
    [notes, setNotes] = useState<Record<number, string>>({});
  const kind = specimenForLesson[lessonId];
  const options =
    kind === 'fiber'
      ? ['No reference', 'Cotton-like', 'Wool-like', 'Smooth filament']
      : kind === 'hair'
        ? ['No reference', 'Continuous medulla', 'Fragmented medulla']
        : kind === 'fingerprint'
          ? ['No reference', 'Clear record', 'Distorted record']
          : kind === 'botanical'
            ? ['No reference', 'Site A', 'Site B']
            : kind === 'spectrum'
              ? ['No reference', 'Candidate comparison']
              : ['No reference'];
  return (
    <div className="evidence-workbench">
      <div className="evidence-workbench-header">
        <span className="eyebrow">VIRTUAL EVIDENCE WORKBENCH</span>
        <button
          className="button button-small button-glass"
          aria-pressed={atlas}
          onClick={() => setAtlas(!atlas)}
        >
          {atlas ? 'Return to case exhibit' : 'Explore reference pathway'}
        </button>
      </div>
      <label className="evidence-hypothesis">
        Working hypothesis
        <select
          aria-label="Working hypothesis"
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
        >
          <option value="">Choose a hypothesis to test</option>
          {sim.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      {atlas ? (
        <div className="reference-explorer">
          <ProcessAtlas entry={lessonAtlas[lessonId]} compact />
          {lessonAtlas[lessonId].image && <SourceImage image={lessonAtlas[lessonId].image!} />}
        </div>
      ) : kind ? (
        <figure className="lab-figure specimen-inspector" data-diagram={kind}>
          <div className="lab-figure-heading">
            <strong>{sim.title}: exhibit viewer</strong>
            <span>Inspect & compare</span>
          </div>
          <div
            className="lab-diagram-viewport"
            tabIndex={0}
            role="region"
            aria-label="Virtual specimen viewer"
          >
            <div style={{ width: `${zoom}%` }}>
              <SpecimenDrawing
                kind={kind}
                stage={active}
                observed={observed}
                reference={reference}
                labels={labels}
                focus={focus}
                lessonId={lessonId}
              />
            </div>
          </div>
          <div className="specimen-tools">
            <label>
              Exhibit zoom<output>{zoom}%</output>
              <input
                aria-label="Exhibit zoom"
                type="range"
                min="100"
                max="200"
                step="25"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </label>
            {['fiber', 'hair', 'fingerprint'].includes(kind) && (
              <label>
                Viewing focus
                <output>{focus === 5 ? 'Sharp optical focus' : 'Defocused view'}</output>
                <input
                  aria-label="Viewing focus"
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={focus}
                  onChange={(e) => setFocus(Number(e.target.value))}
                />
              </label>
            )}
            {options.length > 1 && (
              <label>
                Reference comparison
                <select
                  aria-label="Reference comparison"
                  value={reference}
                  onChange={(e) => setReference(Number(e.target.value))}
                >
                  {options.map((option, i) => (
                    <option key={option} value={i}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              className="button button-small button-glass"
              aria-pressed={labels}
              onClick={() => setLabels(!labels)}
            >
              {labels ? 'Hide exhibit labels' : 'Show exhibit labels'}
            </button>
          </div>
          <figcaption>
            Original illustrative schematic for the supplied teaching case. Controls change the
            view, not the case findings.{' '}
            {['powder', 'assay'].includes(kind) &&
              'Tube colors are status illustrations, not measured chemical colors.'}{' '}
            {kind === 'fingerprint' &&
              'Added viewing focus cannot recover detail missing from a smeared record.'}{' '}
            Scroll the viewer when zoomed.
          </figcaption>
        </figure>
      ) : (
        <InvestigationDiagram sim={sim} observed={observed} />
      )}
      <div className="investigation-tests">
        {sim.observations.map((observation, i) => (
          <div key={observation.label} data-active={active === i}>
            <button
              className="button button-small button-glass"
              aria-expanded={observed.includes(i)}
              aria-controls={`observation-${i}`}
              onClick={() => {
                setActive(i);
                onObserve(i);
              }}
            >
              <span>
                {observed.includes(i) ? '✓' : '○'} {String(i + 1).padStart(2, '0')}
              </span>{' '}
              {observation.label}
            </button>
            {observed.includes(i) && (
              <p id={`observation-${i}`} role="status">
                {observation.result}
              </p>
            )}
          </div>
        ))}
      </div>
      {observed.includes(active) && (
        <div className="evidence-reasoning">
          <strong>Connect observation {active + 1} to your hypothesis</strong>
          <p>
            {hypothesis ||
              'Choose a working hypothesis, then explain how this observation supports, limits, or challenges it.'}
          </p>
          <label>
            Evidence notebook
            <textarea
              aria-label="Evidence notebook"
              rows={3}
              value={notes[active] ?? ''}
              maxLength={3000}
              placeholder="Which feature matters? What does it support, and what remains unresolved?"
              onChange={(e) => setNotes((current) => ({ ...current, [active]: e.target.value }))}
            />
          </label>
          <small>Your lab notes remain available while this lesson is open.</small>
        </div>
      )}
    </div>
  );
}
