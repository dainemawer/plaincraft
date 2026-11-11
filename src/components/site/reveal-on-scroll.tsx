"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EASE = "cubic-bezier(.2,.7,.1,1)";

/**
 * Progressive enhancement for elements marked `data-reveal`. Elements already
 * on screen are left alone; elements below the fold are hidden (via
 * `data-reveal="pending"` in globals.css) and fade up as they scroll in.
 * Without JavaScript, or with reduced motion, everything is simply visible.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-scan the new page's elements after each client-side navigation.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          element.animate(
            [
              { opacity: 0, transform: "translateY(32px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 900,
              delay: Number(element.dataset.revealDelay ?? 0),
              easing: EASE,
              fill: "backwards",
            },
          );
          element.dataset.reveal = "shown";
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const fold = window.innerHeight * 0.92;
    for (const element of document.querySelectorAll<HTMLElement>(
      '[data-reveal=""]',
    )) {
      if (element.getBoundingClientRect().top > fold) {
        element.dataset.reveal = "pending";
        observer.observe(element);
      } else {
        element.dataset.reveal = "shown";
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
