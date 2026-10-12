'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Download, ExternalLink, ChevronLeft, FileText, Eye } from 'lucide-react';
import { SectionBackground } from '@/components/common';

const CV_PATH = '/CV%20M.%20Aditia%20Putra%20Pratama.pdf';
const CV_FILENAME = 'CV M. Aditia Putra Pratama.pdf';

export default function CvSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-5%' });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#fffdf8] dark:bg-[#080808]"
    >
      {/* Ambient background grid & glow */}
      <SectionBackground glowPosition="both" />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-10 md:px-16">
        {/* Navigation & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          {/* Back button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-fit mb-6"
          >
            <Link
              href="/"
              className="
                inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                border border-zinc-300/80 bg-white text-zinc-800 shadow-sm
                hover:border-zinc-400 hover:bg-zinc-50
                dark:border-[#222] dark:bg-[#111] dark:text-[#f0ede6]
                dark:hover:border-zinc-700 dark:hover:bg-[#181818]
                font-outfit text-xs sm:text-sm font-semibold tracking-wider
                transition-all duration-200 group
              "
            >
              <ChevronLeft
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:rotate-[-360deg] text-[#b8860b] dark:text-[#d4af37]"
              />
              <span>BACK</span>
            </Link>
          </motion.div>

          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-[#1a1a1a]">
            <div>
              <h1
                className="font-outfit font-black leading-[0.95] tracking-[-0.02em] text-zinc-900 dark:text-[#f0ede6]"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                }}
              >
                Aditia's <span className="gold-gradient-text">Resume</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
                Informatics Engineering student & Developer. Complete overview of my education, technical skills, projects, and achievements.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href={CV_PATH}
                download={CV_FILENAME}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-[#b8860b] dark:bg-[#d4af37] text-white dark:text-[#080808]
                  font-outfit font-semibold text-sm
                  shadow-lg shadow-[#b8860b]/20 dark:shadow-[#d4af37]/20
                  hover:opacity-95 transition-all duration-200
                "
              >
                <Download size={15} strokeWidth={2.4} />
                <span>Download CV</span>
              </motion.a>

              <motion.a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                  border border-zinc-300 dark:border-[#222]
                  bg-white dark:bg-[#111] text-zinc-800 dark:text-[#f0ede6]
                  hover:bg-zinc-50 dark:hover:bg-[#1a1a1a]
                  font-outfit font-semibold text-sm transition-all duration-200
                "
              >
                <ExternalLink size={15} strokeWidth={2} />
                <span>Open in Tab</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* PDF Viewer Frame */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="
            relative rounded-2xl sm:rounded-3xl overflow-hidden
            border border-zinc-200/90 dark:border-[#1e1e1e]
            bg-white dark:bg-[#0c0c0c]
            shadow-2xl shadow-black/5 dark:shadow-black/50
          "
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-200/80 dark:border-[#1a1a1a] bg-zinc-50/80 dark:bg-[#111111]/80 backdrop-blur-md">
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 dark:bg-amber-500/70 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 dark:bg-emerald-500/70 inline-block" />
            </div>

            {/* Document Title */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate max-w-[260px] sm:max-w-md">
              <FileText size={13} className="text-[#b8860b] dark:text-[#d4af37] shrink-0" />
              <span className="truncate">{CV_FILENAME}</span>
            </div>

            {/* Right Meta */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-500 dark:text-zinc-500 border border-zinc-200 dark:border-[#222]">
                <Eye size={10} /> PDF Viewer
              </span>
            </div>
          </div>

          {/* Embedded Viewer */}
          <div className="relative w-full h-[76vh] md:h-[84vh] bg-[#525659] dark:bg-[#202124]">
            <object
              data={`${CV_PATH}#view=FitH`}
              type="application/pdf"
              className="w-full h-full border-0"
              title="Curriculum Vitae - M. Aditia Putra Pratama"
            >
              {/* Fallback for browsers / devices that do not support inline PDF object */}
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-zinc-50 dark:bg-[#0c0c0c] text-zinc-800 dark:text-zinc-200">
                <FileText size={48} className="text-[#b8860b] dark:text-[#d4af37] mb-4" />
                <h3 className="text-xl font-bold font-outfit mb-2">PDF Preview</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mb-6">
                  Perangkat atau browser Anda tidak mendukung pratinjau dokumen langsung di dalam halaman ini. Silakan buka atau unduh file langsung di bawah ini.
                </p>
                <div className="flex gap-3">
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#b8860b] text-white text-sm font-semibold hover:opacity-95"
                  >
                    Buka PDF
                  </a>
                  <a
                    href={CV_PATH}
                    download={CV_FILENAME}
                    className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-[#222] text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-[#1a1a1a]"
                  >
                    Unduh PDF
                  </a>
                </div>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
