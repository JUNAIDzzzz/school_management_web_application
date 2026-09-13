import { motion } from 'framer-motion';
import { FiTarget, FiCompass } from 'react-icons/fi';
import { SCHOOL } from '../../data/schoolContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="section-container py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-square overflow-hidden rounded-3xl shadow-xl shadow-brand-900/10">
            <img
              src="/about.jpg"
              alt="Students learning together at Brightfield Public School"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">About Us</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            A community built on curiosity and care
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600">{SCHOOL.intro}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <FiCompass size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-800">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{SCHOOL.vision}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600">
                <FiTarget size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-slate-800">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{SCHOOL.mission}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
