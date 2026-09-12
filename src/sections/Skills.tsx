// src\sections\Skills.tsx

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { techStackCategories } from '../data/portfolio';
import { LabeledRule, FileHeader, SectionBackground } from '../components/common';
import { TechStackCard } from '../components/features/skills';

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
      className="relative py-14 lg:py-20 overflow-hidden bg-[#fffdf8] dark:bg-[#080808]"
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
              className="font-outfit font-black leading-[0.9] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
              }}
            >
              Tech <span className="skills-gold-text">stack</span> &amp; tooling
            </h2>

            <p
              className="font-outfit max-w-sm text-base leading-relaxed text-zinc-600 dark:text-[#8a8a8a] sm:text-right"
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
          className="w-full rounded-2xl overflow-hidden border border-zinc-300 bg-white/85 shadow-[0_18px_45px_rgba(24,24,27,0.07)] backdrop-blur-sm dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:shadow-none dark:backdrop-blur-none"
        >
          {/* File header */}
          <FileHeader label="SKILLS.MAP" />

          {/* Categories Grid */}
          <div className="p-6 space-y-6">
            {techStackCategories.map((category, catIndex) => (
              <div key={category.name}>
                {/* Category Header */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
                  className="mb-3"
                >
                  <h3 className="font-outfit font-semibold text-sm tracking-wider text-zinc-900 dark:text-[#f0ede6] uppercase">
                    {category.name}
                  </h3>
                </motion.div>

                {/* Items Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-3">
                  {category.items.map((item, itemIndex) => (
                    <TechStackCard
                      key={item.id}
                      label={item.label}
                      icon={item.icon}
                      isInView={isInView}
                      delay={0.25 + catIndex * 0.1 + itemIndex * 0.05}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
