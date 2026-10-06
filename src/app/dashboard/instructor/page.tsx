import { getAdminAuth } from '@/lib/firebase-admin';
import { getDb } from '@/lib/db';
import { InstructorDashboardClient } from './InstructorDashboardClient';

async function getInstructorData(token: string) {
  const decodedToken = await getAdminAuth().verifyIdToken(token);
  const firebaseUid = decodedToken.uid;

  const db = getDb();
  const userResult = await db.get('SELECT * FROM users WHERE firebase_uid = ?', firebaseUid);

  if (!userResult) {
    return null;
  }

  const user = userResult;
  
  const studentsResult = await db.all('SELECT * FROM users WHERE school_id = ? AND role = ?', user.school_id, 'student');

  return {
    instructor: {
      id: user.id,
      name: user.display_name || 'Instructor',
      schoolId: user.school_id,
    },
    students: studentsResult.map((row: any) => ({
      id: row.id,
      name: row.display_name || 'Student',
      handle: row.display_name?.toLowerCase().replace(/\s+/g, '') || 'student',
      school: 'Your School',
      division: row.division,
      points: 0,
      lessons: 0,
      practice: 0,
      ranked: 0,
      event: '',
    })),
  };
}

export default async function InstructorDashboardPage() {
  return <InstructorDashboardClient />;
}