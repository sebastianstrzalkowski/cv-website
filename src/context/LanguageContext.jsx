import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext({ currentLanguage: 'en' });

// The language is fixed per URL (/ or /pl/) and the prerendered <head> already carries the
// right lang, title, description, hreflang and JSON-LD, so nothing is patched at runtime.
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <LanguageContext.Provider value={{ currentLanguage: i18n.language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
