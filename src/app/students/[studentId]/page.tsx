import { StudentRankedProfile } from '@/components/student-ranked-profile';
export const metadata = {
  title: 'Ranked Student Profile',
  robots: { index: false, follow: false },
};
export default async function Page({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  return <StudentRankedProfile studentId={studentId} />;
}
