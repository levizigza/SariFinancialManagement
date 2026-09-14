/**
 * Verified brand facts only — do not invent credentials, awards, or counts.
 */

import {
  getServiceContent,
  getServicesInJourneyOrder,
  serviceContent,
  type ServiceContent,
} from "@/content/services";

export const site = {
  name: "Sari Financial Management",
  founder: "Sari Goitom Tekle",
  founderTitle: "Founder & Financial Advisor",
  location: "Calgary, Alberta",
  phoneDisplay: "825-935-3739",
  phoneHref: "tel:+18259353739",
  email: "sari.financialmanagement@gmail.com",
  emailHref: "mailto:sari.financialmanagement@gmail.com",
  domain: "sarifinancialmanagement.com",
  brandPhrase: "More Than Numbers",
  values: ["Clarity", "Trust", "Confidence"] as const,
  supporting: {
    organized: "Organized Books → Smarter Decisions → Stronger Business",
    future: "Let’s Build a Brighter Financial Future Together",
    /** Optional progression — not a package requirement */
    journey:
      "From organizing your books to clearer planning—start where you need support.",
  },
  cta: {
    label: "Book a Consultation",
    href: "/contact",
  },
} as const;

export type {
  ServiceContent,
  ServiceFaq,
  ServiceJourneyKey,
  ServiceJourneyStage,
  ServiceProcessStep,
  ServiceSlug,
} from "@/content/services";

export type Service = Pick<
  ServiceContent,
  | "slug"
  | "name"
  | "href"
  | "journey"
  | "bestFor"
  | "what"
  | "problem"
  | "outcome"
  | "summary"
  | "description"
  | "includes"
>;

export const services: readonly Service[] = getServicesInJourneyOrder().map(
  (service) => ({
    slug: service.slug,
    name: service.name,
    href: service.href,
    journey: service.journey,
    bestFor: service.bestFor,
    what: service.what,
    problem: service.problem,
    outcome: service.outcome,
    summary: service.summary,
    description: service.description,
    includes: service.includes,
  }),
);

export function getService(slug: string): Service | undefined {
  const full = getServiceContent(slug);
  if (!full) return undefined;
  return {
    slug: full.slug,
    name: full.name,
    href: full.href,
    journey: full.journey,
    bestFor: full.bestFor,
    what: full.what,
    problem: full.problem,
    outcome: full.outcome,
    summary: full.summary,
    description: full.description,
    includes: full.includes,
  };
}

export { getServiceContent, getServicesInJourneyOrder, serviceContent };

export type NavChild = {
  label: string;
  href: string;
  /** Journey stage label for subtle nav context — official name stays in `label` */
  journeyLabel?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavChild[];
};

export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.name,
      href: service.href,
      journeyLabel: service.journey.label,
    })),
  },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Resources", href: "/resources" },
    { label: "FAQ", href: "/faq" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],
  services: services.map((service) => ({
    label: service.name,
    href: service.href,
    journeyLabel: service.journey.label,
  })),
  legal: [{ label: "Privacy Policy", href: "/privacy" }],
} as const;
