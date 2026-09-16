import Link from "next/link";
import {
  JsonLd,
  buildBreadcrumbListJsonLd,
} from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  /** Path for links and BreadcrumbList item URLs, e.g. "/services" */
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
  /** Emit BreadcrumbList JSON-LD matching visible crumbs */
  withJsonLd?: boolean;
};

export function Breadcrumbs({
  items,
  className,
  withJsonLd = true,
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const jsonLd = withJsonLd
    ? buildBreadcrumbListJsonLd(
        items.map((item) => ({
          name: item.label,
          path: item.href,
        })),
      )
    : null;

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className={cn("font-sans text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 list-none m-0 p-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-ivory-50/55 [[data-surface=ivory]_&]:text-navy-800/40 [[data-surface=white]_&]:text-navy-800/40"
                  >
                    /
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-ivory-50 no-underline hover:text-gold-300 transition-colors [[data-surface=ivory]_&]:text-navy-800 [[data-surface=ivory]_&]:hover:text-navy-900 [[data-surface=white]_&]:text-navy-800 [[data-surface=white]_&]:hover:text-navy-900 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 [[data-surface=ivory]_&]:focus-visible:outline-navy-800 [[data-surface=white]_&]:focus-visible:outline-navy-800"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-ivory-50 [[data-surface=ivory]_&]:text-navy-900 [[data-surface=white]_&]:text-navy-900 font-medium"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

type BreadcrumbBarProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

/** Ivory bar for interior pages sitting above page heroes or content */
export function BreadcrumbBar({ items, className }: BreadcrumbBarProps) {
  return (
    <div
      data-surface="ivory"
      className={cn("surface-ivory border-b border-navy-800/10 bg-surface-ivory", className)}
    >
      <Container className="py-3">
        <Breadcrumbs items={items} />
      </Container>
    </div>
  );
}
