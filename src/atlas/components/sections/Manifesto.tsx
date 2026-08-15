import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { manifesto } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${manifesto.length * 70 + 60}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-container px-6">
          <Eyebrow index="01" accent="white">
            Manifesto
          </Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(40px,7vw,96px)] font-light leading-[1.05] tracking-[-0.035em]">
            {manifesto.map((line, i) => (
              <ManifestoLine
                key={i}
                line={line}
                index={i}
                total={manifesto.length}
                progress={scrollYProgress}
              />
            ))}
          </h2>
          <div className="mt-12 grid grid-cols-12 items-end gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="font-mono text-eyebrow text-mute">
                <span>scroll progress</span>
                <ProgressBar progress={scrollYProgress} />
              </div>
            </div>
            <div className="col-span-12 text-right font-mono text-eyebrow text-mute md:col-span-6">
              — Oscar Studio, 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoLine({
  line,
  index,
  total,
  progress,
}: {
  line: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.05), start, end, Math.min(1, end + 0.05)],
    [0.12, 1, 1, 0.12],
  );
  const filter = useTransform(
    progress,
    [Math.max(0, start - 0.05), start, end, Math.min(1, end + 0.05)],
    ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'],
  );
  const y = useTransform(progress, [start, end], [16, -16]);

  if (!line) return <span className="block h-6" />;
  return (
    <motion.span style={{ opacity, filter, y }} className="block text-ink">
      {line}
    </motion.span>
  );
}

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, (p) => `${Math.min(100, p * 100)}%`);
  return (
    <div className="mt-2 h-px w-full bg-hairline">
      <motion.div style={{ width }} className="h-full bg-ink" />
    </div>
  );
}

export default Manifesto;
