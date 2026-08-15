import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FaultyTerminal } from '@/components/effects/FaultyTerminal';
import { Pill } from '@/components/ui/Pill';

export function TerminalDemo() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow index="04" accent="sunset">
              Live session
            </Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(36px,5vw,72px)] font-light leading-[1.05] tracking-[-0.03em]">
              Ask it anything.{' '}
              <span className="text-mute">It quietly orchestrates the rest.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-body">
              This is a real session against the studio. The AI picks the right tool, calls it, and renders the result. You just watch it work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill size="md" variant="outline" iconRight={<span>↗</span>} href="https://ai.oscarstudio.cn" data-cursor="hover">
                Try it yourself
              </Pill>
              <Pill size="md" variant="ghost" data-cursor="hover">
                Read the docs
              </Pill>
            </div>
            <ul className="mt-10 space-y-2 font-mono text-eyebrow text-mute">
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-accent-labs" />
                <span>streaming tokens</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-accent-mind" />
                <span>function calling</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-accent-sunset" />
                <span>cross-product handoff</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <FaultyTerminal />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TerminalDemo;
