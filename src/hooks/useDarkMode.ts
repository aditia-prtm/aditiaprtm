import { useState, useEffect } from 'react';

/**
 * useDarkMode
 * Persists user theme preference to localStorage.
 * Applies "dark" class to <html> element.
 * Defaults to dark mode.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 1. Check localStorage for explicit preference
    const stored = localStorage.getItem('theme');
    if (stored === 'light') return false;
    if (stored === 'dark') return true;

    // 2. Default to dark mode
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
