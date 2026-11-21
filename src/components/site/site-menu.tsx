"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { primaryNav } from "@/content/home";

/** Matches the `nav` breakpoint in globals.css. */
const DESKTOP_QUERY = "(min-width: 68.75rem)";
export const MOBILE_MENU_ID = "mobile-menu";

/**
 * A primary-nav link that marks itself as the current page. Hash links
 * ("/#services") point at home-page sections, so they never match.
 */
export function NavLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  const pathname = usePathname();
  const current = !href.includes("#") && pathname === href;
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`${className} aria-[current=page]:underline aria-[current=page]:decoration-ember aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]`}
    >
      {label}
    </Link>
  );
}

/**
 * Mobile menu: a native popover opened by `popovertarget`, so it works before
 * hydration and gets Escape, light dismiss and aria-expanded from the
 * browser. Script only closes it after a client-side navigation or when the
 * viewport grows past the desktop breakpoint, and loads the polyfill where
 * popover isn't supported.
 */
export function MobileMenu() {
  useEffect(() => {
    if (!Object.hasOwn(HTMLElement.prototype, "popover")) {
      import("@oddbird/popover-polyfill");
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => desktop.matches && hideMenu();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <button
        type="button"
        popoverTarget={MOBILE_MENU_ID}
        aria-controls={MOBILE_MENU_ID}
        aria-label="Menu"
        className="menu-toggle flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] border border-ink/20 nav:hidden"
      >
        <span
          aria-hidden="true"
          className="menu-bar block h-[1.5px] w-[18px] bg-ink"
        />
        <span
          aria-hidden="true"
          className="menu-bar block h-[1.5px] w-[18px] bg-ink"
        />
      </button>
      {/* Straight after its trigger, so browsers add no implicit aria-details. */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: delegates to the links inside, which handle the keyboard themselves. */}
      <ul
        id={MOBILE_MENU_ID}
        popover="auto"
        onClick={(event) => {
          if ((event.target as Element).closest("a")) hideMenu();
        }}
        className="mobile-menu nav:hidden"
      >
        {primaryNav.map((item) => (
          <li
            key={item.href}
            className="border-b border-ink/10 last:border-b-0"
          >
            <NavLink
              href={item.href}
              label={item.label}
              className="block py-3.5 text-[22px] font-semibold tracking-[-0.02em] no-underline hover:text-rust"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function hideMenu() {
  const menu = document.getElementById(MOBILE_MENU_ID);
  // The polyfill adds hidePopover() once it has loaded; until then there is
  // nothing open to close.
  if (menu && typeof menu.hidePopover === "function") {
    try {
      menu.hidePopover();
    } catch {
      // Already closed.
    }
  }
}
