// Projects.tsx — matched to Hero.tsx design system

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolio';

type Project = (typeof projects)[0];

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

// ─── Tilt card ────────────────────────────────────────────────────
function TiltCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ z: 20 }}
      className="group cursor-pointer h-full"
    >
      <div className="relative h-full overflow-hidden
        border border-zinc-200 bg-zinc-50
        dark:border-[#1f1f1f] dark:bg-[#0a0a0a]
        transition-colors duration-300
        group-hover:border-[#b8860b]/50 dark:group-hover:border-[#d4af37]/40 dark:group-hover:bg-[#0e0e0e]
        group-hover:shadow-xl dark:group-hover:shadow-black/40 group-hover:shadow-black/8"
      >

        {/* Project image area */}
        <div className={`relative h-60 sm:h-72 md:h-80 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            {project.image ? (
              <img src={`projects-pict/${project.image}`} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-7xl select-none">🌐</span>
            )}
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <span
              className="font-medium text-sm text-white tracking-wide"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              View Details
            </span>
            <ArrowUpRight size={15} className="text-white" />
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase
              bg-black/35 backdrop-blur-sm border border-white/20 text-white">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase
                bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#080808]">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-6">
          <h3
            className="font-black leading-tight tracking-[-0.01em] mb-1
              text-zinc-900 dark:text-[#f0ede6]"
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            <span
              className="group-hover:projects-gold-text transition-all duration-300"
            >
              {project.title}
            </span>
          </h3>
          <p
            className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#666] mb-3"
          >
            {project.subtitle}
          </p>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] line-clamp-2 mb-5">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 font-mono text-[9px] tracking-wide
                  border border-zinc-200 bg-zinc-100 text-zinc-500
                  dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#777]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 font-mono text-[9px] text-zinc-400 dark:text-[#555]">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-200 dark:bg-[#1f1f1f] mb-4" />

          {/* Action links */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide
                text-zinc-500 dark:text-[#888]
                hover:text-[#b8860b] dark:hover:text-[#d4af37]
                transition-colors duration-200"
            >
              <Github size={13} strokeWidth={1.7} />
              Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide
                text-zinc-500 dark:text-[#888]
                hover:text-[#b8860b] dark:hover:text-[#d4af37]
                transition-colors duration-200"
            >
              <ExternalLink size={13} strokeWidth={1.7} />
              Live demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 dark:bg-black/80 bg-black/50 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 32 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto
            border border-zinc-200 bg-white
            dark:border-[#1f1f1f] dark:bg-[#0e0e0e]
            shadow-2xl dark:shadow-black/70"
        >
          {/* File-style header — mirrors CaseFile */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-200 dark:border-[#1f1f1f]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
            </div>
            <span className="font-mono text-[9px] text-zinc-400 dark:text-[#555] tracking-[0.25em] uppercase">
              {project.title.toLowerCase().replace(/\s+/g, '_')}.json
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center
                border border-zinc-200 bg-zinc-100 text-zinc-500
                dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#666]
                hover:text-[#b8860b] dark:hover:text-[#d4af37] hover:border-[#b8860b]/40 dark:hover:border-[#d4af37]/40
                transition-colors"
            >
              <X size={13} strokeWidth={2} />
            </button>
          </div>

          {/* Header image */}
          <div className={`mt-5 mx-6 h-72 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              {project.image ? (
                <img src={`projects-pict/${project.image}`} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-7xl select-none">🌐</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            {/* Title */}
            <h2
              className="font-black leading-tight tracking-[-0.01em] mb-1 text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {project.title}
            </h2>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#666] mb-5">
              {project.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase
                border border-[#b8860b]/40 bg-[#b8860b]/8 text-[#b8860b]
                dark:border-[#d4af37]/30 dark:bg-[#d4af37]/10 dark:text-[#d4af37]">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase
                  bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#080808]">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Long description */}
            <div className="space-y-3 mb-6">
              {project.longDescription.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a]">
                  {para}
                </p>
              ))}
            </div>

            {/* Tech stack */}
            <div className="mb-6">
              <LabeledRule label="Tech stack" />
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 font-mono text-[10px] tracking-wide
                      border border-zinc-200 bg-zinc-100 text-zinc-600
                      dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#999]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[12px] tracking-[0.1em] uppercase transition-colors
                  border border-zinc-200 bg-zinc-100 text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b]
                  dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
              >
                <Github size={15} strokeWidth={1.8} />
                View on GitHub
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[12px] tracking-[0.1em] uppercase transition-colors
                  bg-[#b8860b] text-white hover:bg-[#9a7209]
                  dark:bg-[#d4af37] dark:text-[#080808] dark:hover:bg-[#c9a227]"
              >
                <ExternalLink size={15} strokeWidth={1.8} />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main component ────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-5%' });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@300;400&display=swap');

        .projects-grid-bg {
          background-image:
            linear-gradient(to right, #00000008 1px, transparent 1px),
            linear-gradient(to bottom, #00000008 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .dark .projects-grid-bg {
          background-image:
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .projects-gold-text {
          background: linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #9a7209 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dark .projects-gold-text {
          background: linear-gradient(135deg, #d4af37 0%, #f5e177 50%, #c9a227 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background grid — same rhythm as Hero */}
      <div className="absolute inset-0 projects-grid-bg pointer-events-none" />

      {/* Background gradient pools — warm gold, mirrors Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', top: '3%', right: '-8%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '8%', left: '-5%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.03) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '-2%', right: '-10%',
          width: 620, height: 620, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
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
              className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] sm:text-right"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Projects I've built so far — click any card to explore further.
            </p>
          </div>
        </motion.div>

        {/* ── Project grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 perspective-1000">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <TiltCard project={project} onClick={() => setSelected(project)} />
            </motion.div>
          ))}
        </div>

        {/* ── View all link ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2 px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors
              border border-zinc-200 bg-zinc-100 text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b]
              dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
          >
            <Github size={14} strokeWidth={1.8} />
            More on GitHub
            <ArrowUpRight size={13} strokeWidth={2.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}