import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 0.8,
  once = true,
}: ScrollRevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px' }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
