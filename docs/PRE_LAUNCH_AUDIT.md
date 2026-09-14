# Pre-launch audit — Sari Financial Management

**Date:** 2026-09-12  
**Review posture:** Senior engineer · UX · SEO · compliance-conscious editor  
**Verdict:** **Do not deploy until client-confirmation items below are resolved or accepted.** Critical fabrication risks were not found; several auto-fixes landed in this pass. Remaining blockers are primarily **client verification** (scope language, domain, photo, analytics) and **operator QA** (manual device pass, DNS, email delivery).

---

## Verified identity (checked against source of truth)

| Fact | Status |
|------|--------|
| Business name: Sari Financial Management | Pass (`site.ts`) |
| Founder: Sari Goitom Tekle · Founder & Financial Advisor | Pass |
| Phone: 825-935-3739 | Pass |
| Email: sari.financialmanagement@gmail.com | Pass |
| Location: Calgary, Alberta | Pass |
| Services: Bookkeeping, Payroll, Tax Services, Business Advisory | Pass |
| No Lorem Ipsum in `src` | Pass |
| No invented testimonials / ratings / AggregateRating | Pass (empty testimonials + trust fallback) |
| No CPA firm claim | Pass (explicit disclaimers) |
| No investment/securities advice claim | Pass (explicit “No”) |
| No street address invented | Pass |
| Favicon | Pass (`src/app/favicon.ico`) |
| Sitemap / robots | Pass |
| Contact form ↔ Privacy Policy alignment | Pass |
| Keyboard / a11y baseline | Pass (prior WCAG pass; re-verify after deploy) |

---

## Fabrication / claim scan (repository)

### Not found (good)
- Fake client names, star ratings, “trusted by N clients,” “since 20xx,” awards
- CPA / Chartered Professional Accountant as a claimed designation
- Portfolio / securities / wealth-management advice
- Street address or map pins
- Lorem Ipsum / “Click here” dummy paragraphs

### Softened or gated in this pass
- Tax “prepare returns” / personal+business include lists → scope-confirmed language
- Payroll remittance includes → organization of remittance-related records; FAQ already honest
- Homepage payroll “accurate” promise → “organized”
- Contact “and beyond” geographic stretch → Calgary-focused
- FAQ items needing confirmation excluded from FAQPage JSON-LD
- JSON-LD `availableLanguage: English` removed pending confirmation
- Visible “Portrait slot / photo to be added” → monogram placeholder
- Missing OG/Twitter image → generated brand OG + Twitter images
- 404 now `noindex`; app `error.tsx` added

### Still requires human judgment (not auto-fixed as “true”)
See **§2 Client confirmation**.

---

## Route inventory (manual check required on desktop / tablet / mobile)

| Route | Type | Notes |
|-------|------|-------|
| `/` | Static | Hero LCP text; portrait monogram |
| `/about` | Static | Founder section |
| `/services` | Static | Grid h2→h3 |
| `/services/bookkeeping` | SSG | View event |
| `/services/payroll` | SSG | Remittance FAQ honest |
| `/services/tax-services` | SSG | Scope language softened |
| `/services/business-advisory` | SSG | Not investment advice |
| `/resources` | Static | Planned topics only |
| `/resources/[category]` | SSG | 4 categories |
| `/resources/.../[slug]` | SSG when published | **None published** |
| `/faq` | Static | Schema excludes unconfirmed |
| `/contact` | Static | Form + privacy notices |
| `/privacy` | Static | Analytics section present |
| `/sitemap.xml` | Meta | |
| `/robots.txt` | Meta | |
| Soft 404 | `not-found` | noindex |
| Error UI | `error.tsx` | Generic copy |

**Device matrix:** Automate what we can in CI later; **operator must click every route** at ~375px, ~768px, ~1280px before go-live (sticky header wrap, mobile menu trap, form, FOUC).

---

## 1. Issues fixed automatically (this pass)

1. Softened **tax** and **payroll** public copy that overstated remittance filing / return preparation ahead of client confirmation.
2. Removed homepage **accuracy** implication for payroll.
3. Removed contact page **“and beyond”** geographic claim.
4. Excluded FAQ items with `needsClientConfirmation` from **FAQPage JSON-LD**; flipped who/pricing/remote `schemaEligible` to false.
5. Removed unverified **`availableLanguage`** from Organization JSON-LD.
6. Replaced visitor-facing **portrait WIP copy** with a brand monogram (aspect ratio retained).
7. Added **`opengraph-image.tsx`** + **`twitter-image.tsx`** (navy/gold brand card).
8. Marked **404** `robots: noindex, nofollow`.
9. Added **`error.tsx`** with safe user messaging (no stack leaks).
10. Prior passes already covered: secure form, a11y, CWV, env-gated analytics, SECURITY.md, measurement plan.

---

## 2. Issues requiring client confirmation

**Do not treat these as “done” until the client answers.**

