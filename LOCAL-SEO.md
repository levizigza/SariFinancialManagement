# Local SEO Implementation Plan — Sari Financial Management

**Market:** Calgary, Alberta, Canada  
**Domain:** `sarifinancialmanagement.com`  
**NAP (verified):** Sari Financial Management · Calgary, Alberta · 825-935-3739 · sari.financialmanagement@gmail.com  
**Principle:** Win local relevance with one strong page per intent—not doorway pages for every Calgary neighbourhood.

Related code: `src/lib/seo.ts`, `src/components/seo/json-ld.tsx`, `docs/SEO_AUDIT.md`  
Client gaps: `CONTENT-NEEDED-FROM-SARI.md`

---

## 1. Strategy (what we will and will not do)

### Do

- Include **Calgary** naturally in homepage title, H1 (recommended update), and supporting copy
- Keep **Calgary** in service-page titles, H1s, and meta where it matches commercial intent
- Use one consistent company name, phone, and location everywhere (site, schema, GBP)
- Maintain a clear **Contact / Book a Consultation** page as the conversion endpoint
- Emit **Organization + LocalBusiness** JSON-LD from verified facts only
- Prepare a complete **Google Business Profile** that matches the website
- Publish useful Calgary / Alberta–relevant guides that earn links and support services
- Cross-link services ↔ matching resource articles and category hubs

### Do not

- Create pages for Beltline, Kensington, Mahogany, “near me” clones, or every NW/SW quadrant
- Target the same commercial intent on two URLs (e.g. two “bookkeeping Calgary” money pages)
- Invent street address, service area, ratings, hours, or CPA claims
- Stuff “Calgary” into every H2 or article paragraph

### Intent ownership rule

| If the query is… | Own it on… | Do not also rank-chase it on… |
| --- | --- | --- |
| Commercial service + Calgary | Matching `/services/...` page | Homepage, hub, or a near-duplicate article |
| Brand / who / trust | `/about` or homepage brand sections | A thin “about bookkeeping Calgary” page |
| How-to / education | One Resource article (or category hub) | A new service URL with the same title angle |
| Contact / book now | `/contact` | Multiple “consultation Calgary” landing pages |

---

## 2. Local relevance levers (implementation checklist)

| Lever | Current state | Next actions |
| --- | --- | --- |
| Homepage title | Includes Calgary | Keep; align OG title |
| Homepage H1 | “Financial clarity for stronger businesses.” — no city | Soften in Calgary: e.g. “Financial clarity for Calgary businesses.” (one natural mention) |
| Homepage body | Calgary in hero, local section, founder | Keep; avoid repeating city in every block |
| Service metadata | Calgary in title / H1 / description | Keep; refresh descriptions when scope is client-confirmed |
| NAP consistency | Name, phone, Calgary AB on contact, footer, schema | Match GBP exactly; add street only if approved |
| Contact page | Strong consultation + founder identity | Keep phone click-to-call; add map embed only with approved address/area |
| Structured data | Organization + LocalBusiness + ProfessionalService | Add `sameAs` (GBP URL) when live; never fake `AggregateRating` |
| GBP readiness | Not wired in schema yet | See §4 |
| Local content | Several Calgary/Alberta articles live | See keyword map + content opportunities |
| Internal links | Related services on service templates; resources somewhat separate | Add “Related guides” on each service; “Related service” CTAs on articles |

---

## 3. Structured data (verified only)

**Emit today**

- `@type`: `Organization`, `LocalBusiness`, `ProfessionalService`
- `name`, `url`, `email`, `telephone`
- `address`: locality Calgary, region AB, country CA (**no street** until verified)
- `areaServed`: Calgary, Alberta, Canada
- `founder`: Sari Goitom Tekle, Founder & Financial Advisor
- `knowsAbout`: Bookkeeping, Payroll, Tax Services, Business Advisory
- BreadcrumbList on interior pages
- FAQPage only for visible, accurate FAQ answers

**Add when confirmed**

- `sameAs`: Google Business Profile URL (+ LinkedIn/Instagram only if official)
- `streetAddress` / `postalCode` only if public and matching GBP
- `openingHoursSpecification` only if hours are real and maintained
- `availableLanguage` only after languages are confirmed (`CONTENT-NEEDED-FROM-SARI.md`)

**Never**

