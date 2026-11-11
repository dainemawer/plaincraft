"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { useMenu } from "./menu-context";

/** Distance scrolled before the bar appears, roughly past the hero. */
const SHOW_AFTER_PX = 640;

/** Mobile-only booking bar pinned to the bottom of the viewport. */
export function StickyCta({ href }: { href: string }) {
  const { open: menuOpen } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!scrolled || menuOpen) return null;

  return (
    <aside
      aria-label="Book a call"
      className="fixed inset-x-0 bottom-0 z-60 flex items-center gap-3 border-t border-ink bg-paper/94 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-md nav:hidden"
    >
      <p className="flex-1 text-sm/[1.35] font-medium">
        Free 30-min call. No jargon.
      </p>
      <ButtonLink href={href} variant="dark" size="compact">
        Book now
      </ButtonLink>
    </aside>
  );
}
