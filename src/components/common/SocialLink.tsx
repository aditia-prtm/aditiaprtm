import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  icon: LucideIcon | React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  href: string;
  label: string;
}

/**
 * SocialLink
 * Subtle social media anchor with animated horizontal rule accent and gold hover.
 */
export default function SocialLink({ icon: Icon, href, label }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      className="flex items-center gap-2 group"
      aria-label={label}
    >
      <Icon
        size={13}
        strokeWidth={1.5}
        className="text-zinc-500 group-hover:text-[#b8860b] dark:text-[#666] dark:group-hover:text-[#d4af37] transition-colors duration-300"
      />
      <span className="font-outfit text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600 group-hover:text-[#b8860b] dark:text-[#777] dark:group-hover:text-[#d4af37] transition-colors duration-300">
        {label}
      </span>
    </motion.a>
  );
}
