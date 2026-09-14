import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/text-link";
import { buildPageMetadata, pageSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { pageHeroPhotos } from "@/content/stock-media";

export const metadata: Metadata = buildPageMetadata({
  title: pageSeo.privacy.title,
  description: pageSeo.privacy.description,
  path: pageSeo.privacy.path,
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Legal"
        title={pageSeo.privacy.h1}
        description={`How ${site.name} in ${site.location} handles personal information collected through this website.`}
        image={pageHeroPhotos.privacy}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <Section tone="ivory" atmosphere>
        <Container narrow className="space-y-8">
          <Text muted size="sm">
            Last updated: September 12, 2026
          </Text>

          <section className="space-y-3" aria-labelledby="privacy-who">
            <Heading as="h2" id="privacy-who" size="md">
              Who we are
            </Heading>
            <Text>
              This website is operated by {site.name}, based in {site.location}.
              Contact:{" "}
              <TextLink href={site.emailHref}>{site.email}</TextLink>,{" "}
              <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>.
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-collect">
            <Heading as="h2" id="privacy-collect" size="md">
              Information we collect
            </Heading>
            <Text>
              If you use the public contact form, we collect only: your name,
              email address, optional phone number, service of interest, and
              message. We process submissions on our servers and deliver them to
              our business inbox through a transactional email provider when
              configured.
            </Text>
            <Text>
              We do <strong>not</strong> ask for Social Insurance Numbers,
              banking information, CRA or tax-account passwords, tax documents,
              financial statements, or government ID through the general contact
              form. Please do not include those details in your message.
            </Text>
            <Text>
              Sensitive financial documents should only be transmitted using an
              approved secure method once the business establishes one. Until
              then, describe your needs in general terms and we will follow up.
            </Text>
            <Text muted>
              If you call or email us directly, we receive the information you
              choose to share. We do not sell personal information.
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-analytics">
            <Heading as="h2" id="privacy-analytics" size="md">
              Website analytics (when enabled)
            </Heading>
            <Text>
              This website can optionally use privacy-conscious analytics (for
              example Google Analytics 4) to understand aggregate visits and
              whether people use consultation, phone, email, or service pages.
              Analytics is off unless the site operator explicitly enables it
              through environment configuration.
            </Text>
            <Text>
              When enabled, we configure analytics to avoid advertising
              personalization signals where the platform allows, and we do{" "}
              <strong>not</strong> send Social Insurance Numbers, banking
              details, tax documents, passwords, government ID, or the contents
              of your contact message as analytics events. Measurement focuses
              on event names such as consultation clicks and form start/submit
              status—not the substance of your inquiry.
            </Text>
            <Text muted>
              This site does not currently use separate advertising cookies or
              third-party marketing pixels beyond any analytics tool the
              operator enables as described above.
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-use">
            <Heading as="h2" id="privacy-use" size="md">
              How we use information
            </Heading>
            <Text>
              We use contact details and messages to respond to inquiries,
              schedule consultations, and deliver requested services. We retain
              correspondence as needed to manage the client relationship and meet
              recordkeeping obligations.
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-share">
            <Heading as="h2" id="privacy-share" size="md">
              Sharing
            </Heading>
            <Text>
              We share personal information only when required to provide a
              service you request, when required by law, or with service
              providers who help us operate communications tools—under appropriate
              confidentiality expectations. Form delivery may use a transactional
              email provider configured by environment credentials (not stored in
              the public repository).
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-security">
            <Heading as="h2" id="privacy-security" size="md">
              Security practices on this site
            </Heading>
            <Text>
              The website is designed to be served over HTTPS. Contact
              submissions are validated on the server, protected against common
              cross-site request patterns for form actions, and rate-limited
              where the hosting architecture permits. Operators maintain
              additional technical notes in the project&apos;s SECURITY.md file.
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-rights">
            <Heading as="h2" id="privacy-rights" size="md">
              Your choices
            </Heading>
            <Text>
              To ask about personal information we hold, or to request a
              correction, contact us at{" "}
              <TextLink href={site.emailHref}>{site.email}</TextLink>.
            </Text>
          </section>

          <section className="space-y-3" aria-labelledby="privacy-updates">
            <Heading as="h2" id="privacy-updates" size="md">
              Updates
            </Heading>
            <Text>
              We may update this policy as our website or practices change. The
              date at the top of this page will be revised when changes are
              published.
            </Text>
          </section>
        </Container>
      </Section>
    </main>
  );
}
