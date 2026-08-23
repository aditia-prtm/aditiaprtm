import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { Experience } from '../../../types';

interface TimelineItemProps {
  exp: Experience;
  index: number;
  isInView: boolean;
  isLast: boolean;
}

/**
 * TimelineItem
 * Vertical timeline entry with glowing icon node, connecting vertical rule, and highlight bullets.
 */
export default function TimelineItem({ exp, index, isInView, isLast }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5"
    >
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0 w-9">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.13 + 0.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-9 h-9 flex items-center justify-center flex-shrink-0 border border-zinc-200 bg-white dark:border-[#1f1f1f] dark:bg-[#080808]"
          style={{ boxShadow: '0 0 0 3px rgba(184,134,11,0.1)' }}
        >
          <Briefcase size={14} strokeWidth={1.7} className="text-[#b8860b] dark:text-[#d4af37]" />
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: index * 0.13 + 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="flex-1 w-px mt-2 bg-zinc-200 dark:bg-[#1f1f1f]"
          />
        )}
      </div>

      {/* Content card */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ duration: 0.25 }}
          className="relative p-5 cursor-default transition-colors duration-200 border border-zinc-200 bg-zinc-50 hover:border-[#b8860b]/40 dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:hover:border-[#d4af37]/30 dark:hover:bg-[#0e0e0e]"
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-5 right-5 h-px opacity-70"
            style={{ background: 'linear-gradient(90deg, #b8860b, transparent)' }}
          />

          {/* Role + company */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3
                className="font-black tracking-[-0.01em] text-zinc-900 dark:text-[#f0ede6] leading-tight"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Briefcase size={11} strokeWidth={1.7} className="text-[#b8860b] dark:text-[#d4af37]" />
                <span className="text-sm font-semibold text-[#b8860b] dark:text-[#d4af37]">
                  {exp.company}
                </span>
                {exp.type && (
                  <>
                    <span className="text-zinc-300 dark:text-[#333]">·</span>
                    <span
                      className="font-mono text-[9px] tracking-wide text-zinc-400 dark:text-[#666] uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {exp.type}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Period badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 self-start border border-zinc-200 bg-white dark:border-[#1f1f1f] dark:bg-transparent">
              <Calendar size={11} strokeWidth={1.7} className="text-zinc-400 dark:text-[#666]" />
              <span
                className="font-mono text-[9px] tracking-widest text-zinc-500 dark:text-[#888] whitespace-nowrap"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {exp.period}
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-[#1f1f1f] mb-4" />

          <p className="text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] mb-4">
            {exp.description}
          </p>

          <div className="flex flex-col gap-1.5">
            {exp.highlights.map((h: string) => (
              <div key={h} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-[#8a8a8a]">
                <ChevronRight size={12} strokeWidth={2.2} className="flex-shrink-0 mt-0.5 text-[#b8860b] dark:text-[#d4af37]" />
                {h}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
