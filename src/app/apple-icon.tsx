import { ImageResponse } from "next/og";
import { logoMark } from "@/lib/logo-mark";
import { site } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const { ink, paper } = site.theme;

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
      <svg
        aria-hidden="true"
        width={96}
        height={96 * (logoMark.height / logoMark.width)}
        viewBox={`0 0 ${logoMark.width} ${logoMark.height}`}
        fill={ink}
      >
        {logoMark.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </div>,
    size,
  );
}
