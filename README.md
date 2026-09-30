# Accountable Intelligence: StatusNeo BFSI Playbook

A long-scroll story in eleven chapters with playable modules. Vite + React, static, deploys to Vercel with zero config.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy to Vercel

Import the repo at vercel.com/new. The framework preset is detected as Vite (build `npm run build`, output `dist`), so no settings are needed. `vercel.json` and a `noindex` meta keep the page out of search results.

## Structure

- `src/markup.html`: the page content
- `src/page.css`: all styles
- `src/page.js`: the interactive behaviour (simulators, chapter nav, scroll progress), run once after mount
- `public/img/`: logos and photos
