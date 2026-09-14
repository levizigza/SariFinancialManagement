/**
 * Canonical conversion / engagement events.
 * Never attach PII or sensitive financial content to these events.
 *
 * @see docs/MEASUREMENT_PLAN.md
 */

export const analyticsEvents = [
  "book_consultation_click",
  "phone_click",
  "email_click",
  "contact_form_start",
  "contact_form_submit",
  "service_view_bookkeeping",
  "service_view_payroll",
  "service_view_tax",
  "service_view_advisory",
] as const;

export type AnalyticsEventName = (typeof analyticsEvents)[number];

/** Non-PII context only — placement on the site, not user identity */
export type AnalyticsEventParams = {
  /** UI placement, e.g. header, footer, hero, cta_band, contact_page */
  location?: string;
  /** Transport used for phone/email, e.g. tel, mailto */
  method?: string;
  /** Outcome for form submit: success | error (never include message text) */
  status?: "success" | "error";
  /** Service slug when relevant (public taxonomy, not personal data) */
  service?: string;
};

/** Allowed HTML data-attribute keys for delegated click tracking */
export type AnalyticsDataAttrs = {
  "data-analytics-event": AnalyticsEventName;
  "data-analytics-location"?: string;
};

export function analyticsClickAttrs(
  event: AnalyticsEventName,
  location?: string,
): AnalyticsDataAttrs {
  return {
    "data-analytics-event": event,
    ...(location ? { "data-analytics-location": location } : {}),
  };
}

/** Map public service slugs → view events */
export function serviceViewEvent(
  slug: string,
): Extract<
  AnalyticsEventName,
  | "service_view_bookkeeping"
  | "service_view_payroll"
  | "service_view_tax"
  | "service_view_advisory"
> | null {
  switch (slug) {
    case "bookkeeping":
      return "service_view_bookkeeping";
    case "payroll":
      return "service_view_payroll";
    case "tax-services":
      return "service_view_tax";
    case "business-advisory":
      return "service_view_advisory";
    default:
      return null;
  }
}

/**
 * Strip anything that must never leave the browser via analytics.
 * Defense in depth if callers pass unexpected keys.
 */
const BLOCKED_PARAM_KEYS = new Set([
  "email",
  "phone",
  "name",
  "message",
  "sin",
  "password",
  "address",
  "value",
  "user_id",
  "client_id_custom",
]);

export function sanitizeEventParams(
  params?: AnalyticsEventParams,
): Record<string, string> | undefined {
  if (!params) return undefined;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") continue;
    if (BLOCKED_PARAM_KEYS.has(key.toLowerCase())) continue;
    if (typeof value !== "string") continue;
    // Cap length to avoid accidental long free-text
    out[key] = value.slice(0, 64);
  }
  return Object.keys(out).length > 0 ? out : undefined;
}
