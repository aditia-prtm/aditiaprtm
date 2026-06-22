import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// ─── Hooks ────────────────────────────────────────────────────────
import { useDarkMode } from './hooks/useDarkMode';

// ─── Components ───────────────────────────────────────────────────
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
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
    const timeout = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timeout);
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
          <About />

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
