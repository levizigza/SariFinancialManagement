import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/content/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <p
      className="m-0 font-sans text-sm text-navy-900"
      aria-label={`Rated ${rating} out of 5`}
    >
      <span aria-hidden="true" className="tracking-wide text-navy-800">
        {"★".repeat(rating)}
        <span className="text-navy-800/30">{"★".repeat(5 - rating)}</span>
      </span>
    </p>
  );
}

function sourceLabel(source: Testimonial["source"]) {
  switch (source) {
    case "google":
      return "Google review";
    case "email":
      return "Client email";
    case "letter":
      return "Written testimonial";
    case "manual":
      return "Approved testimonial";
    default:
      return "Client feedback";
  }
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-4 rounded-lg border border-navy-800/12 bg-surface-white p-6 sm:p-7 m-0",
        className,
      )}
    >
      {typeof testimonial.rating === "number" && (
        <StarRating rating={testimonial.rating} />
      )}

      <blockquote className="m-0 flex-1">
        <p className="m-0 font-display text-xl sm:text-2xl font-semibold leading-snug text-navy-900 text-balance">
          “{testimonial.quote}”
        </p>
      </blockquote>

      <figcaption className="space-y-1 border-t border-navy-800/10 pt-4">
        <p className="m-0 font-sans text-sm font-semibold text-navy-900">
          {testimonial.name}
        </p>
        {testimonial.businessOrRole && (
          <p className="m-0 font-sans text-sm text-blue-muted">
            {testimonial.businessOrRole}
          </p>
        )}
        <p className="m-0 font-sans text-xs text-blue-muted pt-1">
          {testimonial.sourceUrl ? (
            <TextLink
              href={testimonial.sourceUrl}
              className="text-xs"
              rel="noopener noreferrer"
              target="_blank"
            >
              {sourceLabel(testimonial.source)}
              <span className="sr-only"> (opens in a new tab)</span>
            </TextLink>
          ) : (
            sourceLabel(testimonial.source)
          )}
        </p>
      </figcaption>
    </figure>
  );
}
