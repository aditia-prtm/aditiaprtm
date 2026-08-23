import { motion } from 'framer-motion';
import { personalInfo } from '../../../data/portfolio';

/**
 * HeroName
 * Staggered animated typography for first name and gold-accented last name.
 */
export default function HeroName() {
  const firstName = (personalInfo.name.split(' ')[0] ?? '').split('');
  const lastName = (personalInfo.name.split(' ')[1] ?? '').split('');

  return (
    <h1
      className="font-black leading-[0.88] tracking-[-0.02em] mb-8"
      style={{ fontSize: 'clamp(3.4rem, 7.5vw, 6rem)', fontFamily: "'Playfair Display', serif" }}
      aria-label={personalInfo.name}
    >
      {/* First name */}
      <span className="block overflow-hidden">
        {firstName.map((ch, i) => (
          <motion.span
            key={`first-${i}`}
            className="inline-block text-zinc-900 dark:text-[#f0ede6]"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.45 + i * 0.045 }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </span>

      {/* Last name — gold gradient text */}
      <span className="block overflow-hidden">
        {lastName.map((ch, i) => (
          <motion.span
            key={`last-${i}`}
            className="inline-block name-gold"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.55 + (firstName.length + i) * 0.042,
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