| # | Topic | Why it matters | Suggested question |
|---|--------|----------------|--------------------|
| C1 | Domain `sarifinancialmanagement.com` | Canonicals, JSON-LD, sitemap, OG footer | Confirm ownership + DNS live before launch |
| C2 | Tax scope (T1/T2/GST/HST, personal vs business) | Regulatory / advertising accuracy | What return types may we name publicly? |
| C3 | Payroll remittances | CRA filing vs record support | Do you file remittances, or organize only? |
| C4 | “Financial Advisor” title / any licences | Compliance | Confirm title + any licences for public use |
| C5 | Languages spoken | JSON-LD / accessibility | English only? Others? |
| C6 | Remote / hybrid policy | FAQ + service delivery | Which services can be remote? |
| C7 | Pricing model | FAQ honesty | Hourly / package / retainer; publish ranges? |
| C8 | Software tools (QBO, Xero, etc.) | Service FAQ | Which tools to name? |
| C9 | Professional portrait | Trust / brand | Supply approved photo for `/public` |
| C10 | Google Business Profile / social URLs | `sameAs` | Provide URLs when ready |
| C11 | Analytics go-live | Privacy | Approve GA4 enablement + Privacy Policy |
| C12 | Email delivery (Resend) | Contact form | Verified domain + `RESEND_API_KEY` |
| C13 | Who-you-serve wording | Marketing accuracy | Industries / entity sizes to name? |
| C14 | Testimonials | Social proof | Only add verified, approved quotes |

Internal trackers: `docs/CLIENT_BIO_TODOS.md`, `docs/FAQ_CLIENT_TODOS.md`, TODOs in `src/content/services.ts`.

---

## 3. Launch checklist

### Blockers (must)
- [ ] Client confirms **C1–C4** (domain, tax, payroll remittance, advisor title) or accepts softened live copy as-is in writing
- [ ] Set production env: `NEXT_PUBLIC_SITE_URL`, Resend keys, contact emails
- [ ] HTTPS + HSTS working on production host
- [ ] Manual route check desktop / tablet / mobile (all routes above)
- [ ] Contact form: validation errors, success, honeypot, rate limit, no sensitive fields
- [ ] Phone `tel:` and email `mailto:` work on a real phone
- [ ] Sitemap reachable; Search Console property verified (DNS or env token)
- [ ] Analytics **remain off** until C11 approved (`NEXT_PUBLIC_ANALYTICS_ENABLED=false`)
- [ ] Privacy Policy reviewed by client / counsel as needed
- [ ] Favicon + OG image render in a share debugger (Facebook/LinkedIn/X)
- [ ] 404 and error pages smoke-tested
- [ ] No `TODO(client)` text visible in production UI (dev FAQ todos already gated)

### Strongly recommended before ads/PR
- [ ] Real founder portrait
- [ ] Google Business Profile linked
- [ ] Lighthouse mobile: LCP ≤ 2.5s, INP &lt; 200ms, CLS &lt; 0.1
- [ ] Keyboard-only pass (skip link, mobile menu trap, form)
- [ ] Mark GA conversion on `contact_form_submit` success after analytics enabled

### Do not deploy if
- Live copy still promises remittance **filing** or specific return types the client did not approve
- Fake testimonials or CPA language are introduced
- Secrets committed to git
- Contact form has no working delivery path in production

---

## 4. Recommended Phase 2 improvements

1. **Photography & brand kit** — portrait, optional hero atmosphere image, apple-touch-icon, PWA manifest.
2. **Insights publishing** — approve first articles; author credentials only when verified.
3. **Consent-aware analytics** — if Alberta/PIPEDA counsel wants an explicit cookie/consent banner before GA.
4. **Shared rate-limit store** (Redis) for multi-instance hosting.
5. **CSP** allowing fonts + optional GA once analytics is on.
6. **Secure document channel** — then update contact + privacy notices.
7. **GBP + Local SEO** — `sameAs`, optional Service pages enhancements, CallRail only if privacy-reviewed.
8. **CMS / preview** for service scope edits without developers.
9. **Automated a11y + link checker** in CI (axe + crawl).
10. **Loading UI** (`loading.tsx`) for any future dynamic routes.

---

## Accessibility / performance / forms (summary)

| Area | Status |
|------|--------|
| Skip link, focus, mobile menu trap | Implemented (prior pass) |
| Form labels, alerts, privacy notice | Implemented |
| Reduced motion | Implemented |
| Font preload / Zod client split | Implemented (prior CWV pass) |
| Loading states | Contact button “Sending…”; no route `loading.tsx` (acceptable for static site; Phase 2) |
| Responsive | Token/layout designed mobile-first; **manual verify required** |

---

## Sign-off

| Role | Gate |
|------|------|
| Engineering | Build green; env template complete; no secrets in repo |
| UX | Device matrix + form + 404/error |
| SEO | Sitemap, robots, OG, schema without unverified claims |
| Compliance editor | Client confirmation table (C1–C14) closed or deferred in writing |

**Deploy recommendation:** Hold production launch until **C1–C4** and Resend/HTTPS checklist items are closed. Softened copy reduces legal/marketing risk but does not replace client scope confirmation.
