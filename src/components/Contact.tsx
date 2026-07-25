// Contact.tsx — upgraded to match Hero.tsx design system

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Send, MapPin, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

// ─── Noise overlay ────────────────────────────────────────────────
function NoiseOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.025] dark:opacity-[0.035] pointer-events-none z-0"
      aria-hidden
    >
      <filter id="noise-contact">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-contact)" />
    </svg>
  );
}

// ─── Labeled rule ─────────────────────────────────────────────────
function LabeledRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-500">
        {label}
      </span>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-white/6" />
    </div>
  );
}

// ─── Input field ──────────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-500">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  px-4 py-3 rounded-xl text-sm transition-all
  border border-zinc-200 bg-zinc-50
  text-zinc-900 placeholder-zinc-400
  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400
  dark:border-white/8 dark:bg-transparent
  dark:text-white dark:placeholder-zinc-600
  dark:focus:ring-[#C8FF57]/20 dark:focus:border-[#71a801]
`;

const socials = [
  { icon: Github,    label: 'GitHub',    href: personalInfo.social.github    },
  { icon: Linkedin,  label: 'LinkedIn',  href: personalInfo.social.linkedin  },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram },
];

// ─── Main component ────────────────────────────────────────────────
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-8%' });

  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden bg-white dark:bg-[#0A0A0F]"
    >
      <NoiseOverlay />

      {/* Background gradient pools */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', top: '15%', left: '-5%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,163,74,0.04) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: 640, height: 640, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,63,255,0.11) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '10%', left: '-8%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,255,87,0.06) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '50%', right: '30%',
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97,218,251,0.04) 0%, transparent 65%)',
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-18"
        >
          <div className="mb-6">
            <LabeledRule label="04 · contact" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h2
              className="font-black leading-[0.9] tracking-tighter text-zinc-900 dark:text-white"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 3.75rem)',
                fontFamily: "'Space Grotesk','Inter',sans-serif",
              }}
            >
              Let's{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #7c3aed 0%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                work together
              </span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-right">
              Freelance, collaboration, or just a good chat about tech — my inbox is open.
            </p>
          </div>
        </motion.div>

        {/* ── Two-column layout ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start"
        >

          {/* ── LEFT PANEL — info ── */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-4">

            {/* Email card — macOS style */}
            <div className="rounded-2xl overflow-hidden
              border border-zinc-200 bg-zinc-50
              dark:border-white/8 dark:bg-transparent"
            >
              {/* macOS dots */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-200 dark:border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest">
                  contact_info.json
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                {/* Email row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    border border-violet-200 bg-violet-50
                    dark:border-violet-500/20 dark:bg-violet-500/10"
                  >
                    <Mail size={15} strokeWidth={1.7} className="text-violet-500 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-0.5">
                      email me at
                    </p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-zinc-800 dark:text-zinc-100
                        hover:text-violet-600 dark:hover:text-[#C8FF57] transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="h-px bg-zinc-200 dark:bg-white/6" />

                {/* Location + reply time */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin size={12} strokeWidth={1.7} className="text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                  <span className="text-zinc-300 dark:text-white/15">·</span>
                  <span>Typically replies within 24h</span>
                </div>
              </div>
            </div>

            {/* Availability card */}
            <div className="flex items-start gap-3 p-5 rounded-2xl
              border border-emerald-200 bg-emerald-50
              dark:border-emerald-500/15 dark:bg-emerald-500/[0.04]"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0 mt-1.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                  {personalInfo.availability}
                </p>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Open for freelance projects. Ready to help build modern web apps using React, Next.js, and Tailwind CSS.
                </p>
              </div>
            </div>

            {/* Social links */}
            <div>
              <div className="mb-4">
                <LabeledRule label="find me online" />
              </div>
              <div className="flex flex-col gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl group
                      border border-zinc-200 bg-zinc-50 text-zinc-600
                      hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700
                      dark:border-white/8 dark:bg-transparent dark:text-zinc-400
                      dark:hover:border-[#71a801]/50 dark:hover:bg-[#70a80112] dark:hover:text-[#C8FF57]
                      transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={15} strokeWidth={1.7} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={2}
                      className="text-zinc-400 dark:text-zinc-600
                        group-hover:text-violet-500 dark:group-hover:text-[#C8FF57]
                        transition-colors duration-200"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL — form ── */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden
              border border-zinc-200 bg-zinc-50
              dark:border-white/8 dark:bg-transparent"
            >
              {/* macOS dots header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-200 dark:border-white/6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-500/70" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-widest">
                  new_message.tsx
                </span>
              </div>

              <div className="p-6 sm:p-8">
                {status === 'sent' ? (
                  <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center gap-5 py-14 text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 14, -8, 14, 0] }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="text-5xl select-none"
                    >
                      🎉
                    </motion.div>
                    <div>
                      <h3
                        className="font-black tracking-tight text-zinc-900 dark:text-white mb-2"
                        style={{
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                          fontFamily: "'Space Grotesk','Inter',sans-serif",
                        }}
                      >
                        Message sent!
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <motion.button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="mt-1 px-6 py-3 rounded-2xl font-semibold text-sm transition-colors
                        border border-zinc-200 bg-zinc-100 text-zinc-900 hover:border-violet-400 hover:text-violet-700
                        dark:border-white/10 dark:bg-transparent dark:hover:bg-[#70a80116] dark:text-[#71a801] dark:hover:border-[#71a801]"
                    >
                      Send another
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Name">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.io"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field label="Message">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell me about your project, role, or just say hi..."
                        className={`${inputClass} resize-none`}
                      />
                    </Field>

                    {/* Submit button — primary style dari Hero */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-colors disabled:opacity-60
                        bg-[#71a801] text-white hover:bg-[#5e8d01]
                        dark:bg-[#C8FF57] dark:text-[#0A0A0F] dark:hover:bg-[#d4ff6e]"
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={14} strokeWidth={2} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}