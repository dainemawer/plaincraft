import {
  aiJobs,
  callAgenda,
  commitments,
  comparison,
  faqs,
  founderFacts,
  processSteps,
  serviceStages,
  shortVersion,
} from "@/content/home";
import { absoluteUrl, site } from "./site";

/**
 * Markdown edition of the homepage, served to agents that send
 * `Accept: text/markdown` and at /index.md. Built from the same content as
 * the rendered page so the two never drift.
 */
export function homeMarkdown() {
  return `# ${site.name}: AI consultancy for South African SMEs

> ${site.description}

[Book a free 30-minute call](${site.calendarUrl}) · [Email ${site.email}](mailto:${site.email})

## The short version

${shortVersion.map((item) => `- **${item.term}:** ${item.detail}`).join("\n")}

## AI, in plain English

In most businesses, AI is good at three jobs.

${aiJobs.map((job, i) => `${i + 1}. **${job.title}** ${job.body} For example: ${job.example}`).join("\n")}

AI is not good at decisions that need judgement, accountability or a real relationship.

## What happens on the free call

${callAgenda.map((item) => `- **${item.time}: ${item.title}** ${item.body}`).join("\n")}

## Services

${serviceStages
  .map(
    (stage) =>
      `### ${stage.stage}: ${stage.label}\n\n${stage.services
        .map((service) => `- **${service.name}:** ${service.body}`)
        .join("\n")}`,
  )
  .join("\n\n")}

## How it works

${processSteps.map((step) => `${Number(step.number)}. **${step.title}** (${step.meta}). ${step.body}`).join("\n")}

## Why ${site.name}

| | Typical consultancy | ${site.name} |
| --- | --- | --- |
${comparison.map((row) => `| ${row.topic} | ${row.typical} | ${row.us} |`).join("\n")}

${commitments.map((item) => `- **${item.title}.** ${item.body}`).join("\n")}

## About

${site.name} is run by ${site.founder.name}, ${site.founder.jobTitle}. ${site.founder.name} has spent 17 years building websites and digital products, most recently as a Staff Engineer leading web engineering on large client projects.

${founderFacts.map((fact) => `- **${fact.label}:** ${fact.value}`).join("\n")}
- **LinkedIn:** ${site.linkedInUrl}

## FAQ

${faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Contact

- Book a call: ${site.calendarUrl}
- Email: ${site.email}
- Privacy & POPIA notice: ${absoluteUrl("/privacy")}
- Terms of use: ${absoluteUrl("/terms")}
`;
}
