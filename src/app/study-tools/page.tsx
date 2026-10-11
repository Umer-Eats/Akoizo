import Link from 'next/link';
import { eventsForDivision } from '@/lib/events';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/study-tools');

export default function StudyToolsPage() {
  return (
    <main id="main" className="page-container">
      <section className="page-heading">
        <p className="eyebrow">AKOIZO / THE OPEN STUDY LAB</p>
        <h1>Free Science Olympiad study tools</h1>
        <p>
          Prepare for Science Olympiad with Akoizo: a free study space for event lessons, practice
          tests, and learning with your school community. Explore the event catalog below, then sign
          in to study in your division.
        </p>
        <Link href="/login/student" className="button button-primary">
          Start studying with Akoizo
        </Link>
      </section>
      <section className="mission-values" aria-label="Science Olympiad preparation resources">
        <div className="mission-value">
          <span className="eyebrow">01 / LEARN</span>
          <h2>Science Olympiad event lessons</h2>
          <p>
            Build understanding with lessons organized around your event. Study concepts in subjects
            such as Anatomy and Physiology, Codebusters, Circuit Lab, Disease Detectives, and Rocks
            and Minerals. Use the event toolkit to move between lessons and rules.
          </p>
        </div>
        <div className="mission-value">
          <span className="eyebrow">02 / PRACTICE</span>
          <h2>Science Olympiad practice tests</h2>
          <p>
            Work through available past papers, submit answers, and review feedback. Practice tests
            help you identify topics to revisit before your next competition. Paper availability
            varies by event; written responses may need instructor review.
          </p>
        </div>
        <div className="mission-value">
          <span className="eyebrow">03 / CONNECT</span>
          <h2>Study with your school</h2>
          <p>
            Students join a school study group using an instructor’s joining password. Instructors
            can organize assignments and follow student progress. Tools are free; an account and
            school membership are required to access the study dashboard.
          </p>
        </div>
      </section>
      <section className="study-catalog" aria-labelledby="event-catalog-title">
        <h2 id="event-catalog-title">2027 Science Olympiad event catalog</h2>
        <p>
          Find your event in Division A, B, or C. The catalog identifies events in Akoizo; lesson
          and practice coverage varies by event. Always confirm current rules with your tournament
          organizers.
        </p>
        <div className="study-division-grid">
          {(['A', 'B', 'C'] as const).map((division) => (
            <section key={division}>
              <h3>Division {division}</h3>
              <p>
                {division === 'A'
                  ? 'Elementary school: Florida event slate.'
                  : division === 'B'
                    ? 'Middle school events.'
                    : 'High school events.'}
              </p>
              <ul>
                {eventsForDivision(division).map((event) => (
                  <li key={event.id}>
                    {event.name}
                    {event.special ? ' (special event)' : ''}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p>Division A special events and tournament availability can vary by location.</p>
      </section>
      <section className="mission-bottom">
        <div>
          <h2>Begin your Science Olympiad preparation</h2>
          <p>
            Choose your division, select your events, and build a steady study routine with Akoizo.
          </p>
          <p>Akoizo is independent and is not affiliated with Science Olympiad, Inc.</p>
          <Link href="/mission" className="text-link">
            Learn about our mission
          </Link>
        </div>
        <Link href="/login/student" className="button button-primary">
          Student sign in
        </Link>
      </section>
    </main>
  );
}
