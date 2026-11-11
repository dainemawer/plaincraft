import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { MenuProvider } from "@/components/site/menu-context";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StickyCta } from "@/components/site/sticky-cta";
import { site } from "@/lib/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

/** Arrow glyphs (→ ↗) that Google's Latin subset omits; 780 bytes. */
const schibstedArrows = localFont({
  src: "../assets/fonts/schibsted-arrows.woff2",
  weight: "600 700",
  variable: "--font-schibsted-arrows",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Business consulting",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  formatDetection: { telephone: false, address: false, email: false },
  other: {
    "geo.region": "ZA",
    "geo.placename": "South Africa",
  },
};

export const viewport: Viewport = {
  themeColor: site.theme.paper,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      data-scroll-behavior="smooth"
      className={`${schibsted.variable} ${schibstedArrows.variable}`}
    >
      <body className="font-sans antialiased">
        <MenuProvider>
          <a
            href="#main"
            className="absolute top-2 -left-[9999px] z-100 bg-ink px-4 py-2.5 text-paper focus:left-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <StickyCta href={site.calendarUrl} />
          <SiteFooter />
        </MenuProvider>
        <RevealOnScroll />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
