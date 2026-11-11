/**
 * Homepage copy. Kept as typed data so the rendered page, the JSON-LD
 * structured data and /llms.txt always say the same thing.
 */

export type NavItem = { label: string; href: `/#${string}` };

export const primaryNav: NavItem[] = [
  { label: "What AI does", href: "/#what-ai-does" },
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },
  { label: "Why Plaincraft", href: "/#trust" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];

export const heroChecks = [
  "Free, no obligation",
  "No jargon",
  "Leave with ideas you can use",
];

export const painPoints = [
  "I know we need AI. I just don't know where to start.",
  "We bought ChatGPT licences. Nobody uses them.",
  "Our team re-types the same data into three systems.",
  "Is our client data even safe in these tools?",
  "Every vendor says their AI is the answer.",
  "Quotes take us two days. Competitors take two hours.",
];

export type AiJob = {
  id: string;
  title: string;
  body: string;
  example: string;
};

export const aiJobs: AiJob[] = [
  {
    id: "ai-writes",
    title: "It writes.",
    body: "First drafts of quotes, proposals, emails and reports in your tone, ready for a person to check and send.",
    example: "quotes drafted in minutes instead of an afternoon.",
  },
  {
    id: "ai-reads",
    title: "It reads.",
    body: "It pulls the details out of invoices, contracts, CVs and forms, then puts them where they need to go.",
    example: "no more re-typing supplier invoices into your accounts.",
  },
  {
    id: "ai-answers",
    title: "It answers.",
    body: "It replies to routine questions from customers or staff at any hour, using your own information.",
    example: "your price list and policies, answered instantly.",
  },
];

export const callAgenda = [
  {
    time: "0–10 min",
    title: "We talk about your business, not AI.",
    body: "What your team spends time on, and what frustrates you.",
  },
  {
    time: "10–25 min",
    title: "I show you where AI fits, and where it doesn't.",
    body: "Real examples from businesses like yours, explained simply.",
  },
  {
    time: "25–30 min",
    title: "You leave with clear next steps.",
    body: "Whether or not we ever work together.",
  },
];

export type Service = {
  id: string;
  name: string;
  /** Name used in structured data, where context is missing. */
  schemaName: string;
  body: string;
  summary: string;
};

export type ServiceStage = {
  stage: string;
  label: string;
  tone: "light" | "dark";
  services: Service[];
};

export const serviceStages: ServiceStage[] = [
  {
    stage: "Stage A",
    label: "Understand",
    tone: "light",
    services: [
      {
        id: "ai-readiness-audit",
        name: "AI readiness audit",
        schemaName: "AI readiness audit",
        body: "Two weeks mapping how work actually gets done. Every opportunity is scored for value, effort and risk.",
        summary:
          "a two-week review of how work gets done, with every AI opportunity scored for value, effort and risk.",
      },
      {
        id: "vendor-selection",
        name: "Vendor & tool selection",
        schemaName: "AI vendor and tool selection",
        body: "Independent advice on what to buy, what to build and what to skip. I take no referral fees.",
        summary:
          "independent advice on which AI tools to buy. Plaincraft takes no referral fees.",
      },
    ],
  },
  {
    stage: "Stage B",
    label: "Plan",
    tone: "light",
    services: [
      {
        id: "ai-strategy-roadmap",
        name: "Strategy & roadmap",
        schemaName: "AI strategy and roadmap",
        body: "A prioritised 12-month plan in plain English, with costs, owners and a clear “don't bother” list.",
        summary:
          "a prioritised plan in plain English, including what not to do.",
      },
      {
        id: "ai-governance",
        name: "Governance, risk & policy",
        schemaName: "AI governance, risk and policy",
        body: "An AI usage policy your team will actually read, plus data handling aligned with POPIA.",
        summary: "AI usage policies and data handling aligned with POPIA.",
      },
    ],
  },
  {
    stage: "Stage C",
    label: "Build & embed",
    tone: "dark",
    services: [
      {
        id: "automation-builds",
        name: "Automation & agent builds",
        schemaName: "Automation and AI agent builds",
        body: "Working automations built on tools you already pay for. Fully documented and fully yours.",
        summary:
          "building and deploying working automations. The client owns everything.",
      },
      {
        id: "ai-training",
        name: "Team training & workshops",
        schemaName: "AI team training and workshops",
        body: "Hands-on sessions built around your real work, not generic prompt tips.",
        summary: "hands-on sessions so staff can use AI safely and well.",
      },
      {
        id: "fractional-head-of-ai",
        name: "Fractional Head of AI",
        schemaName: "Fractional Head of AI",
        body: "Senior AI leadership a few days a month, for the price of a fraction of a hire.",
        summary: "ongoing part-time leadership for AI adoption.",
      },
    ],
  },
];

export const services = serviceStages.flatMap((stage) => stage.services);

export const footerServiceLinks = [
  { label: "AI readiness audit", href: "/#ai-readiness-audit" },
  { label: "Strategy & roadmap", href: "/#ai-strategy-roadmap" },
  { label: "Automation builds", href: "/#automation-builds" },
  { label: "Fractional Head of AI", href: "/#fractional-head-of-ai" },
] as const;

export type AuditVerdict = "automate" | "assist" | "fix-first" | "not-for-ai";

