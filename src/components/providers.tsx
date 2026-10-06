'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Assignment } from '@/lib/demo';
import { AuthProvider } from './auth-context';

type Settings = {
  theme: string;
  toggleTheme: () => void;
  motion: boolean;
  toggleMotion: () => void;
  assignments: Assignment[];
  setAssignments: (items: Assignment[]) => void;
};
const SettingsContext = createContext<Settings | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [motion, setMotion] = useState(true);
  const [assignments, updateAssignments] = useState<Assignment[]>([]);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
    setMotion(document.documentElement.dataset.motion !== 'off');
    try {
      const a = JSON.parse(sessionStorage.getItem('akoizo-demo-assignments') || '[]');
      if (Array.isArray(a)) updateAssignments(a);
    } catch {
      /* Storage is optional for this preview. */
    }
  }, []);
  const toggleTheme = () => {
    const value = theme === 'dark' ? 'light' : 'dark';
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem('akoizo-theme', value);
    } catch {}
  };
  const toggleMotion = () => {
    const value = !motion;
    setMotion(value);
    document.documentElement.dataset.motion = value ? 'on' : 'off';
    try {
      localStorage.setItem('akoizo-motion', value ? 'on' : 'off');
    } catch {}
  };
  const setAssignments = (items: Assignment[]) => {
    updateAssignments(items);
    try {
      sessionStorage.setItem('akoizo-demo-assignments', JSON.stringify(items));
    } catch {}
  };
  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, motion, toggleMotion, assignments, setAssignments }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </AuthProvider>
  );
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('Missing settings provider');
  return value;
}
