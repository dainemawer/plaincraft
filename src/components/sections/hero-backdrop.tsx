/**
 * Decorative moving gradient behind the hero: soft ember and sand light
 * fields drifting over a faint dot grid. Pure CSS, transform-only, and
 * static when the visitor prefers reduced motion.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [contain:paint]"
    >
      {/* The bottom fade is an overlay, not a mask: a mask over animated
          layers forces a full repaint every frame and makes scrolling jitter. */}
      <div
        data-drift="a"
        className="absolute -top-[30%] -right-[15%] size-[min(1100px,120vw)] rounded-full bg-[radial-gradient(closest-side,rgb(232_73_42/0.26),rgb(232_73_42/0.08)_55%,transparent)]"
      />
      <div
        data-drift="b"
        className="absolute top-[20%] -left-[20%] size-[min(900px,110vw)] rounded-full bg-[radial-gradient(closest-side,rgb(214_196_160/0.55),transparent)]"
      />
      <div
        data-drift="c"
        className="absolute -bottom-[45%] left-[30%] size-[min(800px,100vw)] rounded-full bg-[radial-gradient(closest-side,rgb(181_50_26/0.16),transparent)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgb(18_18_16/0.16)_1px,transparent_1.5px)] bg-size-[22px_22px] [mask-image:radial-gradient(80%_70%_at_70%_30%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-linear-to-b from-transparent to-paper" />
    </div>
  );
}
