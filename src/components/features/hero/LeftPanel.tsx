import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Github, Linkedin, Instagram, Mail, ArrowRight, Download,
} from 'lucide-react';

import { personalInfo } from '../../../data/portfolio';
import Cursor from '../../common/BlinkingCursor';
import Stat from '../../common/Stat';
import SocialLink from '../../common/SocialLink';

// ─── Typing effect ────────────────────────────────────────────────
function useTyping(phrases: string[], typeSpeed = 65, deleteSpeed = 35, pause = 2200) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const phrase = phrases[idx % phrases.length];
    if (phase === 'typing') {
      if (text.length < phrase.length) {
        const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), pause);
        return () => clearTimeout(t);
      }
    }
    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 300);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting') {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
        return () => clearTimeout(t);
      } else {
        setIdx(i => i + 1);
        setPhase('typing');
      }
    }
  }, [text, phase, idx, phrases, typeSpeed, deleteSpeed, pause]);

  return text;
}

// ─── Main ─────────────────────────────────────────────────────────
const socials = [
  { icon: Github,    href: personalInfo.social.github,    label: 'GitHub'    },
  { icon: Linkedin,  href: personalInfo.social.linkedin,  label: 'LinkedIn'  },
  { icon: Instagram, href: personalInfo.social.instagram, label: 'Instagram' },
  { icon: Mail,      href: personalInfo.social.email,     label: 'Email'     },
];

const taglines = personalInfo.taglines ?? [
  'Building interfaces that matter',
  'Fullstack developer · CS enthusiast',
  'Turning ideas into clean code',
];

export default function LeftPanel(){
  const typed = useTyping(taglines, 65, 32, 2200);
  const firstName = (personalInfo.name.split(' ')[0] ?? '').split('');
  const lastName  = (personalInfo.name.split(' ')[1] ?? '').split('');

  return (
    {/* LEFT */}
    <div>
        {/* Eyebrow */}
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="flex items-center gap-4 mb-10"
        >
            <span className="w-8 h-px bg-[#b8860b] dark:bg-[#d4af37]" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-600 dark:text-[#888]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Informatics · {personalInfo.location}
            </span>
        </motion.div>

        {/* Name — staggered chars */}
        <h1
            className="font-black leading-[0.88] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(3.4rem, 7.5vw, 6rem)', fontFamily: "'Playfair Display', serif" }}
            aria-label={personalInfo.name}
        >
            {/* First name */}
            <span className="block overflow-hidden">
            {firstName.map((ch, i) => (
                <motion.span
                key={i}
                className="inline-block text-zinc-900 dark:text-[#f0ede6]"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.45 + i * 0.045 }}
                >
                {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
            ))}
            </span>

            {/* Last name — gold, dual class for light/dark */}
            <span className="block overflow-hidden">
            {lastName.map((ch, i) => (
                <motion.span
                key={i}
                className="inline-block name-gold"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.55 + (firstName.length + i) * 0.042 }}
                >
                {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
            ))}
            </span>
        </h1>

        {/* Typing tagline */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="h-7 flex items-center mb-10"
        >
            <span className="text-sm text-zinc-600 dark:text-[#999]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {typed}
            <Cursor />
            </span>
        </motion.div>

        {/* Bio */}
        <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7 }}
            className="text-zinc-600 dark:text-[#9a9a9a] leading-[1.9] text-sm max-w-[420px] mb-12"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
            Undergraduate Informatics Engineering student at{' '}
            <span className="text-[#b8860b] dark:text-[#d4af37]">Sriwijaya University</span>
            . Passionate about building impactful, human-centered software — from pixel-perfect interfaces to resilient backends.
        </motion.p>

        {/* Stats */}
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.7 }}
            className="flex items-center gap-8 mb-12"
        >
            <Stat num="5+" label="Projects" />
            <Stat num="∞"  label="Curiosity" />
            <Stat num="01" label="Goal: Ship" />
        </motion.div>

        {/* CTAs */}
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7 }}
            className="flex flex-wrap gap-6 mb-14"
        >
            {/* Primary CTA */}
            <motion.a
            href="#projects"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={e => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
            >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-800 dark:text-[#f0ede6]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                View Work
            </span>
            <span className="flex items-center justify-center w-8 h-8 border border-[#b8860b]/40 group-hover:border-[#b8860b] group-hover:bg-[#b8860b]/8 dark:border-[#d4af37]/40 dark:group-hover:border-[#d4af37] dark:group-hover:bg-[#d4af37]/8 transition-all duration-300">
                <ArrowRight size={12} className="text-[#b8860b] dark:text-[#d4af37]" />
            </span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
            href={personalInfo.resume}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 group"
            >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-700 dark:text-[#888] dark:group-hover:text-[#bbb] transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                Resume
            </span>
            <span className="flex items-center justify-center w-8 h-8 border border-zinc-200 group-hover:border-zinc-300 dark:border-[#1f1f1f] dark:group-hover:border-[#333] transition-colors duration-300">
                <Download size={12} className="text-zinc-500 group-hover:text-zinc-700 dark:text-[#888] dark:group-hover:text-[#bbb] transition-colors" />
            </span>
            </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.55, duration: 0.7 }}
            className="flex flex-col gap-3.5"
        >
            {socials.map(({ icon, href, label }) => (
            <SocialLink key={label} icon={icon} href={href} label={label} />
            ))}
        </motion.div>
    </div>
  );
}