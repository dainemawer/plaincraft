import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const { ink, paper, ember } = site.theme;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: paper,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          backgroundImage: `linear-gradient(135deg, ${ember} 50%, ${ink} 50%)`,
        }}
      />
    </div>,
    size,
  );
}
