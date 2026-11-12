// Language lives in the URL: English at /, Polish at /pl/.
export const LANGUAGE_PATHS = { en: '/', pl: '/pl/' };

const STORAGE_KEY = 'preferredLanguage';

const readStored = () => {
  try {
    // i18nextLng is what the old client-side detector stored, so returning visitors keep their language.
    return localStorage.getItem(STORAGE_KEY) || localStorage.getItem('i18nextLng');
  } catch {
    return null;
  }
};

export const rememberLanguage = (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Storage blocked (private mode): the URL still carries the language.
  }
};

const currentPathLanguage = () => (/^\/pl(\/|$)/.test(window.location.pathname) ? 'pl' : 'en');

// Returns the URL to move to, or null to stay. Only the root page redirects on a stored or
// browser preference; /pl/ never redirects, so shared Polish links always open in Polish.
export const languageRedirect = () => {
  const { search, hash, pathname } = window.location;
  const params = new URLSearchParams(search);
  const fromQuery = params.get('lng');
  const pathLanguage = currentPathLanguage();

  if (fromQuery && LANGUAGE_PATHS[fromQuery]) {
    rememberLanguage(fromQuery);
    params.delete('lng');
    const rest = params.toString();
    const target = `${LANGUAGE_PATHS[fromQuery]}${rest ? `?${rest}` : ''}${hash}`;
    return target === `${pathname}${search}${hash}` ? null : target;
  }

  if (pathname !== '/') return null;

  const stored = readStored();
  const preferred = (stored || navigator.language || '').slice(0, 2).toLowerCase();
  if (preferred === 'pl' && pathLanguage !== 'pl') {
    return `${LANGUAGE_PATHS.pl}${search}${hash}`;
  }
  return null;
};
