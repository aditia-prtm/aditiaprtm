import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Instagram } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

const socials = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram },
];

/**
 * Footer
 * Minimalist, elegant footer for a portfolio website.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-200/80 dark:border-[#1a1a1a] bg-white/70 dark:bg-[#080808]/80 backdrop-blur-sm transition-colors duration-400">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <img src="/favicon.png" alt={personalInfo.name} className="w-5 h-5 rounded object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-outfit text-sm font-semibold tracking-wide text-zinc-900 dark:text-[#f0ede6] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37] transition-colors">
              {personalInfo.name}
            </span>
          </a>

          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">·</span>

          <p className="font-outfit text-xs text-zinc-500 dark:text-[#777] tracking-wider">
            © {year} All rights reserved.
          </p>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-1.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-[#888] dark:hover:text-[#f0ede6] dark:hover:bg-[#141414] transition-colors duration-200"
              >
                <Icon size={15} strokeWidth={1.75} />
              </motion.a>
            ))}
          </div>

          <span className="w-px h-4 bg-zinc-200 dark:bg-[#222]" />

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-1.5 font-outfit text-xs font-medium tracking-wider text-zinc-500 hover:text-[#b8860b] dark:text-[#777] dark:hover:text-[#d4af37] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
