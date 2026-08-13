import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { techStack, tools } from '../data/portfolio';
import { IconType } from 'react-icons';

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

// ─── Tech stack card ──────────────────────────────────────────────
function TechStackCard({
  label,
  icon: Icon,
  isInView,
  delay,
}: {
  label: string;
  icon: IconType;
  isInView: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      className="relative flex flex-col items-center gap-3 p-4 cursor-default
        border border-zinc-200 bg-white
        dark:border-[#1f1f1f] dark:bg-[#0a0a0a]
        transition-colors duration-300 group
        hover:border-[#b8860b]/50 dark:hover:border-[#d4af37]/40 dark:hover:bg-[#0e0e0e]"
    >
      {/* Subtle gold glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(184,134,11,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.12 } : { scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
      >
        <Icon
          size={32}
          className="transition-colors duration-200 text-zinc-400 dark:text-[#555] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37]"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.15 }}
        className="font-mono text-[9px] tracking-[0.14em] uppercase text-center leading-tight
          text-zinc-500 dark:text-[#666]
          group-hover:text-zinc-800 dark:group-hover:text-[#ccc]
          transition-colors duration-200"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
      whileHover={{ y: -2 }}
      className="px-3.5 py-1.5 text-[10px] cursor-default
        border border-zinc-200 bg-zinc-50 text-zinc-500
        hover:border-[#b8860b]/50 hover:text-[#b8860b] hover:bg-[#b8860b]/[0.04]
        dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#666]
        dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37] dark:hover:bg-[#d4af37]/[0.06]
        transition-colors duration-200 tracking-[0.08em] uppercase"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@300;400&display=swap');

        .skills-grid-bg {
          background-image:
            linear-gradient(to right, #00000008 1px, transparent 1px),
            linear-gradient(to bottom, #00000008 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .dark .skills-grid-bg {
          background-image:
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .skills-gold-text {
          background: linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #9a7209 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dark .skills-gold-text {
          background: linear-gradient(135deg, #d4af37 0%, #f5e177 50%, #c9a227 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background grid — same rhythm as Hero */}
      <div className="absolute inset-0 skills-grid-bg pointer-events-none" />

      {/* Background gradient pools — warm gold, mirrors Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', top: '8%', right: '-8%',
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 70%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '0%', left: '-6%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.03) 0%, transparent 70%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '5%', right: '-10%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '0%', left: '-6%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[1300px] mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-14 lg:mb-18"
        >
          <div className="mb-8">
            <LabeledRule label="01 · Skills" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="font-black leading-[0.9] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Tech <span className="skills-gold-text">stack</span> &amp; tooling
            </h2>

            <p
              className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] sm:text-right"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Tools I reach for daily alongside stacks I'm actively exploring — a living snapshot of my craft.
            </p>
          </div>
        </motion.div>

        {/* ── Tech stack grid — case-file wrapper ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e] mb-8"
        >
          {/* File header — mirrors CaseFile in Hero */}
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f1f1f] px-5 py-3">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#666]">
              SKILLS.MAP
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 p-6">
            {techStack.map((cat, i) => (
              <TechStackCard
                key={cat.id}
                label={cat.label}
                icon={cat.icon}
                isInView={isInView}
                delay={0.25 + i * 0.07}
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
          <div className="mb-5">
            <LabeledRule label="Also in my toolkit" />
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