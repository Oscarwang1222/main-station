export interface Announcement {
  id: number;
  date: string;
  content: string;
}

export const announcements: Announcement[] = [
  {
    id: 7,
    date: '2026-04-07',
    content: 'New AI tools launched — AI_Launcher and MIMO-TTS voice generator are live.',
  },
  {
    id: 6,
    date: '2026-01-06',
    content: 'Word Match is live — a playful way to drill vocabulary.',
  },
  {
    id: 5,
    date: '2025-12-31',
    content: 'New Year, new interface. Double-click the logo for fireworks.',
  },
  {
    id: 4,
    date: '2025-12-25',
    content: 'Smart name picker is officially live.',
  },
  {
    id: 3,
    date: '2025-12-16',
    content: 'Homework system v1.0 ships to all users.',
  },
  {
    id: 2,
    date: '2025-12-15',
    content: 'Announcement feed and on-site clock are online.',
  },
];
