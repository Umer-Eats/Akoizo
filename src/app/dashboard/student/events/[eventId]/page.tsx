import { AccountGate } from '@/components/account-gate';
import { EventView } from '@/components/dashboard';
export const metadata = { title: 'My event', robots: { index: false, follow: false } };
export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  return (
    <AccountGate role="student">
      <EventView eventId={eventId} />
    </AccountGate>
  );
}
