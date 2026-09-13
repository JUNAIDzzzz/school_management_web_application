const STYLES = {
  paid: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  unpaid: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  inactive: 'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
  neutral: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
};

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[tone] || STYLES.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
