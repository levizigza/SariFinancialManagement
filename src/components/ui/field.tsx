import { cn } from "@/lib/cn";

type LabelProps = React.ComponentProps<"label">;

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "font-sans text-sm font-semibold text-navy-900",
        "[[data-surface=navy]_&]:text-ivory-50",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

type FieldProps = React.ComponentProps<"div">;

export function Field({ className, children, ...props }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

const controlBase = cn(
  "w-full rounded-md font-sans text-[1rem] leading-normal",
  "border bg-surface-white text-navy-900 placeholder:text-blue-muted",
  "border-navy-800/20 hover:border-navy-800/35",
  "transition-[border-color,box-shadow] duration-200 ease-out",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

type InputProps = React.ComponentProps<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input className={cn(controlBase, "h-11 px-3.5", className)} {...props} />
  );
}

type TextareaProps = React.ComponentProps<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(controlBase, "min-h-32 px-3.5 py-3 resize-y", className)}
      {...props}
    />
  );
}

type SelectProps = React.ComponentProps<"select">;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(controlBase, "h-11 px-3.5 appearance-auto", className)}
      {...props}
    >
      {children}
    </select>
  );
}

type HintProps = React.ComponentProps<"p"> & {
  error?: boolean;
};

export function FieldHint({ error = false, className, children, ...props }: HintProps) {
  return (
    <p
      className={cn(
        "font-sans text-sm",
        error ? "text-text-error" : "text-blue-muted",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
