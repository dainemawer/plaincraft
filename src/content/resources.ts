/**
 * Free resources: the POPIA + AI checklist and the AI usage policy template.
 * One source for the web pages, the Word download and the emailed copy.
 *
 * Not legal advice. Section numbers refer to the Protection of Personal
 * Information Act 4 of 2013 (POPIA).
 */

export type ResourceId = "popia-ai-checklist" | "ai-usage-policy-template";

export type Resource = {
  id: ResourceId;
  path: `/${string}`;
  title: string;
  /** For meta descriptions and cards. */
  description: string;
  /** The quotable one-sentence answer shown first. */
  summary: string;
  /** Last reviewed, ISO date. */
  updated: string;
  downloadName: string;
};

export const resources: Record<ResourceId, Resource> = {
  "popia-ai-checklist": {
    id: "popia-ai-checklist",
    path: "/resources/popia-ai-checklist",
    title: "POPIA + AI checklist for South African businesses",
    description:
      "A free one-page checklist of 15 things a South African business should check before staff put personal information into ChatGPT, Copilot or any other AI tool. Printable, with POPIA section references.",
    summary:
      "Before personal information goes into an AI tool, a South African business should know what goes in, where it goes, who can use it and what happens if something goes wrong. These 15 checks cover what POPIA expects.",
    updated: "2026-11-16",
    downloadName: "plaincraft-popia-ai-checklist.doc",
  },
  "ai-usage-policy-template": {
    id: "ai-usage-policy-template",
    path: "/resources/ai-usage-policy-template",
    title: "AI usage policy template for South African SMEs",
    description:
      "A free, fill-in-the-blanks AI usage policy for South African small businesses. Plain English, one to two pages, with POPIA built in. Read it online or download it for Word or Google Docs.",
    summary:
      "A workable AI usage policy for a small business fits on one or two pages: which tools are approved, what may and may never go into them, when a person must check the output, and who to ask. Fill in the blanks below and it's ready to brief your team.",
    updated: "2026-11-16",
    downloadName: "plaincraft-ai-usage-policy-template.doc",
  },
};

export const resourceList = Object.values(resources);

export const notLegalAdvice =
  "This is a practical guide, not legal advice. For decisions with legal consequences, or if you process a lot of special personal information, speak to a privacy lawyer.";

// ---------------------------------------------------------------------------
// POPIA + AI checklist

export type ChecklistItem = {
  check: string;
  why: string;
  /** POPIA section(s), e.g. "s 72". */
  ref?: string;
};

