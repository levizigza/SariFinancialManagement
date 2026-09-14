import { cn } from "@/lib/cn";

/**
 * Handwritten accent for very short decorative phrases only.
 * Do not use for body copy, navigation, or long sentences.
 *
 * Color rule: gold-300 is for navy surfaces only. On ivory/white the component
 * switches to navy-800. Never use gold-500 (#CEA15D) as ordinary small text on
 * a light background — contrast fails WCAG AA (~2.3:1).
 */
type BrandPhraseProps = {
  as?: "span" | "p" | "em";
  className?: string;
  children: React.ReactNode;
};

export function BrandPhrase({
  as: Tag = "span",
  className,
  children,
}: BrandPhraseProps) {
  return (
    <Tag
      className={cn(
        "font-script text-[1.65em] sm:text-[1.85em] leading-none",
        /* Default gold-300 assumes navy parent; surface attrs force AA-safe navy on light */
        "text-gold-300 [[data-surface=ivory]_&]:text-navy-800 [[data-surface=white]_&]:text-navy-800",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
