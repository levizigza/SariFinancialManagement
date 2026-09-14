# Founder portrait assets

Replace the placeholder when an approved professional photo is ready.

## Current

| File | Status |
|------|--------|
| `sari-goitom-tekle.placeholder.svg` | Designed placeholder (monogram + name). Not a photograph. |

## When the real photo arrives

1. Add the approved file here, e.g. `sari-goitom-tekle.jpg` (or `.webp`). Prefer ~1600×2000 (4:5) or similar portrait crop.
2. Confirm web / marketing usage rights.
3. Update `src/content/founder-media.ts`:
   - `src` → the new path
   - `width` / `height` → intrinsic pixels of the file
   - `isPlaceholder` → `false`
4. Optionally mirror the same path on the author record in `src/content/insights/authors.ts` (`portraitSrc`).

Do not invent biography text to accompany the photo—use only client-approved copy.
