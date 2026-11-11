/**
 * Tells IndexNow-enabled search engines (Bing, and through it ChatGPT search
 * and Copilot; Yandex; Seznam; Naver) that every URL in the live sitemap is
 * new or updated. Run after a deploy that adds or changes pages:
 *
 *   pnpm indexnow
 *
 * The key is public by design: search engines verify it at /<key>.txt.
 */
export {};

const SITE_URL = (process.env.SITE_URL ?? "https://plaincraft.co.za").replace(
  /\/$/,
  "",
);
const KEY = "4481ebd332a98dab1dcdeace3977225d";

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((res) =>
  res.text(),
);
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);

if (urlList.length === 0) {
  throw new Error("No URLs found in the sitemap.");
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

console.log(
  `IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`,
);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exitCode = 1;
}
