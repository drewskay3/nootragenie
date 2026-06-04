import { useState } from "react";
import { Link } from "react-router-dom";
import articles from "./articles";

const GenieLamp = ({ size = 40, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 30C32 30 34 28 34 24C34 18 29 14 24 12C24 12 24 8 28 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="24" cy="32" rx="12" ry="4" fill={color} opacity="0.2" />
    <path d="M14 30H34L36 34H12L14 30Z" fill={color} opacity="0.35" />
    <path d="M16 34H32V36C32 37.1 31.1 38 30 38H18C16.9 38 16 37.1 16 36V34Z" fill={color} opacity="0.25" />
    <path d="M20 30C20 30 18 28 18 25C18 21 21 18 24 18C27 18 30 21 30 25C30 28 28 30 28 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="29" cy="5" r="2.5" fill="#E6A817" opacity="0.9" />
    <circle cx="32" cy="8" r="1.5" fill="#E6A817" opacity="0.5" />
    <circle cx="26" cy="3" r="1" fill="#E6A817" opacity="0.4" />
  </svg>
);

const blogStyles = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Azeret+Mono:wght@400;500&display=swap');

:root {
  --bg: #F0F7F2;
  --bg2: #E0EDE4;
  --white: #FFFFFF;
  --ink: #0F1A13;
  --ink2: #2C3E33;
  --ink3: #5A7262;
  --ink4: #8DA698;
  --forest: #0D6B3F;
  --forest2: #0A8F4F;
  --sage: #2ECC71;
  --sage-light: rgba(46,204,113,0.14);
  --gold: #E6A817;
  --gold-light: rgba(230,168,23,0.12);
  --gold-glow: rgba(230,168,23,0.25);
  --danger: #E8453C;
  --radius: 20px;
  --radius-sm: 12px;
}

body {
  font-family: 'Sora', sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
}

.blog-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 24px;
}

.blog-nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--forest);
}

.blog-nav-logo span {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.blog-nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.blog-nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink3);
  text-decoration: none;
  transition: color 0.2s;
}

.blog-nav-links a:hover { color: var(--ink); }

.blog-nav-links .nav-cta {
  background: var(--forest);
  color: white;
  padding: 8px 20px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.25s;
}

.blog-nav-links .nav-cta:hover {
  background: var(--forest2);
  color: white;
}

/* Blog listing */
.blog-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.blog-hero {
  text-align: center;
  padding: 48px 0 40px;
}

.blog-hero h1 {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 12px;
  color: var(--ink);
}

.blog-hero p {
  font-size: 17px;
  font-weight: 300;
  color: var(--ink3);
  max-width: 500px;
  margin: 0 auto;
}

.blog-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.blog-card {
  background: var(--white);
  border-radius: 20px;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 3px rgba(13,107,63,0.06), 0 4px 12px rgba(13,107,63,0.04);
  border: 1px solid transparent;
  transition: all 0.3s;
  display: block;
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(13,107,63,0.07), 0 8px 32px rgba(13,107,63,0.06);
  border-color: rgba(46,204,113,0.2);
}

.blog-card-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.blog-card-cat {
  font-family: 'Azeret Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--sage);
}

.blog-card-date {
  font-size: 12px;
  color: var(--ink4);
}

.blog-card-read {
  font-size: 12px;
  color: var(--ink4);
}

.blog-card h2 {
  font-family: 'Crimson Pro', serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 8px;
  color: var(--ink);
}

.blog-card p {
  font-size: 15px;
  font-weight: 300;
  color: var(--ink3);
  line-height: 1.6;
}

.blog-card-arrow {
  margin-top: 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--forest);
}

/* Article page */
.article-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

.article-header {
  padding: 40px 0 32px;
}

.article-back {
  display: inline-block;
  font-size: 13px;
  color: var(--ink4);
  text-decoration: none;
  margin-bottom: 24px;
  transition: color 0.2s;
}

.article-back:hover { color: var(--ink2); }

.article-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.article-cat {
  font-family: 'Azeret Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--sage);
}

.article-date {
  font-size: 13px;
  color: var(--ink4);
}

.article-read {
  font-size: 13px;
  color: var(--ink4);
}

.article-header h1 {
  font-family: 'Crimson Pro', serif;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 12px;
  color: var(--ink);
}

.article-header .article-desc {
  font-size: 17px;
  font-weight: 300;
  color: var(--ink3);
  line-height: 1.6;
}

.article-body {
  padding: 16px 0;
}

.article-section {
  margin-bottom: 40px;
}

.article-section h2 {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 16px;
  color: var(--ink);
}

.article-section p {
  font-size: 17px;
  font-weight: 300;
  color: var(--ink2);
  line-height: 1.75;
  margin-bottom: 16px;
}

