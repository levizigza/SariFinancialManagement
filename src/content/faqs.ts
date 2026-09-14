/**
 * Site FAQ content — plain-text answers for users, search, and answer engines.
 *
 * Rules:
 * - Do not invent pricing, remote-work policy details, industries, or credentials.
 * - Items with `needsClientConfirmation: true` use honest, non-committal copy and
 *   include an internal `clientTodo` for the team. Refine when the client confirms.
 * - JSON-LD (`schemaEligible`) only for visible, accurate answers — never for
 *   placeholder or speculative content.
 *
 * Google note (2026): FAQ rich results are no longer shown in Google Search.
 * FAQPage Schema.org markup may still help other crawlers/AI systems understand
 * the page when it matches visible content. We emit it only for schema-eligible items.
 */

import { site } from "@/lib/site";

export type FaqItem = {
  id: string;
  question: string;
  /**
   * Plain-text answer (also used for FAQPage JSON-LD `acceptedAnswer.text`).
   * Keep the first sentence a direct answer when possible.
   */
  answer: string;
  /** Show in homepage FAQ preview */
  homepagePreview?: boolean;
  /**
   * True when specifics still need client confirmation.
   * Answer text must remain honest — no fabricated policy.
   */
  needsClientConfirmation?: boolean;
  /** Internal note for the content team (not rendered on the site) */
  clientTodo?: string;
  /**
   * Include in FAQPage JSON-LD when true.
   * Must match visible page content and be accurate enough to stand alone.
   */
  schemaEligible: boolean;
};

export const faqs: readonly FaqItem[] = [
  {
    id: "services",
    question: "What services does Sari Financial Management provide?",
    answer: `${site.name} provides bookkeeping, payroll, tax services, and business advisory support. Tax services include preparation support for T1 personal returns, T2 corporate returns, and T4 employer slips, plus related Canadian and Alberta filings confirmed in consultation. Business advisory focuses on operational and financial clarity—not investment or securities advice.`,
    homepagePreview: true,
    schemaEligible: true,
  },
  {
    id: "who-you-work-with",
    question: "Who will I work with?",
    answer: `You will work with ${site.founder}, ${site.founderTitle} at ${site.name}. Client work is founder-led—scope is confirmed together during consultation.`,
    homepagePreview: true,
    schemaEligible: true,
  },
  {
    id: "who",
    question: "Who does Sari Financial Management work with?",
    answer: `${site.name} works with individuals and business owners who want clearer, more organized financial information. That includes clients who need help with books, payroll, tax preparation, or practical guidance to understand their numbers for day-to-day decisions.`,
    homepagePreview: false,
    schemaEligible: false,
    // TODO(client): confirm preferred audience wording (e.g. specific entity types or industries) if desired
    needsClientConfirmation: true,
    clientTodo:
      "Confirm whether to name specific client types, industries, or entity sizes on the FAQ.",
  },
  {
    id: "calgary",
    question: "Do you work with clients in Calgary?",
    answer: `Yes. ${site.name} is based in ${site.location} and works with clients in the Calgary area.`,
    homepagePreview: true,
    schemaEligible: true,
  },
  {
    id: "tax-forms",
    question: "Which tax forms do you prepare?",
    answer:
      "Tax services include T1 personal income tax returns, T2 corporate income tax returns, and T4 employer slips. Related filings that often go with that work—such as Alberta AT1 corporate returns, T2125 for self-employed income on a T1, T4A slips, GST/HST returns, and T5 slips when applicable—are confirmed during your consultation based on your situation.",
    homepagePreview: false,
    schemaEligible: true,
  },
  {
    id: "multiple-services",
    question: "Can I use more than one service?",
    answer:
      "Yes. Many clients combine services—for example bookkeeping with tax services, or payroll with bookkeeping. During your consultation, we identify which services fit your situation and agree on a clear scope before work begins.",
    homepagePreview: true,
    schemaEligible: true,
  },
  {
    id: "prepare",
    question: "What should I prepare before an initial consultation?",
    answer:
      "A short overview of what you need help with is enough to start. If you have them, recent bank statements, bookkeeping exports, payroll details, or notes about upcoming deadlines are useful—but you do not need a perfect file set to book a conversation.",
    homepagePreview: true,
    schemaEligible: true,
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: `Book a consultation through the contact page, call ${site.phoneDisplay}, or email ${site.email}. We will discuss your needs, clarify priorities, and outline a support plan before any work begins.`,
    homepagePreview: true,
    schemaEligible: true,
  },
  {
    id: "pricing",
    question: "How is pricing determined?",
    answer:
      "Pricing depends on the services required and the scope of work. Specific fees are discussed during the consultation and confirmed before engagement begins. Published rate cards are not listed on this website.",
    homepagePreview: false,
    schemaEligible: false,
    needsClientConfirmation: true,
    clientTodo:
      "Confirm pricing model (hourly, package, retainer), whether any starting ranges may be published, and preferred FAQ wording.",
  },
  {
    id: "remote",
    question: "Can services be provided remotely?",
    answer: `${site.name} is based in ${site.location}. Whether a particular engagement can be supported remotely depends on the services involved and your situation. Ask during your consultation so we can confirm what is possible for your needs.`,
    homepagePreview: false,
    schemaEligible: false,
    needsClientConfirmation: true,
    clientTodo:
      "Confirm remote / hybrid / in-person policy by service (bookkeeping, payroll, tax, advisory).",
  },
];

/** Additional verified FAQ items (disclaimers) — shown on the FAQ page only */
export const faqDisclaimers: readonly FaqItem[] = [
  {
    id: "cpa",
    question: "Is Sari Financial Management a CPA firm?",
    answer: `This website does not describe ${site.name} as a CPA firm. If you need a service that requires a specific professional designation, ask during your consultation so scope can be clarified.`,
    schemaEligible: true,
  },
  {
    id: "investment",
    question: "Do you provide investment advice?",
    answer:
      "No. Business advisory support focuses on operational and financial clarity—understanding books, cash flow, and reporting. It is not investment or securities advice.",
    schemaEligible: true,
  },
];

export function getHomepageFaqs(limit = 6): FaqItem[] {
  return faqs.filter((item) => item.homepagePreview).slice(0, limit);
}

export function getAllFaqPageItems(): FaqItem[] {
  return [...faqs, ...faqDisclaimers];
}

export function getSchemaFaqs(items: readonly FaqItem[] = getAllFaqPageItems()): FaqItem[] {
  return items.filter(
    (item) =>
      item.schemaEligible &&
      !item.needsClientConfirmation &&
      item.answer.trim().length > 0,
  );
}

/**
 * FAQPage JSON-LD for visible, schema-eligible Q&As only.
 * Google no longer displays FAQ rich results (as of May 2026); markup remains
 * optional Schema.org for other consumers when it mirrors on-page content.
 */
export function buildFaqPageJsonLd(
  items: readonly FaqItem[] = getSchemaFaqs(),
  pageUrl?: string,
) {
  const eligible = getSchemaFaqs(items);
  if (eligible.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { url: pageUrl } : {}),
    mainEntity: eligible.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
