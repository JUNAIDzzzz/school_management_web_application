import { motion } from 'framer-motion';

const TONES = {
  brand: 'bg-brand-50 text-brand-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-600',
  slate: 'bg-slate-100 text-slate-600',
};

export default function StatCard({ icon: Icon, label, value, tone = 'brand', delay = 0, suffix }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-slate-800">
            {value}
            {suffix && <span className="ml-1 text-sm font-medium text-slate-400">{suffix}</span>}
          </p>
        </div>
        {Icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONES[tone]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
