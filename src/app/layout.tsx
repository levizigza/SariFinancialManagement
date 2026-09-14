import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  JsonLd,
  buildOrganizationLocalBusinessJsonLd,
} from "@/components/seo/json-ld";
import { getGoogleSiteVerification } from "@/lib/analytics";
import { fontDisplay, fontSans, fontScript } from "@/lib/fonts";
import { pageSeo, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const googleSiteVerification = getGoogleSiteVerification();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageSeo.home.title,
    template: `%s · ${site.name}`,
  },
  description: pageSeo.home.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: site.name,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "geo.region": "CA-AB",
    "geo.placename": "Calgary",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-ivory text-navy-900 font-sans">
        <JsonLd data={buildOrganizationLocalBusinessJsonLd()} />
        <AnalyticsScripts />
        <SkipLink />
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
