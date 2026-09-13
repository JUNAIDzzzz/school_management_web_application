import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { SCHOOL } from '../../data/schoolContent';
import GradientPlaceholder from '../common/GradientPlaceholder';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl animate-float-slow" />
      <div className="absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-accent-400/30 blur-3xl animate-float-slow" />

      <div className="section-container grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-brand-200">
            Admissions open for {new Date().getFullYear() + 1}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {SCHOOL.name.split(' ')[0]}{' '}
            <span className="text-gradient animate-gradient-pan">{SCHOOL.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mt-5 text-lg font-medium text-brand-700">{SCHOOL.tagline}</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">{SCHOOL.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#contact"
              data-cursor-hover
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-600/25 transition hover:bg-brand-700"
            >
              Enquire Now <FiArrowRight />
            </motion.a>
            <motion.a
              href="#about"
              data-cursor-hover
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-300"
            >
              <FiPlay /> Discover More
            </motion.a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {[
              ['24+', 'Years of Excellence'],
              ['1200+', 'Happy Students'],
              ['98%', 'Board Results'],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-slate-900">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <GradientPlaceholder
            seed={0}
            className="aspect-[4/5] w-full rounded-[2rem] shadow-2xl shadow-brand-900/20"
          >
            <img
              src="/hero.jpg"
              alt="Brightfield Public School campus"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            <div className="relative flex h-full items-end p-8">
              <p className="font-display text-2xl font-semibold text-white/90">
                Learning that inspires, every single day.
              </p>
            </div>
          </GradientPlaceholder>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="glass-surface absolute -left-8 bottom-10 rounded-2xl px-5 py-4"
          >
            <p className="text-xs font-medium text-slate-500">Next Admission Cycle</p>
            <p className="font-display text-lg font-bold text-brand-700">Opens Soon</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
