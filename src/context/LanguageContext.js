// src/context/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Ensure we have a valid language on first load
  useEffect(() => {
    if (!i18n.language || (i18n.language !== 'en' && i18n.language !== 'pl')) {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
    };

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