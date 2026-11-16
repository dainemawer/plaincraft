import {
  notLegalAdvice,
  policyIntro,
  policySections,
  policyTitle,
  resources,
} from "@/content/resources";
import { absoluteUrl } from "@/lib/site";
import { type DocBlock, wordDocument, wordResponse } from "@/lib/word-doc";

const resource = resources["ai-usage-policy-template"];

/** The policy template as an editable Word document, blanks highlighted. */
export function GET() {
  const blocks: DocBlock[] = [
    {
      type: "note",
      text: `How to use this template: replace every highlighted [BLANK], delete the guidance notes in italics and any examples you don't need, then walk your team through it. ${notLegalAdvice} Source: ${absoluteUrl(resource.path)}`,
    },
    { type: "h1", text: policyTitle },
    { type: "p", text: policyIntro },
    ...policySections.flatMap((section): DocBlock[] => [
      { type: "h2", text: section.heading },
      ...(section.body ?? []).map((text): DocBlock => ({ type: "p", text })),
      ...(section.list ? [{ type: "ul" as const, items: section.list }] : []),
      ...(section.table
        ? [{ type: "table" as const, rows: section.table }]
        : []),
      ...(section.guidance
        ? [{ type: "note" as const, text: `Guidance: ${section.guidance}` }]
        : []),
    ]),
  ];
  return wordResponse(resource.downloadName, wordDocument(policyTitle, blocks));
}
