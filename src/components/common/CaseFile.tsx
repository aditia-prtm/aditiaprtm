import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';
import FileHeader from './FileHeader';
import { LOADING_OFFSET } from '../../sections/Hero';

interface CaseFileRow {
  key: string;
  val: string;
  accent?: boolean;
}

interface CaseFileProps {
  /** Pass from Hero so CaseFile can react to visibility changes. */
  isInView?: boolean;
  /** True only on first page load; reduces delays on subsequent in-view entries. */
  isFirstRender?: boolean;
}

/**
 * CaseFile
 * Dossier-style identity card showcasing current status, location, university, and stack.
 */
export default function CaseFile({ isInView = true, isFirstRender = true }: CaseFileProps) {
  const rows: CaseFileRow[] = [
    { key: 'STATUS', val: personalInfo.availability, accent: true },
    { key: 'ROLE', val: personalInfo.title, accent: false },
    { key: 'UNIVERSITY', val: 'Sriwijaya University', accent: false },
    { key: 'LOCATION', val: personalInfo.location, accent: false },
    { key: 'STACK', val: 'React · Next.js · Supabase', accent: false },
  ];

  const d = (base: number) => (isFirstRender ? base : Math.max(0, base - LOADING_OFFSET));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: d(1.9) }}
      className="border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e]"
    >
      {/* File header */}
      <FileHeader label="SUBJECT.FILE" />

      {/* Rows */}
      {rows.map(({ key, val, accent }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: d(2.05 + i * 0.08), duration: 0.5 }}
          className="flex items-start gap-6 border-b border-zinc-100 dark:border-[#131313] px-5 py-4 last:border-0 group hover:bg-zinc-100 dark:hover:bg-[#111] transition-colors"
        >
          <span className="font-mono text-[9px] tracking-[0.22em] text-zinc-600 dark:text-[#666] flex-shrink-0 mt-0.5 w-20">
            {key}
          </span>
          <span
            className={`font-mono text-xs leading-relaxed transition-colors ${
              accent
                ? 'text-[#b8860b] dark:text-[#d4af37]'
                : 'text-zinc-600 dark:text-[#9a9a9a] group-hover:text-zinc-800 dark:group-hover:text-[#c8c8c8]'
            }`}
          >
            {val}
          </span>
        </motion.div>
      ))}

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-zinc-200 dark:border-[#1f1f1f]">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 dark:text-[#666]">
          Currently active
        </span>
      </div>
    </motion.div>
  );
}