/**
 * Blog articles. Metadata lives here so listings, the sitemap, JSON-LD and
 * llms.txt never need to load the article bodies, which are MDX files in
 * src/content/blog/<slug>.mdx.
 *
 * To publish a draft: finish its MDX file, set `draft: false`, update `date`,
 * then deploy and run `pnpm indexnow`.
 */

import type { StaticImageData } from "next/image";
import automatingQuotes from "@/assets/images/blog/automating-quotes.jpg";
import invoiceCapture from "@/assets/images/blog/invoice-capture.jpg";
import popiaChecklist from "@/assets/images/blog/popia-checklist.jpg";
import unusedLicences from "@/assets/images/blog/unused-licences.jpg";
import usagePolicy from "@/assets/images/blog/usage-policy.jpg";
import vendorQuestions from "@/assets/images/blog/vendor-questions.jpg";
import featured from "@/assets/images/blog/what-ai-can-do-featured.jpg";
import header from "@/assets/images/blog/what-ai-can-do-header.jpg";
import whereAiShouldntGo from "@/assets/images/blog/where-ai-shouldnt-go.jpg";

export const categories = [
  "Guides",
  "Automation",
  "Governance",
  "Adoption",
  "Buying",
] as const;

export type Category = (typeof categories)[number];

type Image = { src: StaticImageData; alt: string };

export type Article = {
  slug: string;
  title: string;
  /** Lede under the headline, and the meta description. */
  description: string;
  /** One-line summary for article cards. */
  excerpt: string;
  category: Category;
  tags: string[];
  /** ISO date of publication. */
  date: string;
  /** ISO date of the last meaningful edit, if after publication. */
  updated?: string;
  readMinutes: number;
  /** Card and social image. */
  image: Image;
  /** Wide image under the article header. Falls back to `image`. */
  header?: Image & { caption?: string };
  /**
   * Questions shown after the article and published as FAQPage data. The
   * answers are plain text and must read the same in both places.
   */
  faqs?: { question: string; answer: string }[];
  /** Drafts are left out of every listing, the sitemap and the build. */
  draft: boolean;
};

