import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolio';

// ─── Category colour map ──────────────────────────────────────────
const colorMap: Record<string, { bar: string; glow: string; text: string; bg: string }> = {
  violet: {
    bar: 'from-violet-500 to-violet-400',
    glow: 'shadow-violet-500/20',
    text: 'dark:text-violet-400 text-violet-600',
    bg: 'dark:bg-violet-500/10 bg-violet-50 dark:border-violet-500/20 border-violet-100',
  },
  blue: {
    bar: 'from-blue-500 to-blue-400',
    glow: 'shadow-blue-500/20',
    text: 'dark:text-blue-400 text-blue-600',
    bg: 'dark:bg-blue-500/10 bg-blue-50 dark:border-blue-500/20 border-blue-100',
  },
  cyan: {
    bar: 'from-cyan-500 to-cyan-400',
    glow: 'shadow-cyan-500/20',
    text: 'dark:text-cyan-400 text-cyan-600',
    bg: 'dark:bg-cyan-500/10 bg-cyan-50 dark:border-cyan-500/20 border-cyan-100',
  },
  pink: {
    bar: 'from-pink-500 to-pink-400',
    glow: 'shadow-pink-500/20',
    text: 'dark:text-pink-400 text-pink-600',
    bg: 'dark:bg-pink-500/10 bg-pink-50 dark:border-pink-500/20 border-pink-100',
  },
};

// ─── Skill progress bar ────────────────────────────────────────────
function SkillBar({ name, level, icon, bar, isInView }: {
  name: string; level: number; icon: string; bar: string; isInView: boolean;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium dark:text-gray-200 text-gray-700">{name}</span>
        </div>
        <span className="text-xs font-mono dark:text-gray-500 text-gray-400 tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full dark:bg-white/6 bg-black/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${bar}`}
        />
      </div>
    </div>
  );
}

// ─── Category card ─────────────────────────────────────────────────
function CategoryCard({ category, isInView, delay }: {
  category: (typeof skillCategories)[0]; isInView: boolean; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[category.color] || colorMap.violet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className={`relative p-6 rounded-2xl 
                bg-white dark:bg-zinc-900 
                border border-black/6 dark:border-white/10 
                transition-shadow duration-300 ${
                  hovered ? `shadow-lg ${c.glow}` : 'shadow-none'
                }`}
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl bg-gradient-brand-subtle pointer-events-none"
      />

      {/* Category header */}
      <div className="relative flex items-center gap-3 mb-6">
        <div className={`px-3 py-1 rounded-lg text-xs font-semibold border ${c.bg} ${c.text}`}>
          {category.label}
        </div>
        <div className="h-px flex-1 dark:bg-white/6 bg-black/6" />
      </div>

      {/* Skills */}
      <div className="relative flex flex-col gap-5">
        {category.skills.map(skill => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            bar={c.bar}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8%' });

  return (
    <section id="skills" ref={sectionRef} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 glow-orb dark:bg-cyan-600/6 bg-cyan-400/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="font-mono text-sm text-violet-500 dark:text-violet-400 mb-3 block tracking-widest uppercase">
            02. skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Tech <span className="gradient-text">stack</span> & tooling
          </h2>
          <p className="max-w-xl mx-auto dark:text-gray-400 text-gray-500 text-base">
            Battle-tested tools I reach for on every project. Levels are self-assessed after shipping real production software.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} isInView={isInView} delay={i * 0.1} />
          ))}
        </div>

        {/* Extra badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {['Git', 'Vitest', 'Playwright', 'Sentry', 'Linear', 'Notion', 'Zod', 'tRPC', 'Prisma', 'Stripe'].map(tech => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono dark:bg-white/4 bg-black/4 dark:border-white/6 border-black/6 border rounded-full dark:text-gray-400 text-gray-500"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
