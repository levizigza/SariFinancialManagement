import Link from "next/link";
import { GoldCurveAccent } from "@/components/brand/gold-curve";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { TextLink } from "@/components/ui/text-link";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { cn } from "@/lib/cn";
import { footerNav, site } from "@/lib/site";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      data-surface="navy"
      className={cn("atmosphere-navy text-ivory-50", className)}
    >
      <Container className="py-14 sm:py-16">
        <GoldCurveAccent soft variant="flourish" className="mb-8 w-48 opacity-90" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="m-0 font-display text-2xl font-semibold tracking-tight text-ivory-50">
              {site.name}
            </p>
            <p className="m-0 max-w-sm font-sans text-sm text-ivory-50/75">
              {site.brandPhrase}
              <span className="text-gold-500/50"> · </span>
              {site.values.join(" · ")}
            </p>
            <p className="m-0 pt-3 font-sans text-sm text-ivory-50/75">
              Led by {site.founder}
              <br />
              Serving {site.location}, Canada
            </p>
            <p className="m-0 font-sans text-sm">
              <TextLink
                href={site.phoneHref}
                {...analyticsClickAttrs("phone_click", "footer")}
              >
                {site.phoneDisplay}
              </TextLink>
            </p>
            <p className="m-0 font-sans text-sm">
              <TextLink
                href={site.emailHref}
                {...analyticsClickAttrs("email_click", "footer")}
              >
                {site.email}
              </TextLink>
            </p>
          </div>

          <FooterNavGroup title="Explore" items={footerNav.explore} />
          <FooterNavGroup
            title="Services"
            items={footerNav.services}
            showJourney
          />
          <FooterNavGroup title="Legal" items={footerNav.legal} />
        </div>

        <Divider tone="onNavy" className="my-10" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 font-sans text-xs text-ivory-50/70">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="m-0 font-sans text-xs text-ivory-50/70">
            <Link
              href={site.cta.href}
              className="inline-flex min-h-11 items-center rounded-sm text-gold-300 no-underline hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
              {...analyticsClickAttrs("book_consultation_click", "footer")}
            >
              {site.cta.label}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterNavGroup({
  title,
  items,
  showJourney = false,
}: {
  title: string;
  items: readonly { label: string; href: string; journeyLabel?: string }[];
  showJourney?: boolean;
}) {
  const headingId = `footer-nav-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <nav aria-labelledby={headingId}>
      <p
        id={headingId}
        className="m-0 mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-gold-300"
      >
        {title}
      </p>
      <ul className="m-0 list-none space-y-2.5 p-0">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-sm font-sans text-sm text-ivory-50/85 no-underline hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
            >
              {item.label}
              {showJourney && item.journeyLabel ? (
                <span className="ml-2 text-xs text-ivory-50/75">
                  {item.journeyLabel}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
