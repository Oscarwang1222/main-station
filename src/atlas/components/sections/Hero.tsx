import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Aurora from '@/components/effects/Aurora';
import DotGrid from '@/components/effects/DotGrid';
import Silk from '@/components/effects/Silk';
import GradientText from '@/components/effects/GradientText';
import VariableProximity from '@/components/effects/VariableProximity';
import BlurText from '@/components/effects/BlurText';
import CountUp from '@/components/effects/CountUp';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Pill } from '@/components/ui/Pill';
import { nodeStatus, heroSub, products } from '@/data/content';
import { cn } from '@/lib/cn';

const dotMap = {
  mind: 'bg-accent-mind',
  labs: 'bg-accent-labs',
  canvas: 'bg-accent-canvas',
  arena: 'bg-accent-arena',
} as const;

interface HeroProps {
  booted: boolean;
}

export function Hero({ booted }: HeroProps) {
  const [sync, setSync] = useState(0);

  useEffect(() => {
    if (!booted) return;
    const t = setInterval(() => setSync((s) => (s + 1) % 60), 1000);
    return () => clearInterval(t);
  }, [booted]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-32 pb-20"
    >
      <Aurora intensity="high" />
      <Silk count={70} />
      <DotGrid spacing={26} />

      <div className="relative mx-auto grid max-w-container grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:pt-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Eyebrow index="00" accent="sunset">
              A constellation of five products
            </Eyebrow>
          </motion.div>

          <h1 className="mt-8 font-display text-[clamp(44px,7.2vw,120px)] font-light leading-[0.95] tracking-[-0.04em]">
            <span className="block">
              <VariableProximity
                text="We build tools"
                by="word"
                revealDelay={0.5}
                revealStagger={0.08}
                radius={180}
                scaleRange={[1, 1.55]}
                fromFontWeight={300}
                toFontWeight={700}
                fromLetterSpacing={-0.04}
                toLetterSpacing={-0.075}
                falloff="ease-out"
              />
            </span>
            <span className="block">
              <VariableProximity
                text="for"
                by="word"
                revealDelay={0.7}
                revealStagger={0.06}
                radius={160}
                scaleRange={[1, 1.55]}
                fromFontWeight={300}
                toFontWeight={700}
                fromLetterSpacing={-0.04}
                toLetterSpacing={-0.075}
                falloff="ease-out"
              />
              <span className="inline-block">
                <GradientText as="span" className="font-display">
                  thinkers.
                </GradientText>
              </span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 max-w-[44ch] text-[18px] leading-7 text-body"
          >
            <BlurText text={heroSub} delay={1.0} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Pill
              size="lg"
              variant="primary"
              iconRight={<span>→</span>}
              onClick={() =>
                document.querySelector('#tools')?.scrollIntoView({ behavior: 'smooth' })
              }
              data-cursor="hover"
            >
              Enter the studio
            </Pill>
            <Pill
              size="lg"
              variant="outline"
              iconRight={<span>↗</span>}
              href="https://github.com/oscarstudio"
              data-cursor="hover"
            >
              View on GitHub
            </Pill>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[1.4px] text-mute"
          >
            <span>v3.0.0 · atlas</span>
            <span className="h-3 w-px bg-hairline" />
            <span>{products.length} nodes online</span>
            <span className="h-3 w-px bg-hairline" />
            <span>updated 2026.06</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={booted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-card border border-hairline bg-canvas-card/80 p-5 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-labs/50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-labs" />
                </span>
                <span className="font-mono text-eyebrow text-ink">Live nodes</span>
              </div>
              <span className="font-mono text-eyebrow text-mute">last sync · {sync}s</span>
            </div>
            <ul className="divide-y divide-hairline">
              {nodeStatus.map((n) => (
                <li
                  key={n.name}
                  className="group flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn('h-1.5 w-1.5 rounded-tile', dotMap[n.domain as keyof typeof dotMap])} />
                    <span className="font-mono text-[12px] uppercase tracking-[1.2px] text-ink">
                      {n.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-eyebrow text-mute group-hover:text-accent-labs">
                      {n.status}
                    </span>
                    <span className="font-mono text-eyebrow text-mute">
                      <CountUp
                        end={n.latency}
                        duration={1.2}
                        delay={0.2}
                        format={(v) => Math.round(v).toString()}
                        suffix="ms"
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3 font-mono text-eyebrow text-mute">
              <span>uptime 99.97%</span>
              <span>auto-refresh 1s</span>
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-accent-sunset/10 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-4 grid grid-cols-3 gap-2 font-mono text-eyebrow text-mute"
          >
            <div className="rounded-tile border border-hairline px-3 py-2">
              <div className="text-ink">04</div>
              <div>products</div>
            </div>
            <div className="rounded-tile border border-hairline px-3 py-2">
              <div className="text-ink">17+</div>
              <div>tools</div>
            </div>
            <div className="rounded-tile border border-hairline px-3 py-2">
              <div className="text-ink">10+</div>
              <div>games</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-eyebrow text-mute md:flex"
      >
        <span>scroll</span>
        <span className="h-8 w-px animate-pulse bg-mute" />
      </motion.div>
    </section>
  );
}

export default Hero;
