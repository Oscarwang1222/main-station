import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/data/content';
import { cn } from '@/lib/cn';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const accentBg: Record<string, string> = {
  mind: 'bg-accent-mind',
  labs: 'bg-accent-labs',
  canvas: 'bg-accent-canvas',
  arena: 'bg-accent-arena',
};

interface TopNavProps {
  booted: boolean;
  onOpenPalette: () => void;
}

export function TopNav({ booted, onOpenPalette }: TopNavProps) {
  const progress = useScrollProgress();
  const [active, setActive] = useState<string>('#top');

  useEffect(() => {
    if (!booted) return;
    const ids = ['#top', ...navLinks.map((l) => l.href)];
    const onScroll = () => {
      const y = window.scrollY + 200;
      let cur = '#top';
      for (const id of ids) {
        const el = document.querySelector(id) as HTMLElement | null;
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [booted]);

  return (
    <AnimatePresence>
      {booted && (
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="fixed left-1/2 top-5 z-[150] -translate-x-1/2"
        >
          <div
            className={cn(
              'flex items-center gap-2 rounded-pill border px-3 py-2 backdrop-blur-xl transition-all duration-500 ease-snap',
              progress > 0.02
                ? 'border-white/15 bg-canvas/80'
                : 'border-white/10 bg-canvas/40',
            )}
          >
            <a
              href="#top"
              data-cursor="hover"
              data-cursor-label="HOME"
              className="flex items-center gap-2 rounded-pill px-3 py-1.5"
            >
              <span className="grid h-5 w-5 grid-cols-2 grid-rows-2 gap-[2px]">
                <span className={cn('rounded-tile', accentBg.mind)} />
                <span className={cn('rounded-tile', accentBg.labs)} />
                <span className={cn('rounded-tile', accentBg.canvas)} />
                <span className={cn('rounded-tile', accentBg.arena)} />
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[1.4px] text-ink sm:inline">
                Oscar Studio
              </span>
            </a>
            <span className="mx-1 h-5 w-px bg-hairline" />
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-cursor="hover"
                    className={cn(
                      'group relative flex items-center gap-2 rounded-pill px-3 py-1.5 font-mono text-[11px] uppercase tracking-[1.4px] transition-colors duration-300',
                      active === l.href ? 'text-ink' : 'text-mute hover:text-ink',
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-tile transition-all duration-300',
                        accentBg[l.accent],
                        active === l.href ? 'opacity-100 scale-100' : 'opacity-40 scale-75',
                      )}
                    />
                    <span className="text-mute">/ {l.index}</span>
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <span className="mx-1 h-5 w-px bg-hairline" />
            <button
              onClick={onOpenPalette}
              data-cursor="hover"
              data-cursor-label="⌘K"
              className="group flex items-center gap-2 rounded-pill border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[1.4px] text-mute transition-colors hover:border-white/25 hover:text-ink"
            >
              <span>⌘K</span>
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default TopNav;
