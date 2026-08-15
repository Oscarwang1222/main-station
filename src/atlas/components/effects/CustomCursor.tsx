import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDeviceTier } from '@/hooks/useDeviceTier';

export function CustomCursor() {
  const tier = useDeviceTier();
  const isTouch = tier !== 'high';

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.6 });
  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;
      const data = target.closest<HTMLElement>('[data-cursor]');
      const dataLabel = target.closest<HTMLElement>('[data-cursor-label]');
      if (dataLabel) setLabel(dataLabel.dataset.cursorLabel ?? null);
      else setLabel(null);
      if (data) {
        setVariant(data.dataset.cursor as 'hover' | 'text');
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y, isTouch]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[400] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[400] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/60 transition-[width,height,opacity] duration-200 ease-snap"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: variant === 'hover' ? 64 : variant === 'text' ? 2 : 32,
          height: variant === 'hover' ? 64 : variant === 'text' ? 28 : 32,
          opacity: variant === 'text' ? 0.2 : 1,
          borderColor: variant === 'hover' ? 'rgba(255,122,23,1)' : 'rgba(255,255,255,0.6)',
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[1.4px] text-ink">
            {label}
          </span>
        )}
      </motion.div>
      <style>{`
        @media (pointer: fine) {
          html, body, a, button, [role="button"] { cursor: none; }
        }
      `}</style>
    </>
  );
}

export default CustomCursor;
