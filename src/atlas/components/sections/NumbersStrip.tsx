import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { numbers } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CountUp } from '@/components/effects/CountUp';
import { cn } from '@/lib/cn';

export function NumbersStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative border-y border-hairline py-24">
      <div className="mx-auto max-w-container px-6">
        <Eyebrow index="02" accent="white">
          By the numbers
        </Eyebrow>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4">
          {numbers.map((n, i) => (
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cn(
                'group relative px-2 py-8 transition-colors duration-500 md:px-8',
                i > 0 && 'md:border-l md:border-hairline',
                i === 2 && 'border-t border-hairline md:border-t-0',
                i === 3 && 'border-t border-hairline md:border-t-0',
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'font-display text-[clamp(48px,7vw,96px)] font-light leading-none tracking-[-0.04em] transition-colors duration-500',
                  hover === i ? 'text-accent-sunset' : 'text-ink',
                )}
              >
                {inView ? (
                  <CountUp
                    end={n.value}
                    duration={1.8}
                    suffix={n.suffix}
                  />
                ) : (
                  `0${n.suffix}`
                )}
              </motion.div>
              <div className="mt-3 flex items-center gap-2 font-mono text-eyebrow text-mute">
                <span className="text-mute">/ {String(i + 1).padStart(2, '0')}</span>
                <span className="h-px w-6 bg-mute" />
                <span>{n.label}</span>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={hover === i ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent-sunset"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NumbersStrip;
