import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Reveal } from '@/components/art';

export const metadata = pageMetadata('/support');

export default function SupportPage() {
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
    <main id="main" className="page-container">
      <section className="mission-hero">
        <p className="eyebrow">SUPPORT AKOIZO / KEEP IT FREE</p>
        <h1>
          Free to learn.
          <br />
          <span className="chrome">Not free to run.</span>
        </h1>
        <p>
          Akoizo will never charge students for Science Olympiad preparation, show ads, or lock
          lessons behind a paywall. It is built and paid for by one student. If Akoizo has helped
          you or your team, a donation helps keep it online for everyone else.
        </p>
        <div className="support-actions">
          <Link className="button button-primary" href="/donate">
            Donate <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" href="/mission#who-we-are">
            Who runs Akoizo? <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="mission-values" aria-label="What donations pay for">
        {costs.map(([title, body], i) => (
          <Reveal className="mission-value" key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </Reveal>
        ))}
      </section>
      <div className="mission-bottom">
        <p>Every amount helps. Studying on Akoizo stays free whether you give or not.</p>
        <Link className="button button-primary" href="/donate">
          Donate with PayPal or card
        </Link>
      </div>
    </main>
  );
}
