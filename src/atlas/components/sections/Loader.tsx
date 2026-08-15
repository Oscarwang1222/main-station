import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onDone: () => void;
}

const bootLines = [
  { t: 'oscar.init()', d: 0 },
  { t: 'loading 5 nodes', d: 220 },
  { t: '  ai.oscarstudio.cn', d: 360 },
  { t: '  edu.oscarstudio.cn', d: 460 },
  { t: '  ppt.oscarstudio.cn', d: 560 },
  { t: '  games.oscarstudio.cn', d: 660 },
  { t: '  tools.oscarstudio.cn', d: 760 },
  { t: 'mounting aurora ...', d: 920 },
  { t: 'system ready', d: 1200 },
];

export function Loader({ onDone }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const total = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 200);
        setTimeout(() => onDone(), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  useEffect(() => {
    const skip = () => {
      setSkipped(true);
      setDone(true);
      setProgress(1);
      setTimeout(() => onDone(), 200);
    };
    const onKey = () => skip();
    const onClick = () => skip();
    window.addEventListener('keydown', onKey, { once: true });
    window.addEventListener('click', onClick, { once: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-canvas"
        >
          <motion.div
            exit={{ scale: 1.05, filter: 'blur(12px)' }}
            transition={{ duration: 0.4 }}
            className="w-[min(560px,90vw)] overflow-hidden rounded-card border border-hairline bg-canvas-card"
          >
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-eyebrow text-mute">oscar@studio — boot</span>
            </div>
            <div className="px-5 py-5 font-mono text-[12px] leading-6 text-body min-h-[180px]">
              {bootLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: l.d / 1000, duration: 0.18 }}
                >
                  <span className="text-mute">$ </span>
                  <span className="text-ink">{l.t}</span>
                  {i === bootLines.length - 1 && (
                    <span className="ml-2 text-accent-sunset">[OK]</span>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-3 flex items-center gap-3"
              >
                <span className="text-mute">ready in</span>
                <span className="text-accent-mind">{(progress * 1.4).toFixed(2)}s</span>
              </motion.div>
            </div>
            <div className="border-t border-hairline">
              <div className="h-1 w-full bg-canvas-mid">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-sunset via-accent-dusk to-accent-mind"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[1.4px] text-mute">
                {skipped ? 'skipping…' : 'press any key or click to skip'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
