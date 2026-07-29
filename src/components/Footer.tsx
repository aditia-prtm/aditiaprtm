import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="relative py-8 border-t border-zinc-200 dark:border-white/8 overflow-hidden bg-white dark:bg-[#0A0A0F]">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Brand */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden lg:flex items-center gap-3 group"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-2xl">
              <img src="/favicon.jpg" alt="adtx.png" className='rounded-lg'/>
            </div>
          </motion.a>
          <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 tracking-widest">
            © M. Aditia Putra Pratama - Portfolio - 2026
          </p>

          {/* Right: Copyright + Back to top */}
          <div className="flex flex-col items-center lg:items-end gap-3">
            {/* <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center lg:text-right">
              © {year} {personalInfo.name}. All rights reserved.
            </p> */}

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 
                hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Back to top
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}