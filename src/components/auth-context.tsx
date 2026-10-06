'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { getAuthInstance } from '@/lib/firebase';

type UserRole = 'student' | 'instructor' | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  schoolId: string | null;
  division: 'A' | 'B' | 'C' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: 'student' | 'instructor', extraData: {
    division?: 'A' | 'B' | 'C';
    schoolPassword?: string;
    instructorInvitePassword?: string;
  }) => Promise<void>;
  logOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [division, setDivision] = useState<'A' | 'B' | 'C' | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (currentUser: User) => {
    try {
      const token = await currentUser.getIdToken();
      const response = await fetch('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        setRole(data.role);
        setSchoolId(data.schoolId);
        setDivision(data.division);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    let authInstance: ReturnType<typeof getAuthInstance> | null = null;
    try {
      authInstance = getAuthInstance();
    } catch {
      // Firebase not configured - preview mode
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setRole(null);
        setSchoolId(null);
        setDivision(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const authInstance = getAuthInstance();
    await signInWithEmailAndPassword(authInstance, email, password);
  };

  const signUp = async (
    email: string, 
    password: string, 
    displayName: string, 
    role: 'student' | 'instructor',
    extraData: {
      division?: 'A' | 'B' | 'C';
      schoolPassword?: string;
      instructorInvitePassword?: string;
    }
  ) => {
    const authInstance = getAuthInstance();
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    const token = await userCredential.user.getIdToken();
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role, ...extraData }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logOut = async () => {
    const authInstance = getAuthInstance();
    await signOut(authInstance);
    setRole(null);
    setSchoolId(null);
    setDivision(null);
  };

  const refreshRole = async () => {
    if (user) {
      await fetchUserProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, schoolId, division, loading, signIn, signUp, logOut, refreshRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}