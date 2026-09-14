import { getAnalyticsConfig } from "@/lib/analytics/config";

/**
 * Server-safe helper for Next.js Metadata.verification.
 * Returns undefined when unset so no empty verification tags are emitted.
 */
export function getGoogleSiteVerification(): string | undefined {
  return getAnalyticsConfig().googleSiteVerification;
}
