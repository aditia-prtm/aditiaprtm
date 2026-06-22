import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Instagram, Dribbble, ArrowDown, Download} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useTypingEffect } from '../hooks/useTypingEffect';

// ─── Animated grid background ────────────────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      {/* Radial fade */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/80 dark:to-zinc-950/90" />
      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="glow-orb absolute top-1/4 left-1/4 w-96 h-96 dark:bg-violet-600/20 bg-violet-400/10"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="glow-orb absolute top-1/3 right-1/4 w-80 h-80 dark:bg-cyan-600/15 bg-cyan-400/10"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="glow-orb absolute bottom-1/3 left-1/3 w-64 h-64 dark:bg-blue-600/15 bg-blue-400/10"
      />
    </div>
  );
}

// ─── Floating code badge ──────────────────────────────────────────
function FloatingBadge({ text, className, delay }: { text: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`absolute hidden lg:block font-mono text-xs px-3 py-1.5 rounded-full dark:bg-white/6 bg-black/5 dark:border-white/10 border-black/8 border dark:text-violet-300 text-violet-600 backdrop-blur-sm ${className}`}
    >
      {text}
    </motion.div>
  );
}

const socialLinks = [
  { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: personalInfo.social.instagram, label: 'Twitter' },
  { icon: Dribbble, href: personalInfo.social.dribbble, label: 'Dribbble' },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const typedText = useTypingEffect(personalInfo.taglines, 75, 35, 2000);

  // Parallax
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <GridBackground />

      {/* Floating code badges */}
      <FloatingBadge text="React.js ⚛️" className="top-32 left-12" delay={1.2} />
      <FloatingBadge text="TypeScript 🔷" className="top-48 right-16" delay={1.4} />
      <FloatingBadge text="const dev = true;" className="bottom-48 left-16" delay={1.6} />
      <FloatingBadge text="{ open: 'source' }" className="bottom-56 right-12" delay={1.8} />

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-6 sm:pt-12"
      >
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Status badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-emerald-500/10 bg-emerald-50 dark:border-emerald-500/20 border-emerald-200 border text-emerald-500 dark:text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {personalInfo.availability}
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none"
          >
            <span className="dark:text-white text-gray-900">{personalInfo.name.split(' ')[0]} </span>
            <span className="gradient-text">{personalInfo.name.split(' ')[1]}</span>
          </motion.h1>

          {/* Typing effect tagline */}
          <motion.div variants={item} className="h-10 flex items-center justify-center mb-6 md:mb-10">
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold dark:text-gray-300 text-gray-600">
              {typedText}
              <span className="typing-cursor" />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-sm sm:text-lg dark:text-gray-400 text-gray-500 leading-relaxed mb-6"
          >
            Building elegant, high-performance digital experiences at the intersection of
            engineering rigour and design craft.{' '}
            <span className="dark:text-gray-300 text-gray-600 font-medium">6+ years in production.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-5 mb-12">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group relative px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <motion.a
              href={personalInfo.resume}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold dark:text-white text-gray-900 dark:bg-white/8 bg-black/6 dark:border-white/10 border-black/10 border hover:dark:bg-white/12 hover:bg-black/10 transition-colors"
            >
              <Download size={16} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center justify-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.93 }}
                className="w-11 h-11 flex items-center justify-center rounded-xl dark:bg-white/6 bg-black/5 dark:border-white/8 border-black/8 border dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:bg-white/12 hover:bg-black/10 transition-colors"
                aria-label={label}
              >
                <Icon size={18} strokeWidth={1.8} />
              </motion.a>
            ))}

            <div className="w-px h-6 dark:bg-white/10 bg-black/10 mx-1" />

            <span className="text-xs dark:text-gray-500 text-gray-400 font-mono">
              {personalInfo.location}
            </span>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs dark:text-gray-600 text-gray-400 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="dark:text-gray-600 text-gray-400"
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
