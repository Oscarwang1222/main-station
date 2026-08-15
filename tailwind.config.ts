import type { Config } from 'tailwindcss';

/**
 * Tailwind v3 配置
 * ----------------------------------------------------
 * 这套 Tailwind **只服务 Atlas（crazy/3 集成进来的实验主题）**，
 * 不能让它污染主站（classic）那部分。
 *
 * 隔离手段（两道）：
 *   1. content 只扫 src/atlas/**，主站其它 .tsx 里的 className 不会被识别成 utility。
 *   2. important: '#atlas-scope' —— Atlas 内部编译出来的所有
 *      utility 都会自动带 #atlas-scope 前缀（CSS 选择器特异性
 *      提升到 (0,1,0)），与主站的全局样式无冲突。
 *   3. corePlugins.preflight: false —— 关闭 Tailwind 的全局
 *      reset。Atlas 需要的 reset 由 globals.css 手动写在
 *      #atlas-scope 后代选择器里。
 *
 * 主站其余 UI（classic）继续走 src/styles/global.css 的普通 CSS。
 */
const config: Config = {
  content: ['./src/atlas/**/*.{ts,tsx}'],
  important: '#atlas-scope',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        canvas: '#0a0a0a',
        'canvas-soft': '#1a1c20',
        'canvas-card': '#191919',
        'canvas-mid': '#363a3f',
        hairline: '#212327',
        ink: '#ffffff',
        'ink-hover': '#fafaf7',
        body: '#dadbdf',
        mute: '#7d8187',
        accent: {
          sunset: '#ff7a17',
          dusk: '#7c3aed',
          mind: '#5BC7FF',
          labs: '#7CFFB2',
          canvas: '#FFB35C',
          arena: '#FF5C9E',
          kit: '#B57CFF',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'eyebrow': ['12px', { lineHeight: '16px', letterSpacing: '1.2px' }],
        'label-mono': ['14px', { lineHeight: '20px', letterSpacing: '1.4px' }],
        'display-xs': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'display-sm': ['32px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
        'display-md': ['48px', { lineHeight: '52px', letterSpacing: '-0.025em' }],
        'display-lg': ['72px', { lineHeight: '76px', letterSpacing: '-0.03em' }],
        'display-xl': ['96px', { lineHeight: '96px', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        pill: '9999px',
        card: '12px',
        tile: '4px',
      },
      transitionTimingFunction: {
        snap: 'cubic-bezier(0.22, 1, 0.36, 1)',
        gentle: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
