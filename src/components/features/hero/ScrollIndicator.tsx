import { motion } from 'framer-motion';
import { LOADING_OFFSET } from '../../../sections/Hero';

interface ScrollIndicatorProps {
  isInView?: boolean;
  isFirstRender?: boolean;
}

/**
 * ScrollIndicator
 * Animated vertical bouncing line and text prompting user to scroll.
 */
export default function ScrollIndicator({ isInView = true, isFirstRender = true }: ScrollIndicatorProps) {
  const d = (base: number) => (isFirstRender ? base : Math.max(0, base - LOADING_OFFSET));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: d(3.2), duration: 0.8 }}
      className="relative z-10 flex justify-center pb-5 lg:-mt-10"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-zinc-500 dark:to-[#1f1f1f]" />
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-zinc-500 dark:text-[#555]">
          scroll
        </span>
      </motion.div>
    </motion.div>
  );
}