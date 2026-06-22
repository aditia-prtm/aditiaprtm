import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { experiences } from '../data/portfolio';

// ─── Timeline item ─────────────────────────────────────────────────
function TimelineItem({ exp, index, isInView }: {
  exp: (typeof experiences)[0]; index: number; isInView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-start gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'} text-left`}>
        <div className="group relative p-6 rounded-2xl dark:bg-zinc-950 bg-white border dark:border-white/6 border-black/6 dark:hover:border-white/12 hover:border-black/10 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/30">

          {/* Accent line */}
          <div
            className="absolute top-0 left-2 w-full h-0.5 rounded-t-2xl opacity-60"
            style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
          />

          {/* Role & company */}
          <div className="mb-3">
            <h3 className="font-bold dark:text-white text-gray-900 text-base mb-0.5">{exp.role}</h3>
            <div className="flex items-center gap-2 text-sm" style={{ color: exp.color }}>
              <Briefcase size={12} />
              <span className="font-semibold">{exp.company}</span>
              <span className="dark:text-gray-600 text-gray-400">·</span>
              <span className="dark:text-gray-500 text-gray-400 text-xs">{exp.type}</span>
            </div>
          </div>

          {/* Period badge */}
          <div className={`flex items-center gap-1.5 mb-4 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
            <Calendar size={11} className="dark:text-gray-600 text-gray-400" />
            <span className="text-xs font-mono dark:text-gray-500 text-gray-400">{exp.period}</span>
          </div>

          {/* Description */}
          <p className="text-sm dark:text-gray-400 text-gray-500 leading-relaxed mb-4">
            {exp.description}
          </p>

          {/* Highlights */}
          <div className={`flex flex-col gap-1.5 ${isLeft ? 'lg:items-end' : 'lg:items-start'} items-start`}>
            {exp.highlights.map(h => (
              <div key={h} className="flex items-center gap-1.5 text-xs dark:text-gray-400 text-gray-500">
                <ChevronRight size={11} style={{ color: exp.color }} className="flex-shrink-0" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Centre node (desktop only) */}
      <div className="hidden lg:flex flex-col items-center flex-shrink-0 w-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          className="w-10 h-10 rounded-full flex items-center justify-center border-4 dark:bg-dark-900 bg-white z-10"
          style={{ borderColor: exp.color }}
        >
          <Briefcase size={14} style={{ color: exp.color }} />
        </motion.div>
      </div>

      {/* Mobile dot */}
      <div className="flex lg:hidden flex-col items-center flex-shrink-0">
        <div
          className="w-3 h-3 rounded-full mt-6 flex-shrink-0 border-2 dark:bg-dark-900 bg-white"
          style={{ borderColor: exp.color }}
        />
      </div>

      {/* Empty spacer on alternating side (desktop) */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-5%' });

  return (
    <section id="experience" ref={sectionRef} className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-80 h-80 glow-orb dark:bg-blue-600/6 bg-blue-400/3 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="font-mono text-sm text-violet-500 dark:text-violet-400 mb-3 block tracking-widest uppercase">
            04. experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            The <span className="gradient-text">journey</span> so far
          </h2>
          <p className="max-w-md mx-auto dark:text-gray-400 text-gray-500 text-base">
            From writing my first for-loop to leading engineering teams at funded startups.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 timeline-line opacity-20" />

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-[5px] top-0 bottom-0 w-0.5 timeline-line opacity-20" />

          <div className="flex flex-col gap-8 lg:gap-12 pl-8 lg:pl-0">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} exp={exp} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
