// About.tsx — upgraded to match Hero.tsx design system

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, Coffee, Brain, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

// ─── Noise overlay (mirror dari Hero) ─────────────────────────────
function NoiseOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.035] pointer-events-none z-0"
      aria-hidden
    >
      <filter id="noise-about">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-about)" />
    </svg>
  );
}

// ─── Labeled rule (identik dengan Hero) ───────────────────────────
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

// ─── Stat chip (mirror StatChip dari Hero) ────────────────────────
function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center
      border border-zinc-200 bg-zinc-50
      dark:border-white/8 dark:bg-transparent">
      <Icon
        size={15}
        strokeWidth={1.7}
        className="text-violet-500 dark:text-violet-400"
      />
      <span className="text-2xl font-black leading-none tracking-tight text-[#71a801] dark:text-[#C8FF57]">
        {value}
      </span>
      <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-500 tracking-widest uppercase leading-tight">
        {label}
      </span>
    </div>
  );
}

// ─── Fun fact pill ────────────────────────────────────────────────
function FunFactPill({
  fact,
  delay,
  isInView,
}: {
  fact: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 3 }}
      className="flex items-center gap-2 text-sm px-3.5 py-2.5 rounded-xl cursor-default
        border border-zinc-200 bg-zinc-50 text-zinc-600
        dark:border-white/8 dark:bg-transparent dark:text-zinc-400
        hover:border-violet-300 dark:hover:border-[#71a801]/40
        transition-colors duration-200"
    >
      {fact}
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-10%' });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-white dark:bg-[#0A0A0F]"
    >
      <NoiseOverlay />

      {/* Background gradient pools */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', top: '10%', left: '-12%',
          width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '0%', right: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '0%', left: '-12%',
          width: 620, height: 620, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,63,255,0.11) 0%, transparent 65%)',
        }} />
        {/* <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,87,0.06) 0%, transparent 65%)',
        }} /> */}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-18"
        >
          <div className="mb-6">
            <LabeledRule label="01 · about" />
          </div>
          <h2
            className="font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
              fontFamily: "'Space Grotesk','Inter',sans-serif",
            }}
          >
            The person behind{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #7c3aed 0%, #16a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the code
            </span>
          </h2>
        </motion.div>

        {/* ── Two-column layout ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >

          {/* ── LEFT — avatar + stats ── */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start gap-8">

            {/* Avatar — wrapped in macOS-style card */}
            <div className="w-full rounded-2xl p-6
              bg-zinc-50 border border-zinc-200
              dark:bg-transparent dark:border-white/8 dark:backdrop-blur-sm"
            >
              {/* macOS dots */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
                <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500/70" />
                <span className="ml-auto font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest">
                  about_me.jpg
                </span>
              </div>

              {/* Avatar area */}
              <div className="relative flex justify-center group">
                {/* Gradient ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500 to-[#C8FF57] opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden
                  bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src="/nigga.png"
                    alt="Nigga's picture"
                    className="w-full h-full object-cover bg-transparent"
                  />
                </div>

                {/* Floating badge — bottom right */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-2 flex items-center gap-2
                    px-3.5 py-2 rounded-xl text-xs font-semibold
                    border border-zinc-200 bg-white text-zinc-700
                    dark:border-white/10 dark:bg-[#0A0A0F] dark:text-zinc-300
                    shadow-lg dark:shadow-black/40"
                >
                  <span>🥲</span>
                  <span className="font-mono text-[10px]">no more pics</span>
                </motion.div>

                {/* Floating badge — top left */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute -top-4 -left-2 flex items-center gap-2
                    px-3.5 py-2 rounded-xl text-xs font-semibold
                    border border-zinc-200 bg-white text-zinc-700
                    dark:border-white/10 dark:bg-[#0A0A0F] dark:text-zinc-300
                    shadow-lg dark:shadow-black/40"
                >
                  <span>✌️</span>
                  <span className="font-mono text-[10px]">this is me</span>
                  <span>🥀</span>
                </motion.div>
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-3 gap-3 w-full">
              <StatCard value="2"  label="Projects shipped"    icon={Coffee}   />
              <StatCard value="4"  label="Months in webdev"   icon={Calendar} />
              <StatCard value="∞"  label="Curiosity"          icon={Brain}    />
            </div>
          </motion.div>

          {/* ── RIGHT — bio text ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-7">

            {/* Bio paragraphs */}
            <div className="space-y-4">
              <p className="text-base lg:text-[1.05rem] leading-relaxed text-zinc-600 dark:text-zinc-300">
                {personalInfo.bio}
              </p>
              <p className="text-base lg:text-[1.05rem] leading-relaxed text-zinc-500 dark:text-zinc-400">
                {personalInfo.bio2}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-zinc-200 dark:bg-white/6" />

            {/* Fun facts */}
            <div>
              <LabeledRule label="fun facts" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {personalInfo.funFacts.map((fact: string, i: number) => (
                  <FunFactPill
                    key={i}
                    fact={fact}
                    isInView={isInView}
                    delay={0.35 + i * 0.09}
                  />
                ))}
              </div>
            </div>

            {/* Location & availability row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin size={13} strokeWidth={1.7} className="text-violet-500 dark:text-violet-400 flex-shrink-0" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse flex-shrink-0" />
                {personalInfo.availability}
              </div>
            </div>

            {/* CTA — mirroring Hero's primary button style */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm
                  bg-[#71a801] text-white hover:bg-[#5e8d01]
                  dark:bg-[#C8FF57] dark:text-[#0A0A0F] dark:hover:bg-[#d4ff6e]
                  transition-colors"
              >
                Say hello
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-colors
                  border border-zinc-200 bg-zinc-100 text-zinc-900 hover:border-violet-400 hover:text-violet-700
                  dark:border-white/10 dark:bg-transparent dark:hover:bg-[#70a80116] dark:text-[#71a801] dark:hover:border-[#71a801]"
              >
                View projects
              </motion.a>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}