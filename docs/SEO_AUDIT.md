# Local SEO Audit Report — Sari Financial Management

**Market:** Calgary, Alberta, Canada  
**Domain:** https://sarifinancialmanagement.com  
**Generated from:** `src/lib/seo.ts` (`pageSeo` registry)  
**Date:** 2026-09-12

## Implementation checklist

| Item | Status |
| --- | --- |
| Unique page titles | Done |
| Unique meta descriptions | Done |
| One H1 per page | Done |
| Logical H2/H3 structure | Done (page sections) |
| Canonical URLs | Done (`buildPageMetadata`) |
| Open Graph | Done |
| Twitter/X cards | Done |
| XML sitemap | Done (`/sitemap.xml`) |
| robots.txt | Done (`/robots.txt`) |
| Visible breadcrumbs | Done (interior pages) |
| BreadcrumbList JSON-LD | Done (with visible crumbs) |
| Organization + LocalBusiness JSON-LD | Done (no street address) |
| Internal links between services | Done (related services + nav/footer) |
| Natural Calgary language | Done |
| Location in footer + contact | Done |
| No CPA / street address invention | Observed |
| No fake neighbourhood pages | Observed |

## Structured data notes

- **LocalBusiness / Organization / ProfessionalService:** name, URL, email, phone, Calgary/AB/CA locality, areaServed, founder. Street address omitted (not verified).
- **BreadcrumbList:** emitted alongside visible breadcrumb UI.
- **FAQPage:** on `/faq` for visible Q&As only. Google no longer shows FAQ rich results (May 2026); markup retained for other consumers.
- **Do not add** AggregateRating or Review schema until verified testimonials exist.

## Page inventory

| Path | Target search intent | Title | H1 | Meta description |
| --- | --- | --- | --- | --- |
| `/` | financial management Calgary | Financial Management in Calgary \| Sari Financial Management | Financial clarity for stronger businesses. | Sari Financial Management helps Calgary businesses with bookkeeping, payroll, tax services, and business advisory—organized books for clearer decisions. |
| `/about` | about Sari Financial Management Calgary | About Sari Financial Management in Calgary | About Sari Financial Management | Meet Sari Goitom Tekle, Founder & Financial Advisor at Sari Financial Management in Calgary, Alberta. Client-centered financial clarity—More Than Numbers. |
| `/services` | financial management services Calgary | Financial Management Services in Calgary | Financial management support | Explore bookkeeping, payroll, tax services, and business advisory from Sari Financial Management in Calgary. Clear scope, practical support. |
| `/services/bookkeeping` | bookkeeping services Calgary; small business bookkeeping Calgary | Bookkeeping Services in Calgary for Small Businesses | Bookkeeping services in Calgary that bring clarity to your numbers | Bookkeeping services in Calgary from Sari Financial Management—organized, up-to-date records so small businesses can see where money is going. |
| `/services/payroll` | payroll services Calgary | Payroll Services in Calgary \| Sari Financial Management | Payroll services in Calgary that keep pay runs organized | Payroll services in Calgary to help keep employee payments and related records organized. Practical support from Sari Financial Management. |
| `/services/tax-services` | tax services Calgary | Tax Services in Calgary \| Sari Financial Management | Tax services in Calgary for a clearer path through filing season | Tax services in Calgary to help you prepare for tax obligations with greater clarity. Practical filing support from Sari Financial Management. |
| `/services/business-advisory` | business advisory Calgary | Business Advisory in Calgary \| Sari Financial Management | Business advisory in Calgary to help you understand your numbers | Business advisory in Calgary focused on understanding your numbers for day-to-day decisions—not investment advice. Sari Financial Management. |
| `/resources` | Calgary financial management resources | Resources for Calgary Business Finances | Guides and trusted references | Guides and trusted government links for Calgary businesses—bookkeeping, payroll, and tax preparation resources from Sari Financial Management. |
| `/faq` | Sari Financial Management FAQ Calgary | FAQ \| Sari Financial Management Calgary | Frequently asked questions | Answers about bookkeeping, payroll, tax services, and advisory in Calgary—how consultations work, pricing discussions, and how to get started. |
| `/contact` | contact / book consultation Calgary | Contact Sari Financial Management in Calgary | Book a Consultation | Book a consultation with Sari Financial Management in Calgary, Alberta. Call 825-935-3739 or email sari.financialmanagement@gmail.com. |
| `/privacy` | privacy policy | Privacy Policy \| Sari Financial Management | Privacy Policy | How Sari Financial Management in Calgary handles personal information submitted through this website. |

## Client follow-ups (SEO-relevant)

- [ ] Publish street address only if approved for NAP consistency (Google Business Profile)
- [ ] Add Google Business Profile URL to `sameAs` in LocalBusiness JSON-LD
- [ ] Confirm remote-service policy for copy/schema `areaServed` expansion
- [ ] Supply OG image asset (`openGraph.images`) when brand photography is ready
- [ ] Never add CPA language unless independently verified

## What we deliberately did not do

- Keyword stuffing or doorway neighbourhood pages
- Invented office street address
- CPA / Chartered Professional Accountant claims
- Fake review stars or AggregateRating
