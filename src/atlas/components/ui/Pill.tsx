import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost' | 'sunset';
type Size = 'sm' | 'md' | 'lg';

interface PillProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children: React.ReactNode;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-canvas border-ink hover:bg-ink-hover',
  outline:
    'bg-transparent text-ink border-white/25 hover:border-white/45 hover:bg-white/[0.04]',
  ghost:
    'bg-transparent text-ink border-transparent hover:bg-white/[0.04]',
  sunset:
    'bg-accent-sunset text-canvas border-accent-sunset hover:bg-[#ff8a3a] glow-sunset',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[12px]',
  md: 'h-10 px-4 text-[13px]',
  lg: 'h-12 px-6 text-[14px]',
};

export function Pill({
  variant = 'outline',
  size = 'md',
  className,
  children,
  iconRight,
  iconLeft,
  href,
  ...rest
}: PillProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-pill border font-mono uppercase tracking-[1.4px] transition-all duration-300 ease-snap will-change-transform select-none';

  const inner = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {iconLeft && <span className="inline-flex">{iconLeft}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight && (
        <span className="inline-flex transition-transform duration-300 ease-snap group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return inner;
}

export default Pill;
