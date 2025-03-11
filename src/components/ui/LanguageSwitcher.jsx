import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className="flex space-x-2">
        <button
            onClick={() => changeLanguage('pl')}
            className={`px-2 py-1 rounded ${i18n.language === 'pl' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          PL
        </button>
        <button
            onClick={() => changeLanguage('en')}
            className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          EN
        </button>
      </div>
  );
};

export default LanguageSwitcher;