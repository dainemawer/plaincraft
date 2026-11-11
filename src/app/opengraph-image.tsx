import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { logoMark } from "@/lib/logo-mark";
import { site } from "@/lib/site";
import { wordmarkParts } from "@/lib/wordmark";

export const alt = `${site.name}: practical AI for South African SMEs`;
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

export default async function OpengraphImage() {
  const schibstedBold = await loadFont();

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
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg
          aria-hidden="true"
          width={40}
          height={40 * (logoMark.height / logoMark.width)}
          viewBox={`0 0 ${logoMark.width} ${logoMark.height}`}
          fill={ink}
        >
          {logoMark.paths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <div
          style={{ display: "flex", fontSize: 40, letterSpacing: "-0.03em" }}
        >
          <span>{wordmark.before}</span>
          <span style={{ color: ember }}>{wordmark.accent}</span>
          <span>{wordmark.after}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 92,
          lineHeight: 0.98,
          letterSpacing: "-0.045em",
          maxWidth: 980,
        }}
      >
        You know you need AI. Here's where to start.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
        }}
      >
        <div style={{ display: "flex", color: "#3A3934", maxWidth: 620 }}>
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            background: ink,
            color: paper,
            padding: "16px 26px",
            flexShrink: 0,
          }}
        >
          Book a free 30-min call →
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Schibsted Grotesk", data: schibstedBold, weight: 700 }],
    },
  );
}
