/**
 * Insights categories aligned to the four core services.
 * Supports Canadian / Alberta / Calgary educational framing.
 */

export type InsightCategorySlug =
  | "bookkeeping"
  | "payroll"
  | "tax"
  | "business-advisory";

export type InsightCategory = {
  slug: InsightCategorySlug;
  name: string;
  /** Nav / card label */
  shortName: string;
  description: string;
  href: `/resources/${InsightCategorySlug}`;
  serviceHref: string;
  /** Local SEO / editorial focus */
  jurisdictionFocus: readonly ("Canada" | "Alberta" | "Calgary")[];
};

export const insightCategories: readonly InsightCategory[] = [
  {
    slug: "bookkeeping",
    name: "Bookkeeping",
    shortName: "Bookkeeping",
    description:
      "Educational guides on keeping records organized—so Calgary and Alberta business owners can see where money is going.",
    href: "/resources/bookkeeping",
    serviceHref: "/services/bookkeeping",
    jurisdictionFocus: ["Calgary", "Alberta", "Canada"],
  },
  {
    slug: "payroll",
    name: "Payroll",
    shortName: "Payroll",
    description:
      "Plain-language explainers on payroll processes and recordkeeping for small businesses in Alberta.",
    href: "/resources/payroll",
    serviceHref: "/services/payroll",
    jurisdictionFocus: ["Alberta", "Canada", "Calgary"],
  },
  {
    slug: "tax",
    name: "Tax",
    shortName: "Tax",
    description:
      "Educational articles to help you prepare and organize for tax obligations in Canada—not advice for your specific tax filing.",
    href: "/resources/tax",
    serviceHref: "/services/tax-services",
    jurisdictionFocus: ["Canada", "Alberta", "Calgary"],
  },
  {
    slug: "business-advisory",
    name: "Business Advisory",
    shortName: "Advisory",
    description:
      "Guides on understanding financial reports and using numbers for day-to-day decisions—not investment advice.",
    href: "/resources/business-advisory",
    serviceHref: "/services/business-advisory",
    jurisdictionFocus: ["Calgary", "Alberta", "Canada"],
  },
] as const;

export function getInsightCategory(
  slug: string,
): InsightCategory | undefined {
  return insightCategories.find((category) => category.slug === slug);
}
