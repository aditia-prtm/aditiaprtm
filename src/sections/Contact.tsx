import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LabeledRule, SectionBackground } from '../components/common';
import { ContactInfo, ContactForm } from '../components/features/contact';

/**
 * Contact Section
 * Two-column layout with contact details dossier on the left and message form on the right.
 */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-8%' });

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      {/* Background ambient lighting */}
      <SectionBackground glowPosition="both" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-18"
        >
          <div className="mb-8">
            <LabeledRule label="04 · Contact" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className="font-black leading-[0.9] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Let's <span className="contact-gold-text">work together</span>
            </h2>
            <p
              className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-[#8a8a8a] sm:text-right"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Freelance, collaboration, or just a good chat about tech — my inbox is open.
            </p>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start"
        >
          {/* Left panel: dossier and online socials */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-2">
            <ContactInfo isInView={isInView} />
          </motion.div>

          {/* Right panel: contact message form */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}