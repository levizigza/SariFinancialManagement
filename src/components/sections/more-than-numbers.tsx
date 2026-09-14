import { BrandPhrase } from "@/components/brand/brand-phrase";
import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { Container } from "@/components/ui/container";
import { MotionInView } from "@/components/ui/motion-in-view";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/typography";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const stages = [
  {
    id: "organized-books",
    number: "01",
    label: "Organized Books",
    support: "Clear records. A true picture of where you stand.",
  },
  {
    id: "smarter-decisions",
    number: "02",
    label: "Smarter Decisions",
    support: "Information you can trust when choices matter.",
  },
  {
    id: "stronger-business",
    number: "03",
    label: "Stronger Business",
    support: "Confidence to operate, plan, and grow with clarity.",
  },
] as const;

/**
 * Signature homepage visual: Organized Books → Smarter Decisions → Stronger Business.
 * Semantic text + CSS/SVG motion; path draws once on enter.
 */
export function MoreThanNumbersSection() {
  return (
    <Section
      tone="navy"
      spacious
      className="financial-journey overflow-hidden content-visibility-auto"
      aria-labelledby="financial-journey-heading"
    >
      <MotionInView once rootMargin="80px 0px">
        <Container className="relative">
          {/* Soft ambient curves — decorative only */}
          <div
            className="pointer-events-none absolute -right-20 -top-8 w-[20rem] opacity-[0.22] sm:w-[28rem] financial-journey__drift"
            aria-hidden
          >
            <GoldCurveAccent soft variant="flourish" className="w-full" />
          </div>
          <div
            className="pointer-events-none absolute -left-24 bottom-4 w-56 opacity-[0.16] sm:w-72 financial-journey__drift financial-journey__drift--delay"
            aria-hidden
          >
            <GoldCurveAccent soft variant="sweep" className="w-full" />
          </div>

          <div className="relative space-y-14 lg:space-y-16">
            <header className="mx-auto max-w-2xl space-y-5 text-center">
              <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold-300/90">
                The financial journey
              </p>

              <h2
                id="financial-journey-heading"
                className="m-0 font-display text-[clamp(1.65rem,3.5vw,2.25rem)] font-semibold tracking-tight text-ivory-50/90 text-balance"
              >
                <span className="sr-only">
                  {site.supporting.organized}
                </span>
                <span aria-hidden="true" className="block">
                  From clarity in the books to strength in the business
                </span>
              </h2>

              <div className="flex justify-center">
                <BrandPhrase className="block text-gold-300/85 text-[clamp(1.35rem,2.8vw,1.85rem)] leading-none">
                  {site.brandPhrase}
                </BrandPhrase>
              </div>
            </header>

            {/* Three-stage editorial journey */}
            <div className="relative">
              {/* Desktop: sweeping connector inspired by business-card curves */}
              <div
                className="pointer-events-none absolute inset-x-0 top-[42%] hidden -translate-y-1/2 lg:block"
                aria-hidden="true"
              >
                <svg
                  className="financial-journey__canvas mx-auto h-auto w-full max-w-5xl"
                  viewBox="0 0 1200 200"
                  width={1200}
                  height={200}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                >
                  {/* Soft underlay curve */}
                  <path
                    d="M40 130 C 160 40, 280 35, 400 95 S 560 185, 600 110 S 720 25, 820 85 S 980 175, 1160 70"
                    className="financial-journey__path financial-journey__path--soft"
                    pathLength={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Primary champagne path */}
                  <path
                    d="M40 130 C 160 40, 280 35, 400 95 S 560 185, 600 110 S 720 25, 820 85 S 980 175, 1160 70"
                    className="financial-journey__path"
                    pathLength={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Stage nodes along the path */}
                  <circle
                    cx="120"
                    cy="108"
                    r="5"
                    className="financial-journey__node"
                    style={{ animationDelay: "0.55s" }}
                  />
                  <circle
                    cx="600"
                    cy="118"
                    r="5"
                    className="financial-journey__node"
                    style={{ animationDelay: "0.85s" }}
                  />
                  <circle
                    cx="1080"
                    cy="88"
                    r="5"
                    className="financial-journey__node"
                    style={{ animationDelay: "1.15s" }}
                  />
                </svg>
              </div>

              {/* Mobile: vertical flourish rail */}
              <div
                className="pointer-events-none absolute bottom-8 left-5 top-8 w-10 sm:left-8 lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="h-full w-full"
                  viewBox="0 0 40 520"
                  width={40}
                  height={520}
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                >
                  <path
                    d="M22 8 C 8 70, 34 120, 18 180 S 30 280, 16 340 S 28 430, 20 510"
                    className="financial-journey__path"
                    pathLength={1}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="20"
                    cy="40"
                    r="4"
                    className="financial-journey__node"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <circle
                    cx="18"
                    cy="250"
                    r="4"
                    className="financial-journey__node"
                    style={{ animationDelay: "0.85s" }}
                  />
                  <circle
                    cx="20"
                    cy="460"
                    r="4"
                    className="financial-journey__node"
                    style={{ animationDelay: "1.15s" }}
                  />
                </svg>
              </div>

              <ol
                className="relative m-0 grid list-none grid-cols-1 gap-12 p-0 pl-14 sm:pl-16 lg:grid-cols-3 lg:gap-10 lg:pl-0"
                aria-label={site.supporting.organized}
              >
                {stages.map((stage, index) => (
                  <li
                    key={stage.id}
                    className={cn(
                      "financial-journey__stage relative",
                      "flex flex-col gap-4",
                      "lg:items-center lg:text-center",
                      index === 1 && "lg:pt-10",
                      index === 2 && "lg:pt-2",
                    )}
                    style={{ animationDelay: `${0.45 + index * 0.28}s` }}
                  >
                    <p className="m-0 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-gold-300">
                      <span aria-hidden="true">{stage.number}</span>
                      <span className="sr-only">Stage {stage.number}</span>
                    </p>

                    <p
                      className={cn(
                        "m-0 font-display font-semibold tracking-tight text-ivory-50 text-balance",
                        "text-[clamp(2.15rem,5.5vw,3.35rem)] leading-[1.08]",
                      )}
                    >
                      {stage.label}
                    </p>

                    <Text
                      size="sm"
                      className="m-0 max-w-[16rem] text-ivory-50/80 lg:mx-auto"
                    >
                      {stage.support}
                    </Text>

                    {index < stages.length - 1 && (
                      <span className="sr-only">leads to</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <footer className="border-t border-gold-500/20 pt-8 text-center">
              <p className="m-0 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-ivory-50/70">
                {site.values.map((value, i) => (
                  <span key={value}>
                    {i > 0 && (
                      <span className="mx-2 text-gold-500/45" aria-hidden>
                        ·
                      </span>
                    )}
                    <span className="text-gold-300">{value}</span>
                  </span>
                ))}
              </p>
            </footer>
          </div>
        </Container>
      </MotionInView>
    </Section>
  );
}
