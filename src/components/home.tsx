'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  FileText,
  FlaskConical,
  FolderOpen,
  Plus,
  Search,
  Trophy,
  Zap,
} from 'lucide-react';
import { eventsForDivision, type Division } from '@/lib/events';
import { eventPagePath } from '@/lib/seo';
import { HomeShowcase } from './home-showcase';
import { groupBySlot } from './landing-data';

const chapters = [
  { id: 'syllabus', label: 'Event syllabus' },
  { id: 'toolkit', label: 'Study toolkit' },
  { id: 'inside', label: 'Inside Akoizo' },
  { id: 'method', label: 'How it works' },
  { id: 'questions', label: 'Questions' },
];

const delay = (d: number) => ({ '--d': d }) as CSSProperties;

function Shot({ file, alt, eager = false }: { file: string; alt: string; eager?: boolean }) {
  // Both themes are rendered; CSS shows the one matching the site theme.
  return (
    <span className="lx-shot">
      {(['dark', 'light'] as const).map((theme) => (
        <img
          key={theme}
          className={`lx-shot-${theme}`}
          src={`/home/${file}-${theme}.png`}
          alt={theme === 'dark' ? alt : ''}
          width={1440}
          height={900}
          loading={eager ? 'eager' : 'lazy'}
        />
      ))}
    </span>
  );
}

