# NootraGenie — Deploy Notes (May 2026 Update — REVISED)

## ⚠️ Read this first — fixing the failed Vercel build

The previous deploy failed with `Permission denied: vite`. Root cause: your `node_modules` folder was being committed to GitHub when it shouldn't be. When Linux (Vercel's build environment) tried to run a binary that came from a Windows zip, the executable permission was missing.

This zip includes a `.gitignore` file that prevents `node_modules` from being committed. The deploy instructions below are slightly different from before to make sure the broken state in your repo gets cleaned out.

**Do these steps exactly. Do not skip the parts about deleting node_modules and .git locally.**

---

## What's in this zip

- `.gitignore` (NEW) — prevents `node_modules`, build output, env files, and OS junk from ever being committed
- New article #5: "Best Nootropic Stack for ADHD Without Prescription Stimulants"
- `public/sitemap.xml`
- `public/robots.txt`
- Google Search Console verification placeholder in `index.html`
- `og:url` meta tag in `index.html`

---

## Step 1 — Clean your local folder completely

In Windows Explorer, navigate to `C:\Users\drewj\OneDrive\Desktop\nootragenie`.

Delete EVERYTHING inside that folder, including:
- The `node_modules` folder (if it exists)
- The `.git` folder (you may need to enable "Show hidden items" under the View tab to see it)
- All other files and folders

The `nootragenie` folder itself should now be empty.

---

## Step 2 — Extract this zip into the empty folder

Extract the contents of this zip directly into `C:\Users\drewj\OneDrive\Desktop\nootragenie`. You should NOT end up with a nested folder like `nootragenie\nootragenie\...` — the contents of the zip (the `src` folder, `package.json`, `.gitignore`, etc.) should be at the top level of `nootragenie`.

Quick check after extracting — open the folder and confirm you see:
- A `src` folder
- A `public` folder
- A `package.json` file
- A `.gitignore` file (it might be hidden — enable "Show hidden items" in Explorer's View tab)
- An `index.html` file
- `DEPLOY_NOTES.md`

If `.gitignore` is missing, the deploy will fail again. Tell me before proceeding.

---

## Step 3 — Run the deploy in PowerShell

Open PowerShell, then:

```
cd C:\Users\drewj\OneDrive\Desktop\nootragenie
npm install
git init
git add .
git commit -m "Add ADHD article + SEO infra + gitignore (fixes Vercel build)"
git remote add origin https://github.com/drewskay3/nootragenie.git
git branch -M main
git push -u origin main --force
```

**After `git add .` runs, but BEFORE the commit**, run this one extra command:

```
git status
```

You should see a list of files being added. Look for `node_modules` in that list.
- If `node_modules` is NOT in the list → good, proceed with `git commit`
- If `node_modules` IS in the list → STOP. The `.gitignore` isn't being respected. Tell me before pushing.

---

## Step 4 — Watch the Vercel build

Go to https://vercel.com → your nootragenie project → Deployments. The newest deployment should appear within ~30 seconds of your push. Watch it. It should:

1. Show "Building" with a yellow icon
2. Take 30–60 seconds
3. Show "Ready" with a green checkmark

If it fails again, screenshot the build log and send it. Don't make any other changes.

---

## Step 5 — Confirm the new article is live

After the green checkmark:

1. Open an **incognito/private browser window** (very important — your normal browser may have the old version cached)
2. Visit https://nootragenie.com/blog
3. Confirm 5 articles appear, with the ADHD article at the bottom
4. Visit https://nootragenie.com/blog/best-nootropic-stack-for-adhd-without-stimulants directly to confirm it loads
5. Visit https://nootragenie.com/sitemap.xml — should display XML, not 404
6. Visit https://nootragenie.com/robots.txt — should display the robots rules, not 404

If all 4 of those work, you're back in business.

---

## Step 6 — Google Search Console (do this AFTER Step 5 succeeds)

1. Go to https://search.google.com/search-console
2. Click "Add Property" → choose **URL prefix** (not Domain) → enter `https://nootragenie.com`
3. Choose **HTML tag** verification method
4. Google shows you a meta tag like `<meta name="google-site-verification" content="abc123xyz..." />`
5. Copy ONLY the value inside `content="..."`
6. Open `index.html` in your local nootragenie folder
7. Find the line `<meta name="google-site-verification" content="REPLACE_WITH_GSC_CODE" />`
8. Replace `REPLACE_WITH_GSC_CODE` with the value you copied
9. Save the file
10. Push the change with PowerShell:
    ```
    cd C:\Users\drewj\OneDrive\Desktop\nootragenie
    git add index.html
    git commit -m "Add GSC verification code"
    git push
    ```
    Note: no `--force` and no `init` this time — those are only for the first push or for replacing the whole repo.
11. Wait for Vercel to deploy (~1 min)
12. Back in GSC, click **Verify**

---

## Step 7 — Submit sitemap and request indexing

Once GSC is verified:

1. Left sidebar → **Sitemaps** → enter `sitemap.xml` → Submit
2. Top search bar → paste each article URL → click "Request Indexing" for each one
   - https://nootragenie.com/blog/best-nootropic-stack-for-focus
   - https://nootragenie.com/blog/beginner-nootropic-stack-under-30
   - https://nootragenie.com/blog/lions-mane-vs-alpha-gpc-which-do-you-need
   - https://nootragenie.com/blog/what-are-nootropics-beginners-guide
   - https://nootragenie.com/blog/best-nootropic-stack-for-adhd-without-stimulants

---

## Why the previous deploy failed (in plain English)

When you zipped your nootragenie folder on Windows, the zip included `node_modules` — a folder that holds 50MB of dependencies. That folder shouldn't ever be in version control because (a) it's huge, (b) it's regenerated automatically by `npm install`, and (c) Linux and Windows store executable permissions differently, so files that came from a Windows zip don't run on Linux.

When Vercel cloned your repo, it found the broken `node_modules` from your push, tried to run `vite` from inside it, and failed with "Permission denied."

The new `.gitignore` file tells git to ignore `node_modules` (and a few other things you'd never want committed, like `.env` files with API keys). With the gitignore in place, your push will only contain your actual source code — Vercel will run `npm install` itself and produce a fresh, correctly-permissioned `node_modules` on its end.

This is also why I'm having you delete the old `.git` folder before this push: the previous commits had `node_modules` baked into the git history, and we want a clean start.

---

## What to do if Step 3's `git status` check shows node_modules

This would mean the `.gitignore` file didn't get extracted properly (sometimes Windows hides files starting with a dot). Fix:

1. In PowerShell, while in the nootragenie folder, run: `dir -Force` and look for `.gitignore`
2. If it's missing, the zip extraction skipped it. Tell me and I'll send a different format.
3. If it's present but git is still tracking node_modules, run `git rm -r --cached node_modules` then redo the commit.
