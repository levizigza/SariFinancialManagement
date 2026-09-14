import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { FounderIdentityCard } from "@/components/sections/founder-identity-card";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageHeroPhotos } from "@/content/stock-media";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
  path: pageSeo.contact.path,
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow={`Consultation · ${site.location}`}
        title={pageSeo.contact.h1}
        description={`Reach ${site.founder} by phone, email, or the form below. ${site.supporting.future}`}
        image={pageHeroPhotos.contact}
        imageObjectClass="object-[center_60%]"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <Section tone="ivory" atmosphere>
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6 h-fit">
            <FounderIdentityCard />

            <div className="space-y-3">
              <Heading as="h2" size="lg">
                Get in touch
              </Heading>
              <Text muted>
                Prefer to talk first? Call or email—messages for {site.name} are
                handled by {site.founder} for clients in {site.location}, as
                scope allows.
              </Text>
            </div>

            <address className="not-italic rounded-lg border border-navy-800/12 bg-surface-white p-6 sm:p-7 space-y-4 font-sans">
              <div>
                <p className="text-sm text-navy-800 m-0">Location</p>
                <p className="m-0 mt-1 text-lg font-semibold text-navy-900">
                  {site.location}, Canada
                </p>
                <p className="m-0 mt-1 text-sm text-navy-800">
                  Serving Calgary and surrounding areas. Street address available
                  on request—not published on this site.
                </p>
              </div>
              <div>
                <p className="text-sm text-navy-800 m-0">Phone</p>
                <p className="m-0 mt-1 text-lg font-semibold text-navy-900">
                  <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>
                </p>
              </div>
              <div>
                <p className="text-sm text-navy-800 m-0">Email</p>
                <p className="m-0 mt-1 font-semibold text-navy-900 break-all">
                  <TextLink href={site.emailHref}>{site.email}</TextLink>
                </p>
              </div>
            </address>

            <Text size="sm" muted>
              See how we handle messages in our{" "}
              <TextLink href="/privacy">Privacy Policy</TextLink>.
            </Text>
          </aside>

          <div className="rounded-lg border border-navy-800/12 bg-surface-white p-6 sm:p-8">
            <Heading as="h2" size="md" className="mb-2">
              Request a consultation
            </Heading>
            <Text muted size="sm" className="mb-6">
              Tell {site.founder} what you need help with. You will receive a
              personal response—no automated sales funnel.
            </Text>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
