'use client';
import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Folder,
  Link2,
  Network,
  PenLine,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { useSettings } from './providers';

const steps = [
  {
    icon: BookOpen,
    title: 'Read the lesson.',
    body: 'Every event is a course of short units: reading, reference figures, a worked example and an interactive model.',
  },
  {
    icon: PenLine,
    title: 'Write it in your words.',
    body: 'Notes sit right beside the lesson. Type a thought, wrap an idea in double brackets, and it becomes a link.',
  },
  {
    icon: Network,
    title: 'Watch ideas connect.',
    body: 'Links turn into a map of what you know. Backlinks show every place an idea came up, across every event.',
  },
  {
    icon: Sparkles,
    title: 'Test what stuck.',
    body: 'Quick checks, real past papers and ranked tests tell you what to read again before tournament day.',
  },
];

const note = [
  '# Stellar evolution',
  '',
  '- Mass decides the whole life story',
  '- Fusion pushes out, gravity pulls in',
  '  → [[Hydrostatic equilibrium]]',
  '- Low mass ends as a [[White dwarf]]',
  '- High mass ends in a [[Supernova]]',
];
const noteText = note.join('\n');

// Renders the typed note with headings and [[links]] picked out.
function NoteBody({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const heading = line.startsWith('# ');
        const parts = (heading ? line.slice(2) : line).split(/(\[\[[^\]]*\]?\]?)/g);
        return (
          <span key={i} className={heading ? 'vx-md-h' : 'vx-md-line'}>
            {heading && <b className="vx-md-mark">#</b>}
            {parts.map((part, j) =>
              part.startsWith('[[') ? (
                <span key={j} className="vx-wikilink">
                  {part}
                </span>
              ) : (
                part
              ),
            )}
            {'\n'}
          </span>
        );
      })}
    </>
  );
}

const files = [
  { name: 'Stellar evolution', step: [0] },
  { name: 'My notes', step: [1, 2] },
  { name: 'Quick check', step: [3] },
];

