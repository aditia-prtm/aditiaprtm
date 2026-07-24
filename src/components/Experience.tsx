import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, TrendingUp, Award, MapPin } from 'lucide-react';
import { experiences } from '../data/portfolio';

// ─── Noise overlay ────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.035] pointer-events-none z-0"
      aria-hidden
    >
      <filter id="noise-exp">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-exp)" />
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

// ─── Right panel: stat card ───────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  label,
  accent,
  delay,
  isInView,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  accent: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="flex flex-col gap-3 p-5 rounded-2xl cursor-default transition-colors
        border border-zinc-200 bg-zinc-50 hover:border-zinc-300
        dark:border-white/8 dark:bg-white/[0.02] dark:hover:border-white/14 dark:hover:bg-white/[0.04]"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{
          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
        }}
      >
        <Icon size={16} strokeWidth={1.7} style={{ color: accent }} />
      </div>
      <div>
        <p className="font-black text-2xl leading-none tracking-tight text-zinc-900 dark:text-white mb-1">
          {value}
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 dark:text-zinc-500">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Right panel: career highlight card ──────────────────────────
function HighlightCard({
  exp,
  delay,
  isInView,
}: {
  exp: (typeof experiences)[0];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: -3 }}
      className="flex items-start gap-3.5 p-4 rounded-xl cursor-default transition-colors
        border border-zinc-200 bg-zinc-50 hover:border-zinc-300
        dark:border-white/6 dark:bg-transparent dark:hover:border-white/12 dark:hover:bg-white/[0.02]"
    >
      {/* Color dot */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: `color-mix(in srgb, ${exp.color} 14%, transparent)`,
          border: `1px solid color-mix(in srgb, ${exp.color} 24%, transparent)`,
        }}
      >
        <Briefcase size={13} strokeWidth={1.8} style={{ color: exp.color }} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-zinc-900 dark:text-white leading-tight truncate">
          {exp.role}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs font-semibold" style={{ color: exp.color }}>
            {exp.company}
          </span>
          <span className="text-zinc-300 dark:text-white/15 text-xs">·</span>
          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
            {exp.period.split(' ')[0]}
          </span>
        </div>
        {/* Top highlight bullet */}
        {exp.highlights?.[0] && (
          <div className="flex items-start gap-1.5 mt-2">
            <ChevronRight size={11} strokeWidth={2.2} className="flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
              {exp.highlights[0]}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Timeline item ────────────────────────────────────────────────
function TimelineItem({
  exp,
  index,
  isInView,
  isLast,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isInView: boolean;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5"
    >
      {/* ── Dot + line ── */}
      <div className="flex flex-col items-center flex-shrink-0 w-9">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.13 + 0.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
            border border-zinc-200 bg-white
            dark:border-white/10 dark:bg-[#0A0A0F]"
          style={{ boxShadow: `0 0 0 3px color-mix(in srgb, ${exp.color} 18%, transparent)` }}
        >
          <Briefcase size={14} strokeWidth={1.7} style={{ color: exp.color }} />
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.13 + 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="flex-1 w-px mt-2 bg-zinc-200 dark:bg-white/8"
          />
        )}
      </div>

      {/* ── Content card ── */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ duration: 0.25 }}
          className="relative p-5 rounded-2xl cursor-default transition-colors duration-200
            border border-zinc-200 bg-zinc-50 hover:border-zinc-300
            dark:border-white/8 dark:bg-transparent dark:hover:border-white/14 dark:hover:bg-white/[0.02]"
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-5 right-5 h-px rounded-full opacity-60"
            style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
          />

          {/* Role + company */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3
                className="font-black tracking-tight text-zinc-900 dark:text-white leading-tight"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                  fontFamily: "'Space Grotesk','Inter',sans-serif",
                }}
              >
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Briefcase size={11} strokeWidth={1.7} style={{ color: exp.color }} />
                <span className="text-sm font-semibold" style={{ color: exp.color }}>
                  {exp.company}
                </span>
                {exp.type && (
                  <>
                    <span className="text-zinc-300 dark:text-white/15">·</span>
                    <span className="font-mono text-[10px] tracking-wide text-zinc-400 dark:text-zinc-500 uppercase">
                      {exp.type}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Period badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-lg self-start
              border border-zinc-200 bg-white
              dark:border-white/8 dark:bg-transparent"
            >
              <Calendar size={11} strokeWidth={1.7} className="text-zinc-400 dark:text-zinc-500" />
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                {exp.period}
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-white/6 mb-4" />

          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-4">
            {exp.description}
          </p>

          <div className="flex flex-col gap-1.5">
            {exp.highlights.map((h: string) => (
              <div key={h} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <ChevronRight size={12} strokeWidth={2.2} className="flex-shrink-0 mt-0.5" style={{ color: exp.color }} />
                {h}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-5%' });

  // Derived stats from experiences data
  const totalYears   = experiences.length > 0 ? `${experiences.length}+` : '—';
  const totalRoles   = `${experiences.length}`;
  const totalHighlights = experiences.reduce((acc: number, e) => acc + (e.highlights?.length ?? 0), 0);
  const uniqueTypes  = [...new Set(experiences.map((e) => e.type))].length;

  const stats = [
    { icon: TrendingUp, value: totalYears,              label: 'Experiences',   accent: '#7c3aed', darkAccent: '#6B3FFF' },
    { icon: Briefcase,  value: totalRoles,              label: 'Roles held',    accent: '#16a34a', darkAccent: '#C8FF57' },
    { icon: Award,      value: `${totalHighlights}+`,   label: 'Achievements',  accent: '#0284c7', darkAccent: '#61DAFB' },
    { icon: MapPin,     value: `${uniqueTypes}`,         label: 'Work types',    accent: '#d97706', darkAccent: '#FFD166' },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-white dark:bg-[#0A0A0F]"
    >
      <NoiseOverlay />

      {/* Background gradient pools */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '5%', left: '-8%',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', top: '10%', right: '-5%',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '0%', left: '-10%',
          width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,63,255,0.1) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '5%', right: '-8%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,87,0.06) 0%, transparent 65%)',
        }} />
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
            <LabeledRule label="04 · experience" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2
              className="font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Space Grotesk','Inter',sans-serif",
              }}
            >
              The{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #7c3aed 0%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                journey
              </span>
              {' '}so far
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-right">
              Places where I've grown, learned with awesome people, and built cool stuff.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Timeline ── */}
          <div>
            {experiences.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                index={i}
                isInView={isInView}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <div className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-28">

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <StatCard
                  key={s.label}
                  icon={s.icon}
                  value={s.value}
                  label={s.label}
                  accent={s.accent}
                  delay={0.3 + i * 0.1}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Divider label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
            >
              <LabeledRule label="career snapshot" />
            </motion.div>

            {/* Highlight cards — one per experience */}
            <div className="flex flex-col gap-3">
              {experiences.map((exp, i) => (
                <HighlightCard
                  key={exp.id}
                  exp={exp}
                  delay={0.55 + i * 0.12}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Currently open strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                bg-violet-50 border border-violet-200
                dark:bg-white/[0.02] dark:border-violet-500/18"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full flex-shrink-0
                  border-[1.5px] border-violet-300 border-t-violet-600
                  dark:border-violet-500/60 dark:border-t-[#C8FF57]"
              />
              <span className="font-mono text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                Open to:{' '}
                <span className="text-violet-600 dark:text-[#C8FF57]">
                  Internships · Freelance · Collab
                </span>
              </span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}