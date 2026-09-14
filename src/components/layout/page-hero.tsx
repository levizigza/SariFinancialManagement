import { BrandPhrase } from "@/components/brand/brand-phrase";
import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EditorialImage } from "@/components/ui/editorial-image";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { StockPhoto } from "@/content/stock-media";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  showBrandPhrase?: boolean;
  showCta?: boolean;
  breadcrumbs?: readonly BreadcrumbItem[];
  className?: string;
  /** Full-bleed editorial photograph behind the hero */
  image?: StockPhoto;
  /** Tailwind object-position class, e.g. object-[center_40%] */
  imageObjectClass?: string;
};

/**
 * Interior page hero — photographic when `image` is set, atmospheric navy otherwise.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  showBrandPhrase = false,
  showCta = false,
  breadcrumbs,
  className,
  image,
  imageObjectClass = "object-center",
}: PageHeroProps) {
  return (
    <Section
      tone="navy"
      atmosphere={!image}
      spacious={!image}
      className={cn("overflow-hidden", image && "!py-0", className)}
    >
      <div className={cn("relative isolate", image && "min-h-[min(70vh,34rem)]")}>
        {image ? (
          <>
            <EditorialImage
              photo={image}
              priority
              overlay="navy-left"
              sizes="100vw"
              className="absolute inset-0 h-full w-full"
              imgClassName={cn("object-cover", imageObjectClass)}
              showCredit
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-950/28 via-transparent to-gold-500/[0.06]"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="pointer-events-none absolute -right-6 top-4 w-64 opacity-30 sm:w-80"
            aria-hidden
          >
            <GoldCurveAccent soft variant="sweep" className="w-full" />
          </div>
        )}

        <Container
          className={cn(
            "relative z-10",
            image && "flex min-h-[min(70vh,34rem)] items-end py-16 sm:py-20 lg:py-24",
          )}
        >
          <div className="relative max-w-2xl space-y-5 reveal-rise">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} className="mb-2" />
            )}
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading
              as="h1"
              size="display"
              className="text-ivory-50 !tracking-[-0.025em]"
            >
              {title}
            </Heading>
            {showBrandPhrase && (
              <BrandPhrase className="block text-gold-300">
                {site.brandPhrase}
              </BrandPhrase>
            )}
            <GoldCurveAccent variant="arc" className="w-40" />
            {description && (
              <Text size="lg" className="text-ivory-50/85 max-w-xl">
                {description}
              </Text>
            )}
            {showCta && (
              <div className="pt-2">
                <ButtonLink
                  href={site.cta.href}
                  variant="onNavy"
                  size="lg"
                  {...analyticsClickAttrs("book_consultation_click", "page_hero")}
                >
                  {site.cta.label}
                </ButtonLink>
              </div>
            )}
          </div>
        </Container>
      </div>
    </Section>
  );
}
