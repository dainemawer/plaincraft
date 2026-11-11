import { logoMark } from "@/lib/logo-mark";
import { site } from "@/lib/site";
import { wordmarkParts } from "@/lib/wordmark";

type LogoProps = {
  /** "light" sits on paper backgrounds, "dark" on ink backgrounds. */
  tone?: "light" | "dark";
};

/** The diamond mark and wordmark. Purely presentational. */
export function Logo({ tone = "light" }: LogoProps) {
  const isDark = tone === "dark";
  const { before, accent, after } = wordmarkParts();

  return (
    <span
      className={`flex items-center gap-2.5 ${isDark ? "text-paper" : "text-ink"}`}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${logoMark.width} ${logoMark.height}`}
        className={isDark ? "h-[22px] w-auto" : "h-6 w-auto"}
        fill="currentColor"
      >
        {logoMark.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
      <span
        className={`font-bold tracking-[-0.03em] ${isDark ? "text-lg" : "text-[19px]"}`}
      >
        <span className="sr-only">{site.name}</span>
        <span aria-hidden="true">
          {before}
          <span className="text-ember">{accent}</span>
          {after}
        </span>
      </span>
    </span>
  );
}
