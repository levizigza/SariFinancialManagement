"use client";

import { useEffect, useRef } from "react";
import { serviceViewEvent } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

type ServiceViewTrackerProps = {
  slug: string;
};

/**
 * Fires a one-time service_view_* event when a service detail page mounts.
 * Does not send any personal or financial field data.
 */
export function ServiceViewTracker({ slug }: ServiceViewTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const event = serviceViewEvent(slug);
    if (!event) return;
    fired.current = true;
    trackEvent(event, { service: slug, location: "service_detail" });
  }, [slug]);

  return null;
}
