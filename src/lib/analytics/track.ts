import { getAnalyticsConfig, isAnalyticsEnabled } from "@/lib/analytics/config";
import {
  sanitizeEventParams,
  type AnalyticsEventName,
  type AnalyticsEventParams,
} from "@/lib/analytics/events";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a privacy-safe analytics event.
 * No-ops when analytics is disabled or gtag is unavailable.
 * Never pass form field values, messages, or financial documents.
 */
export function trackEvent(
  name: AnalyticsEventName,
  params?: AnalyticsEventParams,
): void {
  if (typeof window === "undefined") return;
  if (!isAnalyticsEnabled()) return;

  const safe = sanitizeEventParams(params);
  const { debug, gaMeasurementId } = getAnalyticsConfig();

  if (debug) {
    console.info("[analytics]", name, safe ?? {});
  }

  if (typeof window.gtag !== "function") return;

  window.gtag("event", name, {
    ...safe,
    send_to: gaMeasurementId,
  });
}
