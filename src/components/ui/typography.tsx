import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

type HeadingProps = React.ComponentProps<"h1"> & {
  as?: HeadingLevel;
  size?: "display" | "xl" | "lg" | "md" | "sm";
};

const sizeClasses = {
  display:
    "text-[var(--type-display)] font-semibold tracking-[-0.02em] leading-[1.08]",
  xl: "text-[var(--type-xl)] font-semibold tracking-tight leading-[1.12]",
  lg: "text-[var(--type-lg)] font-semibold leading-snug",
  md: "text-xl sm:text-2xl font-semibold",
  sm: "text-lg sm:text-xl font-semibold",
};

export function Heading({
  as: Tag = "h2",
  size = "lg",
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag className={cn("font-display text-balance", sizeClasses[size], className)} {...props}>
      {children}
    </Tag>
  );
}

type TextProps = React.ComponentProps<"p"> & {
  muted?: boolean;
  size?: "base" | "lg" | "sm";
};

const textSize = {
  lg: "text-lg sm:text-xl leading-relaxed",
  base: "text-base sm:text-[1.0625rem] leading-relaxed",
  sm: "text-sm sm:text-[0.9375rem] leading-relaxed",
};

export function Text({
  muted = false,
  size = "base",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "font-sans max-w-prose",
        textSize[size],
        muted && "text-navy-800 [[data-surface=navy]_&]:text-ivory-50/80",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

type EyebrowProps = React.ComponentProps<"p">;

/** Small sans label above a heading — never gold on white */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-sans text-[0.8125rem] sm:text-sm font-semibold uppercase tracking-[0.14em]",
        "text-navy-800 [[data-surface=navy]_&]:text-gold-300",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
