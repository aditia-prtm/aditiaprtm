import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import FileHeader from '../../common/FileHeader';
import FormField from './FormField';

const inputClass = `
  px-4 py-3 text-sm transition-all
  border border-zinc-200 bg-white
  text-zinc-900 placeholder-zinc-400
  focus:outline-none focus:ring-2 focus:ring-[#b8860b]/25 focus:border-[#b8860b]/60
  dark:border-[#1f1f1f] dark:bg-[#080808]
  dark:text-[#f0ede6] dark:placeholder-[#444]
  dark:focus:ring-[#d4af37]/15 dark:focus:border-[#d4af37]/50
`;

/**
 * ContactForm
 * Interactive contact message form with controlled inputs and animated completion state.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1200);
  };

  const handleReset = () => {
    setStatus('idle');
    setForm({ name: '', email: '', message: '' });
  };

  return (
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
                className="font-black tracking-[-0.01em] font-serif text-zinc-900 dark:text-[#f0ede6] mb-2"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
              >
                Message sent!
              </h3>
              <p className="text-sm text-zinc-500 dark:text-[#8a8a8a]">
                Thanks for reaching out. I'll get back to you within 24 hours.
              </p>
            </div>
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="mt-1 px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors border border-zinc-200 bg-white text-zinc-800 hover:border-[#b8860b]/50 hover:text-[#b8860b] dark:border-[#1f1f1f] dark:bg-transparent dark:text-[#ccc] dark:hover:border-[#d4af37]/40 dark:hover:text-[#d4af37]"
            >
              Send another
            </motion.button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Name">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={inputClass}
                />
              </FormField>
              <FormField label="Email">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@company.io"
                  className={inputClass}
                />
              </FormField>
            </div>

            <FormField label="Message">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project, role, or just say hi..."
                className={`${inputClass} resize-none`}
              />
            </FormField>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-3.5 font-mono text-[12px] tracking-[0.15em] uppercase transition-colors disabled:opacity-60 bg-[#b8860b] text-white hover:bg-[#9a7209] dark:bg-[#d4af37] dark:text-[#080808] dark:hover:bg-[#c9a227]"
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
  );
}
