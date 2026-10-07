import { redirect } from 'next/navigation';
export const metadata = { title: 'My event', robots: { index: false, follow: false } };
export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  redirect(`/dashboard/student/events/${encodeURIComponent(eventId)}/lessons`);
}
