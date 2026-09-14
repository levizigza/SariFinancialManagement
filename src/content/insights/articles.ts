/**
 * Insights / Resources articles and editorial pipeline.
 *
 * PUBLISHING RULES:
 * - Do not set status to "published" until content is written AND, when required,
 *   professionally reviewed (tax / legal / investment-sensitive topics).
 * - Planned topics may appear on hub/category pages as questions we intend to
 *   answer—never as fabricated article bodies or advice.
 * - Educational content should cite official sources (e.g. CRA, Alberta) where relevant.
 *
 * @see docs/INSIGHTS_EDITORIAL.md
 */

import type { InsightCategorySlug } from "@/content/insights/categories";

export type ArticleStatus = "planned" | "draft" | "in-review" | "published";

export type ReviewDomain = "tax" | "legal" | "investment" | "payroll" | "general";

export type InsightArticle = {
  slug: string;
  category: InsightCategorySlug;
  /** Working / public title */
  title: string;
  /** Short summary for cards and meta when published */
  description: string;
  /** Client question this article should answer */
  clientQuestion: string;
  status: ArticleStatus;
  /** ISO date when published; required for published */
  publishedAt?: string;
  updatedAt?: string;
  /** Author id from authors.ts */
  writtenBy: string;
  /** Reviewer author ids — use for sensitive topics */
  reviewedBy: readonly string[];
  /**
   * If true, do not publish until a qualified review is recorded.
   * Tax, legal, and investment-adjacent pieces should stay true.
   */
  requiresProfessionalReview: boolean;
  reviewDomains: readonly ReviewDomain[];
  jurisdiction: readonly ("CA" | "AB" | "Calgary")[];
  /** Tags for filtering / related links */
  tags: readonly string[];
  /**
   * Article body — only for draft/published.
   * Prefer MDX files later; structured blocks keep the architecture flexible.
   */
  body?: readonly InsightBlock[];
  /** Related service path */
  relatedServiceHref: string;
};

export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: readonly string[] }
  | { type: "callout"; variant: "note" | "disclaimer"; text: string }
  | { type: "externalLink"; label: string; href: string; note?: string };

/**
 * Editorial backlog + future articles.
 * All start as "planned" — no advice bodies until written and reviewed.
 */