export const checklist: { heading: string; items: ChecklistItem[] }[] = [
  {
    heading: "Before you start",
    items: [
      {
        check:
          "List every AI tool used in the business, including free and personal accounts staff use for work.",
        why: "You can't protect information in tools you don't know about. In most small businesses, staff are already using AI on their own accounts.",
      },
      {
        check:
          "Name your Information Officer and make sure they're registered with the Information Regulator.",
        why: "Every business has one: by default it's the owner or head of the business. They're accountable for how personal information is handled, including in AI tools.",
        ref: "ss 55–56",
      },
    ],
  },
  {
    heading: "What goes in",
    items: [
      {
        check:
          "For each tool, write down the personal information it would touch: clients, staff and suppliers.",
        why: "Names, contact details, ID numbers, salaries and client files are all personal information. Pasting them into a chatbot or uploading a spreadsheet is processing them.",
      },
      {
        check:
          "Keep special personal information out by default: health, religion, race, biometrics, criminal records, trade union membership, and anything about children.",
        why: "POPIA sets stricter rules for these categories. Unless you've checked you're allowed to, they shouldn't go into a general AI tool at all.",
        ref: "ss 26–35",
      },
      {
        check:
          "Use the minimum. Remove names, ID numbers and account numbers whenever the task works without them.",
        why: "Most drafting, summarising and analysis works just as well on anonymised examples. Less data in means less risk.",
        ref: "s 10",
      },
      {
        check:
          "Check the use fits the reason you collected the information in the first place.",
        why: "Information collected to deliver a service shouldn't quietly be used for something unrelated, such as training a sales model.",
        ref: "ss 13, 15",
      },
    ],
  },
  {
    heading: "Where it goes",
    items: [
      {
        check:
          "Find out where each provider stores and processes data, and whether that's outside South Africa.",
        why: "Most AI tools process data abroad. That's allowed when the other country's law or a binding agreement gives comparable protection, or the person consents.",
        ref: "s 72",
      },
      {
        check:
          "Check whether the provider trains its models on your inputs, and switch it off or move to a business plan if it does.",
        why: "Free and personal plans often allow training on what you type. Business plans usually don't. The setting matters more than the brand.",
      },
      {
        check:
          "Have a written agreement with each provider that covers security, such as their business terms and data processing addendum.",
        why: "A provider that processes personal information for you is an operator under POPIA, and you need a contract that requires them to keep it secure.",
        ref: "ss 20–21",
      },
      {
        check: "Set how long each tool keeps chats, files and history.",
        why: "Keep information only as long as you need it. Most business AI tools let you set retention or turn history off.",
        ref: "s 14",
      },
    ],
  },
  {
    heading: "People and control",
    items: [
      {
        check:
          "Use company accounts with two-factor authentication, and match access to job roles.",
        why: "Personal accounts leave when the employee does, with your data in them. Securing access is part of POPIA's security safeguards.",
        ref: "s 19",
      },
      {
        check:
          "Keep a person in charge of any decision about a person: hiring, credit, pricing, discipline.",
        why: "POPIA limits decisions with legal or significant effects that are based solely on automated processing. Use AI to inform the decision, not make it.",
        ref: "s 71",
      },
      {
        check: "Write a one-page AI usage policy and walk the team through it.",
        why: "Rules nobody has read don't protect anyone. Our free template is a starting point.",
      },
    ],
  },
  {
    heading: "When something goes wrong",
    items: [
      {
        check:
          "Know who will tell the Information Regulator and the people affected if personal information is exposed through an AI tool.",
        why: "POPIA requires notification as soon as reasonably possible after a security compromise. Decide who does it before you need to.",
        ref: "s 22",
      },
      {
        check:
          "Review this checklist every six months, and whenever you add a new AI tool.",
        why: "AI tools change their terms and features often. A setting you checked in January may not be the same in July.",
      },
    ],
  },
];

export const checklistCount = checklist.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

// ---------------------------------------------------------------------------
// AI usage policy template

/** Blanks are written [LIKE THIS] so they're easy to find and replace. */
export const policyBlanks = [
  "[COMPANY NAME]",
  "[AI LEAD NAME]",
  "[AI LEAD EMAIL]",
  "[INFORMATION OFFICER NAME]",
  "[DATE]",
  "[REVIEW DATE]",
];

export type PolicySection = {
  heading: string;
  /** Paragraphs. */
  body?: string[];
  /** Bullet points. */
  list?: string[];
  /** A simple table, first row is the header. */
  table?: string[][];
  /** A note for whoever fills in the template, not part of the policy. */
  guidance?: string;
};

export const policyTitle = "[COMPANY NAME] AI usage policy";

export const policyIntro = "Effective [DATE]. Next review [REVIEW DATE].";

