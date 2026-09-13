import { useEffect, useState } from 'react';
import { FiUsers, FiGrid, FiUserCheck, FiCheckCircle, FiXCircle, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import PageHeader from '../../components/dashboard/PageHeader';
import StatCard from '../../components/dashboard/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getAdminDashboard } from '../../services/dashboardService';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminDashboard()
      .then(setStats)
      .catch(() => toast.error('Failed to load dashboard stats'));
  }, []);

  if (!stats) return <LoadingSpinner label="Loading dashboard..." />;

  const cards = [
    { icon: FiUsers, label: 'Total Students', value: stats.totalStudents, tone: 'brand' },
    { icon: FiGrid, label: 'Total Classes', value: stats.totalClasses, tone: 'slate' },
    { icon: FiUserCheck, label: 'Finance Users', value: stats.financeUsersCount, tone: 'amber' },
    { icon: FiCheckCircle, label: `Paid (${stats.month})`, value: stats.paidStudents, tone: 'emerald' },
    { icon: FiXCircle, label: `Unpaid (${stats.month})`, value: stats.unpaidStudents, tone: 'rose' },
    { icon: FiDollarSign, label: 'Total Fees Collected', value: `₹${stats.totalFeesCollected.toLocaleString('en-IN')}`, tone: 'brand' },
  ];

  return (
    <div>
      <PageHeader title={`Welcome back, ${user?.name?.split(' ')[0]}`} description="Here's what's happening at your school today." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <StatCard key={card.label} {...card} delay={idx * 0.05} />
        ))}
      </div>
    </div>
  );
}
