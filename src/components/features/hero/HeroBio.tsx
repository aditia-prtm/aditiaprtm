import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { personalInfo } from '../../../data/portfolio';
import { useTypingEffect } from '../../../hooks/useTypingEffect';
import BlinkingCursor from '../../common/BlinkingCursor';
import Stat from '../../common/Stat';
import SocialLink from '../../common/SocialLink';
import HeroName from './HeroName';
import { LOADING_OFFSET } from '../../../sections/Hero';

const socials = [
  { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: personalInfo.social.instagram, label: 'Instagram' },
  { icon: Mail, href: personalInfo.social.email, label: 'Email' },
];

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

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

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
        <span className="w-8 h-px bg-[#b8860b] dark:bg-[#d4af37]" />
        <span
          className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-600 dark:text-[#888]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Informatics · {personalInfo.location}
        </span>
      </motion.div>

      {/* Name */}
      <HeroName isInView={isInView} isFirstRender={isFirstRender} />

      {/* Typing tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: d(2.1), duration: 0.6 }}
        className="h-7 flex items-center mb-10"
      >
        <span
          className="text-sm text-zinc-600 dark:text-[#999]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {typed}
          <BlinkingCursor />
        </span>
      </motion.div>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: d(2.2), duration: 0.7 }}
        className="text-zinc-600 dark:text-[#9a9a9a] leading-[1.9] text-sm max-w-[420px] mb-12"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Undergraduate Informatics Engineering student at{' '}
        <span className="text-[#b8860b] dark:text-[#d4af37]">Sriwijaya University</span>
        . Passionate about building impactful, human-centered software — from pixel-perfect interfaces to resilient backends.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: d(2.3), duration: 0.7 }}
        className="flex items-center gap-8 mb-12"
      >
        <Stat num="5+" label="Projects" />
        <Stat num="∞" label="Curiosity" />
        <Stat num="01" label="Goal: Ship" />
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: d(2.4), duration: 0.7 }}
        className="flex flex-wrap gap-6 mb-14"
      >
        {/* Primary CTA */}
        <motion.a
          href="#projects"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleScrollToProjects}
          className="flex items-center gap-3 group"
        >
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-800 dark:text-[#f0ede6]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            View Work
          </span>
          <span className="flex items-center justify-center w-8 h-8 border border-[#b8860b]/40 group-hover:border-[#b8860b] group-hover:bg-[#b8860b]/8 dark:border-[#d4af37]/40 dark:group-hover:border-[#d4af37] dark:group-hover:bg-[#d4af37]/8 transition-all duration-300">
            <ArrowRight size={12} className="text-[#b8860b] dark:text-[#d4af37]" />
          </span>
        </motion.a>

        {/* Secondary CTA */}
        <motion.a
          href={personalInfo.resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 group"
        >
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-700 dark:text-[#888] dark:group-hover:text-[#bbb] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Resume
          </span>
          <span className="flex items-center justify-center w-8 h-8 border border-zinc-200 group-hover:border-zinc-300 dark:border-[#1f1f1f] dark:group-hover:border-[#333] transition-colors duration-300">
            <Download size={12} className="text-zinc-500 group-hover:text-zinc-700 dark:text-[#888] dark:group-hover:text-[#bbb] transition-colors" />
          </span>
        </motion.a>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: d(2.55), duration: 0.7 }}
        className="flex flex-col gap-3.5"
      >
        {socials.map(({ icon, href, label }) => (
          <SocialLink key={label} icon={icon} href={href} label={label} />
        ))}
      </motion.div>
    </div>
  );
}