export const policySections: PolicySection[] = [
  {
    heading: "1. Why we have this policy",
    body: [
      "AI tools can save us time on writing, summarising and admin. They can also expose client and staff information, or produce confident mistakes. This policy explains how we use AI safely. It applies to everyone who works for or with [COMPANY NAME], on any device, whenever the work is ours.",
    ],
  },
  {
    heading: "2. Approved tools",
    body: [
      "Only use the tools below for work, with your company account. If a tool isn't on the list, ask [AI LEAD NAME] before using it, even if it's free.",
    ],
    table: [
      ["Tool", "Account", "Approved for"],
      [
        "e.g. Microsoft Copilot",
        "Company Microsoft 365 login",
        "Drafting, summarising, internal documents",
      ],
      [
        "e.g. ChatGPT Business",
        "Company workspace",
        "Drafting and research. No client personal information",
      ],
      ["", "", ""],
    ],
    guidance:
      "List only tools on a business plan that doesn't train on your data. Delete the examples you don't use.",
  },
  {
    heading: "3. What you can use AI for",
    list: [
      "Drafting and rewording emails, proposals and documents",
      "Summarising your own notes, meetings and public information",
      "Brainstorming, outlines and first drafts",
      "Working with anonymised examples, with names, numbers and identifying details removed",
    ],
  },
  {
    heading: "4. What never goes into any AI tool",
    list: [
      "ID numbers, passport numbers, bank or card details",
      "Health, medical, religious, biometric or criminal information about anyone",
      "Information about children",
      "Passwords, access codes or system credentials",
      "Anything a client has told us is confidential, unless the client has agreed",
    ],
    guidance:
      "Add anything specific to your business, such as tender documents or unreleased financials.",
  },
  {
    heading: "5. Client and staff information",
    body: [
      "Other personal information about clients, staff or suppliers may only go into the approved tools marked for it in section 2, and only as much as the task needs. If the task works without names, take them out. If you're unsure, ask first.",
    ],
  },
  {
    heading: "6. Always check before it leaves the business",
    body: [
      "AI makes mistakes that sound right. A person must read and check every word before AI output is:",
    ],
    list: [
      "sent to a client, supplier or anyone outside the business",
      "used in anything with numbers, prices or calculations",
      "used for anything legal, financial, HR or safety-related",
      "published on our website or social media",
    ],
  },
  {
    heading: "7. Decisions about people",
    body: [
      "AI can help prepare information, but a person makes every decision about a person: hiring, performance, discipline, credit, pricing or service. Never let an AI tool make or send that decision on its own.",
    ],
  },
  {
    heading: "8. Trying a new tool",
    body: [
      "Email [AI LEAD EMAIL] with the tool's name, what you'd use it for and what information it would touch. We'll check where it stores data, whether it trains on what we type, and what it costs, and reply within a week.",
    ],
  },
  {
    heading: "9. If something goes wrong",
    body: [
      "If you put information into an AI tool that shouldn't have gone in, or notice AI output that has caused a problem, tell [INFORMATION OFFICER NAME] the same day. You won't be in trouble for reporting it quickly. We may have to notify the Information Regulator and the people affected.",
    ],
  },
  {
    heading: "10. Training and review",
    body: [
      "Everyone gets a short briefing on this policy when they join and whenever it changes. [AI LEAD NAME] reviews it every six months, or sooner when we add a tool.",
    ],
  },
  {
    heading: "Acknowledgement",
    body: [
      "I have read this policy and will follow it.",
      "Name: ______________________   Signature: ______________________   Date: __________",
    ],
  },
];

// ---------------------------------------------------------------------------
// Plain-text versions, for the emailed copy.

export function checklistText() {
  const lines = [resources["popia-ai-checklist"].title.toUpperCase(), ""];
  let n = 0;
  for (const group of checklist) {
    lines.push(group.heading.toUpperCase());
    for (const item of group.items) {
      n += 1;
      lines.push(
        `[ ] ${n}. ${item.check}${item.ref ? ` (POPIA ${item.ref})` : ""}`,
      );
    }
    lines.push("");
  }
  lines.push(notLegalAdvice);
  return lines.join("\n");
}

export function policyText() {
  const lines = [policyTitle, policyIntro, ""];
  for (const section of policySections) {
    lines.push(section.heading.toUpperCase());
    for (const paragraph of section.body ?? []) lines.push(paragraph);
    for (const item of section.list ?? []) lines.push(`- ${item}`);
    for (const row of section.table ?? []) lines.push(row.join(" | "));
    lines.push("");
  }
  lines.push(notLegalAdvice);
  return lines.join("\n");
}
