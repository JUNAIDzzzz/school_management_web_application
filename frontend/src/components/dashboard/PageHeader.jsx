import { motion } from 'framer-motion';

export default function PageHeader({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-wrap items-center justify-between gap-4"
    >
      <div>
        <h2 className="font-display text-xl font-bold text-slate-800 sm:text-2xl">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
