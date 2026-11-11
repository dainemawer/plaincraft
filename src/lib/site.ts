/**
 * Site-wide configuration. Values that differ per environment, or that are
 * still placeholders, are read from environment variables so they can be
 * filled in on Vercel without a code change.
 */

const siteUrl = (process.env.SITE_URL ?? "https://plaincraft.co.za").replace(
  /\/$/,
  "",
);

export const site = {
  name: "Plaincraft",
  url: siteUrl,
  locale: "en-ZA",
  ogLocale: "en_ZA",
  email: "hello@plaincraft.co.za",
  title:
    "Plaincraft · AI Consultancy for South African SMEs | Strategy, Automation & Training",
  shortTitle: "Plaincraft · Practical AI for South African SMEs",
  description:
    "Plaincraft is an independent AI consultancy for South African SMEs. Fixed-fee AI readiness audits, strategy, automation builds, training and fractional Head of AI, delivered by one senior consultant.",
  socialDescription:
    "Find where AI saves time and money, then build it properly. Fixed fees, no lock-in, one senior consultant.",
  tagline: "Independent AI consultancy for South African SMEs.",
  location: "South Africa · Remote nationwide",
  /** Booking link used by every "Book a call" button. Falls back to the on-page CTA. */
  calendarUrl: process.env.CALENDAR_URL || "/#book",
  linkedInUrl:
    process.env.LINKEDIN_URL || "https://www.linkedin.com/in/your-profile",
  founder: {
    /** Set FOUNDER_NAME to publish the founder in structured data. */
    name: process.env.FOUNDER_NAME || null,
    jobTitle: "Founder & Principal Consultant",
  },
  showFoundingOffer: true,
  theme: {
    paper: "#F4F2ED",
    ink: "#121210",
    ember: "#E8492A",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, `${site.url}/`).href;
