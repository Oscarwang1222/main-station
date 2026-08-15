import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[200] h-[2px] origin-left bg-gradient-to-r from-accent-sunset via-accent-dusk to-accent-mind"
        style={{ scaleX: progress }}
      />
      <div className="fixed bottom-4 right-4 z-[200] hidden font-mono text-[11px] uppercase tracking-[1.4px] text-mute md:block">
        {Math.round(progress * 100).toString().padStart(2, '0')}%
      </div>
    </>
  );
}

export default ScrollProgress;
