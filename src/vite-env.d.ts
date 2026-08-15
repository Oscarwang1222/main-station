/// <reference types="vite/client" />

// Vite 的 ?inline 后缀：把 CSS/其他静态资源作为字符串导入而不是单独 <link> 标签。
// AtlasApp.tsx 用它把 Tailwind 编译产物内联到 chunk 里，避免主 HTML 预加载。
declare module '*.css?inline' {
  const css: string;
  export default css;
}
