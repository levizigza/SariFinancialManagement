import { cn } from "@/lib/cn";

type SectionTone = "navy" | "ivory" | "white";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: SectionTone;
  /** Extra vertical rhythm for hero-scale bands */
  spacious?: boolean;
  /** Layered wash instead of flat surface color */
  atmosphere?: boolean;
};

export function Section({
  tone = "ivory",
  spacious = false,
  atmosphere = false,
  className,
  children,
  ...props
}: SectionProps) {
  const useAtmosphere = atmosphere && (tone === "navy" || tone === "ivory");

  return (
    <section
      data-surface={tone}
      className={cn(
        "relative isolate",
        useAtmosphere && tone === "navy" && "atmosphere-navy surface-navy text-ivory-50",
        useAtmosphere && tone === "ivory" && "atmosphere-ivory surface-ivory text-navy-900",
        !useAtmosphere && tone === "navy" && "surface-navy bg-surface-navy text-ivory-50",
        !useAtmosphere && tone === "ivory" && "surface-ivory bg-surface-ivory text-navy-900",
        !useAtmosphere && tone === "white" && "surface-white bg-surface-white text-navy-900",
        spacious ? "py-20 sm:py-28 lg:py-36" : "py-14 sm:py-16 lg:py-24",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
