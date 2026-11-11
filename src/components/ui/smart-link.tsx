import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * Uses next/link for in-app routes (prefetching, client navigation) and a
 * plain anchor for external, mail and phone links.
 */
export function SmartLink({ href, ...rest }: SmartLinkProps) {
  return isExternal(href) ? (
    <a href={href} {...rest} />
  ) : (
    <Link href={href} {...rest} />
  );
}
