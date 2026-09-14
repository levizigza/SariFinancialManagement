/**
 * =============================================================================
 * DEVELOPER NOTE — NEVER INSERT FAKE SOCIAL PROOF
 * =============================================================================
 *
 * Fake testimonials, invented star ratings, fabricated client names, or borrowed
 * quotes from other businesses are unethical and can be illegal under Canadian
 * advertising / competition rules. They also destroy trust when discovered.
 *
 * Rules for this module:
 * 1. Only add entries that the client has approved in writing.
 * 2. Prefer primary sources (Google review URL, email permission, signed quote).
 * 3. Keep `published: false` until legal/brand approval is confirmed.
 * 4. Never invent names, businesses, ratings, or review counts for “design polish”.
 * 5. If this array is empty, the UI must hide reviews OR show non-claim trust copy—
 *    never placeholder quotes that look real.
 *
 * Future Google reviews: map API/manual exports into `Testimonial` with
 * `source: "google"` and the review’s public URL in `sourceUrl`.
 * =============================================================================
 */

export type TestimonialSource =
  | "google"
  | "manual"
  | "email"
  | "letter"
  | "other";

export type Testimonial = {
  /** Stable id for React keys and future CMS sync */
  id: string;
  /** Reviewer display name (as approved) */
  name: string;
  /** Business name and/or role, e.g. "Owner, Example Co." */
  businessOrRole?: string;
  /** Verbatim or approved paraphrase of the testimonial */
  quote: string;
  /**
   * Star rating 1–5 when the source provides one (e.g. Google).
   * Omit when the quote was not rated.
   */
  rating?: 1 | 2 | 3 | 4 | 5;
  source: TestimonialSource;
  /** Public URL to the original review when available */
  sourceUrl?: string;
  /** ISO date string when the review was given, if known */
  datePublished?: string;
  /**
   * Must be true to render on the site.
   * Default new entries to false until client approval.
   */
  published: boolean;
};

/**
 * Approved testimonials only.
 * Leave empty until real, permissioned reviews exist.
 */
export const testimonials: readonly Testimonial[] = [
  // Example shape (DO NOT UNCOMMENT WITH FAKE DATA):
  // {
  //   id: "google-2026-001",
  //   name: "Jane Doe",
  //   businessOrRole: "Owner, Example Ltd.",
  //   quote: "…",
  //   rating: 5,
  //   source: "google",
  //   sourceUrl: "https://maps.google.com/…",
  //   datePublished: "2026-01-15",
  //   published: true,
  // },
];

/** Testimonials allowed to appear in production UI */
export function getPublishedTestimonials(
  items: readonly Testimonial[] = testimonials,
): Testimonial[] {
  return items.filter((item) => item.published && item.quote.trim().length > 0);
}

export function hasPublishedTestimonials(
  items: readonly Testimonial[] = testimonials,
): boolean {
  return getPublishedTestimonials(items).length > 0;
}

/**
 * Build JSON-LD Review nodes for legitimate published testimonials.
 * Returns null when there is nothing valid to emit (avoids empty/fake schema).
 */
export function buildTestimonialsJsonLd(
  items: readonly Testimonial[] = testimonials,
  options: {
    businessName: string;
    businessUrl: string;
  },
) {
  const published = getPublishedTestimonials(items);
  if (published.length === 0) return null;

  const reviews = published.map((item) => {
    const review: Record<string, unknown> = {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: item.name,
      },
      reviewBody: item.quote,
      itemReviewed: {
        "@type": "LocalBusiness",
        name: options.businessName,
        url: options.businessUrl,
      },
    };

    if (item.datePublished) {
      review.datePublished = item.datePublished;
    }

    if (item.rating) {
      review.reviewRating = {
        "@type": "Rating",
        ratingValue: item.rating,
        bestRating: 5,
        worstRating: 1,
      };
    }

    if (item.sourceUrl) {
      review.url = item.sourceUrl;
    }

    return review;
  });

  const rated = published.filter((item) => typeof item.rating === "number");
  const graph: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": reviews,
  };

  // AggregateRating only when we have real numeric ratings — never invent averages.
  if (rated.length > 0) {
    const sum = rated.reduce((acc, item) => acc + (item.rating ?? 0), 0);
    graph["@graph"] = [
      {
        "@type": "LocalBusiness",
        name: options.businessName,
        url: options.businessUrl,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: Number((sum / rated.length).toFixed(1)),
          reviewCount: rated.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews,
      },
    ];
  }

  return graph;
}