.article-section strong {
  font-weight: 600;
  color: var(--ink);
}

.article-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}

.article-buy-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%);
  color: white;
  text-decoration: none;
  font-family: 'Sora', sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 40px;
  transition: all 0.25s;
  box-shadow: 0 2px 12px rgba(13,107,63,0.2);
  width: fit-content;
}

.article-buy-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(13,107,63,0.3);
}

.article-cta-box {
  background: var(--white);
  border-radius: 20px;
  padding: 40px 32px;
  text-align: center;
  margin-top: 40px;
  box-shadow: 0 2px 8px rgba(13,107,63,0.07), 0 8px 32px rgba(13,107,63,0.06);
  border: 1px solid rgba(46,204,113,0.15);
}

.article-cta-box h3 {
  font-family: 'Crimson Pro', serif;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 12px;
}

.article-cta-box p {
  font-size: 15px;
  font-weight: 300;
  color: var(--ink3);
  margin-bottom: 24px;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}

.article-cta-btn {
  display: inline-block;
  background: linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%);
  color: white;
  text-decoration: none;
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  font-weight: 600;
  padding: 16px 40px;
  border-radius: 60px;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(13,107,63,0.25);
}

.article-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(13,107,63,0.3);
}

.article-disclaimer {
  margin-top: 40px;
  font-size: 11px;
  color: var(--ink4);
  line-height: 1.7;
  font-weight: 300;
  text-align: center;
}

@media (max-width: 520px) {
  .blog-nav-links a:not(.nav-cta) { display: none; }
  .blog-card { padding: 24px; }
}
`;

export function BlogNav() {
  return (
    <nav className="blog-nav">
      <Link to="/" className="blog-nav-logo">
        <GenieLamp size={24} color="#0D6B3F" />
        <span>NootraGenie</span>
      </Link>
      <div className="blog-nav-links">
        <Link to="/blog">Blog</Link>
        <Link to="/" className="nav-cta">Take the Quiz</Link>
      </div>
    </nav>
  );
}

export function BlogList() {
  return (
    <>
      <style>{blogStyles}</style>
      <div className="blog-page">
        <BlogNav />
        <div className="blog-hero">
          <h1>The NootraGenie Guide</h1>
          <p>Research-backed guides on building your optimal nootropic stack. No hype, no proprietary blend propaganda.</p>
        </div>
        <div className="blog-cards">
          {articles.map((a) => (
            <Link to={`/blog/${a.slug}`} className="blog-card" key={a.slug}>
              <div className="blog-card-meta">
                <span className="blog-card-cat">{a.category}</span>
                <span className="blog-card-date">{a.date}</span>
                <span className="blog-card-read">{a.readTime}</span>
              </div>
              <h2>{a.title}</h2>
              <p>{a.description}</p>
              <div className="blog-card-arrow">Read article →</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function renderContent(text) {
  // Split by newlines and handle bold markdown
  return text.split("\n\n").map((para, i) => {
    // Replace **text** with <strong>
    const parts = para.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </p>
    );
  });
}

export function ArticlePage({ article }) {
  if (!article) {
    return (
      <>
        <style>{blogStyles}</style>
        <div className="article-page">
          <BlogNav />
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: "28px", marginBottom: "12px" }}>Article not found</h2>
            <Link to="/blog" style={{ color: "var(--forest)" }}>← Back to blog</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{blogStyles}</style>
      <div className="article-page">
        <BlogNav />
        <div className="article-header">
          <Link to="/blog" className="article-back">← Back to blog</Link>
          <div className="article-meta">
            <span className="article-cat">{article.category}</span>
            <span className="article-date">{article.date}</span>
            <span className="article-read">{article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-desc">{article.description}</p>
        </div>
        <div className="article-body">
          {article.sections.map((section, i) => (
            <div className="article-section" key={i}>
              <h2>{section.heading}</h2>
              {renderContent(section.content)}
              {section.links && (
                <div className="article-links">
                  {section.links.map((link, j) => (
                    <a className="article-buy-link" href={link.url} key={j} target="_blank" rel="noopener noreferrer">
                      {link.text} →
                    </a>
                  ))}
                </div>
              )}
              {section.cta && (
                <div className="article-cta-box">
                  <h3>Find your perfect stack</h3>
                  <p>Take the free 2-minute quiz and get a personalized nootropic protocol built for your brain, budget, and goals — with medication safety checks built in.</p>
                  <Link to="/" className="article-cta-btn">Build My Stack →</Link>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="article-disclaimer">
          *These statements have not been evaluated by the FDA. This content is for informational purposes only and does not constitute medical advice.
          Product links may be affiliate links — we earn a small commission at no extra cost to you.
        </div>
      </div>
    </>
  );
}
