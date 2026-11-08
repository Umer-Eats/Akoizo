import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { donationsOpen, paypalDonateUrl } from '@/lib/donate';
import { Notes, PageHero } from '@/components/landing-page';

export const metadata = pageMetadata('/donate');

export default function DonatePage() {
  if (!donationsOpen) notFound();
  const steps = [
    [
      'Open the donation page',
      'The button takes you to PayPal’s secure donation page for Akoizo. It opens in a new tab.',
    ],
    [
      'Choose any amount',
      'There is no minimum and no suggested amount. Check that the page reads Umer Qureshi or Akoizo before you pay.',
    ],
    [
      'Pay your way',
      'Sign in to PayPal, or choose “Donate with Debit or Credit Card” to give without a PayPal account.',
    ],
  ];
  return (
    <main id="main" className="lx-page">
      <PageHero
        label="PayPal or card"
        title="Donate to Akoizo."
        lead="Donations go straight to Umer Qureshi, who builds and pays for Akoizo. PayPal handles the payment, so Akoizo never sees or stores your card or banking details."
      />

      <Notes id="give" num={1} label="PayPal · Debit · Credit">
        <div className="lx-mail">
          {paypalDonateUrl ? (
            <>
              <h2 className="lx-big">Give with PayPal or a card.</h2>
              <p>You do not need a PayPal account to donate with a debit or credit card.</p>
              <div className="lx-actions">
                <a
                  className="lx-btn"
                  href={paypalDonateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donate with PayPal or card <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </>
          ) : (
            <>
              <h2 className="lx-big">Donations are on the way.</h2>
              <p>
                Donations are not open just yet. Please check back soon, and thank you for asking.
              </p>
            </>
          )}
        </div>
      </Notes>

      <Notes
        id="how"
        num={2}
        label="How to donate"
        title="Three steps, no account needed."
        lead={
          <>
            Donations are personal gifts, not tax-deductible, and never unlock anything. Akoizo
            stays free either way.{' '}
            <Link className="lx-link" href="/support">
              Where the money goes <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </>
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
