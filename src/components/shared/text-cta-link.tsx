import type { AnchorHTMLAttributes, ReactNode } from "react";
import { AppLink } from "@/components/shared/app-link";
import { cn } from "@/lib/utils";

interface TextCtaLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  href: string;
  children: ReactNode;
  /** Arrow glyph — Story uses →; Final CTA keeps ↗. */
  arrow?: string;
}

/**
 * Text CTA with Story-section hover: label rolls up to orange,
 * arrow shifts right. Same 600ms cubic-bezier everywhere.
 */
export function TextCtaLink({
  href,
  children,
  className,
  arrow = "→",
  ...props
}: TextCtaLinkProps) {
  return (
    <AppLink
      href={href}
      className={cn(
        "group/link inline-flex w-fit items-center gap-2.5 text-xs uppercase tracking-[0.14em] text-ink sm:text-[0.8125rem]",
        className
      )}
      {...props}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-0 block translate-y-full text-orange-600 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className="transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/link:translate-x-1.5"
      >
        {arrow}
      </span>
    </AppLink>
  );
}
