import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { donationsOpen } from '@/lib/donate';
import { Notes, PageHero } from '@/components/landing-page';

export const metadata = pageMetadata('/support');

export default function SupportPage() {
  if (!donationsOpen) notFound();
  const costs = [
    [
      'Hosting on Vercel',
      'Akoizo runs on Vercel. Every lesson opened, practice test graded, and ranking loaded uses hosting that is billed each month, and the bill grows as more students study here.',
    ],
    [
      'Writing the lessons',
      'Each event lesson is researched, written, illustrated, and checked against the current rules before it goes live. That work is done by hand, event by event, season after season.',
    ],
    [
      'Compiling the data',
      'Hundreds of past papers are collected, converted into practice tests, and matched to answer keys so they can be graded. Rankings, analytics, and event catalogs are kept up to date the same way.',
    ],
  ];
  return (
    <main id="main" className="lx-page">
      <PageHero
        label="Support Akoizo"
        title={
          <>
            Free to learn. <span className="lx-mark">Not free to run.</span>
          </>
        }
        lead="Akoizo will never charge students for Science Olympiad preparation, show ads, or lock lessons behind a paywall. It is built and paid for by one student. If Akoizo has helped you or your team, a donation helps keep it online for everyone else."
      >
        <Link className="lx-btn" href="/donate">
          Donate <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link className="lx-btn lx-btn-line" href="/mission#who-we-are">
          Who runs Akoizo?
        </Link>
      </PageHero>

      <Notes id="costs" num={1} label="Where it goes">
        <div className="lx-points">
          {costs.map(([title, body], i) => (
            <div className="lx-point" key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h2 className="lx-point-title">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <div className="lx-callout">
          <p>
            <strong>Every amount helps</strong>
            Studying on Akoizo stays free whether you give or not.
          </p>
          <Link className="lx-btn" href="/donate">
            Donate with PayPal or card <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Notes>
    </main>
  );
}
