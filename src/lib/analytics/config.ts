/**
 * Privacy-conscious analytics configuration.
 * Account IDs and enablement come only from environment variables — never hardcode.
 */

export type AnalyticsConfig = {
  /** Master switch — must be true AND a measurement ID present to load GA */
  enabled: boolean;
  /** GA4 Measurement ID, e.g. G-XXXXXXXX */
  gaMeasurementId: string | undefined;
  /** Google Search Console HTML tag verification token (not a secret, but env-driven) */
  googleSiteVerification: string | undefined;
  /** Extra console logging for local QA */
  debug: boolean;
};

function readPublicFlag(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

/**
 * Resolved at runtime from NEXT_PUBLIC_* vars (inlined at build for client bundles).
 */
export function getAnalyticsConfig(): AnalyticsConfig {
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;
  const enabledFlag = readPublicFlag(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED);
  const debug = readPublicFlag(process.env.NEXT_PUBLIC_ANALYTICS_DEBUG);

  return {
    // Require explicit enable + ID so empty envs never load third-party scripts
    enabled: enabledFlag && Boolean(gaMeasurementId),
    gaMeasurementId,
    googleSiteVerification:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined,
    debug,
  };
}

export function isAnalyticsEnabled(): boolean {
  return getAnalyticsConfig().enabled;
}
