import { MetalSvg, type MetalProps } from "./metal-svg";
import {
  LOGO_BOX,
  LOTUS_BOX,
  LOTUS_PETALS,
  TAGLINE_BOX,
  TAGLINE_PATH,
  WORDMARK_BOX,
  WORDMARK_PATH,
} from "./paths";
import { LOGO_TAGLINE_DELAY, LOGO_WORDMARK_DELAY } from "./timing";

type LogoProps = MetalProps & {
  /** Nur bei variant="current": eigene Farbe für die Blüte, z. B. "text-wine". */
  lotusClassName?: string;
  /** Nur bei variant="current": eigene Farbe für die Unterzeile, z. B. "text-wine". */
  taglineClassName?: string;
};

/**
 * Das komplette Logo: Blüte über Schriftzug und Unterzeile, in einem SVG.
 * In Gold läuft ein einziger Glanzstreifen über alle drei Teile.
 * Mit intro blüht erst die Blüte auf, dann blenden Schriftzug und Unterzeile ein.
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
        { kind: "lotus", petals: LOTUS_PETALS, box: LOTUS_BOX, className: lotusClassName },
        { kind: "path", d: WORDMARK_PATH, box: WORDMARK_BOX, introDelay: LOGO_WORDMARK_DELAY },
        {
          kind: "path",
          d: TAGLINE_PATH,
          box: TAGLINE_BOX,
          className: taglineClassName,
          introDelay: LOGO_TAGLINE_DELAY,
        },
      ]}
      title={title}
      {...props}
    />
  );
}
