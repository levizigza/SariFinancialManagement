import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type SiteHeaderProps = {
  className?: string;
};

/**
 * Brand-first sticky header — Sari Financial Management / More Than Numbers first.
 * Phone + consultation CTA stay in the main bar (no separate utility strip).
 */
export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      data-surface="navy"
      className={cn(
        "site-header surface-navy sticky top-0 z-50 border-b border-gold-500/30 bg-navy-950/95 backdrop-blur-md",
        className,
      )}
    >
      <Container className="relative flex min-h-[4.5rem] items-center gap-4 py-2 lg:min-h-[4.75rem]">
        <Link
          href="/"
          className="group inline-flex min-h-11 shrink-0 flex-col justify-center rounded-sm no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
        >
          <span className="font-display text-lg font-semibold tracking-tight text-ivory-50 transition-colors duration-200 group-hover:text-gold-300 sm:text-xl lg:text-[1.35rem]">
            {site.name}
          </span>
          <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-300 sm:text-[0.72rem]">
            {site.brandPhrase}
          </span>
        </Link>

        <MainNav />
      </Container>
    </header>
  );
}
