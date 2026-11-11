import { Photo } from "@/components/ui/photo";
import { site } from "@/lib/site";

export function PhotoBand() {
  return (
    <section
      aria-label={`Working with ${site.name}`}
      className="relative border-y border-ink"
    >
      <div
        data-reveal=""
        className="relative aspect-[21/8] min-h-80 w-full bg-sand"
      >
        <Photo
          hint="Wide photo: you working alongside a client team, real office, natural light"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute right-[clamp(16px,4vw,48px)] bottom-[clamp(16px,4vw,48px)] max-w-[420px] border border-ink bg-paper px-6 py-5">
          <p className="text-[clamp(17px,1.6vw,20px)] leading-[1.45] font-medium tracking-[-0.01em]">
            On site or remote, I work alongside your team. Not from behind a
            slide deck.
          </p>
        </div>
      </div>
    </section>
  );
}
