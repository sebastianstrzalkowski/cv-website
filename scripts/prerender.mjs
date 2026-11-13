// Turns the client build into static, agent-readable pages:
//   build/index.html (EN) and build/pl/index.html (PL) with the full CV rendered into #root,
//   per-language <head> (hreflang, canonical, Open Graph, JSON-LD),
//   build/index.md, build/pl/index.md, build/llms.txt, sitemap.xml and robots.txt.
// Runs after `vite build` and `vite build --ssr src/entry-server.jsx --outDir build-ssr`.
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = join(root, 'build');
const ssrDir = join(root, 'build-ssr');

const { PAGES, SITE_URL, buildHead, buildMarkdown, buildLlmsTxt, renderApp } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
);

// Date of the last content change, not of the build: a stable freshness signal for crawlers.
// Full ISO 8601 timestamp with offset: Google rejects a bare date in JSON-LD dateModified.
const modified = (() => {
  try {
    const timestamp = execSync(
      'git log -1 --format=%cI -- src/data src/locales src/components CV_Sebastian_Strzalkowski.md',
      { cwd: root, encoding: 'utf8' }
    ).trim();
    if (timestamp) return timestamp;
  } catch {
    // No git history (e.g. shallow checkout without the files): fall back to now.
  }
  return new Date().toISOString();
})();
const lastmod = modified.slice(0, 10);

const template = readFileSync(join(buildDir, 'index.html'), 'utf8');
for (const marker of ['<!--seo-head-->', '<!--app-html-->', '<html lang="en">']) {
  if (!template.includes(marker)) throw new Error(`index.html template is missing ${marker}`);
}

const write = (relativePath, content) => {
  const target = join(buildDir, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
  console.log(`  ${relativePath} (${Buffer.byteLength(content)} B)`);
};

console.log(`Prerendering (content last changed ${lastmod})`);

for (const [lng, page] of Object.entries(PAGES)) {
  const appHtml = await renderApp(lng);
  const head = await buildHead(lng, { modified });
  const html = template
    .replace('<html lang="en">', `<html lang="${lng}">`)
    .replace('<!--seo-head-->', head)
    .replace('<!--app-html-->', appHtml);

  write(join(page.path, 'index.html').replace(/^\//, ''), html);
  write(page.markdown.replace(/^\//, ''), await buildMarkdown(lng, { lastmod }));
}

write('llms.txt', await buildLlmsTxt());

const urls = Object.values(PAGES)
  .map((page) => {
    const alternates = Object.entries(PAGES)
      .map(([code, p]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${SITE_URL}${p.path}" />`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${PAGES.en.path}" />`)
      .join('\n');
    return `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`;
  })
  .join('\n');

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
  <url>
    <loc>${SITE_URL}/CV_Sebastian_Strzalkowski.pdf</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`);

// Search and AI-answer use are welcome; no training preference is stated (no ai-train signal).
write('robots.txt', `# Content signals (https://contentsignals.org): search and AI answers may use this site.
User-agent: *
Content-Signal: search=yes, ai-input=yes
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);

rmSync(ssrDir, { recursive: true, force: true });
