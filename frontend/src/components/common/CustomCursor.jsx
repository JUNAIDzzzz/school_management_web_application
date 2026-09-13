import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';

// A continuously-tracking custom cursor: a tight dot glued to the pointer and a
// looser ring that trails behind it via spring physics. Disabled automatically
// on touch devices where there is no real pointer to track.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 28, stiffness: 260, mass: 0.4 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 260, mass: 0.4 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(supportsFinePointer);
    if (!supportsFinePointer) return undefined;

    const handleMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target;
      setIsHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
    };
    const handleDown = () => setIsDown(true);
    const handleUp = () => setIsDown(false);
    const handleLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      <motion.div
        className="absolute rounded-full bg-brand-500"
        style={{ left: cursorX, top: cursorY, x: '-50%', y: '-50%' }}
        animate={{ width: isDown ? 6 : 8, height: isDown ? 6 : 8 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute rounded-full border-2 border-brand-400/70"
        style={{ left: ringX, top: ringY, x: '-50%', y: '-50%' }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isHovering ? 0.9 : 0.5,
          backgroundColor: isHovering ? 'rgba(59,108,244,0.08)' : 'rgba(59,108,244,0)',
          scale: isDown ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
      />
    </div>
  );
}
