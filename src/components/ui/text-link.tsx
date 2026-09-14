import { cn } from "@/lib/cn";

type TextLinkProps = React.ComponentProps<"a">;

/** Inline text link with visible hover underline and strong focus */
export function TextLink({ className, children, ...props }: TextLinkProps) {
  return (
    <a
      className={cn(
        "text-link font-sans font-medium underline-offset-[0.2em]",
        "text-navy-800 decoration-navy-800/35 hover:underline hover:decoration-navy-800",
        "[[data-surface=navy]_&]:text-gold-300 [[data-surface=navy]_&]:decoration-gold-300/40",
        "[[data-surface=navy]_&]:hover:decoration-gold-300",
        "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-navy-800 [[data-surface=navy]_&]:focus-visible:outline-gold-300",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
