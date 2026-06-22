import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight, BarChart2 } from 'lucide-react';
import { projects } from '../data/portfolio';

type Project = (typeof projects)[0];

// ─── Tilt card ─────────────────────────────────────────────────────
function TiltCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
      onClick={onClick}
      whileHover={{ z: 30 }}
    >
      <div className="relative h-full rounded-2xl overflow-hidden dark:bg-zinc-900 bg-white border dark:border-white/6 border-black/6 transition-all duration-300 group-hover:dark:border-white/12 group-hover:border-black/12 group-hover:shadow-xl dark:group-hover:shadow-black/40 group-hover:shadow-black/10">

        {/* Project image area */}
        <div className={`relative h-44 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
          {/* Animated grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          {/* Placeholder content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl opacity-80"
            >
              {project.id === 1 ? '📈' : project.id === 2 ? '🧩' : project.id === 3 ? '🎨' : '✍️'}
            </motion.div>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 backdrop-blur-sm"
          >
            <span className="text-white font-semibold text-sm">View Details</span>
            <ArrowUpRight size={16} className="text-white" />
          </motion.div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-xs font-medium bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-xs font-medium bg-amber-400/90 text-amber-900 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-6">
          <h3 className="font-bold dark:text-white text-gray-900 text-lg mb-1 group-hover:gradient-text transition-all">
            {project.title}
          </h3>
          <p className="text-xs font-mono dark:text-gray-500 text-gray-400 mb-3">{project.subtitle}</p>
          <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map(m => (
              <div key={m} className="flex items-center gap-1.5 text-xs dark:bg-white/6 bg-black/4 px-2.5 py-1 rounded-full dark:text-gray-300 text-gray-600">
                <BarChart2 size={10} className="opacity-60" />
                {m}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs font-mono dark:bg-white/5 bg-black/4 dark:border-white/6 border-black/5 border rounded dark:text-gray-400 text-gray-500">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-mono dark:text-gray-600 text-gray-400">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors"
            >
              <Github size={14} />
              Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors"
            >
              <ExternalLink size={14} />
              Live demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Project Modal ─────────────────────────────────────────────────
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
        <div className="absolute inset-0 dark:bg-black/75 bg-black/50 modal-backdrop" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl dark:bg-dark-800 bg-white dark:border-white/8 border-black/8 border shadow-2xl dark:shadow-black/60"
        >
          {/* Header image */}
          <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex-shrink-0`}>
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-80">
                {project.id === 1 ? '📈' : project.id === 2 ? '🧩' : project.id === 3 ? '🎨' : '✍️'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h2 className="text-2xl font-bold dark:text-white text-gray-900">{project.title}</h2>
                <p className="text-sm font-mono dark:text-gray-500 text-gray-400">{project.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl dark:bg-white/8 bg-black/5 dark:hover:bg-white/14 hover:bg-black/10 dark:text-gray-400 text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 text-xs font-medium dark:bg-violet-500/15 bg-violet-50 dark:border-violet-500/25 border-violet-100 border dark:text-violet-400 text-violet-600 rounded-full">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-400/15 border-amber-400/25 border text-amber-500 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.metrics.map(m => (
                <div key={m} className="flex items-center gap-1.5 text-sm dark:bg-white/6 bg-black/4 px-3 py-1.5 rounded-full dark:text-gray-300 text-gray-600 font-medium">
                  <BarChart2 size={12} className="opacity-60" />
                  {m}
                </div>
              ))}
            </div>

            {/* Long description */}
            <div className="space-y-4 mb-6">
              {project.longDescription.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-6">
              <p className="text-xs font-mono dark:text-gray-600 text-gray-400 uppercase tracking-widest mb-3">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono dark:bg-white/5 bg-black/4 dark:border-white/8 border-black/6 border rounded-lg dark:text-gray-300 text-gray-600">
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
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm dark:text-white text-gray-900 dark:bg-white/8 bg-black/6 dark:border-white/10 border-black/8 border dark:hover:bg-white/14 hover:bg-black/10 transition-colors"
              >
                <Github size={16} /> View on GitHub
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} /> Live Demo
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
  const isInView = useInView(sectionRef, { once: true, margin: '-5%' });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" ref={sectionRef} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] glow-orb dark:bg-violet-600/5 bg-violet-400/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="font-mono text-sm text-violet-500 dark:text-violet-400 mb-3 block tracking-widest uppercase">
            03. projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Things I've <span className="gradient-text">shipped</span>
          </h2>
          <p className="max-w-xl mx-auto dark:text-gray-400 text-gray-500 text-base">
            A selection of projects from the last few years. Click any card to read the full story.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 perspective-1000">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard project={project} onClick={() => setSelected(project)} />
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-10"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium dark:text-gray-400 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors group"
          >
            <Github size={15} />
            More on GitHub
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
