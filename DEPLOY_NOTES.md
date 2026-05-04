# NootraGenie — Deploy Notes (Medication Filter Expansion + GA4)

This update is much smaller than the last one, and the deploy is much simpler now that you have a clean repo with `.gitignore` working.

## What's new in this update

**1. L-Tyrosine added as a recommended supplement**
- Now appears in Focus, Energy, and Motivation results
- Uses your `nootragenie-20` Amazon affiliate tag

**2. MAOI medication category added to the quiz**
- New option in the medications question (Step 09)
- Triggers a strict exclusion list and prominent prescriber-consult warning

**3. Strattera / Atomoxetine added as a separate medication category**
- Different interaction profile from stimulants (norepinephrine reuptake inhibitor)
- Tyrosine flagged as a warning, not an exclusion (with detailed clinical reasoning in the warning text)

**4. ADHD stimulants now properly exclude L-Tyrosine**
- Previously stimulants only had warnings — now Tyrosine is excluded outright
- This was the central safety claim in the new ADHD article; now it's actually enforced

**5. Tightened SSRI/SNRI warnings**
- Tyrosine added with specific SNRI (Effexor, Cymbalta) language
- Note text strengthened

**6. New "Talk to your prescriber first" alert**
- Appears prominently above the supplement recommendations when someone selects MAOIs, ADHD stimulants, blood thinners, or immunosuppressants
- Red border, larger font — meaningfully louder than the existing safety alert blocks

**7. Google Analytics 4 wired in**
- Your Measurement ID `G-017663XE6D` is now active site-wide
- You'll start seeing real-time data in GA4 within ~5 minutes of the deploy
- All page views (including blog articles) will track automatically

## Deploy steps (simplified — your repo is already clean)

```powershell
cd C:\Users\drewj\OneDrive\Desktop\nootragenie
npm install
git add .
git commit -m "Expand medication filter: Tyrosine, MAOIs, Strattera, prescriber consult; add GA4"
git push
```

That's it. No `git init`, no `--force`, no remote setup — those were one-time steps for the initial clean rebuild. From now on, your normal workflow is: extract zip over folder → `git add` → `git commit` → `git push`.

If `git add .` shows `node_modules` being staged for any reason, STOP and tell me. With the `.gitignore` in place from the last update, this should never happen.

## After deploy — confirm in incognito

1. Open https://nootragenie.com in an incognito window
2. Take the quiz, pick "Deep Focus" as your primary goal
3. On the medications question, select "ADHD Stimulants"
4. Submit and confirm:
   - The red "Talk to your prescriber" alert appears above your stack
   - L-Tyrosine is NOT in your recommended stack (excluded due to stimulant interaction)
   - The Medication Interactions section at the bottom shows the stimulant note

5. Try again with "MAOIs" selected — you should see the strictest exclusion list (Tyrosine, Rhodiola, Ashwagandha, Bacopa all excluded) and the prescriber alert.

6. Try a third run with no medications selected and "Deep Focus" — L-Tyrosine should now appear in your stack as a core recommendation.

## After deploy — confirm GA4 is tracking

1. Visit https://nootragenie.com in any browser (your normal one is fine)
2. Go to https://analytics.google.com → your NootraGenie property
3. Left sidebar → **Reports** → **Realtime**
4. You should see "1 user in the last 30 minutes" — that's you
5. Click around the site (homepage, blog, an article) and watch the real-time view update

If you don't see yourself in real-time after 5 minutes:
- Make sure you're not running an ad blocker (uBlock Origin and similar will block GA4)
- Try opening an incognito window and visiting the site
- Confirm the script is loading by viewing source on your homepage and looking for `G-017663XE6D`

## Bug-finding sanity check

If you see L-Tyrosine showing up in someone's stack alongside ADHD stimulants in the live site, that means the build cached something stale. Clear your browser cache / hard refresh and retest.

## What did NOT change in this update

- No changes to `articles.js` (no new blog post — that comes next session)
- No changes to `Blog.jsx`, `App.jsx`, `main.jsx`
- No changes to `api/subscribe.js` or environment variables
- No changes to `vercel.json`, `vite.config.js`, or `package.json`
- The GSC verification placeholder is still `REPLACE_WITH_GSC_CODE` in `index.html` — replace it whenever you finish the GSC setup, then push the change as a one-line commit.

## What's queued for next session

When you're ready, prioritize ONE of:

1. **Article #6** — strong candidates by SEO opportunity:
   - "Best Nootropics for Anxiety Without Benzodiazepines" (mirrors the ADHD article's structure, taps the GABA-stack market)
   - "Caffeine + L-Theanine: The Beginner's Nootropic Stack" (low-difficulty, very high search volume, easy Amazon links)
   - "Nootropics and SSRIs: What's Safe and What's Not" (uses your medication filter as the moat)

2. **Reddit account warming progress check** — bring me the URLs of comments you've posted so I can give you feedback on positioning before you start mentioning the site

3. **Beehiiv sequence audit** — paste me the current state of your welcome sequence emails (subject lines + first 3 lines of each), I'll suggest tightening on conversion-driving copy
