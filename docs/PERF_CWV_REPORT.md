# Performance & Core Web Vitals report — Sari Financial Management

**Date:** 2026-09-12  
**Targets:** LCP ≤ 2.5s · INP &lt; 200ms · CLS &lt; 0.1  
**Principle:** Optimize real-user experience; do not sacrifice accessibility or visual quality for synthetic scores.

Field Lighthouse/CrUX numbers require a production HTTPS host. This report uses **local production build tooling** for before/after asset metrics and documents architectural CWV decisions.

---

## Executive summary

| Area | Before | After | CWV impact |
|------|--------|-------|------------|
| Largest JS chunk | **399 KB** (Zod pulled into contact client) | **229 KB** (framework max; contact Zod removed from client) | **INP** on `/contact` |
| Contact-related client JS | ~399 KB chunk | ~27–37 KB app chunks (+ shared framework) | **INP** |
| CSS bundle | **60.6 KB** | **56.1 KB** (−7%) | LCP / parse |
| Font preloads (home HTML) | **3** woff2 (incl. Great Vibes) | **2** woff2 (sans + display only) | **LCP** |
| Raster images | None | Still none; pipeline ready (AVIF/WebP) | Future LCP/CLS |
| Third-party scripts | None | None | Good |
| Routes | Static SSG | Static SSG (unchanged) | TTFB / LCP |

---

## Before / after (build tooling)

Measured from `.next/static` after `next build` (Turbopack).

### JavaScript

| Metric | Before | After |
|--------|--------|-------|
| Largest chunk | 399,317 bytes | 228,922 bytes |
| Contact Zod in client | Yes (via schema import) | **No** (options module only) |

### CSS

| Metric | Before | After |
|--------|--------|-------|
| Main CSS chunk | 60,598 bytes | 56,142 bytes |

### Fonts

| Metric | Before | After |
|--------|--------|-------|
| Preloaded on homepage | Cormorant + Source Sans + **Great Vibes** | Cormorant + Source Sans only |
| Display weights | 500, 600, 700 | **600** only |
| Sans weights | 400, 500, 600, 700 | **400, 500, 600** |
| Script font | `preload: true` (sitewide) | `preload: false` |

Great Vibes still ships for pages that use `BrandPhrase`, but it no longer competes with the LCP font download on first paint.

### Media on disk

| Metric | After |
|--------|-------|
| `static/media` files | 19 |
| Total media bytes | ~371 KB (fonts + favicon) |

---

## Audit findings & corrections

### Images / responsive / lazy / modern formats

**Finding:** No production `<img>` / `next/image` yet. LCP is **text + font** (hero H1). Portrait is a reserved `aspect-[4/5]` slot (good for CLS).

**Corrections:**
- `next.config.ts` → `images.formats: ["image/avif", "image/webp"]`, sensible `deviceSizes` / `imageSizes`, cache TTL
- `OptimizedImage` wrapper: requires `alt`, `priority` only for true LCP images, default `loading="lazy"` otherwise, `decoding="async"`, `sizes` for fill layouts
- `FounderPortraitSlot` accepts optional `src` + intrinsic `width`/`height`; **never** `priority` (below-fold today)
- Decorative SVGs given explicit `width`/`height` + aspect boxes (`GoldCurve`, service icons, MTN connector)

**Rule when a hero photo ships:** use `priority` (never lazy-load the LCP image); keep dimensions / aspect reserved.

### Font loading

**Finding:** Unused weights + sitewide Great Vibes preload competed with LCP fonts.

**Corrections:** trim weights; `preload: false` on script font; keep `display: "swap"` + `adjustFontFallback: true` for CLS.

### JS bundle / unused dependencies

**Finding:** Contact form imported Zod schema on the client (~390 KB chunk). Dependencies otherwise lean (`clsx`, `tailwind-merge`, `zod` server-side).

**Corrections:**
- Split `src/lib/contact/options.ts` (client-safe) from `schema.ts` (Zod, server)
- `experimental.optimizePackageImports` for `clsx` / `tailwind-merge`
- Removed unused homepage `BrandPhrase` import
- Deleted unused create-next-app SVGs under `public/`

### CSS / animations

**Finding:** Infinite MTN drift ran even off-screen; below-fold paint work not deferred.

**Corrections:**
- `MotionInView` + `animation-play-state` so drift runs only near viewport
- `content-visibility: auto` on below-fold homepage bands
- Button transitions no longer list unused `transform`
- Reduced-motion paths unchanged (a11y preserved)

### Layout shift (CLS)

**Finding:** Font swap, sticky header + wrapping contact bar, SVGs without intrinsic size.

**Corrections:** contact bar `min-h-11`; curve accents `aspect-[320/100]`; font fallbacks; reserved portrait aspect.

### Third-party scripts

**Finding / status:** None (no analytics/chat). Prefer delaying any future tags until after interaction / idle.

### Caching / preloading

**Corrections:** security headers retained; favicon SWR cache; immutable cache hints for `.svg` / `.woff2`; DNS prefetch on; fonts preloaded only when needed for LCP.

### Route-level code splitting / SSR

**Status:** All public routes remain **static** (`○` / `●` SSG). Server Action on contact does not dynamize pages. App client islands: `MainNav` (layout) + `ContactForm` (contact) + small `MotionInView` (home MTN).

### Accessibility note

No contrast regressions, no removal of focus styles, skip link, or reduced-motion support. Performance changes were constrained to loading, paint, and JS scope.

---

## Mapping to CWV targets

| Metric | Primary levers applied | Expected effect |
|--------|------------------------|-----------------|
| **LCP ≤ 2.5s** | Fewer font preloads; fewer font weights; static HTML; no third-party; LCP remains text (fast) | Strong for text LCP; when photo added, use `priority` + AVIF/WebP |
| **INP &lt; 200ms** | Zod off client; lighter contact JS; pause offscreen animation; lean nav handlers | Large win on `/contact`; home interaction stays nav/menu-bound |
| **CLS &lt; 0.1** | Aspect ratios, SVG dimensions, header min-height, font fallbacks | Low CLS risk; verify after portrait + production fonts |

---

## Operator checklist (production)

1. Deploy on HTTPS CDN (Vercel or equivalent) — confirm `/_next/static/*` long-cache.
2. Run Lighthouse / PageSpeed on `/` and `/contact` (mobile + desktop); record LCP element.
3. When adding founder photo: export AVIF/WebP + JPEG fallback; pass `src`/`width`/`height`; keep aspect `4/5`; lazy (not priority) while below fold.
4. If a true hero image becomes LCP: `priority`, correct `sizes`, never lazy-load it.
5. Avoid injecting sync third-party scripts in `<head>`.

---

## Files touched

- `src/lib/fonts.ts`
- `src/lib/contact/options.ts` (new)
- `src/lib/contact/schema.ts`
- `src/components/sections/contact-form.tsx`
- `src/components/sections/more-than-numbers.tsx`
- `src/components/sections/founder-portrait-slot.tsx`
- `src/components/ui/optimized-image.tsx` (new)
- `src/components/ui/motion-in-view.tsx` (new)
- `src/components/ui/button.tsx`
- `src/components/brand/gold-curve.tsx`
- `src/components/brand/service-icon.tsx`
- `src/components/layout/contact-bar.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `next.config.ts`
- `public/*.svg` (removed unused)
- `docs/PERF_CWV_REPORT.md` (this file)
