import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';
import { calculateYearsOfExperience } from './data/developerData';

const resources = {
  en: {
    translation: translationEN
  },
  pl: {
    translation: translationPL
  }
};

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
  resources,
  fallbackLng: 'en',
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage', 'cookie'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
  },
  interpolation: {
    escapeValue: false,
    defaultVariables: {
      years: calculateYearsOfExperience(7, 2018)
    }
  }
});

export default i18n;