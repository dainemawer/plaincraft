import type { ComponentProps } from "react";
import { SmartLink } from "./smart-link";

const variants = {
  /** Ink button that flips to ember on hover. */
  solid: "bg-ink text-paper hover:bg-ember hover:text-ink",
  /** Ink button that keeps its colours on hover. */
  dark: "bg-ink text-paper",
  /** Ember button used on dark backgrounds. */
  ember: "bg-ember text-ink font-bold hover:bg-paper",
  /** Hairline outline that fills with sand on hover. */
  outline: "border border-ink/25 hover:border-ink hover:bg-sand",
  /** Solid outline used for secondary links such as LinkedIn. */
  "outline-strong": "border border-ink hover:bg-sand hover:text-rust",
} as const;

const sizes = {
  sm: "gap-2 px-[18px] py-[11px] min-h-11 text-sm",
  compact: "gap-2 px-[18px] py-[13px] min-h-11 text-[15px]",
  md: "gap-2.5 px-[26px] py-[17px] min-h-[52px] text-base",
  lg: "gap-3 px-[30px] py-5 min-h-14 text-lg",
} as const;

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Lift the button by 2px on hover. */
  lift?: boolean;
  /** Decorative trailing glyph, hidden from assistive technology. */
  icon?: "→" | "↗" | null;
};

/** A link styled as a button. Navigation stays a link, never a <button>. */
export function ButtonLink({
  variant = "solid",
  size = "md",
  lift = false,
  icon = "→",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = [
    "inline-flex items-center font-semibold no-underline whitespace-nowrap",
    "transition-[background-color,color,border-color,translate] duration-250",
    variants[variant],
    sizes[size],
    lift ? "hover:-translate-y-0.5" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <SmartLink className={classes} {...rest}>
      {children}
      {icon ? (
        <span aria-hidden="true" className="glyph">
          {icon}
        </span>
      ) : null}
    </SmartLink>
  );
}
