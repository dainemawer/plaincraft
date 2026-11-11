import Image, { type StaticImageData } from "next/image";

type PhotoProps = {
  sizes: string;
  preload?: boolean;
  /** Placeholder contrast: "light" on sand backgrounds, "dark" on ink. */
  tone?: "light" | "dark";
} & (
  | {
      src: string | StaticImageData;
      /** Describe what the photo shows; required whenever there is an image. */
      alt: string;
      hint?: never;
    }
  | {
      src?: undefined;
      alt?: never;
      /** Art direction for the photographer, shown while the slot is empty. */
      hint: string;
    }
);

/**
 * Fills its positioned parent with a photo. Until real photography is
 * supplied it shows the design's dashed placeholder, which is hidden from
 * assistive technology because it carries no content.
 */
export function Photo({
  src,
  alt,
  hint,
  sizes,
  preload = false,
  tone = "light",
}: PhotoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        placeholder={typeof src === "string" ? "empty" : "blur"}
        className="object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 text-center text-[13px] font-medium tracking-[0.01em] ${
        tone === "dark" ? "text-paper/70" : "text-graphite"
      }`}
    >
      <span className="absolute inset-0 border-[1.5px] border-dashed border-current opacity-35" />
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="opacity-45"
      >
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
        <circle cx="9" cy="10" r="1.75" />
        <path d="m21 16-5-5-9 9" />
      </svg>
      <span className="max-w-[90%]">{hint}</span>
    </div>
  );
}
