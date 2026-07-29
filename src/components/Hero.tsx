import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Download, Code2, Cpu, Globe, Database } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useTypingEffect } from '../hooks/useTypingEffect';

// ─── Noise texture overlay ────────────────────────────────────────
function NoiseOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.035] pointer-events-none z-0" aria-hidden>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

// ─── Labeled rule ─────────────────────────────────────────────────
function LabeledRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-500">
        {label}
      </span>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-white/6" />
    </div>
  );
}

// ─── Social pill ──────────────────────────────────────────────────
function SocialPill({ icon: Icon, href, label }: { icon: React.ElementType; href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="flex items-center gap-2 px-3.5 py-2 rounded-xl border
        border-zinc-200 bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:border-violet-400/60 hover:bg-violet-50
        dark:border-white/8 dark:bg-transparent dark:text-zinc-400 dark:hover:text-white dark:hover:border-[#71a801] dark:hover:bg-[#70a80118]
        transition-colors"
      aria-label={label}
    >
      <Icon size={14} strokeWidth={1.7} />
      <span className="font-mono text-[11px] tracking-wide">{label}</span>
    </motion.a>
  );
}

// ─── Stat chip ────────────────────────────────────────────────────
function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xl font-black leading-none tracking-tight text-[#71a801] dark:text-[#C8FF57]">
        {value}
      </span>
      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── Tech stack pill ──────────────────────────────────────────────
function TechPill({ name, lightColor, darkColor }: { name: string; lightColor: string; darkColor: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-3 py-1.5 rounded-lg font-mono text-xs font-medium cursor-default tech-pill"
      data-light={lightColor}
      data-dark={darkColor}
      style={
        {
          '--pill-color-light': lightColor,
          '--pill-color-dark': darkColor,
        } as React.CSSProperties
      }
    >
      {name}
    </motion.div>
  );
}

// ─── Right panel: skill card ──────────────────────────────────────
function SkillCard({
  icon: Icon, title, desc, delay, accentLight, accentDark,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
  accentLight: string;
  accentDark: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ x: -3 }}
      className="flex items-start gap-3 p-3.5 rounded-xl cursor-default transition-colors
        border border-zinc-200 bg-zinc-50 hover:bg-zinc-100
        dark:border-white/6 dark:bg-transparent dark:hover:bg-white/4"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 skill-icon-wrap"
        style={
          {
            '--accent-light': accentLight,
            '--accent-dark': accentDark,
          } as React.CSSProperties
        }
      >
        <Icon size={15} strokeWidth={1.8} className="skill-icon" />
      </div>
      <div>
        <p className="text-zinc-900 dark:text-white text-sm font-semibold leading-tight mb-0.5">{title}</p>
        <p className="text-zinc-500 dark:text-zinc-500 text-xs leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

const socialLinks = [
  { icon: Github,    href: personalInfo.social.github,    label: 'GitHub'    },
  { icon: Linkedin,  href: personalInfo.social.linkedin,  label: 'LinkedIn'  },
  { icon: Instagram, href: personalInfo.social.instagram, label: 'Instagram' },
  { icon: Mail,      href: personalInfo.social.email,     label: 'Email'     },
];

const techStack = [
  { name: 'React',      lightColor: '#0ea5e9', darkColor: '#61DAFB' },
  { name: 'TypeScript', lightColor: '#2563eb', darkColor: '#3178C6' },
  { name: 'Next.js',    lightColor: '#18181b', darkColor: '#FFFFFF' },
  { name: 'TailwindCSS',   lightColor: '#0284c7', darkColor: '#38BDF8' },
];

const skillCards = [
  { icon: Code2,  title: 'Frontend Dev',    desc: 'React, TypeScript, modern CSS — pixel-perfect UIs.', delay: 1.0, accentLight: '#7c3aed', accentDark: '#6B3FFF' },
  { icon: Database, title: 'Database & APIs',desc: 'Postgres, Supabase, REST & Edge Functions.',            delay: 1.1, accentLight: '#16a34a', accentDark: '#C8FF57' },
  { icon: Cpu,    title: 'CS Fundamentals',  desc: 'Algorithms, data structures, system design.',         delay: 1.2, accentLight: '#0284c7', accentDark: '#61DAFB' },
  { icon: Globe,  title: 'Open Source',      desc: 'Active contributor, collaborative builder.',          delay: 1.3, accentLight: '#d97706', accentDark: '#FFD166' },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const typedText = useTypingEffect(personalInfo.taglines, 75, 35, 2000);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-white dark:bg-[#0A0A0F]"
    >
      {/* Scoped styles for theme-aware tech pills and skill icons */}
      <style>{`
        .tech-pill {
          background: color-mix(in srgb, var(--pill-color-light) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--pill-color-light) 25%, transparent);
          color: var(--pill-color-light);
        }
        .dark .tech-pill {
          background: color-mix(in srgb, var(--pill-color-dark) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--pill-color-dark) 22%, transparent);
          color: var(--pill-color-dark);
        }
        .skill-icon-wrap {
          background: color-mix(in srgb, var(--accent-light) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent-light) 20%, transparent);
        }
        .dark .skill-icon-wrap {
          background: color-mix(in srgb, var(--accent-dark) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent-dark) 18%, transparent);
        }
        .skill-icon {
          color: var(--accent-light);
        }
        .dark .skill-icon {
          color: var(--accent-dark);
        }
      `}</style>

      <NoiseOverlay />

      {/* Background gradient pools */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Light mode: soft lavender + lime pools */}
        <div className="dark:hidden" style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '-15%', right: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 65%)',
        }} />
        {/* Dark mode: indigo + lime pools */}
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,63,255,0.13) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '0%', right: '5%',
          width: 500, height:500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,87,0.07) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '40%', right: '30%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97,218,251,0.05) 0%, transparent 65%)',
        }} />
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 pt-12 pb-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <motion.div variants={container} initial="hidden" animate="show" className='mt-10'>

            {/* Eyebrow */}
            <motion.div variants={item} className="mb-7">
              <LabeledRule label={`Informatics Student · ${personalInfo.location}`} />
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-black leading-[0.87] tracking-tighter mb-6 text-zinc-900 dark:text-white"
              style={{ fontSize: 'clamp(4rem, 7vw, 5rem)', fontFamily: "'Space Grotesk','Inter',sans-serif" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                  className="block"
                >
                  {personalInfo.name.split(' ')[0]}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.68 }}
                  className="block"
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed 0%, #16a34a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {personalInfo.name.split(' ')[1]}
                </motion.span>
              </span>
            </motion.h1>

            {/* Typing tagline */}
            <motion.div variants={item} className="h-8 flex items-center mb-5">
              <span className="font-mono text-sm sm:text-base tracking-wide text-[#71a801] dark:text-[#C8FF57]">
                ~/&gt; {typedText}
                <span className="inline-block w-0.5 h-4 ml-1 align-middle animate-pulse bg-violet-600 dark:bg-[#C8FF57]" />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-sm sm:text-base leading-relaxed mb-8 max-w-md text-zinc-500 dark:text-zinc-400"
            >
              Undergraduate Informatics Engineering student at{' '}
              <span className="font-semibold text-yellow-600 dark:text-yellow-500">Sriwijaya University</span>
              {' '}.  Passionate about building impactful, human-centered software.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={item}
              className="flex items-center gap-8 mb-8 pb-8 border-b border-zinc-200 dark:border-white/6"
            >
              <StatChip value="5+" label="Projects Built" />
              <div className="w-px h-8 bg-zinc-200 dark:bg-white/8" />
              <StatChip value="100%" label="Clean Code Mindset" />
              <div className="w-px h-8 bg-zinc-200 dark:bg-white/8" />
              <StatChip value="∞" label="Curiosity" />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm
                  bg-[#71a801] text-white hover:bg-[#5e8d01]
                  dark:bg-[#C8FF57] dark:text-[#0A0A0F] dark:hover:bg-[#d4ff6e]
                  transition-colors"
              >
                View My Work
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </motion.a>

              <motion.a
                href={personalInfo.resume}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-colors
                  border border-zinc-200 bg-zinc-100 text-zinc-900 hover:border-violet-400 hover:text-violet-700
                  dark:border-white/10 dark:bg-transparent dark:hover:bg-[#70a80116] dark:text-[#71a801] dark:hover:border-[#71a801]"
              >
                <Download size={14} strokeWidth={1.8} />
                Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon, href, label }) => (
                <SocialPill key={label} icon={icon} href={href} label={label} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — visual panel ── */}
          <div className="hidden lg:flex flex-col gap-5">

            {/* Card: tech_stack.json */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="rounded-2xl p-6
                bg-zinc-50 border border-zinc-200
                dark:bg-transparent dark:hover:bg-white/4 dark:border-white/8 dark:backdrop-blur-sm"
            >
              {/* macOS-style header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest">
                  tech_stack.json
                </span>
              </div>

              {/* Pseudo JSON */}
              <div className="font-mono text-xs mb-5 leading-relaxed">
                <span className="text-violet-500 dark:text-[#6B3FFF]">{'{'}</span>
                <br />
                <span className="pl-4">
                  <span className="text-amber-600 dark:text-[#C8FF57]">"role"</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-sky-600 dark:text-[#61DAFB]">"Fullstack Developer"</span>
                  <span className="text-zinc-400">,</span>
                </span>
                <br />
                <span className="pl-4">
                  <span className="text-amber-600 dark:text-[#C8FF57]">"university"</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-sky-600 dark:text-[#61DAFB]">"Sriwijaya University"</span>
                  <span className="text-zinc-400">,</span>
                </span>
                <br />
                <span className="pl-4">
                  <span className="text-amber-600 dark:text-[#C8FF57]">"status"</span>
                  <span className="text-zinc-400">: </span>
                  <span className="text-emerald-600 dark:text-emerald-400">"open_for_freelance"</span>
                </span>
                <br />
                <span className="text-violet-500 dark:text-[#6B3FFF]">{'}'}</span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {techStack.map(({ name, lightColor, darkColor }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.06, duration: 0.4 }}
                  >
                    <TechPill name={name} lightColor={lightColor} darkColor={darkColor} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skill cards 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {skillCards.map((card) => (
                <SkillCard key={card.title} {...card} />
              ))}
            </div>

            {/* Currently learning strip */}
            {/* <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                bg-violet-50 border border-violet-200
                dark:bg-transparent dark:border-violet-500/18"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 rounded-full flex-shrink-0
                  border-[1.5px] border-violet-300 border-t-violet-600
                  dark:border-violet-500/60 dark:border-t-[#C8FF57]"
              />
              <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                Currently exploring:{' '}
                <span className="text-violet-600 dark:text-[#C8FF57]">
                  AI/ML integration · System Design · Cloud Arch
                </span>
              </span>
            </motion.div> */}
          </div>

        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-300 dark:to-white/15" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-600">
            scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}