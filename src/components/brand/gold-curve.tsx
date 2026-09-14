import { cn } from "@/lib/cn";

type GoldCurveProps = React.ComponentProps<"svg"> & {
  /** Soft = lighter gold, lower opacity */
  soft?: boolean;
  /** Which curve silhouette */
  variant?: "sweep" | "arc" | "flourish";
};

/**
 * Decorative sweeping gold curves inspired by the business card.
 * Purely ornamental — aria-hidden; do not convey meaning.
 */
export function GoldCurve({
  soft = false,
  variant = "sweep",
  className,
  ...props
}: GoldCurveProps) {
  const path =
    variant === "arc"
      ? "M10 70 C 80 10, 180 10, 250 70"
      : variant === "flourish"
        ? "M8 55 C 40 10, 70 95, 110 40 S 170 5, 220 48 S 280 90, 312 42"
        : "M5 78 C 55 20, 120 15, 175 48 S 250 95, 315 28";

  return (
    <svg
      viewBox="0 0 320 100"
      width={320}
      height={100}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none select-none", className)}
      {...props}
    >
      <path
        d={path}
        className={cn("gold-curve-stroke", soft && "gold-curve-stroke--soft")}
      />
    </svg>
  );
}

type GoldCurveAccentProps = React.ComponentProps<"div"> & {
  soft?: boolean;
  variant?: GoldCurveProps["variant"];
  align?: "left" | "center" | "right";
};

/** Positioned curve accent under a heading or beside a hero */
export function GoldCurveAccent({
  soft = false,
  variant = "sweep",
  align = "left",
  className,
  ...props
}: GoldCurveAccentProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-40 sm:w-52 aspect-[320/100]",
        align === "center" && "mx-auto",
        align === "right" && "ml-auto",
        className,
      )}
      {...props}
    >
      <GoldCurve soft={soft} variant={variant} className="h-full w-full" />
    </div>
  );
}
