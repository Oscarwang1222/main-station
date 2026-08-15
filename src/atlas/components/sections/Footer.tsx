import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/data/content';
import { cn } from '@/lib/cn';

const accentBg = {
  mind: 'bg-accent-mind',
  labs: 'bg-accent-labs',
  canvas: 'bg-accent-canvas',
  arena: 'bg-accent-arena',
  kit: 'bg-accent-kit',
} as const;

export function Footer() {
  const [uptime, setUptime] = useState('99.97');

  useEffect(() => {
    const t = setInterval(() => {
      setUptime((99.96 + Math.random() * 0.04).toFixed(2));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-container px-6 pb-10 pt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="flex h-5 gap-[2px]">
                {(['mind', 'labs', 'canvas', 'arena', 'kit'] as const).map((a) => (
                  <span key={a} className={cn('h-full w-1 rounded-tile', accentBg[a])} />
                ))}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[1.4px] text-ink">
                Oscar Studio
              </span>
            </div>
            <p className="mt-6 max-w-sm font-display text-[clamp(28px,3vw,40px)] font-light leading-[1.1] tracking-[-0.025em]">
              Tools for thinkers, made by a small studio in 2026.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-pill border border-hairline px-3 py-1.5 font-mono text-eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent-labs/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-labs" />
              </span>
              <span className="text-ink">All systems</span>
              <span className="text-mute">·</span>
              <span className="text-mute">uptime {uptime}%</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-eyebrow text-mute">Products</h4>
            <ul className="mt-4 space-y-2">
              {products.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.domain}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 text-[14px] text-body transition-colors hover:text-ink"
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-tile transition-transform duration-300 group-hover:scale-150',
                        accentBg[p.accent],
                      )}
                    />
                    {p.name}
                    <span className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-eyebrow text-mute">Resources</h4>
            <ul className="mt-4 space-y-2">
              {[
                { l: 'Documentation', h: 'https://docs.oscarstudio.cn' },
                { l: 'GitHub', h: 'https://github.com/oscarstudio' },
                { l: 'Feedback', h: 'https://api.oscarstudio.cn/feedback' },
                { l: 'Status', h: '#' },
              ].map((r) => (
                <li key={r.l}>
                  <a
                    href={r.h}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 text-[14px] text-body transition-colors hover:text-ink"
                  >
                    {r.l}
                    <span className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-eyebrow text-mute">Newsletter</h4>
            <p className="mt-4 text-[14px] leading-6 text-body">
              One email a month. New tools, weird experiments, the occasional essay.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex items-center rounded-pill border border-hairline bg-canvas-soft pl-4 pr-1 py-1 transition-colors focus-within:border-white/30"
            >
              <input
                type="email"
                placeholder="you@studio.cn"
                className="flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-mute"
              />
              <button
                type="submit"
                data-cursor="hover"
                className="ml-1 rounded-pill bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[1.4px] text-canvas transition-colors hover:bg-ink-hover"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[1.4px] text-mute">
            <span>© 2026 Oscar Studio</span>
            <span className="h-3 w-px bg-hairline" />
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              粤ICP备2026012488号-1
            </a>
            <span className="h-3 w-px bg-hairline" />
            <span>v3.0.0 · atlas</span>
          </div>
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            data-cursor="hover"
            className="flex items-center gap-2 rounded-pill border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-[1.4px] text-mute transition-colors hover:border-white/25 hover:text-ink"
          >
            <span>scroll to top</span>
            <span>↑</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
