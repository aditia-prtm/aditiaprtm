import { useState } from 'react';
import { motion } from 'framer-motion';

interface TechStackCardProps {
  label: string;
  icon: React.ComponentType<any>;
  isInView: boolean;
  delay: number;
}

/**
 * TechStackCard
 * Pill-shaped tech stack button with original colored icon and label.
 * Horizontal layout with rounded-full styling.
 */
export default function TechStackCard({ label, icon: Icon, isInView, delay }: TechStackCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="
        relative flex items-center gap-2 px-4 py-2 cursor-default rounded-full
        border border-zinc-300 bg-white/90 shadow-[0_8px_22px_rgba(24,24,27,0.04)]
        hover:border-[#b8860b]/50 hover:bg-white
        dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:shadow-none
        dark:hover:border-[#d4af37]/40 dark:hover:bg-[#0e0e0e]
        transition-all duration-300 group
      "
    >
      {/* Icon with original colors */}
      <motion.div
        animate={hovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-shrink-0"
      >
        <Icon
          size={18}
          color="default"
          className="transition-colors duration-200"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.15 }}
        className="font-outfit text-xs font-medium text-zinc-700 dark:text-[#888] group-hover:text-zinc-900 dark:group-hover:text-[#f0ede6] transition-colors duration-200"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
