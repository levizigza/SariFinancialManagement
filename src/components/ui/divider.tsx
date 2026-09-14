import { cn } from "@/lib/cn";

type DividerProps = React.ComponentProps<"hr"> & {
  tone?: "onNavy" | "onIvory";
};

export function Divider({ tone = "onIvory", className, ...props }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0 h-px w-full",
        tone === "onNavy" ? "bg-gold-500/35" : "bg-navy-800/15",
        className,
      )}
      {...props}
    />
  );
}
