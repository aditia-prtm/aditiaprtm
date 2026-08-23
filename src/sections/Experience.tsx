import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, TrendingUp, Award, MapPin } from 'lucide-react';
import { experiences } from '../data/portfolio';
import { LabeledRule, SectionBackground } from '../components/common';
import { TimelineItem, StatCard, HighlightCard } from '../components/features/experience';

/**
 * Experience Section
 * Timeline of professional and academic milestones with a sticky summary sidebar.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-5%' });

  // Derived metrics from experiences data
  const totalYears = experiences.length > 0 ? `${experiences.length}+` : '—';
  const totalRoles = `${experiences.length}`;
  const totalHighlights = experiences.reduce((acc, e) => acc + (e.highlights?.length ?? 0), 0);
  const uniqueTypes = [...new Set(experiences.map((e) => e.type))].filter(Boolean).length || 1;

  const stats = [
    { icon: TrendingUp, value: totalYears, label: 'Experiences' },
    { icon: Briefcase, value: totalRoles, label: 'Roles held' },
    { icon: Award, value: `${totalHighlights}+`, label: 'Achievements' },
    { icon: MapPin, value: `${uniqueTypes}`, label: 'Work types' },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      {/* Subtle ambient lighting */}
      <SectionBackground glowPosition="both" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
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

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          {/* Left: Timeline */}
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

          {/* Right: Sticky sidebar */}
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
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.75 }}
            >
              <LabeledRule label="Career snapshot" />
            </motion.div>

            {/* Highlight cards */}
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
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="flex items-center gap-3 px-4 py-3 bg-[#b8860b]/[0.05] border border-[#b8860b]/20 dark:bg-[#d4af37]/[0.04] dark:border-[#d4af37]/18"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full flex-shrink-0 border-[1.5px] border-[#b8860b]/30 border-t-[#b8860b] dark:border-[#d4af37]/30 dark:border-t-[#d4af37]"
              />
              <span
                className="text-[10px] leading-relaxed text-zinc-500 dark:text-[#8a8a8a]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
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