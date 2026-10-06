import { notFound } from 'next/navigation';
import { EventView } from '@/components/dashboard';
import { eventsForDivision, type Division } from '@/lib/events';
export const metadata = { title: 'Event study space', robots: { index: false, follow: false } };
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ division?: string }>;
}) {
  const { eventId } = await params;
  const { division = 'C' } = await searchParams;
  if (
    !['A', 'B', 'C'].includes(division) ||
    !eventsForDivision(division as Division).some((e) => e.id === eventId)
  )
    notFound();
  return <EventView division={division as Division} eventId={eventId} />;
}
