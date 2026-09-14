import {
  Cormorant_Garamond,
  Great_Vibes,
  Source_Sans_3,
} from "next/font/google";

/**
 * Font loading strategy (Core Web Vitals):
 * - Preload only fonts needed for first paint (sans + display).
 * - Script font is below-fold / decorative — do not preload sitewide.
 * - Weights trimmed to what the UI actually uses (avoids extra @font-face CSS).
 * - display: "swap" + next/font size-adjust fallbacks for CLS.
 */

/** Elegant serif for major headings — semibold only */
export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Highly legible sans for body and UI */
export const fontSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/**
 * Script for short decorative phrases only (e.g. “More Than Numbers”).
 * preload: false — must not compete with LCP fonts on every route.
 */
export const fontScript = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});
