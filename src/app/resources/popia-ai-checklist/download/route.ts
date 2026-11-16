import { checklist, notLegalAdvice, resources } from "@/content/resources";
import { absoluteUrl } from "@/lib/site";
import { type DocBlock, wordDocument, wordResponse } from "@/lib/word-doc";

const resource = resources["popia-ai-checklist"];

/** The checklist as an editable Word document. */
export function GET() {
  let n = 0;
  const blocks: DocBlock[] = [
    { type: "h1", text: resource.title },
    { type: "p", text: resource.summary },
    ...checklist.flatMap((group): DocBlock[] => [
      { type: "h2", text: group.heading },
      {
        type: "checklist",
        items: group.items.map((item) => {
          n += 1;
          return `${n}. ${item.check}${item.ref ? ` (POPIA ${item.ref})` : ""}`;
        }),
      },
    ]),
    {
      type: "note",
      text: `${notLegalAdvice} Explanations for every check: ${absoluteUrl(resource.path)}`,
    },
  ];
  return wordResponse(
    resource.downloadName,
    wordDocument(resource.title, blocks),
  );
}
