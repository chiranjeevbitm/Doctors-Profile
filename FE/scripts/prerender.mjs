// Turns the client build into one real HTML file per page, so crawlers that do
// not run JavaScript (GPTBot, ClaudeBot, PerplexityBot, …) read the full text.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr). Also
// writes sitemap.xml, robots.txt and llms.txt from the same data the pages use.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { ROUTES, NOT_FOUND, OG_IMAGE, jsonLdFor, llmsTxt } from '../src/lib/seo.js';
import { SITE_URL } from '../src/lib/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const urlFor = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`);
// JSON inside <script>: keep "</script>" and friends from closing the tag.
const safeJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function head(route) {
  const url = urlFor(route.path);
  const lines = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.index
      ? `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />`
      : `<meta name="robots" content="noindex, follow" />`,
  ];
  if (route.path !== NOT_FOUND.path) {
    lines.push(
      `<link rel="canonical" href="${url}" />`,
      `<link rel="alternate" type="text/markdown" title="llms.txt" href="${SITE_URL}/llms.txt" />`,
      `<meta property="og:type" content="${route.path === '/about' ? 'profile' : 'website'}" />`,
      `<meta property="og:site_name" content="Dr. Deepak Kumar — Arogya Clinic" />`,
      `<meta property="og:title" content="${esc(route.title)}" />`,
      `<meta property="og:description" content="${esc(route.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${OG_IMAGE}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Dr. Deepak Kumar, MD General Medicine, Arogya Clinic, Muzaffarpur" />`,
      `<meta property="og:locale" content="en_IN" />`,
      `<meta property="og:locale:alternate" content="hi_IN" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(route.title)}" />`,
      `<meta name="twitter:description" content="${esc(route.description)}" />`,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`,
      `<meta name="geo.region" content="IN-BR" />`,
      `<meta name="geo.placename" content="Ahiyapur, Muzaffarpur" />`,
      `<meta name="geo.position" content="26.150109;85.400502" />`,
      `<script type="application/ld+json">${safeJson(jsonLdFor(route))}</script>`,
    );
  }
  return lines.map((l) => `    ${l}`).join('\n');
}

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing the seo markers or the empty #root');
}

for (const route of [...ROUTES, NOT_FOUND]) {
  const body = await render(route.path === NOT_FOUND.path ? '/this-page-does-not-exist' : route.path);
  if (body.length < 2000) throw new Error(`${route.path} rendered almost nothing (${body.length} bytes)`);
  const html = template
    .replace(SEO_BLOCK, head(route).trimStart())
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  await writeFile(path.join(dist, route.file), html);
  console.log(`prerendered ${route.path.padEnd(20)} → ${route.file} (${(html.length / 1024).toFixed(1)} kB)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.filter((r) => r.index).map((r) => `  <url><loc>${urlFor(r.path)}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

// Search engines and AI assistants are all welcome: this is a public clinic
// page whose whole purpose is to be found and quoted correctly.
const bots = [
  'Googlebot', 'Google-Extended', 'Bingbot',
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
  'PerplexityBot', 'Perplexity-User',
  'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'meta-externalagent',
];
const robots = `# ${SITE_URL}/robots.txt
${bots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
await writeFile(path.join(dist, 'robots.txt'), robots);
await writeFile(path.join(dist, 'llms.txt'), llmsTxt());
console.log('wrote sitemap.xml, robots.txt, llms.txt');
