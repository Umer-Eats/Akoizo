import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { paypalDonateUrl } from '@/lib/donate';

export const metadata = pageMetadata('/donate');

export default function DonatePage() {
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
    <main id="main" className="page-container">
      <section className="page-heading">
        <p className="eyebrow">DONATE / PAYPAL OR CARD</p>
        <h1>Donate to Akoizo</h1>
        <p>
          Donations go straight to Umer Qureshi, who builds and pays for Akoizo. PayPal handles the
          payment, so Akoizo never sees or stores your card or banking details.
        </p>
      </section>
      <div className="donate-card">
        {paypalDonateUrl ? (
          <>
            <p className="eyebrow">PAYPAL · DEBIT · CREDIT</p>
            <h2>Give with PayPal or a card.</h2>
            <p>You do not need a PayPal account to donate with a debit or credit card.</p>
            <div className="donate-actions">
              <a
                className="button button-primary"
                href={paypalDonateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate with PayPal or card <span aria-hidden="true">↗</span>
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">PAYPAL · DEBIT · CREDIT</p>
            <h2>Donations are on the way.</h2>
            <p>
              Donations are not open just yet. Please check back soon, and thank you for asking.
            </p>
          </>
        )}
      </div>
      <section className="mission-values" aria-label="How to donate">
        {steps.map(([title, body], i) => (
          <div className="mission-value" key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        ))}
      </section>
      <div className="mission-bottom">
        <p>
          Donations are personal gifts, not tax-deductible, and never unlock anything. Akoizo stays
          free either way.
        </p>
        <Link className="text-link" href="/support">
          Where the money goes <span>↗</span>
        </Link>
      </div>
    </main>
  );
}
