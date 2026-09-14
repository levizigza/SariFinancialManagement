import { BrandPhrase } from "@/components/brand/brand-phrase";
import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { FounderPortraitSlot } from "@/components/sections/founder-portrait-slot";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type FounderSectionProps = {
  variant?: "compact" | "full";
  className?: string;
  showPortrait?: boolean;
};

/**
 * About Sari / Founder block — verified identity only.
 */
export function FounderSection({
  variant = "compact",
  className,
  showPortrait = true,
}: FounderSectionProps) {
  const isFull = variant === "full";

  return (
    <Section
      tone={isFull ? "ivory" : "white"}
      atmosphere={isFull}
      className={cn(className)}
      aria-labelledby="founder-heading"
    >
      <Container
        className={cn(
          "grid gap-10 lg:items-center",
          showPortrait ? "lg:grid-cols-[0.9fr_1.1fr] lg:gap-14" : "max-w-3xl",
        )}
      >
        {showPortrait && (
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <FounderPortraitSlot size="feature" className="reveal-rise" />
          </div>
        )}

        <div
          className={cn(
            "max-w-xl space-y-5",
            showPortrait && "order-1 lg:order-2",
            "reveal-rise reveal-rise--delay",
          )}
        >
          <Eyebrow>Founder</Eyebrow>
          <Heading as="h2" id="founder-heading" size="xl">
            {site.founder}
          </Heading>
          <Text muted size="lg">
            {site.founderTitle}
          </Text>
          <Text muted size="sm" className="!max-w-none">
            {site.name} · {site.location}
          </Text>

          <GoldCurveAccent soft variant="arc" className="w-36" />

          <Text>
            Clients come to {site.name} for financial clarity they can use—not
            just records of what already happened. Sari works closely with each
            client to organize information, communicate clearly, and help them
            better understand their financial position.
          </Text>

          {isFull ? (
            <>
              <Text muted>
                The focus is founder-led service: listening first, agreeing on a
                clear scope, and keeping books, payroll, tax preparation, and
                advisory conversations easy to follow in plain language.
              </Text>
              <Text muted>
                That is the idea behind{" "}
                <span className="font-medium text-navy-900">{site.brandPhrase}</span>
                —organized financial information that supports smarter decisions
                and stronger businesses.
              </Text>
            </>
          ) : (
            <Text muted>
              Led with an emphasis on communication and organization—so clients
              in {site.location} can make decisions with greater confidence.
            </Text>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            {variant === "compact" ? (
              <>
                <ButtonLink href="/about" variant="secondary">
                  Meet the founder
                </ButtonLink>
                <ButtonLink href={site.cta.href} variant="primary">
                  {site.cta.label}
                </ButtonLink>
              </>
            ) : (
              <>
                <ButtonLink href={site.cta.href} variant="primary">
                  {site.cta.label}
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore services
                </ButtonLink>
              </>
            )}
          </div>

          {isFull && (
            <p className="m-0 pt-2 font-sans text-sm text-blue-muted">
              Prefer to talk first? Call{" "}
              <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>
              {" · "}
              <TextLink href={site.emailHref}>{site.email}</TextLink>
            </p>
          )}
        </div>
      </Container>

      {isFull && (
        <Container className="mt-14">
          <aside
            data-surface="navy"
            className="atmosphere-navy relative overflow-hidden rounded-lg p-8 sm:p-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end"
          >
            <div className="relative space-y-3 max-w-lg">
              <BrandPhrase className="block text-gold-300">
                {site.brandPhrase}
              </BrandPhrase>
              <Text className="text-ivory-50/80">
                {site.values.join(" · ")} — the foundation of how we work with
                every client.
              </Text>
            </div>
            <GoldCurveAccent soft variant="flourish" className="relative w-40 opacity-80" />
          </aside>
        </Container>
      )}
    </Section>
  );
}
