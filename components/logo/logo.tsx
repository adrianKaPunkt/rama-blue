import { MetalSvg, type MetalProps } from "./metal-svg";
import {
  LOGO_BOX,
  LOTUS_BOX,
  LOTUS_PATH,
  TAGLINE_BOX,
  TAGLINE_PATH,
  WORDMARK_BOX,
  WORDMARK_PATH,
} from "./paths";

type LogoProps = MetalProps & {
  /** Nur bei variant="current": eigene Farbe für die Blüte, z. B. "text-wine". */
  lotusClassName?: string;
  /** Nur bei variant="current": eigene Farbe für die Unterzeile, z. B. "text-wine". */
  taglineClassName?: string;
};

/**
 * Das komplette Logo: Blüte über Schriftzug und Unterzeile, in einem SVG.
 * In Gold läuft ein einziger Glanzstreifen über alle drei Teile.
 */
export function Logo({
  lotusClassName,
  taglineClassName,
  title = "Rama Blue – Royal Thai Cuisine",
  ...props
}: LogoProps) {
  return (
    <MetalSvg
      box={LOGO_BOX}
      layers={[
        { d: LOTUS_PATH, box: LOTUS_BOX, className: lotusClassName },
        { d: WORDMARK_PATH, box: WORDMARK_BOX },
        { d: TAGLINE_PATH, box: TAGLINE_BOX, className: taglineClassName },
      ]}
      title={title}
      {...props}
    />
  );
}
