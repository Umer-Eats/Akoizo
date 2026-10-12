// Zelle has no public payments API: money can only be sent from inside a bank's app.
// The donate page shows the recipient and links to Zelle's own QR-code handoff instead.
export const zelleName = 'Umer Qureshi';
// The email or U.S. mobile number enrolled with Zelle. Set in .env.local and in Vercel.
export const zelleRecipient = process.env.NEXT_PUBLIC_ZELLE_RECIPIENT?.trim() ?? '';

// Same payload a bank app encodes in a "My Zelle QR code".
export function zelleLink(name: string, token: string) {
  const data = btoa(JSON.stringify({ name, token, action: 'payment' }));
  return `https://enroll.zellepay.com/qr-codes?data=${encodeURIComponent(data)}`;
}
