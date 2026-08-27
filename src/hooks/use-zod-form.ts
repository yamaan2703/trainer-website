"use client";

import {
  useForm,
  type UseFormProps,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

/**
 * `useForm` pre-wired to a Zod schema via `zodResolver`.
 * Infers Input/Output from the schema (Zod 4–compatible).
 */
export function useZodForm<TSchema extends z.ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
  options?: Omit<
    UseFormProps<z.input<TSchema>, unknown, z.output<TSchema>>,
    "resolver"
  >
) {
  return useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    resolver: zodResolver(schema) as unknown as Resolver<
      z.input<TSchema>,
      unknown,
      z.output<TSchema>
    >,
    mode: "onBlur",
    ...options,
  });
}
