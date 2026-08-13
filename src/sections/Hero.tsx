import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Github, Linkedin, Instagram, Mail, ArrowRight, Download,
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';

// ─── Marquee strip ────────────────────────────────────────────────
function MarqueeStrip() {
  const tags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Supabase', 'Postgres', 'REST APIs ', 'Open Source'];
  const repeated = [...tags, ...tags, ...tags];
  return (
    <div className="overflow-hidden border-y border-zinc-200 dark:border-[#1f1f1f] py-3 select-none">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-zinc-500 dark:text-[#666]"
          >
            <span className="w-1 h-1 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Blinking cursor ──────────────────────────────────────────────
function Cursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-[1em] bg-[#b8860b] dark:bg-[#d4af37] align-middle ml-1"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.85, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
}

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

// ─── Stat ─────────────────────────────────────────────────────────
function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="border-l border-zinc-200 dark:border-[#1f1f1f] pl-5">
      <div className="font-serif text-3xl font-bold leading-none tracking-tight text-zinc-900 dark:text-[#f0ede6]"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {num}
      </div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 dark:text-[#777] mt-1">{label}</div>
    </div>
  );
}

// ─── Social link ──────────────────────────────────────────────────
function SocialLink({ icon: Icon, href, label }: { icon: React.ElementType; href: string; label: string }) {
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

// ─── Case file panel ──────────────────────────────────────────────
function CaseFile() {
  const rows = [
    { key: 'STATUS',     val: 'Open for freelance',        accent: true  },
    { key: 'ROLE',       val: 'Fullstack Developer',        accent: false },
    { key: 'UNIVERSITY', val: 'Sriwijaya University',       accent: false },
    { key: 'LOCATION',   val: personalInfo.location,        accent: false },
    { key: 'STACK',      val: 'React · Next.js · Supabase', accent: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
      className="border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e]"
    >
      {/* File header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f1f1f] px-5 py-3">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-[#666]">
          SUBJECT.FILE
        </span>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]/50 dark:bg-[#d4af37]/60" />
        </div>
      </div>

      {/* Rows */}
      {rows.map(({ key, val, accent }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.05 + i * 0.08, duration: 0.5 }}
          className="flex items-start gap-6 border-b border-zinc-100 dark:border-[#131313] px-5 py-4 last:border-0 group hover:bg-zinc-100 dark:hover:bg-[#111] transition-colors"
        >
          <span className="font-mono text-[9px] tracking-[0.22em] text-zinc-500 dark:text-[#666] flex-shrink-0 mt-0.5 w-20">
            {key}
          </span>
          <span className={`font-mono text-xs leading-relaxed transition-colors ${
            accent
              ? 'text-[#b8860b] dark:text-[#d4af37]'
              : 'text-zinc-600 dark:text-[#9a9a9a] group-hover:text-zinc-800 dark:group-hover:text-[#c8c8c8]'
          }`}>
            {val}
          </span>
        </motion.div>
      ))}

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-zinc-200 dark:border-[#1f1f1f]">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500 dark:text-[#666]">
          Currently active
        </span>
      </div>
    </motion.div>
  );
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

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const typed = useTyping(taglines, 65, 32, 2200);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  const firstName = (personalInfo.name.split(' ')[0] ?? '').split('');
  const lastName  = (personalInfo.name.split(' ')[1] ?? '').split('');

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-white dark:bg-[#080808] pt-[70px]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@300;400&display=swap');

        .hero-grid-bg {
          background-image:
            linear-gradient(to right, #00000008 1px, transparent 1px),
            linear-gradient(to bottom, #00000008 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .dark .hero-grid-bg {
          background-image:
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .name-gold {
          background: linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #9a7209 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dark .name-gold {
          background: linear-gradient(135deg, #d4af37 0%, #f5e177 50%, #c9a227 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background grid */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Light mode: soft warm pool top-left */}
      <div className="dark:hidden absolute pointer-events-none" style={{
        top: '-10%', left: '-8%', width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 70%)',
      }} />
      {/* Light mode: bottom right accent */}
      <div className="dark:hidden absolute pointer-events-none" style={{
        bottom: '-5%', right: '0%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,134,11,0.03) 0%, transparent 70%)',
      }} />

      {/* Dark mode: gold pool */}
      <div className="hidden dark:block absolute pointer-events-none" style={{
        top: '-10%', left: '-8%', width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
      }} />

      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ── Main content ── */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1300px] mx-auto px-8 md:px-16 pt-5 pb-16 grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">

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

          {/* RIGHT */}
          <div className="flex flex-col gap-6 mt-2 lg:mt-12">

            {/* Year stamp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#555]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {new Date().getFullYear()}
              </div>
              <div className="flex-1 h-px bg-zinc-100 dark:bg-[#141414]" />
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#555]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                v2.0
              </div>
            </motion.div>

            {/* Case file */}
            <CaseFile />

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="border-l-2 border-[#b8860b]/20 dark:border-[#d4af37]/18 pl-4"
            >
              <p className="italic text-xs text-zinc-500 dark:text-[#888] leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                "Clean code always looks like it was written by someone who cares."
              </p>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#666] mt-2 block"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                — Robert C. Martin
              </span>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-5 lg:-mt-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-zinc-400 dark:to-[#1f1f1f]" />
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-zinc-400 dark:text-[#555]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            scroll
          </span>
        </motion.div>
      </motion.div>

    </section>
  );
}