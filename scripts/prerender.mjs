import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Read articles directly from source
const articlesSource = fs.readFileSync(
  path.join(__dirname, '../src/articles.js'),
  'utf-8'
);

// Extract slugs, titles, and descriptions using regex
const slugMatches = [...articlesSource.matchAll(/slug:\s*"([^"]+)"/g)];
const titleMatches = [...articlesSource.matchAll(/title:\s*"([^"]+)"/g)];
const descMatches = [...articlesSource.matchAll(/description:\s*"([^"]+)"/g)];

const articles = slugMatches.map((m, i) => ({
  slug: m[1],
  title: titleMatches[i]?.[1] || 'NootraGenie Blog',
  description: descMatches[i]?.[1] || 'Research-backed nootropics guides.',
}));

function generateHtml(title, description, canonicalUrl) {
  return indexHtml
    .replace(
      /<title>.*?<\/title>/,
      `<title>${title} | NootraGenie</title>`
    )
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${description}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${title}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${description}"`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${canonicalUrl}"`
    )
    .replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
    );
}

// Generate /blog/index.html
const blogDir = path.join(distDir, 'blog');
fs.mkdirSync(blogDir, { recursive: true });
const blogHtml = generateHtml(
  'The NootraGenie Guide — Nootropics Research & Guides',
  'Research-backed guides on building your optimal nootropic stack. No hype, no proprietary blend propaganda.',
  'https://nootragenie.com/blog'
);
fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml);
console.log('Prerendered: /blog');

// Generate each article page
for (const article of articles) {
  const articleDir = path.join(distDir, 'blog', article.slug);
  fs.mkdirSync(articleDir, { recursive: true });
  const html = generateHtml(
    article.title,
    article.description,
    `https://nootragenie.com/blog/${article.slug}`
  );
  fs.writeFileSync(path.join(articleDir, 'index.html'), html);
  console.log(`Prerendered: /blog/${article.slug}`);
}

console.log(`\nPrerender complete — ${articles.length + 1} pages generated.`);
