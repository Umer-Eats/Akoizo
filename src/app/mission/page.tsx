import type { Metadata } from 'next';
import Link from 'next/link';
import { Orbit, Reveal } from '@/components/art';
export const metadata: Metadata = { title: 'Our Mission' };
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
  return (
    <main id="main" className="page-container">
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
      <div className="mission-bottom">
        <p>Built for curious minds. Open to every school.</p>
        <Link className="button button-primary" href="/login/student">
          Start your journey
        </Link>
      </div>
    </main>
  );
}
