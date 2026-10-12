import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/contact');

const contactEmail = 'umerqure475@gmail.com';
const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent('Add our school to Akoizo')}`;

export default function ContactPage() {
  const steps = [
    [
      'Tell us about your school',
      'Send the school’s name, city and state, and which Science Olympiad divisions you compete in: A, B, or C.',
    ],
    [
      'Tell us who is coaching',
      'Include the name and school email of the teacher or coach who will run the team, so the instructor account goes to the right person.',
    ],
    [
      'Get set up',
      'Umer replies with instructor access. From there you create your school’s study group and share its joining password with your students.',
    ],
  ];
  return (
    <main id="main" className="page-container">
      <section className="page-heading">
        <p className="eyebrow">CONTACT US / TEACHERS & SCHOOLS</p>
        <h1>Add your school to Akoizo</h1>
        <p>
          Teachers, coaches, and schools: Akoizo is free for your whole Science Olympiad team. Email
          Umer Qureshi to have your school added, and your students can start studying together.
        </p>
      </section>
      <div className="donate-card">
        <p className="eyebrow">EMAIL</p>
        <dl className="donate-details">
          <div>
            <dt>Write to</dt>
            <dd className="donate-recipient">{contactEmail}</dd>
          </div>
        </dl>
        <div className="donate-actions">
          <a className="button button-primary" href={mailto}>
            Email us <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <section className="mission-values" aria-label="How to add your school">
        {steps.map(([title, body], i) => (
          <div className="mission-value" key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>
      <div className="mission-bottom">
        <p>Questions, corrections, or ideas for a lesson are welcome at the same address.</p>
        <Link className="text-link" href="/mission#who-we-are">
          Who runs Akoizo? <span>↗</span>
        </Link>
      </div>
    </main>
  );
}
