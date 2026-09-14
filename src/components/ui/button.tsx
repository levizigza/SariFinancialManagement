import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onNavy"
  | "onNavySecondary";
type ButtonSize = "md" | "lg" | "sm";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * Semantic btn-* classes pair with globals.css color locks.
 * Global `a { color: inherit }` otherwise paints navy text onto navy fills.
 */
const variantClasses: Record<ButtonVariant, string> = {
  /** Navy fill — use on ivory/white surfaces */
  primary:
    "btn-primary bg-navy-900 text-ivory-50 hover:bg-navy-800 active:bg-navy-950 border border-transparent",
  /** Outline on light surfaces */
  secondary:
    "btn-secondary bg-transparent text-navy-900 border border-navy-800/30 hover:border-navy-800 hover:bg-navy-900/[0.04] active:bg-navy-900/[0.07]",
  ghost:
    "btn-ghost bg-transparent text-navy-900 border border-transparent hover:bg-navy-900/[0.05] active:bg-navy-900/[0.08]",
  /**
   * Gold fill on navy — navy text for contrast.
   */
  onNavy:
    "btn-on-navy bg-gold-500 text-navy-950 hover:bg-gold-300 active:bg-gold-500 border border-gold-300/30 shadow-[0_10px_30px_-12px_rgba(196,163,106,0.55)]",
  /** Outline / ghost CTA on navy surfaces */
  onNavySecondary:
    "btn-on-navy-secondary bg-transparent text-ivory-50 border border-gold-500/45 hover:border-gold-300 hover:bg-white/5 active:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  /** 44px min height — WCAG 2.2 target size (2.5.8+) / comfortable touch */
  sm: "min-h-11 h-11 px-4 text-sm gap-1.5",
  md: "min-h-11 h-11 px-5 text-[0.9375rem] gap-2",
  lg: "min-h-12 h-12 px-7 text-base gap-2",
};

function focusOutline(variant: ButtonVariant) {
  return variant === "onNavy" || variant === "onNavySecondary"
    ? "focus-visible:outline-gold-300"
    : "focus-visible:outline-navy-800";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-sans font-semibold",
        "transition-[background-color,border-color,color] duration-200 ease-out",
        "disabled:pointer-events-none disabled:opacity-45",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3",
        focusOutline(variant),
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = React.ComponentProps<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-md font-sans font-semibold no-underline",
        "transition-[background-color,border-color,color] duration-200 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3",
        focusOutline(variant),
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
