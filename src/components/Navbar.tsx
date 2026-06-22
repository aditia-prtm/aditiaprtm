import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Zap } from 'lucide-react';
import { navLinks } from '../data/portfolio';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ isDark, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Detect scroll to add backdrop
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'dark:bg-dark-900/80 bg-white/80 backdrop-blur-xl border-b dark:border-white/5 border-black/5 shadow-lg dark:shadow-black/20 shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 group"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                <Zap size={15} className="relative text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base tracking-tight dark:text-white text-gray-900">
                aditia<span className="gradient-text">prtm</span>
              </span>
            </motion.a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'dark:text-white text-gray-900'
                        : 'dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 dark:bg-white/8 bg-black/5 rounded-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">

              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onToggleDark}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isDark
                    ? 'bg-white/8 hover:bg-white/14 text-amber-400'
                    : 'bg-black/5 hover:bg-black/10 text-violet-500'
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Sun size={17} strokeWidth={2} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Moon size={17} strokeWidth={2} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Hire me CTA */}
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 transition-opacity shadow-glow-violet/30 shadow-lg"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Hire Me
              </motion.a>

              {/* Mobile menu toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setMenuOpen(prev => !prev)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl dark:bg-white/8 bg-black/5 dark:text-white text-gray-800"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 dark:bg-black/60 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 dark:bg-dark-900 bg-white border-l dark:border-white/8 border-black/8 p-6 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold gradient-text text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-lg dark:bg-white/8 bg-black/5">
                  <X size={16} className="dark:text-white text-gray-900" />
                </button>
              </div>
              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-xl font-medium dark:text-gray-300 text-gray-600 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/6 hover:bg-black/4 transition-all"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto">
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
