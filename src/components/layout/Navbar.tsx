'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Home, Code2, Award, Folder, Briefcase, Send, LucideIcon } from 'lucide-react';
import { navLinks } from '@/data/portfolio';
import { getLenis } from '@/lib/lenis';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  mounted?: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  Home,
  Code2,
  Award,
  Folder,
  Briefcase,
  Send,
};

export default function Navbar({ isDark, onToggleDark, mounted = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      getLenis()?.scrollTo(0, { immediate: true });
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center gap-1 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-500 font-outfit ${
          scrolled
            ? 'border border-zinc-300/80 bg-white/85 backdrop-blur-xl shadow-lg shadow-black/[0.06] dark:border-[#1f1f1f] dark:bg-[#0a0a0a]/90 dark:shadow-black/40'
            : 'border border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-[#1a1a1a] dark:bg-[#0a0a0a]/70'
        }`}
      >
        {/* Nav links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navLinks.map((link) => {
            const IconComponent = iconMap[link.icon] || Home;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] font-medium tracking-[0.08em] transition-colors duration-200 ${
                  isActive
                    ? 'text-[#b8860b] dark:text-[#d4af37]'
                    : 'text-zinc-600 dark:text-[#888] hover:text-zinc-900 dark:hover:text-[#eee]'
                }`}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl border bg-[#b8860b]/10 border-[#b8860b]/30 dark:bg-[#d4af37]/10 dark:border-[#d4af37]/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Hover background */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 bg-zinc-100 dark:bg-white/[0.04]" />
                )}

                {/* Icon + Label */}
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="relative flex flex-col items-center gap-1"
                >
                  <IconComponent size={15} strokeWidth={1.75} className="text-current" />
                  <span className="hidden md:block leading-none uppercase text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] font-semibold tracking-[0.12em]">
                    {link.label}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="block overflow-hidden leading-none uppercase text-[6px] sm:text-[7px] font-semibold tracking-[0.12em] md:hidden"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.span
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-zinc-300 dark:bg-[#2c2c2c] mx-1 sm:mx-1.5" />

        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleDark}
          aria-label="Toggle theme"
          className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors duration-200 text-zinc-600 hover:text-[#b8860b] hover:bg-zinc-100 dark:text-[#888] dark:hover:text-[#d4af37] dark:hover:bg-white/[0.04]"
        >
          {mounted ? (
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22 }}
                >
                  <Sun size={15} strokeWidth={1.75} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22 }}
                >
                  <Moon size={15} strokeWidth={1.75} />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="w-[15px] h-[15px]" />
          )}
        </motion.button>
      </motion.nav>
    </div>
  );
}
