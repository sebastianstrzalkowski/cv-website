import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './i18n';
import { languageRedirect } from './languageRouting';

const target = languageRedirect();

if (target) {
  // Old ?lng= links and first visits from Polish browsers land on the matching language URL.
  window.location.replace(target);
} else {
  const container = document.getElementById('root');
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Production pages are prerendered (scripts/prerender.mjs); the dev server serves an empty root.
  if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(container, app);
  } else {
    ReactDOM.createRoot(container).render(app);
  }
}
