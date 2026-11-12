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
  title: "AI Consultant for South African SMEs | Plaincraft",
  shortTitle: "Plaincraft · Practical AI for South African SMEs",
  description:
    "Plaincraft is an independent AI consultancy for South African SMEs, based in Cape Town. Fixed-fee AI readiness audits, strategy, automation, staff training and a fractional Head of AI.",
  socialDescription:
    "Find where AI saves time and money, then build it properly. Fixed fees, no lock-in, one senior consultant.",
  tagline: "Independent AI consultancy for South African SMEs.",
  location: "South Africa · Remote nationwide",
  /** Core service terms, used in structured data. Each also appears on the page. */
  keywords: ["AI consultancy", "AI readiness audit", "Fractional Head of AI"],
  /** Booking link used by every "Book a call" button. */
  calendarUrl: "https://cal.com/plaincraft/freeaidiscoverycall",
  linkedInUrl: "https://www.linkedin.com/in/dainemawer/",
  founder: {
    name: "Daine Mawer",
    jobTitle: "Founder & Principal Consultant",
    url: "https://dainemawer.com",
    location: "Cape Town, South Africa",
  },
  showFoundingOffer: true,
  /** Founding-client places for 2027; applicants are counted against this. */
  foundingSpots: 5,
  theme: {
    paper: "#F4F2ED",
    ink: "#121210",
    ember: "#E8492A",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, `${site.url}/`).href;
