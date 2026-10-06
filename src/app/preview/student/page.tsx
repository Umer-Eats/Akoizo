import { StudentDashboard } from '@/components/dashboard';
export const metadata = { title: 'Student preview', robots: { index: false, follow: false } };
export default function Page() {
  return <StudentDashboard />;
}
