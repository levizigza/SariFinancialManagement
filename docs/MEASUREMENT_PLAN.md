# Measurement plan — Sari Financial Management

**Audience:** operators and marketers  
**Region posture:** Alberta / privacy-conscious data minimization  
**Implementation:** env-gated GA4 (`NEXT_PUBLIC_ANALYTICS_*`) — **off until explicitly enabled**

This plan defines meaningful conversion and engagement events. Analytics must **never** collect SINs, banking details, CRA credentials, tax documents, financial statements, government ID, free-text form messages, or visitor email/phone as event parameters.

Related code: `src/lib/analytics/*`, `src/components/analytics/*`, `.env.example`.

---

## Integration points (no hardcoded account IDs)

| System | Env var | What it does |
|--------|---------|--------------|
| **Google Analytics 4** | `NEXT_PUBLIC_ANALYTICS_ENABLED` + `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Loads gtag only when both are set/true; fires listed events |
| **GA debug** | `NEXT_PUBLIC_ANALYTICS_DEBUG` | Console-logs events locally without requiring production traffic |
| **Google Search Console** | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Emits `<meta name="google-site-verification">` via Next.js `metadata.verification` when set |

**Search Console preferred method:** DNS TXT on `sarifinancialmanagement.com` (no code change). The HTML-tag env var is the integration point when DNS is not available.

**GA4 property setup (operator):**
1. Create a GA4 property; copy Measurement ID (`G-…`) into host env — not into source.
2. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` only after Privacy Policy reflects analytics use.
3. Mark `contact_form_submit` (status=success) as a key conversion in GA4.
4. Optional: register custom dimensions for `location`, `service`, `status` (event-scoped).

**Privacy defaults in code:** IP anonymization flag, Google signals off, ad personalization signals off. No advertising pixels.

---

## Funnel overview

```
Awareness (service / content views)
    → Consideration (book_consultation_click, phone_click, email_click)
        → Intent (contact_form_start)
            → Conversion (contact_form_submit success)
```

---

## Event catalog

### `book_consultation_click`

| | |
|--|--|
| **Definition** | User activates a control that navigates to the consultation / contact path (`/contact`) or the primary “Book a Consultation” CTA. |
| **Why it matters** | Leading engagement KPI for demand; compares CTA placements. |
| **Where it occurs** | Header / mobile menu, home hero, page heroes with CTA, CTA bands, footer CTA, services index copy, FAQ preview. |
| **Funnel stage** | Consideration → Intent |
| **Params (allowed)** | `location` (e.g. `header`, `home_hero`, `cta_band`, `footer`) |
| **Do not send** | Name, email, phone, message text |

---

### `phone_click`

| | |
|--|--|
| **Definition** | User activates a `tel:` link to the business phone number. |
| **Why it matters** | High-intent contact channel; many clients prefer calling. |
| **Where it occurs** | Contact bar, header, mobile menu, CTA band, footer, home Calgary block, FAQ preview, contact form alternate contact. |
| **Funnel stage** | Consideration → Conversion (offline) |
| **Params (allowed)** | `location` |
| **Do not send** | The phone number as a parameter (visible in UI only); no caller ID |

---

### `email_click`

| | |
|--|--|
| **Definition** | User activates a `mailto:` link to the business email. |
| **Why it matters** | Alternate high-intent channel; useful when forms are abandoned. |
| **Where it occurs** | Contact bar, mobile menu, footer, home Calgary block, contact form alternate contact. |
| **Funnel stage** | Consideration → Conversion (offline) |
| **Params (allowed)** | `location` |
| **Do not send** | Email address as an event parameter |

---

### `contact_form_start`

| | |
|--|--|
| **Definition** | First focus within the public contact form on a page view (once per mount). |
| **Why it matters** | Measures form engagement vs. page views; start→submit drop-off. |
| **Where it occurs** | `/contact` contact form (`onFocusCapture`). |
| **Funnel stage** | Intent |
| **Params (allowed)** | `location=contact_page` |
| **Do not send** | Any field values |

---

### `contact_form_submit`

| | |
|--|--|
| **Definition** | Server action result returned to the form (success or user-visible error). Fired once per distinct result. |
| **Why it matters** | Primary **website conversion**. Success rate vs. validation/spam errors. |
| **Where it occurs** | `/contact` after `submitContactForm` completes. |
| **Funnel stage** | Conversion |
| **Params (allowed)** | `location=contact_page`, `status=success\|error` |
| **Do not send** | Name, email, phone, service selection detail beyond public taxonomy if added later, or message body |

---

### `service_view_bookkeeping`

| | |
|--|--|
| **Definition** | User views the Bookkeeping service detail page (`/services/bookkeeping`). |
| **Why it matters** | Interest in bookkeeping vs. other services; content demand. |
| **Where it occurs** | Service detail mount via `ServiceViewTracker`. |
| **Funnel stage** | Awareness → Consideration |
| **Params (allowed)** | `location=service_detail`, `service=bookkeeping` |

---

### `service_view_payroll`

| | |
|--|--|
| **Definition** | User views Payroll service detail (`/services/payroll`). |
| **Why it matters** | Same as bookkeeping for payroll demand. |
| **Where it occurs** | Service detail mount. |
| **Funnel stage** | Awareness → Consideration |
| **Params (allowed)** | `location=service_detail`, `service=payroll` |

---

### `service_view_tax`

| | |
|--|--|
| **Definition** | User views Tax Services detail (`/services/tax-services`). Event name uses `tax` for reporting clarity. |
| **Why it matters** | Tax-season interest signal. |
| **Where it occurs** | Service detail mount. |
| **Funnel stage** | Awareness → Consideration |
| **Params (allowed)** | `location=service_detail`, `service=tax-services` |

---

### `service_view_advisory`

| | |
|--|--|
| **Definition** | User views Business Advisory detail (`/services/business-advisory`). |
| **Why it matters** | Advisory interest vs. compliance services. |
| **Where it occurs** | Service detail mount. |
| **Funnel stage** | Awareness → Consideration |
| **Params (allowed)** | `location=service_detail`, `service=business-advisory` |

---

## Explicit non-goals (do not track)

- Form field contents (name, email, phone, message)
- File uploads / document metadata (not offered on public form)
- Scroll-depth heatmaps that record page text containing personal notes
- Cross-site advertising audiences / remarketing pixels
- User IDs tied to CRM without a separate lawful basis and disclosure

---

## Enablement checklist

1. Update Privacy Policy (analytics section) — done in template form when flags may be enabled.
2. Set env vars on the host (never commit real IDs).
3. Verify GSC (DNS or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
4. Enable `NEXT_PUBLIC_ANALYTICS_ENABLED=true` with `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
5. Use `NEXT_PUBLIC_ANALYTICS_DEBUG=true` on a preview deploy; confirm events in GA4 DebugView.
6. Mark successful `contact_form_submit` as a conversion.
7. Review monthly: event volume only — no attempt to reconstruct personal inquiries from analytics.

---

## Change log

- **2026-09-12** — Initial measurement plan and env-gated GA4 / GSC integration points.
