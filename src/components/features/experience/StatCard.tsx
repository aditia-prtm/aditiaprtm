import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay: number;
  isInView: boolean;
}

/**
 * StatCard
 * Compact statistic block with icon, bold serif metric, and uppercase mono descriptor.
 */
export default function StatCard({ icon: Icon, value, label, delay, isInView }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 p-5 cursor-default transition-colors border border-zinc-200 bg-zinc-50 hover:border-[#b8860b]/40 dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:hover:border-[#d4af37]/30"
    >
      <Icon size={15} strokeWidth={1.6} className="text-[#b8860b] dark:text-[#d4af37]" />
      <div>
        <p
          className="font-black text-2xl leading-none tracking-tight text-zinc-900 dark:text-[#f0ede6] mb-1.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {value}
        </p>
        <p
          className="font-mono text-[9px] tracking-[0.18em] uppercase text-zinc-600 dark:text-[#777]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  );
}
