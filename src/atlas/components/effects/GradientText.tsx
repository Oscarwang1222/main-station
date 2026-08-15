import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animated?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export function GradientText({
  children,
  className,
  from = '#ff7a17',
  via = '#7c3aed',
  to = '#5BC7FF',
  animated = true,
  as = 'span',
}: GradientTextProps) {
  const Component = motion[as] as typeof motion.span;
  return (
    <Component
      className={cn('inline-block bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to}, ${from})`,
        backgroundSize: animated ? '200% 100%' : '100% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
      animate={animated ? { backgroundPosition: ['0% 50%', '200% 50%'] } : undefined}
      transition={
        animated
          ? { duration: 12, ease: 'linear', repeat: Infinity }
          : undefined
      }
    >
      {children}
    </Component>
  );
}

export default GradientText;
