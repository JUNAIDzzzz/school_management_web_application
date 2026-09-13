import { useEffect, useState } from 'react';
import { FiDownload, FiPrinter, FiUsers, FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHeader from '../components/dashboard/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import { SelectFilter } from '../components/dashboard/Toolbar';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getMonthlyReport } from '../services/reportService';
import { MONTHS, CURRENT_MONTH, CURRENT_YEAR } from '../data/constants';

const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

const downloadCsv = (report) => {
  const header = ['Class', 'Total Students', 'Paid', 'Unpaid', 'Expected Fees', 'Collected Fees', 'Pending Fees'];
  const rows = report.classSummary.map((c) => [
    c.class.name, c.totalStudents, c.paidStudents, c.unpaidStudents, c.expectedFees, c.collectedFees, c.pendingFees,
  ]);
  const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `monthly-report-${report.month}-${report.year}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export default function ReportsPage() {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMonthlyReport({ month, year: CURRENT_YEAR })
      .then(setReport)
      .catch(() => toast.error('Failed to load report'))
      .finally(() => setLoading(false));
  }, [month]);

  const cards = report
    ? [
        { icon: FiUsers, label: 'Total Students', value: report.totalStudents, tone: 'brand' },
        { icon: FiTrendingUp, label: 'Expected Fees', value: formatCurrency(report.expectedFees), tone: 'slate' },
        { icon: FiCheckCircle, label: 'Collected Fees', value: formatCurrency(report.collectedFees), tone: 'emerald' },
        { icon: FiClock, label: 'Pending Fees', value: formatCurrency(report.pendingFees), tone: 'amber' },
      ]
    : [];

  return (
    <div>
      <PageHeader
        title="Monthly Report"
        description="Class-wise fee collection summary for the selected month."
        action={
          <div className="flex items-center gap-3 print:hidden">
            <SelectFilter label="Month" value={month} onChange={setMonth} options={MONTHS.map((m) => ({ value: m, label: m }))} />
            <Button variant="secondary" onClick={() => window.print()}>
              <FiPrinter size={15} /> Print
            </Button>
            <Button variant="secondary" onClick={() => report && downloadCsv(report)} disabled={!report}>
              <FiDownload size={15} /> Export CSV
            </Button>
          </div>
        }
      />

      {loading || !report ? (
        <LoadingSpinner label="Generating report..." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, idx) => (
              <StatCard key={card.label} {...card} delay={idx * 0.05} />
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="font-display text-base font-semibold text-slate-800">
                Class-wise Summary — {report.month} {report.year}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    {['Class', 'Total', 'Paid', 'Unpaid', 'Expected', 'Collected', 'Pending'].map((h) => (
                      <th key={h} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.classSummary.map((row) => (
                    <tr key={row.class.id} className="border-b border-slate-50 last:border-0 hover:bg-brand-50/40">
                      <td className="px-5 py-3 font-medium text-slate-800">{row.class.name}</td>
                      <td className="px-5 py-3 text-slate-600">{row.totalStudents}</td>
                      <td className="px-5 py-3 text-emerald-600">{row.paidStudents}</td>
                      <td className="px-5 py-3 text-rose-600">{row.unpaidStudents}</td>
                      <td className="px-5 py-3 text-slate-600">{formatCurrency(row.expectedFees)}</td>
                      <td className="px-5 py-3 text-slate-600">{formatCurrency(row.collectedFees)}</td>
                      <td className="px-5 py-3 text-slate-600">{formatCurrency(row.pendingFees)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
