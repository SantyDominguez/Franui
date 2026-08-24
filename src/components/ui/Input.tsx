import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const inputId = id || props.name;

  return (
    <label className="block" htmlFor={inputId}>
      {label && <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "min-h-12 w-full rounded-2xl border border-line bg-white/85 px-4 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10",
          error && "border-danger focus:border-danger focus:ring-danger/10",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${inputId}-error`} className="mt-2 block text-sm text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="mt-2 block text-sm text-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
});
