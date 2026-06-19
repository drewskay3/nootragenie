import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import articles from "./articles";
import { INTERACTION_PAGES, getInteractionBySlug, groupedByMedication } from "./interactions";

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

/* ── Interaction pages ── */
.ix-verdict{display:inline-flex;align-items:center;gap:9px;font-family:'Azeret Mono',monospace;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:600;padding:9px 16px;border-radius:40px;margin-bottom:22px}
.ix-verdict-dot{width:8px;height:8px;border-radius:50%;background:currentColor}
.ix-exclude{color:#B42318;background:rgba(180,35,24,0.10);border:1px solid rgba(180,35,24,0.22)}
.ix-warn{color:#B07D12;background:rgba(230,168,23,0.12);border:1px solid rgba(230,168,23,0.28)}
.ix-safety{background:rgba(13,107,63,0.05);border:1px solid rgba(13,107,63,0.18);border-left:3px solid var(--forest);border-radius:10px;padding:20px 24px;margin:28px 0}
.ix-safety strong{display:block;margin-bottom:8px;color:var(--forest);font-size:15px}
.ix-safety p{font-size:14px;line-height:1.65;color:var(--ink2);margin:0}
.ix-index-group{margin-bottom:34px}
.ix-index-group h2{font-size:20px;margin-bottom:6px}
.ix-index-group .ix-examples{font-size:13px;color:var(--ink3);margin-bottom:14px;font-weight:300}
.ix-index-list{display:flex;flex-direction:column;gap:1px}
.ix-index-link{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 16px;border-radius:9px;text-decoration:none;background:var(--white);border:1px solid var(--bg2);transition:all 0.18s;color:var(--ink)}
.ix-index-link:hover{border-color:var(--forest);transform:translateX(2px)}
.ix-index-link .ix-name{font-size:15px;font-weight:500}
.ix-tag{font-family:'Azeret Mono',monospace;font-size:10px;letter-spacing:0.5px;text-transform:uppercase;padding:3px 9px;border-radius:30px;white-space:nowrap}
.ix-tag-exclude{color:#B42318;background:rgba(180,35,24,0.10)}
.ix-tag-warn{color:#B07D12;background:rgba(230,168,23,0.12)}
.ix-related{margin-top:38px;padding-top:28px;border-top:1px solid var(--bg2)}
.ix-related h3{font-size:14px;text-transform:uppercase;letter-spacing:1px;color:var(--ink3);margin-bottom:14px;font-weight:600}
.ix-related a{display:block;color:var(--forest);text-decoration:none;padding:6px 0;font-size:15px}
.ix-related a:hover{text-decoration:underline}
`;

function useSeo(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    let created = false;
    if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", "description"); document.head.appendChild(tag); created = true; }
    const prevDesc = tag.getAttribute("content");
    tag.setAttribute("content", description);
    return () => {
      document.title = prevTitle;
      if (created) tag.remove();
      else if (prevDesc !== null) tag.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}

export function BlogNav() {
  return (
    <nav className="blog-nav">
      <Link to="/" className="blog-nav-logo">
        <GenieLamp size={24} color="#0D6B3F" />
        <span>NootraGenie</span>
      </Link>
      <div className="blog-nav-links">
        <Link to="/blog">Blog</Link>
        <Link to="/interactions">Interactions</Link>
        <Link to="/methodology">How it works</Link>
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

  // Update document meta tags for SEO
  if (typeof document !== "undefined") {
    document.title = `${article.title} | NootraGenie`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", article.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", article.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", article.description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `https://nootragenie.com/blog/${article.slug}`);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://nootragenie.com/blog/${article.slug}`);
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

export function MethodologyPage() {
  useSeo("How NootraGenie Works | Methodology", "What our recommendations are built on, where they stop, and how we make money — in plain language.");
  return (
    <>
      <style>{blogStyles}</style>
      <div className="article-page">
        <BlogNav />
        <div className="article-header">
          <Link to="/blog" className="article-back">← Back to blog</Link>
          <div className="article-meta"><span className="article-cat">About</span></div>
          <h1>How NootraGenie Works</h1>
          <p className="article-desc">What our recommendations are built on, where they stop, and how we make money — in plain language.</p>
        </div>
        <div className="article-body">
          <div className="article-section">
            <h2>What we actually do</h2>
            <p>NootraGenie is a free tool that turns your quiz answers into a personalized nootropic protocol. We map your goal, experience, caffeine sensitivity, budget, current supplements, dietary restrictions, and prescription medications to a curated set of well-studied compounds, then assemble a stack, a daily schedule, and an honest timeline for when each piece tends to kick in.</p>
          </div>
          <div className="article-section">
            <h2>How compounds are chosen</h2>
            <p>Every compound was selected because it has a recognized mechanism and a body of human research behind it. Each recommendation card shows an evidence-strength label (Strong, Moderate, Emerging, or Limited) so you can see how settled the science is. Dosages reflect commonly studied ranges and are adjusted down if you're sensitive to stimulants.</p>
          </div>
          <div className="article-section">
            <h2>The medication safety filter</h2>
            <p>When you tell us about prescription medications — SSRIs, MAOIs, blood thinners, ADHD stimulants, thyroid medication and others — we remove compounds with documented interaction risks entirely, and flag others that need caution. This filter is a safety net, not a substitute for medical advice. It can't know your full history, your doses, or how your body responds.</p>
          </div>
          <div className="article-section">
            <h2>What this is not</h2>
            <p>NootraGenie does not provide medical advice, diagnosis, or treatment. Nothing here has been evaluated by the FDA. Always talk to a qualified healthcare provider before starting anything new — especially if you take prescription medication, are pregnant or nursing, or manage a chronic condition.</p>
          </div>
          <div className="article-section">
            <h2>How we make money</h2>
            <p>The tool is free because some product links are affiliate links — if you buy through them, we may earn a small commission at no extra cost to you. Commissions never change which compounds we recommend; the stack is built from your answers before any link is attached.</p>
          </div>
          <div className="article-section">
            <h2>Who's behind it</h2>
            <p>NootraGenie is an independent project built by a solo founder who got tired of supplement advice that ignored medication safety. Have a correction or a compound you think we should add? Email <a href="mailto:nootragenie@gmail.com" style={{ color: "var(--forest)" }}>nootragenie@gmail.com</a>.</p>
            <div className="article-cta-box">
              <h3>Find your perfect stack</h3>
              <p>Take the free 2-minute quiz and get a personalized protocol built for your brain, budget, and goals — with medication safety checks built in.</p>
              <Link to="/" className="article-cta-btn">Build My Stack →</Link>
            </div>
          </div>
        </div>
        <div className="article-disclaimer">*These statements have not been evaluated by the FDA. For informational purposes only. Product links may be affiliate links.</div>
      </div>
    </>
  );
}

export function InteractionsIndex() {
  useSeo("Nootropic & Supplement Medication Interactions | NootraGenie", "Check whether common nootropics and supplements are safe to combine with prescription medications like SSRIs, blood thinners, ADHD stimulants, and thyroid medication.");
  const groups = groupedByMedication();
  return (
    <>
      <style>{blogStyles}</style>
      <div className="article-page">
        <BlogNav />
        <div className="article-header">
          <Link to="/blog" className="article-back">← Back to blog</Link>
          <div className="article-meta"><span className="article-cat">Safety</span></div>
          <h1>Supplement &amp; Medication Interactions</h1>
          <p className="article-desc">Thinking about adding a nootropic while on a prescription? Find your medication below to see which supplements to avoid and which need caution. Always confirm with your pharmacist or prescriber first.</p>
        </div>
        <div className="article-body">
          {groups.map((g) => (
            <div className="ix-index-group" key={g.med.slug}>
              <h2>{g.med.label}</h2>
              <p className="ix-examples">e.g. {g.med.examples}</p>
              <div className="ix-index-list">
                {g.pages.map((p) => (
                  <Link className="ix-index-link" to={`/interactions/${p.slug}`} key={p.slug}>
                    <span className="ix-name">{p.supp.name} + {g.med.label}</span>
                    <span className={`ix-tag ix-tag-${p.verdict}`}>{p.verdict === "exclude" ? "Avoid" : "Caution"}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="article-cta-box">
            <h3>Not sure where to start?</h3>
            <p>Take the free quiz — it asks about your medications and automatically filters out supplements that could interact, then builds a stack around what's left.</p>
            <Link to="/" className="article-cta-btn">Build My Safe Stack →</Link>
          </div>
        </div>
        <div className="article-disclaimer">*For informational purposes only. Not medical advice. Product links may be affiliate links.</div>
      </div>
    </>
  );
}

export function InteractionDetail({ slug }) {
  const page = getInteractionBySlug(slug);
  useSeo(
    page ? `Can You Take ${page.supp.name} With ${page.med.label}? | NootraGenie` : "Interaction Not Found | NootraGenie",
    page ? `${page.supp.name} and ${page.med.label}: ${page.verdict === "exclude" ? "a combination to avoid without medical supervision" : "what to know before combining them"}. Always check with your pharmacist or prescriber.` : "This interaction page could not be found."
  );
  if (!page) {
    return (
      <>
        <style>{blogStyles}</style>
        <div className="article-page">
          <BlogNav />
          <div className="article-header">
            <Link to="/interactions" className="article-back">← All interactions</Link>
            <h1>Interaction not found</h1>
            <p className="article-desc">We couldn't find that page. <Link to="/interactions">Browse all interactions →</Link></p>
          </div>
        </div>
      </>
    );
  }
  const isExclude = page.verdict === "exclude";
  const related = INTERACTION_PAGES.filter((p) => p.medKey === page.medKey && p.slug !== page.slug).slice(0, 5);
  return (
    <>
      <style>{blogStyles}</style>
      <div className="article-page">
        <BlogNav />
        <div className="article-header">
          <Link to="/interactions" className="article-back">← All interactions</Link>
          <div className="article-meta"><span className="article-cat">Safety</span></div>
          <h1>Can You Take {page.supp.name} With {page.med.label}?</h1>
        </div>
        <div className="article-body">
          <div className={`ix-verdict ${isExclude ? "ix-exclude" : "ix-warn"}`}>
            <span className="ix-verdict-dot" />
            {isExclude ? "Avoid without medical supervision" : "Possible interaction — use caution"}
          </div>
          <div className="article-section">
            <p>{isExclude ? (<><strong>Short answer: not without your prescriber's approval.</strong> NootraGenie's safety filter excludes {page.supp.name} for people taking {page.med.label}.</>) : (<><strong>Short answer: only with caution and medical guidance.</strong> {page.supp.name} can be combined with {page.med.label} by some people, but it's flagged because of how the two can interact.</>)}</p>
          </div>
          <div className="article-section">
            <h2>What {page.supp.name} is</h2>
            <p>{page.supp.blurb}</p>
          </div>
          <div className="article-section">
            <h2>Why this combination needs care</h2>
            <p>{isExclude ? page.note : page.detail}</p>
            {isExclude && <p style={{ marginTop: 12 }}>{page.supp.name} is not something to add on your own while taking {page.med.label}. If you think it could help you, that's a conversation to have with your prescriber — not a decision to make from an article.</p>}
          </div>
          <div className="ix-safety">
            <strong>Before you do anything</strong>
            <p>Your prescriber and pharmacist know your full history, your doses, and your other medications — this page doesn't. Bring this combination up with them before starting anything new.</p>
          </div>
          <div className="article-cta-box">
            <h3>Build a stack that respects your meds</h3>
            <p>NootraGenie's free quiz asks what you take and automatically filters out supplements that could interact — then builds a personalized stack around what's safe for you.</p>
            <Link to="/" className="article-cta-btn">Take the Free Quiz →</Link>
          </div>
          {related.length > 0 && (
            <div className="ix-related">
              <h3>Other supplements &amp; {page.med.label}</h3>
              {related.map((r) => (<Link key={r.slug} to={`/interactions/${r.slug}`}>{r.supp.name} + {page.med.label} →</Link>))}
              <Link to="/interactions" style={{ fontWeight: 600, marginTop: 6 }}>See all interactions →</Link>
            </div>
          )}
        </div>
        <div className="article-disclaimer">*For informational purposes only. Not medical advice. Product links may be affiliate links.</div>
      </div>
    </>
  );
}