export const articles: Article[] = [
  {
    slug: "what-ai-can-do-for-a-small-business",
    title: "What AI can actually do for a 20-person business.",
    description:
      "Forget the demos. Here are the three jobs AI does well in a small business, what it costs to try, and a one-week plan to find your first win.",
    excerpt:
      "The three jobs AI does well in a small business, what it costs to try, and a one-week plan to find your first win.",
    category: "Guides",
    tags: ["Getting started"],
    date: "2026-11-10",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: featured,
      alt: "A business owner and three team members gathered around one laptop, one pointing at the screen.",
    },
    header: {
      src: header,
      alt: "A team working through a process diagram on a whiteboard while colleagues watch from a table of laptops.",
      caption: "Start with the work your team already does, not with the tool.",
    },
    faqs: [
      {
        question: "Do I need to buy new software to start using AI?",
        answer:
          "Usually not. If your business already uses Microsoft 365 or Google Workspace, you probably have access to capable AI tools today. Most first projects are about setting those up properly for one task, then deciding whether anything else is worth buying.",
      },
      {
        question: "How much does it cost a small business to try AI?",
        answer:
          "The tools are usually a few hundred rand per user per month on business plans, and you only need licences for the people whose work you're changing. The bigger cost is time: a few hours a week for a month from the person who knows the task best, to describe it, test the output and decide what good enough looks like.",
      },
      {
        question: "Which task should a small business automate first?",
        answer:
          "The one your team repeats most often that involves writing, reading documents or answering routine questions. Multiply how often it happens by how long it takes and what that time costs you. The task with the biggest number, and a quick way for a person to check the output, is usually the right first project.",
      },
      {
        question:
          "Is it safe to put client information into ChatGPT or Copilot?",
        answer:
          "Only if you've checked. POPIA applies as soon as personal information goes into an AI tool. Use a business plan that doesn't train on your data, keep ID numbers, health and banking details out of general AI tools, and give staff written rules on what may go in.",
      },
    ],
    draft: false,
  },
  {
    slug: "unused-chatgpt-licences",
    title: "You bought ChatGPT licences. Nobody uses them. Here's why.",
    description:
      "It's rarely the tool. It's that nobody showed the team which of their tasks it's for. How to turn unused AI licences into everyday habits.",
    excerpt:
      "It's rarely the tool. It's that nobody showed the team which of their tasks it's for.",
    category: "Adoption",
    tags: ["Training", "ChatGPT"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: unusedLicences,
      alt: "A team meeting around a long table with laptops open.",
    },
    faqs: [
      {
        question: "How do I see who is using our AI licences?",
        answer:
          "Microsoft 365 and Google Workspace admin centres show Copilot and Gemini usage per person, and ChatGPT and Claude business plans have similar admin views. Split your team into regular users, people who tried and stopped, and people who never started. The middle group is where most of the opportunity is.",
      },
      {
        question: "Why do staff stop using AI tools after the first week?",
        answer:
          "Usually because nobody showed them which of their own tasks it helps with, they aren't sure what they're allowed to put into it, or their first answer was poor. Training on one real task per team, a reusable prompt and a one-page set of rules fixes most of it.",
      },
      {
        question: "Should we cancel licences that aren't being used?",
        answer:
          "Cancel seats for people whose work doesn't involve much writing, reading or answering questions. For everyone else, run a two-week reset first: one real task per team, a short training session and clear rules. Then decide seat by seat with the usage report in front of you.",
      },
      {
        question: "Why do AI licences cost more each year in South Africa?",
        answer:
          "Most AI subscriptions are billed in US dollars, so the rand cost moves with the exchange rate, and annual renewals can come in noticeably higher. Check whether your provider or a local reseller can invoice in rands at a fixed price.",
      },
    ],
    draft: false,
  },
  {
    slug: "popia-ai-tools-checklist",
    title: "POPIA and AI tools: a plain-English checklist",
    description:
      "Ten questions to answer before anyone pastes client data into an AI tool. A practical POPIA checklist for South African small businesses.",
    excerpt:
      "Ten questions to answer before anyone pastes client data into an AI tool.",
    category: "Governance",
    tags: ["POPIA", "Data"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: popiaChecklist,
      alt: "An office filing cabinet with a padlock resting on top.",
    },
    faqs: [
      {
        question: "Does POPIA apply to ChatGPT and other AI tools?",
        answer:
          "Yes, whenever personal information goes into them. Pasting a client's details into a chatbot, uploading a staff spreadsheet or recording a meeting with an AI note-taker all count as processing personal information, so the same POPIA conditions apply as for any other system.",
      },
      {
        question: "Can we use AI tools that store data outside South Africa?",
        answer:
          "Yes, if the conditions in section 72 of POPIA are met, for example where the provider is bound by law or an agreement giving comparable protection, or the person consents. Business plans from the main providers usually come with data processing terms meant to cover this. Free personal accounts generally don't.",
      },
      {
        question: "What is special personal information under POPIA?",
        answer:
          "Information about a person's religious or philosophical beliefs, race or ethnic origin, trade union membership, political views, health, sex life, biometrics or criminal behaviour. Processing it is generally prohibited unless an exception applies, so keep it out of general AI tools unless you've checked.",
      },
      {
        question:
          "Who is responsible for POPIA compliance in a small business?",
        answer:
          "The business, through its Information Officer. By default that's the head of the business, often the owner, and they must be registered with the Information Regulator. They can delegate tasks to a deputy, but the accountability stays with the business.",
      },
    ],
    draft: false,
  },
  {
    slug: "automating-quotes",
    title: "Automating quotes, step by step",
    description:
      "How a quote that takes an afternoon becomes a draft in ten minutes, with a person still checking it. A step-by-step guide for small businesses.",
    excerpt:
      "How a quote that takes an afternoon becomes a draft in ten minutes, with a person still checking it.",
    category: "Automation",
    tags: ["Quotes", "Sales admin"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: automatingQuotes,
      alt: "A laptop showing a quote layout beside a printed draft and a pen.",
    },
    faqs: [
      {
        question: "Can AI write quotes for my business?",
        answer:
          "It can write the first draft: read the request, match it to your price list and rules, and lay it out in your usual wording. A person still checks quantities, prices and scope before anything goes to a client. That check usually takes minutes, not the hour the quote used to take.",
      },
      {
        question: "How long does it take to set up AI quoting?",
        answer:
          "For a simple version on tools you already have, usually two to three weeks of part-time work. Most of it goes on writing down how quotes are built, tidying the price list and testing drafts against past quotes.",
      },
      {
        question: "What if our prices change often?",
        answer:
          "Keep one current price list that the tool reads from, and update that list only. The AI uses whatever the list says at the time, so a price change is a spreadsheet edit, not a new build. If prices live in several places today, fixing that is the first step.",
      },
      {
        question: "Is it worth automating quotes for a small business?",
        answer:
          "Do the sum: quotes a week, times minutes saved per quote, times the hourly cost of the person quoting. If that comes to several thousand rand a month, or faster quotes would win you more work, it's usually worth it. If it's a few hundred rand, start somewhere else.",
      },
    ],
    draft: false,
  },
  {
    slug: "ai-vendor-questions",
    title: "Five questions to ask any AI vendor before you sign",
    description:
      "Where does our data go? What happens when we leave? Five simple questions that save small businesses from expensive AI contracts.",
    excerpt:
      "Where does our data go? What happens when we leave? Simple questions that save expensive mistakes.",
    category: "Buying",
    tags: ["Vendors", "Contracts"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 5,
    image: {
      src: vendorQuestions,
      alt: "Two people shaking hands across a desk above a printed contract.",
    },
    faqs: [
      {
        question: "What should I ask an AI vendor before buying?",
        answer:
          "Where our data is stored and processed, whether it's used to train their models, what happens to our data and setup when we leave, what it will cost at our real size including year two, and who we call when it breaks. Ask for the answers in writing.",
      },
      {
        question: "How do I know if an AI vendor is POPIA compliant?",
        answer:
          "Ask where your data is stored and processed, for their list of sub-processors, and for a data processing agreement. You need those to check the cross-border conditions in section 72 of POPIA and to have the written operator contract the Act expects. Vague answers about security aren't enough.",
      },
      {
        question: "Should we pay for AI software in dollars or rands?",
        answer:
          "Rands with a fixed annual price is easier to budget for. If the vendor only bills in dollars or euros, ask how they handle exchange rate changes on annual renewals and work out the cost at a weaker rand before you sign.",
      },
      {
        question: "Do we need a new AI tool, or will our existing software do?",
        answer:
          "Check first. Microsoft 365, Google Workspace, accounting packages and helpdesk tools increasingly include AI features. If an existing tool does most of the job, you avoid a new contract, a new data agreement and another login.",
      },
    ],
    draft: false,
  },
  {
    slug: "where-ai-shouldnt-go",
    title: "Where AI shouldn't go in your business",
    description:
      "Judgement, accountability and relationships. The jobs to keep firmly human in a small business, and why.",
    excerpt:
      "Judgement, accountability and relationships. The jobs to keep firmly human, and why.",
    category: "Guides",
    tags: ["Getting started"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: whereAiShouldntGo,
      alt: "Two people talking across a small table, coffee cups in the foreground.",
    },
    faqs: [
      {
        question: "Can AI be used to screen job applicants in South Africa?",
        answer:
          "It can help with factual, pass-or-fail requirements that apply to everyone, such as a required registration or licence. It shouldn't rank or reject people on its own. POPIA section 71 limits decisions based solely on automated processing, and the Employment Equity Act prohibits unfair discrimination, which AI trained on past data can repeat.",
      },
      {
        question: "What decisions should never be left to AI?",
        answer:
          "Decisions about people, such as hiring, discipline, credit or what an individual pays, plus pricing strategy and any decision someone must explain later. AI can gather information and draft options. A person who knows the context decides and stands behind it.",
      },
      {
        question: "Is it OK to use AI for customer service?",
        answer:
          "For routine questions with clear answers, such as opening hours or order status, yes. Limit the topics a chatbot may answer, keep it away from complaints, promises and advice, and make it easy for customers to reach a person.",
      },
      {
        question: "How do I stop staff using AI for the wrong things?",
        answer:
          "Write it into a one-page AI usage policy: AI can help prepare, and a person decides on anything about a person and checks anything sent outside the business. Walk the team through it with real examples so the line is clear.",
      },
    ],
    draft: false,
  },
  {
    slug: "ai-usage-policy",
    title: "How to write an AI usage policy your team will actually read",
    description:
      "One page, plain language, real examples. How to write an AI usage policy for a small business, with a template you can adapt this week.",
    excerpt:
      "One page, plain language, real examples. A template you can adapt this week.",
    category: "Governance",
    tags: ["Policy", "POPIA"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: usagePolicy,
      alt: "A single printed page on a desk beside a pen and a coffee cup.",
    },
    faqs: [
      {
        question: "Does a small business need an AI usage policy?",
        answer:
          "If anyone in the business uses AI tools for work, including free accounts on their phones, yes. It tells staff what's allowed, protects client and staff information under POPIA, and prevents the most common mistakes, such as sending unchecked AI output to clients.",
      },
      {
        question: "How long should an AI usage policy be?",
        answer:
          "One page for the rules staff follow day to day, two at most with an acknowledgement section. Long policies get signed and forgotten. Staff need something they can check in thirty seconds before they paste something into a chatbot.",
      },
      {
        question: "What should an AI usage policy include?",
        answer:
          "The approved tools and which account to use, what may go in, what must never go in, when a person must check the output, a rule that people make decisions about people, what to do if something goes wrong, and one named person to ask.",
      },
      {
        question:
          "Is there a free AI usage policy template for South African businesses?",
        answer:
          "Yes. Plaincraft publishes a free, fill-in-the-blanks template written for South African SMEs, with POPIA built in. You can read it online, print it or download it for Word or Google Docs at plaincraft.co.za/resources/ai-usage-policy-template.",
      },
    ],
    draft: false,
  },
  {
    slug: "invoice-capture",
    title: "Invoice capture without the re-typing",
    description:
      "Supplier invoices read, checked and posted to your accounts, with exceptions flagged for a person. How AI invoice capture works in a small business.",
    excerpt:
      "Supplier invoices read, checked and posted to your accounts, with exceptions flagged for a person.",
    category: "Automation",
    tags: ["Invoices", "Finance admin"],
    date: "2026-11-12",
    updated: "2026-11-16",
    readMinutes: 6,
    image: {
      src: invoiceCapture,
      alt: "A stack of supplier invoices beside a laptop and a calculator.",
    },
    faqs: [
      {
        question: "Can AI capture supplier invoices into Xero or Sage?",
        answer:
          "Yes. Both include ways to capture bills from email or uploads, and capture tools such as Dext and AutoEntry connect to both. AI reads the supplier, dates, totals, VAT and line items and prepares the bill, and a person reviews anything flagged.",
      },
      {
        question: "How accurate is AI invoice capture?",
        answer:
          "Very good on clear PDFs and decent photos, and still not perfect. Poor photos and handwritten slips cause most errors. Set rules that flag unusual invoices, and spot-check clean ones each week, especially VAT amounts.",
      },
      {
        question: "How many invoices a month makes automation worth it?",
        answer:
          "As a rough guide, from a few dozen a month upwards. Multiply invoices by minutes per invoice and the hourly cost of the person capturing them. At around 20 hours a month or more, capture is very likely worth setting up.",
      },
      {
        question:
          "Does automating invoice capture mean payments are automated too?",
        answer:
          "No, and it shouldn't by accident. Capture prepares bills for your accounting system. Approving and paying them stays with whoever approves payments today, unless you deliberately decide to change that.",
      },
    ],
    draft: false,
  },
];

/** Drafts are visible in `next dev` so they can be previewed. */
const showDrafts = process.env.NODE_ENV === "development";

/** Visible articles, newest first. */
export const publishedArticles = articles
  .filter((article) => showDrafts || !article.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const articlePath = (article: Pick<Article, "slug">) =>
  `/blog/${article.slug}` as const;

export const categorySlug = (category: Category) => category.toLowerCase();

export const categoryPath = (category: Category) =>
  `/blog/category/${categorySlug(category)}` as const;

/** Categories with at least one visible article, in display order. */
export const activeCategories = categories.filter((category) =>
  publishedArticles.some((article) => article.category === category),
);

export const findArticle = (slug: string) =>
  publishedArticles.find((article) => article.slug === slug);

export const formatArticleDate = (iso: string) =>
  new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

/** The "Start here" article at the top of the blog. */
export const featuredArticle =
  findArticle("what-ai-can-do-for-a-small-business") ?? publishedArticles[0];

export const articlesIn = (category: Category) =>
  publishedArticles.filter((article) => article.category === category);

/** A topic page is worth indexing once it lists more than one article. */
export const isCategoryIndexable = (category: Category) =>
  articlesIn(category).length > 1;
