import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceViewTracker } from "@/components/analytics/service-view-tracker";
import { ServiceIcon } from "@/components/brand/service-icon";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import {
  getServiceContent,
  serviceContent,
  site,
} from "@/lib/site";
import { buildPageMetadata, getServiceSeo } from "@/lib/seo";
import { pageHeroPhotos, serviceAsidePhotos } from "@/content/stock-media";
import { EditorialImage } from "@/components/ui/editorial-image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceContent.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = getServiceSeo(slug);
  const service = getServiceContent(slug);
  if (!seo || !service) return { title: "Services" };

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: seo.path,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceContent(slug);

  if (!service) notFound();

  const related = serviceContent.filter((item) => item.slug !== service.slug);
  const faqHeadingId = `${service.slug}-faq-heading`;

  const heroImage =
    service.slug === "bookkeeping"
      ? pageHeroPhotos.bookkeeping
      : service.slug === "payroll"
        ? pageHeroPhotos.payroll
        : service.slug === "tax-services"
          ? pageHeroPhotos.tax
          : pageHeroPhotos.advisory;

  const asideImage =
    serviceAsidePhotos[service.slug as keyof typeof serviceAsidePhotos] ??
    pageHeroPhotos.services;

  return (
    <main id="main-content">
      <ServiceViewTracker slug={service.slug} />
      <PageHero
        eyebrow={`${service.journey.label} · ${service.name} · ${site.location}`}
        title={service.h1}
        description={service.intro}
        showCta
        image={heroImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: service.href },
        ]}
      />

      {/* Plain-English explanation */}
      <Section tone="ivory" atmosphere>
        <Container className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="space-y-5 max-w-2xl">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-gold-500/35 bg-navy-950 text-gold-300"
                aria-hidden
              >
                <ServiceIcon slug={service.slug} />
              </span>
              <Eyebrow>Overview</Eyebrow>
            </div>
            <Heading as="h2" size="lg">
              What {service.name.toLowerCase()} means here
            </Heading>
            <Text>{service.description}</Text>
            <Text muted>{service.outcome}</Text>

            <div
              className="rounded-md border border-navy-800/12 bg-surface-white px-5 py-4 space-y-2"
              aria-labelledby={`${service.slug}-best-for`}
            >
              <p
                id={`${service.slug}-best-for`}
                className="m-0 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-navy-800"
              >
                This may be right for you if…
              </p>
              <p className="m-0 font-sans text-[1.0625rem] leading-relaxed text-navy-900">
                {service.bestFor}
              </p>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <EditorialImage
              photo={asideImage}
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="luxury-frame aspect-[4/3]"
              showCredit
            />
            <div className="luxury-panel p-6 sm:p-7 space-y-4">
              <Heading as="h2" size="sm">
                Ready to talk?
              </Heading>
              <Text muted size="sm">
                Book a consultation to discuss your situation and agree on a clear
                scope before work begins.
              </Text>
              <ButtonLink href={site.cta.href} variant="primary" className="w-full sm:w-auto">
                {site.cta.label}
              </ButtonLink>
              <Text size="sm" className="!max-w-none">
                Or call{" "}
                <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>
              </Text>
            </div>
          </aside>
        </Container>
      </Section>

      {/* Common problems */}
      <Section tone="white">
        <Container className="space-y-8 max-w-3xl">
          <div className="space-y-3">
            <Eyebrow>Challenges</Eyebrow>
            <Heading as="h2" size="xl">
              Common problems this service helps address
            </Heading>
          </div>
          <ul className="m-0 space-y-3 pl-5 font-sans text-navy-900 leading-relaxed">
            {service.problems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What support may include */}
      <Section tone="ivory">
        <Container className="space-y-8 max-w-3xl">
          <div className="space-y-3">
            <Eyebrow>Scope</Eyebrow>
            <Heading as="h2" size="xl">
              What support may include
            </Heading>
            <Text muted>
              Exact deliverables are confirmed in your consultation. The items
              below describe support that may be part of an engagement.
            </Text>
          </div>
          <ul className="m-0 grid gap-3 sm:grid-cols-2 list-none p-0">
            {service.mayInclude.map((item) => (
              <li
                key={item}
                className="rounded-md border border-navy-800/12 bg-surface-white px-4 py-3 font-sans text-navy-900 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {service.taxForms && service.taxForms.length > 0 ? (
        <Section tone="white">
          <Container className="space-y-8 max-w-3xl">
            <div className="space-y-3">
              <Eyebrow>Canadian tax forms</Eyebrow>
              <Heading as="h2" size="xl">
                Forms we prepare and support
              </Heading>
              <Text muted>
                Core filings confirmed for Sari Financial Management include{" "}
                <strong className="font-semibold text-navy-900">T1</strong>,{" "}
                <strong className="font-semibold text-navy-900">T2</strong>, and{" "}
                <strong className="font-semibold text-navy-900">T4</strong>. Related
                Canadian and Alberta forms that often go with that work are listed
                below. We confirm which ones apply to your situation before any
                engagement begins.
              </Text>
            </div>
            <ul className="m-0 grid gap-4 list-none p-0">
              {service.taxForms.map((form) => (
                <li
                  key={form.code}
                  className="rounded-lg border border-navy-800/12 bg-surface-ivory px-5 py-4 space-y-2"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="m-0 font-display text-2xl font-semibold text-navy-900">
                      {form.code}
                    </p>
                    <p className="m-0 font-sans text-sm font-semibold text-navy-800">
                      {form.name}
                    </p>
                    {form.confirmed ? (
                      <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-navy-800">
                        Core offering
                      </span>
                    ) : null}
                  </div>
                  <p className="m-0 font-sans text-[1.0625rem] leading-relaxed text-navy-900">
                    {form.description}
                  </p>
                </li>
              ))}
            </ul>
            <Text size="sm" muted>
              This list is educational context for Calgary / Alberta clients—not a
              guarantee that every form is included in every engagement. Complex
              situations may require additional professional referral; we will say
              so clearly during consultation.
            </Text>
          </Container>
        </Section>
      ) : null}

      {/* Benefits / outcomes */}
      <Section tone="white">
        <Container className="space-y-8 max-w-3xl">
          <div className="space-y-3">
            <Eyebrow>Outcomes</Eyebrow>
            <Heading as="h2" size="xl">
              Benefits you can work toward
            </Heading>
          </div>
          <ul className="m-0 space-y-3 pl-5 font-sans text-navy-900 leading-relaxed">
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Who it’s for */}
      <Section tone="ivory">
        <Container className="space-y-8 max-w-3xl">
          <div className="space-y-3">
            <Eyebrow>Fit</Eyebrow>
            <Heading as="h2" size="xl">
              This may be right for you if…
            </Heading>
            <Text className="text-balance">{service.bestFor}</Text>
            <Text muted size="sm">
              These are soft fits—not requirements. A consultation confirms
              whether the scope matches your situation.
            </Text>
          </div>
          <ul className="m-0 grid gap-4 sm:grid-cols-2 list-none p-0">
            {service.audiences.map((item) => (
              <li
                key={item}
                className="border-t border-navy-800/15 pt-4 font-sans text-navy-900 leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Working process */}
      <Section tone="white">
        <Container className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <Eyebrow>Process</Eyebrow>
            <Heading as="h2" size="xl">
              How we typically work together
            </Heading>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none m-0 p-0">
            {service.process.map((step, index) => (
              <li
                key={step.title}
                className="space-y-3 border-t border-navy-800/15 pt-5"
              >
                <p className="m-0 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-navy-800">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <Heading as="h3" size="sm">
                  {step.title}
                </Heading>
                <Text muted size="sm">
                  {step.body}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="ivory" aria-labelledby={faqHeadingId}>
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Eyebrow>FAQ</Eyebrow>
            <Heading as="h2" id={faqHeadingId} size="xl">
              Questions about {service.name.toLowerCase()}
            </Heading>
            <Text muted>
              Still unsure?{" "}
              <TextLink href="/contact">Contact us</TextLink> or see more on the{" "}
              <TextLink href="/faq">FAQ page</TextLink>.
            </Text>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-navy-800/12 bg-surface-white px-5 py-4 open:pb-5"
              >
                <summary className="cursor-pointer list-none font-display text-xl font-semibold text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden
                    className="text-blue-muted text-lg leading-none group-open:rotate-45 transition-transform"
                  >
                    +
                  </span>
                </summary>
                <p className="m-0 pt-3 font-sans text-[1.0625rem] leading-relaxed text-navy-900">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related services */}
      <Section tone="white">
        <Container className="space-y-8">
          <div className="space-y-3 max-w-2xl">
            <Eyebrow>Related</Eyebrow>
            <Heading as="h2" size="xl">
              Other ways we can help
            </Heading>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3 list-none m-0 p-0">
            {related.map((item) => (
              <li key={item.slug}>
                <article className="h-full rounded-lg border border-navy-800/12 bg-surface-ivory p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gold-500/35 bg-navy-950 text-gold-300"
                      aria-hidden
                    >
                      <ServiceIcon slug={item.slug} className="h-5 w-5" />
                    </span>
                    <Heading as="h3" size="sm">
                      <Link
                        href={item.href}
                        className="no-underline text-inherit hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
                      >
                        {item.name}
                      </Link>
                    </Heading>
                  </div>
                  <Text muted size="sm">
                    {item.outcome}
                  </Text>
                  <p className="m-0">
                    <TextLink href={item.href}>Learn more</TextLink>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={`Let’s talk about ${service.name.toLowerCase()} for your business.`}
        description={`Book a consultation with ${site.name} in ${site.location}—or call ${site.phoneDisplay}. We’ll clarify scope before any work begins.`}
      />
    </main>
  );
}
