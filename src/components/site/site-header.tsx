import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { primaryNav } from "@/content/home";
import { site } from "@/lib/site";
import { MenuButton, MenuPanel } from "./menu-context";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/86 backdrop-blur-[14px]">
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
              <Link href={item.href} className="no-underline hover:text-rust">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ButtonLink href={site.calendarUrl} size="sm">
            Book a call
          </ButtonLink>
          <MenuButton />
        </div>
      </nav>
      <MenuPanel />
    </header>
  );
}
