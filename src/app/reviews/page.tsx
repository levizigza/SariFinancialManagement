import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import { pageHeroPhotos } from "@/content/stock-media";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.reviews.title,
  description: pageSeo.reviews.description,
  path: pageSeo.reviews.path,
});

export default function ReviewsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={`Reviews · ${site.location}`}
        title={pageSeo.reviews.h1}
        description="Read approved client feedback, or share your own experience with Sari Financial Management. Reviews are moderated before they appear publicly."
        image={pageHeroPhotos.reviews}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reviews", href: "/reviews" },
        ]}
      />

      <TestimonialsSection
        tone="ivory"
        emptyMode="trust"
        showForm
        compactSubmit={false}
      />

      <Section tone="white">
        <Container className="max-w-2xl space-y-4">
          <Heading as="h2" size="md">
            How publishing works
          </Heading>
          <Text muted>
            When you submit a review, your email app opens a draft to{" "}
            {site.email}. {site.founder} reviews the message, confirms it is from
            a real client engagement when appropriate, and only then may add an
            approved quote to the site. We never invent testimonials or star
            ratings.
          </Text>
          <Text muted>
            Questions about an existing review? Call{" "}
            <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink> or
            email <TextLink href={site.emailHref}>{site.email}</TextLink>.
          </Text>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}
