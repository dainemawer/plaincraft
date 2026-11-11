import { painPoints } from "@/content/home";
import { site } from "@/lib/site";

function Quotes({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex">
      {painPoints.map((quote) => (
        <li key={quote} className="flex items-center">
          <q className="px-7">{quote}</q>
          <span aria-hidden="true" className="text-ember">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Infinite ticker of things owners tell us. The second copy closes the loop. */
export function PainPoints() {
  return (
    <section
      aria-label={`Problems ${site.name} typically solves`}
      className="overflow-hidden border-y border-ink bg-ink text-paper"
    >
      <div className="flex w-max py-[18px] text-[clamp(1rem,1.6vw,1.25rem)] font-medium tracking-[-0.01em] whitespace-nowrap hover:[animation-play-state:paused] motion-safe:animate-marquee">
        <Quotes />
        <Quotes hidden />
      </div>
    </section>
  );
}
