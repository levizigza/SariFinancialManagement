# Sari Financial Management

Official website for **Sari Financial Management** (Calgary, Alberta).

**Production domain:** https://sarifinancial.com

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cloudflare Pages (production)

Production hosts on **Cloudflare Pages** at https://sarifinancial.com.

### Build settings (dashboard or CI)

| Setting | Value |
|--------|--------|
| Framework preset | **None** (do not choose Next.js) |
| Build command | `npx next build` (or `npm run build`) |
| Output directory | `out` |
| Root directory | *(leave blank)* |
| Node version | `20` |

Cloudflare sets `CF_PAGES=1` automatically. [`next.config.ts`](next.config.ts) turns on `output: "export"` when that is present, so the `out/` folder is created even if dashboard env vars are empty.

Optional env vars (Production):

```text
NEXT_PUBLIC_STATIC_EXPORT=true
NEXT_PUBLIC_SITE_URL=https://sarifinancial.com
```

Do **not** set `GITHUB_PAGES` or `NEXT_PUBLIC_BASE_PATH` for Cloudflare — the site must deploy at the domain root (not `/SariFinancialManagement`).

Static security/cache headers: [`public/_headers`](public/_headers).

### GitHub Action deploy

Workflow: [`.github/workflows/deploy-cloudflare.yml`](.github/workflows/deploy-cloudflare.yml)

Repo secrets required:

- `CLOUDFLARE_API_TOKEN` — token with **Cloudflare Pages — Edit**
- `CLOUDFLARE_ACCOUNT_ID` — `abb8a575489689ede076646897c8c94b`

The workflow publishes to Pages project name **`sarifinancial`** (create that project in the dashboard first, or let the first deploy create it via the Action).

### Dashboard: attach sarifinancial.com

Account: [Cloudflare dashboard](https://dash.cloudflare.com/abb8a575489689ede076646897c8c94b) (domain is already on Cloudflare Registrar).

1. **Workers & Pages → Create → Connect to Git** → `levizigza/SariFinancialManagement`  
   (or rely on the GitHub Action above once secrets exist).
2. Apply the build settings and env vars in the table above.
3. **Custom domains** → add `sarifinancial.com` and `www.sarifinancial.com`.
4. **SSL/TLS** → Full (Strict) when the Pages cert is active; enable **Always Use HTTPS**.
5. **Redirect Rule** → redirect `www.sarifinancial.com` → `https://sarifinancial.com` (apex).
6. Confirm https://sarifinancial.com loads images and routes without a `/SariFinancialManagement` prefix.

## GitHub Pages (preview backup)

This repo can still deploy a static export with GitHub Actions:

- Workflow: `.github/workflows/deploy-pages.yml`
- Preview URL: https://levizigza.github.io/SariFinancialManagement/

That build **does** set `GITHUB_PAGES` + `basePath=/SariFinancialManagement`. Keep it for backup until Cloudflare is confirmed live.

In the GitHub repo: **Settings → Pages → Source → GitHub Actions**.

## Design system

- `src/styles/tokens.css` — CSS custom properties
- `src/app/globals.css` — Tailwind theme bridge + base a11y styles
- `src/components/` — reusable UI, layout, and brand primitives
- `src/lib/site.ts` — verified brand facts only
