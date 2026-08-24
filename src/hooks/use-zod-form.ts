"use client";

import {
  useForm,
  type UseFormProps,
  type FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

/**
 * `useForm` pre-wired to a Zod schema via `zodResolver`, so form components
 * never have to import the resolver themselves and every form in the app
 * validates the same way.
 *
 * Both `Input` (the raw values `register`/`watch`/`defaultValues` work with)
 * and `Output` (what `handleSubmit`'s callback receives, i.e. the schema's
 * parsed/transformed result) are inferred from `schema` itself, so a schema
 * using `.transform()` is still typed correctly end to end — not just
 * schemas where input and output happen to match.
 *
 * Caveat: a *top-level* `z.coerce.xxx()` field (e.g. `z.coerce.number()`
 * directly on an object property) types that field's Input as `unknown`,
 * which TypeScript won't accept here. Use `z.string().transform(Number)`
 * instead — same runtime effect, and it stays typed.
 *
 * @example
 * const schema = z.object({ email: z.string().email() });
 * const form = useZodForm(schema, { defaultValues: { email: "" } });
 */
export function useZodForm<
  Output extends FieldValues,
  Input extends FieldValues = Output,
  Schema extends z.ZodType<Output, Input> = z.ZodType<Output, Input>
>(
  schema: Schema,
  options?: Omit<UseFormProps<Input, unknown, Output>, "resolver">
) {
  return useForm<Input, unknown, Output>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    ...options,
  });
}
