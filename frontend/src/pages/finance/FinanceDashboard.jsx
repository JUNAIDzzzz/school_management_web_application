import { useEffect, useState } from 'react';
import { FiUsers, FiTrendingUp, FiCheckCircle, FiClock, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHeader from '../../components/dashboard/PageHeader';
import StatCard from '../../components/dashboard/StatCard';
import { SelectFilter } from '../../components/dashboard/Toolbar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getFinanceDashboard } from '../../services/dashboardService';
import { useAuth } from '../../context/AuthContext';
import { MONTHS, CURRENT_MONTH } from '../../data/constants';

export default function FinanceDashboard() {
  const { user } = useAuth();
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFinanceDashboard({ month })
      .then(setStats)
      .catch(() => toast.error('Failed to load dashboard stats'))
      .finally(() => setLoading(false));
  }, [month]);

  const cards = stats
    ? [
        { icon: FiUsers, label: 'Total Students', value: stats.totalStudents, tone: 'brand' },
        { icon: FiTrendingUp, label: 'Expected Fees', value: `₹${stats.expectedFees.toLocaleString('en-IN')}`, tone: 'slate' },
        { icon: FiCheckCircle, label: 'Collected Fees', value: `₹${stats.collectedFees.toLocaleString('en-IN')}`, tone: 'emerald' },
        { icon: FiClock, label: 'Pending Fees', value: `₹${stats.pendingFees.toLocaleString('en-IN')}`, tone: 'amber' },
        { icon: FiCheckSquare, label: 'Paid Students', value: stats.paidStudents, tone: 'emerald' },
        { icon: FiXSquare, label: 'Unpaid Students', value: stats.unpaidStudents, tone: 'rose' },
      ]
    : [];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]}`}
        description="Track fee collection across the school."
        action={
          <SelectFilter label="Month" value={month} onChange={setMonth} options={MONTHS.map((m) => ({ value: m, label: m }))} />
        }
      />
      {loading ? (
        <LoadingSpinner label="Loading dashboard..." />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <StatCard key={card.label} {...card} delay={idx * 0.05} />
          ))}
        </div>
      )}
    </div>
  );
}
