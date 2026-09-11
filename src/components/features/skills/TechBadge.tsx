import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface TechBadgeProps {
  label: string;
  icon: IconType;
  isInView: boolean;
  delay: number;
}

/**
 * TechBadge
 * Pill-style badge dengan icon + label.
 * Border rounded-full, hover gold accent, icon berwarna di kiri.
 */
export default function TechBadge({ label, icon: Icon, isInView, delay }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="
        inline-flex items-center gap-2 px-4 py-2 cursor-default
        rounded-full border border-zinc-300 bg-white/80
        shadow-[0_4px_14px_rgba(24,24,27,0.05)]
        hover:border-[#b8860b]/50 hover:bg-[#b8860b]/[0.04]
        dark:border-[#2a2a2a] dark:bg-[#0f0f0f] dark:shadow-none
        dark:hover:border-[#d4af37]/40 dark:hover:bg-[#d4af37]/[0.05]
        transition-all duration-200 group
      "
    >
      {/* Icon */}
      <Icon
        size={16}
        className="
          flex-shrink-0
          text-zinc-500 dark:text-[#666]
          group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37]
          transition-colors duration-200
        "
      />

      {/* Label */}
      <span
        className="
          font-outfit text-[11px] font-semibold tracking-[0.06em] uppercase
          text-zinc-700 dark:text-[#999]
          group-hover:text-zinc-900 dark:group-hover:text-[#e0e0e0]
          transition-colors duration-200 whitespace-nowrap
        "
      >
        {label}
      </span>
    </motion.div>
  );
}
