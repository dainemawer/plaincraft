/**
 * Copy for the individual service pages under /services. Each page targets
 * the phrases people actually search for that service, and expands on the
 * one-line summary shown on the homepage (keyed by the same service id).
 */

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
  headline: string;
  intro: string;
  forYouIf: string[];
  youGet: string[];
  howItWorks: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "ai-readiness-audit",
    slug: "ai-readiness-audit",
    title: "AI Readiness Audit for South African SMEs",
    description:
      "A two-week, fixed-fee AI readiness assessment. Every process is scored for value, effort and risk, so you know exactly where AI will pay back.",
    serviceType: "AI readiness assessment",
    headline: "AI readiness audit: find out where AI will actually pay back.",
    intro:
      "Before you buy tools or hire anyone, you need to know where AI fits in your business and where it doesn't. The AI readiness audit is two weeks of mapping how work really gets done, then scoring every opportunity for value, effort and risk. You finish with a clear, ranked list instead of a vague sense that you should be doing something with AI.",
    forYouIf: [
      "You know you need AI but don't know where to start",
      "Your team repeats the same admin every week and you suspect some of it could be automated",
      "You've bought AI licences and want to know why nobody uses them",
      "You want a straight answer before committing budget",
    ],
    youGet: [
      "A map of your key processes and where the hours go",
      "Every AI opportunity scored for value, effort and risk",
      "A clear verdict on each one: automate, assist, fix the process first, or leave to people",
      "A short written report in plain English, not a 60-page deck",
    ],
    howItWorks: [
      {
        step: "Conversations with your team",
        detail:
          "I talk to the people doing the work to see how it really happens, not how the process document says it does.",
      },
      {
        step: "Process mapping",
        detail:
          "I map the repetitive, time-consuming work and estimate the hours it takes each week.",
      },
      {
        step: "Scoring",
        detail:
          "Each opportunity is rated for value, effort and risk, including data privacy under POPIA.",
      },
      {
        step: "Readout",
        detail:
          "We walk through the results together, and you decide what happens next, with me or without me.",
      },
    ],
    faqs: [
      {
        question: "How long does an AI readiness audit take?",
        answer:
          "About two weeks, depending on the size of your team and how many processes are in scope.",
      },
      {
        question: "What does an AI readiness audit cost?",
        answer:
          "It's a fixed fee, quoted in writing after a free 30-minute call, so you know the full cost before anything starts.",
      },
      {
        question: "Do we have to use you for the work afterwards?",
        answer:
          "No. The report is yours, and you can act on it with me, with someone else, or on your own.",
      },
    ],
  },
  {
    id: "vendor-selection",
    slug: "ai-tool-selection",
    title: "Independent AI Tool & Vendor Selection | South Africa",
    description:
      "Independent advice on which AI tools to buy, build or skip. No referral fees, no partner deals: recommendations based only on what fits your business.",
    serviceType: "AI vendor and tool selection",
    headline: "Independent advice on which AI tools to buy.",
    intro:
      "Every vendor says their AI is the answer. I take no referral fees and have no partner deals, so my only job is to tell you what fits your business: what to buy, what to build on tools you already pay for, and what to skip entirely.",
    forYouIf: [
      "You're being pitched AI products and can't tell them apart",
      "You want to know whether Microsoft Copilot, ChatGPT or another tool suits your team",
      "You suspect you're paying for software that overlaps",
      "You need a second opinion before signing a contract",
    ],
    youGet: [
      "A shortlist based on your actual workflows, not feature lists",
      "Plain-English comparisons of cost, fit, data handling and lock-in",
      "A recommendation on what to buy, what to build and what to skip",
      "Questions to ask vendors before you sign",
    ],
    howItWorks: [
      {
        step: "Understand the job",
        detail:
          "We start with the work you need done, not with the tools on the market.",
      },
      {
        step: "Assess the options",
        detail:
          "I compare realistic options, including the tools you already pay for.",
      },
      {
        step: "Recommend",
        detail:
          "You get a clear recommendation and the reasoning behind it, in writing.",
      },
    ],
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
          "Yes. That comparison comes up often, and the right answer depends on the tools your team already uses and how you handle data.",
      },
    ],
  },
  {
    id: "ai-strategy-roadmap",
    slug: "ai-strategy-roadmap",
    title: "AI Strategy & Roadmap for Small Businesses | South Africa",
    description:
      "A prioritised 12-month AI strategy in plain English, with costs, owners and a clear “don't bother” list. Built for South African SMEs.",
    serviceType: "AI strategy consulting",
    headline: "An AI strategy and roadmap you can act on.",
    intro:
      "An AI strategy for a small business shouldn't be a slide deck. It should be a short, prioritised plan that says what to do first, what it will cost, who owns it, and what to ignore. That's what the roadmap gives you: twelve months of clear next steps in plain English.",
    forYouIf: [
      "You want to plan AI adoption rather than react to the next shiny tool",
      "Your leadership team needs to agree on priorities and budget",
      "You've done an audit and need to turn it into a plan",
      "You want to know what not to spend money on",
    ],
    youGet: [
      "A prioritised 12-month plan in plain English",
      "Estimated costs and an owner for each initiative",
      "Quick wins separated from longer-term projects",
      "A clear “don't bother” list",
    ],
    howItWorks: [
      {
        step: "Start from the evidence",
        detail:
          "The roadmap builds on an audit or on what we learn about your business.",
      },
      {
        step: "Prioritise",
        detail:
          "Opportunities are ordered by value and effort so the first wins come early.",
      },
      {
        step: "Plan",
        detail:
          "Each step gets an owner, a rough cost and a timeframe. It usually takes about a week.",
      },
    ],
    faqs: [
      {
        question: "What's in an AI roadmap?",
        answer:
          "A prioritised list of initiatives with costs, owners and timing, plus the things you've decided not to do.",
      },
      {
        question: "Do we need an audit first?",
        answer:
          "It helps, because the roadmap is only as good as the evidence behind it, but we can agree the right starting point on a free call.",
      },
    ],
  },
  {
    id: "ai-governance",
    slug: "ai-policy-popia",
    title: "AI Usage Policy & POPIA Governance for SMEs",
    description:
      "An AI usage policy your team will actually read, plus data handling aligned with POPIA. Practical AI governance for South African businesses.",
    serviceType: "AI governance and policy",
    headline: "An AI policy your team will read, aligned with POPIA.",
    intro:
      "Your staff are probably already pasting work into AI tools. An AI usage policy sets clear, practical rules for what's allowed, and makes sure client and personal information is handled in line with POPIA. It's written for the people who have to follow it, so it's short and readable.",
    forYouIf: [
      "You're not sure what your team is putting into ChatGPT and similar tools",
      "You handle client or personal information and need to stay POPIA-compliant",
      "Clients or partners are asking how you use AI",
      "You want guardrails before rolling AI out more widely",
    ],
    youGet: [
      "A written AI usage policy in plain English",
      "Guidance on which data can and can't go into AI tools",
      "Data handling aligned with POPIA",
      "A short briefing so your team understands the rules",
    ],
    howItWorks: [
      {
        step: "Review",
        detail:
          "I look at the tools in use and the kinds of information your team handles.",
      },
      {
        step: "Draft",
        detail: "I write a policy that fits how your business actually works.",
      },
      {
        step: "Roll out",
        detail:
          "We walk your team through it so the policy is used, not filed away.",
      },
    ],
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
    ],
  },
  {
    id: "automation-builds",
    slug: "ai-automation",
    title: "AI Automation & Agent Builds for South African SMEs",
    description:
      "Working AI automations built on tools you already pay for: quotes, invoices, inbox triage and customer questions. Fully documented and fully yours.",
    serviceType: "Business process automation",
    headline: "AI automation built on the tools you already pay for.",
    intro:
      "This is where AI starts saving real time. I build working automations and AI agents for the repetitive work your team does every week, such as drafting quotes, capturing invoices, triaging the inbox and answering routine customer questions. Everything is documented and owned by you.",
    forYouIf: [
      "Your team re-types the same data into several systems",
      "Quotes or proposals take days instead of hours",
      "Supplier invoices are captured by hand",
      "Customers ask the same questions every day",
    ],
    youGet: [
      "Working automations, tested with your team",
      "Builds on tools you already use wherever possible",
      "Full documentation, so you're never locked in",
      "Handover and training for the people who'll run it",
    ],
    howItWorks: [
      {
        step: "Pick the first win",
        detail:
          "We start with the automation that saves the most time for the least effort.",
      },
      {
        step: "Build and test",
        detail:
          "I build it, then test it with the people who'll use it every day.",
      },
      {
        step: "Hand over",
        detail:
          "You get documentation and training so your team, or another provider, can run it without me.",
      },
    ],
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
    ],
  },
  {
    id: "ai-training",
    slug: "ai-training",
    title: "AI & ChatGPT Training for Staff | South Africa",
    description:
      "Hands-on AI training for your team, built around your real work, not generic prompt tips. Workshops for South African SMEs, on site or remote.",
    serviceType: "AI training and workshops",
    headline: "AI training built around your team's real work.",
    intro:
      "Most AI licences go unused because nobody showed the team how the tools fit their actual job. These hands-on sessions use your own tasks and documents, so people leave knowing how to use AI safely and well on Monday morning, not just how to write a clever prompt.",
    forYouIf: [
      "You bought ChatGPT, Copilot or similar licences and adoption is low",
      "Your team is curious about AI but unsure what's allowed",
      "You want consistent, safe use of AI across the business",
      "You'd rather train the people you have than hire specialists",
    ],
    youGet: [
      "Hands-on workshops using your real tasks",
      "Practical techniques for drafting, summarising and analysing",
      "Clear guidance on what not to put into AI tools",
      "Sessions on site or remote",
    ],
    howItWorks: [
      {
        step: "Tailor",
        detail:
          "I learn what each team does so the examples come from their own work.",
      },
      {
        step: "Train",
        detail: "Hands-on sessions where people use the tools on real tasks.",
      },
      {
        step: "Follow up",
        detail:
          "We check what stuck and adjust, so the training turns into habit.",
      },
    ],
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
    ],
  },
  {
    id: "fractional-head-of-ai",
    slug: "fractional-head-of-ai",
    title: "Fractional Head of AI for SMEs | South Africa",
    description:
      "Senior AI leadership a few days a month, for a fraction of the cost of a hire. A fractional Head of AI for South African small businesses.",
    serviceType: "Fractional AI leadership",
    headline: "A fractional Head of AI, a few days a month.",
    intro:
      "Most SMEs don't need a full-time AI executive, but they do need someone senior keeping AI adoption on track. As your fractional Head of AI, I own the roadmap, guide the team, vet new tools and keep governance in place, a few days a month, for a fraction of the cost of a hire.",
    forYouIf: [
      "You've started using AI and need someone to own it",
      "You can't justify a full-time senior AI hire",
      "You want a trusted person to vet vendors and new tools",
      "You need ongoing oversight of policy and data handling",
    ],
    youGet: [
      "Ongoing senior AI leadership a few days a month",
      "Ownership of the AI roadmap and its priorities",
      "Independent review of new tools and vendors",
      "Regular check-ins with leadership and the team",
    ],
    howItWorks: [
      {
        step: "Agree the scope",
        detail:
          "We agree the days per month and the priorities in writing, at a fixed fee.",
      },
      {
        step: "Lead",
        detail: "I work with your leadership and team to deliver the roadmap.",
      },
      {
        step: "Review",
        detail:
          "We review progress regularly and adjust as the business changes.",
      },
    ],
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
    ],
  },
];

export const servicePath = (detail: Pick<ServiceDetail, "slug">) =>
  `/services/${detail.slug}` as const;

export const serviceDetailById = new Map(
  serviceDetails.map((detail) => [detail.id, detail]),
);
