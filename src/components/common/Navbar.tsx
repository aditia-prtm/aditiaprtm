import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Home, Code2, Folder, Briefcase, Phone } from 'lucide-react';
import { navLinks } from '../../data/portfolio';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Code2,
  Folder,
  Briefcase,
  Phone,
};

export default function Navbar({ isDark, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -40% 0px' },
    );
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>

      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-500
          ${scrolled
            ? 'border border-zinc-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.06] dark:border-[#1f1f1f] dark:bg-[#0a0a0a]/85 dark:shadow-black/40'
            : 'border border-zinc-200/60 bg-white/60 backdrop-blur-md dark:border-[#1a1a1a] dark:bg-[#0a0a0a]/60'
          }`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Nav links */}
        <div className="flex items-center gap-0.5">
          {navLinks.map(link => {
            const IconComponent = iconMap[link.icon];
            const id       = link.href.replace('#', '');
            const isActive = activeSection === id;

            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`
                  group relative px-3.5 py-1.5 rounded-xl text-[11px] font-medium tracking-[0.08em]
                  transition-colors duration-200
                  ${isActive
                    ? 'text-[#b8860b] dark:text-[#d4af37]'
                    : 'text-zinc-500 dark:text-[#666] hover:text-zinc-900 dark:hover:text-[#eee]'
                  }
                `}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl
                    border bg-[#b8860b]/8 border-[#b8860b]/30 dark:bg-[#d4af37]/10 dark:border-[#d4af37]/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Hover background */}
                {!isActive && (
                  <span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200
                      bg-zinc-100
                      dark:bg-white/[0.04]"
                  />
                )}

                {/* Icon + Label */}
                <span className="relative flex flex-col items-center gap-1">
                  {IconComponent && (
                    <IconComponent size={15} strokeWidth={1.75} className="text-current" />
                  )}
                  <span className="hidden md:block leading-none uppercase text-[9px] tracking-[0.16em]">
                    {link.label}
                  </span>
                </span>

                {/* Active dot — echoes CaseFile status dot */}
                {isActive && (
                  <motion.span
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-200 dark:bg-[#1f1f1f] mx-1.5" />
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleDark}
          aria-label="Toggle theme"
          className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors duration-200
            text-zinc-500 hover:text-[#b8860b] hover:bg-zinc-100
            dark:text-[#666] dark:hover:text-[#d4af37] dark:hover:bg-white/[0.04]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{   rotate: 90,  opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22 }}
              >
                <Sun size={15} strokeWidth={1.75} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90,  opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{   rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22 }}
              >
                <Moon size={15} strokeWidth={1.75} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>
    </div>
  );
}