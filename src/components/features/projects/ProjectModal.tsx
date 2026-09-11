import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Lock, X } from 'lucide-react';
import { Project } from '../../../types';
import FileHeader from '../../common/FileHeader';
import LabeledRule from '../../common/LabeledRule';
import { getLenis } from '../../../lib/lenis';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * ProjectModal
 * Modal presentation displaying full project details, long description, tech stack tags, and links.
 * Styled with rounded-2xl container and Hero CTA-matching buttons.
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const isOpen = project !== null;

  // Lock page scrolling while the modal is open; restore on close/unmount.
  useEffect(() => {
    if (!isOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    return () => lenis?.start();
  }, [isOpen]);

  if (!project) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 32 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl border border-zinc-300 bg-[#fffdf8] dark:border-[#1f1f1f] dark:bg-[#0e0e0e] shadow-2xl dark:shadow-black/70"
        >
          {/* File header */}
          <FileHeader
            label={`${project.title.toLowerCase().replace(/\s+/g, '_')}.json`}
            action={
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-zinc-300 bg-white/80 text-zinc-500 dark:border-[#1f1f1f] dark:bg-[#161616] dark:text-[#888] hover:text-[#b8860b] dark:hover:text-[#d4af37] hover:border-[#b8860b]/40 hover:bg-[#b8860b]/[0.04] dark:hover:border-[#d4af37]/40 transition-colors"
              >
                <X size={14} strokeWidth={2} />
              </button>
            }
          />

          {/* Header image */}
          <div className={`mt-5 mx-6 h-72 bg-gradient-to-br ${project.gradient} relative overflow-hidden rounded-xl`}>
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              {project.image ? (
                <img
                  src={`projects-pict/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-7xl select-none">🌐</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title */}
            <h2
              className="font-outfit font-black leading-tight tracking-[-0.01em] mb-1 text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
              }}
            >
              {project.title}
            </h2>
            <p
              className="font-outfit text-[10px] font-semibold tracking-[0.14em] uppercase text-zinc-500 dark:text-[#666] mb-5"
            >
              {project.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span
                className="px-3 py-1 rounded-full font-outfit text-[9px] font-semibold tracking-[0.08em] uppercase border border-[#b8860b]/40 bg-[#b8860b]/8 text-[#b8860b] dark:border-[#d4af37]/30 dark:bg-[#d4af37]/10 dark:text-[#d4af37]"
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  className="px-3 py-1 rounded-full font-outfit text-[9px] font-semibold tracking-[0.08em] uppercase bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#080808]"
                >
                  ★ Featured
                </span>
              )}
            </div>

            {/* Long description */}
            <div className="space-y-3 mb-6">
              {project.longDescription.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="font-outfit text-sm leading-relaxed text-zinc-600 dark:text-[#8a8a8a]">
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
                    className="px-3 py-1.5 rounded-xl font-outfit text-[10px] font-semibold tracking-[0.04em] border border-zinc-300 bg-white/80 text-zinc-600 dark:border-[#1f1f1f] dark:bg-[#141414] dark:text-[#999]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {project.githubUrl !== 'private-code' ? ( 
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl
                    border border-zinc-400/50 bg-white text-zinc-800
                    hover:border-zinc-400 hover:bg-zinc-50
                    dark:border-[#1f1f1f] dark:bg-[#141414] dark:text-[#f0ede6]
                    dark:hover:border-[#3a3a3a] dark:hover:bg-[#222]
                    transition-all duration-300 font-outfit text-sm font-semibold tracking-wide
                  "
                >
                  <Github size={15} strokeWidth={2.2} className="text-zinc-800 dark:text-[#f0ede6]" />
                  <span>View on GitHub</span>
                </motion.a>
              ) : (
                <div
                  className="
                    flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl
                    border border-zinc-300/50 bg-zinc-100/50 text-zinc-500
                    dark:border-[#1a1a1a] dark:bg-[#141414]/50 dark:text-[#666]
                    font-outfit text-sm font-semibold tracking-wide
                  "
                >
                  <Lock size={15} strokeWidth={2} />
                  <span>Private Code</span>
                </div>
              )}
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl
                  bg-[#b8860b] text-white hover:bg-[#9a7209]
                  dark:bg-[#d4af37] dark:text-[#080808] dark:hover:bg-[#c9a227]
                  transition-all duration-300 font-outfit text-sm font-semibold tracking-wide shadow-md shadow-[#b8860b]/20
                "
              >
                <ExternalLink size={15} strokeWidth={2.2} />
                <span>Live Demo</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
