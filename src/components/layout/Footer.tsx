'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const socials = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram },
  { icon: Mail, label: 'E-Mail', href: personalInfo.social.email },
];

export default function Footer() {

  return (
    <footer className="relative border-t border-zinc-200/80 dark:border-[#1a1a1a] bg-white/70 dark:bg-[#080808]/80 backdrop-blur-sm transition-colors duration-400 font-outfit">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <img
                src="/favicon.png"
                alt={personalInfo.name}
                className="w-5 h-5 rounded object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="font-outfit text-sm font-semibold tracking-wide text-zinc-900 dark:text-[#f0ede6] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37] transition-colors">
              {personalInfo.name}.
            </span>
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center">
          {/* Social icons */}
          <div className="flex items-center">
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
        </div>
      </div>
    </footer>
  );
}
