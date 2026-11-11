# Plaincraft

Marketing site for Plaincraft, an independent AI consultancy for South African SMEs. Built with Next.js 16 (App Router, Cache Components, React Compiler), Tailwind CSS v4, TypeScript and Biome. Hosted on Vercel.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional; every value has a fallback
pnpm dev
```

| Script        | What it does                         |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start the dev server                 |
| `pnpm build`  | Production build                     |
| `pnpm lint`   | Biome lint + format check            |
| `pnpm format` | Format with Biome                    |

## Where things live

```
src/
  app/                 Routes and file-based metadata
    page.tsx           Homepage (composes the sections)
    privacy/, terms/   Legal pages
    llms.txt/route.ts  /llms.txt, generated from homepage content
    robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx, icon.svg
  components/
    sections/          One component per homepage section
    site/              Header, footer, sticky CTA, scroll reveal
    ui/                ButtonLink, SmartLink, Logo, Photo
    seo/               JSON-LD renderer
  content/home.ts      All homepage copy, typed
  lib/site.ts          Site config and environment variables
  lib/structured-data.ts  schema.org graph
```

Copy is defined once in `src/content/home.ts`. The page, the JSON-LD and `/llms.txt` all read from it, so they can't drift apart.

## Configuration

Set these in Vercel (Project → Settings → Environment Variables). See `.env.example`.

- `CALENDAR_URL`: booking link for every "Book a call" button
- `HERO_VIDEO_URL`: YouTube, Vimeo or video file for the hero
- `FOUNDER_NAME`, `LINKEDIN_URL`: founder details
- `SITE_URL`: canonical origin (defaults to `https://plaincraft.co.za`)

## Adding photography

Every image slot uses `<Photo hint="…" sizes="…" />`, which shows a placeholder until it gets a `src`. Put images in `src/assets/images/`, import them, and pass them as `src` with a descriptive `alt`. Static imports give width, height and blur data for free.

## SEO, AEO and GEO

- Semantic landmarks, one `h1` per page, and sections labelled by their headings
- Metadata API: canonical, hreflang `en-ZA`, Open Graph, Twitter and geo tags
- JSON-LD graph: `ProfessionalService`, `Service` offers, `WebSite`, `WebPage` and `FAQPage`, plus `Person` once `FOUNDER_NAME` is set
- `robots.txt` explicitly welcomes AI crawlers, and `/llms.txt` gives language models a summary
- Fonts are self-hosted with `next/font`, and pages are prerendered static HTML

## Analytics

Vercel Web Analytics and Speed Insights are both cookieless. They're mounted in `src/app/layout.tsx` and must be enabled in the Vercel dashboard.
