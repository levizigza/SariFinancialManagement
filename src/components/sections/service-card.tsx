import Link from "next/link";
import { ServiceIcon } from "@/components/brand/service-icon";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/site";

type ServiceCardProps = {
  service: Service;
  className?: string;
  headingLevel?: "h2" | "h3";
  showJourney?: boolean;
  stepNumber?: number;
  /** Homepage: emphasize Best for + Outcome; quieter chrome */
  compact?: boolean;
};

export function ServiceCard({
  service,
  className,
  headingLevel = "h3",
  showJourney = true,
  stepNumber,
  compact = false,
}: ServiceCardProps) {
  const Title = headingLevel;
  const step =
    stepNumber ??
    (typeof service.journey.order === "number" ? service.journey.order : undefined);

  return (
    <article
      className={cn(
        "group flex h-full flex-col gap-5",
        compact
          ? "border-b border-navy-800/10 bg-transparent py-7 sm:border sm:border-gold-500/15 sm:bg-white/70 sm:px-7 sm:py-8 sm:rounded-lg sm:shadow-[0_18px_40px_-28px_rgba(1,15,31,0.35)]"
          : [
              "rounded-lg border border-gold-500/15 bg-white/80 p-6 sm:p-8",
              "shadow-[0_18px_40px_-28px_rgba(1,15,31,0.28)]",
              "transition-[border-color,box-shadow] duration-200",
              "hover:border-gold-500/30 hover:shadow-[0_22px_48px_-26px_rgba(1,15,31,0.4)]",
              "focus-within:border-gold-500/35",
            ],
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-md",
            "border border-gold-500/35 bg-navy-950 text-gold-300",
            compact ? "h-11 w-11" : "h-12 w-12",
          )}
          aria-hidden="true"
        >
          <ServiceIcon slug={service.slug} />
        </span>

        <div className="min-w-0 space-y-1 pt-0.5">
          {showJourney && (
            <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy-800">
              {typeof step === "number" && (
                <span className="text-navy-900" aria-hidden>
                  {String(step).padStart(2, "0")}
                </span>
              )}
              <span>{service.journey.label}</span>
            </p>
          )}
          <Title className="font-display text-2xl font-semibold text-navy-900 m-0">
            <Link
              href={service.href}
              className="no-underline text-inherit rounded-sm hover:text-navy-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
            >
              {service.name}
            </Link>
          </Title>
        </div>
      </div>

      <dl className="m-0 flex flex-1 flex-col gap-4">
        <div className="space-y-1">
          <dt className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-800 m-0">
            Best for
          </dt>
          <dd className="font-sans text-[1.0625rem] leading-relaxed text-navy-900 m-0">
            {service.bestFor}
          </dd>
        </div>

        {!compact && (
          <>
            <div className="space-y-1">
              <dt className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-800 m-0">
                What it is
              </dt>
              <dd className="font-sans text-[1.0625rem] leading-relaxed text-navy-900 m-0">
                {service.what}
              </dd>
            </div>

            <div className="space-y-1">
              <dt className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-800 m-0">
                The challenge
              </dt>
              <dd className="font-sans text-[1.0625rem] leading-relaxed text-navy-900 m-0">
                {service.problem}
              </dd>
            </div>
          </>
        )}

        <div className="space-y-1">
          <dt className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-800 m-0">
            The outcome
          </dt>
          <dd className="font-sans text-[1.0625rem] leading-relaxed text-navy-900 m-0">
            {service.outcome}
          </dd>
        </div>
      </dl>

      <p className="m-0 pt-1">
        <Link
          href={service.href}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold text-navy-900",
            "no-underline underline-offset-[0.2em] hover:underline",
            "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800",
          )}
        >
          Learn more
          <span
            aria-hidden="true"
            className="text-navy-800 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
          <span className="sr-only"> about {service.name}</span>
        </Link>
      </p>
    </article>
  );
}
