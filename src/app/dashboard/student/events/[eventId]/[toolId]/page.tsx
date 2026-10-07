import { AccountGate } from '@/components/account-gate';
import { EventView } from '@/components/dashboard';
export const metadata = { title: 'Study tool', robots: { index: false, follow: false } };
export default async function ToolPage({
  params,
}: {
  params: Promise<{ eventId: string; toolId: string }>;
}) {
  const { eventId, toolId } = await params;
  return (
    <AccountGate role="student">
      <EventView eventId={eventId} toolId={toolId} />
    </AccountGate>
  );
}
