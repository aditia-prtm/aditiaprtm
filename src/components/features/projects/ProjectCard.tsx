import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

/**
 * ProjectCard
 * 3D interactive tilt card showcasing a project preview, tags, and actions.
 */
export default function ProjectCard({ project, onClick }: ProjectCardProps) {
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
      onClick={onClick}
      whileHover={{ z: 20 }}
      className="group cursor-pointer h-full"
    >
      <div className="relative h-full overflow-hidden border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0a0a0a] transition-colors duration-300 group-hover:border-[#b8860b]/50 dark:group-hover:border-[#d4af37]/40 dark:group-hover:bg-[#0e0e0e] group-hover:shadow-xl dark:group-hover:shadow-black/40 group-hover:shadow-black/8 flex flex-col justify-between">
        {/* Top Image Section */}
        <div>
          {/* Project image area */}
          <div className={`relative h-60 sm:h-72 md:h-80 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
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
              <span
                className="px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase bg-black/35 backdrop-blur-sm border border-white/20 text-white"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.category}
              </span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 right-3">
                <span
                  className="px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] uppercase bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#080808]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  ★ Featured
                </span>
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="p-6">
            <h3
              className="font-black leading-tight tracking-[-0.01em] mb-1 text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <span className="group-hover:projects-gold-text transition-all duration-300">
                {project.title}
              </span>
            </h3>
            <p
              className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#666] mb-3"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.subtitle}
            </p>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] line-clamp-2 mb-5">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 font-mono text-[9px] tracking-wide border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#777]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span
                  className="px-2 py-0.5 font-mono text-[9px] text-zinc-400 dark:text-[#555]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action links */}
        <div className="px-6 pb-6 pt-0">
          <div className="h-px bg-zinc-200 dark:bg-[#1f1f1f] mb-4" />
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-zinc-500 dark:text-[#888] hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors duration-200"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Github size={13} strokeWidth={1.7} />
              Code
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-zinc-500 dark:text-[#888] hover:text-[#b8860b] dark:hover:text-[#d4af37] transition-colors duration-200"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
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
