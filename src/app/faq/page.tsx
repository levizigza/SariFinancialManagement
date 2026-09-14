import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import {
  buildFaqPageJsonLd,
  faqDisclaimers,
  faqs,
  getAllFaqPageItems,
  getSchemaFaqs,
} from "@/content/faqs";
import { buildPageMetadata, pageSeo, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageHeroPhotos } from "@/content/stock-media";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.faq.title,
  description: pageSeo.faq.description,
  path: pageSeo.faq.path,
});

export default function FaqPage() {
  const allItems = getAllFaqPageItems();
  const schemaItems = getSchemaFaqs(allItems);
  const jsonLd = buildFaqPageJsonLd(schemaItems, `${siteUrl}/faq`);

  return (
    <main id="main-content">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <PageHero
        eyebrow={`FAQ · ${site.location}`}
        title={pageSeo.faq.h1}
        description="Clear answers about our services, who we work with, consultations, and how to get started with Sari Financial Management in Calgary."
        image={pageHeroPhotos.faq}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />
      <Section tone="ivory" atmosphere>
        <Container className="max-w-3xl space-y-10">
          <div className="space-y-3">
            <Heading as="h2" size="lg">
              Working with {site.name}
            </Heading>
            <Text muted>
              Straight answers first. If something depends on your situation, we
              say so—and we confirm details on a consultation call.
            </Text>
          </div>

          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      <Section tone="white">
        <Container className="max-w-3xl space-y-10">
          <div className="space-y-3">
            <Heading as="h2" size="lg">
              Scope and clarity
            </Heading>
            <Text muted>
              Important boundaries so expectations stay clear.
            </Text>
          </div>

          <FaqAccordion items={faqDisclaimers} />

          <div className="space-y-3 pt-4">
            <Heading as="h2" size="md">
              Still have a question?
            </Heading>
            <Text muted>
              <TextLink href="/contact">{site.cta.label}</TextLink>
              {" · "}
              <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>
              {" · "}
              <TextLink href={site.emailHref}>{site.email}</TextLink>
            </Text>
          </div>

          {/*
            Internal: FAQs with needsClientConfirmation live in src/content/faqs.ts
            (clientTodo). Do not surface those notes on the public page.
          */}
        </Container>
      </Section>

      <CtaBand
        title="Ready for a clearer next step?"
        description={`Book a consultation with ${site.name}—or call ${site.phoneDisplay}. We’ll clarify scope before any work begins.`}
      />
    </main>
  );
}
