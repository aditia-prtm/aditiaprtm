import { motion } from 'framer-motion';

interface ToolBadgeProps {
  name: string;
  delay: number;
  isInView: boolean;
}

/**
 * ToolBadge
 * Tool badge with rounded-xl border, background transition, and lift-on-hover matching Hero CTA.
 */
export default function ToolBadge({ name, delay, isInView }: ToolBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, scale: 1.03 }}
      className="
        inline-flex items-center px-4 py-2 font-outfit text-xs font-semibold cursor-default rounded-xl
        border border-zinc-400/50 bg-white text-zinc-700 shadow-[0_4px_14px_rgba(24,24,27,0.04)]
        hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900
        dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:text-[#888] dark:shadow-none
        dark:hover:border-[#3a3a3a] dark:hover:bg-[#1c1c1c] dark:hover:text-[#f0ede6]
        transition-all duration-300 tracking-wide uppercase
      "
    >
      {name}
    </motion.span>
  );
}
