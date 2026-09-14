import {
  founderPortrait,
  founderPortraitSizes,
  type FounderPortraitSize,
} from "@/content/founder-media";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type FounderPortraitSlotProps = {
  className?: string;
  src?: string;
  width?: number;
  height?: number;
  size?: FounderPortraitSize;
  forceMonogram?: boolean;
  /** True only when this portrait is the primary above-the-fold image */
  priority?: boolean;
};

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3);
}

const sizeClasses: Record<FounderPortraitSize, string> = {
  hero: "max-w-lg w-full",
  feature: "max-w-md w-full",
  aside: "max-w-[12rem] w-full",
  avatar: "max-w-[3.5rem] w-14",
};

/**
 * Founder portrait with reserved 4:5 aspect ratio and responsive sizes.
 */
export function FounderPortraitSlot({
  className,
  src = founderPortrait.src,
  width = founderPortrait.width,
  height = founderPortrait.height,
  size = "feature",
  forceMonogram = false,
  priority = false,
}: FounderPortraitSlotProps) {
  const initials = initialsFromName(site.founder);
  const showImage = Boolean(src) && !forceMonogram;
  const isSvg = Boolean(src?.endsWith(".svg"));
  const isPlaceholder = founderPortrait.isPlaceholder && src === founderPortrait.src;
  const alt = isPlaceholder
    ? `Portrait placeholder for ${site.founder}, ${site.founderTitle}`
    : `Professional portrait of ${site.founder}, ${site.founderTitle}`;

  return (
    <figure
      className={cn(
        "founder-portrait-slot m-0 relative overflow-hidden",
        "border border-gold-500/40 bg-navy-900 shadow-[0_24px_60px_-28px_rgba(1,20,40,0.65)]",
        size === "avatar" ? "aspect-square rounded-full" : "aspect-[4/5] rounded-lg",
        sizeClasses[size],
        className,
      )}
      data-content-slot="founder-portrait"
      data-status={isPlaceholder || !showImage ? "awaiting-asset" : "ready"}
      data-portrait-size={size}
    >
      {showImage ? (
        <>
          <OptimizedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={founderPortraitSizes[size]}
            className={cn(
              "h-full w-full object-cover",
              size === "avatar" && "rounded-full",
            )}
            priority={priority}
            unoptimized={isSvg}
          />
          <figcaption className="sr-only">
            {site.founder}, {site.founderTitle}
            {isPlaceholder ? " (portrait photo pending)" : ""}
          </figcaption>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <span
            className={cn(
              "flex items-center justify-center rounded-full border border-gold-500/40 bg-navy-950 font-display font-semibold tracking-wide text-gold-300",
              size === "avatar" ? "h-full w-full text-sm" : "h-24 w-24 text-3xl",
            )}
            aria-hidden
          >
            {initials}
          </span>
          {size !== "avatar" && (
            <figcaption className="space-y-1">
              <p className="m-0 font-display text-xl font-semibold text-ivory-50">
                {site.founder}
              </p>
              <p className="m-0 font-sans text-sm text-ivory-50/75">
                {site.founderTitle}
              </p>
            </figcaption>
          )}
        </div>
      )}

      {(size === "feature" || size === "hero") && (
        <>
          <span
            className="pointer-events-none absolute right-4 top-4 h-10 w-10 border-r border-t border-gold-500/35"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-4 left-4 h-10 w-10 border-b border-l border-gold-500/35"
            aria-hidden
          />
        </>
      )}
    </figure>
  );
}
