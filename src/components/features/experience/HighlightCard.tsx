import { motion } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import { Experience } from '../../../types';

interface HighlightCardProps {
  exp: Experience;
  delay: number;
  isInView: boolean;
}

/**
 * HighlightCard
 * Compact overview card for career milestones and key accomplishments.
 */
export default function HighlightCard({ exp, delay, isInView }: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: -3 }}
      className="flex items-start gap-3.5 p-4 cursor-default transition-colors rounded-2xl border border-zinc-300 bg-white/80 shadow-[0_10px_26px_rgba(24,24,27,0.045)] hover:border-[#b8860b]/40 hover:bg-white dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:shadow-none dark:hover:border-[#d4af37]/30 dark:hover:bg-[#0e0e0e]"
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#b8860b]/25 bg-[#b8860b]/8 dark:border-[#d4af37]/25 dark:bg-[#d4af37]/8">
        <Briefcase size={13} strokeWidth={1.8} className="text-[#b8860b] dark:text-[#d4af37]" />
      </div>
      <div className="min-w-0">
        <p className="font-outfit text-sm font-bold text-zinc-900 dark:text-[#f0ede6] leading-tight truncate">
          {exp.role}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="font-outfit text-xs font-semibold text-[#b8860b] dark:text-[#d4af37]">
            {exp.company}
          </span>
          <span className="text-zinc-300 dark:text-[#333] text-xs">·</span>
          <span className="font-outfit text-[10px] font-semibold text-zinc-500 dark:text-[#666] uppercase tracking-[0.06em]">
            {exp.period.split(' ')[0]}
          </span>
        </div>
        {exp.highlights?.[0] && (
          <div className="flex items-center gap-1.5 mt-2">
            <ChevronRight
              size={11}
              strokeWidth={2.2}
              className="flex-shrink-0 mt-0.5 text-[#b8860b] dark:text-[#d4af37]"
            />
            <p className="font-outfit text-[11px] text-zinc-600 dark:text-[#888] leading-relaxed line-clamp-2">
              {exp.highlights[0]}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
