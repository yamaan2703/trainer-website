import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Soft-fill fields on the light page — transparent form shell, hairline cells.
 */
const fieldControl =
  "w-full border-0 bg-transparent px-0 py-0 text-[0.95rem] leading-snug text-ink outline-none placeholder:text-ink-muted/50 disabled:opacity-50";

interface FieldShellProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  children: ReactNode;
  className?: string;
}

/** Labeled soft cell — label + control share one padded surface. */
export function FieldShell({
  label,
  htmlFor,
  error,
  errorId,
  children,
  className,
}: FieldShellProps) {
  const invalid = Boolean(error);

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "border px-4 py-3 transition-[border-color,background-color] duration-300",
          "border-hairline bg-transparent focus-within:border-orange-600 focus-within:bg-orange-600/[0.03]",
          invalid && "border-orange-600"
        )}
      >
        <label
          htmlFor={htmlFor}
          className="mb-1.5 block text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-ink-muted"
        >
          {label}
        </label>
        {children}
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="px-0.5 text-[0.7rem] text-orange-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function TextField({ className, hasError, ...props }: TextFieldProps) {
  return (
    <input
      className={cn(fieldControl, className)}
      aria-invalid={hasError || undefined}
      {...props}
    />
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function TextAreaField({ className, hasError, ...props }: TextAreaFieldProps) {
  return (
    <textarea
      className={cn(fieldControl, "min-h-[7.25rem] resize-none", className)}
      aria-invalid={hasError || undefined}
      {...props}
    />
  );
}

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: string;
}) {
  return (
    <label htmlFor={htmlFor} className="sr-only">
      {children}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-[0.7rem] text-orange-600">
      {message}
    </p>
  );
}
