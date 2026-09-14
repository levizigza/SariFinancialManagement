/**
 * Central SEO configuration for Sari Financial Management (Calgary, Alberta).
 * Verified data only — no street address, no CPA claims, no fake neighbourhood pages.
 */

import type { Metadata } from "next";
import { site } from "@/lib/site";
import { serviceContent } from "@/content/services";
import {
  getPublishedArticles,
  insightCategories,
} from "@/content/insights";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || `https://${site.domain}`
).replace(/\/$/, "");

export type PageSeoEntry = {
  path: string;
  /** Primary search intent this page serves */
  intent: string;
  /** Document title (browser / SERP) — unique per page */
  title: string;
  /** Meta description — unique, natural Calgary language */
  description: string;
  /** Visible H1 */
  h1: string;
  /** Include in XML sitemap */
  inSitemap?: boolean;
};

/**
 * Single source of truth for titles, descriptions, H1s, and audit reporting.
 * Keep H1 aligned with the visible page heading.
 */
export const pageSeo: Record<string, PageSeoEntry> = {
  home: {
    path: "/",
    intent: "financial management Calgary",
    title: "Financial Management in Calgary | Sari Financial Management",
    description:
      "Sari Financial Management—led by Sari Goitom Tekle, Founder & Financial Advisor—helps Calgary businesses with bookkeeping, payroll, tax services, and business advisory.",
    h1: "Financial management for Calgary businesses.",
    inSitemap: true,
  },
  about: {
    path: "/about",
    intent: "about Sari Financial Management Calgary",
    title: "About Sari Financial Management in Calgary",
    description:
      "Meet Sari Goitom Tekle, Founder & Financial Advisor at Sari Financial Management in Calgary, Alberta. Organized financial information and clear communication—More Than Numbers.",
    h1: "About Sari Goitom Tekle",
    inSitemap: true,
  },
  services: {
    path: "/services",
    intent: "financial management services Calgary",
    title: "Financial Management Services in Calgary",
    description:
      "From organizing books to clearer planning—bookkeeping, payroll, tax services, and business advisory in Calgary. Start where you need support.",
    h1: "Financial management support",
    inSitemap: true,
  },
  bookkeeping: {
    path: "/services/bookkeeping",
    intent: "bookkeeping services Calgary; small business bookkeeping Calgary",
    title: "Bookkeeping Services in Calgary for Small Businesses",
    description:
      "Bookkeeping services in Calgary from Sari Financial Management—organized, up-to-date records so small businesses can see where money is going.",
    h1: "Bookkeeping services in Calgary that bring clarity to your numbers",
    inSitemap: true,
  },
  payroll: {
    path: "/services/payroll",
    intent: "payroll services Calgary",
    title: "Payroll Services in Calgary | Sari Financial Management",
    description:
      "Payroll services in Calgary to help keep employee payments and related records organized. Clear processes from Sari Financial Management.",
    h1: "Payroll services in Calgary that keep pay runs organized",
    inSitemap: true,
  },
  tax: {
    path: "/services/tax-services",
    intent: "tax services Calgary; T1 T2 T4 Calgary",
    title: "Tax Services in Calgary | T1, T2 & T4 | Sari Financial Management",
    description:
      "Tax services in Calgary including T1 personal returns, T2 corporate returns, and T4 slips—plus related Canadian and Alberta filings from Sari Financial Management.",
    h1: "Tax services in Calgary for T1, T2, and T4 filings",
    inSitemap: true,
  },
  advisory: {
    path: "/services/business-advisory",
    intent: "business advisory Calgary",
    title: "Business Advisory in Calgary | Sari Financial Management",
    description:
      "Business advisory in Calgary focused on understanding your numbers for day-to-day decisions—not investment advice. Sari Financial Management.",
    h1: "Business advisory in Calgary to help you understand your numbers",
    inSitemap: true,
  },
  resources: {
    path: "/resources",
    intent: "Calgary financial management resources / insights",
    title: "Resources & Insights for Calgary Business Finances",
    description:
      "Bookkeeping, payroll, tax, and advisory insights for Calgary and Alberta businesses—plus official CRA and Government of Alberta links.",
    h1: "Guides and official references",
    inSitemap: true,
  },
  faq: {
    path: "/faq",
    intent: "Sari Financial Management FAQ Calgary",
    title: "FAQ | Sari Financial Management Calgary",
    description:
      "Answers about bookkeeping, payroll, tax services, and advisory in Calgary—how consultations work, pricing discussions, and how to get started.",
    h1: "Frequently asked questions",
    inSitemap: true,
  },
  contact: {
    path: "/contact",
    intent: "contact bookkeeping Calgary; book consultation Calgary",
    title: "Contact Sari Financial Management in Calgary",
    description:
      "Book a consultation with Sari Goitom Tekle at Sari Financial Management in Calgary, Alberta. Call 825-935-3739 or email sari.financialmanagement@gmail.com.",
    h1: "Book a Consultation",
    inSitemap: true,
  },
  privacy: {
    path: "/privacy",
    intent: "privacy policy",
    title: "Privacy Policy | Sari Financial Management",
    description:
      "How Sari Financial Management in Calgary handles personal information submitted through this website.",
    h1: "Privacy Policy",
    inSitemap: true,
  },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return siteUrl;
  return `${siteUrl}${normalized}`;
}

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Override OG title when it should differ slightly from document title */
  ogTitle?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = ogTitle ?? title;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_CA",
      url,
      siteName: site.name,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** Sync service content SEO fields with pageSeo registry (for dynamic routes). */
export function getServiceSeo(slug: string) {
  const map: Record<string, PageSeoEntry> = {
    bookkeeping: pageSeo.bookkeeping,
    payroll: pageSeo.payroll,
    "tax-services": pageSeo.tax,
    "business-advisory": pageSeo.advisory,
  };
  return map[slug];
}

export function getSitemapEntries(): {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] {
  const priorities: Record<string, number> = {
    "/": 1,
    "/services": 0.9,
    "/services/bookkeeping": 0.9,
    "/services/payroll": 0.85,
    "/services/tax-services": 0.85,
    "/services/business-advisory": 0.85,
    "/about": 0.8,
    "/contact": 0.85,
    "/faq": 0.75,
    "/resources": 0.8,
    "/privacy": 0.3,
  };

  const base = Object.values(pageSeo)
    .filter((entry) => entry.inSitemap !== false)
    .map((entry) => ({
      path: entry.path,
      priority: priorities[entry.path] ?? 0.6,
      changeFrequency:
        entry.path === "/privacy"
          ? ("yearly" as const)
          : ("monthly" as const),
    }));

  const categories = insightCategories.map((category) => ({
    path: category.href,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const articles = getPublishedArticles().map((article) => ({
    path: `/resources/${article.category}/${article.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
  }));

  return [...base, ...categories, ...articles];
}

/** Ensure serviceContent SEO strings stay aligned — used by audit. */
export function listServiceContentSeo() {
  return serviceContent.map((s) => ({
    slug: s.slug,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    h1: s.h1,
  }));
}
