const GRADIENTS = [
  'from-brand-400 via-brand-600 to-brand-900',
  'from-accent-400 via-accent-600 to-brand-800',
  'from-brand-300 via-brand-500 to-accent-500',
  'from-brand-600 via-brand-800 to-slate-900',
  'from-accent-500 via-brand-500 to-brand-800',
];

// Decorative gradient tile used in place of real photography for seed/demo
// content (gallery, hero) so the UI never depends on external image assets.
export default function GradientPlaceholder({ seed = 0, className = '', children }) {
  const gradient = GRADIENTS[seed % GRADIENTS.length];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)',
        }}
      />
      {children}
    </div>
  );
}
