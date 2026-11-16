/**
 * "State of AI in South African SMEs 2027": the survey questions, in order.
 *
 * One source for three things:
 * - the form itself, built by hand in Tally (`pnpm survey:form` prints the
 *   questions ready to paste),
 * - the /survey page (question count, time estimate, closing date),
 * - the report script (`pnpm survey:report <export.csv>`), which matches
 *   Tally's CSV columns to these questions by title.
 *
 * Keep titles here and in Tally identical, or the report can't find the column.
 */

export type SurveyQuestion = {
  id: string;
  title: string;
  /** "single": pick one. "multi": pick any (or up to `max`). "scale": 1–5. */
  kind: "single" | "multi" | "scale";
  options: string[];
  max?: number;
  /** Shown under the title in Tally. */
  help?: string;
  /** Answer optional. Everything else is required. */
  optional?: boolean;
  /** Short label for charts and tables. */
  short: string;
};

export const survey = {
  title: "State of AI in South African SMEs 2027",
  slug: "state-of-ai-sa-smes-2027",
  /** Survey closes at the end of this day (SAST). */
  closes: "2026-11-27",
  /** Publish the report within 48 hours of closing. */
  reportDue: "2026-11-29",
  targetResponses: 100,
  minutes: 4,
  /**
   * The Tally form's share link, e.g. "https://tally.so/r/abc123". Leave
   * empty to keep the survey hidden: /survey then returns 404 and stays out
   * of the sitemap. Setting it publishes the page.
   */
  tallyUrl: "",
  /** Groups smaller than this are not reported on their own. */
  minGroupSize: 5,
} as const;

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "size",
    short: "Company size",
    title: "How many people work in your business, including you?",
    kind: "single",
    options: ["1–9", "10–30", "31–100", "101–250", "More than 250"],
  },
  {
    id: "sector",
    short: "Sector",
    title: "Which sector is your business in?",
    kind: "single",
    options: [
      "Accounting, legal or consulting",
      "Financial services or insurance",
      "Retail or e-commerce",
      "Manufacturing",
      "Construction, engineering or property",
      "Logistics or transport",
      "Hospitality or tourism",
      "Healthcare",
      "Education or training",
      "Agriculture",
      "Technology or software",
      "Marketing, media or creative",
      "Non-profit",
      "Other",
    ],
  },
  {
    id: "province",
    short: "Province",
    title: "Where is your business based?",
    kind: "single",
    options: [
      "Western Cape",
      "Gauteng",
      "KwaZulu-Natal",
      "Eastern Cape",
      "Free State",
      "Limpopo",
      "Mpumalanga",
      "North West",
      "Northern Cape",
    ],
  },
  {
    id: "role",
    short: "Role",
    title: "What is your role?",
    kind: "single",
    options: [
      "Owner, founder or MD",
      "Other executive or director",
      "Operations, finance or admin manager",
      "IT or technology",
      "Other",
    ],
  },
  {
    id: "tools",
    short: "Tools in use",
    title: "Which AI tools does your business use today?",
    help: "Tick all that apply, including tools staff use on their own.",
    kind: "multi",
    options: [
      "ChatGPT",
      "Microsoft Copilot",
      "Google Gemini",
      "Claude",
      "AI features inside software we already use (e.g. Xero, Sage, HubSpot, Canva)",
      "AI meeting note-takers",
      "Automations or tools built for us",
      "Other",
      "None",
    ],
  },
  {
    id: "access",
    short: "How staff get AI",
    title: "How do your staff get access to AI tools?",
    kind: "single",
    options: [
      "The business pays for licences",
      "Staff use free or personal accounts",
      "A mix of both",
      "Staff don't use AI at work",
      "I don't know",
    ],
  },
  {
    id: "spend",
    short: "Monthly spend",
    title:
      "Roughly how much does the business spend on AI tools each month, in rands?",
    kind: "single",
    options: [
      "Nothing",
      "Under R1,000",
      "R1,000–R5,000",
      "R5,000–R20,000",
      "R20,000–R50,000",
      "More than R50,000",
      "I don't know",
    ],
  },
  {
    id: "licences",
    short: "Paid licences used weekly",
    title: "Of the AI licences you pay for, how many are used at least weekly?",
    kind: "single",
    options: [
      "All or nearly all",
      "Most",
      "About half",
      "A few",
      "I don't know",
      "We don't pay for any",
    ],
  },
  {
    id: "impact",
    short: "Impact so far",
    title: "What has AI changed in your business so far?",
    kind: "single",
    options: [
      "It saves us measurable time or money",
      "Small improvements, hard to measure",
      "No noticeable difference",
      "It has caused problems",
      "Too early to tell",
    ],
  },
  {
    id: "opportunities",
    short: "Where AI would help",
    title: "Where would AI help your business most?",
    help: "Pick up to three.",
    kind: "multi",
    max: 3,
    options: [
      "Admin and data capture",
      "Invoicing, bookkeeping and finance",
      "Quotes and proposals",
      "Customer service and enquiries",
      "Sales and marketing",
      "Reporting",
      "Hiring and HR",
      "Reviewing documents and contracts",
      "Scheduling and operations",
    ],
  },
  {
    id: "blocker",
    short: "Biggest blocker",
    title: "What is the biggest thing holding your business back on AI?",
    kind: "single",
    options: [
      "Not knowing where to start",
      "Cost",
      "Data privacy and POPIA risk",
      "Staff skills or confidence",
      "No time to set it up",
      "Tools don't fit our systems",
      "Output isn't reliable enough",
      "Leadership isn't convinced",
      "Nothing is holding us back",
    ],
  },
  {
    id: "policy",
    short: "AI usage policy",
    title: "Does your business have a written AI usage policy?",
    kind: "single",
    options: ["Yes", "We're drafting one", "No", "I don't know"],
  },
  {
    id: "popia",
    short: "POPIA confidence",
    title:
      "How confident are you that the way your business uses AI complies with POPIA?",
    help: "1 = not at all confident, 5 = completely confident.",
    kind: "scale",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    id: "plans",
    short: "2027 plans",
    title: "How will your use of AI change in 2027?",
    kind: "single",
    options: [
      "Increase a lot",
      "Increase a little",
      "Stay about the same",
      "Decrease",
      "No plans yet",
    ],
  },
];

/** Shown above the first question in Tally and on /survey. */
export const surveyConsent = `This survey is run by Plaincraft, an AI consultancy in Cape Town. It is anonymous: we don't ask for your name or company, and we only publish totals. Groups smaller than ${survey.minGroupSize} responses are never shown on their own. Leave your email at the end only if you want the report; we use it to send the report and nothing else, unless you also tick the newsletter box. Responses are collected with Tally, which stores them in the EU, and are deleted 12 months after the report is published. To see, correct or delete your answers, email hello@plaincraft.co.za. Full notice: https://plaincraft.co.za/privacy`;

/** The optional last screen in Tally. Not part of the analysis. */
export const surveyFollowUp = {
  email: "Email address, if you'd like the report (optional)",
  newsletter:
    "Also send me the Plaincraft newsletter (practical AI notes, about twice a month)",
} as const;
