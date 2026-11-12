/**
 * Click tracking for Vercel Analytics. One delegated listener records any
 * element marked with `track()` from src/lib/analytics.ts, plus booking and
 * email links that weren't marked (such as links inside article prose).
 */
import { track } from "@vercel/analytics";
import { events } from "@/lib/analytics";
import { site } from "@/lib/site";

document.addEventListener(
  "click",
  (event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest<HTMLElement>("[data-track], a[href]");
    if (!element) return;

    const page = window.location.pathname;
    const marked = element.dataset.track;
    if (marked) {
      track(marked, {
        location: element.dataset.trackLocation ?? null,
        page,
      });
      return;
    }

    const href = element.getAttribute("href") ?? "";
    if (href.startsWith(site.calendarUrl)) {
      track(events.bookCall, { location: "inline", page });
    } else if (href.startsWith("mailto:")) {
      track(events.email, { location: "inline", page });
    }
  },
  { capture: true },
);
