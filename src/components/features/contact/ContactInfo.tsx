import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../../../data/portfolio';
import FileHeader from '../../common/FileHeader';
import LabeledRule from '../../common/LabeledRule';

interface ContactInfoProps {
  isInView: boolean;
}

const socials = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram },
];

/**
 * ContactInfo
 * Left column of the Contact section: contact dossier file, quote, and online social links.
 */
export default function ContactInfo({ isInView }: ContactInfoProps) {
  const infoRows = [
    { key: 'EMAIL', val: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { key: 'LOCATION', val: personalInfo.location },
    { key: 'REPLY TIME', val: 'Within 24 hours' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Contact file */}
      <div className="border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e]">
        <FileHeader label="CONTACT.FILE" />

        {infoRows.map(({ key, val, href }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            className="flex items-start gap-6 border-b border-zinc-100 dark:border-[#131313] px-5 py-4 last:border-0 group hover:bg-zinc-100 dark:hover:bg-[#111] transition-colors"
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 dark:text-[#555] flex-shrink-0 mt-0.5 w-24">
              {key}
            </span>
            {href ? (
              <a
                href={href}
                className="font-mono text-xs leading-relaxed text-[#b8860b] dark:text-[#d4af37] hover:underline break-all"
              >
                {val}
              </a>
            ) : (
              <span className="font-mono text-xs leading-relaxed text-zinc-500 dark:text-[#8a8a8a] group-hover:text-zinc-700 dark:group-hover:text-[#bbb] transition-colors">
                {val}
              </span>
            )}
          </motion.div>
        ))}

        {/* Footer — availability status */}
        <div className="flex items-center gap-2 px-5 py-3 border-t border-zinc-200 dark:border-[#1f1f1f]">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500 dark:text-[#888]">
            {personalInfo.availability}
          </span>
        </div>
      </div>

      {/* Quote-style personal line */}
      <div className="border-l-2 border-[#b8860b]/25 dark:border-[#d4af37]/20 pl-4">
        <p className="italic font-serif text-sm text-zinc-600 dark:text-[#999] leading-relaxed">
          Got an idea worth building? Let's talk it through.
        </p>
      </div>

      {/* Social links */}
      <div>
        <div className="mb-4">
          <LabeledRule label="Find me online" />
        </div>
        <div className="flex flex-col gap-2">
          {socials.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between px-4 py-3 group border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-[#b8860b]/40 hover:bg-[#b8860b]/[0.04] hover:text-[#b8860b] dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#888] dark:hover:border-[#d4af37]/35 dark:hover:bg-[#d4af37]/[0.05] dark:hover:text-[#d4af37] transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Icon size={15} strokeWidth={1.7} />
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase font-medium">
                  {label}
                </span>
              </div>
              <ArrowUpRight
                size={13}
                strokeWidth={2}
                className="text-zinc-400 dark:text-[#555] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37] transition-colors duration-200"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
