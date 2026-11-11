/**
 * Site-wide configuration. Only the canonical origin varies by environment;
 * everything else is content and lives in version control.
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
  /** Booking link used by every "Book a call" button. */
  calendarUrl: "https://cal.com/plaincraft/30min",
  linkedInUrl: "https://www.linkedin.com/in/dainemawer/",
  founder: {
    name: "Daine Mawer",
    jobTitle: "Founder & Principal Consultant",
    url: "https://dainemawer.com",
    location: "Cape Town, South Africa",
  },
  showFoundingOffer: true,
  theme: {
    paper: "#F4F2ED",
    ink: "#121210",
    ember: "#E8492A",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, `${site.url}/`).href;
