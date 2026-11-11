import "react";

declare module "react" {
  interface CSSProperties {
    /** Allow CSS custom properties in inline styles, e.g. `{ "--row": 2 }`. */
    [key: `--${string}`]: string | number | undefined;
  }
}
