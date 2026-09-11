// src\components\features\skills\TechStackCard.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface TechStackCardProps {
  label: string;
  icon: IconType;
  isInView: boolean;
  delay: number;
}

/**
 * TechStackCard
 * Interactive tech stack grid card with icon scaling, subtle gold radial glow, and compact label.
 * Styled with rounded-2xl container matching Hero CTA / card design language.
 */
export default function TechStackCard({ label, icon: Icon, isInView, delay }: TechStackCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="
        relative flex flex-col items-center gap-3 p-4 cursor-default rounded-2xl
        border border-zinc-300 bg-white/90 shadow-[0_8px_22px_rgba(24,24,27,0.04)]
        hover:border-[#b8860b]/50 hover:bg-white
        dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:shadow-none
        dark:hover:border-[#d4af37]/40 dark:hover:bg-[#0e0e0e]
        transition-all duration-300 group
      "
    >
      {/* Subtle gold glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.12 } : { scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
      >
        <Icon
          size={32}
          className="transition-colors duration-200 text-zinc-500 dark:text-[#777] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37]"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.15 }}
        className="font-outfit text-[11px] font-semibold tracking-[0.08em] uppercase text-center leading-tight text-zinc-600 dark:text-[#777] group-hover:text-zinc-900 dark:group-hover:text-[#f0ede6] transition-colors duration-200"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
