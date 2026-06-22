import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] dark:bg-dark-950 bg-slate-50 flex flex-col items-center justify-center gap-8"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-violet-500/20"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.4) 60deg, transparent 120deg)',
              }}
            />

            {/* Logo box */}
            <div className="relative w-24 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30">
              <span className="text-2xl font-black text-white">ADTX</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-bold text-lg dark:text-white text-gray-900 mb-1">Aditia Pratama</p>
            <p className="text-sm dark:text-gray-500 text-gray-400 font-mono">Initialising portfolio…</p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: '6rem', opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-0.5 rounded-full dark:bg-white/6 bg-black/6 overflow-hidden"
            style={{ width: '6rem' }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="h-full w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
