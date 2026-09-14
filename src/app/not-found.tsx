import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <main id="main-content">
      <Section tone="ivory" spacious>
        <Container className="max-w-xl space-y-6 text-center sm:text-left">
          <Heading as="h1" size="xl">
            Page not found
          </Heading>
          <Text muted>
            That address isn’t on this site. Try the home page or contact us if
            you need help finding something.
          </Text>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <ButtonLink href="/" variant="primary">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
          <p className="m-0 font-sans text-sm">
            <Link
              href="/services"
              className="text-navy-900 font-semibold no-underline hover:underline"
            >
              Browse services
            </Link>
          </p>
        </Container>
      </Section>
    </main>
  );
}
