import { faqs, services, shortVersion } from "@/content/home";
import { absoluteUrl, site } from "@/lib/site";

/**
 * /llms.txt (https://llmstxt.org): a plain-text brief for language models,
 * generated from the same content as the homepage so the two never drift.
 */
export function GET() {
  const facts = Object.fromEntries(
    shortVersion.map((item) => [item.term, item.detail]),
  );

  const body = `# ${site.name}

> ${site.name} is an independent AI consultancy for small and medium-sized businesses (10–250 staff) in South Africa. It is run by one senior consultant who handles every engagement from start to finish. Every engagement has a fixed fee, quoted in writing.

## Services
${services.map((service) => `- [${service.name}](${absoluteUrl(`/#${service.id}`)}): ${service.summary}`).join("\n")}

## Key facts
- What: ${facts.What}
- Who for: ${facts["Who for"]}
- Location: ${facts.Where}
- How: ${facts.How}
- First step: ${facts["First step"]}
- Pricing: fixed fee per engagement, quoted after the discovery call. No hourly billing.
- Contact: ${site.email}

## FAQ
${faqs.map((faq) => `- ${faq.question} ${faq.answer}`).join("\n")}

## Pages
- [Home](${absoluteUrl("/")}): services, process, FAQ and booking
- [Home as Markdown](${absoluteUrl("/index.md")}): the full homepage in Markdown
- [Privacy & POPIA notice](${absoluteUrl("/privacy")})
- [Terms of use](${absoluteUrl("/terms")})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
