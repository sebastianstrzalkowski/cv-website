import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Single source of truth for absolute URLs (canonical, Open Graph, sitemap).
// Override in CI with VITE_SITE_URL if the domain ever changes.
const SITE_URL = (process.env.VITE_SITE_URL || 'https://sebastian.i-can-do.it').replace(/\/$/, '');
process.env.VITE_SITE_URL = SITE_URL;

const seoFiles = () => ({
  name: 'seo-files',
  apply: 'build',
  generateBundle() {
    const lastmod = new Date().toISOString().slice(0, 10);
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
    });
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});
