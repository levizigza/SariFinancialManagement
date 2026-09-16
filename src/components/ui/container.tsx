import { cn } from "@/lib/cn";

type ContainerProps = React.ComponentProps<"div"> & {
  /** Narrow reading measure for long-form copy */
  narrow?: boolean;
};

export function Container({
  className,
  narrow = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6 md:px-8 lg:px-10",
        narrow ? "max-w-narrow" : "max-w-container",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
