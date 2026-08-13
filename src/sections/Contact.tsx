// Contact.tsx — matched to Hero.tsx design system, layout reworked to "case file" pattern

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Send, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

// ─── Labeled rule (identik dengan eyebrow di Hero) ────────────────
function LabeledRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-8 h-px bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0" />
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-[#888]">
        {label}
      </span>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-[#1f1f1f]" />
    </div>
  );
}

// ─── File-style panel header (mirrors CaseFile / SKILLS.MAP) ─────
function FileHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-[#1f1f1f] px-5 py-3">
      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400 dark:text-[#666]">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-[#1f1f1f]" />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
      </div>
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
      <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500 dark:text-[#777]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  px-4 py-3 text-sm transition-all
  border border-zinc-200 bg-white
  text-zinc-900 placeholder-zinc-400
  focus:outline-none focus:ring-2 focus:ring-[#b8860b]/25 focus:border-[#b8860b]/60
  dark:border-[#1f1f1f] dark:bg-[#080808]
  dark:text-[#f0ede6] dark:placeholder-[#444]
  dark:focus:ring-[#d4af37]/15 dark:focus:border-[#d4af37]/50
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

  const infoRows = [
    { key: 'EMAIL',     val: personalInfo.email,        href: `mailto:${personalInfo.email}`, accent: true },
    { key: 'LOCATION',  val: personalInfo.location,      accent: false },
    { key: 'REPLY TIME', val: 'Within 24 hours',         accent: false },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden bg-white dark:bg-[#080808]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@300;400&display=swap');

        .contact-grid-bg {
          background-image:
            linear-gradient(to right, #00000008 1px, transparent 1px),
            linear-gradient(to bottom, #00000008 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .dark .contact-grid-bg {
          background-image:
            linear-gradient(to right, #ffffff05 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff05 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .contact-gold-text {
          background: linear-gradient(135deg, #b8860b 0%, #d4a017 50%, #9a7209 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .dark .contact-gold-text {
          background: linear-gradient(135deg, #d4af37 0%, #f5e177 50%, #c9a227 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background grid — same rhythm as Hero */}
      <div className="absolute inset-0 contact-grid-bg pointer-events-none" />

      {/* Background gradient pools — warm gold, mirrors Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="dark:hidden" style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.04) 0%, transparent 65%)',
        }} />
        <div className="dark:hidden" style={{
          position: 'absolute', top: '15%', left: '-5%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,134,11,0.03) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', bottom: '-10%', right: '-8%',
          width: 640, height: 640, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
        }} />
        <div className="hidden dark:block" style={{
          position: 'absolute', top: '10%', left: '-8%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)',
        }} />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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

        {/* ── Two-column layout ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start"
        >

          {/* ── LEFT PANEL — consolidated case file ── */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-6">

            {/* Contact file — mirrors Hero's CaseFile */}
            <div className="border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e]">
              <FileHeader label="CONTACT.FILE" />

              {infoRows.map(({ key, val, href, accent }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-6 border-b border-zinc-100 dark:border-[#131313] px-5 py-4 last:border-0 group hover:bg-zinc-100 dark:hover:bg-[#111] transition-colors"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-400 dark:text-[#555] flex-shrink-0 mt-0.5 w-24">
                    {key}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="font-mono text-xs leading-relaxed text-[#b8860b] dark:text-[#d4af37] hover:underline break-all"
                    >
                      {val}
                    </a>
                  ) : (
                    <span className="font-mono text-xs leading-relaxed text-zinc-500 dark:text-[#8a8a8a] group-hover:text-zinc-700 dark:group-hover:text-[#bbb] transition-colors">
                      {val}
                    </span>
                  )}
                </motion.div>
              ))}

              {/* Footer — availability status */}
              <div className="flex items-center gap-2 px-5 py-3 border-t border-zinc-200 dark:border-[#1f1f1f]">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#b8860b] dark:bg-[#d4af37] flex-shrink-0"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500 dark:text-[#888]">
                  {personalInfo.availability}
                </span>
              </div>
            </div>

            {/* Quote-style personal line — echoes Hero's quote block */}
            <div className="border-l-2 border-[#b8860b]/25 dark:border-[#d4af37]/20 pl-4">
              <p
                className="italic text-sm text-zinc-600 dark:text-[#999] leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Got an idea worth building? Let's talk it through.
              </p>
            </div>

            {/* Social links */}
            <div>
              <div className="mb-4">
                <LabeledRule label="Find me online" />
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
                    className="flex items-center justify-between px-4 py-3 group
                      border border-zinc-200 bg-zinc-50 text-zinc-600
                      hover:border-[#b8860b]/40 hover:bg-[#b8860b]/[0.04] hover:text-[#b8860b]
                      dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#888]
                      dark:hover:border-[#d4af37]/35 dark:hover:bg-[#d4af37]/[0.05] dark:hover:text-[#d4af37]
                      transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={15} strokeWidth={1.7} />
                      <span
                        className="text-[11px] tracking-[0.1em] uppercase font-medium"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {label}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={2}
                      className="text-zinc-400 dark:text-[#555]
                        group-hover:text-[#b8860b] dark:group-hover:text-[#d4af37]
                        transition-colors duration-200"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL — form ── */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <div className="border border-zinc-200 bg-zinc-50 dark:border-[#1f1f1f] dark:bg-[#0e0e0e]">
              <FileHeader label="NEW_MESSAGE.TSX" />

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
                        className="font-black tracking-[-0.01em] text-zinc-900 dark:text-[#f0ede6] mb-2"
                        style={{
                          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        Message sent!
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-[#8a8a8a]">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <motion.button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="mt-1 px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors
                        border border-zinc-200 bg-white text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b]
                        dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
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

                    {/* Submit button — primary gold CTA */}
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 py-3.5 font-mono text-[12px] tracking-[0.15em] uppercase transition-colors disabled:opacity-60
                        bg-[#b8860b] text-white hover:bg-[#9a7209]
                        dark:bg-[#d4af37] dark:text-[#080808] dark:hover:bg-[#c9a227]"
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