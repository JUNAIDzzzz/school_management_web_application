// Hand-drawn line-art illustrations used as a per-tile fallback in the
// public Gallery section (see GALLERY_IMAGES/GALLERY_ILLUSTRATIONS) when a
// tile has no `image` set. Kept duotone (currentColor strokes + low-opacity
// white fills) so they read cleanly on any of the brand gradients defined in
// GradientPlaceholder.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// --- Compact gallery scene icons -------------------------------------------------

function Classroom({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <rect x="20" y="18" width="80" height="46" rx="4" fill="rgba(255,255,255,0.12)" />
      <path d="M32 34 H70" />
      <path d="M32 44 H60" />
      <circle cx="86" cy="39" r="8" fill="rgba(255,255,255,0.3)" />
      <path d="M28 96 H92" />
      <path d="M36 96 V78 H50 V96" fill="rgba(255,255,255,0.15)" />
      <path d="M58 96 V78 H72 V96" fill="rgba(255,255,255,0.15)" />
      <circle cx="43" cy="70" r="5" fill="rgba(255,255,255,0.4)" />
      <circle cx="65" cy="70" r="5" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

function Sports({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <circle cx="60" cy="60" r="42" opacity="0.4" />
      <circle cx="52" cy="34" r="7" fill="rgba(255,255,255,0.4)" />
      <path d="M52 41 L46 62 L60 70 L58 92" />
      <path d="M46 62 L30 68" />
      <path d="M60 70 L78 60" />
      <path d="M58 92 L70 100" />
      <path d="M58 92 L46 100" />
      <path d="M18 100 H40" />
      <path d="M40 76 L40 100 M40 76 L54 82" opacity="0.6" />
    </svg>
  );
}

function Science({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <path d="M50 20 H70 V48 L88 90 Q92 98 82 98 H38 Q28 98 32 90 L50 48 Z" fill="rgba(255,255,255,0.1)" />
      <path d="M44 70 H76" />
      <circle cx="52" cy="82" r="3" fill="currentColor" stroke="none" />
      <circle cx="64" cy="86" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="70" cy="76" r="2.5" fill="currentColor" stroke="none" />
      <path d="M46 20 H74" />
      <circle cx="90" cy="30" r="4" fill="rgba(255,255,255,0.4)" />
      <circle cx="98" cy="42" r="2.5" fill="currentColor" stroke="none" />
      <path d="M90 34 L98 40" opacity="0.6" />
    </svg>
  );
}

function Library({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <path d="M28 90 V34 Q28 28 34 28 H50 Q56 28 56 34 V90" fill="rgba(255,255,255,0.16)" />
      <path d="M56 90 V40 Q56 34 62 34 H80 Q86 34 86 40 V90" fill="rgba(255,255,255,0.1)" />
      <path d="M20 90 H100" />
      <path d="M36 40 H48" />
      <path d="M36 50 H48" />
      <path d="M64 46 H78" />
      <path d="M64 56 H78" />
      <path d="M86 90 V46 L96 50 V90" fill="rgba(255,255,255,0.22)" />
    </svg>
  );
}

function Cultural({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <path d="M20 26 Q60 14 100 26 V32 Q60 22 20 32 Z" fill="rgba(255,255,255,0.25)" />
      <path d="M24 28 Q28 60 22 92" opacity="0.7" />
      <path d="M96 28 Q92 60 98 92" opacity="0.7" />
      <circle cx="60" cy="66" r="16" fill="rgba(255,255,255,0.14)" />
      <path d="M53 66 Q60 56 67 66 Q60 76 53 66 Z" />
      <path d="M46 96 Q60 88 74 96" />
      <circle cx="34" cy="46" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="88" cy="50" r="2.5" fill="currentColor" stroke="none" />
      <path d="M84 40 Q90 36 90 30" opacity="0.6" />
    </svg>
  );
}

function Graduation({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <circle cx="60" cy="46" r="16" fill="rgba(255,255,255,0.15)" />
      <path d="M34 40 L60 28 L86 40 L60 52 Z" fill="rgba(255,255,255,0.35)" />
      <path d="M34 40 V54" />
      <path d="M60 52 V60" />
      <circle cx="60" cy="63" r="2.5" fill="currentColor" stroke="none" />
      <path d="M44 66 Q60 78 76 66 V86 Q60 96 44 86 Z" fill="rgba(255,255,255,0.12)" />
      <rect x="40" y="94" width="40" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
      <path d="M40 99 H80" />
    </svg>
  );
}

function Campus({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <path d="M24 92 V52 L60 30 L96 52 V92 Z" fill="rgba(255,255,255,0.12)" />
      <path d="M24 92 H96" />
      <path d="M60 30 V16" />
      <path d="M60 16 H78 V26 L60 22 Z" fill="rgba(255,255,255,0.35)" />
      <rect x="36" y="60" width="14" height="14" fill="rgba(255,255,255,0.2)" />
      <rect x="70" y="60" width="14" height="14" fill="rgba(255,255,255,0.2)" />
      <path d="M52 92 V72 H68 V92" fill="rgba(255,255,255,0.25)" />
      <path d="M14 92 Q14 78 24 76 Q26 66 36 68 Q40 60 48 66 Q50 76 40 78 Q42 88 30 92 Z" fill="rgba(255,255,255,0.1)" />
    </svg>
  );
}

function Art({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...base}>
      <path d="M30 96 L60 22 L90 96 Z" opacity="0.5" />
      <rect x="38" y="38" width="44" height="34" rx="2" fill="rgba(255,255,255,0.15)" />
      <path d="M46 66 L56 52 L64 60 L74 46" opacity="0.8" />
      <path d="M20 100 Q30 84 44 92 Q40 78 54 76 Q56 66 68 70" fill="rgba(255,255,255,0.18)" />
      <circle cx="26" cy="94" r="3" fill="currentColor" stroke="none" />
      <circle cx="36" cy="86" r="3" fill="rgba(255,255,255,0.6)" stroke="none" />
      <circle cx="46" cy="90" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const GALLERY_ILLUSTRATIONS = {
  classroom: Classroom,
  sports: Sports,
  science: Science,
  library: Library,
  cultural: Cultural,
  graduation: Graduation,
  campus: Campus,
  art: Art,
};
