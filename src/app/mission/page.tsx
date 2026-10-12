import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Orbit, Reveal } from '@/components/art';
export const metadata = pageMetadata('/mission');

const personalSite = 'https://www.heyumerqureshi.com';

export default function Page() {
  const values = [
    [
      'Access without a price tag',
      'Helpful study tools should be within every student’s reach. Where you go to school or what you can spend shouldn’t decide how far your curiosity takes you.',
    ],
    [
      'Confidence through practice',
      'Build understanding, test your knowledge, and grow one step at a time. We believe mistakes are part of learning, and progress is worth celebrating.',
    ],
    [
      'Progress together',
      'Share curiosity, support your school community, and find inspiration in students everywhere. A little friendly competition can bring out our best.',
    ],
  ];
  const story = [
    [
      'Who is Umer?',
      'Umer Qureshi is a high school student from Pembroke Pines, Florida, working where electrical engineering meets neuroscience. He tends to learn a subject by building something real with it: robots, apps, and study tools.',
    ],
    [
      'Why he built Akoizo',
      'Science Olympiad preparation is scattered across old papers, shared drives, and whatever a team can afford. Umer founded Akoizo to put lessons, practice tests, grading, and team organization in one free place, so a student without a tutor can prepare as well as one with.',
    ],
    [
      'The goal',
      'His mission is to serve everyone, regardless of economic or social differences. For Akoizo that means no paywalls and no ads: every lesson and every practice test stays free, for every school.',
    ],
  ];
  const work = [
    [
      'RADIX',
      'An autonomous all-terrain robot that removes invasive Brazilian peppertree. Umer leads the team as a Lemelson-MIT InvenTeam, with a patent pending.',
    ],
    [
      'Iris AI',
      'An iOS app that helps visually impaired people navigate, running entirely on the phone. Global winner of OTIS Made to Move Communities.',
    ],
    [
      'Korah',
      'A free standardized education tool, built with a team of classmates, that has reached more than 100,000 people.',
    ],
    [
      'Coffee House',
      'An online study cafe where around 300 classmates sit down and focus together.',
    ],
  ];
  return (
    <main id="main" className="page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Umer Qureshi',
            url: personalSite,
            description: 'Student engineer and researcher, and the founder of Akoizo.',
            homeLocation: { '@type': 'Place', name: 'Pembroke Pines, Florida' },
          }).replace(/</g, '\\u003c'),
        }}
      />
      <section className="mission-hero">
        <p className="eyebrow">OUR MISSION / YOUR POSSIBILITIES</p>
        <h1>
          More curiosity.
          <br />
          More possibility.
          <br />
          <span className="chrome">Always free.</span>
        </h1>
        <Orbit />

        <p>
          Akoizo helps students grow in their Science Olympiad journey through free lessons,
          practice, and a community that learns together. We’re here to make preparation feel a
          little less overwhelming—and a lot more possible.
        </p>
      </section>
      <section className="mission-values" aria-label="Our values">
        {values.map(([title, body], i) => (
          <Reveal className="mission-value" key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </Reveal>
        ))}
      </section>
      <section id="who-we-are" className="about-work" aria-labelledby="who-we-are-title">
        <p className="eyebrow">WHO ARE WE? / THE PERSON BEHIND AKOIZO</p>
        <h2 id="who-we-are-title">
          One student. <span className="chrome">Built for everyone.</span>
        </h2>
        <p>
          Akoizo is not a company. It is designed, written, and run by Umer Qureshi, a high school
          student who believes good Science Olympiad study tools should reach every student,
          whatever their circumstances.
        </p>
        <div className="support-actions">
          <a
            className="button button-primary"
            href={personalSite}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit heyumerqureshi.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="mission-values" aria-label="About Umer Qureshi">
        {story.map(([title, body], i) => (
          <Reveal className="mission-value" key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </Reveal>
        ))}
      </section>
      <section className="about-quote">
        <blockquote>“I am very free and education-access-based.”</blockquote>
        <p>Umer, in his own words</p>
      </section>
      <section className="about-work" aria-labelledby="about-work-title">
        <p className="eyebrow">BEYOND AKOIZO</p>
        <h2 id="about-work-title">The same idea, in other places.</h2>
        <p>
          Akoizo is one of several projects Umer has built for people who are usually left out.
          Along the way he has taken part in MIT’s MITES Semester, where he researched stem cell
          regeneration, and earned two VEX Robotics Worlds awards.
        </p>
        <div className="about-work-grid">
          {work.map(([title, body]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <a
          className="text-link"
          href={`${personalSite}/projects`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all of Umer’s projects <span>↗</span>
        </a>
      </section>
      <div className="mission-bottom">
        <p>Built for curious minds. Open to every school.</p>
        <div className="support-actions">
          <Link className="text-link" href="/support">
            Support Akoizo <span>↗</span>
          </Link>
          <Link className="button button-primary" href="/login/student">
            Start your journey
          </Link>
        </div>
      </div>
    </main>
  );
}
