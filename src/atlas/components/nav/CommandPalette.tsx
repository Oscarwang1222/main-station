import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/content';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface Cmd {
  id: string;
  label: string;
  hint: string;
  group: 'navigate' | 'product' | 'system';
  run: () => void;
}

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Cmd[] = useMemo(
    () => [
      ...products.map<Cmd>((p) => ({
        id: `open-${p.id}`,
        label: `Open ${p.name}`,
        hint: p.domain,
        group: 'product',
        run: () => window.open(p.domain, '_blank', 'noopener'),
      })),
      {
        id: 'goto-docs',
        label: 'Open Documentation',
        hint: 'docs.oscarstudio.cn',
        group: 'navigate',
        run: () => window.open('https://docs.oscarstudio.cn', '_blank', 'noopener'),
      },
      {
        id: 'goto-github',
        label: 'Open GitHub',
        hint: 'github.com/oscarstudio',
        group: 'navigate',
        run: () => window.open('https://github.com/oscarstudio', '_blank', 'noopener'),
      },
      {
        id: 'goto-mind',
        label: 'Scroll to MIND',
        hint: '#mind',
        group: 'navigate',
        run: () => document.querySelector('#mind')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'goto-labs',
        label: 'Scroll to LABS',
        hint: '#labs',
        group: 'navigate',
        run: () => document.querySelector('#labs')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'goto-canvas',
        label: 'Scroll to CANVAS',
        hint: '#canvas',
        group: 'navigate',
        run: () => document.querySelector('#canvas')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'goto-arena',
        label: 'Scroll to ARENA',
        hint: '#arena',
        group: 'navigate',
        run: () => document.querySelector('#arena')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'goto-top',
        label: 'Scroll to top',
        hint: 'G',
        group: 'navigate',
        run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      },
      {
        id: 'reset-view',
        label: 'Reset view',
        hint: 'esc',
        group: 'system',
        run: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filtered[active];
        if (cmd) {
          cmd.run();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[300] flex items-start justify-center bg-canvas/70 px-4 pt-[14vh] backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-card border border-hairline bg-canvas-soft shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <span className="font-mono text-eyebrow text-mute">⌘ K</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Type a command, product, or destination…"
                className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-mute"
              />
              <kbd className="rounded-tile border border-hairline px-1.5 py-0.5 font-mono text-[10px] uppercase text-mute">
                esc
              </kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-[13px] text-mute">No matches.</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      c.run();
                      onClose();
                    }}
                    data-cursor="hover"
                    className={`flex w-full items-center justify-between rounded-tile px-3 py-2 text-left transition-colors ${
                      i === active ? 'bg-white/[0.06]' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[1.2px] ${
                          c.group === 'product'
                            ? 'text-accent-sunset'
                            : c.group === 'navigate'
                            ? 'text-accent-mind'
                            : 'text-mute'
                        }`}
                      >
                        {c.group}
                      </span>
                      <span className="text-[13px] text-ink">{c.label}</span>
                    </div>
                    <span className="font-mono text-[11px] text-mute">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-[1.2px] text-mute">
              <span>↑↓ navigate · ↵ run</span>
              <span>{isMac ? 'macOS' : 'platform'} · v3.0.0</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
