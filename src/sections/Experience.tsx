import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, TrendingUp, Award, MapPin } from 'lucide-react';
import { experiences } from '../data/portfolio';

// ─── Labeled rule (identik dengan eyebrow di Hero) ────────────────
function LabeledRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-8 h-px bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0" />
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-[#888]">
        {label}
      </span>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-[#1f1f1f]" />
    </div>
  );
}

// ─── Right panel: stat card (mirrors Hero's Stat) ─────────────────
function StatCard({
  icon: Icon,
  value,
  label,
  delay,
  isInView,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3 p-5 cursor-default transition-colors
        border border-zinc-200 bg-zinc-50 hover:border-[#b8860b]/40
        dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:hover:border-[#d4af37]/30"
    >
      <Icon size={15} strokeWidth={1.6} className="text-[#b8860b] dark:text-[#d4af37]" />
      <div>
        <p
          className="font-black text-2xl leading-none tracking-tight text-zinc-900 dark:text-[#f0ede6] mb-1.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {value}
        </p>
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-zinc-500 dark:text-[#777]">
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
      className="flex items-start gap-3.5 p-4 cursor-default transition-colors
        border border-zinc-200 bg-zinc-50 hover:border-[#b8860b]/40
        dark:border-[#1f1f1f] dark:bg-transparent dark:hover:border-[#d4af37]/30 dark:hover:bg-[#0e0e0e]"
    >
      <div
        className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5
          border border-[#b8860b]/25 bg-[#b8860b]/8
          dark:border-[#d4af37]/25 dark:bg-[#d4af37]/8"
      >
        <Briefcase size={13} strokeWidth={1.8} className="text-[#b8860b] dark:text-[#d4af37]" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-zinc-900 dark:text-[#f0ede6] leading-tight truncate">
          {exp.role}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs font-semibold text-[#b8860b] dark:text-[#d4af37]">
            {exp.company}
          </span>
          <span className="text-zinc-300 dark:text-[#333] text-xs">·</span>
          <span className="font-mono text-[9px] text-zinc-400 dark:text-[#666] uppercase tracking-wide">
            {exp.period.split(' ')[0]}
          </span>
        </div>
        {/* Top highlight bullet */}
        {exp.highlights?.[0] && (
          <div className="flex items-start gap-1.5 mt-2">
            <ChevronRight size={11} strokeWidth={2.2} className="flex-shrink-0 mt-0.5 text-[#b8860b] dark:text-[#d4af37]" />
            <p className="text-[11px] text-zinc-500 dark:text-[#888] leading-relaxed line-clamp-2">
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
          className="relative z-10 w-9 h-9 flex items-center justify-center flex-shrink-0
            border border-zinc-200 bg-white
            dark:border-[#1f1f1f] dark:bg-[#080808]"
          style={{ boxShadow: '0 0 0 3px rgba(184,134,11,0.1)' }}
        >
          <Briefcase size={14} strokeWidth={1.7} className="text-[#b8860b] dark:text-[#d4af37]" />
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.13 + 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="flex-1 w-px mt-2 bg-zinc-200 dark:bg-[#1f1f1f]"
          />
        )}
      </div>

      {/* ── Content card ── */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
        <motion.div
          whileHover={{ x: 3 }}
          transition={{ duration: 0.25 }}
          className="relative p-5 cursor-default transition-colors duration-200
            border border-zinc-200 bg-zinc-50 hover:border-[#b8860b]/40
            dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:hover:border-[#d4af37]/30 dark:hover:bg-[#0e0e0e]"
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-5 right-5 h-px opacity-70"
            style={{ background: 'linear-gradient(90deg, #b8860b, transparent)' }}
          />

          {/* Role + company */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3
                className="font-black tracking-[-0.01em] text-zinc-900 dark:text-[#f0ede6] leading-tight"
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Briefcase size={11} strokeWidth={1.7} className="text-[#b8860b] dark:text-[#d4af37]" />
                <span className="text-sm font-semibold text-[#b8860b] dark:text-[#d4af37]">
                  {exp.company}
                </span>
                {exp.type && (
                  <>
                    <span className="text-zinc-300 dark:text-[#333]">·</span>
                    <span className="font-mono text-[9px] tracking-wide text-zinc-400 dark:text-[#666] uppercase">
                      {exp.type}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Period badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 self-start
              border border-zinc-200 bg-white
              dark:border-[#1f1f1f] dark:bg-transparent"
            >
              <Calendar size={11} strokeWidth={1.7} className="text-zinc-400 dark:text-[#666]" />
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 dark:text-[#888] whitespace-nowrap">
                {exp.period}
              </span>
            </div>
          </div>

          <div className="h-px bg-zinc-200 dark:bg-[#1f1f1f] mb-4" />

          <p className="text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] mb-4">
            {exp.description}
          </p>

          <div className="flex flex-col gap-1.5">
            {exp.highlights.map((h: string) => (
              <div key={h} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-[#8a8a8a]">
                <ChevronRight size={12} strokeWidth={2.2} className="flex-shrink-0 mt-0.5 text-[#b8860b] dark:text-[#d4af37]" />
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
  const totalYears      = experiences.length > 0 ? `${experiences.length}+` : '—';
  const totalRoles      = `${experiences.length}`;
  const totalHighlights = experiences.reduce((acc: number, e) => acc + (e.highlights?.length ?? 0), 0);
  const uniqueTypes     = [...new Set(experiences.map((e) => e.type))].length;

  const stats = [
    { icon: TrendingUp, value: totalYears,            label: 'Experiences'  },
    { icon: Briefcase,  value: totalRoles,            label: 'Roles held'   },
    { icon: Award,      value: `${totalHighlights}+`, label: 'Achievements' },
    { icon: MapPin,     value: `${uniqueTypes}`,      label: 'Work types'   },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@300;400&display=swap');

        .experience-grid-bg {
          background-image:
            linear-gradient(to right, #00000008 1px, transparent 1px),
            linear-gradient(to bottom, #00000008 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .dark .experience-grid-bg {
          background-image:
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .experience-gold-text {
          background: linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #9a7209 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dark .experience-gold-text {
          background: linear-gradient(135deg, #d4af37 0%, #f5e177 50%, #c9a227 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background grid — same rhythm as Hero */}
      <div className="absolute inset-0 experience-grid-bg pointer-events-none" />

      {/* Background gradient pools — warm gold, mirrors Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '5%', left: '-8%',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', top: '10%', right: '-5%',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.03) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '0%', left: '-10%',
          width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '5%', right: '-8%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)',
        }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-18"
        >
          <div className="mb-8">
            <LabeledRule label="03 · Experience" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="font-black leading-[0.9] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              The <span className="experience-gold-text">journey</span> so far
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] sm:text-right"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
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
              <LabeledRule label="Career snapshot" />
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
              className="flex items-center gap-3 px-4 py-3
                bg-[#b8860b]/[0.05] border border-[#b8860b]/20
                dark:bg-[#d4af37]/[0.04] dark:border-[#d4af37]/18"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full flex-shrink-0
                  border-[1.5px] border-[#b8860b]/30 border-t-[#b8860b]
                  dark:border-[#d4af37]/30 dark:border-t-[#d4af37]"
              />
              <span className="font-mono text-[10px] leading-relaxed text-zinc-500 dark:text-[#8a8a8a]">
                Open to:{' '}
                <span className="text-[#b8860b] dark:text-[#d4af37]">
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