/**
 * GitHub Pages project sites live under `/SariFinancialManagement`.
 * next/link and JS chunks get basePath from next.config, but unoptimized
 * next/image src strings do not always — prefix public asset paths here.
 */
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ||
  (process.env.GITHUB_PAGES === "true" ? "/SariFinancialManagement" : "");

/** Prefix a root-relative public path for the active deploy basePath. */
export function withBasePath(path: string): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }
  if (!basePath) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }
  return `${basePath}${path}`;
}
