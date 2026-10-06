import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;

    const db = getDb();
    const userResult = await db.get('SELECT * FROM users WHERE firebase_uid = ?', firebaseUid);

    if (!userResult) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    const user = userResult;
    return NextResponse.json({
      role: user.role,
      schoolId: user.school_id,
      division: user.division,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}