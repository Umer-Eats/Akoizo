'use client';
import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, FileText, FlaskConical } from 'lucide-react';
import { Reveal } from './art';
import './home-showcase.css';

// Screens are captured from the signed-in app by scripts/home-screenshots.mjs.
const formats = [
  {
    id: 'lessons',
    label: 'Lesson format',
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
    label: 'Testing format',
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
    label: 'Lab format',
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

export function HomeShowcase() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const format = formats[active];
  const current = format.shots[shot];
  return (
    <section id="inside" className="showcase container" aria-labelledby="showcase-title">
      <Reveal className="showcase-heading">
        <p className="eyebrow">INSIDE AKOIZO</p>
        <h2 id="showcase-title">
          See it before
          <br />
          <span className="muted">you sign in.</span>
        </h2>
        <p>Real screens from a student account. Nothing here is a mock-up.</p>
      </Reveal>
      <div className="showcase-tabs" role="tablist" aria-label="Study formats">
        {formats.map((item, index) => (
          <button
            key={item.id}
            id={`showcase-tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={index === active}
            aria-controls="showcase-panel"
            className={index === active ? 'active' : ''}
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
        className="showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${format.id}`}
      >
        <figure className="showcase-frame">
          <div className="showcase-bar" aria-hidden="true">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="showcase-address">{format.address}</span>
          </div>
          {/* Both themes are rendered; CSS shows the one matching the site theme. */}
          <div className="showcase-viewport">
            {['dark', 'light'].map((theme) => (
              <img
                key={`${current.file}-${theme}`}
                className={`showcase-shot showcase-shot-${theme}`}
                src={`/home/${current.file}-${theme}.png`}
                alt={current.alt}
                width={1440}
                height={900}
                loading="lazy"
              />
            ))}
          </div>
        </figure>
        <div className="showcase-details">
          <div className="showcase-copy">
            <h3>{format.title}</h3>
            <p>{format.body}</p>
            <Link href="/login/student" className="text-link">
              Open your study space <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="showcase-thumbs" role="group" aria-label={`${format.label} screens`}>
            {format.shots.map((item, index) => (
              <button
                key={item.file}
                type="button"
                className={index === shot ? 'active' : ''}
                aria-pressed={index === shot}
                onClick={() => setShot(index)}
              >
                {['dark', 'light'].map((theme) => (
                  <img
                    key={theme}
                    className={`showcase-shot-${theme}`}
                    src={`/home/${item.file}-${theme}.png`}
                    alt=""
                    width={1440}
                    height={900}
                    loading="lazy"
                  />
                ))}
                <span>
                  {String(index + 1).padStart(2, '0')} / {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
