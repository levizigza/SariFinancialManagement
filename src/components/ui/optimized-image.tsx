import Image, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";

type OptimizedImageProps = Omit<ImageProps, "alt" | "loader"> & {
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
 *
 * On GitHub Pages, public `/images/...` paths are prefixed with basePath because
 * unoptimized static export does not rewrite them automatically.
 */
export function OptimizedImage({
  alt,
  priority = false,
  className,
  sizes,
  unoptimized,
  src,
  ...props
}: OptimizedImageProps) {
  const isFill = "fill" in props && props.fill;
  const resolvedSrc =
    typeof src === "string" ? withBasePath(src) : src;
  const isSvg =
    typeof resolvedSrc === "string" &&
    resolvedSrc.split("?")[0]?.toLowerCase().endsWith(".svg");

  return (
    <Image
      alt={alt}
      src={resolvedSrc}
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
