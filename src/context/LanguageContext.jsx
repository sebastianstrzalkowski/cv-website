import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

const SUPPORTED = ['en', 'pl'];

const setMeta = (selector, content) => {
  const el = document.head.querySelector(selector);
  if (el && content) el.setAttribute('content', content);
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    if (!SUPPORTED.includes(i18n.language)) {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
      document.documentElement.lang = lng;

      // Keep the document title and description in the visitor's language.
      // Open Graph tags stay static (scrapers do not run JS).
      const title = i18n.t('seo.title');
      const description = i18n.t('seo.description');
      if (title) document.title = title;
      setMeta('meta[name="description"]', description);
    };

    handleLanguageChange(i18n.language);
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
