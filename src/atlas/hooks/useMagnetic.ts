import { useEffect, useRef, useState } from 'react';

export function useMagnetic<T extends HTMLElement>(strength = 0.4) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = Math.max(rect.width, rect.height);
      if (dist < max * 0.8) {
        setTransform({ x: dx * strength, y: dy * strength });
      } else {
        setTransform({ x: 0, y: 0 });
      }
    };

    const onLeave = () => setTransform({ x: 0, y: 0 });

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return { ref, transform };
}
