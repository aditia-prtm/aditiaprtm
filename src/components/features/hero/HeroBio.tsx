import { motion } from 'framer-motion';
import { Linkedin, Download, Github, MapPin } from 'lucide-react';
import { personalInfo } from '../../../data/portfolio';
import { useTypingEffect } from '../../../hooks/useTypingEffect';
import BlinkingCursor from '../../common/BlinkingCursor';
import HeroName from './HeroName';
import { LOADING_OFFSET } from '../../../sections/Hero';

interface HeroBioProps {
  isInView: boolean;
  isFirstRender: boolean;
}

/**
 * HeroBio
 * Left panel of the Hero section: eyebrow, staggered name, typing tagline, bio, stats, CTA buttons, and social links.
 */
export default function HeroBio({ isInView, isFirstRender }: HeroBioProps) {
  const typed = useTypingEffect(personalInfo.taglines, 65, 32, 2200);

  /** Subtract LOADING_OFFSET from delay on re-visits, floor at 0. */
  const d = (base: number) => (isFirstRender ? base : Math.max(0, base - LOADING_OFFSET));

  return (
    <div>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ duration: 0.7, delay: d(1.3) }}
        className="flex items-center gap-4 mb-10"
      >
        <MapPin size={12} strokeWidth={1.9} className="text-[#b8860b] dark:text-[#d4af37]" />
        <span
          className="font-outfit text-[10px] font-semibold tracking-[0.22em] uppercase text-zinc-600 dark:text-[#888]"
        >
          {personalInfo.location}
        </span>
      </motion.div>

      {/* Name */}
      <HeroName isInView={isInView} isFirstRender={isFirstRender} />

      {/* Typing tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: d(2.1), duration: 0.6 }}
        className="h-7 flex items-center mb-7"
      >
        <span
          className="text-base text-zinc-600 dark:text-[#999]"
        >
          <span className='name-gold'>{'<'}</span>
          {typed}
          <BlinkingCursor />
          <span className='name-gold'>{'/>'}</span>
        </span>
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: d(2.2), duration: 0.7 }}
        className="font-outfit text-zinc-600 dark:text-[#9a9a9a] leading-[1.9] text-base max-w-[420px] mb-7"
      >
        {personalInfo.bio}{' '}
        <span className="text-[#b8860b] dark:text-[#d4af37]">Sriwijaya University</span>{'. '}
        {personalInfo.bio2}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: d(2.4), duration: 0.7 }}
        className="flex flex-wrap gap-3 mb-10"
      >
        {/* CTA Resume */}
        <motion.a
          href={personalInfo.resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl
            border border-zinc-400/50 bg-white text-zinc-800
            hover:border-zinc-400 hover:bg-zinc-50
            dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:text-[#f0ede6]
            dark:hover:border-[#3a3a3a] dark:hover:bg-[#222]
            transition-all duration-300
          "
        >
          <Download size={13} strokeWidth={2.2} className="text-zinc-800 dark:text-[#f0ede6]" />
          <span className="font-outfit font-semibold tracking-wide text-sm">
            Resume
          </span>
        </motion.a>

        {/* CTA GitHub */}
        <motion.a
          href={personalInfo.social.github}
          target='_blank'
          rel='noopener noreferrer'
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl
            border border-zinc-400/50 bg-white text-zinc-800
            hover:border-zinc-400 hover:bg-zinc-50
            dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:text-[#f0ede6]
            dark:hover:border-[#3a3a3a] dark:hover:bg-[#222]
            transition-all duration-300
          "
        >
          <Github size={13} strokeWidth={2.2} className="text-zinc-800 dark:text-[#f0ede6]" />
          <span className="font-outfit font-semibold tracking-wide text-sm">
            GitHub
          </span>
        </motion.a>

        {/* CTA LinkedIn */}
        <motion.a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl
            border border-zinc-400/50  bg-white text-zinc-800
            hover:border-zinc-400 hover:bg-zinc-50
            
            dark:border-[#1f1f1f] dark:bg-[#0e0e0e] dark:text-[#f0ede6]
            dark:hover:border-[#3a3a3a] dark:hover:bg-[#222]
            transition-all duration-300
          "
        >
          <Linkedin size={13} strokeWidth={2.2} className="text-zinc-800 dark:text-[#f0ede6]" />
          <span className="font-outfit font-semibold tracking-wide text-sm">
            LinkedIn
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
}
