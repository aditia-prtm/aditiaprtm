import { motion } from 'framer-motion';
import { personalInfo } from '../../../data/portfolio';
import FileHeader from '../../common/FileHeader';

interface ContactInfoProps {
  isInView: boolean;
}

/**
 * ContactInfo
 * Left column of the Contact section: contact dossier file, quote, and online social links.
 */
export default function ContactInfo({ isInView }: ContactInfoProps) {
  const infoRows = [
    { key: 'EMAIL', val: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { key: 'LOCATION', val: personalInfo.location },
    { key: 'REPLY TIME', val: '24 - 48 hours' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Contact file */}
      <div className="rounded-2xl overflow-hidden border border-zinc-300 bg-white/85 shadow-[0_18px_45px_rgba(24,24,27,0.07)] backdrop-blur-sm dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:shadow-none dark:backdrop-blur-none">
        <FileHeader label="CONTACT.FILE" />

        {infoRows.map(({ key, val, href }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            className="flex items-start gap-6 border-b border-zinc-200/80 dark:border-[#131313] px-5 py-4 last:border-0 group hover:bg-[#b8860b]/[0.045] dark:hover:bg-[#111] transition-colors"
          >
            <span className="font-outfit text-[10px] font-semibold tracking-[0.12em] text-zinc-600 dark:text-[#555] flex-shrink-0 mt-0.5 w-24">
              {key}
            </span>
            {href ? (
              <a
                href={href}
                className="font-outfit text-xs leading-relaxed text-[#b8860b] dark:text-[#d4af37] hover:underline break-all font-semibold"
              >
                {val}
              </a>
            ) : (
              <span className="font-outfit text-xs leading-relaxed text-zinc-600 dark:text-[#8a8a8a] group-hover:text-zinc-700 dark:group-hover:text-[#bbb] transition-colors">
                {val}
              </span>
            )}
          </motion.div>
        ))}

        {/* Footer — availability status */}
        <div className="flex items-center gap-2 px-5 py-3 border-t border-zinc-300 bg-zinc-50/70 dark:border-[#1f1f1f] dark:bg-transparent">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <span className="font-outfit text-[10px] font-semibold tracking-[0.12em] uppercase text-zinc-600 dark:text-[#888]">
            {personalInfo.availability}
          </span>
        </div>
      </div>

      {/* Quote-style personal line */}
      <div className="rounded-2xl border-l-2 border-[#b8860b]/35 bg-[#b8860b]/[0.035] dark:border-[#d4af37]/20 dark:bg-transparent pl-4 py-3">
        <p className="font-outfit italic text-sm text-zinc-600 dark:text-[#999] leading-relaxed">
          Got an idea worth building? Let's talk it through.
        </p>
      </div>
    </div>
  );
}
