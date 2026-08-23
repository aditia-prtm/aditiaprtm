import { motion } from 'framer-motion';

interface FileHeaderProps {
  label: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * FileHeader
 * File/tab style header with animated status dot, mono label, and optional action control.
 */
export default function FileHeader({ label, action, className = '' }: FileHeaderProps) {
  return (
    <div className={`flex items-center justify-between border-b border-zinc-200 dark:border-[#1f1f1f] px-5 py-3 ${className}`}>
      {action ? (
        <>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </div>
          <span className="font-mono text-[9px] text-zinc-400 dark:text-[#555] tracking-[0.25em] uppercase">
            {label}
          </span>
          {action}
        </>
      ) : (
        <>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#666]">
            {label}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </div>
        </>
      )}
    </div>
  );
}
