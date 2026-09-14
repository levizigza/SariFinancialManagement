import { FounderPortraitSlot } from "@/components/sections/founder-portrait-slot";
import { TextLink } from "@/components/ui/text-link";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type FounderIdentityCardProps = {
  className?: string;
  /** compact = contact aside; inline = homepage hero attribution */
  variant?: "card" | "inline";
};

/**
 * Answers “Who will handle my financial information?” with verified identity only.
 */
export function FounderIdentityCard({
  className,
  variant = "card",
}: FounderIdentityCardProps) {
  if (variant === "inline") {
    return (
      <div
        className={cn(
          "m-0 flex flex-wrap items-center gap-3 font-sans text-sm text-ivory-50/80",
          className,
        )}
      >
        <FounderPortraitSlot size="avatar" className="shrink-0 border-gold-500/40" />
        <p className="m-0">
          Led by{" "}
          <TextLink href="/about" className="font-semibold">
            {site.founder}
          </TextLink>
          <span className="text-ivory-50/75">
            , {site.founderTitle}
          </span>
        </p>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "luxury-panel p-5 sm:p-7",
        "grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start",
        className,
      )}
      aria-labelledby="founder-identity-heading"
    >
      <FounderPortraitSlot size="aside" className="border-navy-800/15 mx-auto sm:mx-0" />
      <div className="space-y-3 text-center sm:text-left">
        <p className="m-0 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-navy-800">
          Who you’ll work with
        </p>
        <Heading as="h2" size="sm" id="founder-identity-heading">
          {site.founder}
        </Heading>
        <Text muted size="sm" className="!max-w-none">
          {site.founderTitle} at {site.name}. Consultations and client work are
          founder-led—scope is confirmed together before any engagement begins.
        </Text>
        <p className="m-0 font-sans text-sm text-navy-800">
          <TextLink href="/about">About {site.founder}</TextLink>
          {" · "}
          {site.location}
        </p>
      </div>
    </aside>
  );
}
