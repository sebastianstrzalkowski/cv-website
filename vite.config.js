import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Single source of truth for absolute URLs (canonical, Open Graph, JSON-LD, sitemap, llms.txt).
// Override in CI with VITE_SITE_URL if the domain ever changes.
const SITE_URL = (process.env.VITE_SITE_URL || 'https://sebastian.i-can-do.it').replace(/\/$/, '');
process.env.VITE_SITE_URL = SITE_URL;

// The production <head> comes from scripts/prerender.mjs; the dev server only needs a title.
const devHead = () => ({
  name: 'dev-head',
  apply: 'serve',
  transformIndexHtml(html) {
    return html.replace('<!--seo-head-->', '  <title>Sebastian Strzałkowski (dev)</title>');
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), devHead()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});
