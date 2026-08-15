import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceTier } from '@/hooks/useDeviceTier';

interface SilkProps {
  className?: string;
  count?: number;
  speed?: number;
  color?: string;
}

export function Silk({ className, count = 60, speed = 0.3, color = '255, 255, 255' }: SilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const tier = useDeviceTier();
  const skip = tier === 'low';

  useEffect(() => {
    if (skip) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: { x: number; y: number; vx: number; vy: number; r: number; phase: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      particles.length = 0;
      const rect = canvas.getBoundingClientRect();
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 1.2 + 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin((Date.now() / 2000) + p.phase) * 0.05;
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    if (!reduced) draw();
    window.addEventListener('resize', () => {
      resize();
      init();
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', () => {});
    };
  }, [count, speed, color, reduced, skip]);

  if (skip) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-screen ${className ?? ''}`}
      aria-hidden
    />
  );
}

export default Silk;
