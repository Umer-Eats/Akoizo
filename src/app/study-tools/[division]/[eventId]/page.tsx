import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eventFocus, eventsForDivision, toolCatalog } from '@/lib/events';
import { eventToolIds, rulesForEvent } from '@/lib/event-rules';
import { lessonsForEvent } from '@/lib/lessons-registry';
import { listPracticeTests } from '@/lib/practice-catalog';
import {
  divisionLevel,
  eventPageMetadata,
  eventPagePath,
  eventPages,
  findEventPage,
  siteUrl,
} from '@/lib/seo';

type Params = { division: string; eventId: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return eventPages.map(({ path }) => {
    const [, , division, eventId] = path.split('/');
    return { division, eventId };
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const page = findEventPage((await params).division, (await params).eventId);
  if (!page) return {};
  return eventPageMetadata(
    page.division,
    page.event,
    !!lessonsForEvent(page.event.id, page.division),
  );
}

export default async function EventStudyGuidePage({ params }: { params: Promise<Params> }) {
  const { division: divisionParam, eventId } = await params;
  const page = findEventPage(divisionParam, eventId);
  if (!page) notFound();
  const { division, event, path } = page;
  const course = lessonsForEvent(event.id, division);
  const practice = division === 'A' ? [] : listPracticeTests(division, event.id);
  const rules = rulesForEvent(division, event);
  const focus = eventFocus[event.type];
  const toolIds = new Set(eventToolIds(division, event));
  const tools = toolCatalog.filter((tool) => toolIds.has(tool.id));
  const lessonTitles = new Map(course?.lessons.map((lesson) => [lesson.id, lesson.title]));
  const related = eventsForDivision(division)
    .filter((other) => other.category === event.category && other.id !== event.id)
    .slice(0, 6);
  const otherDivisions = eventPages.filter(
    (other) => other.event.id === event.id && other.division !== division,
  );
  const url = `${siteUrl}${path}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Akoizo', item: `${siteUrl}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Science Olympiad study tools',
            item: `${siteUrl}/study-tools`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${event.name} (Division ${division})`,
            item: url,
          },
        ],
      },
      {
        '@type': 'LearningResource',
        '@id': `${url}#guide`,
        name: `${event.name} Science Olympiad study guide, Division ${division}`,
        url,
        description: course?.intro ?? focus.description,
        educationalLevel: `Science Olympiad Division ${division} (${divisionLevel[division]})`,
        learningResourceType: 'Study guide',
        isAccessibleForFree: true,
        inLanguage: 'en',
        about: event.name,
        teaches: course?.units.map((unit) => unit.title),
        provider: { '@id': `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <main id="main" className="page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <nav aria-label="Breadcrumb" className="eyebrow">
        <Link href="/study-tools">Study tools</Link> / Division {division} / {event.name}
      </nav>
      <section className="page-heading">
        <p className="eyebrow">
          SCIENCE OLYMPIAD / DIVISION {division} / {event.category.toUpperCase()}
        </p>
        <h1>
          {event.name} Science Olympiad study guide (Division {division})
        </h1>
        <p>
          {course?.intro ??
            `${event.name} is a Division ${division} (${divisionLevel[division]}) ${event.type.toLowerCase()} event in the ${event.category.toLowerCase()} category. ${focus.description}`}
        </p>
        <p>
          Akoizo’s {event.name} resources are free for SciOly students and school teams. Sign in
          with your school to open the lessons and practice in the study dashboard.
        </p>
        <Link href="/login/student" className="button button-primary">
          Study {event.name} free
        </Link>
      </section>

      <section className="mission-values" aria-label={`${event.name} event overview`}>
        <div className="mission-value">
          <span className="eyebrow">EVENT TYPE</span>
          <h2>{focus.title}</h2>
          <p>
            {event.name} is a {event.type.toLowerCase()} event
            {event.special ? ' and a special event at some tournaments' : ''}. {focus.description}
          </p>
        </div>
        <div className="mission-value">
          <span className="eyebrow">LESSONS</span>
          <h2>{course ? `${course.lessons.length} lessons` : 'Event study plan'}</h2>
          <p>
            {course
              ? `${course.units.length} units cover the ${event.name} topic list, with key terms, worked examples, and practice questions in every lesson.`
              : `Use the event rules and Akoizo’s study tools to plan your ${event.name} preparation.`}
          </p>
        </div>
        <div className="mission-value">
          <span className="eyebrow">PRACTICE</span>
          <h2>
            {practice.length
              ? `${practice.length} practice test${practice.length === 1 ? '' : 's'}`
              : 'Practice tools'}
          </h2>
          <p>
            {practice.length
              ? `Past ${event.name} tests from invitationals and tournaments, converted to submit online with answer feedback.`
              : `Practice availability for ${event.name} varies; check the dashboard for current materials.`}
          </p>
        </div>
      </section>

      {course && (
        <section className="study-catalog" aria-labelledby="units-title">
          <h2 id="units-title">What the {event.name} lessons cover</h2>
          {course.units.map((unit) => (
            <div key={unit.id}>
              <h3>{unit.title}</h3>
              <p>{unit.description}</p>
              <ul>
                {unit.lessonIds
                  .map((id) => lessonTitles.get(id))
                  .filter(Boolean)
                  .map((title) => (
                    <li key={title}>{title}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {practice.length > 0 && (
        <section className="study-catalog" aria-labelledby="practice-title">
          <h2 id="practice-title">{event.name} practice tests</h2>
          <ul>
            {practice.slice(0, 12).map((test) => (
              <li key={test.id}>
                {test.year} {test.competition}
                {test.topics.length ? ` (${test.topics.slice(0, 4).join(', ')})` : ''}
              </li>
            ))}
          </ul>
          {practice.length > 12 && <p>And {practice.length - 12} more in the dashboard.</p>}
        </section>
      )}

      <section className="study-catalog" aria-labelledby="tools-title">
        <h2 id="tools-title">Free {event.name} study tools</h2>
        <ul>
          {tools.map((tool) => (
            <li key={tool.id}>
              <strong>{tool.name}:</strong> {tool.description}
            </li>
          ))}
        </ul>
        <p>
          Read the official{' '}
          <a href={rules.sectionUrl}>
            {event.name} Division {division} rules (PDF)
          </a>
          . Always confirm current rules with your tournament.
        </p>
        {course?.references.length ? (
          <>
            <h3>Recommended references</h3>
            <ul>
              {course.references.map((ref) => (
                <li key={ref.url}>
                  <a href={ref.url} rel="noopener noreferrer nofollow" target="_blank">
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>

      {(related.length > 0 || otherDivisions.length > 0) && (
        <section className="study-catalog" aria-labelledby="related-title">
          <h2 id="related-title">Related Science Olympiad events</h2>
          <ul>
            {otherDivisions.map((other) => (
              <li key={other.path}>
                <Link href={other.path}>
                  {event.name} study guide for Division {other.division}
                </Link>
              </li>
            ))}
            {related.map((other) => (
              <li key={other.id}>
                <Link href={eventPagePath(division, other.id)}>
                  {other.name} (Division {division})
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mission-bottom">
        <div>
          <h2>Bring {event.name} prep to your school team</h2>
          <p>
            Instructors can add their school for free, assign lessons and practice tests, and follow
            student progress.
          </p>
          <p>Akoizo is independent and is not affiliated with Science Olympiad, Inc.</p>
          <Link href="/contact" className="text-link">
            Add your school
          </Link>
        </div>
        <Link href="/login/student" className="button button-primary">
          Student sign in
        </Link>
      </section>
    </main>
  );
}
