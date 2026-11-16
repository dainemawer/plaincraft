/**
 * The AI readiness scorecard: ten questions, four areas, a score out of 100.
 *
 * Every question has four answers worth 0–3 points, in order. A result is
 * encoded as ten digits, one per question (e.g. "2130231021"), which makes
 * the result URL shareable without storing anything.
 */

export type ScorecardArea = "processes" | "data" | "people" | "governance";

export type ScorecardQuestion = {
  id: string;
  area: ScorecardArea;
  question: string;
  /** Four answers, weakest first. Index = points. */
  answers: [string, string, string, string];
  /** The next move for anyone who didn't pick the top answer. */
  nextMove: string;
};

export const areas: Record<
  ScorecardArea,
  { label: string; summary: string; low: string; service: string }
> = {
  processes: {
    label: "Processes",
    summary:
      "Knowing where the time goes, and whether the work is written down.",
    low: "AI speeds up a process. It can't speed up one nobody can describe. Start by timing the three most repetitive jobs in the business for a fortnight and writing down how each one is done today.",
    service: "/services/ai-readiness-audit",
  },
  data: {
    label: "Data",
    summary: "Whether your information is findable, tidy and mapped for POPIA.",
    low: "Most AI tools are only as good as the information you can give them. Move working files out of inboxes and personal drives into one shared system, and list which systems hold personal information.",
    service: "/services/ai-readiness-audit",
  },
  people: {
    label: "People",
    summary: "How your team uses AI today and how they take to new tools.",
    low: "Your staff are probably already using AI, quietly and on personal accounts. Bring it into the open: ask what they use, share what works, and give everyone a few hours of hands-on training with your real work.",
    service: "/services/ai-training",
  },
  governance: {
    label: "Governance",
    summary: "Rules on what goes into AI tools, and who decides what to buy.",
    low: "Without rules, client and staff information ends up in AI tools nobody approved, which is a POPIA problem. A one-page AI usage policy and a named owner for AI decisions fix most of this in a week.",
    service: "/services/ai-policy-popia",
  },
};

export const scorecardQuestions: ScorecardQuestion[] = [
  {
    id: "time",
    area: "processes",
    question:
      "Could you name the three tasks that take up most of your team's time?",
    answers: [
      "Not really",
      "I have a rough idea",
      "Yes, and roughly how many hours each",
      "Yes, and we've measured it",
    ],
    nextMove:
      "Have each team member log their repetitive tasks for two weeks. The biggest AI wins are almost always in that list.",
  },
  {
    id: "documented",
    area: "processes",
    question:
      "How well are your core processes, such as quoting, invoicing and onboarding, written down?",
    answers: [
      "They live in people's heads",
      "Some notes, mostly out of date",
      "Most are written down",
      "Written down and actually followed",
    ],
    nextMove:
      "Write down your most repetitive process step by step, as it really happens. That document becomes the brief for automating it.",
  },
  {
    id: "systems",
    area: "processes",
    question: "How well do your business tools work together?",
    answers: [
      "Mostly paper and spreadsheets emailed around",
      "Some cloud tools, with lots of retyping between them",
      "Our main tools are in the cloud and partly connected",
      "Connected: information flows without retyping",
    ],
    nextMove:
      "Find the places where someone copies the same information from one system into another. Each one is a candidate for automation.",
  },
  {
    id: "location",
    area: "data",
    question: "Where does your business information live?",
    answers: [
      "Paper, inboxes and personal drives",
      "A shared drive, but it's messy",
      "Mostly in a few cloud systems",
      "Organised systems, each with a clear owner",
    ],
    nextMove:
      "Pick one shared home for working documents and move the important ones there. AI tools can't use what they can't reach.",
  },
  {
    id: "reporting",
    area: "data",
    question:
      "If you needed last quarter's sales by customer, how long would it take?",
    answers: [
      "Days, or it can't be done",
      "A day of digging",
      "An hour or two",
      "Minutes: it's already in a report",
    ],
    nextMove:
      "Choose the three numbers you check most often and get them into one regular report. It's a quick win, and it tells you whether your data is clean enough for AI.",
  },
  {
    id: "personal-info",
    area: "data",
    question:
      "Do you know which systems hold personal information about your customers and staff?",
    answers: [
      "No",
      "Roughly",
      "Yes, but it isn't written down",
      "Yes, we keep a register",
    ],
    nextMove:
      "List every system that holds personal information and who can access it. POPIA expects it, and you'll need it before any of that data goes near an AI tool.",
  },
  {
    id: "usage",
    area: "people",
    question: "How does your team use AI tools today?",
    answers: [
      "Not at all, or it's banned",
      "A few people use them quietly",
      "Many people use them, each in their own way",
      "Openly, with shared ways of working",
    ],
    nextMove:
      "Run a 30-minute session where staff show each other how they already use AI. You'll find your champions and your risks in the same meeting.",
  },
  {
    id: "adoption",
    area: "people",
    question: "How does your team usually react to new tools?",
    answers: [
      "Resistance: the old way wins",
      "Slowly, with a few champions",
      "Willing, once they see the point",
      "Keen: they ask for better tools",
    ],
    nextMove:
      "Start with one tool that removes a task people dislike, and let a respected team member lead it. Early wins do more than any policy.",
  },
  {
    id: "rules",
    area: "governance",
    question: "Do you have rules on what staff may put into AI tools?",
    answers: [
      "No",
      "Informal, spoken rules",
      "A draft policy",
      "A written policy staff know about",
    ],
    nextMove:
      "Write a one-page AI usage policy: which tools are approved, what must never go into them, and who to ask. Our free template is a starting point.",
  },
  {
    id: "ownership",
    area: "governance",
    question: "Who decides which AI tools the business pays for?",
    answers: [
      "Nobody: people sign up themselves",
      "Whoever asks first",
      "The owner signs off, without set criteria",
      "A named owner with a budget and criteria",
    ],
    nextMove:
      "Name one person responsible for AI decisions, give them a small budget, and agree three questions every new tool must answer before anyone pays for it.",
  },
];