export const insightArticles: readonly InsightArticle[] = [
  {
    slug: "records-calgary-small-business-should-keep",
    category: "bookkeeping",
    title: "What records should a Calgary small business keep?",
    description:
      "A practical overview of the financial records small businesses in Calgary typically organize—and why they matter.",
    clientQuestion: "What records should a Calgary small business keep?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: true,
    reviewDomains: ["general", "tax"],
    jurisdiction: ["Calgary", "AB", "CA"],
    tags: ["records", "small-business", "calgary"],
    relatedServiceHref: "/services/bookkeeping",
  },
  {
    slug: "when-to-hire-a-bookkeeper",
    category: "bookkeeping",
    title: "When should a small business hire a bookkeeper?",
    description:
      "Signs that day-to-day bookkeeping may need ongoing help—without one-size-fits-all rules.",
    clientQuestion: "When should a small business hire a bookkeeper?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: false,
    reviewDomains: ["general"],
    jurisdiction: ["Calgary", "AB", "CA"],
    tags: ["bookkeeper", "small-business", "growing"],
    relatedServiceHref: "/services/bookkeeping",
  },
  {
    slug: "bookkeeping-vs-accounting",
    category: "bookkeeping",
    title: "What is the difference between bookkeeping and accounting?",
    description:
      "Plain-language differences between day-to-day bookkeeping and broader accounting work.",
    clientQuestion: "What is the difference between bookkeeping and accounting?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: false,
    reviewDomains: ["general"],
    jurisdiction: ["CA"],
    tags: ["bookkeeping", "accounting", "basics"],
    relatedServiceHref: "/services/bookkeeping",
  },
  {
    slug: "prepare-before-year-end",
    category: "tax",
    title: "What should a business owner prepare before year-end?",
    description:
      "A preparation checklist mindset for year-end—educational, not advice for your specific tax filing.",
    clientQuestion: "What should a business owner prepare before year-end?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: true,
    reviewDomains: ["tax", "general"],
    jurisdiction: ["CA", "AB", "Calgary"],
    tags: ["year-end", "preparation", "tax"],
    relatedServiceHref: "/services/tax-services",
  },
  {
    slug: "payroll-small-business-alberta",
    category: "payroll",
    title: "How does payroll work for a small business in Alberta?",
    description:
      "An educational walkthrough of how payroll typically fits into a small Alberta business—confirm details with current rules and your advisor.",
    clientQuestion: "How does payroll work for a small business in Alberta?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: true,
    reviewDomains: ["payroll", "legal", "tax"],
    jurisdiction: ["AB", "CA"],
    tags: ["payroll", "alberta", "small-business"],
    relatedServiceHref: "/services/payroll",
  },
  {
    slug: "financial-reports-owners-should-understand",
    category: "business-advisory",
    title: "What financial reports should a small business owner understand?",
    description:
      "Core reports that help owners understand position and performance—educational, not investment advice.",
    clientQuestion:
      "What financial reports should a small business owner understand?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: false,
    reviewDomains: ["general"],
    jurisdiction: ["CA", "Calgary"],
    tags: ["reports", "cash-flow", "advisory"],
    relatedServiceHref: "/services/business-advisory",
  },
  {
    slug: "bookkeeping-and-cash-flow-decisions",
    category: "bookkeeping",
    title: "How can better bookkeeping improve cash-flow decisions?",
    description:
      "How current, organized books support clearer cash-flow conversations and operating choices.",
    clientQuestion: "How can better bookkeeping improve cash-flow decisions?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: false,
    reviewDomains: ["general"],
    jurisdiction: ["Calgary", "CA"],
    tags: ["cash-flow", "bookkeeping", "decisions"],
    relatedServiceHref: "/services/bookkeeping",
  },
  {
    slug: "new-calgary-business-first-year-finances",
    category: "business-advisory",
    title: "What should a new Calgary business organize financially in its first year?",
    description:
      "A first-year financial organization roadmap for new Calgary businesses—starting points, not legal or tax advice.",
    clientQuestion:
      "What should a new Calgary business organize financially in its first year?",
    status: "planned",
    writtenBy: "sari-goitom-tekle",
    reviewedBy: [],
    requiresProfessionalReview: true,
    reviewDomains: ["tax", "legal", "general"],
    jurisdiction: ["Calgary", "AB", "CA"],
    tags: ["startup", "calgary", "first-year"],
    relatedServiceHref: "/services/business-advisory",
  },
];

export function getPublishedArticles(
  articles: readonly InsightArticle[] = insightArticles,
): InsightArticle[] {
  return articles.filter(
    (article) =>
      article.status === "published" &&
      Boolean(article.publishedAt) &&
      (!article.requiresProfessionalReview || article.reviewedBy.length > 0),
  );
}

export function getArticlesByCategory(
  category: InsightCategorySlug,
  options?: { includePlanned?: boolean },
): InsightArticle[] {
  return insightArticles.filter((article) => {
    if (article.category !== category) return false;
    if (article.status === "published") return true;
    if (options?.includePlanned && article.status === "planned") return true;
    if (article.status === "draft" || article.status === "in-review") {
      return process.env.NODE_ENV === "development";
    }
    return false;
  });
}

export function getArticle(
  category: string,
  slug: string,
): InsightArticle | undefined {
  return insightArticles.find(
    (article) => article.category === category && article.slug === slug,
  );
}

export function canPublishPublicly(article: InsightArticle): boolean {
  if (article.status !== "published" || !article.publishedAt) return false;
  if (article.requiresProfessionalReview && article.reviewedBy.length === 0) {
    return false;
  }
  return true;
}

export function getPlannedTopics(
  category?: InsightCategorySlug,
): InsightArticle[] {
  return insightArticles.filter(
    (article) =>
      article.status === "planned" &&
      (!category || article.category === category),
  );
}
