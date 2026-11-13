/**
 * The price book. One source for the pricing page, the service pages, the
 * structured data and /llms.txt. South African and UK/EU prices are set per
 * market, not converted, so each list stands on its own.
 */

export type Market = "za" | "uk";

export type PriceOption = {
  /** What this price buys, e.g. "10–30 staff" or "Half day". */
  label?: string;
  amount: number;
  /** Shown as "from" when the final fee depends on scope. */
  from?: boolean;
  /** Recurring fees, e.g. "month". */
  per?: string;
};

export type ServicePrice = {
  /** Matches the service id in src/content/home.ts and services.ts. */
  id: string;
  za: PriceOption[];
  uk: PriceOption[];
  /** One line on how the fee is set or what it includes. */
  note: string;
};

export const markets: Record<
  Market,
  { label: string; currency: "ZAR" | "GBP"; region: string }
> = {
  za: { label: "South Africa", currency: "ZAR", region: "South Africa" },
  uk: { label: "UK & Europe", currency: "GBP", region: "UK & Europe" },
};

export const servicePrices: ServicePrice[] = [
  {
    id: "ai-readiness-audit",
    za: [
      { label: "10–30 staff", amount: 45_000 },
      { label: "31–100 staff", amount: 65_000 },
      { label: "101–250 staff", amount: 85_000 },
    ],
    uk: [
      { label: "10–30 staff", amount: 3_500 },
      { label: "31–100 staff", amount: 5_500 },
      { label: "101–250 staff", amount: 7_500 },
    ],
    note: "Priced by team size. Half the fee is credited against a build or retainer booked within 60 days.",
  },
  {
    id: "vendor-selection",
    za: [{ label: "Per decision", amount: 20_000, from: true }],
    uk: [{ label: "Per decision", amount: 1_500, from: true }],
    note: "One buying decision, such as which AI assistant or which document tool, with a written recommendation.",
  },
  {
    id: "ai-strategy-roadmap",
    za: [
      { label: "Standalone", amount: 70_000, from: true },
      { label: "After an audit", amount: 45_000, from: true },
    ],
    uk: [{ label: "Standalone", amount: 6_000, from: true }],
    note: "Cheaper after an audit, because the groundwork is already done.",
  },
  {
    id: "ai-governance",
    za: [{ label: "Policy and POPIA check", amount: 30_000, from: true }],
    uk: [
      { label: "Policy, GDPR and EU AI Act check", amount: 2_500, from: true },
    ],
    note: "A written AI usage policy, a data register and a team briefing.",
  },
  {
    id: "automation-builds",
    za: [
      { label: "Per workflow", amount: 60_000, from: true },
      { label: "Optional care plan", amount: 5_000, from: true, per: "month" },
    ],
    uk: [{ label: "Per workflow", amount: 4_500, from: true }],
    note: "Fixed fee per workflow once the scope is agreed. The care plan covers monitoring and small changes.",
  },
  {
    id: "ai-training",
    za: [
      { label: "Half-day workshop", amount: 20_000 },
      { label: "Full-day workshop", amount: 32_000 },
    ],
    uk: [
      { label: "Half day, remote", amount: 1_500 },
      { label: "Full day, remote", amount: 2_500 },
    ],
    note: "Up to 15 people, built around your team's real work and tools.",
  },
  {
    id: "fractional-head-of-ai",
    za: [
      { label: "Advisory, 2 days a month", amount: 32_000, per: "month" },
      { label: "Core, 4 days a month", amount: 60_000, per: "month" },
    ],
    uk: [
      { label: "Advisory, 2 days a month", amount: 2_500, per: "month" },
      { label: "Core, 4 days a month", amount: 4_500, per: "month" },
    ],
    note: "Three-month minimum, then month to month.",
  },
];

export const servicePriceById = new Map(
  servicePrices.map((price) => [price.id, price]),
);

/** Founding-client terms for 2027. */
export const foundingDiscount = 0.3;

const formatters: Record<Market, Intl.NumberFormat> = {
  // en-ZA groups with a non-breaking space; a comma reads more naturally here.
  za: new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
  uk: new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }),
};

/** "R45,000" or "£3,500". */
export const formatAmount = (market: Market, amount: number) =>
  `${market === "za" ? "R" : "£"}${formatters[market].format(amount)}`;

/** "From R60,000 a month", "R45,000". */
export const formatPrice = (market: Market, option: PriceOption) => {
  const amount = formatAmount(market, option.amount);
  const per = option.per ? ` a ${option.per}` : "";
  return option.from ? `From ${amount}${per}` : `${amount}${per}`;
};

/**
 * The lowest headline price for a service, e.g. "From R45,000". Add-ons such
 * as a monthly care plan don't count when the service has one-off fees.
 */
export const startingPrice = (market: Market, price: ServicePrice) => {
  const oneOff = price[market].filter((option) => !option.per);
  const options = oneOff.length > 0 ? oneOff : price[market];
  const lowest = options.reduce((min, option) =>
    option.amount < min.amount ? option : min,
  );
  const per = lowest.per ? ` a ${lowest.per}` : "";
  return `From ${formatAmount(market, lowest.amount)}${per}`;
};

export const pricingFaqs = [
  {
    question: "Why are UK and South African prices different?",
    answer:
      "Each price list is set for its own market, not converted at the exchange rate. UK and European clients work with me remotely, during overlapping hours. Clients in the EU are quoted in euros at equivalent rates.",
  },
  {
    question: "Do the prices include VAT?",
    answer:
      "Plaincraft is not VAT-registered, so the price shown is the price you pay. A quote agreed in writing stays as agreed.",
  },
  {
    question: "What if the work turns out bigger than quoted?",
    answer:
      "The fee is fixed for the scope we agree in writing. If you want to add something, I quote it separately before I start. You never get a bill you didn't agree to.",
  },
  {
    question: "How does payment work?",
    answer:
      "Projects are paid half upfront and half on delivery. Retainers are billed monthly in advance, with a three-month minimum and then month to month.",
  },
  {
    question: "What is the founding-client offer?",
    answer:
      "The first five clients in 2027 get 30% off their first engagement. In return, once you're happy with the results, I'll ask to write the work up as a case study, only with your sign-off.",
  },
];
