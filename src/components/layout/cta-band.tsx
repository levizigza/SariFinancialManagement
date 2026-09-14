import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { site } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  description?: string;
};

export function CtaBand({
  title = site.supporting.future,
  description = `Call ${site.phoneDisplay} or send a message—we’re here to help you organize records and understand your numbers.`,
}: CtaBandProps) {
  return (
    <Section tone="navy" atmosphere className="overflow-hidden">
      <Container className="relative max-w-3xl space-y-6 text-center sm:text-left">
        <div
          className="pointer-events-none absolute -right-16 -top-8 hidden w-72 opacity-35 sm:block"
          aria-hidden
        >
          <GoldCurveAccent soft variant="flourish" className="w-full" />
        </div>
        <Heading as="h2" size="lg" className="relative text-ivory-50 text-balance">
          {title}
        </Heading>
        <Text className="relative text-ivory-50/75 mx-auto sm:mx-0">{description}</Text>
        <div className="relative flex flex-wrap justify-center sm:justify-start gap-3">
          <ButtonLink
            href={site.cta.href}
            variant="onNavy"
            size="lg"
            {...analyticsClickAttrs("book_consultation_click", "cta_band")}
          >
            {site.cta.label}
          </ButtonLink>
          <ButtonLink
            href={site.phoneHref}
            variant="onNavySecondary"
            size="lg"
            {...analyticsClickAttrs("phone_click", "cta_band")}
          >
            Call {site.phoneDisplay}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
