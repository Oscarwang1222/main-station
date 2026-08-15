import { useI18n } from '../i18n/I18nProvider';
import type { TranslationKey } from '../i18n/translations';

type Props = {
  id: string;
  icon: string;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  actionKey: TranslationKey;
  href: string;
  external?: boolean;
};

export default function ToolSection({
  id,
  icon,
  titleKey,
  descKey,
  actionKey,
  href,
  external,
}: Props) {
  const { t } = useI18n();
  return (
    <section id={id} className="tool-section">
      <div className="tool-card">
        <div className="tool-icon">{icon}</div>
        <h2>{t(titleKey)}</h2>
        <p>{t(descKey)}</p>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="btn btn-ghost"
        >
          {t(actionKey)} →
        </a>
      </div>
    </section>
  );
}
