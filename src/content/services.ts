/**
 * Copy for the individual service pages under /services. Each entry fills
 * the service-page template and targets the phrases people search for that
 * service. Keyed to the homepage services by `id`.
 */

import type { StaticImageData } from "next/image";
import automationPhoto from "@/assets/images/services/ai-automation.jpg";
import policyPhoto from "@/assets/images/services/ai-policy-popia.jpg";
import auditPhoto from "@/assets/images/services/ai-readiness-audit.jpg";
import strategyPhoto from "@/assets/images/services/ai-strategy-roadmap.jpg";
import toolsPhoto from "@/assets/images/services/ai-tool-selection.jpg";
import trainingPhoto from "@/assets/images/services/ai-training.jpg";
import fractionalPhoto from "@/assets/images/services/fractional-head-of-ai.jpg";
import { serviceStages } from "@/content/home";

export type ServiceDetail = {
  /** Matches the homepage service id. */
  id: string;
  slug: string;
  /** <title>, kept under ~60 characters. */
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** schema.org serviceType. */
  serviceType: string;
  /** Short label for breadcrumbs and cards. */
  name: string;
  /** Optional note beside the stage tag, e.g. "Where most clients start". */
  note?: string;
  headline: string;
  lede: string;
  photo: { src: StaticImageData; alt: string };
  facts: { label: string; value: string }[];
  goodFit: string[];
  notFit: string[];
  deliverables: { intro: string; items: { title: string; body: string }[] };
  process: {
    title: string;
    steps: { when: string; title: string; body: string }[];
  };
  /** Show the illustrative audit result. */
  showSample?: boolean;
  included: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  /** Ids of services to suggest next. */
  next: string[];
  ctaNote: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "ai-readiness-audit",
    slug: "ai-readiness-audit",
    title: "AI Readiness Audit for SMEs · Fixed fee, two weeks",
    description:
      "A two-week, fixed-fee AI readiness audit for South African SMEs. Every process scored for value, effort and risk, plus a one-page plan of what to automate, fix first and leave alone.",
    serviceType: "AI readiness assessment",
    name: "AI readiness audit",
    note: "Where most clients start",
    headline: "AI readiness audit.",
    lede: "Two weeks to find out exactly where AI will save your business time and money, and where it won't. You get a one-page plan, not a 60-page report.",
    photo: {
      src: auditPhoto,
      alt: "A consultant mapping a business process with sticky notes on a wall while two staff members look on.",
    },
    facts: [
      { label: "Duration", value: "About 2 weeks" },
      { label: "Fee", value: "Fixed, in writing" },
      { label: "Your team's time", value: "~45 min each" },
      { label: "You get", value: "A one-page plan" },
    ],
    goodFit: [
      "You have 10–250 staff and know AI could help, but not where.",
      "Your team spends hours a week on repetitive admin.",
      "You've been pitched AI tools and can't tell which are worth it.",
      "You want a clear plan before spending on anything.",
    ],
    notFit: [
      "You already know exactly what to automate. Go straight to a build.",
      "You need a custom AI product built for customers.",
      "Nobody on the team can spare 45 minutes in the next month.",
    ],
    deliverables: {
      intro:
        "Four things, all yours to keep, whether or not we work together afterwards.",
      items: [
        {
          title: "A process map",
          body: "How work really moves through your business, written down for the first time.",
        },
        {
          title: "A scored opportunity list",
          body: "Every candidate rated for value, effort and risk, including the ones to leave alone.",
        },
        {
          title: "A one-page plan",
          body: "What to automate, what to fix first and what to skip, in plain English.",
        },
        {
          title: "A data and POPIA check",
          body: "Where client data sits today and what needs care before AI touches it.",
        },
      ],
    },
    process: {
      title: "How the two weeks run.",
      steps: [
        {
          when: "Day 1",
          title: "Kick-off with you",
          body: "One hour on goals, frustrations and who I should speak to.",
        },
        {
          when: "Days 2–6",
          title: "Team conversations",
          body: "Short interviews with the people doing the work, plus a look at the systems they use.",
        },
        {
          when: "Days 7–9",
          title: "Scoring",
          body: "I score each opportunity and test the strongest ones with your real tools.",
        },
        {
          when: "Day 10",
          title: "Walk-through",
          body: "We go through the plan together. You decide what happens next.",
        },
      ],
    },
    showSample: true,
    included: [
      "All interviews, mapping and scoring",
      "The four deliverables above",
      "A 60-minute walk-through with your team",
      "30 days of follow-up questions by email",
    ],
    faqTitle: "Questions about the audit.",
    faqs: [
      {
        question: "How much of my team's time does it take?",
        answer:
          "About 45 minutes per person I speak to, plus an hour with you at the start and the end.",
      },
      {
        question: "Do I need any AI tools already?",
        answer:
          "No. The audit looks at how work gets done today. Tools come later, and only if they pay back.",
      },
      {
        question: "What if AI isn't worth it for us?",
        answer:
          "Then the plan says so clearly, and tells you what to fix instead. That's still a useful result.",
      },
      {
        question: "Do I have to use Plaincraft for the build?",
        answer:
          "No. The plan is yours to act on with me, with someone else or on your own.",
      },
    ],
    next: ["ai-strategy-roadmap", "vendor-selection", "automation-builds"],
    ctaNote:
      "We'll see whether an audit makes sense. If it doesn't, I'll say so.",
  },
  {
    id: "vendor-selection",
    slug: "ai-tool-selection",
    title: "Independent AI Tool & Vendor Selection for SMEs",
    description:
      "Independent advice on which AI tools to buy, build or skip, for South African SMEs. No referral fees and no partner deals, just what fits your business.",
    serviceType: "AI vendor and tool selection",
    name: "Vendor & tool selection",
    headline: "Vendor & tool selection.",
    lede: "Independent advice on what to buy, what to build on tools you already pay for, and what to skip. I take no referral fees, so the only thing I'm selling is a straight answer.",
    photo: {
      src: toolsPhoto,
      alt: "Two people at a desk comparing software options on a laptop, with a printed comparison sheet beside it.",
    },
    facts: [
      { label: "Duration", value: "About 1 week" },
      { label: "Fee", value: "Fixed, in writing" },
      { label: "Referral fees", value: "None, ever" },
      { label: "You get", value: "A written shortlist" },
    ],
    goodFit: [
      "You're being pitched AI products and can't tell them apart.",
      "You're weighing ChatGPT, Microsoft Copilot or a specialist tool.",
      "You suspect you're paying for software that overlaps.",
      "You want a second opinion before signing a contract.",
    ],
    notFit: [
      "You've already chosen and signed. Go straight to training or a build.",
      "You need someone to resell or license software to you.",
    ],
    deliverables: {
      intro:
        "A clear recommendation you can act on, and the reasoning behind it.",
      items: [
        {
          title: "A needs summary",
          body: "The jobs the tool has to do, in your words, agreed before we look at products.",
        },
        {
          title: "An honest shortlist",
          body: "Realistic options compared on cost, fit, data handling and lock-in, including what you already own.",
        },
        {
          title: "A recommendation",
          body: "What to buy, what to build and what to skip, with the trade-offs spelled out.",
        },
        {
          title: "Questions for vendors",
          body: "What to ask before you sign, so the contract matches what you were sold.",
        },
      ],
    },
    process: {
      title: "How it runs.",
      steps: [
        {
          when: "Step 1",
          title: "Define the job",
          body: "We agree what the tool has to do, before anyone looks at a demo.",
        },
        {
          when: "Step 2",
          title: "Compare options",
          body: "I assess realistic options, starting with the tools you already pay for.",
        },
        {
          when: "Step 3",
          title: "Recommend",
          body: "You get a written recommendation and we walk through it together.",
        },
      ],
    },
    included: [
      "Needs summary and shortlist",
      "Written recommendation",
      "A walk-through call",
      "Vendor questions to take into negotiations",
    ],
    faqTitle: "Questions about tool selection.",
    faqs: [
      {
        question: "Do you earn commission on the tools you recommend?",
        answer:
          "No. Plaincraft takes no referral fees and has no partner deals, so recommendations are independent.",
      },
      {
        question:
          "Can you help us choose between ChatGPT and Microsoft Copilot?",
        answer:
          "Yes. That comparison comes up often, and the right answer depends on the tools your team already uses and how you handle client data.",
      },
      {
        question: "Will you help set up the tool we choose?",
        answer:
          "If you'd like. Training and automation builds are separate engagements, quoted the same way.",
      },
    ],
    next: ["ai-training", "automation-builds", "ai-governance"],
    ctaNote:
      "Tell me what you're weighing up. If you don't need help choosing, I'll say so.",
  },
  {
    id: "ai-strategy-roadmap",
    slug: "ai-strategy-roadmap",
    title: "AI Strategy & Roadmap for Small Businesses",
    description:
      "A prioritised 12-month AI strategy for South African SMEs in plain English, with costs, owners and a clear “don't bother” list.",
    serviceType: "AI strategy consulting",
    name: "Strategy & roadmap",
    headline: "Strategy & roadmap.",
    lede: "A prioritised 12-month plan in plain English, with costs, owners and a clear “don't bother” list. A plan your leadership team can agree on and act on, not a slide deck.",
    photo: {
      src: strategyPhoto,
      alt: "Hands pointing at a printed twelve-month plan spread across a meeting table.",
    },
    facts: [
      { label: "Duration", value: "About 1 week" },
      { label: "Fee", value: "Fixed, in writing" },
      { label: "Horizon", value: "12 months" },
      { label: "You get", value: "A costed roadmap" },
    ],
    goodFit: [
      "You want to plan AI adoption, not react to the next tool.",
      "Your leadership team needs to agree priorities and budget.",
      "You've done an audit and need to turn it into a plan.",
      "You want to know what not to spend money on.",
    ],
    notFit: [
      "You don't yet know where AI fits. Start with an audit.",
      "You need one automation built now. Go straight to a build.",
    ],
    deliverables: {
      intro:
        "A short plan you can act on with me, with someone else, or on your own.",
      items: [
        {
          title: "A prioritised roadmap",
          body: "Initiatives ordered by value and effort, so the first wins come early.",
        },
        {
          title: "Costs and owners",
          body: "A rough cost and a named owner for every step, so nothing drifts.",
        },
        {
          title: "Quick wins vs projects",
          body: "What can start this month, and what needs more groundwork.",
        },
        {
          title: "A “don't bother” list",
          body: "The ideas we looked at and decided against, with reasons.",
        },
      ],
    },
    process: {
      title: "How the week runs.",
      steps: [
        {
          when: "Start",
          title: "Gather the evidence",
          body: "We build on the audit, or on what I learn about your business first.",
        },
        {
          when: "Middle",
          title: "Prioritise",
          body: "Each opportunity is weighed for value, effort and risk, including POPIA.",
        },
        {
          when: "End",
          title: "Agree the plan",
          body: "We walk through the roadmap with your leadership team and settle owners.",
        },
      ],
    },
    included: [
      "Prioritisation workshop",
      "The written 12-month roadmap",
      "A walk-through with your leadership team",
      "30 days of follow-up questions by email",
    ],
    faqTitle: "Questions about the roadmap.",
    faqs: [
      {
        question: "What's in an AI roadmap?",
        answer:
          "A prioritised list of initiatives with costs, owners and timing, plus the things you've decided not to do.",
      },
      {
        question: "Do we need an audit first?",
        answer:
          "It helps, because a roadmap is only as good as the evidence behind it. We can agree the right starting point on a free call.",
      },
      {
        question: "Will you deliver the roadmap too?",
        answer:
          "If you want me to. The roadmap is yours, and you can act on it with me, with someone else or on your own.",
      },
    ],
    next: ["automation-builds", "ai-training", "fractional-head-of-ai"],
    ctaNote:
      "We'll work out whether you need a roadmap yet, or something simpler first.",
  },
  {
    id: "ai-governance",
    slug: "ai-policy-popia",
    title: "AI Usage Policy & POPIA Governance for SMEs",
    description:
      "An AI usage policy your team will actually read, plus data handling aligned with POPIA. Practical AI governance for South African businesses.",
    serviceType: "AI governance and policy",
    name: "Governance, risk & policy",
    headline: "Governance, risk & policy.",
    lede: "An AI usage policy your team will actually read, plus data handling aligned with POPIA. Clear rules for what's allowed, before client information ends up somewhere it shouldn't.",
    photo: {
      src: policyPhoto,
      alt: "A hand initialling a short printed policy document on a desk, with a filing cabinet behind.",
    },
    facts: [
      { label: "Duration", value: "1–2 weeks" },
      { label: "Fee", value: "Fixed, in writing" },
      { label: "Aligned with", value: "POPIA" },
      { label: "You get", value: "A plain-English policy" },
    ],
    goodFit: [
      "You're not sure what your team is putting into AI tools.",
      "You handle client or personal information.",
      "Clients or partners are asking how you use AI.",
      "You want guardrails before rolling AI out more widely.",
    ],
    notFit: [
      "You need a formal legal opinion. Work with an attorney.",
      "Nobody in the business uses AI tools yet, or plans to.",
    ],
    deliverables: {
      intro: "Practical guardrails your team can follow from day one.",
      items: [
        {
          title: "An AI usage policy",
          body: "One readable document on what's allowed, what isn't and who to ask.",
        },
        {
          title: "Data rules",
          body: "Which information can and can't go into AI tools, with real examples.",
        },
        {
          title: "A POPIA check",
          body: "Where personal information flows today and what needs care.",
        },
        {
          title: "A team briefing",
          body: "A short session so the policy is understood, not filed away.",
        },
      ],
    },
    process: {
      title: "How it runs.",
      steps: [
        {
          when: "Step 1",
          title: "Review",
          body: "I look at the tools in use and the kinds of information your team handles.",
        },
        {
          when: "Step 2",
          title: "Draft",
          body: "I write a policy that fits how your business actually works.",
        },
        {
          when: "Step 3",
          title: "Brief the team",
          body: "We walk your team through it and answer their questions.",
        },
      ],
    },
    included: [
      "Tool and data review",
      "The written AI usage policy",
      "A briefing session for your team",
      "30 days of follow-up questions by email",
    ],
    faqTitle: "Questions about AI policy.",
    faqs: [
      {
        question: "Do small businesses need an AI policy?",
        answer:
          "If your team uses AI tools with client or personal information, a short policy is the simplest way to reduce risk and stay aligned with POPIA.",
      },
      {
        question: "Is this legal advice?",
        answer:
          "No. It's practical operational guidance. For legal opinions on POPIA compliance, work with an attorney.",
      },
      {
        question: "Will the policy stop people using AI?",
        answer:
          "No. The aim is safe, confident use. Clear rules usually mean people use the tools more, not less.",
      },
    ],
    next: ["ai-training", "ai-readiness-audit", "fractional-head-of-ai"],
    ctaNote:
      "Tell me how your team uses AI today. I'll tell you what needs attention first.",
  },
  {
    id: "automation-builds",
    slug: "ai-automation",
    title: "AI Automation & Agent Builds for South African SMEs",
    description:
      "Working AI automations built on tools you already pay for: quotes, invoices, inbox triage and customer questions. Fully documented and fully yours.",
    serviceType: "Business process automation",
    name: "Automation & agent builds",
    headline: "Automation & agent builds.",
    lede: "Working automations built on tools you already pay for, for the admin your team repeats every week. Fully documented and fully yours, so you're never locked in.",
    photo: {
      src: automationPhoto,
      alt: "A laptop showing a simple workflow diagram beside a small stack of invoices on an office desk.",
    },
    facts: [
      { label: "Duration", value: "Agreed per build" },
      { label: "Fee", value: "Fixed, in writing" },
      { label: "Built on", value: "Your existing tools" },
      { label: "You own", value: "Everything" },
    ],
    goodFit: [
      "Your team re-types the same data into several systems.",
      "Quotes or proposals take days instead of hours.",
      "Supplier invoices are captured by hand.",
      "Customers ask the same questions every day.",
    ],
    notFit: [
      "You're not sure what to automate yet. Start with an audit.",
      "You need a customer-facing AI product built from scratch.",
    ],
    deliverables: {
      intro:
        "A working automation, and everything you need to keep it running.",
      items: [
        {
          title: "A working build",
          body: "Tested with the people who'll use it every day, on your real data.",
        },
        {
          title: "Your tools first",
          body: "Built on what you already pay for wherever possible, not new subscriptions.",
        },
        {
          title: "Full documentation",
          body: "How it works and how to change it, so your team or another provider can run it.",
        },
        {
          title: "Handover and training",
          body: "The people who run it know what to check and what to do when it misbehaves.",
        },
      ],
    },
    process: {
      title: "How a build runs.",
      steps: [
        {
          when: "Step 1",
          title: "Pick the first win",
          body: "We choose the automation that saves the most time for the least effort.",
        },
        {
          when: "Step 2",
          title: "Build",
          body: "I build it on your tools, with a person checking the output where it matters.",
        },
        {
          when: "Step 3",
          title: "Test with your team",
          body: "We run it on real work and adjust until it's good enough to rely on.",
        },
        {
          when: "Step 4",
          title: "Hand over",
          body: "Documentation and training, so it runs without me.",
        },
      ],
    },
    included: [
      "Scoping, build and testing",
      "Documentation of every workflow and prompt",
      "Handover training for your team",
      "30 days of follow-up support by email",
    ],
    faqTitle: "Questions about automation.",
    faqs: [
      {
        question: "What kind of work can AI automate in a small business?",
        answer:
          "Mostly repetitive admin: drafting quotes and emails, extracting details from invoices and forms, and answering routine questions using your own information.",
      },
      {
        question: "Who owns the automations you build?",
        answer:
          "You do. Workflows, prompts and documentation are all handed over.",
      },
      {
        question: "Will a person still check the output?",
        answer:
          "Where it matters, yes. Most builds draft or prepare the work and a person approves it.",
      },
    ],
    next: ["ai-training", "ai-governance", "fractional-head-of-ai"],
    ctaNote:
      "Tell me which task eats the most time. I'll tell you whether it's worth automating.",
  },
  {
    id: "ai-training",
    slug: "ai-training",
    title: "AI & ChatGPT Training for Staff in South Africa",
    description:
      "Hands-on AI training for your team, built around your real work, not generic prompt tips. Workshops for South African SMEs, on site or remote.",
    serviceType: "AI training and workshops",
    name: "Team training & workshops",
    headline: "Team training & workshops.",
    lede: "Hands-on sessions built around your real work, not generic prompt tips. Your team leaves knowing how to use AI safely and well on Monday morning.",
    photo: {
      src: trainingPhoto,
      alt: "Staff seated around a table with laptops during a hands-on workshop, looking at a screen.",
    },
    facts: [
      { label: "Format", value: "Hands-on workshops" },
      { label: "Fee", value: "Fixed, in writing" },
      { label: "Where", value: "On site or remote" },
      { label: "Built from", value: "Your real tasks" },
    ],
    goodFit: [
      "You bought ChatGPT or Copilot licences and adoption is low.",
      "Your team is curious about AI but unsure what's allowed.",
      "You want consistent, safe use across the business.",
      "You'd rather train the people you have than hire specialists.",
    ],
    notFit: [
      "You want a generic AI keynote for a large audience.",
      "Your team doesn't have access to any AI tools yet. Start with tool selection.",
    ],
    deliverables: {
      intro:
        "Skills your team will actually use, and the guardrails to use them safely.",
      items: [
        {
          title: "Tailored sessions",
          body: "Examples drawn from each team's own tasks and documents.",
        },
        {
          title: "Practical techniques",
          body: "Drafting, summarising and analysing with the tools you already have.",
        },
        {
          title: "Clear guardrails",
          body: "What not to put into AI tools, and why, in line with POPIA.",
        },
        {
          title: "Follow-up",
          body: "A check on what stuck, so the training turns into habit.",
        },
      ],
    },
    process: {
      title: "How training runs.",
      steps: [
        {
          when: "Before",
          title: "Tailor",
          body: "I learn what each team does so the examples come from their own work.",
        },
        {
          when: "During",
          title: "Hands-on sessions",
          body: "People use the tools on real tasks, not slides.",
        },
        {
          when: "After",
          title: "Follow up",
          body: "We check what's being used and adjust where it isn't.",
        },
      ],
    },
    included: [
      "Preparation tailored to your teams",
      "Hands-on workshop sessions",
      "Reference notes for attendees",
      "A follow-up check-in",
    ],
    faqTitle: "Questions about training.",
    faqs: [
      {
        question: "Do you offer ChatGPT training for businesses?",
        answer:
          "Yes. Training covers ChatGPT, Microsoft Copilot or whichever tools your team uses, applied to their actual work.",
      },
      {
        question: "Can training be done remotely?",
        answer:
          "Yes. Sessions can run on site or remotely anywhere in South Africa.",
      },
      {
        question: "Does everyone need to be technical?",
        answer:
          "No. The sessions are built for people who do the work, not for IT specialists.",
      },
    ],
    next: ["ai-governance", "automation-builds", "vendor-selection"],
    ctaNote:
      "Tell me about your team. I'll suggest the right format, or tell you if you don't need it.",
  },
  {
    id: "fractional-head-of-ai",
    slug: "fractional-head-of-ai",
    title: "Fractional Head of AI for South African SMEs",
    description:
      "Senior AI leadership a few days a month, for a fraction of the cost of a hire. A fractional Head of AI for South African small businesses.",
    serviceType: "Fractional AI leadership",
    name: "Fractional Head of AI",
    headline: "Fractional Head of AI.",
    lede: "Senior AI leadership a few days a month, for the price of a fraction of a hire. Someone who owns the roadmap, vets new tools and keeps adoption on track.",
    photo: {
      src: fractionalPhoto,
      alt: "Three people in a relaxed leadership meeting at a small round table, one gesturing at a printed page.",
    },
    facts: [
      { label: "Time", value: "A few days a month" },
      { label: "Fee", value: "Fixed monthly, in writing" },
      { label: "Reports to", value: "Your leadership" },
      { label: "You get", value: "Ongoing ownership" },
    ],
    goodFit: [
      "You've started using AI and need someone to own it.",
      "You can't justify a full-time senior AI hire.",
      "You want a trusted person to vet vendors and new tools.",
      "You need ongoing oversight of policy and data handling.",
    ],
    notFit: [
      "You need a full-time, in-house executive.",
      "You haven't started yet. An audit or roadmap usually comes first.",
    ],
    deliverables: {
      intro: "Senior oversight without the cost of a full-time hire.",
      items: [
        {
          title: "Roadmap ownership",
          body: "Priorities kept current and moving, month by month.",
        },
        {
          title: "Tool and vendor review",
          body: "Independent checks on anything new before you sign.",
        },
        {
          title: "Governance",
          body: "Policy and data handling kept in line with how you actually use AI.",
        },
        {
          title: "Regular check-ins",
          body: "Time with leadership and the team, on a schedule you choose.",
        },
      ],
    },
    process: {
      title: "How it works.",
      steps: [
        {
          when: "Start",
          title: "Agree the scope",
          body: "Days per month and priorities, agreed in writing at a fixed fee.",
        },
        {
          when: "Monthly",
          title: "Lead",
          body: "I work with your leadership and team to deliver the roadmap.",
        },
        {
          when: "Quarterly",
          title: "Review",
          body: "We review progress and adjust as the business changes.",
        },
      ],
    },
    included: [
      "An agreed number of days each month",
      "Roadmap ownership and reporting",
      "Vendor and tool reviews",
      "Email access between sessions",
    ],
    faqTitle: "Questions about fractional leadership.",
    faqs: [
      {
        question: "What is a fractional Head of AI?",
        answer:
          "A senior AI lead who works with your business part-time, a few days a month, instead of as a full-time employee.",
      },
      {
        question: "Can we start with fractional leadership straight away?",
        answer:
          "Usually it follows an audit or roadmap, but we can agree the right starting point on a free call.",
      },
      {
        question: "Can we stop at any time?",
        answer:
          "Notice terms are agreed in writing up front, and everything is documented so you're never dependent on me.",
      },
    ],
    next: ["ai-strategy-roadmap", "ai-governance", "ai-readiness-audit"],
    ctaNote:
      "We'll work out whether you need ongoing help, or a one-off engagement.",
  },
];

export const servicePath = (detail: Pick<ServiceDetail, "slug">) =>
  `/services/${detail.slug}` as const;

export const serviceDetailById = new Map(
  serviceDetails.map((detail) => [detail.id, detail]),
);

/** The homepage stage a service belongs to, e.g. "Stage A · Understand". */
export function serviceStage(id: string) {
  const stage = serviceStages.find((item) =>
    item.services.some((service) => service.id === id),
  );
  return stage ? `${stage.stage} · ${stage.label}` : undefined;
}
