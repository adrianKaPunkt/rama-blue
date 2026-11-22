import { MetalSvg, type MetalLayer, type MetalProps } from "./metal-svg";
import {
  TAGLINE_BOX,
  TAGLINE_PATH,
  WORDMARK_BOX,
  WORDMARK_PATH,
  WORDMARK_TAGLINE_BOX,
} from "./paths";

type WordmarkProps = MetalProps & {
  /** Unterzeile „ROYAL THAI CUISINE“ anzeigen (Standard: ja). */
  tagline?: boolean;
  /** Nur bei variant="current": eigene Farbe für die Unterzeile, z. B. "text-wine". */
  taglineClassName?: string;
};

/** Schriftzug „RAMA BLUE“, optional mit Unterzeile. */
export function Wordmark({
  tagline = true,
  taglineClassName,
  title = tagline ? "Rama Blue – Royal Thai Cuisine" : "Rama Blue",
  ...props
}: WordmarkProps) {
  const layers: MetalLayer[] = [{ d: WORDMARK_PATH, box: WORDMARK_BOX }];
  if (tagline) layers.push({ d: TAGLINE_PATH, box: TAGLINE_BOX, className: taglineClassName });

  return (
    <MetalSvg
      box={tagline ? WORDMARK_TAGLINE_BOX : WORDMARK_BOX}
      layers={layers}
      title={title}
      {...props}
    />
  );
}
