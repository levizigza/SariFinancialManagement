# Competitive UX Review — Sari Financial Management

**Date:** 2026-09-12  
**Lens:** First-time visitor (~10 seconds on homepage + chrome)  
**Comparators (principles only — no copied copy, layout, or assets):** Adeolu Ajayi CPA · Little Fish Accounting · Avalon Accounting · Founder’s CPA · Kruze Consulting · Pilot  

**Related:** `docs/PRE_LAUNCH_AUDIT.md`, `LOCAL-SEO.md`, `CONTENT-NEEDED-FROM-SARI.md`

---

## Method

Scored against what a first-time visitor can answer from **header + first viewport + immediately obvious next sections**, not a full scroll of every page. Scores 1–10. **Any score below 8 includes an actionable recommendation.**

---

## Ten-second clarity scores

| # | Question | Score | Evidence (current site) |
|---|----------|------:|-------------------------|
| 1 | What does this company do? | **7** | Hero subcopy names bookkeeping, payroll, tax services, and business advisory. H1 is abstract (“Financial clarity for stronger businesses”) and does not state the offer category. |
| 2 | Where is it located? | **9** | Sticky contact bar + hero eyebrow + footer: Calgary, Alberta. |
| 3 | Is it relevant to my business? | **6** | “Calgary businesses” + need-based audiences (owners, teams, tax planners). No sharp firmographic “best for” (industry, stage, or entity type) in the first screen. |
| 4 | Who is behind the company? | **9** | Hero “Led by Sari Goitom Tekle, Founder & Financial Advisor” + portrait slot; fuller founder block mid-page; About centered on founder. |
| 5 | Why should I trust them? | **5** | Honest no-fake-testimonials stance, real NAP, privacy, founder-led framing. Missing: real photo, credentials, years, reviews, GBP, published social proof. Values strip is brand language, not evidence. |
| 6 | What services are offered? | **9** | Four services in hero; grid with Best for / What / Challenge / Outcome; nav + journey rail. |
| 7 | What outcome can I expect? | **7** | Brand journey (Organized Books → Smarter Decisions → Stronger Business) + per-card outcomes. Outcomes are carefully soft; no packages, timelines, or tangible “you’ll leave with X.” |
| 8 | How do I start? | **9** | Primary “Book a Consultation” in hero, CTAs, journey (“Start the Conversation”), final band. |
| 9 | Can I contact them easily? | **9** | Always-visible phone + email; `/contact` form + founder identity; click-to-call. |
| 10 | Does this feel safe and legitimate? | **7** | Professional navy/gold system, consistent NAP, disclaimers (not CPA firm / not investment advice), privacy, secure-form posture. Drag: portrait placeholder, Gmail contact address, no street/GBP, no reviews. |

**Average: 7.7** — strong on identity, location, services, and conversion path; weaker on relevance sharpness, proof, and outcome concreteness (by design until client facts arrive).

---

## Actionable recommendations (scores &lt; 8)

### 1. What does this company do? — **7 → aim 9**

- Change homepage H1 to pair **offer + place** in plain language, e.g. “Financial management for Calgary businesses” or “Bookkeeping and advisory clarity for Calgary businesses” (keep brand phrase as supporting line, not the only H1).
- Keep the four-service list in the first viewport (already good).

### 3. Is it relevant to my business? — **6 → aim 8**

- Add a short **“Best if you…” / “Not a fit if you…”** block (need-based is fine; avoid inventing industries). Example pattern: best if books are behind or payroll is new; not a fit if you need investment advice or a CPA audit firm.
- Optionally promote one `bestFor` line into the hero or trust strip once client confirms audiences (`CONTENT-NEEDED-FROM-SARI.md`).
- Do **not** invent niches (startups, restaurants, etc.) until verified.

### 5. Why should I trust them? — **5 → aim 8**

- Ship **approved founder portrait** (largest single trust lift).
- Publish **1–3 verified testimonials** only when approved; keep empty-state honesty until then.
- After confirmation: education, memberships, software—display only verified items.
- Claim **Google Business Profile** and link from contact/footer/`sameAs`.
- Prefer a domain mailbox (`…@sarifinancialmanagement.com`) when DNS/email is ready—signals legitimacy vs consumer Gmail.

### 7. What outcome can I expect? — **7 → aim 8–9**

- Keep brand journey; add one concrete, non-promised line per service card outcome that states the *kind* of clarity (e.g. “Current books you can read before decisions”)—already partially there; tighten for scannability.
- On consultation CTA, state **what happens next** (reply personally, agree scope, no obligation)—partially present; move one sentence into the hero under the buttons.
- Still avoid fake packages/pricing until the client defines a model.

### 10. Does this feel safe and legitimate? — **7 → aim 9**

- Portrait + GBP + working production email delivery (Resend) + HTTPS on the real domain.
- Surface **Privacy** near the contact form (already linked)—add a one-line “what we don’t ask for” reassurance if document process is confirmed.
- Optional: short “Founder-led · Calgary · Scope confirmed before work” micro-trust row under the hero CTAs.