- Review stars / AggregateRating without verified reviews
- Fake geo coordinates or neighbourhood `hasMap` spam
- CPA or licence claims in schema

---

## 4. Google Business Profile readiness

Complete GBP **before** or **with** domain launch so NAP and categories match the site.

| Field | Guidance |
| --- | --- |
| Business name | **Sari Financial Management** (exact site spelling) |
| Primary category | Choose the closest fit (e.g. Bookkeeper or Accountant—confirm which GBP allows and which matches real scope; do not claim CPA in description) |
| Secondary categories | Payroll service / Tax preparation / Business management consultant only if accurate |
| Location | Calgary, Alberta; publish street only if clients may visit and address is approved |
| Service area | Calgary (+ surrounding only if client confirms) — avoid listing 20+ neighbourhoods as “cities served” |
| Phone | **825-935-3739** |
| Website | `https://sarifinancialmanagement.com` |
| Appointment URL | `/contact` |
| Description | Plain language: bookkeeping, payroll, tax services, business advisory; founder-led; not investment advice; no unverified credentials |
| Products/services | Mirror the four official service names |
| Photos | Approved portrait + optional workspace; no stock “crypto gold” imagery |
| Posts | Occasional links to new Resource articles (Calgary/Alberta angles) |
| Q&A | Seed honest answers matching `/faq` (who you work with, not investment advice, consultation process) |

After GBP is live: add the profile URL to LocalBusiness `sameAs` in `json-ld.tsx`.

---

## 5. Initial keyword → page map

One primary commercial or navigational intent per URL. Secondary intents may appear in copy or FAQs but must not justify a second page.

### Core website pages

#### `/` — Homepage

| Field | Plan |
| --- | --- |
| **Page** | `/` |
| **Primary intent** | Financial management / bookkeeping firm in Calgary (head-term / category discovery) |
| **Secondary intents** | Calgary small business finances; who leads the practice; overview of four services |
| **User problem** | “I need someone local to get my finances organized—who is this firm?” |
| **CTA** | Book a Consultation → `/contact`; secondary Explore services → `/services` |
| **Internal links** | All four services; About/founder; Resources hub; FAQ (who you work with); Contact |
| **Content opportunities** | Natural Calgary in H1; keep one local proof section; do not duplicate long service copy |

#### `/services` — Services hub

| Field | Plan |
| --- | --- |
| **Page** | `/services` |
| **Primary intent** | Financial management services Calgary (hub / comparison) |
| **Secondary intents** | Journey: organize → operate → prepare → understand & plan |
| **User problem** | “Which of your services do I need?” |
| **CTA** | Start where you need support → individual service pages; Book consultation |
| **Internal links** | Each service detail; Contact; optional one guide per stage |
| **Content opportunities** | Short differentiators only; avoid repeating full service H1 keywords |

#### `/services/bookkeeping`

| Field | Plan |
| --- | --- |
| **Page** | `/services/bookkeeping` |
| **Primary intent** | Bookkeeping services Calgary / small business bookkeeping Calgary |
| **Secondary intents** | Organized books; catch-up bookkeeping (only if offered—confirm scope) |
| **User problem** | “My books are behind or unclear; I need ongoing or cleanup support.” |
| **CTA** | Book a Consultation; related Payroll / Tax |
| **Internal links** | Related services; Resources: records to keep, when to hire, bookkeeping vs accounting, cash flow |
| **Content opportunities** | Alberta/CRA-safe process outline; link to guides—not a second “bookkeeping Calgary” URL |

#### `/services/payroll`

| Field | Plan |
| --- | --- |
| **Page** | `/services/payroll` |
| **Primary intent** | Payroll services Calgary |
| **Secondary intents** | Alberta small business payroll support (educational nuance → article) |
| **User problem** | “Pay runs and payroll records are stressful; I need reliable help.” |
| **CTA** | Book a Consultation; related Bookkeeping |
| **Internal links** | Bookkeeping; Tax; Resource: payroll Alberta article |
| **Content opportunities** | Clarify remittance responsibilities are confirmed in consultation (already cautious copy) |

#### `/services/tax-services`

