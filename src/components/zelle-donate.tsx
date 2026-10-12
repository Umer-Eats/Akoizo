'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { zelleLink, zelleName, zelleRecipient } from '@/lib/donate';

export function ZelleDonate() {
  const [copied, setCopied] = useState(false);
  if (!zelleRecipient) {
    return (
      <div className="donate-card">
        <p className="eyebrow">ZELLE</p>
        <h2>Zelle details are on the way.</h2>
        <p>Donations are not open just yet. Please check back soon, and thank you for asking.</p>
      </div>
    );
  }
  const copy = () =>
    navigator.clipboard
      .writeText(zelleRecipient)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
  return (
    <div className="donate-card">
      <p className="eyebrow">SEND WITH ZELLE</p>
      <dl className="donate-details">
        <div>
          <dt>Recipient</dt>
          <dd>{zelleName}</dd>
        </div>
        <div>
          <dt>Zelle email or phone</dt>
          <dd className="donate-recipient">{zelleRecipient}</dd>
        </div>
      </dl>
      <div className="donate-actions">
        <a
          className="button button-primary"
          href={zelleLink(zelleName, zelleRecipient)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Zelle <span aria-hidden="true">↗</span>
        </a>
        <button className="button button-glass" onClick={copy}>
          {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy details'}
        </button>
      </div>
      <p className="donate-status" aria-live="polite">
        {copied ? 'Copied. Paste it into your bank’s Zelle screen.' : ''}
      </p>
    </div>
  );
}
