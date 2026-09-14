# WCAG 2.2 AA accessibility report — Sari Financial Management

**Date:** 2026-09-12  
**Scope:** Public Next.js website (App Router), gold/navy/ivory brand system  
**Standard:** WCAG 2.2 Level AA

This report lists issues found in the audit and corrections applied in the same pass.

---

## Summary

The site already had a solid baseline (skip link, focus rings, reduced motion, labelled contact form, decorative SVG handling, landmarks). Gaps concentrated in **mobile menu focus management**, **heading hierarchy on `/services`**, **touch target sizing**, **form error announcements**, and **reinforcing gold-on-light contrast rules** (`#CEA15D` / `gold-500` must not be ordinary small text on white/ivory).

---

## Color contrast (gold / navy)

### Findings

| Pairing | Approx. ratio | Status |
|---------|---------------|--------|
| `#CEA15D` (gold-500) on white/ivory as text | ~2.2–2.4:1 | **Fail AA** if used as ordinary text |
| gold-300 on white/ivory as text | ~1.4–1.5:1 | **Fail AA** |
| gold-300 / gold-500 on navy | ~7.8–12:1 | Pass |
| navy text on gold CTA fill | ~7.8:1 | Pass |
| blue-muted on ivory | ~8.6:1+ | Pass |
| Footer copyright at `ivory-50/55` | marginal for small text | Improved |

**Audit note:** Production body/nav copy did **not** use `#CEA15D` as small text on white. Gold on light appeared only as decorative glyphs (stars, arrows) with `aria-hidden`, or as fill behind navy text on CTAs. `Eyebrow` and `BrandPhrase` already switch gold → navy on ivory/white surfaces.

### Corrections

- Documented fail ratios for gold-on-light in `src/styles/tokens.css`
- Added `--text-error` (`#8b1a1a`) for form errors instead of unspecified Tailwind red
- Strengthened `BrandPhrase` comments: never use gold-500 as ordinary small text on light backgrounds
- Raised footer muted text from `/55` → `/70` and body muted `/70` → `/75`
- Nav link default from `ivory-50/90` → full `ivory-50` for clearer contrast
- Placeholders use full `blue-muted` (removed `/80` opacity)

---

## Keyboard navigation & focus visibility

### Findings

- Global `:focus-visible` rings present; navy surfaces use gold-300 ring
- Skip link used `:focus` (good) but sat under mobile menu stacking context
- Mobile dialog: Escape + initial focus on Close existed; **no focus trap**, **no restore focus**, background not inert
- Some inline links relied only on global focus CSS

### Corrections

- Mobile menu: Tab cycle trap, Escape close, restore focus to menu button, `inert` on `#main-content` and `footer`, dialog `z-[110]`
- Skip link `z-index: 120`, min-height 44px, `:focus` and `:focus-visible`
- Explicit focus styles on contact-form phone/email fallback links
- Desktop services chevron and nav links sized to min 44×44 where practical

---

## Heading hierarchy

### Findings

- Home, About, Contact outlines were sound (`h1` → section `h2` → card `h3`)
- `/services` used a visually hidden `h2` (“Our services”) **and** service card titles as peer `h2`s

### Corrections

- Services grid on `/services` now uses `headingLevel="h3"` under the section `h2`

---

## Forms, labels, validation, announcements

### Findings

- Contact form: visible labels, `aria-invalid`, `aria-describedby` — good
- Status used `role="status"` for both success and errors (errors should be assertive)
- Field errors were not summarized for screen readers at form level

### Corrections

- Error banner with `role="alert"` at top of form for failed submissions / validation
- Success remains `role="status"` + `aria-live="polite"`
- Field error text uses `text-text-error`
- Honeypot remains out of tab order and `aria-hidden`

---

## Landmarks & navigation

### Findings

- `header`, `main#main-content`, `footer`, labelled `nav`s present
- Footer column groups were plain `div`s (not navigational landmarks)
- Skip link → `#main-content` present in root layout

### Corrections

- Footer Explore / Services / Legal groups wrapped in `<nav aria-labelledby="…">`
- Mobile menu `aria-haspopup="dialog"` on open control

---

## Mobile menu

### Findings / corrections

