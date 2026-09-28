'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDarkMode } from '@/hooks/useDarkMode';
import { initLenis, destroyLenis } from '@/lib/lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingScreen from './LoadingScreen';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { isDark, toggle, mounted } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = initLenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      destroyLenis();
    };
  }, []);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      <div className="relative min-h-screen dark:bg-[#080808] bg-[#fffdf8] transition-colors duration-300 font-sans">
        {/* Fixed Navigation */}
        <Navbar isDark={isDark} onToggleDark={toggle} mounted={mounted} />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
