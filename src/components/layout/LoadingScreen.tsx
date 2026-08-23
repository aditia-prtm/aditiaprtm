import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

interface LoadingScreenProps {
  isLoading: boolean;
}

/**
 * LoadingScreen
 * Elegant initial loading overlay with animated gold ring, logo, progress bar, and status indicator.
 */
export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-white dark:bg-[#080808] flex flex-col items-center justify-center gap-8 overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 section-grid-bg pointer-events-none" />

          {/* Soft gold pool */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '30%',
              left: '50%',
              width: 500,
              height: 500,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(184,134,11,0.05) 0%, transparent 70%)',
            }}
          />

          {/* Corner tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            <span className="w-6 h-px bg-[#b8860b] dark:bg-[#d4af37]" />
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#555]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              LOADING...
            </span>
            <span className="w-6 h-px bg-[#b8860b] dark:bg-[#d4af37]" />
          </motion.div>

          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-[#b8860b]/20 dark:border-[#d4af37]/20"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(184,134,11,0.45) 60deg, transparent 120deg)',
              }}
            />

            {/* Logo box */}
            <img
              src="/favicon.png"
              alt="adtx"
              className="rounded-full h-14 w-14 p-2 md:h-20 md:w-20 border border-[#b8860b]/25 dark:border-[#d4af37]/20 bg-[#b8860b]/8 dark:bg-[#d4af37]/8"
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <p
              className="font-bold text-xl text-zinc-900 dark:text-[#f0ede6] mb-1.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {personalInfo.name}
            </p>
            <p
              className="text-xs text-zinc-500 dark:text-[#666] tracking-[0.15em] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Initialising portfolio…
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 h-px w-24 bg-zinc-200 dark:bg-[#1f1f1f] overflow-hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="h-full w-full bg-gradient-to-r from-transparent via-[#b8860b] dark:via-[#d4af37] to-transparent"
            />
          </motion.div>

          {/* Status dot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative z-10 flex items-center gap-2"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#555]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Loading assets
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
