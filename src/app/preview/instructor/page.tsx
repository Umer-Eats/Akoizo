import { InstructorDashboard } from '@/components/dashboard';
export const metadata = { title: 'Instructor preview', robots: { index: false, follow: false } };
export default function Page() {
  return <InstructorDashboard />;
}
