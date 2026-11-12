import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';
import { calculateYearsOfExperience } from './data/developerData';

export const SUPPORTED_LANGUAGES = ['en', 'pl'];

// Each language has its own prerendered URL (/ and /pl/), so the page itself decides the
// language: the path first, then <html lang> written by scripts/prerender.mjs.
// The server render passes the language explicitly via changeLanguage().
const detectLanguage = () => {
  if (typeof document === 'undefined') return 'en';
  if (/^\/pl(\/|$)/.test(window.location.pathname)) return 'pl';
  const tag = document.documentElement.lang;
  return SUPPORTED_LANGUAGES.includes(tag) ? tag : 'en';
};

i18n
.use(initReactI18next)
.init({
  resources: {
    en: { translation: translationEN },
    pl: { translation: translationPL },
  },
  lng: detectLanguage(),
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_LANGUAGES,
  initAsync: false,
  interpolation: {
    escapeValue: false,
    defaultVariables: {
      years: calculateYearsOfExperience(7, 2018)
    }
  }
});

export default i18n;
