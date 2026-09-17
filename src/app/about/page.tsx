import type { Metadata } from "next";
import Link from "next/link";
import { BrandPhrase } from "@/components/brand/brand-phrase";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { FounderSection } from "@/components/sections/founder-section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { services, site } from "@/lib/site";
import { pageHeroPhotos, stockPhotos } from "@/content/stock-media";
import { EditorialImage } from "@/components/ui/editorial-image";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.about.title,
  description: pageSeo.about.description,
  path: pageSeo.about.path,
});

const principles = [
  {
    title: "Clarity you can use",
    body: "The goal is not more paperwork—it is a clearer view of where things stand so decisions feel grounded.",
  },
  {
    title: "Founder-led service",
    body: "Every engagement starts with listening. Scope is agreed together so support matches your books, timelines, and priorities.",
  },
  {
    title: "Human communication",
    body: "Plain language, steady updates, and room for questions—so financial information stays understandable.",
  },
  {
    title: "Organized processes",
    body: "Records, payroll details, and tax materials are kept in order so you spend less time searching and more time deciding.",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={`About · Led by ${site.founder}`}
        title={pageSeo.about.h1}
        description={`${site.founderTitle} at ${site.name} in ${site.location}. A practice focused on organized financial information, clear communication, and helping clients better understand their financial position.`}
        showBrandPhrase
        image={pageHeroPhotos.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Founder / About Sari */}
      <FounderSection variant="full" showPortrait />

      {/* Philosophy */}
      <Section tone="navy" atmosphere className="overflow-hidden">
        <Container className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="relative space-y-5 max-w-xl">
            <Eyebrow>Philosophy</Eyebrow>
            <BrandPhrase className="block text-gold-300 text-[2.5rem] sm:text-[3rem]">
              {site.brandPhrase}
            </BrandPhrase>
            <Heading as="h2" size="lg" className="text-ivory-50">
              Why this approach matters
            </Heading>
            <Text className="text-ivory-50/80">
              Recording what already happened is only the starting point.
              Organized financial information should help business owners
              understand their position, make better decisions, and build with
              greater confidence.
            </Text>
            <Text className="text-ivory-50/70" size="sm">
              {site.values.join(" · ")}
            </Text>
            <ol className="relative list-none m-0 space-y-5 p-0 pt-2">
              {[
                { step: "01", label: "Organized Books" },
                { step: "02", label: "Smarter Decisions" },
                { step: "03", label: "Stronger Business" },
              ].map((item) => (
                <li key={item.step} className="flex items-baseline gap-4">
                  <span className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-300">
                    {item.step}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-ivory-50">
                    {item.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <EditorialImage
            photo={stockPhotos.servicesOverview}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="luxury-frame aspect-[4/5] max-w-md lg:max-w-none lg:justify-self-end"
            showCredit
          />
        </Container>
      </Section>

      {/* How we show up for clients */}
      <Section tone="white">
        <Container className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <Eyebrow>How we work</Eyebrow>
            <Heading as="h2" size="xl">
              Built around the client, not the credential wall
            </Heading>
            <Text muted>
              Credibility here comes from organized work, plain-language
              updates, and follow-through—not from listing designations we have
              not verified on this site.
            </Text>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 list-none m-0 p-0">
            {principles.map((item) => (
              <li
                key={item.title}
                className="space-y-2 border-t border-navy-800/15 pt-5"
              >
                <Heading as="h3" size="sm">
                  {item.title}
                </Heading>
                <Text muted size="sm">
                  {item.body}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Practice snapshot — verified facts only */}
      <Section tone="ivory">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5 max-w-xl">
            <Eyebrow>The practice</Eyebrow>
            <Heading as="h2" size="xl">
              {site.name}
            </Heading>
            <Text>
              Based in {site.location}, we provide bookkeeping, payroll, tax
              services, GST/HST and CRA support, and financial services.
              Engagements begin with a consultation so scope and expectations
              stay clear before work begins.
            </Text>
            <Text muted>
              This website does not describe {site.name} as a CPA firm. Financial
              services means practical guidance and—where licensed—insurance
              support, not investment or securities advice. See our{" "}
              <TextLink href="/services">services</TextLink> for what each
              offering covers.
            </Text>
            <ButtonLink href={site.cta.href} variant="primary">
              {site.cta.label}
            </ButtonLink>
          </div>

          <aside className="rounded-lg border border-navy-800/12 bg-surface-white p-7 sm:p-8 h-fit space-y-5">
            <Heading as="h2" size="sm">
              At a glance
            </Heading>
            <dl className="m-0 space-y-4 font-sans text-sm">
              <div>
                <dt className="text-navy-800 m-0">Founder</dt>
                <dd className="m-0 mt-1 text-navy-900 font-medium">{site.founder}</dd>
              </div>
              <div>
                <dt className="text-navy-800 m-0">Title</dt>
                <dd className="m-0 mt-1 text-navy-900 font-medium">
                  {site.founderTitle}
                </dd>
              </div>
              <div>
                <dt className="text-navy-800 m-0">Location</dt>
                <dd className="m-0 mt-1 text-navy-900 font-medium">{site.location}</dd>
              </div>
              <div>
                <dt className="text-navy-800 m-0">Values</dt>
                <dd className="m-0 mt-1 text-navy-900 font-medium">
                  {site.values.join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="text-navy-800 m-0">Phone</dt>
                <dd className="m-0 mt-1">
                  <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>
                </dd>
              </div>
              <div>
                <dt className="text-navy-800 m-0">Email</dt>
                <dd className="m-0 mt-1 break-all">
                  <TextLink href={site.emailHref}>{site.email}</TextLink>
                </dd>
              </div>
            </dl>
          </aside>
        </Container>
      </Section>

      {/* Services bridge */}
      <Section tone="white">
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Eyebrow>Services</Eyebrow>
            <Heading as="h2" size="xl">
              How we can support you
            </Heading>
            <Text muted>
              An optional path from organizing records toward clearer
              planning—start with the service that fits now.
            </Text>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 list-none m-0 p-0">
            {services.map((service) => (
              <li key={service.slug} className="space-y-1">
                <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
                  {service.journey.label}
                </p>
                <Link
                  href={service.href}
                  className="font-sans font-semibold text-navy-900 no-underline underline-offset-[0.2em] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
                >
                  {service.name}
                </Link>
                <p className="m-0 mt-1 font-sans text-sm text-navy-800 max-w-sm">
                  <span className="font-semibold text-navy-900/80">Best for:</span>{" "}
                  {service.bestFor}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Let’s talk about what clarity could look like for you."
        description={`Book a consultation with ${site.founder} at ${site.name}—or call ${site.phoneDisplay}.`}
      />
    </main>
  );
}
