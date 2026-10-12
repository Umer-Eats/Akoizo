import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { ZelleDonate } from '@/components/zelle-donate';

export const metadata = pageMetadata('/donate');

export default function DonatePage() {
  const steps = [
    [
      'Open Zelle',
      'Use the button on a phone to hand off to your bank’s app, or open Zelle inside your banking app or website yourself.',
    ],
    [
      'Check the recipient',
      'Confirm the name reads Umer Qureshi before you send. Zelle payments cannot be reversed once they go through.',
    ],
    [
      'Choose any amount',
      'There is no minimum and no suggested amount. Add “Akoizo” in the memo if you would like.',
    ],
  ];
  return (
    <main id="main" className="page-container">
      <section className="page-heading">
        <p className="eyebrow">DONATE / ZELLE</p>
        <h1>Donate to Akoizo</h1>
        <p>
          Donations go straight to Umer Qureshi, who builds and pays for Akoizo. Your bank handles
          the payment through Zelle, so Akoizo never sees or stores your banking details.
        </p>
      </section>
      <ZelleDonate />
      <section className="mission-values" aria-label="How to donate with Zelle">
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
