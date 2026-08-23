import { motion } from 'framer-motion';

/**
 * BlinkingCursor
 * Terminal-style gold cursor with smooth fade animation.
 */
export default function BlinkingCursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1em] bg-[#b8860b] dark:bg-[#d4af37] align-middle ml-1"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.85, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}