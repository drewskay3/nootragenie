# NootraGenie

Your perfect nootropic stack, granted. A personalized nootropic recommendation tool with blog.

## Quick Start

```bash
npm install
npm run dev
```

## Routes

- `/` — Quiz tool
- `/blog` — Article listing
- `/blog/:slug` — Individual article

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add environment variables: `BEEHIIV_API_KEY`, `BEEHIIV_PUB_ID`
4. Click Deploy

## Stack

- React 18 + React Router
- Vite 5
- Vercel Serverless Functions (Beehiiv API)
