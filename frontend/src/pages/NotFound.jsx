import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-7xl font-bold text-brand-600"
      >
        404
      </motion.p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-slate-800">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
      >
        <FiArrowLeft /> Back to Home
      </Link>
    </div>
  );
}
