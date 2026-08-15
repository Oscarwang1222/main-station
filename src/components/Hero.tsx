import { useI18n } from '../i18n/I18nProvider';

export default function Hero() {
  const { t } = useI18n();
  return (
    <section id="hero" className="hero">
      <div className="hero-block">
        <h1>{t('heroTitle')}</h1>
        <p>{t('heroSubtitle')}</p>
        <div className="hero-buttons">
          <a href="#ai" className="btn btn-primary">{t('heroPrimary')}</a>
          <a
            href="https://github.com/oscarstudio"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            {t('heroSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
