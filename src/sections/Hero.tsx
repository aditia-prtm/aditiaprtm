import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SectionBackground, MarqueeStrip, CaseFile } from '../components/common';
import { HeroBio, ScrollIndicator } from '../components/features/hero';

/**
 * Hero Section
 * Primary viewport introduction with animated typography, bio, status dossier, and ambient lighting.
 *
 * Delay strategy:
 *  - First render: full delays (e.g. 1.3s–3.2s) to wait out the ~1s loading screen.
 *  - Subsequent in-view entries: delays are reduced by LOADING_OFFSET so animation
 *    starts immediately instead of waiting ~1 second before playing.
 */

/** How many seconds to shave off every delay on re-visits (matches loading screen duration). */
export const LOADING_OFFSET = 1.3;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-5%' });

  /**
   * isFirstRender: true only on the very first time this component mounts.
   * We flip it to false as soon as isInView fires for the second time
   * (i.e. user scrolled away and came back).
   */
  const inViewCount = useRef(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isInView) {
      inViewCount.current += 1;
      if (inViewCount.current >= 2) {
        setIsFirstRender(false);
      }
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  /** Returns a delay reduced by LOADING_OFFSET on re-visits, floored at 0. */
  const d = (base: number) => (isFirstRender ? base : Math.max(0, base - LOADING_OFFSET));

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-white dark:bg-[#080808] pt-[70px]"
    >
      {/* Background grid and glow pools */}
      <SectionBackground glowPosition="both" />

      {/* Marquee ticker */}
      <MarqueeStrip />

      {/* Main content grid */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1300px] mx-auto px-8 md:px-16 pt-5 pb-16 grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">
          {/* Left panel: intro, bio, stats, and CTAs */}
          <HeroBio isInView={isInView} isFirstRender={isFirstRender} />

          {/* Right panel: year stamp, dossier case file, and quote */}
          <div className="flex flex-col gap-6 mt-2 lg:mt-12">
            {/* Year stamp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: d(1.7), duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#555]">
                {new Date().getFullYear()}
              </div>
              <div className="flex-1 h-px bg-zinc-100 dark:bg-[#141414]" />
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#555]">
                v2.0
              </div>
            </motion.div>

            {/* Case file */}
            <CaseFile isInView={isInView} isFirstRender={isFirstRender} />

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: d(2.6), duration: 0.8 }}
              className="border-l-2 border-[#b8860b]/20 dark:border-[#d4af37]/18 pl-4"
            >
              <p className="italic font-serif text-xs text-zinc-500 dark:text-[#888] leading-relaxed">
                "Clean code always looks like it was written by someone who cares."
              </p>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-400 dark:text-[#666] mt-2 block">
                — Robert C. Martin
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator isInView={isInView} isFirstRender={isFirstRender} />
    </section>
  );
}