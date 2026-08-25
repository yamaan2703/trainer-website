import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Small tracked label + orange-600 dot used to introduce every section. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("eyebrow", className)} {...props} />;
}
