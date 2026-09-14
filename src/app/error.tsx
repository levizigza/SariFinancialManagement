"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Route error boundary — generic copy only (no stack traces or internals).
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[app-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <main id="main-content">
      <Section tone="ivory" spacious>
        <Container className="max-w-xl space-y-6 text-center sm:text-left">
          <Heading as="h1" size="xl">
            Something went wrong
          </Heading>
          <Text muted>
            We could not load this page right now. Please try again, or contact
            us if the problem continues.
          </Text>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <Button type="button" variant="primary" onClick={reset}>
              Try again
            </Button>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
