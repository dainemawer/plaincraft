"use client";

import Link from "next/link";
import { createContext, type ReactNode, use, useEffect, useState } from "react";
import { primaryNav } from "@/content/home";

type MenuState = { open: boolean; setOpen: (open: boolean) => void };

const MenuContext = createContext<MenuState | null>(null);

/** Matches the `nav` breakpoint in globals.css. */
const DESKTOP_QUERY = "(min-width: 68.75rem)";
const PANEL_ID = "mobile-menu";

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = () => desktop.matches && setOpen(false);
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);

    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return <MenuContext value={{ open, setOpen }}>{children}</MenuContext>;
}

export function useMenu() {
  const menu = use(MenuContext);
  if (!menu) throw new Error("useMenu must be used inside <MenuProvider>");
  return menu;
}

export function MenuButton() {
  const { open, setOpen } = useMenu();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={PANEL_ID}
      aria-label="Menu"
      onClick={() => setOpen(!open)}
      className="flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] border border-ink/20 nav:hidden"
    >
      <span className="block h-[1.5px] w-[18px] bg-ink" />
      <span className="block h-[1.5px] w-[18px] bg-ink" />
    </button>
  );
}

export function MenuPanel() {
  const { open, setOpen } = useMenu();

  return (
    <nav
      id={PANEL_ID}
      aria-label="Mobile"
      hidden={!open}
      className="flex flex-col border-t border-ink/10 px-5 pt-2 pb-5 nav:hidden"
    >
      <ul>
        {primaryNav.map((item) => (
          <li
            key={item.href}
            className="border-b border-ink/10 last:border-b-0"
          >
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3.5 text-[22px] font-semibold tracking-[-0.02em] no-underline hover:text-rust"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
