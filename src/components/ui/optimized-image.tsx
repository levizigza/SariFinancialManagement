import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

type OptimizedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  /**
   * Set true only for the primary above-the-fold LCP image.
   * Never combine with lazy loading (Next sets loading=eager when priority).
   */
  priority?: boolean;
};

/**
 * Responsive next/image wrapper with modern formats (AVIF/WebP via next.config).
 * Always require alt; reserve space via width/height or fill + sized parent.
 */
export function OptimizedImage({
  alt,
  priority = false,
  className,
  sizes,
  unoptimized,
  ...props
}: OptimizedImageProps) {
  const isFill = "fill" in props && props.fill;
  const src = "src" in props ? props.src : undefined;
  const isSvg =
    typeof src === "string" && src.split("?")[0]?.toLowerCase().endsWith(".svg");

  return (
    <Image
      alt={alt}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      sizes={sizes ?? (isFill ? "100vw" : undefined)}
      /* SVG placeholders skip the optimizer; photos still get AVIF/WebP. */
      unoptimized={unoptimized ?? isSvg}
      className={cn(className)}
      {...props}
    />
  );
}