---

## Competitor pattern comparison (principles only)

| Pattern source | Structural strength | Sari today | Gap / opportunity |
| --- | --- | --- | --- |
| **Adeolu Ajayi CPA** | Local clarity, founder authority, consultation CTA | Strong location + founder + consult CTA | H1 less “local+offer”; proof thinner without CPA claim (correctly so) |
| **Little Fish Accounting** | Audience clarity, service progression, outcome-based packaging | Journey rail + card outcomes | Audience still generic; no packages (wait for pricing model) |
| **Avalon Accounting** | Package clarity, small-business positioning | Small-business language present | No package architecture—use “scoped engagement” clarity instead of invented tiers |
| **Founder’s CPA** | Niche positioning + testimonials | Founder-led niche emerging | No niche depth yet; no testimonials |
| **Kruze Consulting** | Specific audience, proof, educational depth | Resources architecture exists | Audience not hyper-specific; proof light; publish/promote guides |
| **Pilot** | “Best for” segmentation + service/pricing architecture | `bestFor` on every service card | Segmentation not hero-level; pricing intentionally absent |

**Principle extraction (apply, don’t imitate):**

1. Say **who + where + what** in the first screen.  
2. Make **founder** visible early.  
3. Put **one primary consultation CTA** everywhere.  
4. Use **progression or packages** so services aren’t a flat list.  
5. Show **proof** (reviews, logos, metrics)—only if true.  
6. Segment **best for** so the wrong visitor self-selects out.  
7. Back services with **education**, not doorway pages.

Sari already implements 2, 3, 4 (progression), partial 6 (`bestFor`), and the ethics half of 5 (no fake proof). Gaps are 1 (H1), hero-level 6, real 5, and package-level 7.

---

## Competitive advantages Sari now has

1. **Honesty as brand** — no fake reviews, no CPA theatre, clear “not investment advice.”
2. **Founder-first visibility** — name and role in the hero; About and Contact reinforce who handles client information.
3. **Service clarity architecture** — Best for / What / Challenge / Outcome + Organize→Operate→Prepare→Understand journey.
4. **Memorable brand system** — navy / champagne-gold, signature Organized Books journey, “More Than Numbers.”
5. **Conversion plumbing** — sticky NAP, consultation CTAs, contact form security posture, FAQ “who will I work with.”
6. **Local SEO without spam** — Calgary in metadata and content; no neighbourhood doorways (`LOCAL-SEO.md`).
7. **Accessibility / performance awareness** — WCAG-oriented patterns, reduced motion, CWV-conscious assets.

---

## Remaining weaknesses

1. Trust **evidence** lag (photo, reviews, credentials, GBP).  
2. **Audience sharpness** — need-based but not decisive in 10 seconds.  
3. **Outcome concreteness** — careful copy reads soft next to package-led competitors.  
4. **H1** still brand-abstract vs offer+city.  
5. **Educational depth** underused until insights are promoted from services.  
6. **Email domain** still Gmail on the public site.  
7. Homepage length — many good sections; first 10 seconds must not depend on scrolling to “Who we help.”

---

## Launch blockers

From UX + trust perspective (aligned with `docs/PRE_LAUNCH_AUDIT.md`):

| Blocker | Why |
| --- | --- |
| Client confirmation of tax / payroll / advisor-title scope | Wrong promises destroy legitimacy question #10 |
| Production domain + HTTPS + working contact email delivery | Broken form = failed “how do I start / contact” |
| Manual device QA of header, form, CTAs | Sticky contact bar + mobile nav must work |
| Analytics off until approved | Privacy legitimacy |
| Do not invent testimonials/credentials/street to “fix scores” | Would reverse ethical advantage |

**Not launch blockers but strong pre-ads recommendations:** real portrait, GBP live, homepage H1 Calgary+offer tweak.

---

## Post-launch experiments

1. **H1 A/B (or sequential):** brand-abstract vs “Financial management for Calgary businesses” — watch consult CTR + bounce.  
2. **Hero trust micro-row:** founder + Calgary + “Scope confirmed before work” — measure scroll depth to services.  
3. **“Best if / Not a fit”** module above or below services — measure service-page entries vs contact.  
4. **Related guides** on each service page — organic + assisted conversions.  
5. **First verified testimonial** placement (hero vs mid-page) once approved.  
6. **Consultation expectation line** under primary CTA (“Personal reply · Clear scope · No pressure”).  
7. After pricing model exists: test **scoped packages** vs “custom quote only”—do not invent tiers beforehand.  
8. GBP posts linking to one Calgary/Alberta resource monthly — calls + site clicks.

---

## Summary verdict

Sari’s site is **stronger than a typical new practice site** on founder clarity, service structure, local presence, and ethical trust—and **weaker than mature accounting brands** on proof, niche sharpness, and package-style outcomes. Closing the &lt;8 scores is mostly **content and asset honesty** (H1, audience framing, portrait, GBP, real reviews), not a redesign. Do not sacrifice the no-fabrication advantage to chase competitor-looking proof.
