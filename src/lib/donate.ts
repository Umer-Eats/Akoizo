// The ID of a PayPal Donate button (paypal.com/donate/buttons). Set in .env.local and in Vercel.
const paypalDonateId = process.env.NEXT_PUBLIC_PAYPAL_DONATE_ID?.trim() ?? '';

// PayPal's hosted donate page: donors pay with a PayPal balance or a debit or credit card.
export const paypalDonateUrl = paypalDonateId
  ? `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(paypalDonateId)}`
  : '';

// The support and donate pages stay hidden (404, no links) until a button ID is set.
export const donationsOpen = Boolean(paypalDonateUrl);