// A section is a page of notes: the margin holds its number and the contents rail.
function Sheet({
  id,
  active,
  children,
}: {
  id: string;
  active: string;
  children: ReactNode;
}) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  return (
    <section id={id} className="lx-sheet lx-wrap" aria-labelledby={`${id}-title`}>
      <div className="lx-margin">
        <div className="lx-margin-inner">
          <b aria-hidden="true">{String(index + 1).padStart(2, '0')}</b>
          <span className="lx-mono">{chapters[index].label}</span>
          <ul className="lx-rail" aria-label="On this page">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`} aria-current={active === chapter.id || undefined}>
                  {chapter.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}

function Syllabus() {
  const [division, setDivision] = useState<Division>('C');
  const [query, setQuery] = useState('');
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const events = eventsForDivision(division).filter((event) =>
      event.name.toLowerCase().includes(q),
    );
    return groupBySlot(events);
  }, [division, query]);
  const slotted = groups.some((group) => group.color !== 'unassigned');
  return (
    <>
      <div className="lx-syllabus-bar">
        <div className="lx-seg" role="group" aria-label="Division">
          {(['A', 'B', 'C'] as const).map((d) => (
            <button key={d} type="button" aria-pressed={division === d} onClick={() => setDivision(d)}>
              Division {d}
            </button>
          ))}
        </div>
        <label className="lx-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search events</span>
          <input
            type="search"
            placeholder="Search events"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      {groups.length ? (
        <div className="lx-slots" aria-live="polite">
          {groups.map((group) => (
            <div className="lx-slot" key={group.color} data-slot={group.color}>
              <h3>
                <i aria-hidden="true" />
                {slotted ? group.label : `Division ${division} events`}
              </h3>
              <ul>
                {group.events.map((event) => (
                  <li key={event.id}>
                    <Link className="lx-event" href={eventPagePath(division, event.id)}>
                      {event.name}
                      {event.type !== 'Study' && <small>{event.type}</small>}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="lx-empty">No {`Division ${division}`} event matches “{query}”.</p>
      )}
      <div className="lx-syllabus-foot">
        <span>Colours mark tournament timeslot groups. Always confirm current rules with your organisers.</span>
        <Link className="lx-link" href="/study-tools">
          Full event catalog <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}

function Worksheet() {
  const [answer, setAnswer] = useState('');
  const right = answer === 'Force';
  return (
    <div className="lx-worksheet">
      <div className="lx-worksheet-top">
        <span className="lx-mono">Practice · Question 01</span>
        <span className="lx-mono">Physics</span>
      </div>
      <h3>Which quantity is measured in newtons?</h3>
      <div className="lx-options">
        {['Force', 'Energy', 'Power'].map((a, i) => (
          <button
            key={a}
            type="button"
            onClick={() => setAnswer(a)}
            aria-pressed={answer === a}
            data-right={answer === a && a === 'Force'}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {a}
            {answer === a && a === 'Force' && <Check size={18} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <p className="lx-feedback" aria-live="polite" data-state={right ? 'right' : undefined}>
        {answer
          ? right
            ? 'Correct. A newton is the SI unit of force.'
            : 'Not quite. Think about a push or a pull.'
          : 'Pick an answer to check it.'}
      </p>
      <Link className="lx-link" href="/login/student">
        Try a full practice test <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

const tools = [
  {
    icon: BookOpen,
    title: 'Event lessons',
    body: 'Every event is a course of units: short reading, reference figures, a worked example, an interactive model and a practice assignment.',
  },
  {
    icon: FileText,
    title: 'Real past tests',
    body: 'The original paper sits beside a timed answer sheet. Drafts save as you go, and scoring follows the published key.',
  },
  {
    icon: FlaskConical,
    title: 'Virtual labs',
    body: 'Write a hypothesis, move the controls, watch the readings change, and keep your trials in a notebook you can export.',
  },
  {
    icon: FolderOpen,
    title: 'Binders, cheatsheets and vocab',
    body: 'Build the binder and cheatsheet you bring to the tournament, and drill vocabulary in quick rounds.',
  },
  {
    icon: Trophy,
    title: 'Ranked tests and rankings',
    body: 'Sit ranked tests and see how you and your school compare with students everywhere.',
  },
];

const questions = [
  [
    'Is Akoizo really free?',
    'Yes. There are no paywalls and no ads. Every lesson and every practice test stays free, for every school.',
  ],
  [
    'Who can use it?',
    'Science Olympiad students in Division A, B and C, and the teachers and coaches who run their teams.',
  ],
  [
    'How does my school join?',
    'A coach emails us with the school’s name, location and divisions. Once set up, the coach shares a joining password with students.',
  ],
  [
    'Can I look around before signing in?',
    'Yes. Every event has a public study guide in the event catalog, and the screens on this page come from a real student account.',
  ],
  [
    'Is Akoizo part of Science Olympiad?',
    'No. Akoizo is an independent learning project and is not affiliated with Science Olympiad, Inc.',
  ],
];

export function Home() {
  const [active, setActive] = useState(chapters[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main" className="lx-page">
      <section className="lx-hero" aria-labelledby="hero-title">
        <div className="lx-hero-grid lx-wrap">
          <div className="lx-hero-margin" data-enter>
            <span className="lx-mono" style={delay(0)}>
              Lecture 00 · Introduction
            </span>
            <ul aria-label="In these notes" style={delay(2)}>
              {chapters.map((chapter, i) => (
                <li key={chapter.id}>
                  <a href={`#${chapter.id}`}>
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    {chapter.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lx-hero-main">
            <div data-enter>
              <p className="lx-mono" style={delay(0)}>
                Science Olympiad · Divisions A, B and C
              </p>
              <h1 id="hero-title" style={delay(1)}>
                Science Olympiad prep, <span className="lx-mark">free</span> for every student.
              </h1>
              <p className="lx-lead" style={delay(2)}>
                Event lessons, real past tests and virtual labs in one study space your whole school
                team can share. No ads and no paywalls.
              </p>
              <div className="lx-actions" style={delay(3)}>
                <Link className="lx-btn" href="/login/student">
                  Start studying free <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="lx-btn lx-btn-line" href="#syllabus">
                  Find your event
                </Link>
              </div>
              <p className="lx-hero-note" style={delay(4)}>
                Coaching a team? <Link href="/contact">Add your school</Link>
              </p>
            </div>
            <figure className="lx-figure" data-enter>
              <div style={delay(3)}>
                <span className="lx-note lx-note-a" aria-hidden="true">
                  <span>Your toolkit</span>
                  <i />
                </span>
                <span className="lx-note lx-note-b" aria-hidden="true">
                  <span>Live model</span>
                  <i />
                </span>
                <div className="lx-window">
                  <div className="lx-window-bar" aria-hidden="true">
                    <span className="lx-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="lx-address">akoizo.app / anatomy-and-physiology / lessons</span>
                  </div>
                  <Shot
                    file="lesson-model"
                    alt="Ventilation simulator with sliders for tidal volume, breathing rate, and dead space beside a live lung diagram."
                    eager
                  />
                </div>
              </div>
              <figcaption className="lx-mono" style={delay(4)}>
                <span>Fig. 1 · A lesson’s interactive model</span>
                <span>Anatomy and Physiology</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Sheet id="syllabus" active={active}>
        <div className="lx-intro">
          <h2 id="syllabus-title" className="lx-h2">
            Find your event. Open its study guide.
          </h2>
          <p className="lx-lead">
            Every 2027 event, sorted into the timeslot groups your tournament runs them in. Pick a
            division, search, and jump straight to a free guide.
          </p>
        </div>
        <Syllabus />
      </Sheet>

      <Sheet id="toolkit" active={active}>
        <div className="lx-intro">
          <h2 id="toolkit-title" className="lx-h2">
            Everything for the season, in one study space.
          </h2>
          <p className="lx-lead">
            Learn the material, test yourself on real papers, then practice the hands-on parts.
            Try the sample question while you read.
          </p>
        </div>
        <div className="lx-tool-grid">
          <div className="lx-tool-list">
            {tools.map((tool) => (
              <div className="lx-tool" key={tool.title}>
                <tool.icon size={22} aria-hidden="true" />
                <h3>{tool.title}</h3>
                <p>{tool.body}</p>
              </div>
            ))}
          </div>
          <Worksheet />
        </div>
      </Sheet>

      <Sheet id="inside" active={active}>
        <HomeShowcase />
      </Sheet>

      <Sheet id="method" active={active}>
        <div className="lx-intro">
          <h2 id="method-title" className="lx-h2">
            From sign-up to tournament day.
          </h2>
          <p className="lx-lead">
            Akoizo is organised around your school team, so coaches can assign work and follow
            progress while students study at their own pace.
          </p>
        </div>
        <div className="lx-points">
          {[
            [
              'Pick your events',
              'Choose your division and the events you compete in. Each one opens its own course, tests and rules.',
            ],
            [
              'Join your school',
              'Enter the joining password from your coach to land in your school’s study group.',
            ],
            [
              'Learn and practice',
              'Work through lessons, sit past papers, review your mistakes and watch your ranking move.',
            ],
          ].map(([title, body], i) => (
            <div className="lx-point" key={title}>
              <span>Step {String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="lx-callout">
          <p>
            <strong>Note for coaches</strong>
            Your school is added for free, with instructor tools for assignments, ranked tests and
            progress.
          </p>
          <Link className="lx-btn" href="/contact">
            Add your school <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Sheet>

      <Sheet id="questions" active={active}>
        <div className="lx-intro">
          <h2 id="questions-title" className="lx-h2">
            Questions, answered.
          </h2>
          <p className="lx-lead">
            Something else on your mind?{' '}
            <Link className="lx-link" href="/contact">
              Write to us <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
        <div className="lx-faq">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </Sheet>

      <section className="lx-close" aria-labelledby="free-title">
        <div className="lx-wrap">
          <p className="lx-mono">
            <Zap size={12} aria-hidden="true" /> Our promise
          </p>
          <h2 id="free-title">
            No paywalls. No ads. <span className="lx-blue">Always free.</span>
          </h2>
          <p className="lx-lead">
            Akoizo is built and run by one high school student who thinks good study tools should
            open doors, wherever your school is and whatever it can spend.
          </p>
          <div className="lx-actions">
            <Link className="lx-btn" href="/login/student">
              Start studying free <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="lx-btn lx-btn-line" href="/mission">
              Read our mission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
