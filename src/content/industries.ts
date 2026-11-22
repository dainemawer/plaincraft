/**
 * Industry playbooks under /industries: where AI helps first in one sector,
 * the POPIA points specific to it, how to estimate the saving and which
 * service to start with. Change the copy here only.
 */

export type Industry = {
  slug: string;
  /** Plural sector name, for headings and breadcrumbs. */
  name: string;
  /** <title>, kept under ~60 characters. */
  title: string;
  /** Meta description, ~150 characters. */
  description: string;
  headline: string;
  lede: string;
  /** The highest-value uses, most valuable first. */
  uses: { title: string; body: string; href?: string }[];
  popia: { intro: string; points: { title: string; body: string }[] };
  /** An illustrative saving, worked through with plain arithmetic. */
  saving: { task: string; maths: string; result: string };
  /** Service id from src/content/services.ts, and why it comes first. */
  start: { serviceId: string; why: string };
  /** A real client example. Add one per sector once there is one. */
  example?: string;
  faqs: { question: string; answer: string }[];
};

export const industries: Industry[] = [
  {
    slug: "accounting-firms",
    name: "Accounting firms",
    title: "AI for Accounting Firms in South Africa · Where to start",
    description:
      "Where AI saves time in a South African accounting or bookkeeping practice, what POPIA and your professional body expect, and where to start.",
    headline: "AI for accounting and bookkeeping practices.",
    lede: "Most of the time AI saves in a practice is in the admin around the work: chasing documents, capturing them and answering the same client questions. The judgement stays with you.",
    uses: [
      {
        title: "Capturing invoices and receipts",
        body: "AI reads supplier, date, VAT and line items from bills and receipts and prepares them in Xero, Sage or QuickBooks for a person to approve. Most practices already pay for a capture tool and use a fraction of it.",
        href: "/blog/invoice-capture",
      },
      {
        title: "Chasing missing documents",
        body: "Drafting the reminder emails for bank statements, IRP5s and supporting documents at year end, personalised from your checklist for each client, so staff send rather than write.",
      },
      {
        title: "First drafts of client emails and explanations",
        body: "Turning your notes into a plain-English email about a SARS letter, a provisional tax estimate or a set of management accounts. You check and send it.",
      },
      {
        title: "Month-end commentary",
        body: "A draft paragraph on what changed this month and why, from figures you already have. Useful for management packs that clients actually read.",
      },
      {
        title: "Internal know-how",
        body: "An assistant that answers staff questions from your own procedures and checklists, so juniors ask it before they interrupt a manager.",
      },
    ],
    popia: {
      intro:
        "Client financial records are personal information when they relate to individuals and sole proprietors, and your professional body's code of conduct requires confidentiality on top of POPIA.",
      points: [
        {
          title: "Tax numbers and ID numbers stay out of general tools.",
          body: "Use the capture and ledger tools built for that data, under a written agreement, not a chatbot on a personal account.",
        },
        {
          title: "Check where each tool stores data.",
          body: "Many capture and AI tools process data outside South Africa. POPIA section 72 sets the conditions for that, and a business plan with a data processing agreement is usually how they're met.",
        },
        {
          title: "Tell clients how you work.",
          body: "A line in your engagement letter saying which tools you use to process their records, and why, answers the question before a client asks it.",
        },
      ],
    },
    saving: {
      task: "Capturing supplier bills for 40 bookkeeping clients",
      maths:
        "Say 1,200 bills a month at 3 minutes each is 60 hours. If AI capture cuts that to about 1 minute of review per bill, it's 20 hours.",
      result:
        "About 40 hours a month back, before counting fewer data-entry errors.",
    },
    start: {
      serviceId: "automation-builds",
      why: "Most practices already know which admin job hurts. A fixed-fee build on the tools you use, usually capture or document chasing, pays back fastest.",
    },
    faqs: [
      {
        question: "Will AI replace bookkeepers?",
        answer:
          "It replaces re-typing, not judgement. Capture, coding suggestions and first drafts get faster, and bookkeepers spend more of their time checking, advising and dealing with clients.",
      },
      {
        question: "Can we use ChatGPT with client financial information?",
        answer:
          "Only on a business plan that doesn't train on your data, under a written agreement, and with clear rules about what may go in. ID numbers, tax numbers and bank details belong in your ledger and capture tools, not a general chatbot.",
      },
      {
        question: "Do you replace our accounting software?",
        answer:
          "No. I work with the ledger and tools you already use, such as Xero, Sage or QuickBooks, and never sell a competing one.",
      },
    ],
  },
  {
    slug: "law-firms",
    name: "Law firms",
    title: "AI for Law Firms in South Africa · Where to start",
    description:
      "Where AI saves time in a small South African law firm, what privilege, POPIA and FICA mean for AI tools, and the safest place to start.",
    headline: "AI for small law firms.",
    lede: "AI can take hours out of drafting, summarising and client admin. It can also invent a case citation with complete confidence. The firms that do well use it for the first and check for the second.",
    uses: [
      {
        title: "Summarising long documents",
        body: "Turning a bundle, a lease or a set of correspondence into a structured summary with page references, so the attorney reads the parts that matter first.",
      },
      {
        title: "First drafts from precedents",
        body: "Drafting letters and standard agreements from your own precedents and instructions. The attorney edits and signs off, as with a candidate attorney's draft.",
      },
      {
        title: "Client intake and updates",
        body: "Structuring new enquiries, drafting engagement letters and routine progress updates, so clients hear from the firm more often for less effort.",
      },
      {
        title: "Time recording and billing narratives",
        body: "Drafting fee note descriptions from diary entries and emails, which recovers time that otherwise goes unbilled.",
      },
    ],
    popia: {
      intro:
        "Client files carry legal professional privilege and a duty of confidentiality under your professional code, on top of POPIA. Attorneys are also accountable institutions under FICA.",
      points: [
        {
          title: "Privileged material only goes into tools you control.",
          body: "That means a business plan with a written agreement, no training on your data and retention you've set deliberately. Free and personal accounts don't qualify.",
        },
        {
          title: "Check every citation.",
          body: "General AI tools can invent cases and quotes. South African courts have already criticised filings that relied on them. Treat AI research as a lead to verify, never as authority.",
        },
        {
          title: "Keep FICA documents in your FICA process.",
          body: "Copies of IDs and proof of address belong in the system built to hold them, not in a chatbot used to summarise a file.",
        },
      ],
    },
    saving: {
      task: "Summarising incoming correspondence and documents",
      maths:
        "Say an attorney spends 6 hours a week reading to get on top of new material. If a structured summary halves the time to find what matters, that's 3 hours.",
      result:
        "About 3 fee-earning hours a week per attorney, at whatever your hourly rate is.",
    },
    start: {
      serviceId: "ai-governance",
      why: "Staff in most firms are already using AI tools on their own. Clear rules on which tools, which settings and what may go in come before anything else.",
    },
    faqs: [
      {
        question: "Can a law firm use ChatGPT?",
        answer:
          "Yes, with the right plan and rules. Use a business plan that doesn't train on your data, keep privileged and FICA material out unless the tool is approved for it, and check every citation and quote it produces.",
      },
      {
        question: "Do you give legal advice on AI?",
        answer:
          "No. I handle the practical side: which tools, which settings, what staff may put into them and training. Legal questions about AI go to your own lawyers or a specialist firm.",
      },
      {
        question: "Can AI do legal research?",
        answer:
          "It can find leads and summarise material you give it. It can also invent authorities. Every case, section and quote must be checked against the source before it's relied on.",
      },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics companies",
    title: "AI for Logistics Companies in South Africa",
    description:
      "Where AI saves time in a small South African logistics or courier business: quotes, delivery paperwork and customer queries. POPIA notes included.",
    headline: "AI for logistics and courier businesses.",
    lede: "In a small logistics business, the paperwork and the phone calls grow faster than the fleet. That's where AI helps first: quotes, documents and the same customer questions, over and over.",
    uses: [
      {
        title: "Rate and quote requests",
        body: "Reading a quote request from email or WhatsApp, applying your rate card and drafting the quote for a person to check and send.",
        href: "/blog/automating-quotes",
      },
      {
        title: "Delivery paperwork",
        body: "Capturing waybills, proofs of delivery and supplier invoices from photos and PDFs into your system, with anything unclear flagged for review.",
      },
      {
        title: "Where's my delivery?",
        body: "Answering routine status questions from your tracking data, and handing anything unusual to a person straight away.",
      },
      {
        title: "Exception reports",
        body: "A daily summary of late, failed and damaged deliveries in plain language, so the operations manager starts the day with a list, not a spreadsheet.",
      },
    ],
    popia: {
      intro:
        "Customer names and addresses, recipient phone numbers and driver information are all personal information. Vehicle tracking that follows a driver is personal information about that driver.",
      points: [
        {
          title: "Be careful with automated decisions about drivers.",
          body: "POPIA section 71 limits decisions based solely on automated processing that significantly affect a person. A system that scores or disciplines drivers needs a person in the loop.",
        },
        {
          title: "Recipients didn't sign up with you.",
          body: "Use their details for the delivery only, and keep them out of marketing and out of tools that train on your data.",
        },
        {
          title: "Know where tracking and chat data go.",
          body: "Messaging and tracking platforms often store data abroad. Check the terms, and get a written agreement for any tool that processes customer data for you.",
        },
      ],
    },
    saving: {
      task: "Quoting ad-hoc deliveries",
      maths:
        "Say 25 quote requests a day at 12 minutes each is 5 hours. If a drafted quote takes 3 minutes to check, it's about 1 hour 15 minutes.",
      result:
        "Around 3 to 4 hours a day back, and quotes go out while the customer is still deciding.",
    },
    start: {
      serviceId: "ai-readiness-audit",
      why: "Logistics businesses usually have several candidates: quotes, paperwork, customer queries. A two-week audit scores them on time saved and effort, so you build the right one first.",
    },
    faqs: [
      {
        question: "Can AI answer customer delivery queries on WhatsApp?",
        answer:
          "Yes, for routine status questions answered from your tracking data. It should hand anything unusual, such as damage, complaints or a missing parcel, to a person immediately.",
      },
      {
        question: "Do we need new tracking software first?",
        answer:
          "Usually not. Most first projects work from the systems you already have, as long as they can export or share data.",
      },
      {
        question: "Is driver tracking data covered by POPIA?",
        answer:
          "Yes. Location data linked to an identifiable driver is personal information. Use it for the purposes drivers were told about, and keep a person involved in any decision that affects them.",
      },
    ],
  },
  {
    slug: "estate-agents",
    name: "Estate agencies",
    title: "AI for Estate Agents in South Africa · Where to start",
    description:
      "Where AI helps a South African estate agency: listings, lead response and admin. What POPIA, FICA and direct marketing rules mean for AI tools.",
    headline: "AI for estate agencies.",
    lede: "Agents win business by answering first and following up longest. AI helps with both, and with the listing copy and admin around every sale. The compliance side needs as much care as the marketing.",
    uses: [
      {
        title: "Answering new leads fast",
        body: "Drafting a personal reply to a portal or website enquiry within minutes, with viewing times, so the agent approves and sends instead of writing from scratch.",
      },
      {
        title: "Listing descriptions",
        body: "First drafts of listing copy from the agent's notes and photos, in your agency's style, ready to edit.",
      },
      {
        title: "Follow-up that doesn't stop",
        body: "Drafting check-in messages to buyers and sellers at the right intervals, from your CRM, so warm leads don't go cold.",
      },
      {
        title: "Market updates for sellers",
        body: "A plain-English summary of recent activity and comparable sales for a seller, drafted from data the agent provides.",
      },
    ],
    popia: {
      intro:
        "Agencies hold a lot of personal information: buyer and seller contact details, FICA documents and financial information. Estate agents are accountable institutions under FICA.",
      points: [
        {
          title: "Marketing messages need consent.",
          body: "POPIA section 69 restricts electronic direct marketing to people who aren't your customers unless they've opted in. AI makes it easy to send more messages, so check your list first.",
        },
        {
          title: "FICA documents stay in your FICA process.",
          body: "ID copies, proof of address and source-of-funds information don't belong in a general AI tool.",
        },
        {
          title: "Check what goes into listing tools.",
          body: "Seller names, occupancy details and security information shouldn't end up in prompts or public listing copy.",
        },
      ],
    },
    saving: {
      task: "Replying to new portal and website leads",
      maths:
        "Say an agent gets 30 new leads a week and spends 8 minutes writing each first reply. That's 4 hours. Approving a drafted reply takes about 2 minutes, or 1 hour.",
      result:
        "About 3 hours a week per agent, and replies go out faster, which is what usually wins the lead.",
    },
    start: {
      serviceId: "ai-training",
      why: "Most agents already have AI tools on their phones. A hands-on workshop built around your own listings and leads, with clear rules on client data, gets the whole office using them well.",
    },
    faqs: [
      {
        question: "Can AI write our property listings?",
        answer:
          "It can write a good first draft from the agent's notes. The agent checks every fact, especially sizes, rates and features, because the listing is the agency's representation, not the tool's.",
      },
      {
        question: "Can we use AI to message our whole database?",
        answer:
          "Only people who have opted in or are existing customers, under POPIA's direct marketing rules. AI makes messaging cheap, which makes checking consent more important, not less.",
      },
      {
        question: "Does AI replace the agent?",
        answer:
          "No. It handles the writing and the reminders. The relationships, the valuation and the negotiation stay with the agent.",
      },
    ],
  },
  {
    slug: "medical-practices",
    name: "Medical practices",
    title: "AI for Medical Practices in South Africa · Where to start",
    description:
      "Where AI saves admin time in a South African medical or allied health practice, and what POPIA and confidentiality rules mean for patient information.",
    headline: "AI for medical and allied health practices.",
    lede: "Practices lose hours to notes, letters and front-desk admin. AI can give much of that time back. Patient information is the most sensitive data a small business holds, so the rules come first.",
    uses: [
      {
        title: "Drafting clinical notes and letters",
        body: "AI scribes and drafting tools turn a consultation or dictation into a draft note or referral letter. The clinician reviews and signs every one.",
      },
      {
        title: "Front-desk questions",
        body: "Answering routine questions about hours, fees, preparation and directions, and booking or rescheduling, with anything clinical handed to staff.",
      },
      {
        title: "Billing and claims admin",
        body: "Checking claims for missing information before submission and drafting responses to rejected claims, with a person approving each one.",
      },
      {
        title: "Patient reminders and instructions",
        body: "Clear, consistent reminder and aftercare messages from templates, without patient details going into a general AI tool.",
        href: "/blog/popia-ai-tools-checklist",
      },
    ],
    popia: {
      intro:
        "Health information is special personal information under POPIA, and your professional council's rules on patient confidentiality apply as well. This is the sector where the tool, the plan and the agreement matter most.",
      points: [
        {
          title: "Patients should know.",
          body: "If an AI scribe listens to consultations, tell patients and let them say no. A notice in the waiting room and a line at the start of the consultation is a sensible minimum.",
        },
        {
          title: "Use tools built for health data.",
          body: "That means a written agreement, no training on your data, known storage locations and retention you control. General chatbots on personal accounts are out.",
        },
        {
          title: "Clinical judgement stays with the clinician.",
          body: "AI drafts. It doesn't diagnose, prescribe or decide, and every clinical note is checked before it's saved.",
        },
      ],
    },
    saving: {
      task: "Writing up consultation notes",
      maths:
        "Say a practitioner sees 20 patients a day and spends 5 minutes writing up each one. That's 100 minutes. Reviewing a draft note takes about 2 minutes, or 40 minutes.",
      result:
        "About an hour a day per practitioner, which in most practices is the hour that used to happen after closing.",
    },
    start: {
      serviceId: "ai-governance",
      why: "Before any tool touches patient information, the practice needs written rules, a register of the tools in use and agreements that cover them. It's fixed-fee and usually quick.",
    },
    faqs: [
      {
        question: "Are AI scribes allowed in South Africa?",
        answer:
          "They can be used, with care. Health information is special personal information under POPIA, so use a tool with a proper agreement and known data storage, tell patients and let them decline, and review every note.",
      },
      {
        question: "Can staff use ChatGPT for patient letters?",
        answer:
          "Not with patient details on a free or personal account. Templates with no patient information are fine. Anything with patient details needs an approved tool under a written agreement.",
      },
      {
        question: "Do you give medical or legal advice?",
        answer:
          "No. I help practices choose and set up tools and write the internal rules for using them. Clinical and legal questions go to the right professionals.",
      },
    ],
  },
];

export const industryPath = (industry: Pick<Industry, "slug">) =>
  `/industries/${industry.slug}` as const;

export const findIndustry = (slug: string) =>
  industries.find((industry) => industry.slug === slug);
