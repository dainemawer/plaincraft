import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { primaryNav } from "@/content/home";
import { events, track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { MobileMenu, NavLink } from "./site-menu";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-ink/10 bg-paper/97 print:hidden">
      <nav
        aria-label="Primary"
        className="shell flex items-center justify-between gap-6 py-3.5"
      >
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="no-underline"
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-[26px] text-[15px] font-medium whitespace-nowrap nav:flex">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                label={item.label}
                className="no-underline hover:text-rust"
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ButtonLink
            href={site.calendarUrl}
            size="sm"
            {...track(events.bookCall, "header")}
          >
            Book a call
          </ButtonLink>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