export const auditRows: {
  process: string;
  hours: number | null;
  /** Bar length as a percentage of the column. */
  bar: number;
  verdict: AuditVerdict;
}[] = [
  { process: "Quote preparation", hours: 11, bar: 70, verdict: "automate" },
  { process: "Inbox triage", hours: 7, bar: 45, verdict: "assist" },
  {
    process: "Month-end reconciliation",
    hours: 9,
    bar: 58,
    verdict: "automate",
  },
  { process: "Client onboarding", hours: 5, bar: 30, verdict: "fix-first" },
  { process: "Hiring decisions", hours: null, bar: 0, verdict: "not-for-ai" },
];

export const processSteps = [
  {
    number: "01",
    meta: "Free",
    title: "Discovery call",
    body: "30 minutes to understand your business and decide whether AI is even the right answer.",
  },
  {
    number: "02",
    meta: "~2 weeks",
    title: "Readiness audit",
    body: "I talk to your team, map your processes and score every opportunity for value, effort and risk.",
  },
  {
    number: "03",
    meta: "1 week",
    title: "Roadmap",
    body: "A short, prioritised plan you can act on with me, with someone else, or on your own.",
  },
  {
    number: "04",
    meta: "Ongoing",
    title: "Build & embed",
    body: "I build the first wins and train your team. If it helps, I stay on as your fractional Head of AI.",
  },
];

export const comparison = [
  {
    topic: "Who does the work",
    typical: "Juniors, after the senior pitch",
    us: "Me, start to finish",
  },
  {
    topic: "How you pay",
    typical: "Day rates, open-ended",
    us: "Fixed fee, agreed in writing",
  },
  {
    topic: "Tool advice",
    typical: "Shaped by partner deals",
    us: "Independent. No referral fees.",
  },
  {
    topic: "What you own after",
    typical: "Licences and dependency",
    us: "Everything: workflows, prompts, docs",
  },
  {
    topic: "Getting an answer",
    typical: "Via an account manager",
    us: "A direct line to me",
  },
];

export const commitments = [
  {
    code: "C/01",
    title: "Scope in writing before any fee",
    body: "You'll know exactly what you're getting, by when, for how much.",
  },
  {
    code: "C/02",
    title: "An honest “no”",
    body: "If AI won't pay back for you, I'll tell you on the first call and won't sell you anything.",
  },
  {
    code: "C/03",
    title: "Your data stays yours",
    body: "POPIA-aware by default. NDA on request, and nothing goes into model training without your consent.",
  },
  {
    code: "C/04",
    title: "No lock-in",
    body: "Every build is documented so your team, or another provider, can run it without me.",
  },
];

export const founderFacts = [
  { label: "Background", value: "17 years in web & product engineering" },
  { label: "Focus", value: "Practical AI adoption for SMEs" },
  { label: "Based in", value: "Cape Town, South Africa" },
];

export const shortVersion = [
  {
    term: "What",
    detail:
      "An independent AI consultancy. Strategy, automation, training and governance.",
  },
  {
    term: "Who for",
    detail: "Small and medium-sized businesses with 10–250 staff.",
  },
  {
    term: "Where",
    detail: "Based in South Africa, working remotely nationwide.",
  },
  {
    term: "How",
    detail: "Fixed-fee projects, run personally by one senior consultant.",
  },
  {
    term: "First step",
    detail: "A free 30-minute call. If AI isn't the answer, I'll say so.",
  },
];

export const faqs = [
  {
    question: "I don't really understand AI. Is that a problem?",
    answer:
      "Not at all. Most of the business owners I work with are in the same position. You don't need to learn the technology. You need someone who understands it and your business, and can explain it in plain English. That's my job.",
  },
  {
    question: "What does an AI consultant actually do for a small business?",
    answer:
      "I work out which parts of your business would benefit from AI, which wouldn't, and what it would cost. In practice that means a readiness audit, a plain-English roadmap, then building the first automations with your team.",
  },
  {
    question: "How much does AI consultancy cost?",
    answer:
      "Every engagement is fixed-fee and quoted in writing after a free 30-minute call. There's no hourly billing and there are no surprise invoices.",
  },
  {
    question: "Is my business too small for AI?",
    answer:
      "Usually not. Businesses with 10 to 250 staff often see the fastest returns, because a few hours saved per person each week adds up quickly. If it isn't worth it for you, I'll tell you on the first call.",
  },
  {
    question: "Will AI replace my staff?",
    answer:
      "My focus is removing repetitive admin so your people can spend their time on work that needs judgement. I design recommendations with your team, not around them.",
  },
  {
    question: "How do you handle data privacy and POPIA?",
    answer:
      "Every recommendation is checked against POPIA. Your data stays in your own accounts wherever possible, nothing is used to train third-party models without consent, and you get a written AI usage policy.",
  },
  {
    question: "Do you only work with South African businesses?",
    answer:
      "I'm based in South Africa and work remotely with businesses nationwide. International clients are welcome where time zones allow.",
  },
  {
    question: "Why work with one consultant instead of an agency?",
    answer:
      "You deal with the person doing the work, from the first call to handover. There are no account managers, no hand-offs to juniors and no partner commissions influencing what I recommend.",
  },
];