Covered under keyboard: focus trap, inert background, focus restore, stacking above page chrome, 44px controls, labelled dialog.

---

## Link purpose & button names

### Findings

- Service “Learn more” already had `sr-only` purpose (“about {service}”)
- Compact mobile CTA showed “Book” only — incomplete accessible name without extra labelling

### Corrections

- Mobile CTA `aria-label={site.cta.label}` (“Book a Consultation”)
- Contact / footer / breadcrumb links given clearer hit areas (see touch targets)

---

## Images & decorative content

### Findings

- No production `<img>` / `next/image` yet
- Founder portrait is a labelled placeholder `figure` / `figcaption`
- Curves, icons, stars, arrows: `aria-hidden` / `focusable="false"` pattern already in place

### Corrections

- No functional image alt gaps to fix; report documents required alt strategy when portrait ships (meaningful alt with full name)

---

## Reduced motion

### Findings

- Global `prefers-reduced-motion` already collapses transitions/animations
- More Than Numbers section had dedicated overrides

### Corrections

- FAQ disclosure chevron uses `motion-safe:transition-transform` so reduced-motion users skip the spin

---

## Text zoom to 200%

### Findings

- Type and spacing largely rem-based (scales with browser text zoom)
- Risk of horizontal overflow / clipped sticky chrome at extreme zoom

### Corrections

- `text-size-adjust: 100%` on `html`
- `overflow-x: clip` on `body` to reduce layout blowout without trapping focus
- Control heights use rem (`min-h-11` / `h-11`) so they grow with zoom

**Residual:** Sticky header + long brand name may wrap tightly at 200% on very narrow viewports — acceptable; verify visually at QA.

---

## Touch target sizing (WCAG 2.2 · 2.5.8)

### Findings

- Button `sm` was 36px tall (`h-9`)
- Contact bar links were dense (`text-xs`, thin padding)
- Footer / breadcrumb links had small hit areas
- Desktop services submenu chevron was ~36×40

### Corrections

- All button sizes ≥ 44px min height
- Contact bar, footer, breadcrumbs, header phone, service “Learn more”: `min-h-11`
- Nav links and chevrons aligned to 44px

---

## Screen-reader announcements

### Corrections

- Form errors: `role="alert"`
- Form success: polite live status
- Star ratings already expose `aria-label="Rated N out of 5"` with decorative stars hidden
- External-link “(opens in a new tab)” patterns retained where present

---

## Skip-to-content

### Findings / corrections

Present and functional; contrast on skip control is navy on gold-300 (strong). Height and z-index improved so it remains usable ahead of chrome / dialogs.

---

## Remaining / residual risks (not blocking this pass)

1. **Rate-limit / serverless focus:** N/A to a11y.
2. **Shared CAPTCHA:** Not added (privacy/minimization); if added later, must be keyboard- and AT-accessible.
3. **Desktop Services disclosure:** No arrow-key menubar pattern (button + links is acceptable); optional enhancement.
4. **CSP / third-party fonts:** Font loading failures could affect metrics; fallback stacks exist.
5. **Automated axe/Lighthouse:** Recommend running in CI or pre-launch browser pass to catch regressions.
6. **Real portrait:** When added, supply descriptive `alt` (not empty) unless purely decorative.

---

## Files touched

- `src/components/layout/main-nav.tsx`
- `src/components/layout/contact-bar.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/breadcrumbs.tsx`
- `src/components/sections/contact-form.tsx`
- `src/components/sections/faq-accordion.tsx`
- `src/components/sections/service-card.tsx`
- `src/components/sections/services-grid.tsx`
- `src/components/brand/brand-phrase.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/field.tsx`
- `src/app/services/page.tsx`
- `src/app/globals.css`
- `src/styles/tokens.css`
- `docs/A11Y_WCAG_REPORT.md` (this file)

---

## Operator QA checklist

- [ ] Keyboard-only: Tab through header, open/close mobile menu, trap holds, Escape restores focus
- [ ] Skip link jumps to `#main-content` and is visible on focus
- [ ] Contact form: submit empty → alert announced; success announces politely
- [ ] Zoom browser text to 200%: no loss of content/controls on home, services, contact
- [ ] Confirm no new `text-gold-500` / `#CEA15D` body text on ivory or white
