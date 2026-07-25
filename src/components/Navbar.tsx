import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Home, Code2, Folder, Briefcase, Phone } from 'lucide-react';
import { navLinks } from '../data/portfolio';

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
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-3xl transition-all duration-500
          ${scrolled
            ? 'border border-zinc-200/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.06] dark:border-white/10 dark:bg-[#0A0A0F]/80 dark:shadow-black/40'
            : 'border border-zinc-200/60 bg-white/60 backdrop-blur-md dark:border-white/8 dark:bg-[#0A0A0F]/60'
          }`}
      >
        {/* Logo mark */}
        {/* <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 pr-3 mr-1 border-r border-zinc-200 dark:border-white/8"
          aria-label="Back to top"
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
            bg-transparent">
            <img src="/favicon.jpg" alt="" className=' rounded-lg'/>
          </div>
        </motion.a> */}

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
                  group relative px-3.5 py-1.5 rounded-xl text-[13px] font-medium
                  transition-colors duration-200
                  ${isActive
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-400 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }
                `}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl
                    border bg-[#70a80118] border-[#71a801]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Hover background */}
                {!isActive && (
                  <span 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200
                      bg-zinc-100 
                      dark:bg-[#70a80118] dark:border-[#71a801]" 
                  />
                )}

                {/* Icon + Label */}
                <span className="relative flex flex-col items-center gap-0.5">
                  {IconComponent && (
                    <IconComponent size={15} strokeWidth={2} className="text-current" />
                  )}
                  <span className="hidden md:block leading-none">
                    {link.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-200 dark:bg-white/8 mx-1" />

        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleDark}
          aria-label="Toggle theme"
          className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors duration-200
            text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100
            dark:text-zinc-400 dark:hover:text-white dark:hover:bg-[#70a80118]"
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
                <Sun size={15} strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90,  opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{   rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22 }}
              >
                <Moon size={15} strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>
    </div>
  );
}