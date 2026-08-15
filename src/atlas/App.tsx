import { useEffect, useState } from 'react';
import Loader from './components/sections/Loader';
import TopNav from './components/nav/TopNav';
import MobileDock from './components/nav/MobileDock';
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import NumbersStrip from './components/sections/NumbersStrip';
import ToolsBento from './components/sections/ToolsBento';
import TerminalDemo from './components/sections/TerminalDemo';
import AnnouncementMarquee from './components/sections/AnnouncementMarquee';
import Footer from './components/sections/Footer';
import CustomCursor from './components/effects/CustomCursor';
import ScrollProgress from './components/effects/ScrollProgress';
import CommandPalette from './components/nav/CommandPalette';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative bg-canvas text-ink font-display">
      <Loader onDone={() => setBooted(true)} />
      <CustomCursor />
      <ScrollProgress />
      <TopNav booted={booted} onOpenPalette={() => setPaletteOpen(true)} />
      <MobileDock />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main className="relative">
        <Hero booted={booted} />
        <Manifesto />
        <NumbersStrip />
        <ToolsBento />
        <TerminalDemo />
        <AnnouncementMarquee />
      </main>
      <Footer />
    </div>
  );
}
