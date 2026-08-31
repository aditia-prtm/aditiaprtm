interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

/**
 * FormField
 * Monospaced uppercase field label wrapper for input elements.
 */
export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 dark:text-[#777]">
        {label}
      </label>
      {children}
    </div>
  );
}
