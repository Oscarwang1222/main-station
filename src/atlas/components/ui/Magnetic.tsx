import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/cn';

interface MagneticProps extends HTMLMotionProps<'div'> {
  strength?: number;
  children: React.ReactNode;
  as?: 'div' | 'button' | 'a';
  className?: string;
}

export function Magnetic({ strength = 0.35, children, className, ...rest }: MagneticProps) {
  const { ref, transform } = useMagnetic<HTMLDivElement>(strength);

  return (
    <motion.div
      ref={ref}
      animate={{ x: transform.x, y: transform.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={cn('inline-block will-change-transform', className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
