import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { Notes, PageHero } from '@/components/landing-page';

export const metadata = pageMetadata('/contact');

const contactEmail = 'akoizo.registration@gmail.com';
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
    <main id="main" className="lx-page">
      <PageHero
        label="Teachers and schools"
        title="Add your school to Akoizo."
        lead="Teachers, coaches, and schools: Akoizo is free for your whole Science Olympiad team. Email Umer Qureshi to have your school added, and your students can start studying together."
      />

      <Notes id="email" num={1} label="Write to us">
        <div className="lx-mail">
          <p className="lx-mono">Email</p>
          <span className="lx-big">{contactEmail}</span>
          <p>Questions, corrections, or ideas for a lesson are welcome at the same address.</p>
          <div className="lx-actions">
            <a className="lx-btn" href={mailto}>
              <Mail size={18} aria-hidden="true" /> Email us
            </a>
          </div>
        </div>
      </Notes>

      <Notes
        id="steps"
        num={2}
        label="What to include"
        title="Three things to put in your email."
        lead={
          <Link className="lx-link" href="/mission#who-we-are">
            Who runs Akoizo? <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        }
      >
        <div className="lx-points">
          {steps.map(([title, body], i) => (
            <div className="lx-point" key={title}>
              <span>Step {String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Notes>
    </main>
  );
}
