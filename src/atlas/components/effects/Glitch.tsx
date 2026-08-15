import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function GlitchText({ text, className, speed = 0.5 }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [-speed * 4, speed * 4]);
  const x2 = useTransform(scrollYProgress, [0, 1], [speed * 4, -speed * 4]);

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-[#ff7a17] mix-blend-screen"
        style={{ x: x1, opacity: 0.7 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-0 text-[#5BC7FF] mix-blend-screen"
        style={{ x: x2, opacity: 0.7 }}
      >
        {text}
      </motion.span>
      <span className="relative">{text}</span>
    </span>
  );
}

export default GlitchText;
