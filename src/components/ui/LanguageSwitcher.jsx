import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = ['pl', 'en'];

const LanguageSwitcher = ({ small = false }) => {
  const { i18n, t } = useTranslation();
  const sizing = small ? 'min-h-9 px-2.5 text-xs' : 'min-h-10 px-3 text-sm';

  return (
    <div className="flex gap-1" role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((lng) => {
        const active = i18n.language === lng;
        return (
          <button
            key={lng}
            type="button"
            lang={lng}
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(lng)}
            className={`${sizing} rounded-full font-semibold uppercase tracking-wide transition-colors ${
              active
                ? 'bg-emerald-400 text-gray-950'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
