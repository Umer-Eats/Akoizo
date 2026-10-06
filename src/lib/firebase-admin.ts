import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';

let adminApp: App | null = null;
let adminAuthInstance: Auth | null = null;

function initializeAdmin() {
  if (adminApp) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    // Return mock implementations for preview mode
    return;
  }

  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  } else {
    adminApp = getApps()[0];
  }

  adminAuthInstance = getAuth(adminApp);
}

export function getAdminAuth(): Auth {
  initializeAdmin();
  if (!adminAuthInstance) {
    throw new Error('Firebase Admin not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
  }
  return adminAuthInstance;
}

export function getAdminApp(): App {
  initializeAdmin();
  if (!adminApp) {
    throw new Error('Firebase Admin not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
  }
  return adminApp;
}