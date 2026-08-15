import { motion } from 'framer-motion';
import { products } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Pill } from '@/components/ui/Pill';
import { SpotlightCard } from '@/components/effects/SpotlightCard';
import { VariableProximity } from '@/components/effects/VariableProximity';
import { cn } from '@/lib/cn';

const accentBg = {
  mind: 'bg-accent-mind',
  labs: 'bg-accent-labs',
  canvas: 'bg-accent-canvas',
  arena: 'bg-accent-arena',
  kit: 'bg-accent-kit',
} as const;

const accentText = {
  mind: 'text-accent-mind',
  labs: 'text-accent-labs',
  canvas: 'text-accent-canvas',
  arena: 'text-accent-arena',
  kit: 'text-accent-kit',
} as const;

const accentBorder = {
  mind: 'border-accent-mind/40',
  labs: 'border-accent-labs/40',
  canvas: 'border-accent-canvas/40',
  arena: 'border-accent-arena/40',
  kit: 'border-accent-kit/40',
} as const;

export function ToolsBento() {
  return (
    <section id="tools" className="relative py-32">
      <div className="mx-auto max-w-container px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow index="03" accent="white">
              Five products, one studio
            </Eyebrow>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(36px,5vw,72px)] font-light leading-[1.05] tracking-[-0.03em]">
              <VariableProximity
                text="Each one is a quiet piece of software that does one job very well."
                by="word"
                reveal
                revealDelay={0.1}
                revealStagger={0.02}
                radius={160}
                scaleRange={[1, 1.22]}
                fromFontWeight={300}
                toFontWeight={700}
                fromLetterSpacing={-0.03}
                toLetterSpacing={-0.05}
                falloff="ease-out"
              />
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-7 text-body">
            Click any tile to open the product. They live at their own domains — the studio just keeps them in one orbit.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {/* LEFT COLUMN: MIND (large) + ARENA stacked */}
          <div className="grid grid-cols-1 gap-4 md:col-span-7 md:gap-5">
            {/* MIND — large tile */}
            <motion.div
              id="mind"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard accent="mind" href={products[0].domain} className="h-full">
                <div className="flex h-full flex-col justify-between p-8 md:p-10">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-eyebrow text-mute">/ {products[0].index}</span>
                      <span className="flex items-center gap-2 font-mono text-eyebrow text-accent-mind">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-mind" />
                        ONLINE
                      </span>
                    </div>
                    <h3 className="mt-12 font-display text-[clamp(40px,6vw,80px)] font-light leading-none tracking-[-0.04em]">
                      {products[0].name}
                    </h3>
                    <p className="mt-4 max-w-md font-mono text-eyebrow text-mute">
                      {products[0].tag} · ai.oscarstudio.cn
                    </p>
                  </div>
                  <div className="mt-12">
                    <p className="text-[18px] leading-7 text-body">
                      {products[0].headline}
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-mute">
                      {products[0].body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {products[0].chips.map((c) => (
                        <span
                          key={c}
                          className={cn(
                            'rounded-tile border px-3 py-1 font-mono text-[11px] uppercase tracking-[1.2px]',
                            accentBorder[products[0].accent],
                            accentText[products[0].accent],
                          )}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <NeuralArt />
                </div>
              </SpotlightCard>
            </motion.div>

            {/* ARENA — full-bleed tile inside left column */}
            <motion.div
              id="arena"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard accent="arena" href={products[3].domain} className="h-full">
                <div className="grid h-full grid-cols-1 gap-6 p-8 md:grid-cols-7 md:gap-6 md:p-9">
                  <div className="md:col-span-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-eyebrow text-mute">/ {products[3].index}</span>
                      <span className="flex items-center gap-2 font-mono text-eyebrow text-accent-arena">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-arena" />
                        ONLINE
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[clamp(36px,4.5vw,64px)] font-light leading-none tracking-[-0.04em]">
                      {products[3].name}
                    </h3>
                    <p className="mt-3 font-mono text-eyebrow text-mute">
                      {products[3].tag} · games.oscarstudio.cn
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-[15px] leading-6 text-body">{products[3].headline}</p>
                    <p className="mt-2 text-[13px] leading-6 text-mute">{products[3].body}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {products[3].chips.map((c) => (
                        <span
                          key={c}
                          className={cn(
                            'rounded-tile border border-accent-arena/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[1.2px] text-accent-arena',
                          )}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end justify-end md:col-span-2">
                    <Board />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: LABS + CANVAS + KIT stacked */}
          <div className="grid grid-cols-1 gap-4 md:col-span-5 md:gap-5">
            {/* LABS */}
            <motion.div
              id="labs"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmallCard product={products[1]} />
            </motion.div>

            {/* CANVAS */}
            <motion.div
              id="canvas"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmallCard product={products[2]} />
            </motion.div>

            {/* KIT — fifth product, same SmallCard style */}
            <motion.div
              id="kit"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmallCard product={products[4]} />
            </motion.div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-eyebrow text-mute">
            Press 1-5 to jump · ⌘K to search
          </p>
          <div className="flex gap-2">
            {products.map((p) => (
              <Pill
                key={p.id}
                size="sm"
                variant="ghost"
                href={p.domain}
                iconRight={<span>↗</span>}
                data-cursor="hover"
              >
                {p.name}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallCard({ product }: { product: typeof products[number] }) {
  return (
    <SpotlightCard accent={product.accent} href={product.domain} className="h-full">
      <div className="flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-eyebrow text-mute">/ {product.index}</span>
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-tile',
              accentBg[product.accent],
            )}
          />
        </div>
        <div className="mt-8">
          <h3 className="font-display text-[clamp(32px,4vw,48px)] font-light leading-none tracking-[-0.03em]">
            {product.name}
          </h3>
          <p className="mt-3 font-mono text-eyebrow text-mute">
            {product.tag}
          </p>
        </div>
        <p className="mt-6 text-[15px] leading-7 text-body">{product.headline}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {product.chips.map((c) => (
            <span
              key={c}
              className="rounded-tile border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[1.2px] text-mute"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-4 font-mono text-eyebrow text-mute">
          <span>open →</span>
          <span className="text-ink">{product.domain.replace('https://', '')}</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

function NeuralArt() {
  const nodes = [
    { x: 12, y: 28 },
    { x: 28, y: 14 },
    { x: 28, y: 42 },
    { x: 50, y: 8 },
    { x: 50, y: 28 },
    { x: 50, y: 48 },
    { x: 72, y: 14 },
    { x: 72, y: 42 },
    { x: 88, y: 28 },
  ];
  const links: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [7, 8],
  ];
  return (
    <svg
      className="pointer-events-none mt-10 h-24 w-full"
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {links.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        return (
          <motion.line
            key={i}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="rgba(91,199,255,0.5)"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="1.2"
          fill="#5BC7FF"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

function Board() {
  const cells = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="grid w-full max-w-[200px] grid-cols-4 gap-1 rounded-tile border border-hairline p-2">
      {cells.map((i) => (
        <div
          key={i}
          className={cn(
            'aspect-square rounded-tile',
            i === 0 && 'bg-accent-arena',
            i === 5 && 'bg-accent-arena/70',
            i === 10 && 'bg-accent-arena',
            i === 15 && 'bg-canvas-mid',
            i !== 0 && i !== 5 && i !== 10 && i !== 15 && 'bg-canvas-mid/40',
          )}
        />
      ))}
    </div>
  );
}

export default ToolsBento;
