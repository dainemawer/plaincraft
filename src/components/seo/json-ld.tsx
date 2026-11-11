/**
 * Renders schema.org structured data. `<` is escaped so content can never
 * close the script tag early (per the Next.js JSON-LD guide).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serialised JSON with "<" escaped, not HTML.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
