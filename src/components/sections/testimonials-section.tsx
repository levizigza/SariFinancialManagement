import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import {
  buildTestimonialsJsonLd,
  getPublishedTestimonials,
  hasPublishedTestimonials,
  testimonials as defaultTestimonials,
  type Testimonial,
} from "@/content/testimonials";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type EmptyMode = "hide" | "trust";

type TestimonialsSectionProps = {
  className?: string;
  items?: readonly Testimonial[];
  emptyMode?: EmptyMode;
  tone?: "ivory" | "white";
};

/**
 * Testimonials / reviews — no fabricated quotes.
 */
export function TestimonialsSection({
  className,
  items = defaultTestimonials,
  emptyMode = "trust",
  tone = "ivory",
}: TestimonialsSectionProps) {
  const published = getPublishedTestimonials(items);
  const hasReviews = hasPublishedTestimonials(items);

  if (!hasReviews && emptyMode === "hide") {
    return null;
  }

  const jsonLd =
    hasReviews &&
    buildTestimonialsJsonLd(published, {
      businessName: site.name,
      businessUrl: `https://${site.domain}`,
    });

  return (
    <Section
      tone={tone}
      atmosphere={tone === "ivory"}
      className={cn(className)}
      aria-labelledby="testimonials-heading"
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Container className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <Eyebrow>{hasReviews ? "Client feedback" : "Working with us"}</Eyebrow>
          <Heading as="h2" id="testimonials-heading" size="xl">
            {hasReviews ? "What clients say" : "Clarity you can talk through"}
          </Heading>
          <Text muted>
            {hasReviews
              ? "Reviews and testimonials appear here only when clients have approved them for publication."
              : "We do not publish ratings or testimonials that have not been verified and approved. Prefer a direct conversation about how we work? We’re available."}
          </Text>
        </div>

        {hasReviews ? (
          <ul className="grid list-none m-0 p-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((item) => (
              <li key={item.id} className="min-w-0">
                <TestimonialCard testimonial={item} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="relative overflow-hidden rounded-lg border border-navy-800/12 bg-surface-white px-6 py-10 sm:px-12 sm:py-14"
            role="note"
          >
            <div
              className="pointer-events-none absolute -right-10 top-0 w-56 opacity-30"
              aria-hidden
            >
              <GoldCurveAccent soft variant="flourish" className="w-full" />
            </div>
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-xl space-y-4">
                <GoldCurveAccent soft variant="arc" className="w-28" />
                <Heading as="h3" size="sm">
                  Built on clear communication
                </Heading>
                <Text muted>
                  Trust starts with a conversation—not manufactured quotes. Ask
                  about bookkeeping, payroll, tax services, or business advisory,
                  and we’ll walk you through how engagements work.
                </Text>
                <Text className="!mt-1">
                  Ready when you are:{" "}
                  <TextLink href={site.cta.href}>Book a consultation</TextLink>
                  {" · "}
                  <TextLink href={site.phoneHref}>{site.phoneDisplay}</TextLink>
                </Text>
              </div>
              <ul className="m-0 list-none space-y-3 p-0 font-sans text-sm text-blue-muted">
                <li className="border-l-2 border-gold-500/50 pl-3">Founder-led work</li>
                <li className="border-l-2 border-gold-500/50 pl-3">
                  Scope confirmed before engagement
                </li>
                <li className="border-l-2 border-gold-500/50 pl-3">
                  Based in {site.location}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
