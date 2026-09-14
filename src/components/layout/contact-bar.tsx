import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { analyticsClickAttrs } from "@/lib/analytics/events";
import { site } from "@/lib/site";

/** Compact contact strip — phone & email always one tap away */
export function ContactBar() {
  return (
    <div
      data-surface="navy"
      className="surface-navy border-b border-gold-500/25 bg-navy-900/95"
    >
      <Container className="flex min-h-10 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1 font-sans text-sm">
        <p className="m-0 py-1.5 tracking-wide text-ivory-50/70">
          <span className="text-gold-300/90">{site.location}</span>
          <span className="mx-2 text-gold-500/40" aria-hidden>
            ·
          </span>
          <span className="hidden sm:inline">Founder-led financial management</span>
        </p>
        <p className="m-0 flex flex-wrap items-center gap-x-1 gap-y-1">
          <TextLink
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center px-1 font-medium"
            {...analyticsClickAttrs("phone_click", "contact_bar")}
          >
            {site.phoneDisplay}
          </TextLink>
          <span className="text-gold-500/35 px-1" aria-hidden>
            |
          </span>
          <TextLink
            href={site.emailHref}
            className="inline-flex min-h-11 items-center break-all px-1"
            {...analyticsClickAttrs("email_click", "contact_bar")}
          >
            {site.email}
          </TextLink>
        </p>
      </Container>
    </div>
  );
}
