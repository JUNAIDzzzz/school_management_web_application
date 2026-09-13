import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUsers, FiUserCheck, FiDollarSign, FiFileText, FiMenu, FiX, FiLogOut, FiList,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/admin/students', label: 'Students', icon: FiUsers },
  { to: '/admin/finance-users', label: 'Finance Users', icon: FiUserCheck },
  { to: '/admin/fees', label: 'Fee Overview', icon: FiDollarSign },
  { to: '/admin/reports', label: 'Reports', icon: FiFileText },
];

const FINANCE_LINKS = [
  { to: '/finance/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/finance/students', label: 'Student Fee List', icon: FiList },
  { to: '/finance/fees', label: 'Fee Management', icon: FiDollarSign },
  { to: '/finance/reports', label: 'Reports', icon: FiFileText },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const links = user?.role === 'admin' ? ADMIN_LINKS : FINANCE_LINKS;

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white">
          B
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-white">Brightfield</p>
          <p className="text-xs capitalize text-slate-400">{user?.role} Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-xl bg-brand-600/90"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon size={18} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <FiLogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-slate-950 lg:block">{SidebarContent}</aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial="closed" animate="open" exit="closed">
            <motion.div
              className="absolute inset-0 bg-slate-900/60"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="relative h-full w-72 bg-slate-950"
              variants={{ open: { x: 0 }, closed: { x: '-100%' } }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-6 text-slate-400 hover:text-white"
              >
                <FiX size={22} />
              </button>
              {SidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-5 py-4 backdrop-blur lg:px-8">
          <button className="text-slate-600 lg:hidden" onClick={() => setMobileOpen(true)}>
            <FiMenu size={22} />
          </button>
          <h1 className="font-display text-lg font-semibold text-slate-800 lg:text-xl">
            {links.find((l) => l.to === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="w-6 lg:hidden" />
        </header>

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
