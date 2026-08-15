import { Marquee } from '@/components/effects/Marquee';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function AnnouncementMarquee() {
  return (
    <section className="relative border-y border-hairline py-16">
      <div className="mx-auto max-w-container px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Eyebrow index="05" accent="white">
            What just shipped
          </Eyebrow>
          <span className="font-mono text-eyebrow text-mute">
            /var/log/oscar · 6 entries
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Marquee duration={48} />
        <Marquee duration={62} reverse />
        <Marquee duration={38} />
      </div>
    </section>
  );
}

export default AnnouncementMarquee;
