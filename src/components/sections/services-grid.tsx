import { ServiceCard } from "@/components/sections/service-card";
import { cn } from "@/lib/cn";
import { services, type Service } from "@/lib/site";

type ServicesGridProps = {
  items?: readonly Service[];
  className?: string;
  labelledBy?: string;
  headingLevel?: "h2" | "h3";
  showJourney?: boolean;
  /** Quieter cards for homepage scan */
  homepage?: boolean;
};

/**
 * Accessible services grid — ordered as an optional customer progression.
 */
export function ServicesGrid({
  items = services,
  className,
  labelledBy,
  headingLevel = "h3",
  showJourney = true,
  homepage = false,
}: ServicesGridProps) {
  return (
    <ul
      role="list"
      aria-labelledby={labelledBy}
      className={cn(
        "grid list-none m-0 p-0 gap-5 sm:grid-cols-2",
        homepage && "gap-0 sm:gap-5",
        className,
      )}
    >
      {items.map((service) => (
        <li key={service.slug} className="min-w-0">
          <ServiceCard
            service={service}
            headingLevel={headingLevel}
            showJourney={showJourney}
            stepNumber={service.journey.order}
            compact={homepage}
          />
        </li>
      ))}
    </ul>
  );
}
