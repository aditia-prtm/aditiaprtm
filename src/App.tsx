import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import 'lenis/dist/lenis.css';

// ─── Libs ─────────────────────────────────────────────────────────
import { initLenis, destroyLenis } from './lib/lenis';

// ─── Hooks ────────────────────────────────────────────────────────
import { useDarkMode } from './hooks/useDarkMode';

// ─── Layout Components ────────────────────────────────────────────
import { Navbar, Footer, LoadingScreen } from './components/layout';

// ─── Sections ─────────────────────────────────────────────────────
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

/**
 * App
 * Root component. Manages theme, loading overlay, smooth scrolling with Lenis, and section layout.
 */
export default function App() {
  const { isDark, toggle } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial asset loading delay
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  // Initialize Lenis smooth scroll (instance stored in the lib/lenis singleton
  // so components like ProjectModal can pause it with lenis.stop()).
  useEffect(() => {
    const lenis = initLenis({
      duration: 1.2,
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
      {/* Loading screen overlay */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      {/* Main layout */}
      <div className="relative min-h-screen dark:bg-[#080808] bg-white transition-colors duration-400">
        {/* Fixed navigation */}
        <Navbar isDark={isDark} onToggleDark={toggle} />

        {/* Page content sections */}
        <main>
          {/* 1 – Hero: full-viewport intro with typing animation */}
          <Hero />

          {/* 2 – Skills: tech stack grid with tool badges */}
          <Skills />

          {/* 3 – Projects: 3D interactive tilt cards with modal detail view */}
          <Projects />

          {/* 4 – Experience: animated vertical timeline and metrics */}
          <Experience />

          {/* 5 – Contact: dossier info card and message form */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
