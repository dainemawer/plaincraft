import { cacheLife } from "next/cache";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Logo } from "@/components/ui/logo";
import { footerServiceLinks } from "@/content/home";
import { events, track } from "@/lib/analytics";
import { site } from "@/lib/site";

async function getCopyrightYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-paper/15 bg-ink text-mist">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8 pt-12 pb-8">
        <div className="flex flex-col gap-3.5">
          <Logo tone="dark" />
          <p className="text-sm/[1.55]">{site.tagline}</p>
        </div>

        <nav aria-labelledby="footer-services" className="text-sm">
          <p id="footer-services" className="mb-2.5 text-xs text-stone">
            Services
          </p>
          <ul className="flex flex-col gap-2.5">
            {footerServiceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper no-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col items-start gap-2.5 text-sm not-italic">
          <span className="text-xs text-stone">Contact</span>
          <a
            href={`mailto:${site.email}`}
            className="text-paper no-underline"
            {...track(events.email, "footer")}
          >
            {site.email}
          </a>
          <span>{site.location}</span>
          <a
            href={site.linkedInUrl}
            rel="me noopener noreferrer"
            target="_blank"
            className="text-paper no-underline"
          >
            LinkedIn{" "}
            <span aria-hidden="true" className="glyph">
              ↗
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </address>

        <section aria-labelledby="footer-newsletter" className="text-sm">
          <h2 id="footer-newsletter" className="mb-2.5 text-xs text-stone">
            Newsletter
          </h2>
          <p className="mb-3.5 text-sm/[1.55] text-paper">
            Practical notes on where AI helps a small business, and where it
            doesn't.
          </p>
          <NewsletterForm source="footer" tone="dark" />
        </section>
      </div>

      <div className="shell flex flex-wrap justify-between gap-3 border-t border-paper/10 pt-5 pb-8 text-[13px] text-stone">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-5">
          <li>
            <Link href="/about" className="underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className="underline">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="underline">
              Privacy &amp; POPIA
            </Link>
          </li>
          <li>
            <Link href="/terms" className="underline">
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
