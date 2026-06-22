import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const socials = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github, color: '#ffffff' },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin, color: '#0A66C2' },
  { icon: Twitter, label: 'Twitter', href: personalInfo.social.twitter, color: '#1DA1F2' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-8%' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate send (wire up to your backend / Formspree / EmailJS)
    setTimeout(() => setStatus('sent'), 1500);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 glow-orb dark:bg-violet-600/10 bg-violet-400/6 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-72 h-72 glow-orb dark:bg-cyan-600/8 bg-cyan-400/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="font-mono text-sm text-violet-500 dark:text-violet-400 mb-3 block tracking-widest uppercase">
            05. contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Let's <span className="gradient-text">work together</span>
          </h2>
          <p className="max-w-md mx-auto dark:text-gray-400 text-gray-500 text-base">
            Whether it's a full-time role, a freelance engagement, or just a good conversation about tech — my inbox is open.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
        >

          {/* Left panel – info */}
          <motion.div variants={fadeUp} className="lg:col-span-2 flex flex-col gap-6">

            {/* Email card */}
            <div className="p-6 rounded-2xl dark:bg-zinc-950 bg-white dark:border-white/6 border-black/6 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl dark:bg-violet-500/15 bg-violet-50 flex items-center justify-center">
                  <Mail size={18} className="text-violet-500" />
                </div>
                <div>
                  <p className="text-xs dark:text-gray-500 text-gray-400 mb-0.5">Email me at</p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-medium dark:text-white text-gray-900 dark:hover:text-violet-400 hover:text-violet-600 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs dark:text-gray-500 text-gray-400">
                <MapPin size={12} />
                {personalInfo.location} · Typically replies within 24h
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl dark:bg-emerald-500/5 bg-emerald-50 dark:border-emerald-500/15 border-emerald-100 border">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Available for work</span>
              </div>
              <p className="text-xs dark:text-gray-400 text-gray-500 leading-relaxed">
                Currently open to full-time roles and select freelance projects. Looking for teams that care about craft.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono dark:text-gray-600 text-gray-400 uppercase tracking-widest mb-4">
                Find me online
              </p>
              <div className="flex flex-col gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between px-4 py-3 rounded-xl dark:bg-white/4 bg-black/3 dark:border-white/5 border-black/5 border dark:hover:bg-white/8 hover:bg-black/6 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className="dark:text-gray-400 text-gray-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors" />
                      <span className="text-sm font-medium dark:text-gray-300 text-gray-700">{label}</span>
                    </div>
                    <ArrowUpRight size={13} className="dark:text-gray-600 text-gray-400 group-hover:dark:text-violet-400 group-hover:text-violet-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right panel – form */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl dark:bg-zinc-950 bg-white dark:border-white/6 border-black/6 border">

              {status === 'sent' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="text-5xl">🎉</div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900">Message sent!</h3>
                  <p className="dark:text-gray-400 text-gray-500 text-sm">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-medium dark:bg-white/8 bg-black/5 dark:text-white text-gray-800 dark:hover:bg-white/14 hover:bg-black/10 transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wide">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="px-4 py-3 rounded-xl text-sm dark:bg-white/5 bg-black/3 dark:border-white/8 border-black/8 border dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@company.io"
                        className="px-4 py-3 rounded-xl text-sm dark:bg-white/5 bg-black/3 dark:border-white/8 border-black/8 border dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell me about your project, role, or just say hi..."
                      className="px-4 py-3 rounded-xl text-sm dark:bg-white/5 bg-black/3 dark:border-white/8 border-black/8 border dark:text-white text-gray-900 dark:placeholder-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20 disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
