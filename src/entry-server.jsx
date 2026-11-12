// Server entry used only at build time by scripts/prerender.mjs.
import React from 'react';
import { renderToString } from 'react-dom/server';
import i18n from './i18n';
import App from './App';

export { PAGES, SITE_URL, buildHead, buildMarkdown, buildLlmsTxt } from './seo/siteDocuments';

export const renderApp = async (lng) => {
  await i18n.changeLanguage(lng);
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
