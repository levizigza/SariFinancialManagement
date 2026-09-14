import Link from "next/link";
import { cn } from "@/lib/cn";
import { services } from "@/lib/site";

type ServiceJourneyRailProps = {
  className?: string;
  compact?: boolean;
};

/**
 * Subtle Organize → Operate → Prepare → Understand & Plan progression.
 * Gold path metaphor — not four heavy bordered tiles.
 */
export function ServiceJourneyRail({
  className,
  compact = false,
}: ServiceJourneyRailProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        {/* Continuous path on desktop */}
        <svg
          className="pointer-events-none absolute left-[6%] right-[6%] top-[1.35rem] hidden h-3 w-[88%] sm:block"
          viewBox="0 0 1000 12"
          preserveAspectRatio="none"
          aria-hidden
          focusable="false"
        >
          <path
            d="M10 6 C 180 2, 320 10, 500 6 S 820 2, 990 6"
            fill="none"
            stroke="color-mix(in srgb, var(--gold-500) 45%, transparent)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>

        <ol
          className={cn(
            "relative m-0 flex list-none flex-col gap-4 p-0 sm:flex-row sm:items-start sm:gap-0",
          )}
          aria-label="Optional service progression from organize to plan"
        >
          {services.map((service, index) => (
            <li
              key={service.slug}
              className={cn(
                "relative flex min-w-0 flex-1 flex-col items-start sm:items-center sm:text-center",
                !compact && "sm:px-2",
              )}
            >
              <Link
                href={service.href}
                className={cn(
                  "group flex min-h-11 w-full flex-col gap-2 no-underline sm:items-center",
                  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800",
                  compact ? "py-1" : "py-1",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex h-7 w-7 items-center justify-center rounded-full",
                    "border border-gold-500/50 bg-surface-ivory font-sans text-[0.65rem] font-semibold text-navy-900",
                    "group-hover:border-gold-500 group-hover:bg-white",
                  )}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-navy-800 group-hover:text-navy-950">
                  {service.journey.label}
                </span>
                <span className="font-display text-lg font-semibold text-navy-900 group-hover:text-navy-800 sm:text-xl">
                  {service.name}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      {!compact && (
        <p className="m-0 max-w-2xl font-sans text-sm text-navy-800">
          An optional path—not a package requirement. Start with the service that
          matches where you are today.
        </p>
      )}
    </div>
  );
}
