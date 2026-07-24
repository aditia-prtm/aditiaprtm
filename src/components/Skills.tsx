import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { techStack, tools } from '../data/portfolio';
import { IconType } from 'react-icons';

// ─── Noise overlay (mirror dari Hero) ─────────────────────────────
function NoiseOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.035] pointer-events-none z-0"
      aria-hidden
    >
      <filter id="noise-skills">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-skills)" />
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

// ─── Tech stack card ──────────────────────────────────────────────
function TechStackCard({
  label,
  icon: Icon,
  isInView,
  delay,
  index,
}: {
  label: string;
  icon: IconType;
  isInView: boolean;
  delay: number;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  // Cycling accent colors — matching Hero's palette
  const accentsDark  = ['#C8FF57', '#6B3FFF', '#61DAFB', '#C8FF57', '#FFD166', '#6B3FFF', '#61DAFB'];
  const accentsLight = ['#71a801', '#7c3aed', '#0284c7', '#71a801', '#d97706', '#7c3aed', '#0284c7'];
  const accent       = accentsLight[index % accentsLight.length];
  const accentDark   = accentsDark[index % accentsDark.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default
        border border-zinc-200 bg-zinc-50
        dark:border-white/8 dark:bg-transparent
        transition-colors duration-300 group
        hover:border-zinc-300 dark:hover:border-white/14 dark:hover:bg-white/[0.03]"
      style={
        {
          '--accent-light': accent,
          '--accent-dark': accentDark,
        } as React.CSSProperties
      }
    >
      {/* Subtle glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-2xl pointer-events-none skills-glow"
      />

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.12 } : { scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-10 h-10 flex items-center justify-center flex-shrink-0 skills-icon-wrap"
      >
        <Icon size={36} className="skills-icon" />
      </motion.div>

      {/* Label — selalu visible, fade in on animate */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.15 }}
        className="font-mono text-[10px] tracking-widest uppercase text-center
          text-zinc-500 dark:text-zinc-500
          group-hover:text-zinc-800 dark:group-hover:text-zinc-300
          transition-colors duration-200 leading-tight"
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

// ─── Tool badge ───────────────────────────────────────────────────
function ToolBadge({ name, delay, isInView }: { name: string; delay: number; isInView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, scale: 1.04 }}
      className="px-3.5 py-1.5 text-[11px] font-mono cursor-default
        border border-zinc-200 bg-zinc-100 text-zinc-500
        hover:border-violet-400/60 hover:text-violet-700 hover:bg-violet-50
        dark:border-white/8 dark:bg-transparent dark:text-zinc-400
        dark:hover:border-[#71a801] dark:hover:text-[#C8FF57] dark:hover:bg-[#70a80118]
        rounded-xl transition-colors duration-200 tracking-wide"
    >
      {name}
    </motion.span>
  );
}

// ─── Main component ────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-8%' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-white dark:bg-[#0A0A0F]"
    >
      {/* Scoped styles — mirror Hero's icon theming */}
      <style>{`
        .skills-glow {
          background: radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-light) 6%, transparent) 0%, transparent 70%);
        }
        .dark .skills-glow {
          background: radial-gradient(ellipse at center, color-mix(in srgb, var(--accent-dark) 8%, transparent) 0%, transparent 70%);
        }
        .skills-icon {
          color: inherit;
          transition: color 0.2s;
        }
        .group:hover .skills-icon {
          color: var(--accent-light);
        }
        .dark .group:hover .skills-icon {
          color: var(--accent-dark);
        }
      `}</style>

      <NoiseOverlay />

      {/* Background gradient pools — identical rhythm to Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', top: '10%', right: '-8%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '5%', right: '-10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,63,255,0.1) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '0%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,87,0.06) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '50%', left: '40%',
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97,218,251,0.04) 0%, transparent 65%)',
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[1400px] mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-14 lg:mb-18"
        >
          {/* Eyebrow — LabeledRule style */}
          <div className="mb-6">
            <LabeledRule label="02 · skills" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2
              className="font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Space Grotesk','Inter',sans-serif",
              }}
            >
              Tech{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #7c3aed 0%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                stack
              </span>
              {' '}&amp; tooling
            </h2>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-right">
              Tools I reach for daily alongside stacks I'm actively exploring — a living snapshot of my craft.
            </p>
          </div>
        </motion.div>

        {/* ── Tech stack grid — macOS-card wrapper ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl p-6 mb-8
            bg-zinc-50 border border-zinc-200
            dark:bg-transparent dark:border-white/8 dark:backdrop-blur-sm"
        >
          {/* macOS-style header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500/70" />
            </div>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest">
              skills_map.json
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {techStack.map((cat, i) => (
              <TechStackCard
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                isInView={isInView}
                delay={0.25 + i * 0.07}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Tools / extra badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full"
        >
          {/* Sub-label */}
          <div className="mb-5">
            <LabeledRule label="also in my toolkit" />
          </div>

          <div className="flex flex-wrap gap-2">
            {tools.map((tech, i) => (
              <ToolBadge
                key={tech}
                name={tech}
                isInView={isInView}
                delay={0.55 + i * 0.04}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}