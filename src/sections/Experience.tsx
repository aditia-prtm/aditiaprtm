import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experiences, educations } from '../data/portfolio';
import { LabeledRule, SectionBackground } from '../components/common';
import { TimelineItem } from '../components/features/experience';

/**
 * Experience Section
 * Timeline of professional and academic milestones with two panels.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-5%' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-[#fffdf8] dark:bg-[#080808]"
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
              className="font-outfit font-black leading-[0.9] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
              }}
            >
              The <span className="experience-gold-text">journey</span> so far
            </h2>
            <p
              className="font-outfit max-w-xs text-base leading-relaxed text-zinc-600 dark:text-[#8a8a8a] sm:text-right"
            >
              Places where I've grown, learned with awesome people, and built cool stuff.
            </p>
          </div>
        </motion.div>

        {/* Two-panel body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Work/Organization Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <Briefcase className="w-5 h-5 text-[#b8860b] dark:text-[#d4af37]" />
              <h3 className="font-outfit font-semibold text-lg text-zinc-900 dark:text-[#f0ede6]">
                Work & Organization
              </h3>
            </motion.div>
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

          {/* Right: Education Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <GraduationCap className="w-5 h-5 text-[#b8860b] dark:text-[#d4af37]" />
              <h3 className="font-outfit font-semibold text-lg text-zinc-900 dark:text-[#f0ede6]">
                Education
              </h3>
            </motion.div>
            {educations.map((edu, i) => (
              <TimelineItem
                key={edu.id}
                exp={edu}
                index={i}
                isInView={isInView}
                isLast={i === educations.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
