import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20',
  secondary: 'bg-white text-brand-700 border border-slate-200 hover:border-brand-300 hover:bg-brand-50',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/20',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.03 }}
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </motion.button>
  );
}
