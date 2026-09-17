import { absoluteUrl, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { services } from "@/lib/site";

/**
 * Organization + LocalBusiness JSON-LD using verified data only.
 * No street address (not supplied). No CPA / designation claims.
 */
export function buildOrganizationLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#business`,
    name: site.name,
    url: siteUrl,
    email: site.email,
    telephone: site.phoneDisplay,
    description:
      "Financial management services in Calgary, Alberta—bookkeeping, payroll, tax services, GST/HST, CRA support, and financial services.",
    foundingLocation: {
      "@type": "Place",
      name: site.location,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Calgary",
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: "Alberta",
          containedInPlace: {
            "@type": "Country",
            name: "Canada",
          },
        },
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "AB",
      addressCountry: "CA",
      // streetAddress intentionally omitted — not verified
    },
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: site.founderTitle,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneDisplay,
        email: site.email,
        contactType: "customer service",
        areaServed: "CA-AB",
        // availableLanguage omitted until languages spoken are client-confirmed
      },
    ],
    knowsAbout: services.map((service) => service.name),
    // TODO(client): add Google Business Profile URL and social profiles when available
  };
}

export type BreadcrumbJsonLdItem = {
  name: string;
  path?: string;
};

export function buildBreadcrumbListJsonLd(items: readonly BreadcrumbJsonLdItem[]) {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: absoluteUrl(item.path) }
        : index === items.length - 1
          ? {}
          : {}),
    })),
  };
}

type JsonLdProps = {
  data: Record<string, unknown> | null | undefined;
};

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
