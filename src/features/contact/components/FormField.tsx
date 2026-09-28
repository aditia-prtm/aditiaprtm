interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

/**
 * FormField
 * Uppercase field label wrapper for input elements.
 */
export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-outfit text-[10px] font-semibold tracking-[0.14em] uppercase text-zinc-600 dark:text-[#777]">
        {label}
      </label>
      {children}
    </div>
  );
}
