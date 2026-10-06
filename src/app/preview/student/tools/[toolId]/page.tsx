import { notFound } from 'next/navigation';
import { ToolPlaceholder } from '@/components/dashboard';
import { tools, eventsForDivision, type Division } from '@/lib/events';
export const metadata = { title: 'Study tool preview', robots: { index: false, follow: false } };
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ toolId: string }>;
  searchParams: Promise<{ division?: string; event?: string }>;
}) {
  const { toolId } = await params;
  const { division = 'C', event } = await searchParams;
  if (!['A', 'B', 'C'].includes(division) || !tools.some((t) => t.id === toolId)) notFound();
  if (event && !eventsForDivision(division as Division).some((e) => e.id === event)) notFound();
  return <ToolPlaceholder toolId={toolId} division={division as Division} eventId={event} />;
}
