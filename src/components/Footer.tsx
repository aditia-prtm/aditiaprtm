import { motion } from 'framer-motion';
import { Zap, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-10 border-t dark:border-white/5 border-black/5 overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
              <Zap size={13} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm dark:text-white text-gray-900">
              aditia<span className="gradient-text">prtm</span>
            </span>
          </motion.a>

          {/* Copy */}
          <p className="text-xs dark:text-gray-600 text-gray-400 flex items-center gap-1.5">
            © {year} {personalInfo.name}
            <span className="dark:text-gray-700 text-gray-300">·</span>
            Built with
            <Heart size={11} className="text-rose-500 fill-rose-500 mx-0.5" />
            and strong coffee
          </p>

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs font-medium dark:text-gray-500 text-gray-400 dark:hover:text-white hover:text-gray-900 transition-colors"
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
