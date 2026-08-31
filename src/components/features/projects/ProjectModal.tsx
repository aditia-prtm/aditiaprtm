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
 *
 * Scroll handling (desktop wheel + mobile touch):
 * - `data-lenis-prevent` makes Lenis ignore wheel/touch events over the modal, so the
 *   modal scrolls natively instead of the page (Lenis hijacks wheel events on window
 *   and would otherwise scroll the portfolio page behind the modal).
 * - `overscroll-contain` blocks scroll chaining when the modal reaches its top/bottom
 *   scroll boundary, so the page never starts scrolling behind the modal.
 * - While open, Lenis is paused (lenis.stop()) to fully lock the page behind the modal.
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
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain border border-zinc-200 bg-white dark:border-[#1f1f1f] dark:bg-[#0e0e0e] shadow-2xl dark:shadow-black/70"
        >
          {/* File header */}
          <FileHeader
            label={`${project.title.toLowerCase().replace(/\s+/g, '_')}.json`}
            action={
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-7 h-7 flex items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#666] hover:text-[#b8860b] dark:hover:text-[#d4af37] hover:border-[#b8860b]/40 dark:hover:border-[#d4af37]/40 transition-colors"
              >
                <X size={13} strokeWidth={2} />
              </button>
            }
          />

          {/* Header image */}
          <div className={`mt-5 mx-6 h-72 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
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
              className="font-black leading-tight tracking-[-0.01em] mb-1 text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {project.title}
            </h2>
            <p
              className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#666] mb-5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span
                className="px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase border border-[#b8860b]/40 bg-[#b8860b]/8 text-[#b8860b] dark:border-[#d4af37]/30 dark:bg-[#d4af37]/10 dark:text-[#d4af37]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  className="px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#080808]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
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
                    className="px-3 py-1 font-mono text-[10px] tracking-wide border border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#999]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {project.githubUrl !== 'private-repository' ? ( 
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[12px] tracking-[0.1em] uppercase transition-colors border border-zinc-200 bg-zinc-100 text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b] dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <Github size={15} strokeWidth={1.8} />
                  View on GitHub
                </a>
              ) : (
                <p
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[12px] tracking-[0.1em] uppercase transition-colors border border-zinc-200 bg-zinc-100 text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b] dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <Lock size={15} strokeWidth={1.8} />
                  Private Repository
                </p>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[12px] tracking-[0.1em] uppercase transition-colors bg-[#b8860b] text-white hover:bg-[#9a7209] dark:bg-[#d4af37] dark:text-[#080808] dark:hover:bg-[#c9a227]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