| Field | Plan |
| --- | --- |
| **Page** | `/services/tax-services` |
| **Primary intent** | Tax services Calgary (preparation / organized filing support—not “tax lawyer”) |
| **Secondary intents** | Year-end prep for Calgary businesses (support via article) |
| **User problem** | “Tax season feels chaotic; I need an organized path.” |
| **CTA** | Book a Consultation; related Bookkeeping |
| **Internal links** | Bookkeeping; year-end prep article; FAQ (CPA / scope) |
| **Content opportunities** | Publish exact scope only after client answers in `CONTENT-NEEDED-FROM-SARI.md` |

#### `/services/business-advisory`

| Field | Plan |
| --- | --- |
| **Page** | `/services/business-advisory` |
| **Primary intent** | Business advisory Calgary (operational / financial clarity) |
| **Secondary intents** | Understanding reports; cash-flow conversations |
| **User problem** | “I have numbers but don’t know what they mean for decisions.” |
| **CTA** | Book a Consultation; disclaim not investment advice |
| **Internal links** | Bookkeeping; reports article; new Calgary business first-year article |
| **Content opportunities** | Keep investment disclaimer prominent; no “wealth management Calgary” targeting |

#### `/about`

| Field | Plan |
| --- | --- |
| **Page** | `/about` |
| **Primary intent** | About Sari Goitom Tekle / Sari Financial Management Calgary (brand + trust) |
| **Secondary intents** | Who handles my information; founder-led practice |
| **User problem** | “Can I trust the person who will see my finances?” |
| **CTA** | Book a Consultation; Explore services |
| **Internal links** | Contact; Services; Homepage philosophy journey |
| **Content opportunities** | Approved bio + portrait when ready; no invented CV for rankings |

#### `/contact`

| Field | Plan |
| --- | --- |
| **Page** | `/contact` |
| **Primary intent** | Book consultation / contact bookkeeping Calgary |
| **Secondary intents** | Phone, email, Calgary location confirmation |
| **User problem** | “How do I reach a real person here?” |
| **CTA** | Form submit; click-to-call; email |
| **Internal links** | Privacy; About (who you’ll work with); Services |
| **Content opportunities** | Keep NAP identical to GBP; map only with approved address |

#### `/faq`

| Field | Plan |
| --- | --- |
| **Page** | `/faq` |
| **Primary intent** | Brand FAQ / how engagement works (Calgary context) |
| **Secondary intents** | Pricing discussion process; remote policy (honest until confirmed); CPA clarification |
| **User problem** | “Quick answers before I book.” |
| **CTA** | Book a Consultation |
| **Internal links** | Contact; relevant service pages; About |
| **Content opportunities** | Update answers only after client confirmation; one FAQ per question—no FAQ doorway clones |

#### `/resources` (+ category hubs)

| Field | Plan |
| --- | --- |
| **Page** | `/resources`, `/resources/{category}` |
| **Primary intent** | Educational hub for Calgary / Alberta business finances |
| **Secondary intents** | Browse by bookkeeping, payroll, tax, advisory |
| **User problem** | “I want to learn before (or while) hiring help.” |
| **CTA** | Soft: related service + Book consultation |
| **Internal links** | Articles; matching service pages; official CRA / Alberta links |
| **Content opportunities** | Category intros with light Calgary/Alberta framing—not four mini service pages |

#### `/privacy`

| Field | Plan |
| --- | --- |
| **Page** | `/privacy` |
| **Primary intent** | Privacy policy (compliance / trust) |
| **Secondary intents** | How Calgary contact data is handled |
| **User problem** | “Is it safe to send information?” |
| **CTA** | Contact if questions |
| **Internal links** | Contact |
| **Content opportunities** | Align with real document-handling process when confirmed |

---

### Resource articles (supporting intents — not service duplicates)

