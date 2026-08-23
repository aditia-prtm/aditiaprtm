interface LabeledRuleProps {
  label: string;
  className?: string;
}

/**
 * LabeledRule
 * Elegant section divider with a gold line, uppercase monospaced label, and horizontal rule.
 */
export default function LabeledRule({ label, className = '' }: LabeledRuleProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="w-8 h-px bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0" />
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-[#888]">
        {label}
      </span>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-[#1f1f1f]" />
    </div>
  );
}
