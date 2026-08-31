import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolio';
import { Project } from '../types';
import { LabeledRule, SectionBackground } from '../components/common';
import { ProjectCard, ProjectModal } from '../components/features/projects';

/**
 * Projects Section
 * Features interactive 3D cards, project previews, and an expandable modal for detailed views.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-5%' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      {/* Ambient background grid and glow */}
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
            <LabeledRule label="02 · Projects" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="font-black leading-[0.9] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Things I've <span className="projects-gold-text">shipped</span>
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-[#8a8a8a] sm:text-right"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Projects I've built so far — click any card to explore further.
            </p>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 perspective-1000">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </div>

        {/* View all on GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2 px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors border border-zinc-200 bg-zinc-100 text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b] dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Github size={14} strokeWidth={1.8} />
            More on GitHub
            <ArrowUpRight
              size={13}
              strokeWidth={2.2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}