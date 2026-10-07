'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AuthProvider } from './auth-context';

type Settings = {
  theme: string;
  toggleTheme: () => void;
  motion: boolean;
  toggleMotion: () => void;
};
const SettingsContext = createContext<Settings | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [motion, setMotion] = useState(true);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
    setMotion(document.documentElement.dataset.motion !== 'off');
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
    <SettingsContext.Provider value={{ theme, toggleTheme, motion, toggleMotion }}>
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
