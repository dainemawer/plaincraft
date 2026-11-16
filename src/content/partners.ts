/**
 * The partner programme: who it's for, what partners' clients get, and the
 * referral terms. Shown on /partners. Change the terms here only.
 */

export const referral = {
  /** Share of the first engagement's fee, paid to the referring partner. */
  feeShare: 0.1,
  /** Days after the client pays in which the referral fee is paid. */
  payWithinDays: 14,
  /** How long an introduction counts as yours. */
  validMonths: 6,
} as const;

export const partnerTypes = [
  {
    title: "Accountants and bookkeepers",
    body: "Your clients already ask you about AI, usually about invoices, receipts and reconciliations. You don't have to become the AI expert: refer them, stay their trusted adviser, and keep the books.",
  },
  {
    title: "Xero and Sage partners",
    body: "Your clients are already in the cloud, which makes them the easiest to help. I work with their existing tools first and never sell a competing ledger.",
  },
  {
    title: "IT and managed service providers",
    body: "You handle the licences, security and devices. I handle which AI use cases are worth it, the policy and the training. Clear lines, no overlap, and your client stays yours.",
  },
  {
    title: "Privacy and commercial law firms",
    body: "Clients who come to you for POPIA work increasingly ask about AI tools. I handle the practical side: which tools, which settings, which rules for staff. Legal advice stays with you.",
  },
];

export const partnerOffers = [
  {
    title: "A free first call for every client you refer",
    body: "30 minutes, plain English, no sales pitch. If AI isn't the answer for them, I'll say so, and tell you too if they're happy for me to.",
  },
  {
    title: "A co-hosted workshop for your clients",
    body: 'A 60–90 minute session, "Using AI safely in a small business", at your offices or online. I present, you host, and nobody gets a sales pitch. Free for partners, once a year.',
  },
  {
    title: "Your client stays your client",
    body: "I don't offer accounting, bookkeeping, IT support or legal advice, and I'll send work in those areas back to you.",
  },
  {
    title: "Free resources to share",
    body: "The AI readiness scorecard, the POPIA + AI checklist and the AI usage policy template are free to share with your clients, with no signup.",
  },
];

export const partnerFaqs = [
  {
    question: "How does the referral fee work?",
    answer: `When a client you introduce books paid work within ${referral.validMonths} months, I pay you ${referral.feeShare * 100}% of the fee for their first engagement, within ${referral.payWithinDays} days of them paying it. For a monthly retainer, it's ${referral.feeShare * 100}% of the first three months. There's nothing to sign up for.`,
  },
  {
    question: "What if my professional rules don't allow referral fees?",
    answer:
      "Some partners, such as attorneys, can't accept them, and many accountants must disclose them to the client. If you can't or would rather not take a fee, you can pass it to the client as a discount on their first engagement instead, or simply refer both ways. Either way, I'll tell the client about any referral fee in writing.",
  },
  {
    question: "Do I need to sign anything?",
    answer:
      "No. Email me to say you'd like to refer clients, and I'll confirm the terms in writing. If you'd like a formal agreement, I'm happy to sign one.",
  },
  {
    question: "Will you contact my clients directly?",
    answer:
      "Only clients who ask to be introduced, and only with your introduction. I never take a partner's client list or market to it.",
  },
];
