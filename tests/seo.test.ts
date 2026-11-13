/**
 * Search essentials for the service pages: each one renders, has its own
 * title and canonical, carries Service + BreadcrumbList + FAQPage data, and
 * is in the sitemap. Run against a running server (see agent-readiness.test.ts).
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const servicePaths = [
  "/services/ai-readiness-audit",
  "/services/ai-tool-selection",
  "/services/ai-strategy-roadmap",
  "/services/ai-policy-popia",
  "/services/ai-automation",
  "/services/ai-training",
  "/services/fractional-head-of-ai",
];

const page = async (path: string) => {
  const res = await fetch(new URL(path, BASE_URL));
  return { status: res.status, html: await res.text() };
};

const types = (html: string) =>
  [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
    .map((match) => JSON.parse(match[1]))
    .flatMap((data) => data["@graph"] ?? [data])
    .map((node) => node["@type"]);

describe("service pages", () => {
  for (const path of [...servicePaths, "/services"]) {
    test(`${path} is indexable with its own title and canonical`, async () => {
      const { status, html } = await page(path);
      assert.equal(status, 200);
      assert.equal(html.match(/<h1[\s>]/g)?.length, 1, "exactly one h1");
      assert.match(html, /<title>[^<]{20,}<\/title>/);
      assert.match(
        html,
        new RegExp(`<link rel="canonical" href="[^"]+${path}"`),
      );
      assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
      assert.ok(types(html).includes("BreadcrumbList"), "breadcrumbs");
    });
  }

  test("each service page describes the service and its FAQs", async () => {
    for (const path of servicePaths) {
      const found = types((await page(path)).html);
      assert.ok(found.includes("Service"), `${path} Service`);
      assert.ok(found.includes("FAQPage"), `${path} FAQPage`);
    }
  });

  test("service pages show their fixed fee in rands and pounds", async () => {
    for (const path of servicePaths) {
      const { html } = await page(path);
      assert.match(html, /One fixed fee\./, path);
      const text = html
        .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
        .replace(/<[^>]+>/g, " ");
      assert.match(text, /From R\d{1,3}(,\d{3})+/, `${path} rand price`);
      assert.match(text, /£\d{1,3}(,\d{3})+/, `${path} pound price`);
    }
  });

  test("service pages carry priced offers in both currencies", async () => {
    for (const path of servicePaths) {
      const { html } = await page(path);
      const currencies = [...html.matchAll(/"priceCurrency":"(ZAR|GBP)"/g)].map(
        (match) => match[1],
      );
      assert.ok(currencies.includes("ZAR"), `${path} ZAR offer`);
      assert.ok(currencies.includes("GBP"), `${path} GBP offer`);
    }
  });

  test("/pricing lists both markets with an offer catalog and FAQs", async () => {
    const { status, html } = await page("/pricing");
    assert.equal(status, 200);
    assert.equal(html.match(/<h1[\s>]/g)?.length, 1, "exactly one h1");
    assert.match(html, /<link rel="canonical" href="[^"]+\/pricing"/);
    assert.match(html, /data-market="za"/);
    assert.match(html, /data-market="uk"/);
    assert.match(html, /R45,000/, "rand prices in the HTML");
    assert.match(html, /£3,500/, "pound prices in the HTML");
    const found = types(html);
    for (const type of ["OfferCatalog", "FAQPage", "BreadcrumbList"]) {
      assert.ok(found.includes(type), type);
    }
  });

  test("FAQ answers in structured data match the visible copy", async () => {
    for (const path of servicePaths) {
      const { html } = await page(path);
      const faq = [
        ...html.matchAll(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
        ),
      ]
        .map((match) => JSON.parse(match[1]))
        .flatMap((data) => data["@graph"] ?? [data])
        .find((node) => node["@type"] === "FAQPage");
      for (const question of faq.mainEntity) {
        const visible = question.acceptedAnswer.text.replace(/'/g, "&#x27;");
        assert.ok(html.includes(visible), `${path}: ${question.name}`);
      }
    }
  });

  test("unknown service slugs 404", async () => {
    assert.equal((await page("/services/not-a-service")).status, 404);
  });

  test("the homepage links to every service page", async () => {
    const { html } = await page("/");
    for (const path of servicePaths) {
      assert.match(html, new RegExp(`href="${path}"`), path);
    }
  });

  test("every service page is in the sitemap", async () => {
    const { html: xml } = await page("/sitemap.xml");
    for (const path of [...servicePaths, "/services"]) {
      assert.match(xml, new RegExp(`<loc>[^<]+${path}</loc>`), path);
    }
  });
});
