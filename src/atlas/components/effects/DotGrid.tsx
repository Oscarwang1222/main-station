import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceTier } from '@/hooks/useDeviceTier';

interface DotGridProps {
  className?: string;
  spacing?: number;
  baseRadius?: number;
  hoverRadius?: number;
  color?: string;
}

export function DotGrid({
  className,
  spacing = 28,
  baseRadius = 0.9,
  hoverRadius = 2.6,
  color = '255, 255, 255',
}: DotGridProps) {
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
    const mouse = { x: -9999, y: -9999 };
    let cols = 0;
    let rows = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      cols = Math.ceil(rect.width / spacing) + 2;
      rows = Math.ceil(rect.height / spacing) + 2;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const offsetX = (rect.width - (cols - 1) * spacing) / 2;
      const offsetY = (rect.height - (rows - 1) * spacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 140;
          const t = Math.max(0, 1 - dist / maxDist);
          const r = baseRadius + (hoverRadius - baseRadius) * t;
          const alpha = 0.18 + t * 0.65;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    if (reduced) draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [spacing, baseRadius, hoverRadius, color, reduced, skip]);

  if (skip) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`}
      aria-hidden
    />
  );
}

export default DotGrid;
