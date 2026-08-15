import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface VariableProximityProps {
  text: string;
  className?: string;
  fromFontWeight?: number;
  toFontWeight?: number;
  fromLetterSpacing?: number;
  toLetterSpacing?: number;
  radius?: number;
  scaleRange?: [number, number];
  falloff?: 'linear' | 'ease-in' | 'ease-out';
  reveal?: boolean;
  revealDelay?: number;
  revealStagger?: number;
  revealFromY?: number;
  fromBlur?: number;
  by?: 'char' | 'word';
}

export function VariableProximity({
  text,
  className,
  fromFontWeight = 300,
  toFontWeight = 700,
  fromLetterSpacing = -0.04,
  toLetterSpacing = -0.06,
  radius = 120,
  scaleRange = [1, 1.45],
  falloff = 'ease-out',
  reveal = true,
  revealDelay = 0,
  revealStagger = 0.028,
  revealFromY = 20,
  fromBlur = 8,
  by = 'char',
}: VariableProximityProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [revealed, setRevealed] = useState(!reveal);

  const items = by === 'char' ? Array.from(text) : text.split(' ');

  useEffect(() => {
    if (!reveal) return;
    const total = items.length * revealStagger + 0.6;
    const t = window.setTimeout(
      () => setRevealed(true),
      revealDelay * 1000 + total * 1000,
    );
    return () => window.clearTimeout(t);
  }, [reveal, items.length, revealDelay, revealStagger]);

  useEffect(() => {
    if (!revealed) return;
    const container = containerRef.current;
    if (!container) return;

    const ease = (x: number) => {
      if (falloff === 'ease-in') return x * x;
      if (falloff === 'ease-out') return 1 - (1 - x) * (1 - x);
      return x;
    };

    const resetChar = (char: HTMLSpanElement) => {
      char.style.transform = 'scale(1)';
      char.style.fontVariationSettings = `'wght' ${fromFontWeight}`;
      char.style.letterSpacing = `${fromLetterSpacing}em`;
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      charRefs.current.forEach((char) => {
        if (!char) return;
        const cRect = char.getBoundingClientRect();
        const cx = cRect.left + cRect.width / 2 - rect.left;
        const cy = cRect.top + cRect.height / 2 - rect.top;
        const dist = Math.hypot(mx - cx, my - cy);
        const influence = Math.max(0, 1 - dist / radius);
        const t = ease(influence);
        const scale = scaleRange[0] + t * (scaleRange[1] - scaleRange[0]);
        const weight = fromFontWeight + t * (toFontWeight - fromFontWeight);
        const ls = fromLetterSpacing + t * (toLetterSpacing - fromLetterSpacing);
        char.style.transform = `scale(${scale})`;
        char.style.fontVariationSettings = `'wght' ${weight.toFixed(0)}`;
        char.style.letterSpacing = `${ls.toFixed(3)}em`;
      });
    };

    const onLeave = () => {
      charRefs.current.forEach((c) => c && resetChar(c));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [revealed, radius, scaleRange, fromFontWeight, toFontWeight, fromLetterSpacing, toLetterSpacing, falloff]);

  return (
    <span ref={containerRef} className={cn('inline-block', className)}>
      {items.map((ch, i) => (
        <motion.span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          className="inline-block will-change-transform"
          style={{
            display: 'inline-block',
            transformOrigin: 'center bottom',
            fontVariationSettings: `'wght' ${fromFontWeight}`,
            letterSpacing: `${fromLetterSpacing}em`,
            fontWeight: fromFontWeight,
            transition: 'transform 0.18s ease-out',
          }}
          initial={
            reveal
              ? { opacity: 0, y: revealFromY, filter: `blur(${fromBlur}px)` }
              : false
          }
          animate={revealed ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
          transition={
            reveal
              ? {
                  delay: revealDelay + i * revealStagger,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }
              : undefined
          }
        >
          {by === 'word' ? `${ch}\u00A0` : ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default VariableProximity;
