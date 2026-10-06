import { getAdminAuth } from '@/lib/firebase-admin';
import { getDb } from '@/lib/db';
import { StudentDashboardClient } from './StudentDashboardClient';

async function getUserData(token: string) {
  const decodedToken = await getAdminAuth().verifyIdToken(token);
  const firebaseUid = decodedToken.uid;

  const db = getDb();
  const userResult = await db.get('SELECT * FROM users WHERE firebase_uid = ?', firebaseUid);

  if (!userResult) {
    return null;
  }

  const user = userResult;
  
  const assignmentsResult = await db.all('SELECT a.*, e.name as event_name FROM assignments a JOIN events e ON a.event_id = e.id WHERE a.student_id = ?', user.id);

  return {
    user: {
      id: user.id,
      name: user.display_name || 'Student',
      handle: user.display_name?.toLowerCase().replace(/\s+/g, '') || 'student',
      school: 'Your School',
      division: user.division,
      points: 0,
      lessons: 0,
      practice: 0,
      ranked: 0,
      event: '',
    },
    assignments: assignmentsResult.map((row: any) => ({
      id: row.id,
      studentId: row.student_id,
      eventId: row.event_id,
      eventName: row.event_name,
      type: row.type,
      due: row.due_date,
      division: user.division,
    })),
  };
}

export default async function StudentDashboardPage() {
  return <StudentDashboardClient />;
}