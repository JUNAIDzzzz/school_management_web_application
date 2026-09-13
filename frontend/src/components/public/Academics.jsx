import { motion } from 'framer-motion';
import { CLASS_HIGHLIGHTS } from '../../data/schoolContent';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function Academics() {
  return (
    <section id="academics" className="bg-slate-50/70 py-24">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Academics</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Classes 1 through 10
          </h2>
          <p className="mt-4 text-slate-600">
            A progressive curriculum designed to grow with every learner, from foundational years to
            board-exam readiness.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
        >
          {CLASS_HIGHLIGHTS.map((cls) => (
            <motion.div
              key={cls.number}
              variants={item}
              whileHover={{ y: -6 }}
              data-cursor-hover
              className="group cursor-pointer rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand-900/5"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white transition-transform group-hover:scale-110">
                {cls.number}
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-slate-800">{cls.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{cls.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
