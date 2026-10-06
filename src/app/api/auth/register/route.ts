import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';
import { getDb } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;
    const email = decodedToken.email;

    const body = await request.json();
    const { role, division, schoolPassword, instructorInvitePassword } = body;

    if (!role || !['student', 'instructor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const db = getDb();

    if (role === 'instructor') {
      if (instructorInvitePassword !== process.env.INSTRUCTOR_INVITE_PASSWORD) {
        return NextResponse.json({ error: 'Invalid instructor invitation password' }, { status: 403 });
      }

      const schoolName = `School-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const joiningPassword = Math.random().toString(36).substring(2, 10);
      const passwordHash = await hashPassword(joiningPassword);

      const schoolId = uuidv4();
      await db.run('INSERT INTO schools (id, name, password_hash) VALUES (?, ?, ?)', schoolId, schoolName, passwordHash);

      await db.run('INSERT INTO users (id, firebase_uid, email, role, school_id, division) VALUES (?, ?, ?, ?, ?, ?)', uuidv4(), firebaseUid, email, 'instructor', schoolId, division || 'C');

      return NextResponse.json({ 
        success: true, 
        schoolName, 
        joiningPassword,
        message: 'Instructor account created. Save your school name and joining password securely.'
      });
    } else {
      if (!schoolPassword) {
        return NextResponse.json({ error: 'School password is required for students' }, { status: 400 });
      }
      if (!division || !['A', 'B', 'C'].includes(division)) {
        return NextResponse.json({ error: 'Valid division (A, B, or C) is required' }, { status: 400 });
      }

      const schoolsResult = await db.all('SELECT * FROM schools');

      let matchedSchoolId: string | null = null;
      for (const school of schoolsResult) {
        const passwordHash = await hashPassword(schoolPassword);
        if (school.password_hash === passwordHash) {
          matchedSchoolId = school.id as string;
          break;
        }
      }

      if (!matchedSchoolId) {
        return NextResponse.json({ error: 'Invalid school password' }, { status: 403 });
      }

      await db.run('INSERT INTO users (id, firebase_uid, email, role, school_id, division) VALUES (?, ?, ?, ?, ?, ?)', uuidv4(), firebaseUid, email, 'student', matchedSchoolId, division);

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}