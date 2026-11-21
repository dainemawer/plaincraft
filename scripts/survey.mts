/**
 * The "State of AI in SA SMEs 2027" survey, from form to report.
 *
 *   pnpm survey:form
 *     Prints every question, ready to paste into Tally.
 *
 *   pnpm survey:report path/to/tally-export.csv [out-dir]
 *     Reads Tally's CSV export and writes, to out-dir (default
 *     ./survey-report, which is git-ignored):
 *       report.md     one table per question, plus key questions by company
 *                     size, as the first draft of the published report
 *       results.json  the same counts, for the charts on the report page
 *
 * Only aggregates are written. Email addresses and free-text answers in the
 * export are never read. Groups below survey.minGroupSize are suppressed.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  type SurveyQuestion,
  survey,
  surveyConsent,
  surveyFollowUp,
  surveyQuestions,
} from "../src/content/survey.ts";

function printForm() {
  const lines = [
    `# ${survey.title}`,
    "",
    "Intro text (first block in Tally):",
    "",
    surveyConsent,
    "",
    "Consent checkbox (required): I've read the above and agree to take part.",
    "",
  ];
  surveyQuestions.forEach((question, index) => {
    const kind = {
      single: "Multiple choice (one answer)",
      multi: question.max
        ? `Checkboxes (up to ${question.max})`
        : "Checkboxes (any number)",
      scale: "Linear scale 1–5",
    }[question.kind];
    lines.push(`${index + 1}. ${question.title}`);
    lines.push(`   Type: ${kind}${question.optional ? ", optional" : ""}`);
    if (question.help) lines.push(`   Help text: ${question.help}`);
    if (question.kind !== "scale") {
      for (const option of question.options) lines.push(`   - ${option}`);
    }
    lines.push("");
  });
  lines.push(
    "Last page:",
    `- ${surveyFollowUp.email} (Email field, optional)`,
    `- ${surveyFollowUp.newsletter} (Checkbox, optional, unticked)`,
    "",
    "Thank-you page: Thanks. The report comes out by " +
      `${survey.reportDue}. Want to see where your own business stands? ` +
      "Try the AI readiness scorecard: https://plaincraft.co.za/scorecard",
  );
  console.log(lines.join("\n"));
}

type Row = Record<string, string>;
type Count = { option: string; count: number; share: number };
type QuestionResult = {
  id: string;
  title: string;
  short: string;
  answered: number;
  counts: Count[];
};

async function report(path: string, dir: string) {
  const rows = parseCsv(await readFile(path, "utf8"));
  if (rows.length === 0) throw new Error("The export has no responses.");
  const headers = Object.keys(rows[0]);

  const results = surveyQuestions.map((question) =>
    tally(question, rows, headers),
  );

  const bySize = crossTabBySize(rows, headers);

  await mkdir(dir, { recursive: true });
  await writeFile(
    join(dir, "results.json"),
    `${JSON.stringify({ survey: survey.title, responses: rows.length, results, bySize }, null, 2)}\n`,
  );
  await writeFile(
    join(dir, "report.md"),
    markdown(rows.length, results, bySize),
  );
  console.log(
    `${rows.length} responses → ${dir}/report.md, ${dir}/results.json`,
  );
}

/** Answers to one question for one row, as a list of chosen options. */
function answers(question: SurveyQuestion, row: Row, headers: string[]) {
  const whole = headers.find((header) => header.trim() === question.title);
  if (whole !== undefined) {
    const cell = row[whole]?.trim() ?? "";
    if (!cell) return [];
    if (question.kind !== "multi") return [cell];
    // Tally joins checkbox answers with commas, and some options contain
    // commas, so match whole option labels instead of splitting.
    return question.options.filter((option) => cell.includes(option));
  }
  // Some exports use one column per option: "Title (Option)" = true/false.
  return question.options.filter((option) => {
    const column = headers.find(
      (header) => header.trim() === `${question.title} (${option})`,
    );
    return column !== undefined && /^(true|1|yes)$/i.test(row[column] ?? "");
  });
}

function tally(
  question: SurveyQuestion,
  rows: Row[],
  headers: string[],
): QuestionResult {
  const picked = rows.map((row) => answers(question, row, headers));
  const answered = picked.filter((list) => list.length > 0).length;
  if (answered === 0) {
    console.warn(`No answers found for "${question.title}". Check the title.`);
  }
  const counts = question.options.map((option) => {
    const count = picked.filter((list) => list.includes(option)).length;
    return { option, count, share: answered ? count / answered : 0 };
  });
  return {
    id: question.id,
    title: question.title,
    short: question.short,
    answered,
    counts,
  };
}

