import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

export default function DataTable({ columns, rows, loading, emptyTitle = 'No records found', emptyDescription, emptyAction, keyField = '_id' }) {
  if (loading) return <LoadingSpinner />;
  if (!rows || rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((row, idx) => (
                <motion.tr
                  key={row[keyField] || idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: idx * 0.02 }}
                  className="border-b border-slate-50 transition-colors last:border-0 hover:bg-brand-50/40"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5 text-slate-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
