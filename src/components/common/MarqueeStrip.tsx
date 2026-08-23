import { motion } from "framer-motion";

// ─── Marquee strip ────────────────────────────────────────────────
export default function MarqueeStrip() {
  const tags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Supabase', 'Postgres', 'REST APIs ', 'Open Source'];
  const repeated = [...tags, ...tags, ...tags];
  return (
    <div className="overflow-hidden border-y border-zinc-200 dark:border-[#1f1f1f] py-3 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-zinc-500 dark:text-[#666]"
          >
            <span className="w-1 h-1 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}