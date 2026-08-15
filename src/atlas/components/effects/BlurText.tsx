import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function BlurText({ text, className, delay = 0, stagger = 0.06 }: BlurTextProps) {
  const words = text.split(' ');

  return (
    <motion.p
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
            show: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {w}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default BlurText;
