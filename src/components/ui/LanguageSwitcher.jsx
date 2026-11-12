import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_PATHS, rememberLanguage } from '../../languageRouting';

const LANGUAGES = ['pl', 'en'];

// Real links: crawlers discover /pl/ from them and agents switch language by navigating.
const LanguageSwitcher = ({ small = false }) => {
  const { i18n, t } = useTranslation();
  const sizing = small ? 'min-h-9 px-2.5 text-xs' : 'min-h-10 px-3 text-sm';

  return (
    <div className="flex gap-1" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((lng) => {
        const active = i18n.language === lng;
        return (
          <a
            key={lng}
            href={LANGUAGE_PATHS[lng]}
            hrefLang={lng}
            lang={lng}
            aria-current={active ? 'page' : undefined}
            onClick={(event) => {
              rememberLanguage(lng);
              // Keep the reader on the same section after switching.
              if (window.location.hash) {
                event.preventDefault();
                window.location.assign(`${LANGUAGE_PATHS[lng]}${window.location.hash}`);
              }
            }}
            className={`${sizing} inline-flex items-center rounded-full font-semibold uppercase tracking-wide transition-colors ${
              active
                ? 'bg-emerald-400 text-gray-950'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {lng}
          </a>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
