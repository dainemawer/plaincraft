import { site } from "@/lib/site";

type LogoProps = {
  /** "light" sits on paper backgrounds, "dark" on ink backgrounds. */
  tone?: "light" | "dark";
};

/** The split-square mark and wordmark. Purely presentational. */
export function Logo({ tone = "light" }: LogoProps) {
  const isDark = tone === "dark";

  return (
    <span
      className={`flex items-center gap-2.5 ${isDark ? "text-paper" : "text-ink"}`}
    >
      <span
        aria-hidden="true"
        className={`block ${
          isDark
            ? "size-4 bg-[linear-gradient(135deg,var(--color-ember)_50%,var(--color-paper)_50%)]"
            : "size-[18px] bg-[linear-gradient(135deg,var(--color-ember)_50%,var(--color-ink)_50%)]"
        }`}
      />
      <span
        className={`font-bold tracking-[-0.03em] ${isDark ? "text-lg" : "text-[19px]"}`}
      >
        {site.name}
      </span>
    </span>
  );
}
