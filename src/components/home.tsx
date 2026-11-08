'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FileText,
  FlaskConical,
  Folder,
  FolderOpen,
  Plus,
  Search,
  Trophy,
} from 'lucide-react';
import { eventsForDivision, type Division } from '@/lib/events';
import { eventPagePath } from '@/lib/seo';
import { HomeShowcase } from './home-showcase';
import { groupBySlot } from './landing-data';
import { openCommandPalette } from './command-palette';
import { VaultGraph } from './vault-graph';
import { VaultWorkspace } from './vault-workspace';

const delay = (d: number) => ({ '--d': d }) as CSSProperties;

// Elements marked data-reveal fade in once as they scroll into view.
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          observer.unobserve(entry.target);
        }),
      { rootMargin: '0px 0px -12% 0px' },
    );
    items.forEach((item) => observer.observe(item));
    document.documentElement.dataset.reveal = 'ready';
    // Cards and buttons glow where the pointer is.
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('.vx-card, .vx-btn');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      delete document.documentElement.dataset.reveal;
    };
  }, []);
}

function Section({
  id,
  path,
  title,
  lead,
  children,
}: {
  id: string;
  path: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="vx-section" aria-labelledby={`${id}-title`}>
      <div className="lx-wrap">
        <header className="vx-section-head" data-reveal>
          <p className="vx-path">
            <FileText size={12} aria-hidden="true" /> akoizo / <b>{path}</b>
          </p>
          <h2 id={`${id}-title`}>{title}</h2>
          {lead && <p className="vx-lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

// A big statement whose words light up as it scrolls past.
function Statement({ text }: { text: string }) {
  return (
    <section className="vx-statement" aria-label="What Akoizo is">
      <p className="lx-wrap">
        {text.split(' ').map((word, i) => (
          <span key={i} className={word.startsWith('[[') ? 'vx-st-link' : undefined}>
            {word.replace(/\[\[|\]\]/g, '')}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}

function Explorer() {
  const [division, setDivision] = useState<Division>('C');
  const [query, setQuery] = useState('');
  const [closed, setClosed] = useState<string[]>([]);
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groupBySlot(
      eventsForDivision(division).filter((event) => event.name.toLowerCase().includes(q)),
    );
  }, [division, query]);
  const slotted = groups.some((group) => group.color !== 'unassigned');
  const total = groups.reduce((n, g) => n + g.events.length, 0);
  return (
    <div className="vx-explorer" data-reveal>
      <div className="vx-explorer-bar">
        <div className="vx-vaults" role="group" aria-label="Division">
          {(['A', 'B', 'C'] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={division === d}
              onClick={() => setDivision(d)}
            >
              Division {d}
            </button>
          ))}
        </div>
        <label className="vx-filter">
          <Search size={14} aria-hidden="true" />
          <span className="sr-only">Filter events</span>
          <input
            type="search"
            placeholder="Filter events"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <span className="vx-count">{total} notes</span>
      </div>
      {groups.length ? (
        <div className="vx-tree" aria-live="polite">
          {groups.map((group) => {
            const isClosed = closed.includes(group.color) && !query;
            return (
              <div className="vx-folder" key={group.color} data-slot={group.color}>
                <button
                  type="button"
                  className="vx-folder-head"
                  aria-expanded={!isClosed}
                  onClick={() =>
                    setClosed((c) =>
                      c.includes(group.color)
                        ? c.filter((x) => x !== group.color)
                        : [...c, group.color],
                    )
                  }
                >
                  <ChevronDown size={14} aria-hidden="true" />
                  {isClosed ? (
                    <Folder size={15} aria-hidden="true" />
                  ) : (
                    <FolderOpen size={15} aria-hidden="true" />
                  )}
                  <i aria-hidden="true" />
                  {slotted ? group.label : `Division ${division} events`}
                  <span>{group.events.length}</span>
                </button>
                {!isClosed && (
                  <ul>
                    {group.events.map((event, i) => (
                      <li key={event.id} style={delay(i)}>
                        <Link href={eventPagePath(division, event.id)}>
                          <FileText size={13} aria-hidden="true" />
                          {event.name}
                          {event.type !== 'Study' && <small>{event.type}</small>}
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="vx-empty">
          No Division {division} event matches “{query}”.
        </p>
      )}
      <p className="vx-explorer-foot">
        <span>
          Folders follow tournament timeslot groups. Confirm your schedule with your organisers.
        </span>
        <Link className="lx-link" href="/study-tools">
          Full event catalog <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </p>
    </div>
  );
}

const tools = [
  {
    icon: BookOpen,
    file: 'lessons',
    title: 'Event lessons',
    body: 'A course of units for every event. Each lesson goes Learn, Practice, Labs, Checkpoint: key ideas and diagrams, recall activities, interactive models, then questions.',
  },
  {
    icon: FileText,
    file: 'past-tests',
    title: 'Real past tests',
    body: 'The original paper beside a timed answer sheet. Drafts save as you go, scored on the published key.',
  },
  {
    icon: FlaskConical,
    file: 'labs',
    title: 'Virtual labs',
    body: 'Write a hypothesis, move the controls, record trials in a lab notebook you can export.',
  },
  {
    icon: FolderOpen,
    file: 'binders',
    title: 'Binders and cheatsheets',
    body: 'Build the binder and cheatsheet you bring to the tournament, and drill vocab in quick rounds.',
  },
  {
    icon: Trophy,
    file: 'ranked',
    title: 'Ranked tests',
    body: 'Sit ranked tests and see how you and your school compare with students everywhere.',
  },
];

const questions = [
  [
    'Is Akoizo really free?',
    'Yes. No paywalls and no ads. Every lesson and every practice test stays free, for every school.',
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
    'Yes. Every event has a public study guide, and the screens on this page come from a real student account.',
  ],
  [
    'Is Akoizo part of Science Olympiad?',
    'No. Akoizo is an independent learning project and is not affiliated with Science Olympiad, Inc.',
  ],
];

export function Home() {
  useReveal();
  return (
    <main id="main" className="lx-page vx-page">
      <section className="vx-hero" aria-labelledby="hero-title">
        <VaultGraph />
        <div className="vx-hero-fade" aria-hidden="true" />
        <div className="lx-wrap vx-hero-inner" data-enter>
          <p className="vx-eyebrow" style={delay(0)}>
            Akoizo
          </p>
          <h1 id="hero-title" style={delay(1)}>
            Study like
            <br />
            everything <em>connects.</em>
          </h1>
          <p className="vx-lead" style={delay(2)}>
            Lessons, notes, past papers and labs in one quiet workspace. Read it, write it in your
            words, and watch your knowledge link up.
          </p>
          <div className="vx-actions" style={delay(3)}>
            <Link className="vx-btn" href="/login/student">
              Open your study space <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button type="button" className="vx-btn vx-btn-ghost" onClick={openCommandPalette}>
              <Search size={15} aria-hidden="true" /> Search events <kbd>Ctrl K</kbd>
            </button>
          </div>
        </div>
        <div className="lx-wrap vx-hero-foot" aria-hidden="true">
          <span>Free for every student. Always.</span>
          <span>Hover the graph · click a note to open it</span>
        </div>
      </section>

      <Statement text="Not a pile of PDFs. A [[vault]] of ideas that link, grow and stay yours — one event at a time." />

      <Section
        id="workspace"
        path="workspace"
        title={
          <>
            Read. Write. <em>Connect.</em> Recall.
          </>
        }
        lead="Four moves, one window. Scroll through a study session the way it happens in Akoizo."
      >
        <VaultWorkspace />
      </Section>

      <Section
        id="events"
        path="events"
        title="Every event, a folder of its own."
        lead="Explore the 2027 events grouped by tournament timeslot, then open a free guide."
      >
        <Explorer />
      </Section>

      <Section
        id="toolkit"
        path="toolkit"
        title="Everything for the season."
        lead="Learn the material, test yourself on real papers, then practise the hands-on parts."
      >
        <div className="vx-cards">
          {tools.map((tool, i) => (
            <article className="vx-card" key={tool.file} data-reveal style={delay(i)}>
              <p className="vx-card-path">
                <tool.icon size={14} aria-hidden="true" /> {tool.file}.md
              </p>
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
            </article>
          ))}
          <Link className="vx-card vx-card-cta" href="/login/student" data-reveal style={delay(5)}>
            <Plus size={18} aria-hidden="true" />
            <h3>Start your own vault</h3>
            <p>Free, with your school’s joining password.</p>
          </Link>
        </div>
      </Section>

      <Section
        id="inside"
        path="recordings"
        title="See it before you sign in."
        lead="Real screen recordings of Akoizo from a demo student account. Each event keeps its tournament timeslot colour."
      >
        <div data-reveal>
          <HomeShowcase />
        </div>
      </Section>

      <Section
        id="method"
        path="getting-started"
        title="From sign-up to tournament day."
        lead="Akoizo is organised around your school team, so coaches can assign work while students study at their own pace."
      >
        <ol className="vx-steps">
          {[
            [
              'Pick your events',
              'Choose your division and events. Each one opens its own course, tests and rules.',
            ],
            [
              'Join your school',
              'Enter the joining password from your coach to land in your school’s study group.',
            ],
            [
              'Learn and practise',
              'Work through lessons, sit past papers, review mistakes and watch your ranking move.',
            ],
          ].map(([title, body], i) => (
            <li key={title} data-reveal style={delay(i)}>
              <span>
                <input
                  type="checkbox"
                  checked={i === 0}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="vx-callout-wide" data-reveal>
          <p>
            <b>For coaches</b>
            Your school is added for free, with tools for assignments, ranked tests and progress.
          </p>
          <Link className="vx-btn" href="/contact">
            Add your school <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </Section>

      <Section
        id="questions"
        path="faq"
        title="Questions, answered."
        lead={
          <>
            Something else on your mind?{' '}
            <Link className="lx-link" href="/contact">
              Write to us <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </>
        }
      >
        <div className="vx-faq" data-reveal>
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>
                <ChevronDown size={16} aria-hidden="true" />
                {q}
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="vx-close" aria-labelledby="free-title">
        <div className="lx-wrap" data-reveal>
          <p className="vx-path">
            <FileText size={12} aria-hidden="true" /> akoizo / <b>promise</b>
          </p>
          <h2 id="free-title">
            No paywalls. No ads.
            <br />
            <em>Always free.</em>
          </h2>
          <p className="vx-lead">
            Built and run by one high school student who thinks good study tools should open doors,
            wherever your school is and whatever it can spend.
          </p>
          <div className="vx-actions">
            <Link className="vx-btn" href="/login/student">
              Start studying free <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link className="vx-btn vx-btn-ghost" href="/mission">
              Read our mission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
