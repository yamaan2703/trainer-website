/**
 * Whether a nav href matches the current pathname.
 * Home is exact `/` only; other routes match themselves and nested paths.
 */
export function isNavActive({
  href,
  pathname,
}: {
  href: string;
  pathname: string;
}): boolean {
  const path = href.split("#")[0] || "/";

  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}
