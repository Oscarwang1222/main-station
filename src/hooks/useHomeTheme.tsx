import { useCallback, useEffect, useState } from 'react';

export type HomeTheme = 'classic' | 'atlas';

const STORAGE_KEY = 'oscar-home-theme';
const DEFAULT_HOME_THEME: HomeTheme = 'atlas';

const API_BASE_FALLBACK = 'https://api.oscarstudio.cn';

function isValidTheme(v: unknown): v is HomeTheme {
  return v === 'classic' || v === 'atlas';
}

function readStoredTheme(): HomeTheme {
  if (typeof localStorage === 'undefined') return DEFAULT_HOME_THEME;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (isValidTheme(v)) return v;
  } catch { /* ignore */ }
  return DEFAULT_HOME_THEME;
}

function writeStoredTheme(t: HomeTheme) {
  try { localStorage.setItem(STORAGE_KEY, t); } catch { /* ignore */ }
}

function readToken(): string | null {
  if (typeof document !== 'undefined') {
    const m = document.cookie.match(/(?:^|; )userToken=([^;]*)/);
    if (m) return decodeURIComponent(m[1]);
  }
  try {
    const ls = localStorage.getItem('ai_token') || localStorage.getItem('userToken');
    if (ls) return ls;
  } catch { /* ignore */ }
  return null;
}

function applyThemeAttr(t: HomeTheme) {
  if (typeof document === 'undefined') return;
  const cur = document.documentElement.getAttribute('data-home-theme');
  if (cur !== t) document.documentElement.setAttribute('data-home-theme', t);
}

export function useHomeTheme(): [HomeTheme, (t: HomeTheme) => void] {
  const [theme, setThemeState] = useState<HomeTheme>(readStoredTheme);

  // 1. 同步挂到 <html data-home-theme> 上
  //    （index.html 里的 pre-React 脚本会先设一次，这里再保证一致）
  useEffect(() => {
    applyThemeAttr(theme);
  }, [theme]);

  // 2. 登录态下，把服务端 ui_config.homeTheme 拉下来覆盖本地缓存。
  //    仅覆盖一次，避免用户在本站改主题之后又被服务端旧值反向冲掉。
  useEffect(() => {
    let cancelled = false;
    const token = readToken();
    if (!token) return;

    (async () => {
      try {
        const apiBase = (window.API_BASE || API_BASE_FALLBACK) + '/api';
        const resp = await fetch(`${apiBase}/ui`, { credentials: 'include' });
        if (!resp.ok) return;
        const data = await resp.json().catch(() => null);
        if (cancelled || !data?.success) return;
        const remote = data?.ui?.homeTheme;
        if (isValidTheme(remote) && remote !== readStoredTheme()) {
          writeStoredTheme(remote);
          setThemeState(remote);
        }
      } catch { /* ignore */ }
    })();

    return () => { cancelled = true; };
  }, []);

  const setTheme = useCallback((t: HomeTheme) => {
    if (!isValidTheme(t)) return;
    setThemeState(t);
    writeStoredTheme(t);
    // 同步写服务端（fire-and-forget）
    const token = readToken();
    if (token) {
      try {
        const apiBase = (window.API_BASE || API_BASE_FALLBACK) + '/api';
        fetch(`${apiBase}/ui`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify({ homeTheme: t }),
        }).catch(() => { /* ignore */ });
      } catch { /* ignore */ }
    }
  }, []);

  return [theme, setTheme];
}
