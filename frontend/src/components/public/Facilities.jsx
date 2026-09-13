import { motion } from 'framer-motion';
import { FiMonitor, FiBook, FiCpu, FiActivity, FiHome } from 'react-icons/fi';
import { GiChemicalDrop } from 'react-icons/gi';
import { FACILITIES } from '../../data/schoolContent';

const ICONS = {
  monitor: FiMonitor,
  book: FiBook,
  cpu: FiCpu,
  flask: GiChemicalDrop,
  activity: FiActivity,
  home: FiHome,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Facilities() {
  return (
    <section id="facilities" className="section-container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Facilities</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Everything students need to thrive
        </h2>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FACILITIES.map((facility) => {
          const Icon = ICONS[facility.icon] || FiMonitor;
          return (
            <motion.div
              key={facility.title}
              variants={item}
              whileHover={{ y: -8, boxShadow: '0 20px 40px -20px rgba(30,58,138,0.25)' }}
              data-cursor-hover
              className="rounded-2xl border border-slate-100 bg-white p-7 transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-800">{facility.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{facility.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
