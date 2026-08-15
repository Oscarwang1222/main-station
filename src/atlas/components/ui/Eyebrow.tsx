import { cn } from '@/lib/cn';

interface EyebrowProps {
  index?: string;
  children: React.ReactNode;
  accent?: 'mind' | 'labs' | 'canvas' | 'arena' | 'sunset' | 'white';
  className?: string;
}

const accentMap: Record<NonNullable<EyebrowProps['accent']>, string> = {
  mind: 'text-accent-mind',
  labs: 'text-accent-labs',
  canvas: 'text-accent-canvas',
  arena: 'text-accent-arena',
  sunset: 'text-accent-sunset',
  white: 'text-ink',
};

export function Eyebrow({ index, accent = 'white', children, className }: EyebrowProps) {
  return (
    <div className={cn('flex items-center gap-3 text-eyebrow', accentMap[accent], className)}>
      {index && <span className="text-mute">/ {index}</span>}
      <span className="font-mono">{children}</span>
      <span className="h-px w-8 bg-current opacity-40" />
    </div>
  );
}

export default Eyebrow;
