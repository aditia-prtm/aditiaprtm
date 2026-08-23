import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { techStack, tools } from '../data/portfolio';
import { LabeledRule, FileHeader, SectionBackground } from '../components/common';
import { TechStackCard, ToolBadge } from '../components/features/skills';

/**
 * Skills Section
 * Displays core technology proficiencies and supplementary tooling.
 */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-8%' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      {/* Background grid and subtle gold illumination */}
      <SectionBackground glowPosition="both" />

      <div className="relative z-10 flex flex-col items-center max-w-[1300px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
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

        {/* Tech stack grid — case-file wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e] mb-8"
        >
          {/* File header */}
          <FileHeader label="SKILLS.MAP" />

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

        {/* Tools / extra badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
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