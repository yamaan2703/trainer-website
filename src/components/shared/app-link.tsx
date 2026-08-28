import { forwardRef, type ComponentProps } from "react";
import Link from "next/link";

type AppLinkProps = ComponentProps<"a"> & { href: string };

/** Same-origin app routes (`/about`) — not protocol-relative `//`, hashes, or mailto/tel. */
export function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Client-side navigation for in-app routes so the root layout (and the
 * first-paint loader) stay mounted. External / hash / mailto links stay native.
 */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  function AppLink({ href, ...props }, ref) {
    if (isInternalHref(href)) {
      return <Link ref={ref} href={href} {...props} />;
    }

    return <a ref={ref} href={href} {...props} />;
  },
);
