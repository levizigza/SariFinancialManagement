import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { InsightCategoryCard } from "@/components/insights/category-card";
import { InsightsDisclaimer } from "@/components/insights/disclaimer";
import { InsightTopicCard } from "@/components/insights/topic-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import {
  getPlannedTopics,
  getPublishedArticles,
  insightCategories,
} from "@/content/insights";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageHeroPhotos, stockPhotos } from "@/content/stock-media";
import { EditorialImage } from "@/components/ui/editorial-image";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.resources.title,
  description: pageSeo.resources.description,
  path: pageSeo.resources.path,
});

const externalResources = [
  {
    name: "Canada Revenue Agency (CRA)",
    href: "https://www.canada.ca/en/revenue-agency.html",
    description: "Official federal tax information, accounts, and filing resources.",
  },
  {
    name: "CRA Business taxes",
    href: "https://www.canada.ca/en/services/taxes/business-number.html",
    description: "Guidance for business numbers, GST/HST, and related topics.",
  },
  {
    name: "Government of Alberta — Business and economy",
    href: "https://www.alberta.ca/business-and-economy",
    description: "Provincial information for starting and operating a business in Alberta.",
  },
] as const;

export default function ResourcesPage() {
  const published = getPublishedArticles();
  const planned = getPlannedTopics();

  return (
    <main id="main-content">
      <PageHero
        eyebrow={`Resources · ${site.location}`}
        title={pageSeo.resources.h1}
        description="Educational insights for Calgary and Alberta businesses—organized by bookkeeping, payroll, tax, and financial services—plus official CRA and Government of Alberta links."
        image={pageHeroPhotos.resources}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
        ]}
      />

      <Section tone="ivory" atmosphere>
        <Container className="space-y-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="max-w-2xl space-y-3">
              <Heading as="h2" size="lg">
                Insights by service
              </Heading>
              <Text muted>
                Categories mirror how we work with clients. Articles are educational
                and Canada/Alberta-aware—never a substitute for advice about your
                specific situation.
              </Text>
              <InsightsDisclaimer />
            </div>
            <EditorialImage
              photo={stockPhotos.consultationDesk}
              sizes="(max-width: 1024px) 100vw, 36vw"
              className="luxury-frame aspect-[4/3]"
              showCredit
            />
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 list-none m-0 p-0">
            {insightCategories.map((category) => {
              const publishedCount = published.filter(
                (article) => article.category === category.slug,
              ).length;
              const plannedCount = planned.filter(
                (article) => article.category === category.slug,
              ).length;

              return (
                <li key={category.slug}>
                  <InsightCategoryCard
                    category={category}
                    articleCountLabel={
                      publishedCount > 0
                        ? `${publishedCount} published`
                        : plannedCount > 0
                          ? `${plannedCount} topics in preparation`
                          : "Topics coming soon"
                    }
                  />
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {published.length > 0 && (
        <Section tone="white">
          <Container className="space-y-8">
            <div className="max-w-2xl space-y-3">
              <Heading as="h2" size="lg">
                Published insights
              </Heading>
              <Text muted>
                Reviewed educational articles for Canadian and Alberta contexts.
              </Text>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 list-none m-0 p-0">
              {published.map((article) => (
                <li key={`${article.category}-${article.slug}`}>
                  <InsightTopicCard article={article} variant="published" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section tone={published.length > 0 ? "ivory" : "white"}>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Heading as="h2" size="lg">
              Topics we’re preparing
            </Heading>
            <Text muted>
              Real client questions guiding our editorial backlog. Titles are
              listed for transparency—full articles publish only after writing
              and, where needed, professional review.
            </Text>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 list-none m-0 p-0">
            {planned.map((article) => (
              <li key={`${article.category}-${article.slug}`}>
                <InsightTopicCard article={article} variant="planned" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="space-y-8 max-w-3xl">
          <div className="space-y-3">
            <Heading as="h2" size="lg">
              Official Canadian & Alberta resources
            </Heading>
            <Text muted>
              Government links for convenience. They are not affiliated with{" "}
              {site.name}.
            </Text>
          </div>

          <ul className="list-none m-0 p-0 divide-y divide-navy-800/10 border-y border-navy-800/10">
            {externalResources.map((resource) => (
              <li key={resource.href} className="py-5 space-y-2">
                <Heading as="h3" size="sm">
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-900 no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
                  >
                    {resource.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Heading>
                <Text muted size="sm">
                  {resource.description}
                </Text>
              </li>
            ))}
          </ul>

          <Text size="sm" muted>
            Prefer a conversation about your books?{" "}
            <TextLink href="/contact">Book a consultation</TextLink>.
          </Text>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}
