interface StatProps {
  num: string;
  label: string;
  className?: string;
}

/**
 * Stat
 * Key metric display with elegant serif numeral and monospaced label.
 */
export default function Stat({ num, label, className = '' }: StatProps) {
  return (
    <div className={`border-l border-zinc-300 dark:border-[#1f1f1f] pl-5 ${className}`}>
      <div
        className="font-outfit text-3xl font-bold leading-none tracking-tight text-zinc-900 dark:text-[#f0ede6]"
      >
        {num}
      </div>
      <div
        className="font-outfit text-[10px] font-semibold tracking-[0.14em] uppercase text-zinc-600 dark:text-[#777] mt-1"
      >
        {label}
      </div>
    </div>
  );
}
