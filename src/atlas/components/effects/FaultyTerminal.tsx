import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/cn';
import { terminalLines } from '@/data/content';

export function FaultyTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-15% 0px' });
  const [visibleLines, setVisibleLines] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const cycleRef = useRef(0);

  useEffect(() => {
    if (!inView) {
      setVisibleLines(0);
      return;
    }
    const timeouts: number[] = [];
    terminalLines.forEach((line, i) => {
      const t = window.setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay);
      timeouts.push(t);
    });
    const reset = window.setTimeout(() => {
      cycleRef.current += 1;
      setVisibleLines(0);
    }, 12000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(reset);
    };
  }, [inView, cycleRef.current]);

  useEffect(() => {
    const t = window.setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 5400);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden rounded-card border border-hairline bg-canvas-card',
        glitch && 'animate-glitch',
      )}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)',
        }}
      />
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-eyebrow font-mono text-mute">oscar@studio — zsh — 92×24</span>
        <span className="ml-auto text-eyebrow font-mono text-mute">{inView ? 'LIVE' : 'IDLE'}</span>
      </div>
      <div className="relative p-6 font-mono text-[13px] leading-6 text-body min-h-[360px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => {
          const isLast = i === visibleLines - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={cn(
                'whitespace-pre',
                line.type === 'cmd' && 'text-ink',
                line.type === 'out' && 'text-body',
                line.type === 'ok' && 'text-accent-labs',
                line.type === 'art' && 'text-accent-mind',
                line.type === 'meta' && 'text-mute text-eyebrow mt-2',
              )}
            >
              {line.text}
              {isLast && (
                <span className="ml-1 inline-block h-3.5 w-2 -mb-0.5 animate-cursor bg-ink" />
              )}
            </motion.div>
          );
        })}
      </div>
      <style>{`
        @keyframes cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-cursor { animation: cursor 0.9s step-end infinite; }

        @keyframes glitch {
          0%   { transform: translate(0,0); }
          20%  { transform: translate(-3px, 1px); filter: hue-rotate(8deg); }
          40%  { transform: translate(3px, -1px); filter: hue-rotate(-6deg); }
          60%  { transform: translate(-2px, 0); }
          80%  { transform: translate(2px, 1px); }
          100% { transform: translate(0,0); }
        }
        .animate-glitch { animation: glitch 0.15s steps(2) both; }
      `}</style>
    </div>
  );
}

export default FaultyTerminal;
