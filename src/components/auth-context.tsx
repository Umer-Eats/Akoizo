'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getAuthInstance } from '@/lib/firebase';
import type { Enrollment, Profile, Role, SchoolCredentials } from '@/lib/domain';

export class RequestError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
async function readResponse<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok)
    throw new RequestError(
      response.status,
      body.error || 'Something went wrong. Please try again.',
    );
  return body as T;
}
async function profileFor(user: User): Promise<Profile | null> {
  const response = await fetch('/api/auth/profile', {
    headers: { Authorization: `Bearer ${await user.getIdToken()}` },
    cache: 'no-store',
  });
  if (response.status === 404) return null;
  return readResponse<Profile>(response);
}
export function authMessage(error: unknown) {
  const code = (error as { code?: string })?.code;
  const messages: Record<string, string> = {
    'auth/invalid-credential': 'That email and password did not match. Please try again.',
    'auth/email-already-in-use': 'This email already has an account. Log in to finish enrollment.',
    'auth/weak-password': 'Choose a password with at least 8 characters.',
    'auth/popup-closed-by-user': 'Google sign-in was closed. You can try again.',
    'auth/popup-blocked': 'Allow pop-ups for this site to sign in with Google.',
    'auth/account-exists-with-different-credential':
      'This email uses a different sign-in method. Log in with your original method.',
    'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Check your internet connection and try again.',
    'auth/unauthorized-domain': 'Sign-in is not enabled for this website address yet.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled yet.',
  };
  return (code && messages[code]) || (error instanceof Error ? error.message : 'Please try again.');
}
type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  sessionError: string;
  credentials: SchoolCredentials | null;
  clearCredentials: () => void;
  signIn: (email: string, password: string, role: Role) => Promise<Profile | null>;
  signUp: (email: string, password: string, data: Enrollment) => Promise<Profile | null>;
  googleSignIn: (role: Role, data?: Enrollment) => Promise<Profile | null>;
  completeEnrollment: (data: Enrollment) => Promise<Profile | null>;
  logOut: () => Promise<void>;
  refreshProfile: () => Promise<Profile | null>;
  resetPassword: (email: string) => Promise<void>;
  request: <T>(path: string, options?: RequestInit) => Promise<T>;
};
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState('');
  const [credentials, setCredentials] = useState<SchoolCredentials | null>(null);
  const operation = useRef(false);
  const version = useRef(0);
  const request = useCallback(async <T,>(path: string, options?: RequestInit) => {
    const current = getAuthInstance().currentUser;
    if (!current) throw new RequestError(401, 'Please log in to continue.');
    const headers = new Headers(options?.headers);
    headers.set('Authorization', `Bearer ${await current.getIdToken()}`);
    if (options?.body) headers.set('Content-Type', 'application/json');
    return readResponse<T>(await fetch(path, { ...options, headers, cache: 'no-store' }));
  }, []);
  const refreshProfile = useCallback(async () => {
    const revision = ++version.current;
    const current = getAuthInstance().currentUser;
    setUser(current);
    const next = current ? await profileFor(current) : null;
    if (version.current === revision) {
      setUser(current);
      setProfile(next);
      setSessionError('');
    }
    return next;
  }, []);
  useEffect(() => {
    try {
      return onAuthStateChanged(getAuthInstance(), async (current) => {
        if (operation.current) return;
        const revision = ++version.current;
        setLoading(true);
        setUser(current);
        setProfile(null);
        setCredentials(null);
        setSessionError('');
        try {
          const next = current ? await profileFor(current) : null;
          if (version.current === revision) setProfile(next);
        } catch (error) {
          if (version.current === revision) setSessionError(authMessage(error));
        } finally {
          if (version.current === revision) setLoading(false);
        }
      });
    } catch {
      setSessionError('Account services are not configured yet.');
      setLoading(false);
    }
  }, []);
  async function run(work: () => Promise<void>, expectedRole: Role) {
    if (operation.current) throw new Error('Please wait for the current request to finish.');
    operation.current = true;
    version.current++;
    setLoading(true);
    setSessionError('');
    try {
      await work();
      const next = await refreshProfile();
      if (next && next.role !== expectedRole)
        throw new Error(
          `This account is registered as a ${next.role}. Use the ${next.role} dashboard.`,
        );
      return next;
    } catch (error) {
      // Preserve failed enrollment as a recoverable signed-in account; it grants no school access.
      try {
        await refreshProfile();
      } catch (profileError) {
        setProfile(null);
        setSessionError(authMessage(profileError));
      }
      throw error;
    } finally {
      operation.current = false;
      setLoading(false);
    }
  }
  async function preflight(data: Enrollment) {
    await readResponse(
      await fetch('/api/auth/enrollment-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),
    );
  }
  async function enroll(data: Enrollment) {
    const result = await request<{ profile: Profile; credentials?: SchoolCredentials }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify(data) },
    );
    if (result.credentials) setCredentials(result.credentials);
  }
  const signIn = (email: string, password: string, role: Role) =>
    run(async () => {
      await signInWithEmailAndPassword(getAuthInstance(), email.trim(), password);
    }, role);
  const signUp = (email: string, password: string, data: Enrollment) =>
    run(async () => {
      await preflight(data);
      const result = await createUserWithEmailAndPassword(
        getAuthInstance(),
        email.trim(),
        password,
      );
      await updateProfile(result.user, { displayName: data.displayName });
      await enroll(data);
    }, data.role);
  const googleSignIn = (role: Role, data?: Enrollment) =>
    run(async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(getAuthInstance(), provider);
      const existing = await profileFor(result.user);
      if (!existing && data)
        await enroll({
          ...data,
          displayName: data.displayName || result.user.displayName || 'Learner',
        });
    }, role);
  const completeEnrollment = (data: Enrollment) => run(() => enroll(data), data.role);
  const logOut = async () => {
    version.current++;
    setCredentials(null);
    setProfile(null);
    setUser(null);
    await signOut(getAuthInstance());
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        sessionError,
        credentials,
        clearCredentials: () => setCredentials(null),
        signIn,
        signUp,
        googleSignIn,
        completeEnrollment,
        logOut,
        refreshProfile,
        request,
        resetPassword: (email) => sendPasswordResetEmail(getAuthInstance(), email.trim()),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('Missing authentication provider');
  return value;
}
