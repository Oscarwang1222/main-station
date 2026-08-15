import { useEffect } from 'react';

export function useKeyPress(key: string, handler: (e: KeyboardEvent) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === key) handler(e);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [key, handler, enabled]);
}

export function useComboKey(combo: string, handler: (e: KeyboardEvent) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const [mod, key] = combo.split('+').map((s) => s.trim().toLowerCase());
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const matches =
        ((mod === 'cmd' || mod === 'meta') && (e.metaKey || e.ctrlKey) && k === key) ||
        (mod === 'ctrl' && e.ctrlKey && k === key) ||
        (mod === 'shift' && e.shiftKey && k === key);
      if (matches) {
        e.preventDefault();
        handler(e);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [combo, handler, enabled]);
}
