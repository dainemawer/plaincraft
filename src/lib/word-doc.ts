/**
 * A .doc download that Word, Google Docs, Pages and LibreOffice all open:
 * an HTML document with Word's namespaces and print layout. Editable like
 * any Word file, with no dependencies.
 */

export type DocBlock =
  | { type: "h1" | "h2" | "p" | "note"; text: string }
  | { type: "ul" | "checklist"; items: string[] }
  | { type: "table"; rows: string[][] };

const escapeHtml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Highlights [BLANKS] in yellow so they're easy to find and fill in. */
const withBlanks = (text: string) =>
  escapeHtml(text).replace(
    /\[[A-Z][A-Z ]+\]/g,
    (blank) => `<span style="background:#FFF2A8">${blank}</span>`,
  );

function block(item: DocBlock) {
  switch (item.type) {
    case "h1":
    case "h2":
    case "p":
      return `<${item.type}>${withBlanks(item.text)}</${item.type}>`;
    case "note":
      return `<p class="note">${withBlanks(item.text)}</p>`;
    case "ul":
      return `<ul>${item.items.map((text) => `<li>${withBlanks(text)}</li>`).join("")}</ul>`;
    case "checklist":
      return item.items
        .map((text) => `<p class="check">&#9744;&nbsp; ${withBlanks(text)}</p>`)
        .join("");
    case "table":
      return `<table>${item.rows
        .map(
          (row, index) =>
            `<tr>${row
              .map((cell) =>
                index === 0
                  ? `<th>${withBlanks(cell)}</th>`
                  : `<td>${withBlanks(cell) || "&nbsp;"}</td>`,
              )
              .join("")}</tr>`,
        )
        .join("")}</table>`;
  }
}

export function wordDocument(title: string, blocks: DocBlock[]) {
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
  @page { size: 21cm 29.7cm; margin: 2cm; }
  body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #121210; }
  h1 { font-size: 20pt; margin: 0 0 6pt; }
  h2 { font-size: 13pt; margin: 16pt 0 4pt; }
  p { margin: 0 0 6pt; }
  .note { font-size: 9pt; color: #555; font-style: italic; }
  .check { margin: 0 0 4pt; }
  table { border-collapse: collapse; width: 100%; margin: 6pt 0; }
  th, td { border: 1px solid #999; padding: 4pt 6pt; text-align: left; vertical-align: top; font-size: 10pt; }
  th { background: #EAE7DF; }
</style>
</head>
<body>
${blocks.map(block).join("\n")}
</body>
</html>`;
}

export function wordResponse(fileName: string, html: string) {
  return new Response(html, {
    headers: {
      "Content-Type": "application/msword; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
