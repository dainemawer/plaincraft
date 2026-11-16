import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { areas, scoreResult } from "@/content/scorecard";
import { site } from "@/lib/site";
import { wordmarkParts } from "@/lib/wordmark";

export const alt =
  "An AI readiness score out of 100 from the Plaincraft scorecard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { ink, paper, ember } = site.theme;
const wordmark = wordmarkParts();

async function loadFont() {
  "use cache";
  const file = await readFile(
    join(process.cwd(), "src/assets/fonts/SchibstedGrotesk-Bold.ttf"),
  );
  return new Uint8Array(file).buffer;
}

export default async function ScoreImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const result = scoreResult((await params).code);
  const font = await loadFont();
  const score = result?.score ?? 0;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: paper,
        backgroundImage: `radial-gradient(70% 60% at 100% 0%, rgba(232,73,42,0.16), transparent 70%)`,
        color: ink,
        fontFamily: "Schibsted Grotesk",
      }}
    >
      <div style={{ display: "flex", fontSize: 34, letterSpacing: "-0.03em" }}>
        <span>{wordmark.before}</span>
        <span style={{ color: ember }}>{wordmark.accent}</span>
        <span>{wordmark.after}</span>
        <span style={{ marginLeft: 16, color: "#3A3934" }}>
          · AI readiness scorecard
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ display: "flex", fontSize: 44, letterSpacing: "-0.03em" }}
        >
          My business scored
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 200,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
          }}
        >
          <span>{score}</span>
          <span style={{ color: "#3A3934", fontSize: 96 }}>/100</span>
        </div>
        <div
          style={{ display: "flex", fontSize: 40, marginTop: 12, color: ember }}
        >
          {result?.band.name ?? ""}
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
        {(result?.areas ?? []).map(({ area, score: areaScore }) => (
          <div
            key={area}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              borderTop: `3px solid ${ink}`,
              paddingTop: 10,
            }}
          >
            <span style={{ color: "#3A3934" }}>{areas[area].label}</span>
            <span style={{ fontSize: 36 }}>{areaScore}</span>
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Schibsted Grotesk", data: font, weight: 700 }],
    },
  );
}
