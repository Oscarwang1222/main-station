import { useEffect } from 'react';
import type { HomeTheme } from '../hooks/useHomeTheme';

declare global {
  interface Window {
    API_BASE?: string;
    UPLOAD_BASE?: string;
    OscarBackground?: {
      set: (url: string) => void;
      clear: () => void;
    };
  }
}

const DEFAULT_API_BASE = 'https://api.oscarstudio.cn';
const DEFAULT_UPLOAD_BASE = 'https://api.oscarstudio.cn';
const BG_STORAGE_KEY = 'lg-bg';
const DEFAULT_BG = 'https://api.oscarstudio.cn/default-bg.jpeg';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

// 已是绝对 URL（http(s):// 或 // 开头）则原样返回；否则拼上 UPLOAD_BASE。
// 解决 DEFAULT_BG 这种硬编码绝对 URL 被二次前缀后变成无效 URL 的 bug。
function resolveBgUrl(raw: string): string {
  return /^(https?:)?\/\//i.test(raw) ? raw : (window.UPLOAD_BASE || DEFAULT_UPLOAD_BASE) + raw;
}

// 把背景图放到 fixed 层而不是 body.style.backgroundImage，
// 这样 filter: blur 只作用于背景，前景不受影响。
// 遮罩是另一个 fixed 层（半透明黑色叠加）。
function applyBackgroundFx(ui: { backgroundImage?: string | null; backgroundOverlay?: number; backgroundBlur?: number }) {
  if (typeof document === 'undefined') return;
  const oldLayer = document.getElementById('userBgLayer');
  const oldMask = document.getElementById('userBgMask');
  if (oldLayer) oldLayer.remove();
  if (oldMask) oldMask.remove();
  const body = document.body;
  body.style.backgroundImage = '';
  body.style.backgroundSize = '';
  body.style.backgroundPosition = '';
  body.style.backgroundRepeat = '';
  body.style.backgroundAttachment = '';
  delete body.dataset.bgReady;

  if (!ui.backgroundImage) return;

  const bgUrl = resolveBgUrl(ui.backgroundImage);
  const overlay = typeof ui.backgroundOverlay === 'number' && Number.isFinite(ui.backgroundOverlay) ? ui.backgroundOverlay : 0;
  const blur = typeof ui.backgroundBlur === 'number' && Number.isFinite(ui.backgroundBlur) ? ui.backgroundBlur : 0;

  // 使用正 z-index 分层而不是负值，避免 Safari 中 body 上 stacking context
  // 把 z-index:-1 误压在 body 背景下、导致整层背景消失。
  //   userBgLayer : 0
  //   userBgMask  : 1
  //   内容（依赖外部 CSS 的 z-index）必须 ≥ 2
  // 兜底 background-color: var(--dark)：图片加载失败时整页仍是品牌深色，
  // 避免 body:has(#userBgLayer) 把 body 强制 transparent 后露出浏览器白底。
  const layer = document.createElement('div');
  layer.id = 'userBgLayer';
  layer.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:0',
    'pointer-events:none',
    'background-color:var(--dark)',
    `background-image:url(${bgUrl})`,
    'background-size:cover',
    'background-position:center',
    'background-repeat:no-repeat',
    'background-attachment:fixed',
    blur > 0 ? `filter:blur(${blur}px)` : '',
    blur > 0 ? '-webkit-filter:blur(' + blur + 'px)' : '',
    // 防止 blur 触发整页重绘导致 Safari 丢帧
    blur > 0 ? 'will-change:transform' : '',
    blur > 0 ? 'transform:translateZ(0)' : '',
  ].filter(Boolean).join(';');
  document.body.appendChild(layer);

  if (overlay > 0) {
    const mask = document.createElement('div');
    mask.id = 'userBgMask';
    mask.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:1',
      'pointer-events:none',
      'background:#000',
      `opacity:${overlay}`,
    ].join(';');
    document.body.appendChild(mask);
  }

  // 让页面内容（默认 z-index:auto 同级）位于 userBgLayer 之上。
  // 调用方不需要再设 isolation:isolate，但保持兼容历史。
  body.style.background = 'transparent';
  body.dataset.bgReady = '1';
}

function applyBackground(url: string) {
  applyBackgroundFx({ backgroundImage: url });
}

function clearBackground() {
  applyBackgroundFx({ backgroundImage: null });
}

function persist(url: string) {
  try {
    window.localStorage.setItem(BG_STORAGE_KEY, url);
  } catch {
    /* ignore quota errors */
  }
}

async function loadFromApi(): Promise<{ backgroundImage: string; backgroundOverlay?: number; backgroundBlur?: number } | null> {
  const token = window.localStorage.getItem('ai_token') || readCookie('userToken');
  if (!token) return null;
  const apiBase = (window.API_BASE || DEFAULT_API_BASE) + '/api';
  try {
    const resp = await fetch(`${apiBase}/ui`, { credentials: 'include' });
    if (!resp.ok) return null;
    const data = await resp.json().catch(() => null);
    if (!data?.success || !data.ui?.backgroundImage) return null;
    // 直接返回原始相对路径，由 applyBackgroundFx 统一拼接，
    // 避免重复前缀导致 URL 损坏。
    return {
      backgroundImage: data.ui.backgroundImage,
      backgroundOverlay: data.ui.backgroundOverlay,
      backgroundBlur: data.ui.backgroundBlur,
    };
  } catch {
    return null;
  }
}

export function useUserBackground(homeTheme: HomeTheme = 'classic') {
  useEffect(() => {
    // Atlas（crazy/3 实验主题）有自带的 Aurora / DotGrid / Silk 背景效果，
    // 再叠用户背景图会撞色。这里完全跳过自定义背景挂载。
    if (homeTheme === 'atlas') return;

    let cancelled = false;

    const cached = window.localStorage.getItem(BG_STORAGE_KEY);
    if (cached) applyBackground(cached);

    window.OscarBackground = {
      set(url: string) {
        applyBackground(url);
        persist(url);
      },
      clear() {
        clearBackground();
        try {
          window.localStorage.removeItem(BG_STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
    };

    loadFromApi().then((cfg) => {
      if (cancelled) return;
      if (cfg) {
        applyBackgroundFx(cfg);
        persist(resolveBgUrl(cfg.backgroundImage));
        return;
      }
      // 无用户背景时使用默认背景
      const alreadySet = window.localStorage.getItem(BG_STORAGE_KEY);
      if (!alreadySet) applyBackground(DEFAULT_BG);
    });

    return () => {
      cancelled = true;
    };
  }, [homeTheme]);
}