| Page | Primary intent | Secondary | User problem | CTA | Internal links | Content opportunities |
| --- | --- | --- | --- | --- | --- | --- |
| `/resources/bookkeeping/records-calgary-small-business-should-keep` | What records Calgary small businesses should keep | Bookkeeping hygiene | “What should I keep?” | Bookkeeping service + consult | `/services/bookkeeping` | Refresh yearly; CRA-safe |
| `/resources/bookkeeping/when-to-hire-a-bookkeeper` | When to hire a bookkeeper | DIY vs outsource | “Is it time to get help?” | Bookkeeping + consult | Bookkeeping service | Keep educational; no “bookkeeping Calgary” H1 clash |
| `/resources/bookkeeping/bookkeeping-vs-accounting` | Bookkeeping vs accounting | Scope education | “Which do I need?” | Bookkeeping; FAQ CPA | Bookkeeping, About | Reinforce non-CPA honesty |
| `/resources/bookkeeping/bookkeeping-and-cash-flow-decisions` | Bookkeeping → cash-flow clarity | Advisory bridge | “Books don’t help me decide” | Bookkeeping + Advisory | Both services | Cross-link journey |
| `/resources/payroll/payroll-small-business-alberta` | Alberta small business payroll basics | Calgary employers | “How does payroll work here?” | Payroll service | `/services/payroll` | Alberta-specific; not a second payroll money page |
| `/resources/tax/prepare-before-year-end` | Year-end prep for owners | Tax season readiness | “What do I gather before filing?” | Tax services + Bookkeeping | Tax, Bookkeeping | Seasonal refresh |
| `/resources/business-advisory/financial-reports-owners-should-understand` | Reports owners should understand | Advisory education | “Which reports matter?” | Business advisory | Advisory, Bookkeeping | Keep non-investment |
| `/resources/business-advisory/new-calgary-business-first-year-finances` | New Calgary business first-year finances | Startup local | “What should I set up in year one?” | Bookkeeping + Advisory + Contact | Services hub | Strong local article; link from homepage local section |

---

## 6. Recommended future content (still no neighbourhood doorways)

Publish only if useful and non-duplicative of a service page:

1. **GST/HST basics for Alberta small businesses** (tax category) → link Tax + Bookkeeping  
2. **Sole proprietor vs corporation: record-keeping differences** (bookkeeping) — Alberta-neutral, Calgary examples  
3. **Preparing for your first payroll hire in Alberta** (payroll)  
4. **How we scope a consultation** (FAQ-adjacent article or FAQ expansion)—supports `/contact`  
5. **Secure ways to share financial documents** — only after real process is confirmed  

**Reject ideas like:** “Bookkeeping in Bridgeland,” “Best bookkeeper near Eau Claire,” “SW Calgary payroll” as separate URLs.

Neighbourhoods, if ever mentioned, belong as **one sentence of context** inside a real guide or About—not as indexed landing pages.

---

## 7. Internal linking blueprint

```
Home
  → Services hub → each Service
  → About (trust)
  → Contact (convert)
  → Resources hub → Category → Article
  → FAQ

Each Service
  → 2–4 Related guides (same topic)
  → 1–2 Adjacent services (journey)
  → Contact CTA
  → FAQ anchors where relevant (CPA, investment, who you work with)

Each Article
  → Parent category
  → Primary matching Service
  → Optional secondary Service
  → Contact soft CTA
  → 1–2 sibling articles (not circular farms)
```

Implementation note: add a “Related guides” block on `src/app/services/[slug]/page.tsx` wired from a small map in content config so links stay intentional.

---

## 8. Priority implementation order

1. **Align homepage H1** with natural Calgary mention (title already strong).  
2. **Wire service ↔ resource links** (related guides + article CTAs).  
3. **Launch / claim GBP** with NAP matching the site; add `sameAs`.  
4. **Confirm scope copy** (tax, advisory, remote, pricing) via `CONTENT-NEEDED-FROM-SARI.md` before aggressive keyword expansion.  
5. **Publish 1–2 high-value Alberta/Calgary guides** from §6 (not neighbourhood pages).  
6. **Re-audit** titles/H1s for intent collisions after new articles ship (`docs/SEO_AUDIT.md`).

---

## 9. Measurement (local)

| Signal | How |
| --- | --- |
| Organic queries with Calgary / bookkeeping / payroll / tax | GA4 + Search Console (when enabled) |
| Calls / form submits from local landing pages | Existing analytics events on phone, email, form |
| GBP actions | Calls, direction requests, website clicks |
| Rankings | Track primary intents in §5 only—ignore vanity neighbourhood keywords |

---

## 10. Summary

Local SEO for this practice is **depth + trust + one page per intent**, anchored in Calgary through metadata, contact, schema, GBP, and useful Alberta-aware content—not a grid of neighbourhood doorways. Keep NAP and founder identity consistent; expand keywords only when a new URL has a distinct user problem and a clear CTA back to consultation.
