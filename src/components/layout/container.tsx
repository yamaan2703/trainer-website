import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Shared max-width + fluid horizontal padding used by every section. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-edit", className)} {...props} />;
}
