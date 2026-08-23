import { motion } from "framer-motion";

// ─── Social link ──────────────────────────────────────────────────
export default function SocialLink({ icon: Icon, href, label }: { icon: React.ElementType; href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 group"
      aria-label={label}
    >
      <span className="w-8 h-px bg-zinc-200 group-hover:bg-[#b8860b] dark:bg-[#2a2a2a] dark:group-hover:bg-[#d4af37] transition-colors duration-300" />
      <Icon size={13} strokeWidth={1.5}
        className="text-zinc-500 group-hover:text-[#b8860b] dark:text-[#666] dark:group-hover:text-[#d4af37] transition-colors duration-300" />
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-zinc-500 group-hover:text-[#b8860b] dark:text-[#777] dark:group-hover:text-[#d4af37] transition-colors duration-300">
        {label}
      </span>
    </motion.a>
  );
}