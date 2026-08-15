import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  accent?: 'mind' | 'labs' | 'canvas' | 'arena' | 'kit';
  disabled?: boolean;
}

const accentColor: Record<NonNullable<SpotlightCardProps['accent']>, string> = {
  mind: '91, 199, 255',
  labs: '124, 255, 178',
  canvas: '255, 179, 92',
  arena: '255, 92, 158',
  kit: '181, 124, 255',
};

export function SpotlightCard({
  children,
  className,
  onClick,
  href,
  accent = 'mind',
  disabled,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const color = accentColor[accent];

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={!disabled ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={cn(
        'group relative overflow-hidden rounded-card border border-hairline bg-canvas-card',
        'transition-colors duration-500 ease-snap',
        hover && 'border-white/15',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-snap group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, rgba(${color}, 0.18), transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-card opacity-0 transition-opacity duration-700 ease-snap group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, rgba(${color}, 0.6), transparent 70%)`,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className="block text-left w-full">
        {inner}
      </button>
    );
  }
  return inner;
}

export default SpotlightCard;
