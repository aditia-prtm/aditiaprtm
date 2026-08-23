// ─── Stat ─────────────────────────────────────────────────────────
export default function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="border-l border-zinc-200 dark:border-[#1f1f1f] pl-5">
      <div className="font-serif text-3xl font-bold leading-none tracking-tight text-zinc-900 dark:text-[#f0ede6]"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {num}
      </div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 dark:text-[#777] mt-1">{label}</div>
    </div>
  );
}