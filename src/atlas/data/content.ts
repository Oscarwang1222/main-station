export interface Product {
  id: string;
  index: string;
  name: string;
  tag: string;
  domain: string;
  accent: 'mind' | 'labs' | 'canvas' | 'arena' | 'kit';
  headline: string;
  body: string;
  chips: string[];
  meta: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: 'mind',
    index: '01',
    name: 'MIND',
    tag: 'AI',
    domain: 'https://ai.oscarstudio.cn',
    accent: 'mind',
    headline: 'An AI studio that thinks alongside you.',
    body: 'Multiple frontier models, one calm interface. Chat, generate speech, run commands — quietly powerful.',
    chips: ['DeepSeek', 'MIMO-TTS', 'Opilot', 'Chat'],
    meta: [
      { label: 'MODELS', value: '4' },
      { label: 'LATENCY', value: '42ms' },
    ],
  },
  {
    id: 'labs',
    index: '02',
    name: 'LABS',
    tag: 'TEACHING',
    domain: 'https://edu.oscarstudio.cn',
    accent: 'labs',
    headline: 'Seventeen tools for the classroom.',
    body: 'Function plotters, geometry boards, equation balancers, timers, name pickers. Built by teachers, for teachers.',
    chips: ['Plotter', 'Geometry', 'Timer', 'Picker'],
    meta: [
      { label: 'TOOLS', value: '17+' },
      { label: 'UPDATES', value: 'weekly' },
    ],
  },
  {
    id: 'canvas',
    index: '03',
    name: 'CANVAS',
    tag: 'HTML-PPT',
    domain: 'https://ppt.oscarstudio.cn',
    accent: 'canvas',
    headline: 'Present in the browser, natively.',
    body: 'Pure HTML, CSS, and JavaScript decks. No install, no conversion, no broken fonts. Ship a URL, present.',
    chips: ['Templates', 'Animations', 'Layouts'],
    meta: [
      { label: 'TEMPLATES', value: '12' },
      { label: 'EXPORT', value: 'html' },
    ],
  },
  {
    id: 'arena',
    index: '04',
    name: 'ARENA',
    tag: 'GAMES',
    domain: 'https://games.oscarstudio.cn',
    accent: 'arena',
    headline: 'Puzzle games for restless minds.',
    body: 'Chinese chess, Go, Gomoku, 2048, and a handful of originals. Train logic, kill five minutes.',
    chips: ['Chess', 'Gomoku', '2048', '24 Points'],
    meta: [
      { label: 'GAMES', value: '10+' },
      { label: 'ONLINE', value: 'snake' },
    ],
  },
  {
    id: 'kit',
    index: '05',
    name: 'KIT',
    tag: 'UTILITY',
    domain: 'https://tools.oscarstudio.cn',
    accent: 'kit',
    headline: 'Tiny utilities for the everyday.',
    body: 'Whiteboards, todos, word counts, Markdown, encoders — the small tools you reach for without thinking. Open in a tab, get on with your day.',
    chips: ['Whiteboard', 'Todo', 'Markdown', 'Encoder'],
    meta: [
      { label: 'TOOLS', value: '5+' },
      { label: 'SYNC', value: 'cloud' },
    ],
  },
];

export const navLinks = [
  { index: '01', label: 'MIND', accent: 'mind' as const, href: '#mind' },
  { index: '02', label: 'LABS', accent: 'labs' as const, href: '#labs' },
  { index: '03', label: 'CANVAS', accent: 'canvas' as const, href: '#canvas' },
  { index: '04', label: 'ARENA', accent: 'arena' as const, href: '#arena' },
  { index: '05', label: 'KIT', accent: 'kit' as const, href: '#kit' },
];

export const heroHeadline = {
  line1: 'We build tools',
  line2: 'for thinkers.',
  emphasis: 'thinkers.',
};

export const heroSub = 'Oscar Studio is a constellation of five independent products — AI, teaching, presentations, games, and everyday utilities — designed for people who love to make things.';

export const manifesto = [
  "We don't believe",
  'in feature lists.',
  '',
  'We believe in',
  'quiet software,',
  'precise interactions,',
  'and tools that',
  'disappear',
  'the moment you need them to.',
];

export const numbers = [
  { value: 5, suffix: '', label: 'PRODUCTS LIVE' },
  { value: 17, suffix: '+', label: 'TEACHING TOOLS' },
  { value: 10, suffix: '+', label: 'PUZZLE GAMES' },
  { value: 2026, suffix: '', label: 'YEAR OF LAUNCH' },
];

export const nodeStatus = [
  { name: 'AI.MIND', domain: 'mind', status: 'ONLINE', latency: 42 },
  { name: 'TEACH.LABS', domain: 'labs', status: 'ONLINE', latency: 38 },
  { name: 'PPT.CANVAS', domain: 'canvas', status: 'ONLINE', latency: 51 },
  { name: 'GAME.ARENA', domain: 'arena', status: 'ONLINE', latency: 47 },
  { name: 'UTILITY.KIT', domain: 'kit', status: 'ONLINE', latency: 33 },
];

export const terminalLines: { type: 'cmd' | 'out' | 'art' | 'ok' | 'meta'; text: string; delay: number }[] = [
  { type: 'cmd', text: '$ ask "plot f(x) = x² sin(x) over [-8, 8]"', delay: 0 },
  { type: 'out', text: '> connecting to ai.oscarstudio.cn ...', delay: 600 },
  { type: 'ok', text: '  [200 OK] 38ms', delay: 900 },
  { type: 'out', text: '> loading teaching tools ...', delay: 1300 },
  { type: 'ok', text: '  [OK]', delay: 1700 },
  { type: 'out', text: '> rendering curve ...', delay: 2000 },
  { type: 'art', text: '╱╲     ╱╲   ╱╲                ', delay: 2400 },
  { type: 'art', text: '  ╲   ╱  ╲ ╱  ╲   ╱╲           ', delay: 2550 },
  { type: 'art', text: '   ╲ ╱    ╲╱    ╲ ╱  ╲___      ', delay: 2700 },
  { type: 'out', text: '> done in 0.34s', delay: 3100 },
  { type: 'meta', text: 'press [tab] to switch product · /help for commands', delay: 3500 },
];
