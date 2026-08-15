import { cn } from '@/lib/cn';
import { announcements } from '@/lib/announcements';

interface MarqueeProps {
  className?: string;
  duration?: number;
  reverse?: boolean;
}

export function Marquee({ className, duration = 50, reverse = false }: MarqueeProps) {
  const items = [...announcements, ...announcements];

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden',
        className,
      )}
      style={{
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div
        className={cn(
          'flex w-max gap-12 py-3 will-change-transform',
          'group-hover:[animation-play-state:paused]',
        )}
        style={{
          animation: `marquee ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {items.map((a, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-4 text-body transition-colors hover:text-ink"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-sunset" />
            <span className="font-mono text-eyebrow text-mute">{a.date}</span>
            <span className="text-[14px]">{a.content}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default Marquee;
