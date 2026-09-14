import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { InsightArticleBody } from "@/components/insights/article-body";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import {
  canPublishPublicly,
  getArticle,
  getInsightCategory,
  getPublishedArticles,
  insightArticles,
} from "@/content/insights";
import { buildPageMetadata } from "@/lib/seo";
import { pageHeroPhotos } from "@/content/stock-media";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

/**
 * Include planned topics so `output: "export"` (GitHub Pages) can build
 * before any article is marked published.
 */
export function generateStaticParams() {
  return insightArticles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) {
    return { title: "Resources" };
  }

  if (!canPublishPublicly(article)) {
    return {
      ...buildPageMetadata({
        title: `${article.clientQuestion} | Coming soon`,
        description: article.description,
        path: `/resources/${article.category}/${article.slug}`,
      }),
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${article.title} | Sari Financial Management`,
    description: article.description,
    path: `/resources/${article.category}/${article.slug}`,
  });
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params;
  const category = getInsightCategory(categorySlug);
  const article = getArticle(categorySlug, slug);

  if (!category || !article) {
    notFound();
  }

  if (!canPublishPublicly(article)) {
    return (
      <main id="main-content">
        <PageHero
          eyebrow={`${category.name} · Coming soon`}
          title={article.clientQuestion}
          description={article.description}
          image={pageHeroPhotos.resources}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: category.name, href: category.href },
            {
              label: "Coming soon",
              href: `${category.href}/${article.slug}`,
            },
          ]}
        />
        <Section tone="ivory" atmosphere>
          <Container className="max-w-2xl space-y-6">
            <Heading as="h2" size="lg">
              This insight is being prepared
            </Heading>
            <Text muted>
              We publish resources only after they are written and reviewed for
              public use. In the meantime, you can explore related services or
              book a consultation.
            </Text>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={article.relatedServiceHref} variant="secondary">
                {category.name} services
              </ButtonLink>
              <ButtonLink href="/contact" variant="primary">
                Book a Consultation
              </ButtonLink>
            </div>
          </Container>
        </Section>
        <CtaBand />
      </main>
    );
  }

  const related = getPublishedArticles()
    .filter(
      (item) =>
        item.category === article.category && item.slug !== article.slug,
    )
    .slice(0, 3);

  return (
    <main id="main-content">
      <PageHero
        eyebrow={`${category.name} · Insights`}
        title={article.title}
        description={article.description}
        image={pageHeroPhotos.resources}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: category.name, href: category.href },
          {
            label: article.title,
            href: `${category.href}/${article.slug}`,
          },
        ]}
      />

      <Section tone="ivory" atmosphere>
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <InsightArticleBody article={article} />

          <aside className="space-y-6 h-fit lg:sticky lg:top-28">
            <div className="rounded-lg border border-navy-800/12 bg-surface-white p-6 space-y-4">
              <Heading as="h2" size="sm">
                Want help with your situation?
              </Heading>
              <Text muted size="sm">
                Educational articles cannot replace advice for your specific
                books and deadlines. Talk with us about{" "}
                {category.name.toLowerCase()} support in Calgary.
              </Text>
              <ButtonLink href={article.relatedServiceHref} variant="secondary">
                {category.name} services
              </ButtonLink>
              <ButtonLink href="/contact" variant="primary">
                Book a Consultation
              </ButtonLink>
            </div>

            {related.length > 0 && (
              <div className="space-y-3">
                <Heading as="h2" size="sm">
                  Related insights
                </Heading>
                <ul className="list-none m-0 p-0 space-y-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <TextLink href={`${category.href}/${item.slug}`}>
                        {item.title}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}
