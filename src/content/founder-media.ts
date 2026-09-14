/**
 * Founder media assets — swap the portrait path when an approved photo is ready.
 * Do not invent biography, credentials, or experience claims elsewhere.
 */

export const founderPortrait = {
  /**
   * Placeholder SVG until an approved professional photo is provided.
   * Replace with e.g. `/images/founder/sari-goitom-tekle.jpg` (or `.webp`)
   * and set `isPlaceholder: false`. Match `width` / `height` to the file.
   */
  src: "/images/founder/sari-goitom-tekle.placeholder.svg",
  width: 800,
  height: 1000,
  /** True while using the designed placeholder — not a real photograph */
  isPlaceholder: true,
} as const;

export type FounderPortraitSize = "hero" | "feature" | "aside" | "avatar";

/** Responsive `sizes` hints for next/image (CLS-safe with width/height). */
export const founderPortraitSizes: Record<FounderPortraitSize, string> = {
  hero: "(max-width: 768px) 92vw, (max-width: 1200px) 42vw, 32rem",
  feature: "(max-width: 640px) 88vw, (max-width: 1024px) 42vw, 28rem",
  aside: "(max-width: 640px) 10rem, 12rem",
  avatar: "3.5rem",
};
