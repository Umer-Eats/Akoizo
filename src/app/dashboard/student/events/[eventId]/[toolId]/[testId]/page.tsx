import { notFound } from 'next/navigation';
import { AccountGate } from '@/components/account-gate';
import { PracticeTestView } from '@/components/practice';
export const metadata = { title: 'Competition practice', robots: { index: false, follow: false } };
export default async function PracticePage({
  params,
}: {
  params: Promise<{ eventId: string; toolId: string; testId: string }>;
}) {
  const { eventId, toolId, testId } = await params;
  if (toolId !== 'practice-tests') notFound();
  return (
    <AccountGate role="student">
      <PracticeTestView key={`${eventId}/${testId}`} eventId={eventId} testId={testId} />
    </AccountGate>
  );
}
