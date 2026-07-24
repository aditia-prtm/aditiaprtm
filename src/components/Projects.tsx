// Projects.tsx — upgraded to match Hero.tsx design system

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';
import { personalInfo, projects } from '../data/portfolio';

type Project = (typeof projects)[0];

// ─── Noise overlay ────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.035] pointer-events-none z-0"
      aria-hidden
    >
      <filter id="noise-projects">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-projects)" />
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
      <div className="relative h-full rounded-2xl overflow-hidden
        border border-zinc-200 bg-zinc-50
        dark:border-white/8 dark:bg-transparent
        transition-colors duration-300
        group-hover:border-zinc-300 dark:group-hover:border-white/14 dark:group-hover:bg-white/[0.02]
        group-hover:shadow-xl dark:group-hover:shadow-black/40 group-hover:shadow-black/8"
      >

        {/* Project image area */}
        <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
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
            <span className="font-semibold text-sm text-white">View Details</span>
            <ArrowUpRight size={15} className="text-white" />
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase
              bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-lg">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 font-mono text-[10px] tracking-wide
                bg-[#C8FF57]/90 text-[#0A0A0F] rounded-lg">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-6">
          <h3
            className="font-black leading-tight tracking-tight mb-1
              text-zinc-900 dark:text-white
              group-hover:text-transparent
              transition-all duration-300"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              fontFamily: "'Space Grotesk','Inter',sans-serif",
            }}
          >
            <span 
              className="group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-green-500 
                        group-hover:bg-clip-text group-hover:text-transparent
                        transition-all duration-300"
            >
              {project.title}
            </span>
          </h3>
          <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
            {project.subtitle}
          </p>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-5">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 font-mono text-[10px] rounded-lg
                  border border-zinc-200 bg-zinc-100 text-zinc-500
                  dark:border-white/8 dark:bg-transparent dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-200 dark:bg-white/6 mb-4" />

          {/* Action links */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide
                text-zinc-500 dark:text-zinc-400
                hover:text-violet-600 dark:hover:text-[#C8FF57]
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
                text-zinc-500 dark:text-zinc-400
                hover:text-violet-600 dark:hover:text-[#C8FF57]
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
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl
            border border-zinc-200 bg-white
            dark:border-white/10 dark:bg-[#0A0A0F]
            shadow-2xl dark:shadow-black/70"
        >
          {/* macOS dots header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500/70" />
            </div>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest">
              {project.title.toLowerCase().replace(/\s+/g, '_')}.json
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                border border-zinc-200 bg-zinc-100 text-zinc-500
                dark:border-white/10 dark:bg-white/6 dark:text-zinc-400
                hover:text-zinc-900 dark:hover:text-white
                transition-colors"
            >
              <X size={13} strokeWidth={2} />
            </button>
          </div>

          {/* Header image */}
          <div className={`mt-4 mx-6 h-44 rounded-xl bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              {project.image ? (
                <img src={`projects-pict/${project.image}`} alt={project.title} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-7xl select-none">🌐</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            {/* Title */}
            <h2
              className="font-black leading-tight tracking-tighter mb-1 text-zinc-900 dark:text-white"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.75rem)',
                fontFamily: "'Space Grotesk','Inter',sans-serif",
              }}
            >
              {project.title}
            </h2>
            <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-5">
              {project.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-2.5 py-1 font-mono text-[10px] tracking-wide rounded-lg
                border border-violet-300 bg-violet-50 text-violet-600
                dark:border-violet-500/25 dark:bg-violet-500/10 dark:text-violet-400">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 font-mono text-[10px] tracking-wide rounded-lg
                  bg-[#C8FF57]/15 border border-[#C8FF57]/30 text-[#71a801] dark:text-[#C8FF57]">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Long description */}
            <div className="space-y-3 mb-6">
              {project.longDescription.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {para}
                </p>
              ))}
            </div>

            {/* Tech stack */}
            <div className="mb-6">
              <LabeledRule label="tech stack" />
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 font-mono text-[11px] rounded-lg
                      border border-zinc-200 bg-zinc-100 text-zinc-600
                      dark:border-white/8 dark:bg-transparent dark:text-zinc-300"
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
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-colors
                  border border-zinc-200 bg-zinc-100 text-zinc-900 hover:border-violet-400 hover:text-violet-700
                  dark:border-white/10 dark:bg-transparent dark:hover:bg-[#70a80116] dark:text-[#71a801] dark:hover:border-[#71a801]"
              >
                <Github size={15} strokeWidth={1.8} />
                View on GitHub
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-colors
                  bg-[#71a801] text-white hover:bg-[#5e8d01]
                  dark:bg-[#C8FF57] dark:text-[#0A0A0F] dark:hover:bg-[#d4ff6e]"
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
      className="relative py-28 lg:py-36 overflow-hidden bg-white dark:bg-[#0A0A0F]"
    >
      <NoiseOverlay />

      {/* Background gradient pools */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', top: '5%', right: '-8%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '-2%', right: '-10%',
          width: 640, height: 640, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,63,255,0.1) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,87,0.06) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '45%', left: '35%',
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97,218,251,0.04) 0%, transparent 65%)',
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
            <LabeledRule label="03 · projects" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2
              className="font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Space Grotesk','Inter',sans-serif",
              }}
            >
              Things I've{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #7c3aed 0%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                shipped
              </span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-right">
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
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-colors
              border border-zinc-200 bg-zinc-100 text-zinc-900 hover:border-violet-400 hover:text-violet-700
              dark:border-white/10 dark:bg-transparent dark:hover:bg-[#70a80116] dark:text-[#71a801] dark:hover:border-[#71a801]"
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