# NootraGenie — Deploy Notes (Article #6 + Newest-First Ordering)

## What's new in this update

**1. Article #6 added: "Best Nootropics for Anxiety Without Benzodiazepines"**
- ~2,000 words, 7 sections, sympathetic editorial frame
- Recommends KSM-66 Ashwagandha, Suntheanine L-Theanine, Magtein Magnesium L-Threonate as core stack
- Supporting compounds: Apigenin, Bacognize Bacopa, Affron Saffron
- 6 Amazon affiliate links via your `nootragenie-20` tag
- Dedicated medication interactions section covering benzos, SSRIs, MAOIs, BP meds, thyroid
- Closing CTA leans on the medication interaction filter

**2. Blog post order reversed — newest first**
- Display order is now: Anxiety → ADHD → Beginners Guide → Lion's Mane → Beginner Stack → Focus Stack
- Going forward, every new article should be inserted at the TOP of the `articles` array in `src/articles.js`, not appended at the bottom
- No code changes to `Blog.jsx` were needed — the blog renders articles in array order

**3. Sitemap updated with new article URL**

## Deploy steps

```powershell
cd C:\Users\drewj\OneDrive\Desktop\nootragenie
git status
```

Confirm modified files include `src/articles.js`, `public/sitemap.xml`, `DEPLOY_NOTES.md`. If `git status` says "nothing to commit," the zip extraction didn't replace your files — tell me before continuing.

```powershell
git add .
git commit -m "Add article #6 (anxiety without benzos) + reorder newest-first"
git push
```

Wait 1–2 min for Vercel to build green.

## Verification after deploy

1. Open https://nootragenie.com/blog in incognito
2. Top article should be "Best Nootropics for Anxiety Without Benzodiazepines"
3. Click into it — confirm all 7 sections render, Amazon links work, the prescriber CTA at the bottom links to the quiz
4. Confirm overall article order matches: Anxiety → ADHD → Beginners Guide → Lion's Mane → Beginner Stack → Focus Stack

## Post-deploy SEO step (don't skip)

In Google Search Console:

1. Top URL bar → paste `https://nootragenie.com/blog/best-nootropics-for-anxiety-without-benzodiazepines`
2. Press Enter
3. Click **Request Indexing**
4. Wait ~30s for confirmation

Then re-submit your sitemap to refresh Google's view:

1. Left sidebar → **Sitemaps**
2. The existing `sitemap.xml` entry is already there — Google will recrawl it on its own schedule
3. Optionally click the three dots → **Resubmit sitemap** to nudge it sooner

## Build verification

This zip was tested with a real Vite production build before packaging. 36 modules transformed cleanly, zero errors, zero warnings. If you see a build failure on Vercel, the cause is environment-specific (cache, npm version, etc.) — screenshot the build log and send it.

## What's queued for next session

You now have 6 articles published, GA4 tracking, GSC verified, sitemap submitted, and the medication interaction filter genuinely backing up the safety claims in the ADHD and anxiety articles. The technical foundation is fully in place. From here, the work is content + Reddit + email.

Pick one of these for next session:

1. **Article #7** — strong candidates: "Caffeine + L-Theanine: The Beginner's Stack" (high search volume, easy buyer intent), "Nootropics and SSRIs: What's Safe and What's Not" (uses your filter as the moat), or "How to Stack Nootropics: A 4-Week Onboarding Guide" (works as a top-of-funnel introduction)

2. **Reddit warming** — your account is aged enough to start. We left off needing to find your first thread to answer. Bring me a thread URL when you're ready.

3. **Beehiiv welcome sequence audit** — paste the current state of your 5 emails and I'll suggest tightening for affiliate conversion

4. **Share mechanic for results** — quiz takers can share their personalized stack via a link. Real conversion lift potential once you have any meaningful traffic.
