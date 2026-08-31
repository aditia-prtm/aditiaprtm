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
 * Interactive tech stack grid card with icon scaling, subtle gold radial glow, and mono label.
 */
export default function TechStackCard({ label, icon: Icon, isInView, delay }: TechStackCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center gap-3 p-4 cursor-default border border-zinc-200 bg-white dark:border-[#1f1f1f] dark:bg-[#0a0a0a] transition-colors duration-300 group hover:border-[#b8860b]/50 dark:hover:border-[#d4af37]/40 dark:hover:bg-[#0e0e0e]"
    >
      {/* Subtle gold glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.06) 0%, transparent 70%)',
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
          className="transition-colors duration-200 text-zinc-500 dark:text-[#555] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37]"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.15 }}
        className="font-mono text-[9px] tracking-[0.14em] uppercase text-center leading-tight text-zinc-600 dark:text-[#666] group-hover:text-zinc-800 dark:group-hover:text-[#ccc] transition-colors duration-200"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}