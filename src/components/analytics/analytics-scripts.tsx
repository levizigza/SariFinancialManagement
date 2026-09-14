"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getAnalyticsConfig } from "@/lib/analytics/config";
import type { AnalyticsEventName } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

/**
 * Loads GA4 only when NEXT_PUBLIC_ANALYTICS_ENABLED=true and a measurement ID is set.
 * Also installs delegated click tracking for [data-analytics-event] attributes.
 */
export function AnalyticsScripts() {
  const { enabled, gaMeasurementId } = getAnalyticsConfig();

  useEffect(() => {
    if (!enabled) return;

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest("[data-analytics-event]");
      if (!(el instanceof HTMLElement)) return;

      const name = el.getAttribute(
        "data-analytics-event",
      ) as AnalyticsEventName | null;
      if (!name) return;

      const location =
        el.getAttribute("data-analytics-location") ?? undefined;
      trackEvent(name, { location });
    }

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (!enabled || !gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}', {
  anonymize_ip: true,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});
        `.trim()}
      </Script>
    </>
  );
}
