'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { getLenis } from '@/lib/lenis';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed bottom-6 right-6 z-40
            flex items-center justify-center
            w-11 h-11 rounded-2xl
            border border-zinc-300/80 bg-white/85 backdrop-blur-md text-zinc-700
            shadow-lg shadow-black/[0.08]
            hover:border-zinc-400 hover:bg-zinc-50 hover:text-[#b8860b]
            dark:border-[#222] dark:bg-[#111111]/90 dark:text-zinc-300
            dark:shadow-black/50 dark:hover:border-zinc-700 dark:hover:bg-[#1a1a1a] dark:hover:text-[#d4af37]
            transition-colors duration-200 group
          "
        >
          <ChevronUp
            size={20}
            strokeWidth={2.4}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
