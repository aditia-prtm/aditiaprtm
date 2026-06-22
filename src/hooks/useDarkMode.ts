import { useState, useEffect } from 'react';

/**
 * useDarkMode
 * Persists user theme preference to localStorage.
 * Applies "dark" class to <html> element.
 * Defaults to dark mode.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 1. Check localStorage
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    // 2. Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    // 3. Default to dark
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return { isDark, toggle };
}
