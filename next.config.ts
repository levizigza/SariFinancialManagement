import type { NextConfig } from "next";

/**
 * GitHub Pages (project site) needs a static export + repository basePath.
 * Cloudflare Pages sets CF_PAGES=1 and should also static-export to `out/`
 * (domain root — no basePath).
 * Local / Vercel-style Node hosting can omit those flags and keep the server build.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const isCloudflarePages = process.env.CF_PAGES === "1";
const isStaticExport =
  isGithubPages ||
  isCloudflarePages ||
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const repoBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ||
  "/SariFinancialManagement";

// Keep client helpers (withBasePath) aligned with next.config basePath.
if (isGithubPages && !process.env.NEXT_PUBLIC_BASE_PATH) {
  process.env.NEXT_PUBLIC_BASE_PATH = repoBasePath;
}

// Cloudflare Pages builds often have no dashboard env vars set yet.
if (isCloudflarePages && !process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = "https://sarifinancial.com";
}
if (isCloudflarePages && !process.env.NEXT_PUBLIC_STATIC_EXPORT) {
  process.env.NEXT_PUBLIC_STATIC_EXPORT = "true";
}
/**
 * Security headers supported on typical Next.js hosts (Vercel, Node).
 * Ignored for `output: "export"` (static hosts cannot apply these via Next).
 */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const immutableCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true,
          formats: ["image/avif", "image/webp"] as (
            | "image/avif"
            | "image/webp"
          )[],
          deviceSizes: [640, 750, 828, 1080, 1200, 1920],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          minimumCacheTTL: 60 * 60 * 24 * 30,
        },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"] as (
            | "image/avif"
            | "image/webp"
          )[],
          deviceSizes: [640, 750, 828, 1080, 1200, 1920],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          minimumCacheTTL: 60 * 60 * 24 * 30,
        },
        async headers() {
          return [
            {
              source: "/:path*",
              headers: securityHeaders,
            },
            {
              source: "/favicon.ico",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=86400, stale-while-revalidate=604800",
                },
              ],
            },
            {
              source: "/:path*.svg",
              headers: immutableCache,
            },
            {
              source: "/:path*.woff2",
              headers: immutableCache,
            },
          ];
        },
      }),
  ...(isGithubPages
    ? {
        basePath: repoBasePath,
        assetPrefix: `${repoBasePath}/`,
      }
    : {}),
  experimental: {
    optimizePackageImports: ["clsx", "tailwind-merge"],
  },
};

export default nextConfig;
