import teamAtWork from "@/assets/images/team-at-work.jpg";
import { Photo } from "@/components/ui/photo";
import { site } from "@/lib/site";

export function PhotoBand() {
  return (
    <section aria-label={`Working with ${site.name}`} className="relative">
      <div
        data-reveal=""
        className="relative flex aspect-[21/8] min-h-[440px] w-full items-end bg-ink"
      >
        <Photo
          src={teamAtWork}
          alt="A small team working together around a timber table with laptops and a printed plan, Table Mountain visible through the office windows."
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(18_18_16/0.88),rgb(18_18_16/0.45)_42%,transparent_72%)]"
        />
        <figure className="shell relative w-full pb-[clamp(28px,5vw,64px)]">
          <blockquote className="max-w-[720px] border-l-2 border-ember pl-[clamp(16px,2vw,28px)]">
            <p className="text-[clamp(26px,3.4vw,46px)] leading-[1.06] font-bold tracking-[-0.035em] text-balance text-paper">
              On site or remote, I work alongside your team. Not from behind a
              slide deck.
            </p>
          </blockquote>
          <figcaption className="mt-4 pl-[calc(clamp(16px,2vw,28px)+2px)] text-sm text-mist">
            {site.founder.name}, founder
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
