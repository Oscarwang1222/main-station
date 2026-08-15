import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/cn';

interface ScrollFloatProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function ScrollFloat({ children, className, offset = 30 }: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={cn(className)}>
      {children}
    </motion.div>
  );
}

export default ScrollFloat;
