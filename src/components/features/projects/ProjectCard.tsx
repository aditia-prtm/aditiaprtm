import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Lock } from 'lucide-react';
import { Project } from '../../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

/**
 * ProjectCard
 * 3D interactive tilt card showcasing a project preview, tags, and actions.
 * Styled with rounded-2xl container and Hero CTA-matching buttons.
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
      <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-300 bg-white/85 shadow-[0_14px_38px_rgba(24,24,27,0.07)] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:shadow-none transition-all duration-300 group-hover:border-[#b8860b]/50 group-hover:bg-white dark:group-hover:border-[#d4af37]/40 dark:group-hover:bg-[#0e0e0e] group-hover:shadow-xl dark:group-hover:shadow-black/40 group-hover:shadow-black/8 flex flex-col justify-between">
        {/* Top Image Section */}
        <div>
          {/* Project image area */}
          <div className={`relative h-60 sm:h-72 md:h-80 bg-gradient-to-br ${project.gradient} overflow-hidden rounded-t-2xl`}>
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-outfit font-medium text-sm tracking-wide">
                View Details
                <ArrowUpRight size={15} className="text-white" />
              </span>
            </motion.div>

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 font-outfit font-semibold text-[9px] tracking-[0.12em] uppercase rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white">
                {project.category}
              </span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 font-outfit font-semibold text-[9px] tracking-[0.08em] uppercase rounded-full bg-[#b8860b] text-white dark:bg-[#d4af37] dark:text-[#080808]">
                  ★ Featured
                </span>
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="p-6">
            <h3
              className="font-outfit font-black leading-tight tracking-[-0.01em] mb-1 text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              }}
            >
              <span className="group-hover:projects-gold-text transition-all duration-300">
                {project.title}
              </span>
            </h3>
            <p className="font-outfit text-[10px] font-semibold tracking-[0.14em] uppercase text-zinc-500 dark:text-[#666] mb-3">
              {project.subtitle}
            </p>
            <p className="font-outfit text-sm leading-relaxed text-zinc-600 dark:text-[#8a8a8a] line-clamp-2 mb-5">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl font-outfit text-[10px] font-semibold tracking-[0.04em] border border-zinc-300/80 bg-zinc-50 text-zinc-600 dark:border-[#1f1f1f] dark:bg-[#121212] dark:text-[#888]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2.5 py-1 rounded-xl font-outfit text-[10px] font-medium text-zinc-500 dark:text-[#666]">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action links */}
        <div className="px-6 pb-6 pt-0">
          <div className="h-px bg-zinc-200 dark:bg-[#1a1a1a] mb-4" />
          <div className="flex items-center gap-3">
            {project.githubUrl !== 'private-code' ? (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  border border-zinc-400/50 bg-white text-zinc-800
                  hover:border-zinc-400 hover:bg-zinc-50
                  dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:text-[#f0ede6]
                  dark:hover:border-[#3a3a3a] dark:hover:bg-[#222]
                  transition-all duration-300 font-outfit text-xs font-semibold
                "
              >
                <Github size={13} strokeWidth={2.2} className="text-zinc-800 dark:text-[#f0ede6]" />
                <span>Code</span>
              </motion.a>
            ) : (
              <span className="
                inline-flex items-center gap-2 px-4 py-2 rounded-xl
                border border-zinc-300/50 bg-zinc-100/50 text-zinc-500
                dark:border-[#1a1a1a] dark:bg-[#121212]/50 dark:text-[#666]
                font-outfit text-xs font-semibold
              ">
                <Lock size={13} strokeWidth={2} />
                <span>Private</span>
              </span>
            )}

            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                inline-flex items-center gap-2 px-4 py-2 rounded-xl
                border border-zinc-400/50 bg-white text-zinc-800
                hover:border-zinc-400 hover:bg-zinc-50
                dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:text-[#f0ede6]
                dark:hover:border-[#3a3a3a] dark:hover:bg-[#222]
                transition-all duration-300 font-outfit text-xs font-semibold
              "
            >
              <ExternalLink size={13} strokeWidth={2.2} className="text-zinc-800 dark:text-[#f0ede6]" />
              <span>Live demo</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
