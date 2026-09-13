import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { SCHOOL } from '../../data/schoolContent';
import toast from 'react-hot-toast';

const DETAILS = [
  { icon: FiMapPin, label: 'Address', value: SCHOOL.address },
  { icon: FiPhone, label: 'Phone', value: SCHOOL.phone },
  { icon: FiMail, label: 'Email', value: SCHOOL.email },
  { icon: FiClock, label: 'Office Timings', value: SCHOOL.officeTimings },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thanks! We will get back to you soon.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-container py-24">
      <div className="grid gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Contact</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Get in touch</h2>
          <p className="mt-4 text-slate-600">
            Have questions about admissions or campus life? We would love to hear from you.
          </p>

          <div className="mt-9 space-y-5">
            {DETAILS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-slate-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-surface rounded-3xl p-8"
        >
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-600">Full Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
                placeholder="Tell us how we can help..."
              />
            </div>
            <motion.button
              type="submit"
              data-cursor-hover
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
            >
              Send Message <FiSend size={16} />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