function LocalGraph({ active }: { active: boolean }) {
  const nodes: [number, number, string][] = [
    [125, 100, 'My notes'],
    [52, 40, 'Equilibrium'],
    [198, 40, 'White dwarf'],
    [200, 160, 'Supernova'],
    [50, 160, 'Main seq.'],
  ];
  return (
    <svg
      className="vx-local-graph"
      viewBox="0 0 250 200"
      data-active={active}
      role="img"
      aria-label="Local graph linking My notes to four concepts"
    >
      {nodes.slice(1).map(([x, y], i) => (
        <line
          key={i}
          x1={125}
          y1={100}
          x2={x}
          y2={y}
          pathLength={1}
          style={{ transitionDelay: `${i * 0.15}s` }}
        />
      ))}
      <line className="vx-lg-faint" x1={52} y1={40} x2={50} y2={160} pathLength={1} />
      {nodes.map(([x, y, name], i) => (
        <g key={name} style={{ transitionDelay: `${0.25 + i * 0.12}s` }}>
          <circle cx={x} cy={y} r={i === 0 ? 6 : 4} />
          <text x={x} y={y + (y < 100 ? -12 : 24)} textAnchor="middle">
            {name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Quiz() {
  const [answer, setAnswer] = useState<number | null>(null);
  const options = ['Its initial mass', 'Its distance from Earth', 'Its colour today'];
  return (
    <div className="vx-quiz">
      <p className="vx-quiz-q">What decides how a star ends its life?</p>
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          aria-pressed={answer === i}
          data-right={answer === i ? i === 0 : undefined}
          onClick={() => setAnswer(i)}
        >
          <span>{String.fromCharCode(65 + i)}</span>
          {option}
          {answer === i && (i === 0 ? <Check size={14} /> : <RotateCcw size={14} />)}
        </button>
      ))}
      <p className="vx-quiz-a" aria-live="polite">
        {answer === null
          ? 'Pick one. No pressure.'
          : answer === 0
            ? 'Right. Mass sets core temperature, fusion rate and the ending.'
            : 'Not quite. Look back at your first bullet.'}
      </p>
    </div>
  );
}

export function VaultWorkspace() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const { motion } = useSettings();

  // The step in the middle of the viewport drives the window.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setStep(Number((entry.target as HTMLElement).dataset.step));
      },
      // On narrow screens the window sits on top, so read the band below it.
      {
        rootMargin: window.matchMedia('(max-width: 900px)').matches
          ? '-72% 0px -24% 0px'
          : '-48% 0px -48% 0px',
      },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // The note writes itself once, the first time step two is reached.
  useEffect(() => {
    if (step < 1 || typed >= noteText.length) return;
    const still = !motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) {
      setTyped(noteText.length);
      return;
    }
    const id = window.setTimeout(
      () => setTyped((t) => Math.min(noteText.length, t + (noteText[t] === ' ' ? 2 : 1))),
      noteText[typed] === '\n' ? 160 : 26,
    );
    return () => window.clearTimeout(id);
  }, [step, typed, motion]);

  const tab = step === 0 ? 0 : step === 3 ? 2 : 1;

  return (
    <div className="vx-story">
      <div className="vx-story-steps">
        {steps.map((item, i) => (
          <article
            key={item.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            data-active={step === i}
            className="vx-story-step"
          >
            <button type="button" onClick={() => setStep(i)} aria-pressed={step === i}>
              <span className="vx-step-num">{String(i + 1).padStart(2, '0')}</span>
              <item.icon size={18} aria-hidden="true" />
            </button>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="vx-story-stage">
        <div className="vx-app" data-step={step}>
          <div className="vx-app-bar">
            <span className="vx-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="vx-app-tabs" aria-hidden="true">
              {files.map((file, i) => (
                <span key={file.name} data-on={tab === i}>
                  <FileText size={12} />
                  {file.name}
                </span>
              ))}
            </div>
            <span className="vx-app-search" aria-hidden="true">
              <Search size={12} /> Ctrl K
            </span>
          </div>
          <div className="vx-app-body">
            <aside className="vx-app-tree" aria-hidden="true">
              <p>
                <ChevronDown size={12} /> <Folder size={12} /> Astronomy
              </p>
              <ul>
                {['Stellar evolution', 'My notes', 'Quick check', 'Galaxies', 'Exoplanets'].map(
                  (name, i) => (
                    <li key={name} data-on={i === tab}>
                      <FileText size={12} />
                      {name}
                    </li>
                  ),
                )}
              </ul>
              <p>
                <ChevronDown size={12} style={{ rotate: '-90deg' }} /> <Folder size={12} />{' '}
                Circuit Lab
              </p>
              <p>
                <ChevronDown size={12} style={{ rotate: '-90deg' }} /> <Folder size={12} />{' '}
                Forensics
              </p>
            </aside>

            <div className="vx-app-editor">
              <div className="vx-pane" data-show={tab === 0}>
                <p className="vx-crumb">Astronomy / Unit 3 / Stellar evolution</p>
                <dl className="vx-props">
                  <div>
                    <dt>event</dt>
                    <dd>Astronomy</dd>
                  </div>
                  <div>
                    <dt>unit</dt>
                    <dd>3 of 10</dd>
                  </div>
                  <div>
                    <dt>status</dt>
                    <dd>
                      <i /> in progress
                    </dd>
                  </div>
                </dl>
                <h4>Stellar evolution</h4>
                <p>
                  A star’s <mark>mass</mark> shapes its whole life. In the core, fusion pushes
                  outward while gravity pulls inward, a balance called{' '}
                  <mark>hydrostatic equilibrium</mark>.
                </p>
                <div className="vx-callout">
                  <b>Key idea</b>
                  Initial mass decides the evolutionary path.
                </div>
              </div>

              <div className="vx-pane" data-show={tab === 1}>
                <p className="vx-crumb">Astronomy / My notes</p>
                <pre className="vx-md" aria-label="A note being written about stellar evolution">
                  <NoteBody text={noteText.slice(0, typed)} />
                  <span className="vx-caret" aria-hidden="true" />
                </pre>
              </div>

              <div className="vx-pane" data-show={tab === 2}>
                <p className="vx-crumb">Astronomy / Quick check</p>
                <Quiz />
              </div>
            </div>

            <aside className="vx-app-side" aria-hidden="true">
              <p className="vx-side-title">
                <Network size={12} /> Local graph
              </p>
              <LocalGraph active={step >= 2} />
              <p className="vx-side-title">
                <Link2 size={12} /> Backlinks
              </p>
              <ul className="vx-backlinks" data-active={step >= 2}>
                <li>
                  Dynamic Planet <span>2</span>
                </li>
                <li>
                  Thermodynamics <span>1</span>
                </li>
                <li>
                  Unit 4 · Galaxies <span>3</span>
                </li>
              </ul>
            </aside>
          </div>
          <div className="vx-app-status" aria-hidden="true">
            <span>
              <i /> Saved
            </span>
            <span>{steps[step].title.replace('.', '')}</span>
            <span>{Math.max(0, noteText.slice(0, typed).split(/\s+/).length - 1)} words</span>
          </div>
        </div>
      </div>
    </div>
  );
}
