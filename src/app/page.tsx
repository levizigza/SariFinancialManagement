import type { Metadata } from "next";
import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { CtaBand } from "@/components/layout/cta-band";
import { ClientJourney } from "@/components/sections/client-journey";
import { FaqPreviewSection } from "@/components/sections/faq-accordion";
import { FounderPortraitSlot } from "@/components/sections/founder-portrait-slot";
import { FounderSection } from "@/components/sections/founder-section";
import { MoreThanNumbersSection } from "@/components/sections/more-than-numbers";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ServiceJourneyRail } from "@/components/sections/service-journey-rail";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { getHomepageFaqs } from "@/content/faqs";
import { stockPhotos } from "@/content/stock-media";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.home.title,
  description: pageSeo.home.description,
  path: pageSeo.home.path,
});

const audiences = [
  {
    title: "Business owners",
    body: "Who want books that are current, understandable, and ready when decisions need to be made.",
  },
  {
    title: "Growing teams",
    body: "That need payroll handled carefully so pay runs and related records stay organized.",
  },
  {
    title: "Tax-season planners",
    body: "Individuals and businesses who want an organized path through filing—without last-minute scramble.",
  },
  {
    title: "Operators seeking clarity",
    body: "Who want practical visibility into cash flow and reports—not investment advice.",
  },
] as const;

