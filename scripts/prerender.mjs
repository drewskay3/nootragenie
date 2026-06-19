import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Read articles
const articlesSource = fs.readFileSync(path.join(__dirname, '../src/articles.js'), 'utf-8');
const slugMatches = [...articlesSource.matchAll(/slug:\s*"([^"]+)"/g)];
const titleMatches = [...articlesSource.matchAll(/title:\s*"([^"]+)"/g)];
const descMatches = [...articlesSource.matchAll(/description:\s*"([^"]+)"/g)];
const articles = slugMatches.map((m, i) => ({
  slug: m[1],
  title: titleMatches[i]?.[1] || 'NootraGenie Blog',
  description: descMatches[i]?.[1] || 'Research-backed nootropics guides.',
}));

// Import the real interactions module directly — far more robust than regex-parsing
// source text, and it can never drift out of sync with the actual data shape.
const interactionsModuleUrl = pathToFileURL(path.join(__dirname, '../src/interactions.js')).href;
const { INTERACTION_PAGES } = await import(interactionsModuleUrl);

const interactionPages = INTERACTION_PAGES.map((p) => ({
  slug: p.slug,
  title: `Can You Take ${p.supp.name} With ${p.med.label}?`,
  description: `${p.supp.name} and ${p.med.label}: ${p.verdict === "exclude" ? "a combination to avoid without medical supervision" : "what to know before combining them"}. Always check with your pharmacist or prescriber first.`,
}));

function generateHtml(title, description, canonicalUrl) {
  return indexHtml
    .replace(/<title>.*?<\/title>/, `<title>${title} | NootraGenie</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`)
    .replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
}

let count = 0;

// /blog
const blogDir = path.join(distDir, 'blog');
fs.mkdirSync(blogDir, { recursive: true });
fs.writeFileSync(path.join(blogDir, 'index.html'), generateHtml('The NootraGenie Guide — Nootropics Research & Guides', 'Research-backed guides on building your optimal nootropic stack. No hype, no proprietary blends.', 'https://nootragenie.com/blog'));
console.log('Prerendered: /blog'); count++;

// /blog/:slug
for (const article of articles) {
  const dir = path.join(distDir, 'blog', article.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateHtml(article.title, article.description, `https://nootragenie.com/blog/${article.slug}`));
  console.log(`Prerendered: /blog/${article.slug}`); count++;
}

// /methodology
const methodDir = path.join(distDir, 'methodology');
fs.mkdirSync(methodDir, { recursive: true });
fs.writeFileSync(path.join(methodDir, 'index.html'), generateHtml('How NootraGenie Works | Methodology', 'How our nootropic recommendations are built, what the medication safety filter does, and how we make money — in plain language.', 'https://nootragenie.com/methodology'));
console.log('Prerendered: /methodology'); count++;

// /interactions
const ixDir = path.join(distDir, 'interactions');
fs.mkdirSync(ixDir, { recursive: true });
fs.writeFileSync(path.join(ixDir, 'index.html'), generateHtml('Supplement & Medication Interactions', 'Check whether common nootropics are safe to combine with SSRIs, blood thinners, ADHD stimulants, thyroid medication, and more.', 'https://nootragenie.com/interactions'));
console.log('Prerendered: /interactions'); count++;

// /interactions/:slug — all 39 pages, sourced directly from the real data
for (const p of interactionPages) {
  const dir = path.join(distDir, 'interactions', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), generateHtml(p.title, p.description, `https://nootragenie.com/interactions/${p.slug}`));
  console.log(`Prerendered: /interactions/${p.slug}`); count++;
}

console.log(`\nPrerender complete — ${count} pages generated.`);
