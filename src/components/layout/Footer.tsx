import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Instagram, Mail, MapPin, Home, Code2, Folder, Briefcase, Phone, LucideIcon } from 'lucide-react';
import { personalInfo, navLinks } from '../../data/portfolio';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Code2,
  Folder,
  Briefcase,
  Phone,
};

const socials = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram },
];

/**
 * Footer
 * Clean footer layout with brand info, availability badge, navigation links, and back-to-top trigger.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-200 dark:border-[#1f1f1f] overflow-hidden bg-white dark:bg-[#080808]">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#b8860b]/50 dark:via-[#d4af37]/50 to-transparent" />

      <div className="max-w-[1300px] mx-auto px-8 md:px-16">
        {/* Main grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group w-fit"
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <img src="/favicon.png" alt="adtx" className="rounded-md" />
              </div>
              <span
                className="text-lg font-bold text-zinc-900 dark:text-[#f0ede6]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {personalInfo.name}
              </span>
            </a>

            <p
              className="text-sm leading-relaxed text-zinc-600 dark:text-[#8a8a8a] max-w-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Undergraduate Informatics Engineering student building clean, human-centered software — one project at a time.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <span
                className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-600 dark:text-[#888]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {personalInfo.availability}
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-8 h-8 flex items-center justify-center border border-zinc-200 text-zinc-600 hover:border-[#b8860b]/50 hover:text-[#b8860b] dark:border-[#1f1f1f] dark:text-[#666] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37] transition-colors duration-200"
                >
                  <Icon size={14} strokeWidth={1.7} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigate column */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-[#555]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Navigate
            </span>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const IconComponent = iconMap[link.icon];
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-[#888] hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors duration-200"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {IconComponent && <IconComponent size={13} strokeWidth={1.7} />}
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-[#555]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Connect
            </span>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-[#888] hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors duration-200 break-all"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <Mail size={13} strokeWidth={1.7} className="flex-shrink-0" />
                {personalInfo.email}
              </a>
              <span
                className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-[#888]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <MapPin size={13} strokeWidth={1.7} className="flex-shrink-0" />
                {personalInfo.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-zinc-200 dark:border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-mono text-[10px] text-zinc-500 dark:text-[#555] tracking-widest text-center sm:text-left"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {year} {personalInfo.name} — Portfolio
          </p>

          <p
            className="font-mono text-[10px] text-zinc-500 dark:text-[#555] tracking-widest text-center"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Built with React · Tailwind CSS · Framer Motion
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-zinc-600 dark:text-[#888] hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Back to top
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
