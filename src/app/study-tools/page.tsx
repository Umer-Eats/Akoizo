import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { eventsForDivision } from '@/lib/events';
import { eventPagePath, pageMetadata } from '@/lib/seo';
import { slotColor } from '@/components/landing-data';
import { Notes, PageHero } from '@/components/landing-page';
import { HomeShowcase } from '@/components/home-showcase';

export const metadata = pageMetadata('/study-tools');

const resources = [
  [
    'Science Olympiad event lessons',
    'Build understanding with lessons organised around your event, in subjects such as Anatomy and Physiology, Codebusters, Circuit Lab, Disease Detectives, and Rocks and Minerals. The event toolkit moves you between lessons and rules.',
  ],
  [
    'Science Olympiad practice tests',
    'Work through available past papers, submit answers, and review feedback to find topics to revisit before your next competition. Paper availability varies by event; written responses may need instructor review.',
  ],
  [
    'Study with your school',
    'Students join a school study group with an instructor’s joining password. Instructors organise assignments and follow progress. Tools are free; an account and school membership open the study dashboard.',
  ],
];

const divisions = [
  ['A', 'Elementary', 'Florida event slate.'],
  ['B', 'Middle school', 'Middle school events.'],
  ['C', 'High school', 'High school events.'],
] as const;

export default function StudyToolsPage() {
  return (
    <main id="main" className="lx-page">
      <PageHero
        label="Akoizo study tools"
        title="Free Science Olympiad study tools"
        lead="Prepare for Science Olympiad (SciOly) with event lessons, practice tests, rules and study groups for your team. Pick your event below to see its free study guide, then sign in to study in your division."
      >
        <Link href="/login/student" className="lx-btn">
          Start studying with Akoizo <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="#catalog" className="lx-btn lx-btn-line">
          Jump to the catalog
        </Link>
      </PageHero>

      <Notes id="resources" num={1} label="What you get">
        <div className="lx-points">
          {resources.map(([title, body], i) => (
            <div className="lx-point" key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h2 className="lx-point-title">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Notes>

      <Notes
        id="in-action"
        num={2}
        label="See it in action"
        title="Recorded in Akoizo"
        lead="Short screen recordings of the dashboard, lessons, past tests and labs. Each event keeps its tournament timeslot colour."
      >
        <HomeShowcase />
      </Notes>

      <Notes
        id="catalog"
        num={3}
        label="Event catalog"
        title="2027 Science Olympiad event catalog"
        lead="Find your event in Division A, B, or C. Colours identify tournament timeslot groups. Lesson and practice coverage varies by event; always confirm current rules with your tournament organisers."
      >
        <div className="lx-divisions">
          {divisions.map(([division, level, note]) => (
            <section
              className="lx-division"
              key={division}
              aria-labelledby={`division-${division}`}
            >
              <h3 id={`division-${division}`}>
                Division {division} <small>{level}</small>
              </h3>
              <p>{note}</p>
              <ul>
                {eventsForDivision(division).map((event) => (
                  <li key={event.id} data-slot={slotColor(event.id)}>
                    <Link className="lx-event" href={eventPagePath(division, event.id)}>
                      {event.name}
                      {event.special && <small>Special</small>}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="lx-fine">
          Division A special events and tournament availability can vary by location.
        </p>
      </Notes>

      <section className="lx-close" aria-labelledby="begin-title">
        <div className="lx-wrap">
          <p className="lx-mono">Ready when you are</p>
          <h2 id="begin-title">Begin your Science Olympiad preparation.</h2>
          <p className="lx-lead">
            Choose your division, select your events, and build a steady study routine. Akoizo is
            independent and is not affiliated with Science Olympiad, Inc.
          </p>
          <div className="lx-actions">
            <Link href="/login/student" className="lx-btn">
              Student sign in <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/mission" className="lx-btn lx-btn-line">
              Learn about our mission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
