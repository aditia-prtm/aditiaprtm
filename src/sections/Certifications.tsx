'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, X, Eye, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { certifications } from '../data/portfolio';
import { Certification } from '../types';
import { LabeledRule, SectionBackground } from '../components/common';
import { getLenis } from '../lib/lenis';

const categories = ['All', 'Competition', 'Award', 'Certification', 'Course'];

const getThumbnailSrc = (image: string) =>
  `/certifications-pict/thumbnails/${image.replace(/\.[^.]+$/, '.webp')}`;

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-5%' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  // Prevent the page behind the lightbox from scrolling while it is open.
  useEffect(() => {
    if (!activeCert) return;

    const lenis = getLenis();
    lenis?.stop();

    return () => lenis?.start();
  }, [activeCert]);

  const filteredCerts =
    selectedCategory === 'All'
      ? certifications
      : certifications.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());
  const visibleCerts = showAllCerts ? filteredCerts : filteredCerts.slice(0, 3);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative pt-24 sm:pt-28 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-[#fffdf8] dark:bg-[#080808]"
    >
      <SectionBackground glowPosition="both" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-8 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-outfit font-black leading-[0.95] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
              }}
            >
              Licenses &amp; <span className="gold-gradient-text">Certifications</span>
            </h2>

            <p className="font-outfit max-w-sm text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-[#8a8a8a] sm:text-right">
              Official certificates, competitive programming awards, and verified achievements.
            </p>
          </div>
        </motion.div>

        {/* Minimalist Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? certifications.length
                : certifications.filter((c) => c.category.toLowerCase() === cat.toLowerCase()).length;

            if (cat !== 'All' && count === 0) return null;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowAllCerts(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#b8860b] text-white shadow-sm shadow-[#b8860b]/25 dark:bg-[#d4af37] dark:text-black font-bold'
                    : 'bg-white/80 dark:bg-[#111] text-zinc-600 dark:text-[#888] border border-zinc-200 dark:border-[#1f1f1f] hover:border-[#b8860b]/40 dark:hover:border-[#d4af37]/40 hover:text-zinc-900 dark:hover:text-[#eee]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-black/20 text-white dark:bg-black/20 dark:text-black'
                      : 'bg-zinc-100 dark:bg-[#1c1c1c] text-zinc-500 dark:text-[#777]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Minimalist Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleCerts.map((cert, index) => {
              const isHonor = cert.category === 'Competition' || cert.category === 'Award';

              return (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveCert(cert)}
                  className="group cursor-pointer h-full"
                >
                  <div className="h-full rounded-2xl border border-zinc-300/90 bg-white/90 overflow-hidden shadow-[0_10px_28px_rgba(24,24,27,0.05)] backdrop-blur-sm dark:border-[#1f1f1f] dark:bg-[#0c0c0c] dark:shadow-none hover:border-[#b8860b]/60 dark:hover:border-[#d4af37]/50 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between">
                    {/* Top Image Preview */}
                    <div className="relative h-44 sm:h-48 bg-zinc-100 dark:bg-[#141414] overflow-hidden">
                      {cert.image ? (
                        <img
                          src={getThumbnailSrc(cert.image)}
                          alt={cert.title}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            // Fallback if user hasn't added this specific image file yet
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            if (target.nextElementSibling) {
                              (target.nextElementSibling as HTMLElement).style.display = 'flex';
                            }
                          }}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : null}

                      {/* Fallback graphic placeholder */}
                      <div
                        style={{ display: cert.image ? 'none' : 'flex' }}
                        className={`w-full h-full bg-gradient-to-br ${
                          cert.gradient || 'from-[#8a6808] via-[#b8860b] to-[#d4af37]'
                        } flex flex-col items-center justify-center p-4 text-center relative`}
                      >
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="relative z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white mb-2 shadow-inner">
                          {isHonor ? <Trophy size={22} /> : <Award size={22} />}
                        </div>
                        <span className="relative z-10 font-outfit text-xs font-semibold text-white/90 max-w-[200px] line-clamp-1">
                          {cert.title}
                        </span>
                      </div>

                      {/* Category Tag Overlay */}
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm ${
                            isHonor
                              ? 'bg-amber-500/90 text-white dark:bg-[#d4af37]/90 dark:text-black'
                              : 'bg-zinc-900/80 text-white dark:bg-white/90 dark:text-black'
                          }`}
                        >
                          {cert.category}
                        </span>
                      </div>

                      {/* Year badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/55 text-white/90 backdrop-blur-md">
                          {cert.issueDate}
                        </span>
                      </div>

                      {/* Hover eye overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-1.5 text-white text-xs font-semibold">
                        <Eye size={16} />
                        <span>Preview Certificate</span>
                      </div>
                    </div>

                    {/* Minimalist Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="font-outfit font-bold text-sm sm:text-base text-zinc-900 dark:text-[#f0ede6] group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37] transition-colors line-clamp-2 leading-snug mb-1.5">
                          {cert.title}
                        </h3>

                        {/* Issuer */}
                        <p className="text-xs text-zinc-500 dark:text-[#888] line-clamp-1">
                          {cert.issuer}
                        </p>
                      </div>

                      {/* Bottom Link / Quick action */}
                      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-[#1a1a1a] flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400 dark:text-[#666] font-mono">
                          Verified Credential
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#b8860b] dark:text-[#d4af37] group-hover:underline">
                          <span>Detail</span>
                          <ExternalLink size={12} strokeWidth={2.2} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCerts.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllCerts((isExpanded) => !isExpanded)}
              aria-expanded={showAllCerts}
              className="rounded-xl border border-[#b8860b]/40 px-5 py-2.5 text-xs font-semibold tracking-wider text-[#a07409] transition-colors hover:bg-[#b8860b] hover:text-white dark:border-[#d4af37]/40 dark:text-[#d4af37] dark:hover:bg-[#d4af37] dark:hover:text-black"
            >
              {showAllCerts ? 'See less' : `See more (${filteredCerts.length - 3})`}
            </button>
          </div>
        )}
      </div>

      {/* Certificate Lightbox / Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-2xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex-col overflow-hidden rounded-2xl border border-zinc-300 bg-[#fffdf8] shadow-2xl dark:border-[#222] dark:bg-[#0e0e0e]"
            >
              {/* Modal Top Bar */}
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-200 px-4 py-3.5 sm:px-5 dark:border-[#1a1a1a]">
                <div className="flex min-w-0 items-start gap-2">
                  <Award size={16} className="mt-0.5 shrink-0 text-[#b8860b] dark:text-[#d4af37]" />
                  <span className="font-outfit break-words text-xs font-semibold leading-relaxed text-zinc-800 dark:text-[#ddd]">
                    {activeCert.title}
                  </span>
                </div>

                <button
                  onClick={() => setActiveCert(null)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-[#888] dark:hover:bg-[#1a1a1a] dark:hover:text-white"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-zinc-900">
                {activeCert.image ? (
                  <img
                    src={`/certifications-pict/${activeCert.image}`}
                    alt={activeCert.title}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                    className="w-full h-full object-contain"
                  />
                ) : null}

                {/* Fallback view if image not available */}
                <div
                  style={{ display: activeCert.image ? 'none' : 'flex' }}
                  className={`w-full h-full bg-gradient-to-br ${
                    activeCert.gradient || 'from-[#8a6808] via-[#b8860b] to-[#d4af37]'
                  } flex flex-col items-center justify-center p-8 text-center text-white`}
                >
                  <Award size={48} className="mb-3 text-white/90" />
                  <h4 className="font-outfit font-bold text-lg max-w-md">{activeCert.title}</h4>
                  <p className="text-xs text-white/80 mt-1">Issued by {activeCert.issuer}</p>
                </div>
              </div>

              {/* Modal Details Footer */}
              <div className="flex shrink-0 flex-col items-start justify-between gap-4 bg-zinc-50/70 p-4 sm:flex-row sm:items-center sm:p-5 dark:bg-[#121212]/70">
                <div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-[#f0ede6]">
                    {activeCert.issuer}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-[#777] font-mono mt-0.5">
                    Issued: {activeCert.issueDate} · Category: {activeCert.category}
                  </div>
                </div>

                {activeCert.credentialUrl && (
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#b8860b] text-white hover:bg-[#a07409] dark:bg-[#d4af37] dark:text-black dark:hover:bg-[#e2bf4b] transition-all shadow-sm"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={13} strokeWidth={2.2} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
