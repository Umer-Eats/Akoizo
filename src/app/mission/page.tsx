import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { donationsOpen } from '@/lib/donate';
import { Notes, PageHero } from '@/components/landing-page';
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
    <main id="main" className="lx-page">
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
      <PageHero
        label="Our mission"
        title={
          <>
            More curiosity. More possibility. <span className="lx-mark">Always free.</span>
          </>
        }
        lead="Akoizo helps students grow in their Science Olympiad journey through free lessons, practice, and a community that learns together. We’re here to make preparation feel a little less overwhelming, and a lot more possible."
      />

      <Notes id="values" num={1} label="What we believe">
        <div className="lx-points">
          {values.map(([title, body], i) => (
            <div className="lx-point" key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h2 className="lx-point-title">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Notes>

      <Notes
        id="who-we-are"
        num={2}
        label="The person behind Akoizo"
        title="One student. Built for everyone."
        lead={
          <>
            <p>
              Akoizo is not a company. It is designed, written, and run by Umer Qureshi, a high
              school student who believes good Science Olympiad study tools should reach every
              student, whatever their circumstances.
            </p>
            <a className="lx-link" href={personalSite} target="_blank" rel="noopener noreferrer">
              Visit heyumerqureshi.com <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </>
        }
      >
        <div className="lx-points">
          {story.map(([title, body], i) => (
            <div className="lx-point" key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <figure className="lx-quote lx-mt">
          <blockquote>“I am very free and education-access-based.”</blockquote>
          <figcaption className="lx-mono">Umer, in his own words</figcaption>
        </figure>
      </Notes>

      <Notes
        id="beyond"
        num={3}
        label="Beyond Akoizo"
        title="The same idea, in other places."
        lead="Akoizo is one of several projects Umer has built for people who are usually left out. Along the way he took part in MIT’s MITES Semester, researching stem cell regeneration, and earned two VEX Robotics Worlds awards."
      >
        <div className="lx-points lx-points-4">
          {work.map(([title, body]) => (
            <div className="lx-point" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <a
          className="lx-link lx-mt"
          href={`${personalSite}/projects`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all of Umer’s projects <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Notes>

      <section className="lx-close" aria-labelledby="mission-close-title">
        <div className="lx-wrap">
          <p className="lx-mono">Open to every school</p>
          <h2 id="mission-close-title">Built for curious minds.</h2>
          <div className="lx-actions">
            <Link className="lx-btn" href="/login/student">
              Start your journey <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {donationsOpen && (
              <Link className="lx-btn lx-btn-line" href="/support">
                Support Akoizo
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