export default function HomePage() {
  return (
    <main id="main-content">
      {/* Hero — photography plane + offer + founder identity */}
      <Section
        tone="navy"
        spacious
        className="overflow-hidden !pt-0 !pb-0"
      >
        <div className="relative isolate min-h-[min(92vh,52rem)]">
          <EditorialImage
            photo={stockPhotos.organizedDesk}
            priority
            overlay="navy-left"
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
            imgClassName="object-[68%_center] sm:object-[72%_center] scale-105"
            showCredit
          />
          {/* Soft veil — photo stays visible; text stays crisp on the left */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950/22 via-transparent to-gold-500/[0.05]"
            aria-hidden
          />

          <Container className="relative z-10 grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:py-24">
            <div className="max-w-xl space-y-7 reveal-rise">
              <Eyebrow>More Than Numbers · Calgary</Eyebrow>

              <Heading
                as="h1"
                size="display"
                className="text-ivory-50 max-w-[16ch] !leading-[1.08]"
              >
                {pageSeo.home.h1}
              </Heading>

              <GoldCurveAccent variant="arc" className="w-32 sm:w-40" />

              <Text size="lg" className="text-ivory-50/90 max-w-lg">
                Bookkeeping, payroll, tax services, and business advisory—organized
                support so you can decide with clearer information.
              </Text>

              <div className="flex flex-wrap gap-3 pt-1">
                <ButtonLink
                  href={site.cta.href}
                  variant="onNavy"
                  size="lg"
                  {...analyticsClickAttrs("book_consultation_click", "home_hero")}
                >
                  Book a Consultation
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="onNavySecondary"
                  size="lg"
                >
                  Explore Our Services
                </ButtonLink>
              </div>

              <p className="m-0 font-sans text-sm text-ivory-50/70 max-w-md">
                Personal reply from{" "}
                <TextLink href="/about" className="font-semibold text-ivory-50">
                  {site.founder}
                </TextLink>
                . Scope is confirmed together before any work begins.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-sm reveal-rise reveal-rise--delay lg:mx-0 lg:ml-auto lg:max-w-md">
              <FounderPortraitSlot
                size="hero"
                priority
                className="mx-auto border-gold-500/50 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)] lg:mr-0"
              />
              <p className="mt-4 m-0 text-center font-sans text-sm text-ivory-50/80 lg:text-right">
                <span className="font-semibold text-ivory-50">{site.founder}</span>
                <span className="text-ivory-50/45"> · </span>
                {site.founderTitle}
              </p>
            </div>
          </Container>
        </div>
      </Section>

      <div
        data-surface="navy"
        className="surface-navy border-y border-gold-500/25 bg-navy-900 section-hairline"
        aria-label="Brand values"
      >
        <Container className="py-5 sm:py-6">
          <p className="m-0 text-center font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-gold-300">
            Clarity · Trust · Confidence
          </p>
        </Container>
      </div>

      {/* Services + calm workspace visual */}
      <Section tone="ivory" atmosphere>
        <Container className="space-y-12">
          <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="max-w-2xl space-y-3">
              <Eyebrow>Services</Eyebrow>
              <Heading as="h2" size="xl" id="home-services-heading">
                From organized books to clearer decisions
              </Heading>
              <Text muted>
                {site.supporting.journey} Official service names stay the same—Bookkeeping,
                Payroll, Tax Services, and Business Advisory—framed as a path you can
                enter at any point.
              </Text>
            </div>
            <EditorialImage
              photo={stockPhotos.workspaceCalm}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="luxury-frame aspect-[4/3] rounded-lg"
              showCredit
            />
          </div>

          <ServiceJourneyRail />

          <ServicesGrid labelledBy="home-services-heading" homepage />

          <p className="m-0">
            <TextLink href="/services">Explore the full service path</TextLink>
          </p>
        </Container>
      </Section>

      <MoreThanNumbersSection />

      {/* Who we help + human collaboration visual */}
      <Section tone="white" className="content-visibility-auto overflow-hidden">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <EditorialImage
            photo={stockPhotos.advisoryConversation}
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="luxury-frame aspect-[5/4] order-2 lg:order-1"
            showCredit
          />
          <div className="space-y-8 order-1 lg:order-2">
            <div className="max-w-xl space-y-3">
              <Eyebrow>Who we help</Eyebrow>
              <Heading as="h2" size="xl">
                Built for people who want financial clarity
              </Heading>
              <Text muted>
                Whether you are establishing cleaner books or preparing for tax
                season, we meet you where you are—with organized processes and
                plain-language communication.
              </Text>
            </div>

            <ul className="m-0 grid list-none grid-cols-1 gap-0 border-t border-navy-800/12 p-0 sm:grid-cols-2">
              {audiences.map((audience) => (
                <li
                  key={audience.title}
                  className="border-b border-navy-800/12 py-5 sm:px-4 sm:odd:pl-0 sm:even:pr-0"
                >
                  <Heading as="h3" size="sm" className="mb-2">
                    {audience.title}
                  </Heading>
                  <Text muted size="sm" className="!max-w-sm">
                    {audience.body}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <ClientJourney className="content-visibility-auto" />

      <FounderSection variant="compact" showPortrait />

      <TestimonialsSection emptyMode="trust" className="content-visibility-auto" />

      <FaqPreviewSection items={getHomepageFaqs(6)} className="content-visibility-auto" />

      {/* Calgary — real place imagery */}
      <Section tone="navy" className="content-visibility-auto overflow-hidden !py-0">
        <div className="relative isolate min-h-[28rem] sm:min-h-[32rem]">
          <EditorialImage
            photo={stockPhotos.calgarySkyline}
            overlay="navy-full"
            sizes="100vw"
            className="absolute inset-0 h-full w-full"
            imgClassName="object-cover object-[center_65%]"
            showCredit
          />
          <Container className="relative z-10 grid gap-8 py-20 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-2xl space-y-4">
              <Eyebrow>Calgary, Alberta</Eyebrow>
              <Heading as="h2" size="xl" className="text-ivory-50">
                Local support for Calgary businesses
              </Heading>
              <Text className="text-ivory-50/80">
                Based in {site.location}, {site.name} is led by{" "}
                <TextLink href="/about">{site.founder}</TextLink>
                , {site.founderTitle}. The practice works with businesses and
                individuals who want organized books, reliable payroll support,
                careful tax preparation, and clearer financial decision-making—close
                to home and easy to reach.
              </Text>
              <Text size="sm" className="text-ivory-50/70">
                Call{" "}
                <TextLink
                  href={site.phoneHref}
                  {...analyticsClickAttrs("phone_click", "home_calgary")}
                >
                  {site.phoneDisplay}
                </TextLink>
                {" · "}
                <TextLink
                  href={site.emailHref}
                  {...analyticsClickAttrs("email_click", "home_calgary")}
                >
                  {site.email}
                </TextLink>
              </Text>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-gold-500/30 bg-navy-950/65 px-6 py-7 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)] backdrop-blur-[2px]">
              <div
                className="pointer-events-none absolute -right-8 -top-6 w-40 opacity-40"
                aria-hidden
              >
                <GoldCurveAccent soft variant="arc" className="w-full" />
              </div>
              <p className="relative m-0 font-display text-3xl font-semibold text-ivory-50">
                {site.location}
              </p>
              <p className="relative m-0 mt-3 font-sans text-sm text-ivory-50/75">
                <Link
                  href="/contact"
                  className="font-semibold text-gold-300 no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 rounded-sm"
                >
                  Contact us
                </Link>{" "}
                to discuss your needs.
              </p>
            </div>
          </Container>
        </div>
      </Section>

      <CtaBand
        title="Let’s build a brighter financial future together."
        description={`Book a consultation with ${site.founder} to talk through your books, payroll, tax timeline, or advisory needs—clearly and without pressure.`}
      />
    </main>
  );
}
