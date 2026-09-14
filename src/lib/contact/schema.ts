import { z } from "zod";
import { contactServiceValues } from "@/lib/contact/options";

export {
  contactServiceLabels,
  contactServiceValues,
  type ContactServiceValue,
} from "@/lib/contact/options";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(254, "Email is too long."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  service: z.enum(contactServiceValues, {
    message: "Please select a service of interest.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please include a short message (at least 10 characters).")
    .max(4000, "Message is too long."),
  /** Honeypot — must be empty. */
  website: z.string().max(0).optional().default(""),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Detect common sensitive patterns. We reject these on the public form
 * (data minimization / Alberta privacy-conscious practice).
 */
export function looksLikeSensitiveContent(text: string): boolean {
  const patterns = [
    /\b\d{3}[-\s]?\d{3}[-\s]?\d{3}\b/, // SIN-like
    /\bSIN\b/i,
    /\bsocial insurance\b/i,
    /\b\d{16}\b/, // card-like digit run
    /\btransit\s*(number|#|no\.?)?\s*[:#]?\s*\d/i,
    /\binstitution\s*(number|#|no\.?)?\s*[:#]?\s*\d/i,
    /\baccount\s*(number|#|no\.?)?\s*[:#]?\s*\d{5,}/i,
    /\bcra\b.*\b(password|login|credential)/i,
    /\b(password|passcode)\s*[:=]/i,
    /\bmyaccount\.cra\b/i,
    /\bnetfile\b/i,
    /\bbanking\s*(info|information|details|password)/i,
    /\b(passport|driver'?s?\s*licence|driver'?s?\s*license)\s*(number|#)/i,
  ];
  return patterns.some((re) => re.test(text));
}

export const SENSITIVE_CONTENT_MESSAGE =
  "Please do not include social insurance numbers, banking details, CRA or tax-account passwords, government ID numbers, or attach tax documents or financial statements in this form. Once we establish an approved secure method, we will share how to send sensitive documents safely. For now, describe your needs in general terms and we will follow up.";
