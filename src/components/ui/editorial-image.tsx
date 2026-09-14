import { OptimizedImage } from "@/components/ui/optimized-image";
import type { StockPhoto } from "@/content/stock-media";
import { cn } from "@/lib/cn";

type EditorialImageProps = {
  photo: StockPhoto;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Soft navy wash for text overlays */
  overlay?: "none" | "navy-left" | "navy-bottom" | "navy-full";
  showCredit?: boolean;
};

const overlayClasses = {
  none: "",
  "navy-left":
    "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-r after:from-navy-950/72 after:via-navy-950/38 after:to-navy-950/12",
  "navy-bottom":
    "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-navy-950/70 after:via-navy-950/18 after:to-transparent",
  "navy-full":
    "after:pointer-events-none after:absolute after:inset-0 after:bg-navy-950/32",
} as const;

/**
 * Editorial photography frame — stock or client assets.
 * Credits are optional visually; alt text always required via StockPhoto.
 */
export function EditorialImage({
  photo,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlay = "none",
  showCredit = false,
}: EditorialImageProps) {
  return (
    <figure
      className={cn(
        "relative m-0 overflow-hidden",
        overlay !== "none" && overlayClasses[overlay],
        className,
      )}
    >
      <OptimizedImage
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
      {showCredit && (
        <figcaption className="sr-only">
          {photo.credit}. {photo.creditUrl}
        </figcaption>
      )}
    </figure>
  );
}