/** Key questions split into micro (1–9 staff) and SME (10–250) businesses. */
function crossTabBySize(rows: Row[], headers: string[]) {
  const size = surveyQuestions.find((question) => question.id === "size");
  if (!size) return [];
  const groups = {
    "1–9 staff": ["1–9"],
    "10–250 staff": ["10–30", "31–100", "101–250"],
  };
  const keys = ["impact", "blocker", "policy", "plans", "licences"];
  return Object.entries(groups).map(([label, sizes]) => {
    const members = rows.filter((row) =>
      answers(size, row, headers).some((answer) => sizes.includes(answer)),
    );
    return {
      group: label,
      responses: members.length,
      suppressed: members.length < survey.minGroupSize,
      results:
        members.length < survey.minGroupSize
          ? []
          : surveyQuestions
              .filter((question) => keys.includes(question.id))
              .map((question) => tally(question, members, headers)),
    };
  });
}

function percent(share: number) {
  return `${Math.round(share * 100)}%`;
}

function table(result: QuestionResult) {
  if (result.answered < survey.minGroupSize) {
    return `_Fewer than ${survey.minGroupSize} answers. Not reported._\n`;
  }
  const sorted = result.counts.toSorted((a, b) => b.count - a.count);
  return [
    "| Answer | Responses | Share |",
    "| --- | ---: | ---: |",
    ...sorted.map(
      (row) =>
        `| ${row.option} | ${row.count < survey.minGroupSize && row.count > 0 ? `<${survey.minGroupSize}` : row.count} | ${row.count < survey.minGroupSize && row.count > 0 ? "–" : percent(row.share)} |`,
    ),
    "",
    `_${result.answered} answered._`,
    "",
  ].join("\n");
}

function headline(result: QuestionResult) {
  const top = result.counts.toSorted((a, b) => b.count - a.count)[0];
  return top && result.answered >= survey.minGroupSize
    ? `${result.short}: ${percent(top.share)} chose "${top.option}".`
    : `${result.short}: not enough answers.`;
}

function markdown(
  responses: number,
  results: QuestionResult[],
  bySize: ReturnType<typeof crossTabBySize>,
) {
  const out = [
    `# ${survey.title}: draft results`,
    "",
    `${responses} responses. Survey closed ${survey.closes}. Shares are of people who answered each question; multi-select shares add up to more than 100%. Counts under ${survey.minGroupSize} are suppressed.`,
    "",
    "## Headlines to check",
    "",
    ...results.map((result) => `- ${headline(result)}`),
    "",
    "Write the findings from these. Lead with the one a journalist would quote, and give the sample size next to every number.",
    "",
  ];
  for (const result of results) {
    out.push(`## ${result.title}`, "", table(result));
  }
  out.push("## By company size", "");
  for (const group of bySize) {
    out.push(`### ${group.group} (${group.responses} responses)`, "");
    if (group.suppressed) {
      out.push(
        `_Fewer than ${survey.minGroupSize} responses. Not reported._`,
        "",
      );
      continue;
    }
    for (const result of group.results) {
      out.push(`#### ${result.short}`, "", table(result));
    }
  }
  out.push(
    "## Method note (publish with the report)",
    "",
    `An open online survey of South African business owners and managers, run by Plaincraft from 17 to 27 November 2026 and shared through LinkedIn, email and business networks. ${responses} people responded. It is a convenience sample, not a random one, so read the results as a snapshot of businesses already curious about AI, not of all South African SMEs. Responses were anonymous.`,
    "",
  );
  return out.join("\n");
}

/** RFC 4180 CSV: quoted fields, doubled quotes, newlines inside quotes. */
function parseCsv(text: string): Row[] {
  const records: string[][] = [];
  let field = "";
  let record: string[] = [];
  let quoted = false;
  const source = text.replace(/^﻿/, "");
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"' && source[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      record.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && source[i + 1] === "\n") i++;
      record.push(field);
      records.push(record);
      record = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || record.length) {
    record.push(field);
    records.push(record);
  }
  const [header, ...body] = records.filter((row) =>
    row.some((cell) => cell.trim()),
  );
  if (!header) return [];
  return body.map((row) =>
    Object.fromEntries(header.map((name, index) => [name, row[index] ?? ""])),
  );
}

const [command, csvPath, outDir = "survey-report"] = process.argv.slice(2);

if (command === "form") {
  printForm();
} else if (command === "report" && csvPath) {
  await report(csvPath, outDir);
} else {
  console.error(
    "Usage: pnpm survey:form | pnpm survey:report <export.csv> [out-dir]",
  );
  process.exit(1);
}
