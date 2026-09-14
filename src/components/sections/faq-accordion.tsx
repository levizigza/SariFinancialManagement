import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { FaqItem } from "@/content/faqs";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type FaqAccordionProps = {
  items: readonly FaqItem[];
  className?: string;
  /** Open the first item by default (useful for short previews) */
  openFirst?: boolean;
};

/**
 * Accessible FAQ list using native disclosure widgets (no JS carousel).
 * Answers are plain text for clarity to users and answer engines.
 */
export function FaqAccordion({
  items,
  className,
  openFirst = false,
}: FaqAccordionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <details
          key={item.id}
          id={`faq-${item.id}`}
          className="group rounded-lg border border-navy-800/12 bg-surface-white px-5 py-4 open:pb-5 [[data-surface=white]_&]:bg-surface-ivory"
          open={openFirst && index === 0 ? true : undefined}
        >
          <summary className="cursor-pointer list-none font-display text-xl font-semibold text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm [&::-webkit-details-marker]:hidden flex items-start justify-between gap-4 min-h-11 py-1">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="text-blue-muted text-lg leading-none mt-1 group-open:rotate-45 motion-safe:transition-transform shrink-0"
            >
              +
            </span>
          </summary>
          <div className="pt-3 space-y-3">
            <p className="m-0 font-sans text-[1.0625rem] leading-relaxed text-navy-900">
              {item.answer}
            </p>
            {/*
              Client-confirmation flags live in src/content/faqs.ts
              (needsClientConfirmation / clientTodo). Not shown to visitors.
            */}
          </div>
        </details>
      ))}
    </div>
  );
}

type FaqPreviewSectionProps = {
  items: readonly FaqItem[];
  className?: string;
};

/** Homepage FAQ preview — typically 4–6 items + link to full FAQ */
export function FaqPreviewSection({ items, className }: FaqPreviewSectionProps) {
  return (
    <Section
      tone="white"
      className={className}
      aria-labelledby="home-faq-heading"
    >
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <Eyebrow>FAQ</Eyebrow>
          <Heading as="h2" id="home-faq-heading" size="xl">
            Quick answers
          </Heading>
          <Text muted>
            A few of the questions we hear most often. More detail is on the full
            FAQ page.
          </Text>
          <ButtonLink href="/faq" variant="secondary">
            View all FAQs
          </ButtonLink>
          <Text size="sm" muted>
            Or{" "}
            <TextLink
              href={site.cta.href}
              {...analyticsClickAttrs("book_consultation_click", "home_faq")}
            >
              book a consultation
            </TextLink>
            {" · "}
            <TextLink
              href={site.phoneHref}
              {...analyticsClickAttrs("phone_click", "home_faq")}
            >
              {site.phoneDisplay}
            </TextLink>
          </Text>
        </div>

        <FaqAccordion items={items} />
      </Container>
    </Section>
  );
}