export const QUESTION_COUNT = scorecardQuestions.length;
const MAX_POINTS = 3;

/** "2130231021" → [2,1,3,0,…], or null if it isn't a valid result. */
export function parseCode(code: string): number[] | null {
  if (!new RegExp(`^[0-${MAX_POINTS}]{${QUESTION_COUNT}}$`).test(code)) {
    return null;
  }
  return [...code].map(Number);
}

export const toCode = (points: number[]) => points.join("");

export type Band = {
  min: number;
  name: string;
  summary: string;
  /** The service most worth a look at this level. */
  service: { label: string; href: string };
};

/** Overall bands, highest first. */
export const bands: Band[] = [
  {
    min: 70,
    name: "Ready to scale",
    summary:
      "The groundwork is in place. You can move beyond single tools to automating whole workflows, and the main risk now is spreading effort too thin. Pick the two or three changes with the biggest payback and build those properly.",
    service: { label: "AI automation builds", href: "/services/ai-automation" },
  },
  {
    min: 40,
    name: "Ready for targeted wins",
    summary:
      "You have enough in place for AI to pay off in specific places, but gaps in one or two areas will slow you down or create risk. Fix the weakest area first, then start with one well-chosen process.",
    service: {
      label: "the AI readiness audit",
      href: "/services/ai-readiness-audit",
    },
  },
  {
    min: 0,
    name: "Foundations first",
    summary:
      "AI tools won't help much yet, and buying them now is the most common way small businesses waste money on AI. The good news: the fixes below are cheap, and most take weeks, not months.",
    service: {
      label: "the AI readiness audit",
      href: "/services/ai-readiness-audit",
    },
  },
];

export type ScorecardResult = {
  code: string;
  score: number;
  band: Band;
  areas: { area: ScorecardArea; score: number }[];
  /** Weakest areas first. */
  weakest: ScorecardArea[];
  /** Next moves for every answer below the top, weakest answers first. */
  nextMoves: { question: ScorecardQuestion; points: number }[];
};

const percent = (points: number, questions: number) =>
  Math.round((points / (questions * MAX_POINTS)) * 100);

export function scoreResult(code: string): ScorecardResult | null {
  const points = parseCode(code);
  if (!points) return null;

  const score = percent(
    points.reduce((sum, value) => sum + value, 0),
    QUESTION_COUNT,
  );
  const band =
    bands.find((candidate) => score >= candidate.min) ?? bands.at(-1);
  if (!band) return null;

  const areaScores = (Object.keys(areas) as ScorecardArea[]).map((area) => {
    const indices = scorecardQuestions
      .map((question, index) => (question.area === area ? index : -1))
      .filter((index) => index >= 0);
    const total = indices.reduce((sum, index) => sum + points[index], 0);
    return { area, score: percent(total, indices.length) };
  });

  const weakest = [...areaScores]
    .sort((a, b) => a.score - b.score)
    .map((entry) => entry.area);

  const nextMoves = scorecardQuestions
    .map((question, index) => ({ question, points: points[index] }))
    .filter((entry) => entry.points < MAX_POINTS)
    .sort((a, b) => a.points - b.points);

  return { code, score, band, areas: areaScores, weakest, nextMoves };
}

export const resultPath = (code: string): `/${string}` =>
  `/scorecard/result/${code}`;
