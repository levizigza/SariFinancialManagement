import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const journeySteps = [
  {
    number: "01",
    title: "Start the Conversation",
    body: "Tell us what you need and what is currently creating difficulty.",
  },
  {
    number: "02",
    title: "Understand the Situation",
    body: "We review the relevant information and clarify priorities.",
  },
  {
    number: "03",
    title: "Create the Right Support Plan",
    body: "We identify which financial-management services fit the situation.",
  },
  {
    number: "04",
    title: "Stay Clear and Organized",
    body: "Ongoing support helps keep financial information useful, current and easier to act on.",
  },
] as const;

type ClientJourneyProps = {
  className?: string;
  tone?: "ivory" | "white";
};

/**
 * Low-friction four-step client journey.
 * No promised outcomes or turnaround times.
 */
export function ClientJourney({ className, tone = "ivory" }: ClientJourneyProps) {
  return (
    <Section
      tone={tone}
      atmosphere={tone === "ivory"}
      className={cn(className)}
      aria-labelledby="client-journey-heading"
    >
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <Eyebrow>How it works</Eyebrow>
          <Heading as="h2" id="client-journey-heading" size="xl">
            A simple path from first conversation to ongoing clarity
          </Heading>
          <Text muted>
            No complicated intake. We start with what you need, agree on the
            right support, and keep things organized from there.
          </Text>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-5 hidden h-px bg-gold-500/35 lg:block"
            aria-hidden
          />

          <ol className="relative m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {journeySteps.map((step) => (
              <li
                key={step.number}
                className="relative z-10 flex flex-col gap-4 border-t border-navy-800/15 pt-5 lg:border-t-0 lg:pt-0"
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-full",
                    "border border-gold-500/45 bg-surface-white",
                    "font-sans text-xs font-semibold tracking-[0.08em] text-navy-900",
                    "shadow-[0_0_0_6px_var(--surface-ivory)]",
                    "[[data-surface=white]_&]:shadow-[0_0_0_6px_var(--surface-white)]",
                  )}
                >
                  {step.number}
                </span>
                <div className="space-y-2">
                  <Heading as="h3" size="sm">
                    {step.title}
                  </Heading>
                  <Text muted size="sm">
                    {step.body}
                  </Text>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 border-t border-navy-800/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Text muted className="max-w-md m-0">
            Ready when you are—start with a conversation. We’ll clarify scope
            before any work begins.
          </Text>
          <div className="flex flex-wrap gap-3 shrink-0">
            <ButtonLink href={site.cta.href} variant="primary" size="lg">
              {site.cta.label}
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary" size="lg">
              Call {site.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
