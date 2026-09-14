# Sari Financial Management

Official website for **Sari Financial Management** (Calgary, Alberta).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## GitHub Pages

This repo deploys a static export with GitHub Actions:

- Workflow: `.github/workflows/deploy-pages.yml`
- Live URL: https://levizigza.github.io/SariFinancialManagement/

In the GitHub repo: **Settings → Pages → Source → GitHub Actions**.

## Design system

- `src/styles/tokens.css` — CSS custom properties
- `src/app/globals.css` — Tailwind theme bridge + base a11y styles
- `src/components/` — reusable UI, layout, and brand primitives
- `src/lib/site.ts` — verified brand facts only
