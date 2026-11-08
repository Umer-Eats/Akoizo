'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, BookOpen, FileText, FlaskConical } from 'lucide-react';

// Screens are captured from the signed-in app by scripts/home-screenshots.mjs.
const formats = [
  {
    id: 'lessons',
    label: 'Lessons',
    icon: BookOpen,
    title: 'Read it, see it, then try it.',
    body: 'Every event is a course of units. Each lesson pairs short reading and reference figures with a worked example, an interactive model, and a practice assignment.',
    address: 'akoizo / anatomy-and-physiology / lessons',
    shots: [
      {
        file: 'lesson-course',
        label: 'Course',
        alt: 'Anatomy and Physiology course page listing ten units with progress for each one.',
      },
      {
        file: 'lesson-reading',
        label: 'Reading',
        alt: 'Lesson on ventilation, volumes, and spirometry with learning goals, reading, and a reference figure.',
      },
      {
        file: 'lesson-model',
        label: 'Interactive model',
        alt: 'Ventilation simulator with sliders for tidal volume, breathing rate, and dead space beside a live lung diagram.',
      },
    ],
  },
  {
    id: 'tests',
    label: 'Tests',
    icon: FileText,
    title: 'The real paper, next to your answer sheet.',
    body: 'Past competition tests open with the original paper on the left and a timed answer sheet on the right. Drafts save as you go, and scoring follows the published key.',
    address: 'akoizo / astronomy / practice-tests',
    shots: [
      {
        file: 'test-paper',
        label: 'Paper and answers',
        alt: 'Astronomy practice test showing the original competition paper beside multiple-choice answer fields.',
      },
      {
        file: 'test-overview',
        label: 'Test overview',
        alt: 'Practice test heading with answer count, points, suggested time, and topics and scoring notes.',
      },
    ],
  },
  {
    id: 'labs',
    label: 'Labs',
    icon: FlaskConical,
    title: 'Change a variable. Record what happens.',
    body: 'Virtual labs follow archived tasks. Write a hypothesis, move the controls, watch the readings update, and keep your trials in a notebook you can export.',
    address: 'akoizo / chemistry-lab / lab-practice',
    shots: [
      {
        file: 'lab-workbench',
        label: 'Workbench',
        alt: 'Chemistry lab workbench with experiment sliders, a spectrophotometer diagram, live readings, and an absorbance plot.',
      },
      {
        file: 'lab-overview',
        label: 'Lab list',
        alt: 'Lab Practice page for Chemistry Lab listing two investigations and the opening of the first one.',
      },
    ],
  },
];

function ShotImages({ file, alt }: { file: string; alt: string }) {
  // Both themes are rendered; CSS shows the one matching the site theme.
  return (['dark', 'light'] as const).map((theme) => (
    <img
      key={`${file}-${theme}`}
      className={`lx-shot-${theme}`}
      src={`/home/${file}-${theme}.png`}
      alt={theme === 'dark' ? alt : ''}
      width={1440}
      height={900}
      loading="lazy"
    />
  ));
}

export function HomeShowcase() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const format = formats[active];
  const current = format.shots[shot];
  return (
    <>
      <div className="lx-intro">
        <h2 id="inside-title" className="lx-h2">
          See it before you sign in.
        </h2>
        <p className="lx-lead">Real screens from a student account. Nothing here is a mock-up.</p>
      </div>
      <div className="lx-seg" role="tablist" aria-label="Study formats">
        {formats.map((item, index) => (
          <button
            key={item.id}
            id={`showcase-tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={index === active}
            aria-controls="showcase-panel"
            onClick={() => {
              setActive(index);
              setShot(0);
            }}
          >
            <item.icon size={16} aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="showcase-panel"
        className="lx-screens"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${format.id}`}
      >
        <figure className="lx-figure">
          <div className="lx-window">
            <div className="lx-window-bar" aria-hidden="true">
              <span className="lx-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="lx-address">{format.address}</span>
            </div>
            <span className="lx-shot">
              <ShotImages file={current.file} alt={current.alt} />
            </span>
          </div>
          <figcaption className="lx-mono">
            <span>
              Fig. {active + 2}.{shot + 1} · {current.label}
            </span>
            <span>{format.label}</span>
          </figcaption>
        </figure>
        <div className="lx-screens-side">
          <h3>{format.title}</h3>
          <p>{format.body}</p>
          <div className="lx-thumbs" role="group" aria-label={`${format.label} screens`}>
            {format.shots.map((item, index) => (
              <button
                key={item.file}
                type="button"
                aria-pressed={index === shot}
                onClick={() => setShot(index)}
              >
                <b>{String(index + 1).padStart(2, '0')}</b>
                {item.label}
                <span className="lx-shot">
                  <ShotImages file={item.file} alt="" />
                </span>
              </button>
            ))}
          </div>
          <Link href="/login/student" className="lx-link">
            Open your study space <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
