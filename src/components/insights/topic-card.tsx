import Link from "next/link";
import type { InsightArticle } from "@/content/insights";
import { getInsightCategory } from "@/content/insights";
import { cn } from "@/lib/cn";

type TopicCardProps = {
  article: InsightArticle;
  /** planned vs published presentation */
  variant?: "planned" | "published";
  className?: string;
};

export function InsightTopicCard({
  article,
  variant = article.status === "published" ? "published" : "planned",
  className,
}: TopicCardProps) {
  const category = getInsightCategory(article.category);
  const href =
    variant === "published" && category
      ? `${category.href}/${article.slug}`
      : undefined;

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-3 rounded-lg border border-navy-800/12 bg-surface-white p-5 sm:p-6",
        variant === "planned" && "border-dashed",
        className,
      )}
    >
      <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-navy-800">
        {category?.name ?? article.category}
        {variant === "planned" ? " · Planned" : ""}
        {article.requiresProfessionalReview ? " · Review required" : ""}
      </p>

      <h3 className="m-0 font-display text-xl font-semibold text-navy-900 text-balance">
        {href ? (
          <Link
            href={href}
            className="no-underline text-inherit hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 rounded-sm"
          >
            {article.title}
          </Link>
        ) : (
          article.clientQuestion
        )}
      </h3>

      <p className="m-0 flex-1 font-sans text-sm leading-relaxed text-navy-900">
        {article.description}
      </p>

      {href ? (
        <p className="m-0">
          <Link
            href={href}
            className="font-sans text-sm font-semibold text-navy-900 no-underline hover:underline"
          >
            Read article
          </Link>
        </p>
      ) : (
        <p className="m-0 font-sans text-sm text-blue-muted">
          Related:{" "}
          <Link
            href={article.relatedServiceHref}
            className="font-semibold text-navy-900 no-underline hover:underline"
          >
            {category?.name ?? "Services"}
          </Link>
        </p>
      )}
    </article>
  );
}
