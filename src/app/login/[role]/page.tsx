import { notFound } from 'next/navigation';
import { AuthPageClient } from './AuthPageClient';

export function generateStaticParams() {
  return [{ role: 'student' }, { role: 'instructor' }];
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  return { title: role === 'instructor' ? 'Instructor login' : 'Student login' };
}

export default async function AuthPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (role !== 'student' && role !== 'instructor') notFound();

  return <AuthPageClient role={role} />;
}
