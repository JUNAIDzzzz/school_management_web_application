import { FiInbox } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon = FiInbox, title = 'Nothing here yet', description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <Icon size={26} />
      </div>
      <h3 className="text-base font-semibold text-slate-700">{title}</h3>
      {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
      {action}
    </motion.div>
  );
}
