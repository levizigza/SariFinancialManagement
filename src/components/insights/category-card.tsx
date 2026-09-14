import Link from "next/link";
import type { InsightCategory } from "@/content/insights";
import { cn } from "@/lib/cn";

type CategoryCardProps = {
  category: InsightCategory;
  articleCountLabel?: string;
  className?: string;
};

export function InsightCategoryCard({
  category,
  articleCountLabel,
  className,
}: CategoryCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-navy-800/12 bg-surface-white p-6",
        className,
      )}
    >
      <h3 className="m-0 font-display text-2xl font-semibold text-navy-900">
        <Link
          href={category.href}
          className="no-underline text-inherit hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
        >
          {category.name}
        </Link>
      </h3>
      <p className="m-0 flex-1 font-sans text-sm leading-relaxed text-navy-900">
        {category.description}
      </p>
      <p className="m-0 font-sans text-xs text-navy-800">
        Focus: {category.jurisdictionFocus.join(" · ")}
      </p>
      {articleCountLabel && (
        <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-900">
          {articleCountLabel}
        </p>
      )}
      <p className="m-0 pt-1">
        <Link
          href={category.href}
          className="font-sans text-sm font-semibold text-navy-900 no-underline underline-offset-[0.2em] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
        >
          Explore {category.shortName.toLowerCase()} insights
        </Link>
      </p>
    </article>
  );
}
