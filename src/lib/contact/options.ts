/**
 * Contact form field options — client-safe (no Zod).
 * Keep validation schema in schema.ts (server-only).
 */

export const contactServiceValues = [
  "bookkeeping",
  "payroll",
  "tax-services",
  "business-advisory",
  "general",
] as const;

export type ContactServiceValue = (typeof contactServiceValues)[number];

export const contactServiceLabels: Record<ContactServiceValue, string> = {
  bookkeeping: "Bookkeeping",
  payroll: "Payroll",
  "tax-services": "Tax Services",
  "business-advisory": "Financial Services",
  general: "General inquiry",
};
