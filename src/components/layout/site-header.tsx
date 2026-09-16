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
 * Compact brand label on the narrowest phones so CTA + menu stay usable.
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
      <Container className="relative flex min-h-[4.25rem] items-center gap-2 sm:gap-3 py-2 sm:min-h-[4.5rem] xl:min-h-[4.75rem] xl:gap-4">
        <Link
          href="/"
          className="group inline-flex min-h-11 min-w-0 max-w-[min(58%,14rem)] shrink flex-col justify-center rounded-sm no-underline sm:max-w-[16rem] md:max-w-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
        >
          <span className="font-display text-base font-semibold tracking-tight text-ivory-50 transition-colors duration-200 group-hover:text-gold-300 sm:text-lg md:text-xl xl:text-[1.35rem]">
            <span className="sm:hidden">Sari Financial</span>
            <span className="hidden sm:inline">{site.name}</span>
          </span>
          <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-300 sm:text-[0.68rem] sm:tracking-[0.2em] md:text-[0.72rem]">
            {site.brandPhrase}
          </span>
        </Link>

        <MainNav />
      </Container>
    </header>
  );
}
