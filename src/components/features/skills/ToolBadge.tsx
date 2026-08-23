import { motion } from 'framer-motion';

interface ToolBadgeProps {
  name: string;
  delay: number;
  isInView: boolean;
}

/**
 * ToolBadge
 * Monospaced tool badge with subtle border, background transition, and lift-on-hover.
 */
export default function ToolBadge({ name, delay, isInView }: ToolBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="px-3.5 py-1.5 font-mono text-[10px] cursor-default border border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-[#b8860b]/50 hover:text-[#b8860b] hover:bg-[#b8860b]/[0.04] dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#666] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37] dark:hover:bg-[#d4af37]/[0.06] transition-colors duration-200 tracking-[0.08em] uppercase"
    >
      {name}
    </motion.span>
  );
}
