import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: 'char' | 'word';
  trigger?: 'mount' | 'inView';
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  by = 'char',
  trigger = 'mount',
}: SplitTextProps) {
  const items = by === 'char' ? Array.from(text) : text.split(' ');

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 220, damping: 26, mass: 0.6 },
    },
  };

  return (
    <motion.span
      className={cn('inline-block', className)}
      variants={container}
      initial="hidden"
      {...(trigger === 'inView'
        ? { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
        : { animate: 'show' })}
    >
      {items.map((t, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block whitespace-pre"
        >
          {by === 'word' ? `${t}\u00A0` : t === ' ' ? '\u00A0' : t}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default SplitText;
