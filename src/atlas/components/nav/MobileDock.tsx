import { motion } from 'framer-motion';
import { navLinks } from '@/data/content';
import { cn } from '@/lib/cn';

const accentBg: Record<string, string> = {
  mind: 'bg-accent-mind',
  labs: 'bg-accent-labs',
  canvas: 'bg-accent-canvas',
  arena: 'bg-accent-arena',
};

export function MobileDock() {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-1 rounded-pill border border-white/10 bg-canvas/85 px-2 py-1.5 backdrop-blur-xl md:hidden"
    >
      {navLinks.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="flex flex-col items-center justify-center rounded-pill px-3 py-1.5"
        >
          <span className={cn('mb-1 h-1.5 w-1.5 rounded-tile', accentBg[l.accent])} />
          <span className="font-mono text-[9px] uppercase tracking-[1.2px] text-ink">
            {l.label}
          </span>
        </a>
      ))}
    </motion.nav>
  );
}

export default MobileDock;
