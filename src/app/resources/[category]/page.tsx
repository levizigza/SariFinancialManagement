import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { InsightsDisclaimer } from "@/components/insights/disclaimer";
import { InsightTopicCard } from "@/components/insights/topic-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import {
  getInsightCategory,
  getPlannedTopics,
  getPublishedArticles,
  insightCategories,
} from "@/content/insights";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageHeroPhotos } from "@/content/stock-media";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return insightCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getInsightCategory(slug);
  if (!category) return { title: "Resources" };

  return buildPageMetadata({
    title: `${category.name} Insights for Calgary & Alberta Businesses`,
    description: category.description,
    path: category.href,
  });
}

export default async function InsightCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getInsightCategory(slug);
  if (!category) notFound();

  const published = getPublishedArticles().filter(
    (article) => article.category === category.slug,
  );
  const planned = getPlannedTopics(category.slug);
  const others = insightCategories.filter((item) => item.slug !== category.slug);

  return (
    <main id="main-content">
      <PageHero
        eyebrow={`Resources · ${category.name}`}
        title={`${category.name} insights`}
        description={category.description}
        image={pageHeroPhotos.resources}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: category.name, href: category.href },
        ]}
      />

      <Section tone="ivory" atmosphere>
        <Container className="space-y-6 max-w-3xl">
          <InsightsDisclaimer />
          <Text muted>
            Focus: {category.jurisdictionFocus.join(" · ")}. Related service:{" "}
            <TextLink href={category.serviceHref}>{category.name}</TextLink>.
          </Text>
        </Container>
      </Section>

      {published.length > 0 ? (
        <Section tone="white">
          <Container className="space-y-8">
            <Heading as="h2" size="lg">
              Published articles
            </Heading>
            <ul className="grid gap-5 sm:grid-cols-2 list-none m-0 p-0">
              {published.map((article) => (
                <li key={article.slug}>
                  <InsightTopicCard article={article} variant="published" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : (
        <Section tone="white">
          <Container className="max-w-2xl space-y-4">
            <Heading as="h2" size="lg">
              Articles in preparation
            </Heading>
            <Text muted>
              We have not published {category.name.toLowerCase()} articles yet.
              Below are the client questions guiding this category—content will
              appear here after writing and any required professional review.
            </Text>
            <ButtonLink href={category.serviceHref} variant="secondary">
              View {category.name} services
            </ButtonLink>
          </Container>
        </Section>
      )}

      {planned.length > 0 && (
        <Section tone="ivory">
          <Container className="space-y-8">
            <div className="max-w-2xl space-y-3">
              <Heading as="h2" size="lg">
                Editorial topics
              </Heading>
              <Text muted>
                Genuine questions from the kinds of conversations we have with
                Calgary and Alberta clients.
              </Text>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 list-none m-0 p-0">
              {planned.map((article) => (
                <li key={article.slug}>
                  <InsightTopicCard article={article} variant="planned" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section tone="white">
        <Container className="space-y-6">
          <Heading as="h2" size="md">
            Other insight categories
          </Heading>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none m-0 p-0">
            {others.map((item) => (
              <li key={item.slug}>
                <TextLink href={item.href}>{item.name}</TextLink>
              </li>
            ))}
          </ul>
          <Text size="sm" muted>
            Based in {site.location}.{" "}
            <TextLink href="/contact">Book a consultation</TextLink> if you want
            support scoped to your books, timelines, and priorities.
          </Text>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}
