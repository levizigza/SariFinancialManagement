# Cloudflare handoff — sarifinancial.com

Account ID: `abb8a575489689ede076646897c8c94b`  
Domain (Registrar): [sarifinancial.com registrations](https://dash.cloudflare.com/abb8a575489689ede076646897c8c94b/domains/registrations/sarifinancial.com)  
GitHub repo: https://github.com/levizigza/SariFinancialManagement

## What is already done in the repo

- Canonical domain set to `sarifinancial.com` (`src/lib/site.ts`, SEO/OG, `.env.example`)
- Static export for Cloudflare **without** `/SariFinancialManagement` basePath
- `public/_headers` for security and cache headers on Pages
- GitHub Action: `.github/workflows/deploy-cloudflare.yml`

## One-time setup on the Cloudflare account

### A. Create the Pages project (Connect to Git)

1. Open [Workers & Pages](https://dash.cloudflare.com/abb8a575489689ede076646897c8c94b/workers-and-pages).
2. **Create** → **Pages** → **Connect to Git** → authorize GitHub if needed.
3. Select `levizigza/SariFinancialManagement`.
4. Configure:

| Field | Value |
|-------|--------|
| Project name | `sarifinancial` |
| Production branch | `master` (or `main`) |
| Build command | `npm ci && npm run build` |
| Build output directory | `out` |
| Root directory | `/` |
| Environment variables | `NEXT_PUBLIC_STATIC_EXPORT=true` |
| | `NEXT_PUBLIC_SITE_URL=https://sarifinancial.com` |
| Compatibility / Node | Node `20` |

5. Save and deploy. Confirm the `*.pages.dev` URL works before attaching the custom domain.

### B. Attach custom domains

1. Pages project → **Custom domains** → **Set up a custom domain**.
2. Add `sarifinancial.com`.
3. Add `www.sarifinancial.com`.
4. Because the domain is already on this account’s Registrar/DNS, Cloudflare should create the required DNS records automatically. Wait for the certificate to become **Active**.

### C. HTTPS and www redirect

1. Domain → **SSL/TLS** → overview: **Full (Strict)** once the Pages cert is active.
2. **SSL/TLS → Edge Certificates** → **Always Use HTTPS**: On.
3. **Rules → Redirect Rules** → create:

- If hostname equals `www.sarifinancial.com`
- Then dynamic redirect to `https://sarifinancial.com${uri}` (or static `https://sarifinancial.com`)
- Status: `301`

### D. Optional: deploy from GitHub Actions instead of Cloudflare’s Git build

1. Cloudflare dashboard → **My Profile → API Tokens** → create a token with **Account → Cloudflare Pages → Edit** (scoped to this account).
2. In GitHub → repo **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | the token from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | `abb8a575489689ede076646897c8c94b` |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | `sarifinancial` (optional; this is the workflow default) |

3. Push to `master`/`main` or run **Deploy Cloudflare Pages** via workflow_dispatch.
4. If both Cloudflare Git builds and the Action run, disable one path to avoid double deploys.

## Smoke checks after go-live

- [ ] https://sarifinancial.com loads
- [ ] https://www.sarifinancial.com redirects to apex
- [ ] Homepage images load (paths like `/images/stock/...`, not `/SariFinancialManagement/images/...`)
- [ ] `/services/bookkeeping/`, `/contact/`, `/reviews/` resolve (trailing slash OK)
- [ ] Contact / review mailto forms still open an email draft

## GitHub Pages backup

Leave `.github/workflows/deploy-pages.yml` until Cloudflare is verified. That preview stays at:

https://levizigza.github.io/SariFinancialManagement/

Turn off GitHub Pages later if you no longer need the backup URL.
