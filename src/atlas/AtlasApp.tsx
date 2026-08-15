import { StrictMode, useEffect } from 'react';
import App from './App';
// 用 ?inline 让 Vite 把 CSS 作为字符串内联到 chunk，避免主 HTML <link>
// 预加载 28kB Atlas CSS 给所有 classic 用户下载。
import atlasCss from './styles/globals.css?inline';

let styleInjected = false;

/**
 * Atlas 主组件：以 #atlas-scope 为根，挂载 crazy/3 的整棵子树。
 *
 * 之所以外面套一层带 id 的 div：
 *   1. tailwind.config.ts 里把 important 设为 '#atlas-scope'，
 *      Atlas 内部所有 utility 类只在 #atlas-scope 子树里生效，
 *      这样不会冲掉主站（classic）那部分的全局样式。
 *   2. 子树与 classic 树互不干扰，可以独立卸载/重建（用户切换主题时）。
 */
export default function AtlasApp() {
  useEffect(() => {
    // 同一 chunk 在 StrictMode 下可能挂载两次；用 module-level 标志去重。
    if (styleInjected) return;
    styleInjected = true;
    const tag = document.createElement('style');
    tag.setAttribute('data-atlas-styles', '');
    tag.textContent = atlasCss;
    document.head.appendChild(tag);
  }, []);

  return (
    <StrictMode>
      <div id="atlas-scope" className="contents-host">
        <App />
      </div>
    </StrictMode>
  );
}
