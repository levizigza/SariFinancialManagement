# Security — Sari Financial Management website

This document records security and privacy decisions for the public website
(`sarifinancialmanagement.com`), operated in Calgary, Alberta. It is written for
operators and developers, not as legal advice.

## Scope

Public surfaces in this repository, especially the **contact form** on `/contact`.
There are no other public write forms at the time of writing.

## Privacy posture (Alberta / data minimization)

The general contact form collects only what is reasonably necessary to respond to
an inquiry:

| Collected | Required |
|-----------|----------|
| Name | Yes |
| Email | Yes |
| Phone | Optional |
| Service of interest (closed list) | Yes |
| Message | Yes |

The form **must not** request or encourage:

- Social Insurance Number (SIN)
- Banking information
- Tax account credentials or CRA passwords
- Tax documents or financial statements
- Government ID

A notice beside the form states that **sensitive financial documents should only
be transmitted using an approved secure method once the business establishes
one**. Until that channel exists, visitors should describe needs in general terms.

Server-side checks reject messages that appear to contain SINs, banking cues,
CRA credentials, and similar patterns, with a clear user-facing explanation
(no stack traces or internal details).

## Transport (HTTPS)

- Production should be served only over **HTTPS** (host / CDN TLS termination).
- Canonical site URL is configured via `NEXT_PUBLIC_SITE_URL` (https).
- `Strict-Transport-Security` is set in `next.config.ts` for hosts that honor
  Next.js response headers (e.g. Vercel). Confirm HSTS at the edge if using a
  custom proxy.

## Form handling architecture

1. **Next.js Server Action** (`src/app/actions/contact.ts`) — submissions never
   rely on client-only mailto drafts for delivery.
2. **Server-side validation** with Zod (`src/lib/contact/schema.ts`).
3. **Output encoding** for HTML email bodies (`escapeHtml` in
   `src/lib/contact/encode.ts`); header values stripped of CR/LF.
4. **Delivery** via Resend HTTP API when `RESEND_API_KEY` is set
   (`src/lib/contact/send.ts`). Credentials live in environment variables only.
5. **Development without secrets**: if no API key is set and `NODE_ENV` is not
   `production`, the payload is logged server-side so local testing works.
   Production without a key fails closed with a generic error.

## CSRF

Next.js App Router Server Actions include framework CSRF protections (action
IDs / request binding). We add a **same-origin Origin vs Host check** as
defense in depth. Do not expose a cookie-free public POST API for this form
without an explicit CSRF strategy.

## Spam protection

- **Honeypot** field (`website`) hidden from users; non-empty submissions return
  a fake success response.
- **In-memory rate limiting**: 5 submissions per client key
  (`x-forwarded-for` / `x-real-ip`) per 15 minutes
  (`src/lib/contact/rate-limit.ts`).

**Limitation:** On multi-instance serverless, each instance has its own map, so
limits are best-effort. For stricter global limits, introduce a shared store
(e.g. Upstash Redis) without changing the public field set.

Optional future hardening: CAPTCHA / Turnstile behind an env flag if spam volume
warrants it (adds third-party processing — evaluate against minimization goals).

## Errors

User-visible errors are generic or field-level validation messages. Provider
failures, missing configuration, and unexpected exceptions are logged server-side
without echoing internals to the browser.

## Secrets

- Never commit `.env`, API keys, or inbox credentials.
- `.gitignore` ignores `.env*`; `.env.example` is allowed as a template.
- Required / optional variables are documented in `.env.example`.

## Secure headers

Configured in `next.config.ts` for all routes:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, microphone, geolocation, payment disabled)
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security` (long max-age; includeSubDomains; preload)
- `X-DNS-Prefetch-Control: on`
- `poweredByHeader: false`

CSP is not enabled yet (requires careful allowlists for fonts/analytics). Add
when third-party scripts are introduced.

## Analytics (optional, env-gated)

- Google Analytics 4 loads **only** when `NEXT_PUBLIC_ANALYTICS_ENABLED` is true
  **and** `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Account IDs are never hardcoded.
- Events are limited to conversion/engagement names documented in
  `docs/MEASUREMENT_PLAN.md`. Event parameters are sanitized; form field values
  and sensitive financial content must not be sent.
- Google Search Console verification uses
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (or DNS TXT preferred).
- Prefer leaving analytics **disabled** until the Privacy Policy and operator
  review are complete.

## Privacy notice & policy

- Short notice + link to `/privacy` adjacent to form submission.
- Privacy Policy describes minimized contact fields and that sensitive documents
  are not collected through the public form.
- Privacy Policy includes an analytics section describing optional, minimized
  measurement.

## Operator checklist

1. Deploy only behind HTTPS.
2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and a verified `CONTACT_FROM_EMAIL`.
3. Confirm security headers in production responses.
4. Before collecting client tax packages, implement an **approved secure document
   channel** and update the contact notice + Privacy Policy accordingly.
5. Review rate-limit effectiveness after launch; upgrade to shared storage if needed.
6. If enabling analytics: set GA/GSC env vars per `.env.example` and
   `docs/MEASUREMENT_PLAN.md`; keep advertising signals off.

## Change log

- **2026-09-12** — Replaced mailto contact flow with Server Action, validation,
  honeypot, rate limiting, Resend delivery, sensitive-content rejection, privacy
  notices, env-based secrets, and response security headers.
- **2026-09-12** — Added env-gated GA4 / Search Console integration points and
  privacy-conscious conversion events (see MEASUREMENT_PLAN.md).
