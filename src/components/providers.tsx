'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AuthProvider } from './auth-context';

type Settings = {
  theme: string;
  toggleTheme: () => void;
  motion: boolean;
  toggleMotion: () => void;
  ako: { anchored: boolean; muted: boolean; visible: boolean };
  updateAko: (patch: Partial<Settings['ako']>) => void;
};
const SettingsContext = createContext<Settings | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [motion, setMotion] = useState(true);
  const [ako, setAko] = useState({ anchored: false, muted: false, visible: true });
  const updateAko = (patch: Partial<Settings['ako']>) => {
    setAko((previous) => {
      const next = { ...previous, ...patch };
      try {
        localStorage.setItem('ako-preferences', JSON.stringify(next));
        localStorage.setItem('ako-talking-muted', String(next.muted));
      } catch {}
      return next;
    });
  };
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
    setMotion(document.documentElement.dataset.motion !== 'off');
    try {
      const saved = JSON.parse(localStorage.getItem('ako-preferences') || '{}');
      setAko({
        anchored: saved.anchored === true,
        muted: saved.muted === true || localStorage.getItem('ako-talking-muted') === 'true',
        visible: saved.visible !== false,
      });
    } catch {}
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
  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, motion, toggleMotion, ako, updateAko }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </AuthProvider>
  );
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('Missing settings provider');
  return value;
}
