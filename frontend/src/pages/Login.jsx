import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { SCHOOL } from '../data/schoolContent';

export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!loading && user) {
    const target = location.state?.from || (user.role === 'admin' ? '/admin/dashboard' : '/finance/dashboard');
    return <Navigate to={target} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const loggedInUser = await login(form.email, form.password);
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      navigate(loggedInUser.role === 'admin' ? '/admin/dashboard' : '/finance/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand-600/30 blur-3xl animate-float-slow" />
      <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl animate-float-slow" />

      <Link
        to="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
      >
        <FiArrowLeft /> Back to website
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 font-display text-lg font-bold text-white">
            B
          </span>
          <span className="font-display text-lg font-semibold text-white">{SCHOOL.name}</span>
        </div>

        <h1 className="mt-8 font-display text-2xl font-bold text-white">Portal Sign In</h1>
        <p className="mt-1 text-sm text-slate-400">Admin and Finance staff can sign in here.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-300">Email</label>
            <div className="relative mt-1.5">
              <FiMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20"
                placeholder="you@school.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative mt-1.5">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" className="w-full" loading={submitting} size="lg">
            Sign In
          </Button>
        </form>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">Demo credentials</p>
          <p className="mt-1">Admin: admin@school.com / admin123</p>
          <p>Finance: finance@school.com / finance123</p>
        </div>
      </motion.div>
    </div>
  );
}
