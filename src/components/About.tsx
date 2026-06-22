import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, Coffee, Star } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

// ─── Stat card ────────────────────────────────────────────────────
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center gap-1 p-4 rounded-2xl dark:bg-white/4 bg-black/4 dark:border-white/6 border-black/6 border text-center">
      <Icon size={16} className="gradient-text mb-1 dark:text-violet-400 text-violet-500" />
      <span className="text-xl font-bold dark:text-white text-gray-900">{value}</span>
      <span className="text-xs dark:text-gray-500 text-gray-400">{label}</span>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" ref={ref} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 glow-orb dark:bg-violet-600/8 bg-violet-400/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="font-mono text-sm text-violet-500 dark:text-violet-400 mb-3 block tracking-widest uppercase">
            01. about
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900">
            The person behind the{' '}
            <span className="gradient-text">code</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >

          {/* Left – avatar & stats */}
          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start gap-8">

            {/* Avatar with gradient border */}
            <div className="relative group">
              {/* Gradient ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden dark:bg-dark-800 bg-gray-100">
                {/* Placeholder avatar – replace with real image */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-cyan-600/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl select-none">👨‍💻</span>
                </div>
              </div>

              {/* Badge overlay */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl dark:bg-dark-800 bg-white dark:border-white/10 border-black/8 border shadow-xl dark:shadow-black/40 shadow-black/10"
              >
                <div className="flex items-center gap-2">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold dark:text-white text-gray-800">6+ Years</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -top-4 -left-4 px-4 py-2 rounded-2xl dark:bg-dark-800 bg-white dark:border-white/10 border-black/8 border shadow-xl dark:shadow-black/40 shadow-black/10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">🚀</span>
                  <span className="text-xs font-semibold dark:text-white text-gray-800">Ship fast</span>
                </div>
              </motion.div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              <StatCard value="50+" label="Projects shipped" icon={Coffee} />
              <StatCard value="6+" label="Years exp." icon={Calendar} />
              <StatCard value="14" label="Countries worked" icon={MapPin} />
            </div>
          </motion.div>

          {/* Right – bio text */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-base lg:text-lg dark:text-gray-300 text-gray-600 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-base lg:text-lg dark:text-gray-400 text-gray-500 leading-relaxed">
                {personalInfo.bio2}
              </p>
            </div>

            {/* Fun facts */}
            <div className="pt-2">
              <p className="text-xs font-mono dark:text-gray-500 text-gray-400 uppercase tracking-widest mb-4">
                fun facts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {personalInfo.funFacts.map((fact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500 px-3 py-2.5 rounded-xl dark:bg-white/4 bg-black/3 dark:border-white/5 border-black/5 border"
                  >
                    {fact}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Info row */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500">
                <MapPin size={14} className="text-violet-500" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-500">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {personalInfo.availability}
              </div>
            </div>

            {/* CTA */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="self-start flex items-center gap-2 mt-2 px-6 py-3 rounded-xl font-semibold dark:text-white text-gray-900 dark:bg-white/8 bg-black/6 dark:border-white/10 border-black/10 border dark:hover:bg-white/14 hover:bg-black/10 transition-colors text-sm"
            >
              Say hello →
            </motion.a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
