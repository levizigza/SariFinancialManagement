import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceJourneyRail } from "@/components/sections/service-journey-rail";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageHeroPhotos, stockPhotos } from "@/content/stock-media";
import { EditorialImage } from "@/components/ui/editorial-image";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.services.title,
  description: pageSeo.services.description,
  path: pageSeo.services.path,
});

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Services · Calgary, Alberta"
        title={pageSeo.services.h1}
        description={`${site.supporting.journey} Choose one service—or combine them—based on what your business needs now.`}
        showCta
        image={pageHeroPhotos.services}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <Section tone="ivory" atmosphere>
        <Container className="space-y-10">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="max-w-2xl space-y-3">
              <Heading as="h2" size="md" id="services-journey-heading">
                A clear progression—not a package requirement
              </Heading>
              <Text muted>
                Organize with Bookkeeping, Operate with Payroll, Prepare with Tax
                Services, then Understand &amp; Plan with Financial Services. Start
                where you are; you do not need every stage.
              </Text>
            </div>
            <EditorialImage
              photo={stockPhotos.consultationDesk}
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="luxury-frame aspect-[4/3]"
              showCredit
            />
          </div>

          <ServiceJourneyRail />

          <div className="space-y-3">
            <Heading as="h2" size="md" id="services-grid-heading" className="sr-only">
              Our services
            </Heading>
            <Text muted>
              Each service below keeps its official name and explains what it is,
              the challenge it addresses, and the outcome you can expect.{" "}
              <TextLink
                href="/contact"
                {...analyticsClickAttrs(
                  "book_consultation_click",
                  "services_index",
                )}
              >
                Book a consultation
              </TextLink>{" "}
              in Calgary to discuss the right fit.
            </Text>
          </div>

          <ServicesGrid
            labelledBy="services-grid-heading"
            headingLevel="h3"
          />
        </Container>
      </Section>

      <CtaBand
        title="Looking for financial management support in Calgary?"
        description={`${site.supporting.clarity} Tell us where you are—organizing books, running payroll, preparing for tax, or planning with clearer numbers—and we’ll outline a clear scope.`}
      />
    </main>
  );
}
