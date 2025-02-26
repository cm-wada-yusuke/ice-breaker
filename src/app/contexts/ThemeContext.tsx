"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | null;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    // 初期ロード時にシステムのテーマ設定を確認
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = document.documentElement.getAttribute('data-theme') as Theme;
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';
    
    setTheme(savedTheme || systemTheme);

    // システムのテーマ変更を監視
    const handler = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === null) return 'light';
      return prev === "light" ? "dark" : "light";
    });
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
