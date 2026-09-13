import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { SCHOOL, NAV_LINKS } from '../../data/schoolContent';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 120 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-surface py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2" data-cursor-hover>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white">
            B
          </span>
          <span className="font-display text-lg font-semibold text-slate-800">{SCHOOL.name}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            data-cursor-hover
            className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
          >
            Login
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="section-container flex flex-col gap-1 pb-4 pt-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/login"
                className="mt-2 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
