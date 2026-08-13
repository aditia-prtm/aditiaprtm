import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// ─── Hooks ────────────────────────────────────────────────────────
import { useDarkMode } from './hooks/useDarkMode';

// ─── Components ───────────────────────────────────────────────────
import LoadingScreen from './pages/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

/**
 * App
 * Root component. Manages theme + loading state, then renders the
 * full single-page portfolio layout.
 */
export default function App() {
  const { isDark, toggle } = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate asset / font loading delay
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* ── Loading screen ────────────────────────────────────────── */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      {/* ── Main layout ───────────────────────────────────────────── */}
      <div className="relative min-h-screen dark:bg-dark-950 bg-slate-50 transition-colors duration-400">

        {/* Fixed navigation */}
        <Navbar isDark={isDark} onToggleDark={toggle} />

        {/* Page content */}
        <main>
          {/* 1 – Hero: full-viewport intro with typing animation */}
          <Hero />

          {/* 2 – About: bio, avatar, stats */}

          {/* 3 – Skills: tech stack grid with progress bars */}
          <Skills />

          {/* 4 – Projects: 3D tilt cards with modal detail view */}
          <Projects />

          {/* 5 – Experience: animated vertical timeline */}
          <Experience />

          {/* 6 – Contact: form + social links */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </>
  );
}
